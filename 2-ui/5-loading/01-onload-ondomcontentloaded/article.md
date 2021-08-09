# Page: DOMContentLoaded, load, beforeunload, unload

Le cycle de vie d'une page HTML comporte trois événements importants:

<<<<<<< HEAD
=======
- `DOMContentLoaded` -- the browser fully loaded HTML, and the DOM tree is built, but external resources like pictures `<img>` and stylesheets may not yet have loaded.
- `load` -- not only HTML is loaded, but also all the external resources: images, styles etc.
- `beforeunload/unload` -- the user is leaving the page.
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b

- `DOMContentLoaded` -- le navigateur a complètement chargé le HTML et l'arborescence DOM est construite, mais les ressources externes telles que les images `<img>` et les feuilles de style peuvent ne pas être encore chargées.
- `load` -- non seulement le HTML est chargé, mais également toutes les ressources externes : images, styles, etc.
- `beforeunload/unload` -- l'utilisateur quitte la page.


Chaque événement peut être utile:

- `DOMContentLoaded` événement -- DOM est prêt, le gestionnaire peut donc rechercher des nœuds DOM, initialiser l'interface.
- `load` événement -- les ressources externes sont chargées, donc les styles sont appliqués, les tailles d'image sont connues, etc.
- `beforeunload` événement -- l'utilisateur quitte: nous pouvons vérifier si l'utilisateur a enregistré les modifications et leur demander s'ils veulent vraiment partir.
- `unload` -- l'utilisateur est presque parti, mais nous pouvons toujours lancer certaines opérations, comme l'envoi de statistiques.

Explorons les détails de ces événements.

## DOMContentLoaded

L'événement `DOMContentLoaded` se produit sur l'objet `document`.

Nous devons utiliser `addEventListener` pour l'attraper:

```js
document.addEventListener("DOMContentLoaded", ready);
// pas "document.onDOMContentLoaded = ..."
```

Par exemple:

