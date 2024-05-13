# Introduction aux événements du navigateur

*Un événement* est le signal que quelque chose s'est produit. Tous les nœuds du DOM génèrent de tels signaux (mais les événements ne se limitent pas au DOM).

Voici la liste des événements du DOM les plus utiles, juste pour avoir un aperçu :

**Événements de la souris :**
- `click` -- lorsque la souris clique sur un élément (les appareils avec écran tactile le génèrent d'une simple touche).
- `contextmenu` -- lorsque la souris effectue un clic droit sur un élément.
- `mouseover` / `mouseout` -- lorsque le curseur de la souris survole ou sort d'un élément.
- `mousedown` / `mouseup` -- lorsque le bouton de la souris est pressé / relâché sur un élément.
- `mousemove` -- lorsque la souris est déplacée.

**Événements du clavier :**
- `keydown` / `keyup` -- lorsqu'une touche du clavier est pressée et relâchée.

**Événements d'éléments de formulaire :**
- `submit` -- lorsque le visiteur soumet un `<form>`.
- `focus` -- lorsque le visiteur se concentre sur un élément, par exemple sur un `<input>`.

**Événements du document :**
- `DOMContentLoaded` -- lorsque le HTML est chargé et traité, le DOM est complètement construit.

**Événements CSS :**
- `transitionend` -- lorsqu'une animation CSS se termine.

Il y a beaucoup d'autres événements. Nous verrons plus en détail les événements particuliers dans les chapitres à venir.

## Handlers d'événements

Pour réagir aux événements, nous pouvons assigner un **handler** -- une fonction qui s'exécute en cas d'événement.

Les handlers sont un moyen d'exécuter du code JavaScript lors d'actions de l'utilisateur.

Il existe plusieurs façons d'assigner un handler.
Voyons-les, en commençant par la plus simple.

### L'attribut HTML

Un handler peut être défini dans le HTML avec un attribut nommé `on<event>`.

Par exemple, pour assigner un handler `click` sur un `input`, nous pouvons utiliser `onclick`, comme ici :

```html
<input value="Click me" onclick="alert('Click!')" type="button">
```

Lors d'un clic de souris, le code dans `onclick` s'exécute.

Notez que dans `onclick`, nous utilisons des apostrophes, car l'attribut lui-même se trouve dans des guillemets. Si nous oublions que le code est à l'intérieur de l'attribut et que nous utilisons des guillemets à l'intérieur, comme ça `onclick="alert("Click!")"` alors ça ne fonctionnera pas correctement.

Un attribut HTML n'est pas un endroit pratique où placer beaucoup de code, donc on ferait mieux de créer une fonction JavaScript et de l'appeler ici.

Ici, un clic exécute la fonction `countRabbits()` :

```html
<script>
  function countRabbits() {
    for (let i = 1; i <= 3; i++) {
      alert("Rabbit number " + i);
    }
  }
</script>

<input type="button" onclick="countRabbits()" value="Count rabbits!">
```

Comme on le sait, les noms d'attributs HTML ne sont pas sensibles à la casse, donc `ONCLICK` fonctionne aussi bien que `onClick` et `onCLICK`... Cependant, habituellement, les attributs sont écrits en minuscules : `onclick`.

### Propriété DOM

Nous pouvons assigner un handler en utilisant une propriété du DOM `on<event>`.

Par exemple, `elem.onclick` :

```html autorun
<input id="elem" type="button" value="Click me">
<script>
*!*
  elem.onclick = function() {
    alert('Thank you');
  };
*/!*
</script>
```

Si le handler est assigné via un attribut HTML alors le navigateur le lis, créer une nouvelle fonction depuis le contenu de l'attribut et l'écrit dans la propriété DOM.

Donc cette façon est la même que la précédente.

Ces deux morceaux de code fonctionne de la même façon :


1. HTML uniquement :

    ```html autorun height=50
    <input type="button" *!*onclick="alert('Click!')"*/!* value="Button">
    ```

2. HTML + JS:

    ```html autorun height=50
    <input type="button" id="button" value="Button">
    <script>
    *!*
      button.onclick = function() {
        alert('Click!');
      };
    */!*
    </script>
    ```

Dans le premier exemple, l'attribut HTML est utilisé pour initialiser le `button.onclick`, tandis que dans le second exemple -- c'est le script, c'est la seule différence.

**Comme il n'existe qu'une seule propriété `onclick`, nous ne pouvons pas assigner plus d'un event-handler.**

Dans l'exemple en dessous ajouter un handler avec JavaScript réécrit le handler existant :

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Before')" value="Click me">
<script>
*!*
  elem.onclick = function() { // overwrites the existing handler
    alert('After'); // only this will be shown
  };
*/!*
</script>
```

Pour supprimer un handler -- assigner `elem.onclick = null`.

## Accéder à l'élément: this

La valeur de `this` dans un handler est l'élément. Celui sur lequel le handler se trouve.

Dans le code suivant `button` affiche son contenu en utilisant `this.innerHTML` :

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Click me</button>
```

## Erreurs possibles

Si vous commencez à travailler avec les événements -- veuillez noter quelques subtilités.

Nous pouvons définir une fonction existante en tant que handler :

```js
function sayThanks() {
  alert('Thanks!');
}

elem.onclick = sayThanks;
```

Mais soyez vigilant : La fonction doit être assignée en tant que `sayThanks`, pas `sayThanks()`.

```js
// Bon
button.onclick = sayThanks;

// Mauvais
button.onclick = sayThanks();
```

Si nous ajoutons des paranthèses, alors `sayThanks()` devient un appel de fonction. Donc la dernière ligne prends le *retour* de l'exécution de la fonction, qui est `undefined` (puisque la fonction ne retourne rien), et l'assigne à `onclick`.
Ça ne fonctionne pas.

...En revanche, dans le balisage nous avons besoin des paranthèses :

```html
<input type="button" id="button" onclick="sayThanks()">
```

La différence est simple à expliquer. Lorsque le navigateur lis l'attribut, il créer une fonction handler avec pour corps le contenu de l'attribut.

Donc le balisage génère cette propriété :
```js
button.onclick = function() {
*!*
  sayThanks(); // <-- Le contenu de l'attribut vient ici
*/!*
};
```

**N'utilisez pas `setAttribute` pour les handlers**

De tels appels ne fonctionneront pas :

```js run no-beautify
// Un click sur <body> génèrera une erreur,
// car les attributs sont toujours des strings, une fonction devient un string
document.body.setAttribute('onclick', function() { alert(1) });
```

**La casse de propriété DOM importe.**

Assigner un handler à `elem.onclick`, pas `elem.ONCLICK`, car les propriétés DOM sont sensibles à la casse.

## addEventListener

Le problème fondamental des méthodes mentionnées ci-dessus pour assigner des handlers est que nous ne pouvons *assigner plusieurs handlers à un événement*.

Disons que, une partie de notre code veut mettre en surbrillance un bouton lors d'un clic, et une autre veut afficher un message lors du même clic.

Nous aimerions assigner deux handlers pour ça.
Cependant une nouvelle propriété DOM va réécrire celle existante :

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // Remplace le précédent handler
```

Les développeurs du standard web ont compris cela depuis longtemps et ont suggérer une méthode alternative de gestion des handlers en utilisant les méthodes `addEventListener` et `removeEventListener` lesquels ne sont pas soumises à de telles contraintes.

La syntaxe pour ajouter un handler :

```js
element.addEventListener(event, handler, [options]);
```

`event`
: Le nom de l'événement, e.g. `"click"`.

`handler`
: La fonction handler

`options`
: Un objet additionnel et optionnel avec des propriétés :
  - `once` : si `true`, alors le listener est automatiquement supprimé lorsqu'il est déclenché.
  - `capture` : la phase où gérer l'événement, qui sera abordée plus tard dans le chapitre <info:bubbling-and-capturing>. Pour des raisons historiques, `options` peut aussi être `false/true`, c'est la même que `{capture: false/true}`.
  - `passive` : si `true`, alors le handler n'appellera pas `preventDefault()`, nous l'expliquerons plus tard dans <info:default-browser-action>.

Pour supprimer un handler, utilisez `removeEventListener` :

```js
element.removeEventListener(event, handler, [options]);
```

````warn header="La suppression nécessite la même fonction"
Pour supprimer un handler nous devons passer exactement la même fonction assignée.

Ceci ne fonctionne pas :

```js no-beautify
elem.addEventListener( "click" , () => alert('Thanks!'));
// ....
elem.removeEventListener( "click", () => alert('Thanks!'));
```

Le handler ne sera pas supprimé, car `removeEventListener` récupère une autre fonction -- avec le même code, mais ça n'a pas d'importance, il s'agit d'un objet fonction différent.

Voici la bonne façon :

```js
function handler() {
  alert( 'Thanks!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

Veuillez noter -- si nous ne stockons pas de fonction dans une variable, alors nous ne pourrons pas la supprimer. Il n'y a pas de moyen de "retrouver" les handlers assignés par `addEventListener`.
````

Des appels multiples à `addEventListener` permettent d'y ajouter de multiples handlers, comme ceci :

```html run no-beautify
<input id="elem" type="button" value="Click me"/>

<script>
  function handler1() {
    alert('Thanks!');
  };

  function handler2() {
    alert('Thanks again!');
  }

*!*
  elem.onclick = () => alert("Hello");
  elem.addEventListener("click", handler1); // Thanks!
  elem.addEventListener("click", handler2); // Thanks again!
*/!*
</script>
```

Comme nous pouvons le voir dans l'exemple ci-dessus, nous pouvons définir les deux handlers en utilisant la propriété DOM et `addEventListener`. Mais générallement nous utilisons uniquement l'une de ces méthodes.

````warn header="Pour certains événements, les handlers ne fonctionne qu'avec `addEventListener`"
Il existe des événements qui ne peuvent pas être assignés via la propriété DOM. Seuleument avec `addEventListener`.

Par exemple, l'événement `DOMContentLoaded`, il se déclenche lorsque le document est chargé et le DOM construit.

```js
// Ne s'exécutera jamais
document.onDOMContentLoaded = function() {
  alert("DOM built");
};
```

```js
// De cette façon ça fonctionne
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM built");
});
```
Donc `addEventListener` est plus universel.
Bien que, de tels événements sont davantage une exeception qu'une règle.
````

## Objet événement

Pour gérer proprement un événement nous voudrions en savoir davantage sur ce qui s'est passé. Pas juste un "click" ou un "keydown", mais où se trouvaient les coordonnées du curseur. Quelle touche a été pressée ? Et plus encore.

Lorsqu'un événement se produit, le navigateur créer un *objet événement*, il met des détails dedans et l'envoie en tant qu'argument au handler.

Voici un exemple de récupération des coordonnées de la souris depuis l'objet événement :

```html run
<input type="button" value="Click me" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // affiche le type de l'événement et les coordonnées du clic
    alert(event.type + " at " + event.currentTarget);
    alert("Coordinates: " + event.clientX + ":" + event.clientY);
  };
</script>
```

Quelques propriétés de l'objet `event` :

`event.type`
: Le type d'événement, ici c'est `"click"`.

`event.currentTarget`
: L'élément qui a géré l'événement. C'est la même chose que `this`, à moins que le handler ne soit une fonction fléchée, ou c'est `this` qui est attaché à quelque chose d'autre, alors nous pouvons récupérer l'élément depuis `event.currentTarget`.

`event.clientX` / `event.clientY`
: Les coordonnées relatives de la souris par rapport à la fenêtre, pour les événement de curseur.

Il y a bien plus de propriété. Beaucoup d'entre elles dépendent du type de l'événement : Les événements de clavier ont un ensemble de propriétés, les événements du curseur -- un autre, nous les étudierons plus tard quand nous parlerons en détails des différents événements.

````smart header="L'objet événement est aussi disponible dans les handlers HTML"
Si nous assignons un handler en HTML, nous pouvons aussi utiliser l'objet `event`, comme ceci :

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Event type">
```

Ceci est possible car lorsque le navigateur lit l'attribut, il créer un handler comme ceci : `function(event) { alert(event.type) }`. Autrement dit : Son premier argument est appelé `"event"`, et le corps est pris de l'attribut.
````

## Objet handlers: handlerEvent

Nous pouvons assigner non pas juste une fonction, mais un objet à un event handler en utilisant `addEventListener`. Lorsqu'un événement se produit, la méthode `handleEvent` est appelée.

Par exemple :

```html run
<button id="elem">Click me</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " at " + event.currentTarget);
    }
  };

  elem.addEventListener('click', obj);
