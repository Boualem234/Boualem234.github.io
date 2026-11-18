# Déployer le site avec GitHub Actions

Le site est publié sur **https://boualem234.github.io/portfolio/** par le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), dans le dépôt `Boualem234/portfolio`. À chaque push sur `main`, GitHub installe les dépendances, lance le lint, construit le site et le met en ligne. Il n'y a plus de branche `gh-pages` ni de `npm run deploy`.

## 1. Activer GitHub Pages par GitHub Actions (une seule fois)

1. Sur GitHub, ouvrir le dépôt `Boualem234/portfolio`.
2. **Settings** → **Pages** (menu de gauche).
3. Dans **Build and deployment**, choisir **Source : GitHub Actions** (à la place de « Deploy from a branch »).

Il n'y a rien d'autre à configurer : pas de secret, pas de token.

> Le dépôt s'appelle `portfolio` : c'est un **site de projet**, servi dans le sous-chemin `/portfolio/`. C'est pour cela que `base` vaut `"/portfolio/"` dans `vite.config.ts` et que le routeur a `basename="/portfolio"`. Si le dépôt est renommé, il faut adapter ces deux valeurs.

## 2. Lancer le premier déploiement

Pousser le code sur `main` :

```bash
git push origin main
```

Puis suivre le déploiement dans l'onglet **Actions** du dépôt :

- le workflow **Déploiement** apparaît avec deux étapes, `build` puis `deploy` ;
- comptez une à deux minutes ;
- une fois terminé, le lien du site s'affiche sous l'étape `deploy`.

Si le site affiche encore l'ancienne version, forcer le rechargement (`Ctrl + F5`, ou `Cmd + Shift + R` sur Mac).

Pour relancer un déploiement sans rien modifier : onglet **Actions** → **Déploiement** → **Run workflow**.

## 3. Au quotidien

```bash
npm run lint       # même vérification que sur GitHub
npm run build      # même build que sur GitHub
git add -A
git commit -m "Mise à jour du contenu"
git push
```

Le site se met à jour tout seul après le push. Les pull requests sont vérifiées (lint + build) mais ne sont jamais publiées : seul `main` part en ligne.

## Ce que fait le workflow

| Étape | Rôle |
| --- | --- |
| `npm ci` | installe les versions exactes du `package-lock.json` |
| `npm run lint` | ESLint ; une erreur bloque le déploiement |
| `npm run build` | vérification TypeScript puis build de production dans `dist/` |
| `upload-pages-artifact` | envoie `dist/` à GitHub Pages |
| `deploy-pages` | met cette version en ligne |

## Dépannage

| Problème | Solution |
| --- | --- |
| L'étape `deploy` échoue avec `Failed to create deployment (status: 404)` | GitHub Pages n'est pas encore réglé sur GitHub Actions : refaire l'étape 1, puis **Re-run all jobs** dans l'onglet Actions. |
| `Branch "main" is not allowed to deploy to github-pages due to environment protection rules` | **Settings** → **Environments** → **github-pages** → **Deployment branches and tags** : autoriser `main`. |
| L'étape `npm ci` échoue | `package.json` et `package-lock.json` ne correspondent plus : lancer `npm install` en local, puis committer le `package-lock.json`. |
| L'étape `npm run lint` ou `npm run build` échoue | Lancer la même commande en local : l'erreur y est identique et plus lisible. |
| Une page `/projets/...` affiche une erreur 404 | Vérifier que `public/404.html` est bien présent, que `segmentCount` vaut `1` et que `base` vaut `"/portfolio/"` dans `vite.config.ts`. |
| La racine `https://boualem234.github.io` affiche l'ancien site | C'est normal : le nouveau site vit dans `/portfolio/`. |

## Ancien site (facultatif)

L'ancien dépôt `Boualem234/Boualem234.github.io` et sa branche `gh-pages` ne sont pas touchés : l'ancien site reste disponible à la racine `https://boualem234.github.io`. Une fois le nouveau site vérifié, l'ancien dépôt peut être archivé depuis **Settings** → **Archive this repository**.
