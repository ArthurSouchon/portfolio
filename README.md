# arthur-souchon-site

Site web personnel — Nuxt 3 + Nuxt UI v3 + i18n (FR/EN) + chatbot Claude.

## Stack

- Nuxt 3, Nuxt UI v3, @nuxtjs/i18n v9, @vueuse/motion, @nuxtjs/sitemap
- Anthropic SDK (`claude-sonnet-4-6`) — server-side uniquement
- Déploiement : Vercel

## Setup

```bash
cp .env.example .env
# Renseigner ANTHROPIC_API_KEY dans .env

npm install
npm run dev
```

## Déploiement Vercel

1. Importer le repo dans Vercel
2. Ajouter la variable d'environnement `ANTHROPIC_API_KEY` dans les settings Vercel
3. Deploy — le preset Vercel est configuré automatiquement dans `nuxt.config.ts`

## Personnalisation

| Quoi | Où |
|---|---|
| Textes FR | `locales/fr.json` |
| Textes EN | `locales/en.json` |
| Lien Calendly | Chercher `calendly.com/arthur-souchon` dans le projet |
| Prompt du chatbot | `server/api/chat.post.ts` → `SYSTEM_PROMPT` |
| Jobs / expériences | `locales/fr.json` → clé `experience.jobs` |
| Réalisations | `locales/fr.json` → clé `realisations.cases` |

## Chatbot

- Rate limit : 10 messages/heure par IP (en mémoire, reset au redémarrage)
- Input max : 500 caractères
- L'API key n'est jamais exposée côté client
- Les IPs sont hashées dans les logs
