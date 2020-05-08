# Actions par défaut du navigateur

Beaucoup d'évènements mènent à l'exécution d'actions par le navigateur.

Par exemple:

- Un clic sur un lien -- initie la navigation vers son URL.
- Un clic sur un bouton d'envoi de formulaire -- initie son envoie vers le serveur.
- Appuyer sur un bouton de la souris au-dessus d'un texte et la déplacer -- sélectionne le texte.

Si nous gérons un évènement avec Javascript, nous pouvons ne pas avoir envie de déclencher l'action de navigateur associée, et déclencher un autre comportement à la place.

## Empêcher les actions du navigateur

Il y a deux manières de dire au navigateur que nous ne souhaitons pas qu'il agisse:

- La manière principale est d'utiliser l'objet `event`. Il y a une méthode `event.preventDefault()`.
- Si le gestionnaire d'évènement a été assigné en utilisant `on<event>` (pas par `addEventListener`), alors renvoyer `false` fonctionne de la même manière.

Dans cet HTML un clic sur un lien n'entraine pas une navigation, le navigateur ne fait rien:

```html autorun height=60 no-beautify
<a href="/" onclick="return false">Cliquez ici</a>
ou
<a href="/" onclick="event.preventDefault()">ici</a>
```

Dans le prochain exemple nous allons utiliser cette technique pour créer un menu avec Javascript.

```warn header="Renvoyer `false` depuis un gestionnaire d'évènement est une exception"
La valeur renvoyée par un gestionnaire d'évènement est généralement ignorée.

La seule exception est `return false` depuis un gestionnaire assigné en utilisant `on<event>`.

Dans tous les autres cas, la valeur de `return` est ignorée. Il n'y a aucune raison de renvoyer `true`.
```

### Exemple: le menu

Considérez le menu d'un site, comme ceci:

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```

Voici à quoi il ressemble avec un peu de CSS:

[iframe height=70 src="menu" link edit]

Les objets du menu sont implémentés comme des liens HTML `<a>`, pas des boutons `<button>`. Il y a plusieurs raisons pour ceci, par exemple:

- Beaucoup de gens aiment utiliser "clic droit" -- "ouvrir dans une nouvelle fenêtre". Si nous utilisons `<button>` ou `<span>`, cela ne fonctionne pas.
- Les moteurs de recherche suivent les liens `<a href="...">` lors de l'indexation.

Donc nous utilisons `<a>`. Mais normalement nous avons l'intention de gérer les clics avec Javascript. Donc nous devrions empêcher les actions par défaut du navigateur.

Comme ici:

```js
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...peut être en chargement depuis le serveur, génération d'UI etc

*!*
  return false; // empêche l'action du navigateur (ne va pas sur l'URL)