```html run height=200 refresh
<script>
  function ready() {
    alert('DOM is ready');


    // l'image n'est pas encore chargée (sauf si elle a été mise en cache), donc la taille est 0x0

    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

*!*
  document.addEventListener("DOMContentLoaded", ready);
*/!*
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

Dans l'exemple, le gestionnaire `DOMContentLoaded` s'exécute lorsque le document est chargé, afin qu'il puisse voir tous les éléments, y compris `<img>` dessous.

Mais il n'attend pas que l'image se charge. Ainsi, `alert` n'affiche aucune taille.

À première vue, l'événement `DOMContentLoaded` est très simple. L'arbre DOM est prêt -- voici l'événement. Il y a cependant quelques particularités.

### DOMContentLoaded et les scripts

Lorsque le navigateur traite un document HTML et rencontre une balise `<script>`, il doit s'exécuter avant de continuer à construire le DOM. C'est une précaution, car les scripts peuvent vouloir modifier DOM, avec `document.write` par exemple, donc `DOMContentLoaded` doit attendre.

Donc DOMContentLoaded se produit définitivement après de tels scripts:

```html run
<script>
  document.addEventListener("DOMContentLoaded", () => {
    alert("DOM ready!");
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

<script>
  alert("Library loaded, inline script executed");
</script>
```

Dans l'exemple ci-dessus, nous voyons d'abord "Library loaded...", puis "DOM ready!" (tous les scripts sont exécutés).

```warn header="Les scripts qui ne bloquent pas DOMContentLoaded"
Il existe deux exceptions à cette règle:
1. Les scripts avec l'attribut `async`, que nous aborderons [un peu plus tard](info:script-async-defer), ne bloquent pas `DOMContentLoaded`.
2. Les scripts qui sont générés dynamiquement avec `document.createElement('script')` puis ajoutés à la page Web ne bloquent pas non plus cet événement.
```

### DOMContentLoaded et les styles

Les feuilles de style externes n'affectent pas le DOM, donc `DOMContentLoaded` ne les attend pas.

Mais il y a une embûche. Si nous avons un script après le style, ce script doit attendre que la feuille de style se charge:

```html run
<link type="text/css" rel="stylesheet" href="style.css">
<script>
  // le script ne s'exécute pas tant que la feuille de style n'est pas chargée
  alert(getComputedStyle(document.body).marginTop);
</script>
```

La raison en est que le script peut souhaiter obtenir des coordonnées et d'autres propriétés d'éléments dépendant du style, comme dans l'exemple ci-dessus. Naturellement, il doit attendre le chargement des styles.

Comme `DOMContentLoaded` attend les scripts, il attend maintenant les styles avant eux également.

### Saisie automatique intégrée du navigateur

Firefox, Chrome et Opera remplissent automatiquement les formulairs sur `DOMContentLoaded`.

Par exemple, si la page a un formulaire avec login et mot de passe, et que le navigateur se souvient des valeurs, alors sur `DOMContentLoaded`, il peut essayer de les remplir automatiquement (si approuvé par l'utilisateur).

Donc, si `DOMContentLoaded` est reporté par des scripts à chargement long, le remplissage automatique attend également. Vous l'avez probablement vu sur certains sites (si vous utilisez le remplissage automatique du navigateur) - les champs de login/mot de passe ne sont pas remplis automatiquement immédiatement, mais il y a un délai jusqu'à ce que la page se charge complètement. C'est en fait le délai jusqu'à l'événement `DOMContentLoaded`.

## window.onload [#window-onload]

L'événement `load` sur l'objet `window` se déclenche lorsque la page entière est chargée, y compris les styles, images et autres ressources. Cet événement est disponible via la propriété `onload`.

L'exemple ci-dessous montre correctement les tailles d'image, car `window.onload` attend toutes les images:

```html run height=200 refresh
<script>
<<<<<<< HEAD
  window.onload = function() { // pareil que window.addEventListener('load', (event) => {
=======
  window.onload = function() { // can also use window.addEventListener('load', (event) => {
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b
    alert('Page loaded');

    // l'image est chargée à ce moment
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

## window.onunload

Lorsqu'un visiteur quitte la page, l'événement `unload` se déclenche sur `window`. Nous pouvons y faire quelque chose qui n'implique pas de retard, comme la fermeture des fenêtres contextuelles associées.

L'exception notable est l'envoi d'analyses.

Disons que nous recueillons des données sur la façon dont la page est utilisée: clics de souris, défilements, zones de page visualisées, etc.

Naturellement, l'événement `unload` est lorsque l'utilisateur nous quitte, et nous aimerions sauvegarder les données sur notre serveur.

Il existe une méthode spéciale `navigator.sendBeacon(url, data)` pour de tels besoins, décrite dans la spécification <https://w3c.github.io/beacon/>.

Il envoie les données en arrière-plan. La transition vers une autre page n'est pas retardée: le navigateur quitte la page, mais exécute toujours `sendBeacon`.

Voici comment l'utiliser:

```js
let analyticsData = { /* objet avec des données collectées */ };

window.addEventListener("unload", function() {
  navigator.sendBeacon("/analytics", JSON.stringify(analyticsData));
});
```

Lorsque la demande `sendBeacon` est terminée, le navigateur a probablement déjà quitté le document, donc il n'y a aucun moyen d'obtenir une réponse du serveur (qui est vide habituellement pour l'analyse).

Il y a aussi un marqueur `keepalive` pour les demandes "apres sortie du document" dans [fetch](info:fetch) méthode pour les demandes de réseau génériques. Vous pouvez trouver plus d'informations dans le chapitre <info:fetch-api>.


Si nous voulons annuler la transition vers une autre page, nous ne pouvons pas le faire ici. Mais nous pouvons utiliser un autre événement -- `onbeforeunload`.

## window.onbeforeunload [#window.onbeforeunload]

Si un visiteur a lancé la navigation hors de la page ou tente de fermer la fenêtre, le gestionnaire `beforeunload` demande une confirmation supplémentaire.

Si nous annulons l'événement, le navigateur peut demander au visiteur s'il en est sûr.

Vous pouvez l'essayer en exécutant ce code, puis en rechargeant la page:

```js run
window.onbeforeunload = function() {
  return false;
};
```

Pour des raisons historiques, renvoyer une chaîne non vide compte également comme une annulation de l'événement. Il y a quelque temps, les navigateurs le montraient sous forme de message, mais comme la [spécification moderne](https://html.spec.whatwg.org/#unloading-documents) le dit, ils ne devraient pas.

Voici un exemple:

```js run
window.onbeforeunload = function() {
  return "There are unsaved changes. Leave now?";
};
```

Le comportement a été modifié, car certains webmasters ont abusé de ce gestionnaire d'événements en affichant des messages trompeurs et ennuyeux. Donc, à l'heure actuelle, les anciens navigateurs peuvent toujours l'afficher sous forme de message, mais à part cela -- il n'y a aucun moyen de personnaliser le message affiché à l'utilisateur.

## readyState

Que se passe-t-il si nous définissons le gestionnaire `DOMContentLoaded` après le chargement du document?

Naturellement, il ne fonctionne jamais.

Il y a des cas où nous ne savons pas si le document est prêt ou non. Nous aimerions que notre fonction s'exécute lorsque le DOM est chargé, que ce soit maintenant ou plus tard.

La propriété `document.readyState` nous renseigne sur l'état de chargement actuel.

Il y a 3 valeurs possibles:

- `"loading"` -- le document est en cours de chargement.
- `"interactif"` -- le document a été entièrement lu.
- `"complete"` -- le document a été entièrement lu et toutes les ressources (comme les images) sont également chargées.

Nous pouvons donc vérifier `document.readyState` et configurer un gestionnaire ou exécuter le code immédiatement s'il est prêt.

Comme ceci:

```js
function work() { /*...*/ }

if (document.readyState == 'loading') {

  // en cours de chargement, attendez l'événement

  document.addEventListener('DOMContentLoaded', work);
} else {
  // DOM est prêt!
  work();
}
```

Il y a aussi l'événement `readystatechange` qui se déclenche lorsque l'état change, nous pouvons donc afficher tous ces états comme ceci:

```js run
// état actuel
console.log(document.readyState);

// afficher les changements d'état
document.addEventListener('readystatechange', () => console.log(document.readyState));
```

L'événement `readystatechange` est un mécanisme alternatif de suivi de l'état de chargement du document, il est apparu il y a longtemps. De nos jours, il est rarement utilisé.

Voyons le flux complet des événements pour l'exhaustivité.

Voici un document avec `<iframe>`, `<img>` et des gestionnaires qui consignent les événements:

```html
<script>
  log('initial readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="http://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>
```

Un example [dans le sandbox](sandbox:readystate).

La sortie typique:
1. [1] readyState:loading initiale
2. [2] readyState:interactive
3. [2] DOMContentLoaded
4. [3] iframe onload
5. [4] img onload
6. [4] readyState:complete
7. [4] window onload

Les nombres entre crochets indiquent l'heure approximative à laquelle cela se produit. Les événements étiquetés avec le même chiffre se produisent à peu près au même moment (+- quelques ms).

- `document.readyState` devient `interactive` juste avant `DOMContentLoaded`. Ces deux choses signifient en fait la même chose.
- `document.readyState` devient `complete` lorsque toutes les ressources (`iframe` et `img`) sont chargées. Ici, nous pouvons voir que cela se produit à peu près en même temps que `img.onload` (`img` est la dernière ressource) et `window.onload`. Passer à l'état `complete` signifie la même chose que `window.onload`. La différence est que `window.onload` fonctionne toujours après tous les autres gestionnaires de `load`.


## Résumé

Événements de chargement de page:

- L'événement `DOMContentLoaded` se déclenche sur `document` lorsque le DOM est prêt. Nous pouvons appliquer JavaScript aux éléments à ce stade.
  - Les scripts tel que `<script>...</script>` ou `<script src ="..."></script>` bloquent DOMContentLoaded, le navigateur attend leur exécution.
  - Les images et autres ressources peuvent également continuer à se charger.
- L'événement `load` sur `window` se déclenche lorsque la page et toutes les ressources sont chargées. Nous l'utilisons rarement, car il n'est généralement pas nécessaire d'attendre si longtemps.
- L'événement `beforeunload` sur `window` se déclenche lorsque l'utilisateur veut quitter la page. Si nous annulons l'événement, le navigateur demande si l'utilisateur souhaite vraiment partir (par exemple, nous avons des modifications non enregistrées).
- L'événement `unload` sur `window` se déclenche lorsque l'utilisateur quitte enfin, dans le gestionnaire nous ne pouvons faire que des choses simples qui n'impliquent pas de retards ou de demandes à un utilisateur. En raison de cette limitation, il est rarement utilisé. Nous pouvons envoyer une requête réseau avec `navigator.sendBeacon`.
- `document.readyState` est l'état actuel du document, les modifications peuvent être suivies dans l'événement `readystatechange`:
  - `loading` -- le document est en cours de chargement.
  - `interactive` -- le document est analysé, se produit à peu près au même moment que `DOMContentLoaded`, mais avant lui.
  - `complete` -- le document et les ressources sont chargés, se produit à peu près en même temps que` window.onload`, mais avant lui.
