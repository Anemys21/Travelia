# Travelia

Site vitrine de voyage statique en HTML/CSS/JS.

## Aperçu
Travelia présente des destinations, expériences et guides pratiques (santé, sécurité, budget, etc.). Le site est 100% côté front, sans backend.

## Structure du projet
- `index.html` — Page d’accueil
- `destinations.html`, `experiences.html` — Pages de navigation principales
- Fiches destinations: `alpes.html`, `bora-bora.html`, `new-york.html`, `patagonie.html`, `tokyo.html`, `venise.html`
- Pages guides: `guides.html`, `guides-budget.html`, `guides-photo.html`, `guides-randonnee.html`, `guides-sante.html`, `guides-securite.html`, `guides-valise.html`
- Pages annexes: `a-propos.html`, `contact.html`, `login.html`, `signup.html`
- `styles.css` — Feuille de style globale
- `app.js` — Scripts d’interaction côté client (navigation, effets, etc.)
- `assets/` — Ressources (ex: `logo-travelia.svg`)

## Fonctionnalités (front)
- Navigation multi-pages statique
- Composants réutilisables via CSS (header/nav/footer)
- Interactions de base en JavaScript (voir `app.js`)

## Comment lancer
Aucun build requis.

1. Ouvrir directement le fichier `index.html` dans votre navigateur.
2. Ou servez le dossier via un serveur statique local (optionnel) :
   - VS Code: extension Live Server
   - Node (exemple): `npx serve .`

## Développement
- Modifier les styles dans `styles.css`.
- Ajouter/adapter les comportements dans `app.js`.
- Pour créer une nouvelle page:
  1. Dupliquer une page existante
  2. Mettre à jour le `<title>`, les métadonnées et le contenu
  3. Ajouter le lien dans la navigation si nécessaire

## Bonnes pratiques
- Garder une structure de balises sémantique (header/main/footer/nav/article/section)
- Optimiser les images (poids, dimensions, alt text)
- Vérifier l’accessibilité (contraste, attributs ARIA si besoin)

## Personnalisation
- Couleurs/typographies: éditer `styles.css`
- Logo: remplacer `assets/logo-travelia.svg`

## Roadmap (suggestions)
- Ajout d’un thème sombre/clair
- Optimisation SEO (balises meta, Open Graph)
- Internationalisation (FR/EN)
- Formulaire de contact avec validation et backend léger (si nécessaire)

## Licence
Choisissez une licence (MIT/Apache-2.0/CC-BY-SA…). Ajoutez le fichier `LICENSE` au besoin.
