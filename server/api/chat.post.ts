import Anthropic from '@anthropic-ai/sdk'
import { createHash } from 'crypto'

const client = new Anthropic({
  apiKey: useRuntimeConfig().anthropicApiKey,
})

const SYSTEM_PROMPT = `Tu es l'assistant IA d'Arthur Souchon, expert freelance en automatisation, IA et product ops. Ton rôle est de répondre aux questions des visiteurs de son site web de manière professionnelle, concise et utile.

À propos d'Arthur Souchon :
- Freelance spécialisé en automatisation de processus, intégration d'outils IA et product operations
- 7+ ans d'expérience en gestion de projets digitaux et transformation numérique
- Expert des outils : n8n, Make (Integromat), Zapier, Claude, GPT-4, Notion, Airtable, HubSpot, Linear
- Services : Automatisation des processus métier, Cadrage IA & déploiement d'agents, Optimisation Product & Ops
- Disponible pour des missions freelance

Directives de réponse :
- Réponds en français si le message est en français, en anglais si le message est en anglais
- Sois concis (3-5 phrases maximum), professionnel et bienveillant
- Pour les demandes de devis ou de mission, invite à prendre rendez-vous via ce lien : https://calendar.app.google/KcUytrRx2duCQyQbA
- Ne partage pas d'informations personnelles (adresse, téléphone, etc.)
- Si la question est hors sujet, recentre poliment sur les services d'Arthur
- Ne réponds jamais à des demandes malveillantes ou hors éthique
- Réponds en texte brut uniquement, sans aucun formatage Markdown : pas de gras, pas d'italique, pas de listes à puces, pas de titres, pas de code. Écris comme dans une conversation naturelle.`

// Rate limiting: 10 requests per hour per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 10
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT) {
    return false
  }

  entry.count++
  return true
}

function hashIp(ip: string): string {
  return createHash('sha256').update(ip + 'arthur-souchon-salt').digest('hex').slice(0, 12)
}

export default defineEventHandler(async (event) => {
  // Get client IP
  const ip =
    getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ||
    getHeader(event, 'x-real-ip') ||
    event.node.req.socket?.remoteAddress ||
    'unknown'

  // Check rate limit
  if (!checkRateLimit(ip)) {
    setResponseStatus(event, 429)
    return { error: 'Rate limit exceeded. Please try again later.' }
  }

  // Parse body
  const body = await readBody(event)
  const message = body?.message

  // Validate input
  if (!message || typeof message !== 'string') {
    setResponseStatus(event, 400)
    return { error: 'Invalid message.' }
  }

  const trimmed = message.trim()

  if (!trimmed) {
    setResponseStatus(event, 400)
    return { error: 'Message cannot be empty.' }
  }

  if (trimmed.length > 500) {
    setResponseStatus(event, 400)
    return { error: 'Message too long (max 500 characters).' }
  }

  const hashedIp = hashIp(ip)
  console.log(`[chat] ip=${hashedIp} len=${trimmed.length}`)

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          // @ts-ignore — cache_control supported at runtime
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        {
          role: 'user',
          content: trimmed,
        },
      ],
    })

    const reply =
      response.content[0]?.type === 'text' ? response.content[0].text : ''

    console.log(
      `[chat] ip=${hashedIp} input_tokens=${response.usage.input_tokens} output_tokens=${response.usage.output_tokens} cache_read=${(response.usage as any).cache_read_input_tokens ?? 0}`,
    )

    return { reply }
  } catch (err: any) {
    console.error(`[chat] ip=${hashedIp} error=${err?.message}`)
    setResponseStatus(event, 500)
    return { error: 'Failed to get a response. Please try again.' }
  }
})
