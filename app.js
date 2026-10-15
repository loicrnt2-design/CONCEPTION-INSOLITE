(() => {
  "use strict";

  const config = window.SITE_CONFIG;
  const page = document.body.dataset.page || "accueil";
  const univers = [
    { id: "van", title: "Van aménagé", short: "Vans", action: "Imaginer mon van", intro: "Un véhicule discret, un intérieur pensé au millimètre, et la liberté de partir avec un lieu de vie vraiment à soi.", scene: "La route devient votre horizon." },
    { id: "dome", title: "Dôme", short: "Dômes", action: "Imaginer mon dôme", intro: "Une architecture ouverte sur le paysage, une atmosphère enveloppante et le confort d’une parenthèse inattendue.", scene: "Dormir sous le ciel, autrement." },
    { id: "bateau", title: "Bateau", short: "Bateaux", action: "Imaginer mon bateau", intro: "Révéler le potentiel d’un bateau et composer un intérieur à la fois accueillant, astucieux et prêt à larguer les amarres.", scene: "L’évasion commence à bord." },
    { id: "habitat", title: "Habitat insolite", short: "Habitats", action: "Imaginer mon habitat insolite", intro: "Inventer une adresse singulière, cohérente avec son terrain, ses usages et l’expérience que vous souhaitez faire vivre.", scene: "Un lieu inattendu, ancré dans son paysage." },
    { id: "cabane", title: "Cabane perchée", short: "Cabanes", action: "Imaginer ma cabane", intro: "Imaginer un refuge en hauteur où le dessin, les matières et la vue composent une vraie expérience de séjour.", scene: "Prendre de la hauteur, naturellement." }
  ];
  const universeLabels = ["Vans aménagés", "Dômes", "Bateaux", "Habitats insolites", "Cabanes perchées"];
  const titles = {
    accueil: "Imaginer des lieux. Donner forme aux projets.",
    projets: "Créations insolites : vans, dômes, bateaux, habitats et cabanes",
    airbnb: "Votre Airbnb, pensé pour mieux accueillir.",
    renovation: "Rénover avec justesse. Valoriser avec intention.",
    methode: "Une idée, une méthode, un lieu qui prend forme.",
    materiaux: "Des matériaux choisis pour durer et raconter.",
    environnement: "Concevoir avec le lieu, pas contre lui.",
    boutique: "Boutique : décoration et mobilier d’intérieur et d’extérieur",
    kits: "Kits à monter soi-même, sur demande.",
    cgv: "Conditions générales de vente",
    "livraison-retours": "Livraison et retours",
    realisations: "Des projets imaginés, transformés, habités.",
    "qui-suis-je": "Un interlocuteur unique, du premier trait à la livraison.",
    contact: "Parlez-moi de votre projet.",
    cgu: "Conditions générales d’utilisation",
    "mentions-legales": "Mentions légales"
  };
  const descriptions = {
    "qui-suis-je": "Découvrez la démarche de Conception Insolite : un accompagnement personnalisé de l’idée à la réalisation.",
    airbnb: "Rénover et optimiser votre Airbnb : plans avant/après, budget maîtrisé et accompagnement des travaux à la mise en ligne.",
    boutique: "Boutique Conception Insolite : décoration, mobilier d’intérieur et d’extérieur, luminaires et textiles.",
    kits: "Kits à monter soi-même livrés avec plans et notice, sur demande.",
    cgv: "Conditions générales de vente de la boutique Conception Insolite (modèle).",
    "livraison-retours": "Livraison, retours et remboursements de la boutique Conception Insolite (modèle).",
    "mentions-legales": "Mentions légales du site Conception Insolite.",
    cgu: "Conditions générales d’utilisation du site Conception Insolite."
  };
  const pageTitle = titles[page] || univers.find((item) => item.id === page)?.title || titles.accueil;
  const asset = "assets/blueprint.svg";

  function link(href, text, className = "") {
    return `<a${className ? ` class="${className}"` : ""} href="${href}">${text}</a>`;
  }
  const isConfigured = (value) => typeof value === "string" && !value.includes("[À COMPLÉTER]");

  // Menu principal (en-tête). CGU, mentions légales et « Qui sommes-nous ? » restent dans le pied de page.
  const mainLinks = [
    ["projets", "Créations insolites", "projets.html"],
    ["airbnb", "Airbnb", "airbnb.html"],
    ["renovation", "Rénovation &amp; Home staging", "renovation.html"],
    ["methode", "Méthode", "methode.html"],
    ["realisations", "Réalisations", "realisations.html"],
    ["boutique", "Boutique", "boutique.html"],
    ["contact", "Contact", "contact.html"]
  ];
  const isProjectPage = page === "projets" || univers.some((item) => item.id === page);
  const phoneHref = isConfigured(config.phone) ? `tel:${config.phone.replace(/[^\d+]/g, "")}` : "contact.html";
  const arrow = '<span aria-hidden="true">→</span>';

  // Rendus 3D issus de la direction artistique (WebP dans assets/).
  function universeDrawing(id) {
    const sizes = { van: [247, 145], dome: [212, 145], bateau: [275, 140], habitat: [190, 180], cabane: [218, 220] };
    const [w, h] = sizes[id];
    return `<img src="assets/da-${id}.webp" alt="" width="${w}" height="${h}" loading="lazy" decoding="async">`;
  }
  const pages3d = { concept: [632, 440], interieur: [340, 340] };

  document.querySelector("#site-header").innerHTML = `
    <header class="site-header">
      <div class="header-inner container">
        <a class="brand" href="index.html" aria-label="Conception Insolite, accueil">
          <span class="brand-monogram" aria-hidden="true">CI</span>
          <span class="brand-name">Conception Insolite</span>
        </a>
        <nav class="main-nav" id="primary-nav" aria-label="Navigation principale">
          <button class="nav-close" type="button" aria-label="Fermer le menu"><span aria-hidden="true">×</span></button>
          <ul class="nav-list">${mainLinks.map(([id, label, href]) => `<li>${link(href, label, (page === id || (id === "projets" && isProjectPage)) ? "is-current" : "")}</li>`).join("")}</ul>
          <a class="button nav-cta" href="contact.html">Devis gratuit ${arrow}</a>
        </nav>
        <a class="button button-small header-cta" href="contact.html">Devis gratuit</a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav"><span class="menu-icon" aria-hidden="true"></span><span class="sr-only">Ouvrir le menu</span></button>
      </div>
    </header>
    ${isProjectPage ? `<nav class="universe-nav" aria-label="Les cinq univers"><div class="universe-nav-list">${univers.map((item, index) => `<a href="${item.id}.html"${page === item.id ? ' class="is-current" aria-current="page"' : ""}><span class="universe-nav-art" aria-hidden="true">${universeDrawing(item.id)}</span><span>${universeLabels[index]}</span></a>`).join("")}</div></nav>` : ""}
    <div class="mobile-bar" aria-label="Actions rapides"><a class="button button-ghost" href="${phoneHref}">Appeler</a><a class="button" href="contact.html">Devis gratuit</a></div>`;


  const steps = (items, images = []) => `<ol class="step-grid">${items.map(([title, copy], index) => `<li class="step-card reveal">${images[index] ? `<img class="step-photo" src="${images[index]}" alt="" width="300" height="135" loading="lazy" decoding="async">` : `<span class="step-visual step-visual-${index + 1}" aria-hidden="true"></span>`}<span class="step-number">0${index + 1}</span><h3>${title}</h3><p>${copy}</p></li>`).join("")}</ol>`;
  // CTA = bouton principal (appel final de page) ; LINK = lien secondaire dans le corps de page.
  const CTA = (label = "Parlons de votre projet") => `<a class="button" href="contact.html">${label} ${arrow}</a>`;
  const LINK = (label, href = "contact.html") => `<a class="text-link" href="${href}">${label} ${arrow}</a>`;
  const intro = (eyebrow, title, copy) => `<section class="page-intro"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p class="lead">${copy}</p></section>`;
  const imageFrame = (alt, className = "") => `<div class="image-frame ${className}"><img src="assets/da-concept.webp" alt="${alt}" width="632" height="440" loading="lazy" decoding="async"><span class="image-caption">Conception Insolite <i>—</i> L’idée prend forme</span></div>`;

  // Comparateur avant / après : curseur natif <input type="range"> (souris, tactile et clavier).
  // Tant que config.beforeAfter ne contient pas de photos, des emplacements [À COMPLÉTER] sont affichés.
  function compareSlider({ beforeTag = "01 / Existant", beforeText = "Le lieu tel qu’il est.", afterTag = "02 / Potentiel", afterText = "Le lieu tel qu’il peut être.", caption = "" } = {}) {
    const photos = config.beforeAfter || {};
    const hasPhotos = isConfigured(photos.before) && photos.before && isConfigured(photos.after) && photos.after;
    const pane = (kind, tag, text, src, alt) => hasPhotos
      ? `<div class="compare-pane compare-${kind}"><img src="${src}" alt="${alt}" width="1200" height="900" loading="lazy" decoding="async"></div>`
      : `<div class="compare-pane compare-${kind}"><span>${tag}</span><strong>${text}</strong><small>[À COMPLÉTER] Photo ${kind === "before" ? "avant" : "après"}</small></div>`;
    return `<figure class="compare" data-compare>
      <div class="compare-stage">
        ${pane("after", afterTag, afterText, photos.after, photos.afterAlt)}${pane("before", beforeTag, beforeText, photos.before, photos.beforeAlt)}
        <span class="compare-tag compare-tag-before" aria-hidden="true">Avant</span><span class="compare-tag compare-tag-after" aria-hidden="true">Après</span>
        <span class="compare-handle" aria-hidden="true"></span>
        <input class="compare-range" type="range" min="0" max="100" value="50" aria-label="Comparer avant et après : déplacez le curseur" aria-valuetext="50 % avant, 50 % après">
      </div>
      ${caption ? `<figcaption>${caption}</figcaption>` : ""}
    </figure>`;
  }

  function contactForm(compact = false) {
    return `<form class="project-form${compact ? " compact-form" : ""}" id="project-form" novalidate>
      <div class="form-grid">
        <label>Votre nom <input name="name" autocomplete="name" required></label>
        <label>Votre e-mail <input type="email" inputmode="email" name="email" autocomplete="email" required></label>
        <label>Votre téléphone <span class="field-note">facultatif</span><input type="tel" inputmode="tel" name="phone" autocomplete="tel"></label>
        <label>Type de projet <select name="projectType" required><option value="">Choisir une porte d’entrée</option><option>Hébergement insolite</option><option>Optimisation Airbnb</option><option>Rénovation &amp; home staging</option><option>Boutique : demande de produit</option><option>Autre projet</option></select></label>
        <label>Lieu du projet <input name="place" placeholder="Ville, région ou adresse approximative"></label>
        <label>Budget envisagé <input name="budget" placeholder="[À COMPLÉTER]"></label>
        <label>Délai souhaité <input name="timeline" placeholder="Ex. : à l’automne, dans 6 mois…"></label>
        <label class="form-wide">Parlez-moi de votre projet <textarea name="message" rows="5" required placeholder="L’idée, le lieu, les envies, les questions…"></textarea></label>
      </div>
      <button class="button" type="submit">Préparer mon message →</button>
      <p class="form-note">Votre application de messagerie s’ouvrira pour vous laisser relire et envoyer le message. Aucune donnée n’est transmise ni stockée sur ce site. E-mail : ${config.contactEmail}</p>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>`;
  }

  function universePage(item) {
    return `<section class="universe-hero">
      <div class="universe-copy"><span class="eyebrow">Accueil <span class="copper-dot">/</span> Créations insolites</span>
        <h1>${item.id === "van" ? "Vans aménagés" : item.id === "dome" ? "Dômes" : item.id === "bateau" ? "Bateaux" : item.title}</h1><h2 class="universe-tagline">${item.scene}</h2><p class="lead">${item.intro}</p>${CTA(item.action)}
      </div>
      <figure class="universe-project-visual${item.id === "cabane" ? " is-photo" : ""}" aria-label="Illustration conceptuelle pour un projet ${item.title.toLowerCase()}">
        ${item.id === "cabane" ? `<img class="universe-hero-photo" src="assets/da-cabane-hero.webp" srcset="assets/da-cabane-hero-320.webp 320w, assets/da-cabane-hero.webp 594w" sizes="(min-width: 768px) 55vw, 92vw" alt="Cabane en bois perchée dans un chêne, posée sur une plaque de plans bleus, avec croquis techniques et échantillons de matières" width="594" height="305" decoding="async">` : `<span class="visual-drawing-label">CONCEPTION 3D <i>·</i> 01</span>
        <div class="universe-model" aria-hidden="true">${universeDrawing(item.id)}</div>
        <img class="universe-plan-detail" src="assets/technical-detail.svg" alt="" width="540" height="720">
        <div class="material-dots" aria-label="Palette d’inspiration"><span></span><span></span><span></span><span></span></div>`}
      </figure>
    </section>
    <section class="section section-narrow universe-steps reveal"><span class="eyebrow">Du premier croquis à l’expérience vécue</span><h2>Du premier croquis à ${item.id === "van" ? "la route" : item.id === "bateau" ? "l’escale" : item.id === "cabane" ? "votre refuge" : "votre séjour"}.</h2>
      ${steps([["Conception 3D", "Visualiser les volumes et organiser chaque espace."], ["Aménagement", "Choisir les matériaux, le mobilier et les équipements."], ["Immersion", "Imaginer un séjour singulier, ouvert sur son paysage."]], item.id === "cabane" ? ["assets/da-cabane-step1.webp", "assets/da-cabane-step2.webp", "assets/da-cabane-step3.webp"] : [])}
    </section>
    <section class="section split-section"><div><span class="eyebrow">Votre projet, votre façon d’avancer</span><h2>Clé en main ou à monter soi-même.</h2><p>La même exigence de conception, deux manières de concrétiser votre projet.</p></div>
      <div class="offer-list"><article><span class="offer-index">01</span><h3>Clé en main</h3><p>Plans techniques en CAO, sélection des matériaux, pilotage de A à Z, coordination des artisans, suivi du budget et décoration.</p></article><article><span class="offer-index">02</span><h3>Kit à monter soi-même</h3><p>Une conception accompagnée de plans et d’une notice pour réaliser le projet vous-même. <strong>Sur demande.</strong></p></article></div>
    </section>
    <section class="closing-cta"><span class="eyebrow">Le premier trait est le vôtre</span><h2>Et si on imaginait le vôtre ?</h2><p>Racontez-moi votre idée. Nous verrons ensemble comment lui donner forme.</p>${CTA("Demander un devis gratuit")}</section>`;
  }

  function home() {
    return `<section class="home-hero">
      <div class="hero-grid container">
        <div class="hero-content"><h1>Je conçois et transforme des lieux de séjour qui marquent les esprits et rentabilisent votre investissement.</h1>
          <div class="hero-actions">${CTA("Demander un devis gratuit")}<a class="button button-light" href="projets.html">Découvrir les créations ${arrow}</a></div>
          <p class="hero-proof">2 vans livrés <i>·</i> 3e en cours de réalisation</p></div>
        <figure class="hero-artwork"><img src="assets/da-cabane-hero.webp" srcset="assets/da-cabane-hero-320.webp 320w, assets/da-cabane-hero.webp 594w" sizes="(min-width: 900px) 40vw, 90vw" alt="Cabane en bois perchée dans un chêne, lumières chaudes à l’intérieur, posée sur une plaque de plans bleus avec croquis techniques" width="594" height="305" fetchpriority="high" decoding="async"></figure>
      </div>
    </section>
    <section class="section full reveal" id="apropos-concept"><div class="container"><div class="section-heading"><div><span class="eyebrow">Une seule méthode, de A à Z</span><h2>Votre logement mérite un projet bien pensé.</h2></div><p>Un budget défini avec vous, des plans avant/après clairs, des travaux coordonnés.</p></div>
      <ul class="path-grid">
        <li class="path-card"><div class="path-media"><img src="assets/da-van.webp" alt="" width="247" height="145" loading="lazy" decoding="async"></div><div class="path-body"><h3>Créer un hébergement insolite</h3><p>Vans aménagés, dômes, bateaux, habitats insolites et cabanes perchées : mes réalisations vitrines, conçues avec vous de l’idée à la livraison.</p>${LINK("Découvrir les créations", "projets.html")}</div></li>
        <li class="path-card"><div class="path-media"><img src="assets/da-concept-320.webp" alt="" width="320" height="223" loading="lazy" decoding="async"></div><div class="path-body"><h3>Optimiser mon Airbnb</h3><p>Plus de revenus, sans dépasser votre budget : plans avant/après, rénovation maîtrisée, home staging et mise en ligne.</p>${LINK("Découvrir l’accompagnement Airbnb", "airbnb.html")}</div></li>
        <li class="path-card"><div class="path-media"><img src="assets/da-interieur.webp" alt="" width="340" height="340" loading="lazy" decoding="async"></div><div class="path-body"><h3>Valoriser mon logement avant vente</h3><p>Une rénovation légère et un home staging pour remettre votre logement au goût du jour et aider les visiteurs à s’y projeter.</p>${LINK("Découvrir la valorisation", "renovation.html")}</div></li>
      </ul></div></section>
    <section class="section full universe-section reveal" id="projets-teaser"><div class="container"><div class="section-heading"><div><span class="eyebrow">Créations insolites</span><h2>Mes créations insolites.</h2></div><p>Vans, dômes, bateaux, habitats et cabanes : les réalisations vitrines issues de la même méthode.</p></div>${universeGrid()}<p class="section-link">${LINK("Voir toutes les créations insolites", "projets.html")}</p></div></section>
    <section class="section full three-steps reveal"><div class="container"><span class="eyebrow">De l’idée à la remise des clés</span><h2>Le projet avance, en confiance.</h2><p class="lead">Un interlocuteur unique vous accompagne de l’intention aux plans, du budget à la réalisation, pour optimiser votre Airbnb ou valoriser un logement avant sa vente.</p>${steps([["On échange", "Vos envies, le lieu, les usages et les priorités : le brief pose des bases claires."], ["On dessine & chiffre", "Esquisses, conception 3D, choix des matériaux et budget discuté avant d’avancer."], ["On concrétise", "Je vous accompagne dans la réalisation jusqu’à la décoration et la livraison."]], ["assets/da-cabane-step1.webp", "assets/da-cabane-step2.webp", "assets/da-cabane-step3.webp"])}<p class="method-chain" aria-label="Idée, plans, budget, réalisation"><span>Idée</span><i aria-hidden="true">→</i><span>Plans</span><i aria-hidden="true">→</i><span>Budget</span><i aria-hidden="true">→</i><span>Réalisation</span></p><p class="section-link">${LINK("Explorer la méthode", "methode.html")}</p></div></section>
    <section class="section full on-dark airbnb-teaser reveal"><div class="container"><div class="grid-12"><div class="col-5"><span class="eyebrow">Rénover &amp; optimiser</span><h2>Votre Airbnb, mieux pensé pour mieux accueillir.</h2><p>Des plans avant/après, un budget défini avec vous, les travaux coordonnés et — si vous le souhaitez — un accompagnement jusqu’à la mise en ligne et la conciergerie.</p>${LINK("Découvrir l’accompagnement Airbnb", "airbnb.html")}</div><div class="col-7"><span class="eyebrow">L’existant peut surprendre</span>${compareSlider({ caption: "Un potentiel révélé, dans le respect du budget." })}</div></div></div></section>
    <section class="section full reviews-section reveal" aria-labelledby="reviews-title"><div class="container"><span class="eyebrow">Avis clients</span><h2 id="reviews-title">Ils m’ont fait confiance.</h2>${config.reviews.isDemo ? `<p class="reviews-demo">[À COMPLÉTER] Avis d’exemple fictifs, à remplacer par de vrais avis avant la mise en ligne.</p>` : ""}<div class="reviews" data-reviews><ul class="reviews-list" role="region" aria-label="Avis clients" tabindex="0">${config.reviews.items.map((r) => `<li class="review-card"><span class="review-stars" role="img" aria-label="${r.rating} étoiles sur 5">${"★".repeat(r.rating)}</span><p>${r.text}</p><span class="review-author">${r.name} <i>·</i> ${r.project}</span></li>`).join("")}</ul><div class="reviews-controls"><button class="carousel-btn" type="button" data-dir="-1" aria-label="Avis précédent"><span aria-hidden="true">←</span></button><button class="carousel-btn" type="button" data-dir="1" aria-label="Avis suivant"><span aria-hidden="true">→</span></button></div></div></div></section>
    <section class="closing-cta"><span class="eyebrow">Une première conversation, sans engagement</span><h2>Un projet en tête ?<br>Parlons-en simplement.</h2>${CTA("Demander un devis gratuit")}</section>`;
  }

  // Grille fixe des cinq univers : visuel 3D, nom et lien.
  function universeGrid() {
    return `<ul class="universe-grid">${univers.map((item, index) => `<li><a class="universe-card" href="${item.id}.html"><span class="universe-card-image" aria-hidden="true">${universeDrawing(item.id)}</span><span class="universe-card-title">${universeLabels[index]}<i aria-hidden="true">→</i></span></a></li>`).join("")}</ul>`;
  }

  function projetsPage() {
    return `${intro("Créations insolites", "Créer un hébergement insolite.", "Vans aménagés, dômes, bateaux, habitats insolites et cabanes perchées : mes réalisations vitrines. Chaque projet suit la même méthode, de l’idée aux plans, du budget à la réalisation.")}
    <section class="section reveal">${universeGrid()}</section>
    <section class="closing-cta"><span class="eyebrow">Le premier trait est le vôtre</span><h2>Et si on imaginait le vôtre ?</h2>${CTA("Demander un devis gratuit")}</section>`;
  }

  function airbnbPage() {
    return `${intro("Rénovation & optimisation locative", "Et si votre Airbnb donnait envie de réserver… et de revenir ?", "Je vous accompagne pour révéler le potentiel de votre logement, avec un projet cohérent, des choix assumés et un budget défini ensemble. L’objectif : améliorer l’expérience des voyageurs et contribuer à de meilleurs revenus, sans dépasser votre enveloppe.")}
    <section class="section before-after-section split-section reveal"><div><span class="eyebrow">Avant / après, d’abord sur le papier</span><h2>Voir la transformation avant de la lancer.</h2><p>Des plans avant/après et un chiffrage lisible permettent de prioriser les interventions, d’arbitrer les choix et de garder le budget au cœur de chaque décision.</p>${LINK("Étudier mon Airbnb")}</div>${compareSlider()}</section>
    <section class="section"><span class="eyebrow">Un accompagnement à votre mesure</span><h2>Chaque étape, expliquée simplement.</h2>${steps([["État des lieux & brief", "On fait le point sur votre logement, vos objectifs, vos contraintes et votre budget."], ["Plans & chiffrage", "La proposition avant/après et son enveloppe estimative vous aident à décider en connaissance de cause."], ["Rénovation & coordination", "Je peux organiser et suivre les travaux convenus, en gardant le cap sur les choix validés."], ["Mise en scène & mise en ligne", "Home staging, annonce, photos et vidéo : préparons ensemble un accueil mémorable."]])}</section>
    <section class="section options-section"><div><span class="eyebrow">À la carte</span><h2>Vous choisissez le niveau d’accompagnement.</h2></div><ul class="check-list"><li>Plans d’aménagement avant/après</li><li>Optimisation des espaces et du mobilier</li><li>Budget prévisionnel et priorisation des travaux</li><li>Gestion de rénovation et coordination</li><li>Home staging &amp; préparation du logement</li><li>Annonce, photographies et vidéo de mise en ligne</li><li>Conciergerie en option — modalités à préciser</li></ul></section>
    <section class="section results-section"><span class="eyebrow">Résultats clients</span><h2>Les chiffres, en toute transparence.</h2><p>Les données de vos projets trouveront leur place ici, une fois disponibles et vérifiées.</p><div class="results-grid">${[["Taux d’occupation", config.airbnbResults.occupancy, `Période : ${config.airbnbResults.period}`], ["Prix à la nuit", config.airbnbResults.nightlyRate, `Période : ${config.airbnbResults.period}`], ["Revenus locatifs", config.airbnbResults.rentalIncome, `Période : ${config.airbnbResults.period}`]].map(([label, value, note]) => `<article><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`).join("")}</div></section>
    <section class="closing-cta"><span class="eyebrow">Votre logement a du potentiel</span><h2>Voyons comment le révéler, sans perdre le fil du budget.</h2>${CTA("Demander un devis gratuit")}</section>`;
  }

  function renovationPage() {
    return `${intro("Valorisation immobilière & home staging", "Un logement bien présenté ouvre de nouvelles perspectives.", "Avant une vente, une rénovation légère et un home staging réfléchis peuvent aider les visiteurs à mieux se projeter. On choisit les interventions utiles, sans engager des travaux disproportionnés.")}
    <section class="section split-section reveal"><div class="renovation-compare">${compareSlider({ beforeTag: "Avant", beforeText: "Alléger.<br>Rafraîchir.", afterTag: "Après", afterText: "Révéler.<br>Valoriser." })}</div><div><span class="eyebrow">Une mise en valeur juste</span><h2>Rendre les qualités du lieu évidentes.</h2><p>Nous faisons le point sur l’existant, les points forts et les priorités. Une sélection ciblée de rafraîchissements, d’aménagement et de mise en scène crée une présentation cohérente et soignée.</p></div></section>
    <section class="section"><span class="eyebrow">Une démarche pragmatique</span><h2>Les bons choix, au bon niveau.</h2>${steps([["Visiter & comprendre", "État des lieux, points forts, contraintes et calendrier de vente."], ["Prioriser", "Recommandations de rénovation légère et enveloppe à valider ensemble."], ["Préparer la visite", "Coordination des interventions, harmonisation et home staging."]])}</section>
    <section class="closing-cta"><span class="eyebrow">Un regard neuf sur votre bien</span><h2>Faisons le point sur votre logement.</h2>${CTA("Demander un devis gratuit")}</section>`;
  }

  function methodPage() {
    return `${intro("La méthode", "Une idée claire. Des étapes lisibles. Un projet qui avance.", "Le sur-mesure ne devrait pas être flou. À chaque phase, vous savez ce qui se dessine, ce qui se décide et ce que cela implique pour votre budget.")}
    <section class="section"><span class="eyebrow">Cinq étapes pour donner forme à votre projet</span><h2>Du brief jusqu’au dernier détail.</h2>${steps([["Brief", "On fait connaissance et l’on pose les envies, les usages, le lieu, les contraintes et le budget."], ["Esquisse & conception 3D", "Les premières pistes deviennent des volumes, des plans et une intention que l’on peut partager."], ["Matériaux & chiffrage", "Les choix de matières et l’enveloppe du projet sont travaillés et validés avec vous."], ["Réalisation ou envoi du kit", "On concrétise le projet avec le pilotage convenu ou la livraison de plans et d’une notice."], ["Décoration & livraison", "Les dernières finitions mettent le lieu en cohérence. Le projet est prêt à être vécu."]])}</section>
    <section class="section method-band"><span class="eyebrow">La ligne directrice</span><p class="method-equation">Idée <i>→</i> Plans avant / après <i>→</i> Budget <i>→</i> Réalisation</p><p>Un fil conducteur partagé, quelle que soit votre porte d’entrée.</p>${CTA("Parler de mon projet")}</section>`;
  }

  const pages = {
    accueil: home,
    projets: projetsPage,
    airbnb: airbnbPage,
    renovation: renovationPage,
    methode: methodPage,
    materiaux: () => `${intro("Matières & finitions", "Des choix tactiles, durables et à la bonne place.", "Les matériaux ne sont pas une finition tardive : ils participent au confort, à la personnalité et à la maîtrise du projet. On les choisit en fonction des usages, du lieu et de l’enveloppe.")}<section class="section"><span class="eyebrow">La matière, en nuances</span><h2>Une palette pensée avec le projet.</h2><div class="material-grid">${[["Bois clair", "Chaleureux, lumineux, accueillant.", "#c8a47d"], ["Lin naturel", "Une texture douce et discrète.", "#ddd2bb"], ["Terre cuite", "La note minérale aux tons chauds.", "#b97153"], ["Bleu profond", "Un ancrage sobre et intemporel.", "#24404b"], ["Métal patiné", "Un détail robuste, jamais froid.", "#8e8372"], ["Pierre douce", "La beauté des surfaces naturelles.", "#bcb5a6"]].map(([name, note, color]) => `<article class="material-swatch"><span style="--swatch:${color}" aria-hidden="true"></span><h3>${name}</h3><p>${note}</p></article>`).join("")}</div><p class="form-note">La sélection réelle dépend du projet, de la disponibilité des matériaux et du budget validé ensemble.</p></section><section class="closing-cta"><span class="eyebrow">Un lieu qui vous ressemble</span><h2>Composons ensemble la bonne palette.</h2>${CTA()}</section>`,
    environnement: () => `${intro("Ancrage & bon sens", "Concevoir avec le lieu, pas contre lui.", "Chaque projet commence par une écoute : celle du site, de son climat, de ses usages et de ce qui existe déjà. C’est cette attention qui permet de faire des choix cohérents plutôt que d’ajouter pour ajouter.")}<section class="section"><div class="principles-grid">${[["Observer d’abord", "Orientation, accès, vues et voisinage éclairent les décisions avant de dessiner."], ["Réutiliser quand c’est pertinent", "L’existant et les matières disponibles méritent d’être considérés avant d’envisager du neuf."], ["Choisir en connaissance de cause", "Durabilité, entretien, confort et budget sont discutés sans promesse environnementale abstraite."], ["Adapter au quotidien", "Un lieu conçu pour son usage est plus simple à habiter, entretenir et faire évoluer."]].map(([heading, text], i) => `<article class="principle-card"><span>0${i + 1}</span><h3>${heading}</h3><p>${text}</p></article>`).join("")}</div></section><section class="closing-cta"><span class="eyebrow">Commencer par regarder le lieu</span><h2>Parlons de votre terrain et de votre projet.</h2>${CTA()}</section>`,
    boutique: () => `${intro("Boutique", "Décoration et mobilier, pour l’intérieur comme pour l’extérieur.", "Une sélection d’articles de décoration et de mobilier d’intérieur et d’extérieur, choisis pour prolonger l’univers des lieux que je conçois. [À COMPLÉTER] Le catalogue ci-dessous est un exemple : renseignez vos produits dans assets/data/produits.json.")}
    <section class="section shop" data-shop>
      <div class="shop-toolbar">
        <div class="chips" role="group" aria-label="Filtrer par catégorie"></div>
        <div class="shop-controls">
          <label>Rechercher un produit <input type="search" name="q" autocomplete="off" placeholder="Nom, matière…"></label>
          <label>Trier par <select name="sort"><option value="new">Nouveautés</option><option value="asc">Prix croissant</option><option value="desc">Prix décroissant</option></select></label>
        </div>
      </div>
      <p class="shop-count" role="status" aria-live="polite"></p>
      <ul class="product-grid"></ul>
    </section>
    <section class="section"><div class="kit-mention"><div><h2>Kits à monter</h2><p>Les kits de construction (plans et notice) sont proposés séparément de la boutique, sur demande.</p></div>${LINK("Découvrir les kits à monter", "kits.html")}</div></section>
    <dialog class="product-dialog" aria-label="Fiche produit"></dialog>`,
    kits: () => `${intro("Kits à monter", "Des projets que l’on peut aussi monter soi-même.", "Envie de prendre en main la réalisation ? Certains projets de création insolite peuvent être proposés en kit, avec plans et notice, sur demande.")}<section class="section kit-panel"><div><span class="eyebrow">Kit de conception</span><h2>Le projet dessiné. La réalisation, à votre rythme.</h2><p>Chaque kit est élaboré selon le projet. Parlons de la faisabilité, du niveau de détail des plans et de la manière dont vous souhaitez avancer.</p><p class="kit-price">Tarif <strong>${config.prices}</strong></p><p class="form-note">La disponibilité et le contenu sont confirmés après étude de votre demande.</p>${CTA("Demander un kit")}</div>${imageFrame("Étude de conception avec plans de projet", "kit-image")}</section>`,
    cgv: () => `${intro("Boutique", "Conditions générales de vente", "Modèle à personnaliser et à faire relire par un professionnel du droit avant l’ouverture de la vente en ligne.")}<article class="section legal-copy"><h2>1. Vendeur</h2><p>Les articles de la boutique sont vendus par ${config.legalName}, nom commercial Conception Insolite, ${config.legalAddress}. SIRET : ${config.siret}. Contact : ${config.contactEmail}.</p><h2>2. Objet et champ d’application</h2><p>Les présentes conditions régissent les ventes d’articles de décoration et de mobilier proposés sur ce site. Les kits à monter et les prestations de conception font l’objet d’un devis distinct.</p><h2>3. Produits</h2><p>Les caractéristiques essentielles de chaque produit (matières, dimensions, disponibilité) sont indiquées sur sa fiche. Les photographies sont indicatives ; de légères variations de teinte ou de veinage sont normales pour les matières naturelles.</p><h2>4. Prix</h2><p>Les prix sont indiqués en euros, toutes taxes comprises, hors frais de livraison. Prix et TVA : ${config.prices}. Le vendeur se réserve le droit de modifier ses prix à tout moment ; le prix applicable est celui affiché au moment de la commande.</p><h2>5. Commande et paiement</h2><p>La commande est confirmée après validation du paiement via le prestataire de paiement indiqué sur la fiche produit. [À COMPLÉTER] Prestataire de paiement et moyens acceptés.</p><h2>6. Livraison</h2><p>Les modalités, délais et frais figurent dans la page <a href="livraison-retours.html">Livraison et retours</a>.</p><h2>7. Droit de rétractation</h2><p>Le consommateur dispose de 14 jours à compter de la réception pour se rétracter, sans motif, sauf exceptions légales (par exemple biens confectionnés selon ses spécifications). Les modalités sont détaillées dans la page <a href="livraison-retours.html">Livraison et retours</a>. [À COMPLÉTER] Formulaire type de rétractation.</p><h2>8. Garanties légales</h2><p>Le vendeur reste tenu de la garantie légale de conformité et de la garantie des vices cachés, dans les conditions prévues par le Code de la consommation et le Code civil. [À COMPLÉTER] Rappel des textes à reproduire.</p><h2>9. Responsabilité</h2><p>La responsabilité du vendeur est engagée dans les limites prévues par la loi. Il n’est pas responsable des dommages résultant d’un usage non conforme du produit.</p><h2>10. Données personnelles</h2><p>Les données nécessaires au traitement de la commande sont utilisées uniquement à cette fin. Contact : ${config.privacyContact}.</p><h2>11. Médiation et litiges</h2><p>En cas de litige, le consommateur peut recourir gratuitement à un médiateur de la consommation. [À COMPLÉTER] Nom et coordonnées du médiateur. Le droit français est applicable.</p></article>`,
    "livraison-retours": () => `${intro("Boutique", "Livraison et retours", "Modèle à personnaliser selon vos transporteurs et vos conditions réelles, puis à faire relire.")}<article class="section legal-copy"><h2>Zones et délais de livraison</h2><p>Zones desservies : ${config.serviceArea}. Délai de préparation : [À COMPLÉTER]. Délai de livraison estimé : [À COMPLÉTER].</p><h2>Frais de livraison</h2><p>[À COMPLÉTER] Barème des frais, seuil de gratuité éventuel, livraison de mobilier volumineux.</p><h2>Réception et réserves</h2><p>Vérifiez l’état du colis à la livraison. En cas de dommage, émettez des réserves précises auprès du transporteur et contactez-nous à ${config.contactEmail} dans les meilleurs délais.</p><h2>Retours et rétractation</h2><p>Vous disposez de 14 jours après réception pour vous rétracter. Le produit doit être retourné dans son état d’origine. [À COMPLÉTER] Adresse de retour, prise en charge des frais de retour.</p><h2>Produits non repris</h2><p>Les produits personnalisés ou confectionnés selon vos spécifications ne peuvent pas être repris, sauf défaut de conformité. [À COMPLÉTER] Liste des exclusions.</p><h2>Remboursement</h2><p>Le remboursement intervient au plus tard 14 jours après la réception du produit retourné, par le même moyen de paiement. [À COMPLÉTER] Délai réel.</p></article>`,
    realisations: () => `${intro("Sélection de projets", "Chaque réalisation commence par une conversation.", "Voici l’espace réservé à vos créations, transformations avant/après et histoires de projets. Cette sélection sera complétée au fil des réalisations.")}<section class="section"><div class="project-grid">${[["Création insolite", "Van aménagé · plans et aménagement", "van"], ["Créer une parenthèse", "Dôme · étude de conception", "dome"], ["Révéler le potentiel", "Airbnb · transformation avant / après", "airbnb"], ["Imaginer un refuge", "Cabane perchée · esquisse &amp; conception", "cabane"]].map(([tag, title, id], i) => `<article class="project-card reveal"><a href="${id === "airbnb" ? "airbnb.html" : `${id}.html`}" aria-label="Découvrir le projet ${title}"><span class="project-visual" aria-hidden="true">${id === "airbnb" ? '<img src="assets/da-concept-320.webp" alt="" width="320" height="223" loading="lazy" decoding="async">' : universeDrawing(id)}</span><span class="eyebrow">${tag}</span><h3>${title}</h3><span class="text-link">Découvrir l’univers →</span></a></article>`).join("")}</div><p class="form-note">Les illustrations actuelles sont des visuels d’ambiance, pas des photographies de réalisations livrées. Remplacez-les par vos propres images avant publication du portfolio.</p></section><section class="closing-cta"><span class="eyebrow">La prochaine histoire peut être la vôtre</span><h2>Imaginons votre projet, ensemble.</h2>${CTA()}</section>`,
    "qui-suis-je": () => `${intro("Qui suis-je ?", "Un regard créatif, un interlocuteur unique.", `Je suis ${config.personName}, concepteur de lieux et de séjours singuliers. J’accompagne les projets du premier échange à leur concrétisation, avec la même attention portée à l’usage, aux détails et au budget.`)}<section class="section split-section about-section"><div class="about-monogram" aria-hidden="true"><span>CI</span><i></i></div><div><span class="eyebrow">Une approche de terrain</span><h2>Concevoir, c’est aussi savoir faire avancer.</h2><p>J’aime relier l’idée à la réalité : comprendre les contraintes, dessiner des solutions justes et rendre les décisions lisibles. Avec un seul interlocuteur, les choix de conception, de budget et de réalisation restent liés tout au long du projet.</p><p>Chaque lieu commence par une conversation, jamais par une formule toute faite.</p><p><strong>Mon parcours : ${config.biography}</strong></p>${LINK("Faire connaissance")}</div></section>`,
    contact: () => `${intro("Parlons-en", "Parlez-moi de votre projet.", "Une idée encore floue ou un projet déjà bien avancé ? Quelques mots suffisent pour démarrer la conversation. Je vous répondrai à l’adresse ${config.contactEmail}.")}<section class="section contact-layout"><div class="contact-aside"><span class="eyebrow">Le premier échange</span><h2>Chaque projet commence par une écoute.</h2><p>Quelques informations m’aideront à mieux comprendre vos envies et à préparer un premier retour.</p><dl><dt>E-mail</dt><dd>${config.contactEmail}</dd><dt>Téléphone</dt><dd>${config.phone}</dd><dt>Zone d’intervention</dt><dd>${config.serviceArea}</dd></dl></div>${contactForm()}</section>`,
    cgu: () => `${intro("Informations pratiques", "Conditions générales d’utilisation", "Modèle à personnaliser et à faire relire par un professionnel du droit avant publication.")}<article class="section legal-copy"><h2>1. Éditeur du site</h2><p>Le site est édité par ${config.legalName}, sous le nom commercial Conception Insolite, domicilié(e) à ${config.legalAddress}. SIRET : ${config.siret}. Contact : ${config.contactEmail}.</p><h2>2. Objet</h2><p>Les présentes conditions encadrent l’accès et l’utilisation du site. La consultation du site vaut acceptation des conditions ci-dessous. Si vous ne les acceptez pas, veuillez cesser votre navigation.</p><h2>3. Informations publiées</h2><p>Les contenus sont présentés à titre informatif et ne constituent pas un devis, un conseil technique individualisé ni une offre contractuelle. Les prestations, tarifs, délais et périmètres sont précisés dans un document distinct accepté par les parties.</p><h2>4. Propriété intellectuelle</h2><p>Les textes, éléments graphiques, signes distinctifs et contenus du site sont protégés par les droits applicables. Toute reproduction ou représentation non autorisée est interdite. Les visuels de démonstration ne représentent pas des réalisations livrées.</p><h2>5. Responsabilité</h2><p>L’éditeur s’efforce de maintenir des informations exactes et le site accessible, sans garantir l’absence d’erreur ni une disponibilité ininterrompue. L’utilisateur reste responsable de son équipement et de son utilisation du site.</p><h2>6. Données personnelles</h2><p>Le formulaire prépare un courriel dans votre application de messagerie. Le site ne transmet ni ne stocke les informations saisies. Les échanges envoyés volontairement sont utilisés pour répondre à votre demande. Pour exercer vos droits, contactez ${config.privacyContact}.</p><h2>7. Cookies</h2><p>Le site n’utilise pas de cookie publicitaire ou de mesure d’audience. La fermeture du bandeau d’information est mémorisée localement dans le navigateur.</p><h2>8. Droit applicable</h2><p>Les présentes conditions sont soumises au droit français, sous réserve des règles impératives applicables.</p><p class="legal-warning">Modèle indicatif : à adapter à votre situation juridique réelle et à faire relire avant publication.</p></article>`,
    "mentions-legales": () => `${intro("Informations pratiques", "Mentions légales", "Les informations signalées [À COMPLÉTER] doivent être renseignées avant la mise en ligne.")}<article class="section legal-copy"><h2>Éditeur</h2><p>Nom / raison sociale : ${config.legalName}<br>Nom commercial : Conception Insolite<br>Adresse : ${config.legalAddress}<br>SIRET : ${config.siret}<br>E-mail : ${config.contactEmail}<br>Téléphone : ${config.phone}</p><h2>Directeur ou directrice de la publication</h2><p>${config.legalName}</p><h2>Hébergement</h2><p>Hébergeur : ${config.hostingProvider}<br>Adresse et coordonnées : ${config.hostingAddress}</p><h2>Propriété intellectuelle</h2><p>Les contenus originaux du site sont protégés par le droit de la propriété intellectuelle. Toute réutilisation nécessite l’autorisation préalable de leurs titulaires.</p><h2>Données personnelles</h2><p>Le formulaire de contact prépare un e-mail dans votre propre messagerie et n’enregistre pas vos données sur le site. Pour toute question relative à vos données ou à l’exercice de vos droits, contactez ${config.privacyContact}.</p><h2>Cookies</h2><p>${config.cookieNotice}</p><p class="legal-warning">Modèle indicatif : faire vérifier les mentions par un professionnel avant publication.</p></article>`
  };

  const universe = univers.find((item) => item.id === page);
  document.title = `${pageTitle} — ${config.name}`;
  const desc = descriptions[page] || (universe ? `${universe.intro} ${config.name} vous accompagne de la conception à la réalisation.` : `${pageTitle} ${config.name}. ${config.signature}`);
  document.querySelector('meta[name="description"]').content = desc;
  document.querySelector('meta[property="og:title"]').content = `${pageTitle} — ${config.name}`;
  document.querySelector('meta[property="og:description"]').content = desc;
  if (isConfigured(config.siteUrl)) {
    const siteUrl = config.siteUrl.replace(/\/+$/, "");
    const path = window.location.pathname.split("/").pop();
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = path && path !== "index.html" ? `${siteUrl}/${path}` : `${siteUrl}/`;
    document.head.append(canonical);
    document.querySelector('meta[property="og:image"]').content = `${siteUrl}/assets/da-concept.jpg`;
  }
  document.querySelector("#contenu").innerHTML = universe ? universePage(universe) : (pages[page] || home)();

  const footerEmail = isConfigured(config.contactEmail) ? link(`mailto:${config.contactEmail}`, config.contactEmail) : `<span>E-mail : ${config.contactEmail}</span>`;
  const footerPhone = isConfigured(config.phone) ? link(phoneHref, config.phone) : `<span>Téléphone : ${config.phone}</span>`;
  const socialLinks = [["Instagram", config.instagram], ["Pinterest", config.pinterest]].map(([label, url]) => isConfigured(url) ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>` : `<span>${label} : ${url}</span>`).join("");
  const studioLinks = [["methode.html", "Méthode"], ["materiaux.html", "Matériaux"], ["environnement.html", "Environnement"], ["realisations.html", "Réalisations"], ["qui-suis-je.html", "Qui sommes-nous ?"], ["boutique.html", "Boutique"], ["kits.html", "Kits à monter"]];
  document.querySelector("#site-footer").innerHTML = `<footer class="site-footer"><div class="footer-inner"><div class="footer-main"><a class="brand footer-brand" href="index.html"><span class="brand-monogram" aria-hidden="true">CI</span><span class="brand-name">Conception Insolite</span></a><p>${config.signature}</p>${LINK("Parlons de votre projet")}</div><div class="footer-links"><div><span class="eyebrow">Créations insolites</span>${univers.map((item) => link(`${item.id}.html`, item.title)).join("")}</div><div><span class="eyebrow">Le studio</span>${studioLinks.map(([href, label]) => link(href, label)).join("")}</div><div><span class="eyebrow">Contact &amp; informations</span>${footerEmail}${footerPhone}${socialLinks}${link("cgu.html", "CGU")}${link("cgv.html", "CGV")}${link("livraison-retours.html", "Livraison et retours")}${link("mentions-legales.html", "Mentions légales")}</div></div></div><div class="footer-bottom"><span>© <span id="current-year"></span> Conception Insolite</span><span>Zone d’intervention : ${config.serviceArea}</span></div></footer>`;
  document.querySelector("#current-year").textContent = new Date().getFullYear();

  // Menu : panneau plein écran sur mobile (croix, Échap, clic en dehors des liens), menu horizontal sur bureau.
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const closeButton = nav.querySelector(".nav-close");
  const desktopNavigation = window.matchMedia("(min-width: 1180px)");
  nav.inert = !desktopNavigation.matches;
  function setMenu(open, restoreFocus = true) {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.querySelector(".sr-only").textContent = open ? "Fermer le menu" : "Ouvrir le menu";
    nav.classList.toggle("is-open", open);
    nav.inert = !open && !desktopNavigation.matches;
    document.body.classList.toggle("menu-open", open);
    if (open) closeButton.focus();
    else if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener("click", () => setMenu(true));
  closeButton.addEventListener("click", () => setMenu(false));
  nav.addEventListener("click", (event) => { if (!desktopNavigation.matches && !event.target.closest("a, button")) setMenu(false); });
  nav.addEventListener("click", (event) => { if (event.target.closest("a")) setMenu(false, false); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) setMenu(false);
    if (event.key === "Tab" && nav.classList.contains("is-open")) {
      const items = [...nav.querySelectorAll("a, button")];
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  desktopNavigation.addEventListener("change", (event) => {
    nav.inert = !event.matches;
    if (event.matches) setMenu(false, false);
  });

  // Barre mobile « Appeler / Devis gratuit » : visible après le haut de page.
  const mobileBar = document.querySelector(".mobile-bar");
  const updateMobileBar = () => mobileBar.classList.toggle("is-visible", window.scrollY > Math.max(320, window.innerHeight * .6));
  window.addEventListener("scroll", updateMobileBar, { passive: true });
  updateMobileBar();

  const form = document.querySelector("#project-form");
  if (form) {
    // Préremplissage depuis la boutique : contact.html?produit=Nom&ref=id
    const params = new URLSearchParams(window.location.search);
    if (params.get("produit")) {
      form.elements.projectType.value = "Boutique : demande de produit";
      form.elements.message.value = `Bonjour, je souhaite des informations sur le produit « ${params.get("produit")} »${params.get("ref") ? ` (réf. ${params.get("ref")})` : ""}.\n`;
    }
    const messages = { valueMissing: "Merci de renseigner ce champ.", typeMismatch: "Merci d’indiquer une adresse e-mail valide." };
    const showError = (field) => {
      let note = field.parentElement.querySelector(".field-error");
      if (field.checkValidity()) { field.removeAttribute("aria-invalid"); note?.remove(); return; }
      if (!note) { note = document.createElement("span"); note.className = "field-error"; note.id = `${field.name}-error`; field.parentElement.append(note); }
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", note.id);
      note.textContent = messages[Object.keys(messages).find((key) => field.validity[key])] || field.validationMessage;
    };
    form.addEventListener("focusout", (event) => { if (event.target.matches("[required]")) showError(event.target); });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const fields = [...form.querySelectorAll("[required]")];
      fields.forEach(showError);
      const firstInvalid = fields.find((field) => !field.checkValidity());
      if (firstInvalid) { firstInvalid.focus(); return; }
      const values = new FormData(form);
      const subject = `Projet ${values.get("projectType")} — ${values.get("name")}`;
      const body = [
        `Nom : ${values.get("name")}`, `E-mail : ${values.get("email")}`,
        `Téléphone : ${values.get("phone") || "Non renseigné"}`, `Type de projet : ${values.get("projectType")}`,
        `Lieu : ${values.get("place") || "Non renseigné"}`, `Budget : ${values.get("budget") || "Non renseigné"}`,
        `Délai : ${values.get("timeline") || "Non renseigné"}`, "", "Mon projet :", values.get("message")
      ].join("\n");
      document.querySelector(".form-status").textContent = `Votre message est prêt. Si votre application de messagerie ne s’ouvre pas, écrivez directement à ${config.contactEmail}.`;
      window.location.href = `mailto:${config.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Avis : grille sur bureau, défilement horizontal avec flèches sur mobile.
  document.querySelectorAll("[data-reviews]").forEach((box) => {
    const list = box.querySelector(".reviews-list");
    const [prev, next] = box.querySelectorAll(".carousel-btn");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const update = () => {
      prev.disabled = list.scrollLeft <= 2;
      next.disabled = list.scrollLeft + list.clientWidth >= list.scrollWidth - 2;
    };
    box.querySelectorAll(".carousel-btn").forEach((button) => button.addEventListener("click", () => {
      const card = list.querySelector(".review-card");
      list.scrollBy({ left: Number(button.dataset.dir) * (card.offsetWidth + 16), behavior: reduce ? "auto" : "smooth" });
    }));
    list.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  // Comparateur avant / après.
  document.querySelectorAll("[data-compare]").forEach((figure) => {
    const stage = figure.querySelector(".compare-stage");
    const range = figure.querySelector(".compare-range");
    const sync = () => {
      stage.style.setProperty("--pos", `${range.value}%`);
      range.setAttribute("aria-valuetext", `${range.value} % avant, ${100 - range.value} % après`);
    };
    range.addEventListener("input", sync);
    sync();
  });

  if (document.querySelector("[data-shop]")) initShop(document.querySelector("[data-shop]"));

  // Boutique : catalogue piloté par assets/data/produits.json.
  function initShop(root) {
    const grid = root.querySelector(".product-grid");
    const chips = root.querySelector(".chips");
    const search = root.querySelector('input[name="q"]');
    const sort = root.querySelector('select[name="sort"]');
    const count = root.querySelector(".shop-count");
    const dialog = document.querySelector(".product-dialog");
    const money = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
    const categories = ["Tout", "Mobilier intérieur", "Mobilier extérieur", "Décoration", "Luminaires", "Textiles"];
    const state = { products: [], category: "Tout" };
    const price = (p) => (typeof p.prix === "number" ? money.format(p.prix) : p.prix || "[À COMPLÉTER]");
    const media = (p, index = 0) => p.images?.[index]
      ? `<img src="${p.images[index]}" alt="${p.nom}" width="600" height="600" loading="lazy" decoding="async">`
      : `<span class="product-placeholder"><strong>${p.categorie}</strong>[À COMPLÉTER] Photo du produit</span>`;

    chips.innerHTML = categories.map((c) => `<button class="chip" type="button" aria-pressed="${c === state.category}">${c}</button>`).join("");
    chips.addEventListener("click", (event) => {
      const button = event.target.closest(".chip");
      if (!button) return;
      state.category = button.textContent;
      chips.querySelectorAll(".chip").forEach((chip) => chip.setAttribute("aria-pressed", String(chip === button)));
      render();
    });
    search.addEventListener("input", render);
    sort.addEventListener("change", render);

    function render() {
      const query = search.value.trim().toLowerCase();
      let list = state.products.filter((p) => (state.category === "Tout" || p.categorie === state.category)
        && (!query || [p.nom, p.description, p.categorie, ...(p.matieres || [])].join(" ").toLowerCase().includes(query)));
      const numeric = (p) => (typeof p.prix === "number" ? p.prix : Infinity);
      if (sort.value === "asc") list = [...list].sort((a, b) => numeric(a) - numeric(b));
      if (sort.value === "desc") list = [...list].sort((a, b) => (typeof b.prix === "number" ? b.prix : -1) - (typeof a.prix === "number" ? a.prix : -1));
      count.textContent = `${list.length} produit${list.length > 1 ? "s" : ""}`;
      grid.innerHTML = list.length ? list.map((p) => `<li><article class="product-card"><div class="product-media">${media(p)}</div><div class="product-body"><span class="product-category">${p.categorie}</span><h3>${p.nom}</h3><span class="product-price">${price(p)}</span><button class="button" type="button" data-id="${p.id}">Voir le produit ${arrow}</button></div></article></li>`).join("")
        : `<li class="shop-empty">Aucun produit ne correspond à votre recherche.</li>`;
    }

    function open(id, opener) {
      const p = state.products.find((item) => item.id === id);
      if (!p) return;
      const canBuy = typeof p.lienAchat === "string" && /^https?:\/\//.test(p.lienAchat);
      const ask = `contact.html?produit=${encodeURIComponent(p.nom)}&ref=${encodeURIComponent(p.id)}`;
      dialog.innerHTML = `<button class="dialog-close" type="button" aria-label="Fermer la fiche produit"><span aria-hidden="true">×</span></button>
        <div class="dialog-grid"><div><div class="gallery-main">${media(p)}</div>${(p.images || []).length > 1 ? `<div class="gallery-thumbs">${p.images.map((src, i) => `<button type="button" data-index="${i}" aria-label="Photo ${i + 1}"${i === 0 ? ' aria-current="true"' : ""}><img src="${src}" alt="" width="64" height="64" loading="lazy"></button>`).join("")}</div>` : ""}</div>
        <div class="dialog-info"><span class="product-category">${p.categorie}</span><h2>${p.nom}</h2><p class="product-price">${price(p)}</p><p>${p.description}</p>
          <dl><dt>Matières</dt><dd>${(p.matieres || []).join(", ") || "[À COMPLÉTER]"}</dd><dt>Dimensions</dt><dd>${p.dimensions || "[À COMPLÉTER]"}</dd><dt>Disponibilité</dt><dd>${p.disponibilite || "[À COMPLÉTER]"}</dd></dl>
          <div class="dialog-actions">${canBuy ? `<a class="button" href="${p.lienAchat}" target="_blank" rel="noopener noreferrer">Acheter ${arrow}</a>` : ""}<a class="button${canBuy ? " button-ghost" : ""}" href="${ask}">Demander ce produit</a></div>
          ${canBuy ? "" : `<p class="form-note">[À COMPLÉTER] Lien d’achat (champ « lienAchat » dans produits.json).</p>`}</div></div>`;
      dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
      dialog.querySelector(".gallery-thumbs")?.addEventListener("click", (event) => {
        const thumb = event.target.closest("button");
        if (!thumb) return;
        dialog.querySelector(".gallery-main").innerHTML = media(p, Number(thumb.dataset.index));
        dialog.querySelectorAll(".gallery-thumbs button").forEach((b) => b.toggleAttribute("aria-current", b === thumb));
      });
      dialog.opener = opener;
      dialog.showModal();
    }
    grid.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-id]");
      if (button) open(button.dataset.id, button);
    });
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener("close", () => dialog.opener?.focus());

    fetch("assets/data/produits.json")
      .then((response) => { if (!response.ok) throw new Error(response.status); return response.json(); })
      .then((data) => {
        state.products = data.produits || [];
        render();
        const wanted = decodeURIComponent(window.location.hash.slice(1));
        if (wanted) open(wanted);
      })
      .catch(() => {
        count.textContent = "";
        grid.innerHTML = `<li class="shop-error">Le catalogue n’a pas pu être chargé. Si vous ouvrez le fichier directement, lancez plutôt le site avec Live Server (voir le README).</li>`;
      });
  }

  const cookieNotice = document.querySelector("#cookie-notice");
  if (!localStorage.getItem("ci-cookie-notice-seen")) {
    cookieNotice.innerHTML = `<p>${config.cookieNotice}</p><button type="button" class="cookie-dismiss">Compris</button>`;
    cookieNotice.hidden = false;
    cookieNotice.querySelector("button").addEventListener("click", () => {
      localStorage.setItem("ci-cookie-notice-seen", "true");
      cookieNotice.hidden = true;
    });
  }
  document.querySelectorAll("main > section, main > article").forEach((item) => item.classList.add("reveal"));
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); currentObserver.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add("is-visible"));
})();
