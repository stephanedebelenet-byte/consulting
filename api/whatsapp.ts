/**
 * Webhook WhatsApp Cloud API — agent commercial pour les leads publicités Facebook/Instagram.
 *
 * GET  /api/whatsapp  → vérification du webhook (Meta).
 * POST /api/whatsapp  → message entrant : on répond via Claude, on garde l'historique
 *                       dans Upstash Redis, on escalade vers le propriétaire si besoin.
 *
 * Variables d'environnement requises (Vercel → Settings → Environment Variables) :
 *   WHATSAPP_VERIFY_TOKEN      chaîne libre, identique à celle saisie côté Meta
 *   WHATSAPP_TOKEN            token d'accès permanent (Meta)
 *   WHATSAPP_PHONE_NUMBER_ID  identifiant du numéro (Meta)
 *   ANTHROPIC_API_KEY        clé API Anthropic
 *   UPSTASH_REDIS_REST_URL   Upstash (base Redis gratuite)
 *   UPSTASH_REDIS_REST_TOKEN Upstash
 *   OWNER_WHATSAPP           numéro du propriétaire pour les alertes (ex. 212663449200)
 *   AGENT_MODEL              (optionnel) id du modèle Claude, défaut : claude-haiku-4-5-20251001
 */

import { SYSTEM_PROMPT, GREETING } from './_agent-prompt'

type Msg = { role: 'user' | 'assistant'; content: string }

const GRAPH = 'https://graph.facebook.com/v21.0'
const MODEL = process.env.AGENT_MODEL || 'claude-haiku-4-5-20251001'
const HISTORY_TTL = 60 * 60 * 24 * 7 // 7 jours
const MAX_TURNS = 20

/* ── Upstash Redis (REST, sans dépendance) ─────────────────────────── */
async function redis(cmd: (string | number)[]): Promise<unknown> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  })
  const j = (await r.json()) as { result?: unknown }
  return j.result ?? null
}

async function getHistory(phone: string): Promise<Msg[]> {
  const raw = (await redis(['GET', `wa:hist:${phone}`])) as string | null
  if (!raw) return []
  try {
    return JSON.parse(raw) as Msg[]
  } catch {
    return []
  }
}
async function saveHistory(phone: string, history: Msg[]) {
  const trimmed = history.slice(-MAX_TURNS)
  await redis(['SET', `wa:hist:${phone}`, JSON.stringify(trimmed), 'EX', HISTORY_TTL])
}
/** true si ce message n'a jamais été traité (dédup des retries Meta). */
async function firstSeen(msgId: string): Promise<boolean> {
  const res = await redis(['SET', `wa:seen:${msgId}`, '1', 'NX', 'EX', 600])
  return res === 'OK'
}

/* ── Claude ────────────────────────────────────────────────────────── */
async function askClaude(history: Msg[]): Promise<string> {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY || '',
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: history,
    }),
  })
  if (!r.ok) {
    console.error('Claude error', r.status, await r.text())
    return "Merci ! Un conseiller vous répond très vite. Vous pouvez aussi voir tous les détails ici : https://nextinotech.com/formation-rl/"
  }
  const j = (await r.json()) as { content?: { type: string; text?: string }[] }
  return (j.content || []).map((c) => c.text || '').join('').trim() ||
    'Un conseiller revient vers vous rapidement 🙏'
}

/* ── WhatsApp Cloud API ────────────────────────────────────────────── */
async function sendText(to: string, body: string) {
  await fetch(`${GRAPH}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body } }),
  })
}

async function notifyOwner(text: string) {
  const owner = process.env.OWNER_WHATSAPP
  if (owner) await sendText(owner, text)
}

/* ── Handler ───────────────────────────────────────────────────────── */
export default async function handler(req: any, res: any) {
  // 1) Vérification du webhook (Meta, une seule fois à la config)
  if (req.method === 'GET') {
    const q = req.query || {}
    if (
      q['hub.mode'] === 'subscribe' &&
      q['hub.verify_token'] === process.env.WHATSAPP_VERIFY_TOKEN
    ) {
      return res.status(200).send(q['hub.challenge'])
    }
    return res.status(403).send('Forbidden')
  }

  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed')

  // Meta exige un 200 rapide — on accuse réception tout de suite.
  res.status(200).send('OK')

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const value = body?.entry?.[0]?.changes?.[0]?.value
    const message = value?.messages?.[0]
    if (!message) return // statuts de livraison, etc.

    const from: string = message.from
    const msgId: string = message.id
    if (!(await firstSeen(msgId))) return

    const name: string = value?.contacts?.[0]?.profile?.name || ''
    const referral = message.referral // présent si la conversation vient d'une pub Click-to-WhatsApp

    // Pièce jointe (ex. preuve de paiement) → on remercie et on escalade.
    if (message.type && message.type !== 'text') {
      await sendText(
        from,
        'Merci, j’ai bien reçu votre pièce jointe 📎 Un conseiller la vérifie et revient vers vous rapidement.',
      )
      await notifyOwner(
        `📎 Pièce jointe reçue de ${name || from} (${from})${referral ? ` — pub : ${referral.headline || referral.source_id}` : ''}`,
      )
      return
    }

    const text: string = message.text?.body?.trim() || ''
    if (!text) return

    const history = await getHistory(from)

    // Premier contact : on injecte le contexte pub + on ouvre par le message d'accueil.
    if (history.length === 0) {
      if (referral) {
        history.push({
          role: 'user',
          content: `(Contexte système : ce contact arrive de la publicité Facebook/Instagram « ${
            referral.headline || referral.source_id || 'formation'
          } ». Prénom : ${name || 'inconnu'}.)`,
        })
        history.push({ role: 'assistant', content: GREETING })
        await sendText(from, GREETING)
      }
    }

    history.push({ role: 'user', content: text })
    let reply = await askClaude(history)

    const escalate = reply.includes('[ESCALADE]')
    reply = reply.replace(/\[ESCALADE\]/g, '').trim()

    history.push({ role: 'assistant', content: reply })
    await saveHistory(from, history)
    await sendText(from, reply)

    if (escalate) {
      await notifyOwner(
        `🔔 Lead à rappeler : ${name || from} (${from})${
          referral ? ` — pub : ${referral.headline || referral.source_id}` : ''
        }\nDernier message : « ${text} »`,
      )
    }
  } catch (e) {
    console.error('whatsapp webhook error', e)
  }
}
