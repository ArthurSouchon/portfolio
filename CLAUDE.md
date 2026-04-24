# Portfolio Arthur Souchon — Contexte projet

## Stack technique
- **Framework** : Nuxt 3 + Nuxt UI v3
- **CSS** : Tailwind CSS v4 (`@import "tailwindcss"` dans `assets/css/main.css`)
- **Dark mode** : classe `.dark` sur `<html>`, via `@variant dark (&:where(.dark, .dark *))` — configurer dans `colorMode` de `nuxt.config.ts`
- **i18n** : `@nuxtjs/i18n` v9 — fichiers dans `i18n/locales/fr.json` et `i18n/locales/en.json`
- **Animations** : `@vueuse/motion/nuxt`
- **Déploiement** : Vercel (repo GitHub : `ArthurSouchon/portfolio`)
- **IA** : Claude API (`claude-sonnet-4-6`) via `server/api/chat.post.ts`

## Commandes
```bash
npm run dev       # développement local
git add . && git commit -m "..." && git push  # déployer sur Vercel
```

## Structure des fichiers clés
```
pages/
  index.vue         # Page d'accueil
  services.vue      # Services freelance
  experience.vue    # Parcours pro
  realisations.vue  # Projets / cas clients
  univers.vue       # Centres d'intérêt
  chat.vue          # Chat IA plein écran

components/
  AppNavbar.vue     # Navbar avec toggle dark/light + langue
  AppFooter.vue     # Footer
  FloatingChat.vue  # Widget chat flottant

server/api/
  chat.post.ts      # Endpoint Claude API avec rate limiting

i18n/locales/
  fr.json           # Tout le contenu en français
  en.json           # Tout le contenu en anglais

public/
  favicon.png       # Logo du site (408×500px)
  avatar.png        # Photo de profil IA (408×500px)
  padel-bg.jpg      # Background card Padel
  esport-bg.jpg     # Background card Esport
  evenement-bg.jpg  # Background card Événements
  football-bg.jpg   # Background card Football
```

## Règles i18n importantes
- Pour les **tableaux** dans les templates : utiliser `tm()` + `rt()` (pas `t()`)
  ```vue
  const { t, tm, rt } = useI18n()
  v-for="(item, idx) in (tm('clé.tableau') as any[])"
  {{ rt(item) }}
  ```
- Tout le contenu éditorial est dans les fichiers JSON, **pas dans les templates**

## Conventions CSS
- Tailwind v4 : pas de `dark:` dans le config, utiliser `@variant dark` dans le CSS global
- Les `dark:` variants Tailwind fonctionnent normalement dans les templates Vue
- `whitespace-pre-line` sur les `<p>` pour respecter les `\n` dans les traductions

## Chatbot IA
- Rate limit : 10 requêtes/heure/IP
- Réponses en texte brut (pas de markdown) — instruite via le system prompt
- Les URLs dans les réponses sont rendues cliquables via `renderText()` + `v-html` (avec échappement XSS)
- System prompt dans `server/api/chat.post.ts`

## Profil Arthur Souchon
- **Poste actuel** : API Product Owner chez Numberly (CDI, janv. 2025)
- **Parcours** : Numberly → Shippeo → Ekwateur (alternance) → Deloitte (stage) → FK Agency (stage)
- **Formation** : HETIC Master Data & IA (2021-2023), HETIC Prepa Master Digital (2019-2021), ECE Paris (2016-2019)
- **Contact** : arthursouchon98@gmail.com
- **LinkedIn** : https://www.linkedin.com/in/arthur-souchon-236807171/
- **Calendrier** : https://calendar.app.google/KcUytrRx2duCQyQbA

## Réalisations (4 projets)
1. **Site de documentation API** — Numberly, rôle : Product Manager
2. **WhatsApp, un nouveau canal de communication** — Numberly, rôle : API Product Owner
3. **Automatisation des relances clients en impayés** — Ekwateur, rôle : Product Owner
4. **Ce portfolio** — Projet personnel, rôle : Product Builder

## Univers / centres d'intérêt
- **Padel** : compétition depuis 2022, top 10% français, entraînements hebdo
- **Événements** : organisation d'événements privés depuis 6 ans (soirées, tournois, vacances)
- **Esport** : champion du monde Dofus 2023, retraite 2024
- **Football** : passion depuis l'enfance, five hebdo, supporter PSG

## Variables d'environnement
- `ANTHROPIC_API_KEY` : clé API Anthropic (dans `.env` local et dans Vercel)

## Points d'attention
- Ne pas commiter `.env`
- `nitro: { preset: 'vercel' }` doit être activé pour la prod (déjà fait)
- `colorMode.preference` est sur `'light'` (white mode par défaut)
- Les images `favicon.png` et `avatar.png` ont un ratio portrait (408×500) — toujours respecter les proportions
