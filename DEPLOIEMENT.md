# Guide de déploiement du portfolio

Ce guide explique, pas à pas, comment mettre le portfolio en ligne **gratuitement** avec
GitHub Pages. Une fois configuré, chaque `git push` republie le site automatiquement.

Durée : environ 15 minutes.

---

## 0. Avant de commencer

| Il faut | Vérification |
|---|---|
| Un compte GitHub | <https://github.com> |
| Git installé | `git --version` dans le terminal. Sinon : <https://git-scm.com/downloads> |
| Node.js 22.22.3 ou plus (ou 24 LTS) | `node -v`. Sinon : <https://nodejs.org> |

> Le dossier `.github` (qui contient le déploiement automatique) est **masqué** sur certains
> systèmes. Il est bien présent : VS Code l'affiche dans l'explorateur de fichiers.

---

## 1. Tester en local

Dans le terminal de VS Code, dans le dossier du projet (celui qui contient `package.json`) :

```bash
npm install
npm start
```

Ouvrir <http://localhost:4200>, puis vérifier :

- les 4 projets et leurs boutons (« Voir le site », « GitHub ») ;
- le changement de langue FR / EN ;
- le menu sur téléphone (réduire la fenêtre du navigateur).

Arrêter avec **Ctrl + C**. Vérifier ensuite que la version de production se compile :

```bash
npm run build
```

Le message doit se terminer par « Application bundle generation complete », sans erreur.

---

## 2. Dernières retouches (facultatif mais recommandé)

- **CV** : déposer le PDF dans `public/cv/CV_Aminetou_Kane.pdf`, puis dans `src/app/app.ts`
  passer `cvAvailable` à `true`. Le bouton « Télécharger mon CV » apparaît alors dans la section Contact.
- **Textes** : tout est dans `src/app/app.html` (version française et version anglaise).

---

## 3. Choisir le nom du dépôt GitHub

Deux possibilités, le déploiement automatique gère les deux :

| Nom du dépôt | Adresse du site | Conseil |
|---|---|---|
| `aminetou-kane.github.io` | `https://aminetou-kane.github.io/` | **Recommandé** : adresse courte et plus professionnelle |
| `portfolio` (ou autre) | `https://aminetou-kane.github.io/portfolio/` | Convient aussi |

Les projets existants (par exemple `campus-habitats`) continuent de fonctionner à leur adresse
habituelle, il n'y a aucun conflit.

---

## 4. Créer le dépôt sur GitHub

1. Sur GitHub : **+ → New repository**.
2. **Repository name** : le nom choisi à l'étape 3.
3. Visibilité : **Public** (obligatoire pour GitHub Pages gratuit).
4. **Ne cocher aucune** case (ni README, ni .gitignore, ni licence) : le projet les contient déjà.
5. **Create repository**.

---

## 5. Activer GitHub Pages **avant** le premier envoi

Dans le dépôt : **Settings → Pages → Build and deployment → Source : GitHub Actions**.

> Si cette étape est faite après l'envoi du code, le premier déploiement échoue. Ce n'est pas grave
> (voir « Dépannage »), mais autant l'éviter.

---

## 6. Envoyer le projet sur GitHub

Dans le terminal de VS Code, à la racine du projet (remplacer `NOM-DU-DEPOT`) :

```bash
git init
git add .
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/aminetou-kane/NOM-DU-DEPOT.git
git push -u origin main
```

**Si Git demande qui vous êtes** (première utilisation) :

```bash
git config --global user.name "Aminetou Kane"
git config --global user.email "votre-adresse@exemple.com"
```

Puis relancer le `git commit`.

**Connexion à GitHub** : GitHub n'accepte plus les mots de passe dans le terminal. Sous Windows,
une fenêtre de navigateur s'ouvre pour autoriser la connexion : l'accepter. Sinon, créer un
*Personal access token* (GitHub → Settings → Developer settings → Personal access tokens) et
l'utiliser à la place du mot de passe.

> Alternative sans terminal : dans VS Code, onglet **Contrôle de code source** (icône de branche),
> bouton **Publier dans GitHub**.

Il ne faut **pas** envoyer `node_modules` : le fichier `.gitignore` s'en charge.

---

## 7. Suivre le déploiement

