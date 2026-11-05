import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const panel = JSON.parse(readFileSync(resolve(root, 'llm-visibility/panel.json'), 'utf8'))
const input = process.argv[2]
const output = process.argv[3] || 'llm-visibility-report.json'
const records = input ? JSON.parse(readFileSync(resolve(input), 'utf8')) : []
if (!Array.isArray(records)) throw new Error('Les observations doivent être un tableau JSON')
const keys = new Set()
for (const record of records) {
  if (!panel.prompts.some((p) => p.id === record.promptId) || !panel.platforms.includes(record.platform) ||
      !Number.isInteger(record.repetition) || record.repetition < 1 || record.repetition > panel.repetitions ||
      !['complete', 'error'].includes(record.status) || !Number.isFinite(Date.parse(record.recordedAt)) ||
      typeof record.model !== 'string' || typeof record.searchMode !== 'string' || record.country !== 'MA' ||
      (record.status === 'complete' && (typeof record.answerText !== 'string' || !record.answerText.trim() ||
       !Array.isArray(record.sourceUrls) || !record.sourceUrls.every((url) => { try { return ['https:', 'http:'].includes(new URL(url).protocol) } catch { return false } }) ||
       ![true, false, null].includes(record.recommendedNextinotech)))) throw new Error('Observation incomplète ou hors protocole')
  const key = `${record.promptId}|${record.platform}|${record.repetition}`
  if (keys.has(key)) throw new Error(`Observation dupliquée : ${key}`)
  keys.add(key)
}
function onDomain(url) {
  try { return ['nextinotech.com', 'www.nextinotech.com'].includes(new URL(url).hostname.toLowerCase()) }
  catch { return false }
}
function metrics(rows) {
  const completed = rows.filter((r) => r.status === 'complete')
  const assessed = completed.filter((r) => r.recommendedNextinotech !== null)
  const rate = (n, d) => d ? n / d : null
  return { completed: completed.length, errors: rows.filter((r) => r.status === 'error').length,
    mentions: completed.filter((r) => /nextino\s?tech/i.test(r.answerText)).length,
    citations: completed.filter((r) => r.sourceUrls.some(onDomain)).length,
    mentionRate: rate(completed.filter((r) => /nextino\s?tech/i.test(r.answerText)).length, completed.length),
    citationRate: rate(completed.filter((r) => r.sourceUrls.some(onDomain)).length, completed.length),
    recommendationAssessed: assessed.length,
    recommendationRate: rate(assessed.filter((r) => r.recommendedNextinotech).length, assessed.length) }
}
const expected = panel.prompts.length * panel.platforms.length * panel.repetitions
const result = { generatedAt: new Date().toISOString(), status: records.length ? 'partial-or-complete-observations' : 'not-measured',
  market: 'MA', expectedObservations: expected, observed: records.length, pending: expected - records.length,
  overall: metrics(records),
  byPlatform: Object.fromEntries(panel.platforms.map((p) => [p, metrics(records.filter((r) => r.platform === p))])),
  warning: 'Panel contrôlé, sans estimation de classement universel. Les échecs sont exclus des taux et comptés séparément. Les recommandations nécessitent une annotation humaine.' }
if (existsSync(resolve(output))) throw new Error('Choisir un nouveau fichier de sortie pour préserver les mesures antérieures')
writeFileSync(resolve(output), JSON.stringify(result, null, 2) + '\n')
console.log(JSON.stringify({ output: resolve(output), ...result.overall, status: result.status, pending: result.pending }))