*/!*
};
```

Si nous enlevons `return false`, alors après l'exécution de notre code le navigateur fera son "action par défaut" -- naviguer vers l'URL dans `href`. Et nous n'avons pas besoin de ça ici comme nous gérons nous-mêmes les clics.

Au passage, utiliser la délégation d'évènement ici rend notre menu très flexible. Nous pouvons ajouter des listes imbriquées et les styliser en utilisant CSS pour "les faire glisser".

````smart header="Les évènements suivis"
Certains évènements se suivent les uns après les autres. Si nous empêchons le premier évènement, il n'y aura pas de second.

Par exemple, `mousedown` sur un champ `<input>` entraine un focus dessus, et l'évènement `focus`. Si nous empêchons l'évènement `mousedown`, il n'y a pas de focus.

Essayez de cliquer sur le premier `<input>` ci-dessous -- l'évènement `focus` se produit. Mais si vous cliquez sur le second, il n'y a pas de focus.

```html run autorun
<input value="Focus fonctionne" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Cliquez sur moi">
```

C'est parce que l'action du navigateur est annulée lors de `mousedown`. Le focus est toujours possible si nous utilisons une autre manière d'entrer dans le champ de saisie. Par exemple, la touche `Tab` pour passer du premier champ au deuxième. Mais plus avec le clic de la souris.
````

## L'option de gestionnaire "passive"

L'option facultative `passive: true` de `addEventListener` signale au navigateur que ce gestionnaire n'appellera pas `preventDefault()`.

Pourquoi cela pourrait-il être nécessaire?

Il y a certains évènements comme `touchmove` sur les appareils mobile (lorsque l'utilisateur déplace ses doigts sur l'écran), qui entrainent un défilement par défaut, mais ce défilement peut être empêché en utilisant `preventDefault()` dans le gestionnaire.

Donc lorsque le navigateur detecte un tel évènement, il doit d'abord traiter tous les gestionnaires, et si `preventDefault` n'est appelé nulle part, il peut continuer avec le défilement. Cela peut causer des délais et "tremblements" inutile dans l'UI.

L'option `passive: true` communique au navigateur que le gestionnaire n'annulera pas le défilement. Alors le navigateur défile immédiatement, fournissant ainsi une expérience fluide au maximum, et l'évènement est géré au passage.

Pour certains navigateurs (Firefox, Chrome), `passive` est `true` par défaut pour les évènements `touchstart` et `touchmove`.


## event.defaultPrevented

La propriété `event.defaultPrevented` est `true` si l'action par défaut a été empêchée, et `false` dans les autres cas.

Il y a un cas d'utilisation intéressant avec ceci.

Dans le chapitre <info:bubbling-and-capturing> nous avons parlé de `event.stopPropagation()` et pourquoi arrêter le bubbling est mauvais?

Parfois nous pouvons utiliser  `event.defaultPrevented` à la place, pour signaler aux autres gestionnaires d'évènement que l'évènement a été géré.

Voyons un exemple pratique.

Par défaut le navigateur affiche un menu contextuel avec des options standards lors de l'évènement `contextmenu` (clic droit). Nous pouvons empêcher cela et afficher le nôtre comme ceci:

```html autorun height=50 no-beautify run
<button>Clic droit affiche le menu contextuel du navigateur</button>

<button *!*oncontextmenu="alert('Affiche notre menu'); return false"*/!*>
  Clic droit affiche notre menu contextuel
</button>
```

Maintenant, en plus de ce menu contextuel nous voulons implémenter un menu contextuel sur tout le document.

Après un clic droit, le menu contextuel le plus proche devrait s'afficher.

```html autorun height=80 no-beautify run
<p>Clic droit ici pour le menu contextuel du document</p>
<button id="elem">Clic droit ici pour le menu contextuel du bouton</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Menu contextuel du bouton");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Menu contextuel du document");
  };
</script>
```

Le problème est que lorsque l'on clique sur `elem`, nous obtenons deux menus: le menu du bouton et (l'évènement remonte) le menu du document.

Comment régler cela? Une des solutions est de penser: "Quand nous gérons le clic droit dans le gestionnaire du bouton, arrêtons sa propagation" et utilisons `event.stopPropagation()`:

```html autorun height=80 no-beautify run
<p>Clic droit ici pour le menu contextuel du document</p>
<button id="elem">Clic droit ici pour le menu contextuel du bouton (réparé avec event.stopPropagation)</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
*!*
    event.stopPropagation();
*/!*
    alert("Menu contextuel du bouton");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Menu contextuel du document");
  };
</script>
```

Maintenant le bouton contextuel du menu fonctionne comme voulu. Mais le prix est elevé. Nous bloquons pour toujours l'accès aux informations sur les clics droits au code extérieur, comme les compteurs qui récoltent des statistiques. Ce n'est pas sage.

Une solution alternative est de vérifier dans le gestionnaire du `document` si l'action par défaut a été empêchée? Si c'est le cas, alors l'évènement a été géré, et nous n'avons pas besoin de réagir.


```html autorun height=80 no-beautify run
<p>Clic droit ici pour le menu contextuel du document (une vérification a été ajoutée avec event.defaultPrevented)</p>
<button id="elem">Clic droit ici pour le menu contextuel du bouton</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Menu contextuel du bouton");
  };

  document.oncontextmenu = function(event) {
*!*
    if (event.defaultPrevented) return;
*/!*

    event.preventDefault();
    alert("Menu contextuel du document");
  };
