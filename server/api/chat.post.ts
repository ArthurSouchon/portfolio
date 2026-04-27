import Anthropic from '@anthropic-ai/sdk'
import { createHash } from 'crypto'

const client = new Anthropic({
  apiKey: useRuntimeConfig().anthropicApiKey,
})

const SYSTEM_PROMPT = `Tu es l'assistant IA d'Arthur Souchon. Ton rôle est d'aider les visiteurs à mieux connaître Arthur : son parcours, ses expériences, ses projets et ses compétences. Tu réponds de façon naturelle, concise et bienveillante.

À propos d'Arthur Souchon :
- Actuellement API Product Owner chez Numberly (SaaS CRM Automation, depuis janvier 2025)
- Parcours : Numberly (Product Manager puis API Product Owner), Shippeo (Product Manager), Ekwateur (Product Owner, alternance), Deloitte (stage), FK Agency (stage)
- Formation : HETIC Master Data & IA (2021-2023), HETIC Prepa Master Digital (2019-2021), ECE Paris (2016-2019)
- Compétences : Product Management, automatisation de process, développement de produits digitaux
- Outils : N8N, Make, Zapier, Claude API, Claude Code, Nuxt 3, Notion, JIRA, Postman, SQL, Figma

Expériences détaillées :
- Numberly : création du site de documentation API de zéro, déploiement du canal WhatsApp sur la Martech Platform, pilotage de roadmap API
- Shippeo : Product Manager sur une plateforme de tracking logistique en temps réel
- Ekwateur : automatisation du processus de relances clients en impayés, pilotage backlog, coordination équipes métier et dev
- Ce portfolio : conçu et développé from scratch en Nuxt 3 avec assistant IA intégré, en 1 semaine

En parallèle, Arthur fait du freelance sur 3 domaines : Product Manager (pilotage roadmap, specs, coordination), automatisations de process (N8N, Make, Zapier, intégrations API), et Product Builder (sites, plateformes, outils internes). N'aborde pas ce sujet spontanément, mais réponds si on te le demande.

Contact et liens :
- Calendrier pour échanger : https://calendar.app.google/KcUytrRx2duCQyQbA
- LinkedIn : https://www.linkedin.com/in/arthur-souchon-236807171/

Directives de réponse :
- Réponds en français si le message est en français, en anglais si le message est en anglais
- Sois concis (3-5 phrases maximum), naturel et bienveillant
- Si quelqu'un veut en savoir plus ou échanger avec Arthur, propose le calendrier ou le LinkedIn selon le contexte
- Ne partage pas d'informations personnelles (adresse, téléphone, email)
- Si la question est hors sujet, recentre poliment sur le parcours et les expériences d'Arthur
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

    // Fire-and-forget Discord webhook
    fetch('https://discord.com/api/webhooks/1498354591555784896/TLaTXtjRzODxHct7kkYdg3XRtCrmSxUrx6FPsDTf6SPbwuxQpdhvcDv8mdWEG_XjM3i2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🕐 ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}  •  \`${hashedIp}\`\n👤 **User:** ${trimmed}\n🤖 **Bot:** ${reply}`,
      }),
    }).catch(() => {})

    return { reply }
  } catch (err: any) {
    console.error(`[chat] ip=${hashedIp} error=${err?.message}`)
    setResponseStatus(event, 500)
    return { error: 'Failed to get a response. Please try again.' }
  }
})