1. Dans le dépôt, onglet **Actions** : le workflow « Déploiement sur GitHub Pages » démarre tout seul.
2. Attendre 1 à 3 minutes : deux étapes (`build` puis `deploy`) doivent passer au **vert**.
3. L'adresse du site s'affiche à la fin de l'étape `deploy`, et dans **Settings → Pages**.

---

## 8. Vérifier le site en ligne

- Ouvrir l'adresse, puis faire **Ctrl + F5** si une ancienne version s'affiche.
- Cliquer sur **tous** les boutons des projets (démos et dépôts).
- Tester sur téléphone, en français et en anglais.
- Partager l'adresse dans une conversation ou dans un post LinkedIn : l'aperçu doit afficher ta photo
  et ton nom. Si LinkedIn affiche une ancienne image, forcer la mise à jour avec le
  *Post Inspector* : <https://www.linkedin.com/post-inspector/>.

---

## 9. Faire connaître le portfolio

- **LinkedIn** : ajouter l'adresse dans *Coordonnées → Site web* et dans la section *À propos*.
- **GitHub** : l'ajouter dans la bio du profil, et épingler les 4 dépôts de projets.
- **CV** : ajouter l'adresse du portfolio en haut, à côté de l'e-mail.
- **Dépôts des projets** : y mettre le lien vers la démo (champ *Website* en haut à droite du dépôt).

---

## 10. Modifier le site plus tard

Après chaque modification :

```bash
git add .
git commit -m "Description de la modification"
git push
```

Le site est republié automatiquement en 1 à 3 minutes.

---

## Dépannage

| Problème | Solution |
|---|---|
| **Actions : le déploiement est rouge, message « Pages not enabled » / « Get Pages site failed »** | Faire l'étape 5 (Settings → Pages → Source : GitHub Actions), puis **Actions → le workflow → Re-run all jobs**. |
| **Actions : erreur à `npm ci`** | Le fichier `package-lock.json` doit être envoyé avec le projet. Vérifier qu'il est bien dans le dépôt. |
| **Page blanche ou images manquantes** | Le site doit être compilé par le workflow (il règle automatiquement le sous-dossier). Ne pas envoyer le dossier `dist` à la main. |
| **L'ancienne version s'affiche** | **Ctrl + F5**, ou navigation privée. |
| **Settings → Pages : l'option est grisée** | Le dépôt doit être **Public** (Settings → tout en bas → Change visibility). |
| **404 sur un bouton de projet** | Le dépôt visé est privé ou son nom est différent : le rendre public ou corriger le lien dans `src/app/app.html`. |
| **Erreur « The Angular CLI requires a minimum Node.js version »** | Mettre Node.js à jour (étape 0). |
| **PowerShell : « l'exécution de scripts est désactivée »** | Utiliser un terminal *Command Prompt*, ou exécuter une fois `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`. |
| **Port 4200 déjà utilisé** | `npm start -- --port 4300`. |

---

## À propos des démos des projets

Les démos sont hébergées ailleurs que le portfolio, avec leurs propres limites :

- **Mémoria (Render, offre gratuite)** : le site se met en veille après un moment d'inactivité.
  La **première visite peut prendre environ une minute** à s'ouvrir. Mieux vaut l'ouvrir toi-même
  juste avant d'envoyer ta candidature, ou prévenir les recruteurs.
- **Urgences Médicales (InfinityFree)** : le site peut afficher brièvement une page de
  vérification de navigateur avant l'application.
- **Comptes de démonstration** : si les recruteurs doivent se connecter pour tester, penser à leur
  indiquer un compte (sans exposer de vrai mot de passe).

---

## Autres hébergeurs (Netlify, Vercel, Cloudflare Pages)

1. Importer le dépôt GitHub depuis le tableau de bord de l'hébergeur.
2. **Build command** : `npm run build`
3. **Publish / output directory** : `dist/portfolio/browser`
4. Dans `src/index.html`, remplacer les `__SITE_URL__` par l'adresse réelle du site
   (avec un `/` final), pour que l'aperçu de partage fonctionne.

---

## Domaine personnalisé (facultatif)

Un nom de domaine (par exemple `aminetoukane.com`) est payant. Il s'ajoute dans
**Settings → Pages → Custom domain**, après avoir configuré les enregistrements DNS chez le
vendeur du domaine (voir la documentation GitHub Pages). Cocher ensuite *Enforce HTTPS*.
