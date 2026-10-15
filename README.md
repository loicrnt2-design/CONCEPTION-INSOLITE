# Conception Insolite

Site vitrine responsive en HTML, CSS et JavaScript natifs. Aucun outil de compilation ni paquet à installer. Polices (Playfair Display, Figtree) auto-hébergées dans `assets/fonts/` : aucune ressource tierce.

## Lancer le site en local (Live Server)

1. Ouvrez ce dossier dans Visual Studio Code.
2. Installez l’extension **Live Server**, puis clic droit sur `index.html` → **Open with Live Server**.
3. Important : la **boutique** charge `assets/data/produits.json`. Elle ne fonctionne donc pas si vous double-cliquez sur le fichier (protocole `file://`) : utilisez Live Server ou l’hébergement final.

## Où modifier quoi

| Je veux… | Fichier |
|---|---|
| Renseigner téléphone, e-mail, réseaux, SIRET, domaine, zone d’intervention, tarifs, avis, chiffres Airbnb | `config.js` |
| Ajouter mes photos avant / après (curseur de l’accueil, Airbnb, Rénovation) | `config.js` → `beforeAfter` (chemins des images, `.webp` conseillé, + textes alternatifs) |
| Ajouter, modifier ou retirer un produit de la boutique | `assets/data/produits.json` |
| Modifier les textes des pages | `app.js` |
| Modifier couleurs, polices, espacements | `styles.css` (variables en haut du fichier) |

Tout champ à compléter est marqué `[À COMPLÉTER]`. Les avis clients sont des **exemples fictifs** (`reviews.isDemo: true`) : remplacez-les par de vrais avis puis passez `isDemo` à `false`.

### Boutique

Chaque produit de `produits.json` comporte : `id`, `nom`, `categorie` (Mobilier intérieur, Mobilier extérieur, Décoration, Luminaires, Textiles), `prix` (nombre, ex. `120`, ou `"[À COMPLÉTER]"`), `description`, `matieres`, `dimensions`, `images` (liste de chemins), `disponibilite`, `lienAchat`.

- Dépôt des photos : placez-les par exemple dans `assets/produits/` (WebP carré, 800×800 px conseillé) et indiquez le chemin dans `images`.
- Paiement : collez un lien de paiement (Stripe Payment Link, Snipcart…) dans `lienAchat` pour faire apparaître le bouton « Acheter ». Si le champ est vide, seul « Demander ce produit » s’affiche : il ouvre le formulaire de contact avec le produit pré-rempli.
- Aucun prix ni stock n’est inventé : les 6 produits fournis sont des exemples à remplacer.
- Les **kits à monter** restent séparés de la boutique (`kits.html`).
- Modèles à faire relire : `cgu.html`, `cgv.html`, `livraison-retours.html`, `mentions-legales.html`.

### Images

Les visuels sont en WebP (`assets/*.webp`) ; les JPG d’origine sont conservés. Les visuels 3D sont de petite taille : fournissez les fichiers haute résolution d’origine pour un rendu plus net sur grand écran.

## Formulaire de contact

Sans service tiers : après validation, un e-mail est préparé dans la messagerie du visiteur. Renseignez une vraie adresse dans `config.js` et testez avant publication.

## Publication

Publiez tout le dossier (`.html`, `styles.css`, `app.js`, `config.js`, `assets`, `sitemap.xml`, `robots.txt`) sur un hébergement statique en HTTPS (Netlify, Cloudflare Pages, OVH, etc.). Avant le lancement :

- remplacez le domaine d’exemple dans `sitemap.xml` et `robots.txt`, et renseignez `siteUrl` dans `config.js` ;
- complétez les mentions légales et faites relire les modèles juridiques (CGU, CGV, livraison/retours) ;
- testez navigation, formulaire, boutique, liens, et l’affichage sur téléphone et ordinateur ;
- mesurez la performance avec Lighthouse (DevTools de Chrome → Lighthouse) une fois en ligne.