</script>
```

Comme nous pouvons le voir, lorsque `addEventListener` reçoit un objet en tant que handler, il appelle `obj.handleEvent(event)` lors d'un événement.

Nous pouvons aussi utiliser les objets d'une classe personnalisée, comme ceci :

```html run
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Mouse button pressed";
          break;
        case 'mouseup':
          elem.innerHTML += "...and released.";
          break;
      }
    }
  }

*!*
  let menu = new Menu();

  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
*/!*
</script>
```

Ici le même objet gère les deux événements. Veuillez noter que nous avons besoin de configurer explicitement les événements pour écouter en utilisant `addEventListener`. L'objet `menu` récupère uniquement `mousedown` et `mouseup` ici, aucun autre types d'événements.

La méthode `handleEvent` n'a pas à faire tout le travail par elle-même. Elle peut appeler d'autres méthods spécifiques aux événements à la place, comme ceci :

```html run
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Mouse button pressed";
    }

    onMouseup() {
      elem.innerHTML += "...and released.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

Maintenant les handlers d'événements sont clairement séparés, ça devrait être plus simple à maintenir.

## Résumé

Il y a 3 moyens d'assigner des event handlers :

1. L'attribut HTML : `onclick="..."`.
2. La propriété DOM : `elem.onclick = function`.
3. Les méthodes : `elem.addEventListener(event, handler[, phase])` pour ajouter, `removeEventListener` pour la supprimer.

Les attributs HTML sont utilisés avec parcimonie, car du JavaScript au millieu des balises HMTL parrait un peu désordonné. Aussi on ne peut pas écrire beaucoup de code dedans.

L'utilisation des propriétés DOM est correcte, mais nous ne pouvons pas assigner plus d'un handler sur un événement en particulier. Dans de nombreux cas cette limitation n'est pas pressante.

Le dernier moyen est le plus flexible, mais il est aussi le plus long à écrire. Il y a quelques événements qui ne fonctionne qu'avec lui, par exemple `transitionend` et `DOMContentLoaded` (à couvrir). Aussi `addEventListener` supporte les objets en tant que handler d'événements. Dans ce cas la méthode `handleEvent` est appelée lors d'un événement.

Peu importe comment vous assignez le handler -- il prend un objet événement en premier argument. Cet objet contient les détails de ce qu'il s'est passé.

Nous en apprendrons plus sur les évéments en général et sur les différents types d'événements dans les chapitres.