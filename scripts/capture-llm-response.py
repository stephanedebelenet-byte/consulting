"""Capture uniquement le DOM d'un onglet explicitement choisi via OpenCLI.

Ne soumet aucun prompt. Exige un signal de fin et trois lectures stables après
défilement. Un échec ou une extraction partielle ne devient jamais un taux zéro.
"""
import argparse
import hashlib
import json
import shutil
import subprocess
import time
from datetime import datetime, timezone
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--platform', choices=['gemini', 'perplexity', 'chatgpt'], required=True)
parser.add_argument('--session', required=True)
parser.add_argument('--tab', required=True, help='Identifiant frais renvoyé par opencli browser SESSION tab list')
parser.add_argument('--prompt', required=True)
parser.add_argument('--output', required=True)
parser.add_argument('--cli-entry', help='Chemin du main.js OpenCLI si non détecté')
args = parser.parse_args()
target = Path(args.output).resolve()
if target.exists():
    raise SystemExit('Choisir un nouveau fichier : les observations antérieures sont conservées.')
shim = shutil.which('opencli')
entry = Path(args.cli_entry) if args.cli_entry else (Path(shim).parent/'node_modules/@jackwener/opencli/dist/src/main.js' if shim else None)
if not entry or not entry.exists():
    raise SystemExit('OpenCLI indisponible : fournir --cli-entry, sans copier de cookie ni de profil.')
node = shutil.which('node')
def evaluate(code):
    run = subprocess.run([node, str(entry), 'browser', args.session, 'eval', '--tab', args.tab, code],
                         capture_output=True, text=True, encoding='utf-8', timeout=40)
    if run.returncode:
        raise RuntimeError(run.stdout + run.stderr)
    for line in run.stdout.splitlines():
        try:
            return json.loads(line)
        except json.JSONDecodeError:
            pass
    raise RuntimeError('Résultat JSON absent')

config = {
    'gemini': ('gemini.google.com', 'model-response', 'chat-window'),
    'perplexity': ('www.perplexity.ai', 'main .prose', 'main'),
    'chatgpt': ('chatgpt.com', '[data-message-author-role="assistant"]', 'main'),
}[args.platform]
host, selector, scope = config
code = '''JSON.stringify((()=>{
 const host=HOST, scope=document.querySelector(SCOPE);
 if(location.hostname!==host)throw new Error('Mauvais site pour cet onglet');
 const responses=Array.from(document.querySelectorAll(SELECTOR));
 const response=responses.at(-1);
 if(response)response.lastElementChild?.scrollIntoView({block:'end'});
 const controls=Array.from(scope?.querySelectorAll('button')||[]).map(b=>({text:b.innerText,label:b.getAttribute('aria-label')||''}));
 const busy=controls.some(b=>/stop generating|stop response|arrêter la réponse|arrêter la génération/i.test(b.label));
 const end=PLATFORM==='perplexity'?controls.some(b=>b.label==='Copy'):
   PLATFORM==='chatgpt'?controls.some(b=>b.label==='Copy'||b.label==='Regenerate response'):
   !!response?.querySelector('follow-up,elicitations');
 const userSelector=PLATFORM==='gemini'?'user-query':PLATFORM==='chatgpt'?'[data-message-author-role="user"]':'main h1';
 const userTurns=Array.from(document.querySelectorAll(userSelector));
 const submittedPrompt=userTurns.at(-1)?.innerText||'';
 return {url:location.href,host:location.hostname,promptPresent:submittedPrompt.includes(PROMPT),submittedPrompt,
 answerText:response?.innerText||'',inlineCitationUrls:Array.from(response?.querySelectorAll('a[href],[data-pplx-citation-url]')||[])
 .map(e=>e.getAttribute('data-pplx-citation-url')||e.href).filter(u=>/^https?:/.test(u)),
 busy,endSignal:end,modelLabel:controls.find(b=>/sélecteur de mode/i.test(b.label))?.text||null};
})())'''.replace('HOST',json.dumps(host)).replace('SCOPE',json.dumps(scope)).replace('SELECTOR',json.dumps(selector)).replace('PLATFORM',json.dumps(args.platform)).replace('PROMPT',json.dumps(args.prompt))
snapshots=[]
previous=None
stable=0
status='incomplete'
try:
    for attempt in range(8):
        data=evaluate(code)
        digest=hashlib.sha256(data['answerText'].encode()).hexdigest()
        snapshots.append({'at':datetime.now(timezone.utc).isoformat(),'chars':len(data['answerText']),
                          'sha256':digest,'endSignal':data['endSignal'],'busy':data['busy']})
        stable=stable+1 if digest==previous else 0
        previous=digest
        if data['promptPresent'] and data['answerText'] and data['endSignal'] and not data['busy'] and stable>=2:
            status='capture-complete'
            break
        time.sleep(2)
    result={'platform':args.platform,'capturedAt':datetime.now(timezone.utc).isoformat(),
            'captureStatus':status,'protocolStatus':'exploratory-until-context-validated',
            'tabId':args.tab,'prompt':args.prompt,'data':data,'checks':snapshots,
            'context':{'personalization':'not-verified','geolocation':'not-verified','searchMode':'not-verified'},
            'note':'Capture complète ne signifie pas protocole du panel valide. Les liens sont limités au bloc de réponse ; vérifier leur rôle de citation.'}
except Exception as error:
    result={'platform':args.platform,'captureStatus':'error','error':str(error),'checks':snapshots}
target.parent.mkdir(parents=True,exist_ok=True)
target.write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'output':str(target),'captureStatus':result['captureStatus'],'readings':len(snapshots)}))
if result['captureStatus']!='capture-complete':
    raise SystemExit(2)
