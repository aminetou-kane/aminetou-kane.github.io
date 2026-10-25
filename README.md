# Portfolio — Aminetou Kane

Portfolio personnel (Angular) : présentation, compétences, projets, certifications
et parcours académique. Site bilingue **FR / EN**, responsive (mobile, tablette, bureau).

## Aperçu des sections

À propos · Compétences · Projets (AgriLoc, Mémoria, Campus Habitat, Urgences Médicales) · Certifications · Parcours · Contact

## Lancer le projet en local

Prérequis : [Node.js](https://nodejs.org) **22.22.3 ou plus récent** (ou 24 LTS).

```bash
npm install
npm start
```

Puis ouvrir <http://localhost:4200>.

## Compiler pour la production

```bash
npm run build
```

Le site est généré dans `dist/portfolio/browser/`.

## Déployer sur GitHub Pages (automatique)

> Guide détaillé pas à pas, avec dépannage : [DEPLOIEMENT.md](DEPLOIEMENT.md).

1. Créer un dépôt GitHub (par exemple `portfolio`) et y envoyer le projet :

   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/aminetou-kane/portfolio.git
   git push -u origin main
   ```

2. Sur GitHub : **Settings → Pages → Build and deployment → Source : GitHub Actions**.
3. Chaque `git push` sur `main` recompile et republie le site automatiquement
   (suivi dans l'onglet **Actions**).

Le site sera disponible à l'adresse `https://aminetou-kane.github.io/portfolio/`.
Si le dépôt s'appelle `aminetou-kane.github.io`, le site sera à la racine :
`https://aminetou-kane.github.io/`.

### Autres hébergeurs (Netlify, Vercel…)

- Commande de build : `npm run build`
- Dossier à publier : `dist/portfolio/browser`
- Dans `src/index.html`, remplacer `__SITE_URL__` par l'adresse réelle du site
  (utilisée pour l'aperçu lors du partage sur LinkedIn, WhatsApp, etc.).

## Personnaliser

| Je veux…                         | Où                                                              |
| -------------------------------- | --------------------------------------------------------------- |
| Modifier les textes              | `src/app/app.html` (versions FR et EN)                          |
| Modifier les styles              | `src/app/app.css`                                               |
| Activer le bouton « Télécharger mon CV » | Déposer le PDF dans `public/cv/CV_Aminetou_Kane.pdf`, puis mettre `cvAvailable = true` dans `src/app/app.ts` |
| Changer la photo                 | Remplacer `public/images/aminetou.jpg`                          |
| Changer les captures de projets  | `public/images/projects/` (puis adapter les noms dans `src/app/app.html`) |
| Changer l'image d'aperçu de partage | `public/images/og-cover.jpg` (1200 × 630 px)                 |

## Technologies

Angular · TypeScript · CSS · police Inter (auto-hébergée) · GitHub Actions