</script>
```

Maintenant tout fonctionne correctement. Si nous avons des éléments imbriqués, et que chacun d'eux possède son propre menu contextuel, cela fonctionnerait aussi. Assurez-vous juste de vérifier `event.defaultPrevented` dans chaque gestionnaire `contextmenu`.

```smart header="event.stopPropagation() et event.preventDefault()"
Comme nous pouvons le voir, `event.stopPropagation()` et `event.preventDefault()` (aussi connu comme `return false`) sont deux choses différentes. Ils n'ont pas liens.
```

```smart header="Architecture de menus contextuels imbriqués"
Il y a aussi des manières alternatives d'implémenter des menus contextuels imbriqués. Une d'elle est d'avoir un seul objet global avec un gestionnaire pour `document.oncontextmenu`, et d'autre méthodes pour nous permettre de stocker d'autres gestionnaires dedans.

L'objet captura tous les clics droit, et lancera le gestionnaire approprié parmi les gestionnaires stockés.

Mais chaque partie du code qui nécessite un menu contextuel devra avoir connaissance de cet objet et l'utiliser plutôt que le gestionnaire `contextmenu`.
```

## Résumé

Il y a plusieurs actions de navigateur par défaut:

- `mousedown` -- débute la sélection (déplacer la souris pour sélectionner).
- `click` sur `<input type="checkbox">` -- coche/décoche le `input`.
- `submit` -- ciquer sur un `<input type="submit">` oou appuyer sur `key:Enter` à l'intérieur d'un formulaire entraine le lancement de cet évènement, et le navigateur envoie le formulaire après.
- `keydown` -- appuyer sur une touche peut amener à ajouter un caractère dans un champ, ou d'autres actions.
- `contextmenu` -- l'évènement se déclenche lors d'un clic droit, l'action est d'afficher le menu contextuel du navigateur.
- ...il y en a plus...

Toutes les actions par défaut peuvent être empêchées si nous voulons gérer l'évènement exclusivement avec Javascript.

Pour empêcher une action par défaut -- utilisez soit `event.preventDefault()`, soit `return false`. La seconde méthode ne fonctionne que pour les gestionnaires assignés avec `on<event>`.

L'option `passive: true` de `addEventListener` dis au navigateur que l'action ne va pas être empêchée. C'est utile pour certains évènements de mobile, comme `touchstart` et `touchmove`, pour dire au navigateur qu'il ne devrait pas attendre que tous les gestionnaires soient terminés pour défiler la page.

Si l'action par défaut a été empêchée, la valeur de `event.defaultPrevented` devient `true`, sinon `false`.

```warn header="Restez sémantique, n'abusez pas"
Techniquement, en empêchant les actions par défaut et en ajoutant du Javascript nous pouvons personnaliser le comportement de n'importe quel élément. Par exemple, nous pouvons faire fonctionner un lien `<a>` comme un bouton, et un bouton `<button>` se comporter comme un lien (rediriger vers une autre URL ou autre).

Mais nous devrions généralement garder la signification sémantique des éléments HTML. Par exemple `<a>` devrait entrainer une navigation, pas un bouton.

Ce n'est pas "juste une bonne chose", cela rend votre HTML meilleur en terme d'accessibilité.

Aussi, si nous prenons l'exemple avec `<a>`, veuillez noter: un navigateur nous permet d'ouvrir de tels liens dans une nouvelle fenêtre (en faisant un clic droit dessus par exemple). Et les gens aiment ça. Mais si nous faisons un bouton qui se comporte comme un lien en utilisant Javascript et qui ressemble à un lien en utilisant CSS, les fonctionnalités de navigateur spécifiques à `<a>` ne fonctionneront toujours pas.
```
