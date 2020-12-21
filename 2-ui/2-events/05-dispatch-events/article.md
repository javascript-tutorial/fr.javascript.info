# Distribution d'événements personnalisés

Nous pouvons non seulement affecter des gestionnaires, mais également générer des événements à partir de JavaScript.

Les événements personnalisés peuvent être utilisés pour créer des "composants graphiques". Par exemple, un élément racine de notre propre menu basé sur JS peut déclencher des événements indiquant ce qui se passe avec le menu: `open` (menu ouvert), `select` (un élément est sélectionné) et ainsi de suite. Un autre code peut écouter les événements et observer ce qui se passe avec le menu.

Nous pouvons générer non seulement des événements complètement nouveaux, que nous inventons pour nos propres besoins, mais aussi des événements intégrés, tels que `click`, `mousedown`, etc. Cela peut être utile pour les tests automatisés.

## Constructeur d'événements

<<<<<<< HEAD
Les classes d'événements intégrées forment une hiérarchie, similaire aux classes d'éléments DOM. La racine est la classe intégrée [Event](http://www.w3.org/TR/dom/#event).
=======
Built-in event classes form a hierarchy, similar to DOM element classes. The root is the built-in [Event](http://www.w3.org/TR/dom/#event) class.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Nous pouvons créer des objets `Event` comme ceci:

```js
let event = new Event(type[, options]);
```

Arguments:

- *type* -- type d'événement, soit une chaîne comme `"click"` ou la nôtre comme `"my-event"`.
- *options* -- l'objet avec deux propriétés facultatives:
  - `bubbles: true/false` -- si `true`, alors l'événement bouillonne.
  - `cancelable: true/false` -- si `true`, alors "l'action par défaut" peut être empêchée. Plus tard, nous verrons ce que cela signifie pour les événements personnalisés.

  Par défaut, les deux sont "false": `{bubbles: false, cancelable: false}`.

## dispatchEvent

Après la création d'un objet événement, nous devons le "lancer" sur un élément en utilisant l'appel `elem.dispatchEvent(event)`.

Ensuite, les gestionnaires réagissent comme s'il s'agissait d'un événement de navigateur normal. Si l'événement a été créé avec le marqueur `bubbles`, alors il bouillonne.

Dans l'exemple ci-dessous l'événement `click` est initié avec JavaScript. Le gestionnaire fonctionne de la même manière que si le bouton était cliqué:

```html run no-beautify
<button id="elem" onclick="alert('Click!');">Autoclick</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

```smart header="event.isTrusted"
Il existe un moyen de distinguer un événement utilisateur "réel" d'un événement généré par script.

La propriété `event.isTrusted` est `true` pour les événements qui proviennent d'actions réelles de l'utilisateur et `false` pour les événements générés par un script.
```

## Exemple de bouillonnement

Nous pouvons créer un événement qui bouillonne avec le nom `"hello"` et l'attraper sur `document`.

Tout ce dont nous avons besoin de faire est de définir `bulles` en tant que `true`:

```html run no-beautify
<h1 id="elem">Hello from the script!</h1>

<script>
  // attraper sur document...
  document.addEventListener("hello", function(event) { // (1)
    alert("Hello from " + event.target.tagName); // Hello de H1
  });

  // ...distribué sur elem!
  let event = new Event("hello", {bubbles: true}); // (2)
  elem.dispatchEvent(event);

  // le gestionnaire sur le document activera et affichera le message.

</script>
```


Remarques:

1. Nous devrions utiliser `addEventListener` pour nos événements personnalisés, car `on<event>` n'existe que pour les événements intégrés, `document.onhello` ne fonctionne pas.
2. Il est essentiel de définir `bubbles: true`, sinon l'événement ne bouillonnera pas.

Le mécanisme de bouillonnement est le même pour les événements intégrés (`click`) et personnalisés (`hello`). Il existe également des étapes de capture et de bouillonnement.

## MouseEvent, KeyboardEvent et autres

Voici une courte liste de classes pour les événements UI de la [spécification](https://www.w3.org/TR/uievents):

- `UIEvent`
- `FocusEvent`
- `MouseEvent`
- `WheelEvent`
- `KeyboardEvent`
- ...

Nous devrions les utiliser au lieu de `new Event` si nous voulons créer de tels événements. Par exemple, `new MouseEvent("click")`.

Le bon constructeur permet de spécifier des propriétés standard pour ce type d'événement.

Comme `clientX/clientY` pour un événement de souris:

```js run
let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // 100
*/!*
```

Remarque: le constructeur générique `Event` ne le permet pas.

Essayons:

```js run
let event = new Event("click", {
  bubbles: true, // bouillonne uniquement et annulable
  cancelable: true, // travail dans le constructeur de l'événement
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // indéfini, la propriété inconnue est ignorée!
*/!*
```

Techniquement, nous pouvons contourner cela en attribuant directement `event.clientX=100` après la création. C'est donc une question de commodité et de respect des règles. Les événements générés par le navigateur ont toujours le bon type.

La liste complète des propriétés des différents événements UI se trouve dans la spécification, par exemple, [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent).

## Événements personnalisés

Pour nos propres types d'événements comme `"hello"`, nous devrions utiliser `new CustomEvent`. Techniquement, [CustomEvent](https://dom.spec.whatwg.org/#customevent) est identique à `Event`, à une exception près.

Dans le deuxième argument (objet), nous pouvons ajouter une propriété supplémentaire `detail` pour toute information personnalisée que nous voulons transmettre avec l'événement.

Par exemple:

```html run refresh
<h1 id="elem">Hello for John!</h1>

<script>
  // des détails supplémentaires sont fournis avec l'événement au gestionnaire
  elem.addEventListener("hello", function(event) {
    alert(*!*event.detail.name*/!*);
  });

  elem.dispatchEvent(new CustomEvent("hello", {
*!*
    detail: { name: "John" }
*/!*
  }));
</script>
```

La propriété `detail` peut avoir n'importe quelle donnée. Techniquement, nous pourrions vivre sans, car nous pouvons attribuer n'importe quelle propriété à un objet `new Event` normal après sa création. Mais `CustomEvent` fournit le champ spécial `detail` pour éviter les conflits avec d'autres propriétés d'événement.

De plus, la classe event décrit "quel genre d'événement" il s'agit, et si l'événement est personnalisé, alors nous devrions utiliser `CustomEvent` juste pour être clair sur ce que c'est.

## event.preventDefault()

De nombreux événements de navigateur ont une "action par défaut", telle que la navigation vers un lien, le démarrage d'une sélection, etc.

Pour les nouveaux événements personnalisés, il n'y a certainement pas d'actions de navigateur par défaut, mais un code qui distribue un tel événement peut avoir ses propres plans pour ce qu'il faut faire après le déclenchement de l'événement.

En appelant `event.preventDefault()`, un gestionnaire d'événements peut envoyer un signal indiquant que ces actions doivent être annulées.

Dans ce cas, l'appel à `elem.dispatchEvent(event)` retourne `false`. Et le code qui l'a envoyé sait qu'il ne devrait pas continuer.

Voyons un exemple pratique - un lapin qui se cache (peut être un menu de clôture ou autre chose).

Ci-dessous, vous pouvez voir une fonction `#rabbit` et `hide()` qui la distribue l'événement `"hide"`, pour faire savoir à toutes les parties intéressées que le lapin va se cacher.

N'importe quel gestionnaire peut écouter cet événement avec `rabbit.addEventListener('hide',...)` et, si nécessaire, annuler l'action en utilisant `event.preventDefault()`. Alors le lapin ne disparaîtra pas:

```html run refresh autorun
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>
<button onclick="hide()">Hide()</button>

<script>
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // sans ce marqueur, preventDefault ne fonctionne pas
    });
    if (!rabbit.dispatchEvent(event)) {
      alert('The action was prevented by a handler');
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("Call preventDefault?")) {
      event.preventDefault();
    }
  });
</script>
```

Remarque: l'événement doit avoir le marqueur `cancelable: true`, sinon l'appel `event.preventDefault()` est ignoré.

## Les événements imbriqués sont synchrones


Les événements sont généralement traités dans une file d'attente. C'est-à-dire : si le navigateur traite `onclick` et qu'un nouvel événement se produit, par exemple la souris a bougé, puis sa gestion est mise en file d'attente, les gestionnaires `mousemove` correspondants seront appelés après la fin du traitement `onclick`.


L'exception notable est lorsqu'un événement est déclenché à partir d'un autre, par exemple en utilisant `dispatchEvent`. Ces événements sont traités immédiatement: les nouveaux gestionnaires d'événements sont appelés, puis la gestion des événements en cours est reprise.

Par exemple, dans le code ci-dessous, l'événement `menu-open` est déclenché pendant `onclick`.


Il est traité immédiatement, sans attendre la fin du gestionnaire `onclick` :



```html run autorun
<button id="menu">Menu (click me)</button>

<script>
  menu.onclick = function() {
    alert(1);

    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

  // se déclenche entre 1 et 2
  document.addEventListener('menu-open', () => alert('nested'));
</script>
```

L'ordre de sortie est: 1 -> imbriqué -> 2.

Veuillez noter que l'événement imbriqué `menu-open` est intercepté sur le `document`. La propagation et la gestion de l'événement imbriqué sont terminées avant que le traitement ne revienne au code externe (`onclick`).


Il ne s'agit pas seulement de `dispatchEvent`, il y a d'autres cas. Si un gestionnaire d'événements appelle des méthodes qui déclenchent d'autres événements -- ils sont également traités de manière synchrone, de manière imbriquée.


Disons que nous n'aimons pas ça. Nous voudrions que `onclick` soit entièrement traité en premier, indépendamment de `menu-open` ou de tout autre événement imbriqué.

Alors, nous pouvons soit mettre le `dispatchEvent` (ou un autre appel déclencheur d'événement) à la fin de `onclick` ou, peut-être mieux, l'envelopper dans `setTimeout`:

```html run
<button id="menu">Menu (click me)</button>

<script>
  menu.onclick = function() {
    alert(1);

    setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    })));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('nested'));
</script>
```

<<<<<<< HEAD
Désormais, `dispatchEvent` s'exécute de manière asynchrone une fois l'exécution du code en cours terminée, y compris `mouse.onclick`, les gestionnaires d'événements sont donc totalement séparés.

L'ordre de sortie devient: 1 -> 2 -> imbriqué.

## Résumé
=======
Now `dispatchEvent` runs asynchronously after the current code execution is finished, including `menu.onclick`, so event handlers are totally separate.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Pour générer un événement à partir du code, nous devons d'abord créer un objet événement.

Le constructeur générique `Event(name, options)` accepte un nom d'événement arbitraire et l'objet `options` avec deux propriétés:
- `bubbles: true` si l'événement doit bouillonner.
- `cancelable: true` si `event.preventDefault()` doit fonctionner.

D'autres constructeurs d'événements natifs tels que `MouseEvent`, `KeyboardEvent` et ainsi de suite acceptent des propriétés spécifiques à ce type d'événement. Par exemple, `clientX` pour les événements de souris.

Pour les événements personnalisés, nous devons utiliser le constructeur `CustomEvent`. Il a une option supplémentaire nommée `detail`, nous devons lui attribuer les données spécifiques à l'événement. Ensuite, tous les gestionnaires peuvent y accéder en tant que `event.detail`.


Malgré la possibilité technique de générer des événements de navigateur comme  `click` ou `keydown`, nous devons les utiliser avec le plus grand soin.

Nous ne devrions pas générer d'événements de navigateur car c'est une manière pirate d'exécuter des gestionnaires. C'est une mauvaise architecture la plupart du temps.


Des événements natifs peuvent être générés:

- En tant que bidouille pour faire fonctionner les bibliothèques tierces de la manière nécessaire, si elles ne fournissent pas d'autres moyens d'interaction.
- Pour les tests automatisés, pour "cliquer sur le bouton" dans le script et voir si l'interface réagit correctement.

Les événements personnalisés avec nos propres noms sont souvent générés à des fins architecturales, pour signaler ce qui se passe dans nos menus, curseurs, carrousels, etc.