# Introduction aux évéments du navigateur

*Un événement* est un signal que quelque chose s'est produit. Tous les nœuds du DOM génèrent de tels signaux (mais les événements ne sont pas limités au DOM).

Voici une liste des événements du DOM les plus utiles, juste pour jeter un coup d'œil :

**Événements de souris :**
- `click` -- lorsque la souris clique sur un élément (les appareils à écran tactile le génèrent en un clic).
- `contextmenu` -- lorsque la souris clique avec le bouton droit sur un élément.
- `mouseover` / `mouseout` -- lorsque le curseur de la souris survole / quitte un élément.
- `mousedown` / `mouseup` -- lorsque le bouton de la souris est enfoncé/relâché sur un élément.
- `mousemove` -- lorsque la souris est déplacée.

**Événements clavier :**
- `keydown` et `keyup` -- lorsqu'une touche du clavier est enfoncée et relâchée.

**Événements d'élément de formulaire :**
- `submit` -- lorsque le visiteur soumet un `<form>`.
- `focus` -- lorsque le visiteur se concentre sur un élément, par ex. sur une `<input>`.

**Documenter les événements :**
- `DOMContentLoaded` -- lorsque le HTML est chargé et traité, DOM est entièrement construit.

**Événements CSS :**
- `transitionend` -- lorsqu'une animation CSS se termine.

Il existe de nombreux autres événements. Nous entrerons dans plus de détails sur des événements particuliers dans les prochains chapitres.

## Gestionnaire d'événements

Pour réagir aux événements, nous pouvons affecter un *handler*, ou "gestionnaire", -- une fonction qui s'exécute en cas d'événement.

Les gestionnaires sont un moyen d'exécuter du code JavaScript en cas d'actions de l'utilisateur.

Il existe plusieurs façons d'affecter un gestionnaire. Voyons-les, en commençant par le plus simple.

### Attributs HTML

Un gestionnaire peut être défini en HTML avec un attribut nommé `on<event>`.

Par exemple, pour assigner un gestionnaire `click` pour une `input`, nous pouvons utiliser `onclick`, comme ici :

```html run
<input value="Click me" *!*onclick="alert('Click!')"*/!* type="button">
```

Au clic de la souris, le code à l'intérieur de `onclick` s'exécute.

Veuillez noter qu'à l'intérieur de `onclick` nous utilisons des guillemets simples, car l'attribut lui-même est entre guillemets doubles. Si nous oublions que le code est à l'intérieur de l'attribut et utilisons des guillemets doubles à l'intérieur, comme ceci : `onclick="alert("Click!")"`, cela ne fonctionnera pas correctement.

Un attribut HTML n'est pas un endroit pratique pour écrire beaucoup de code, nous ferions donc mieux de créer une fonction JavaScript et de l'appeler ici.

Ici, un clic exécute la fonction `countRabbits()` :
<!--
# Introduction to browser events

*An event* is a signal that something has happened. All DOM nodes generate such signals (but events are not limited to DOM).

Here's a list of the most useful DOM events, just to take a look at:

**Mouse events:**
- `click` -- when the mouse clicks on an element (touchscreen devices generate it on a tap).
- `contextmenu` -- when the mouse right-clicks on an element.
- `mouseover` / `mouseout` -- when the mouse cursor comes over / leaves an element.
- `mousedown` / `mouseup` -- when the mouse button is pressed / released over an element.
- `mousemove` -- when the mouse is moved.

**Keyboard events:**
- `keydown` and `keyup` -- when a keyboard key is pressed and released.

**Form element events:**
- `submit` -- when the visitor submits a `<form>`.
- `focus` --  when the visitor focuses on an element, e.g. on an `<input>`.

**Document events:**
- `DOMContentLoaded` -- when the HTML is loaded and processed, DOM is fully built.

**CSS events:**
- `transitionend` -- when a CSS-animation finishes.

There are many other events. We'll get into more details of particular events in next chapters.

## Event handlers

To react on events we can assign a *handler* -- a function that runs in case of an event.

Handlers are a way to run JavaScript code in case of user actions.

There are several ways to assign a handler. Let's see them, starting from the simplest one.

### HTML-attribute

A handler can be set in HTML with an attribute named `on<event>`.

For instance, to assign a `click` handler for an `input`, we can use `onclick`, like here:

```html run
<input value="Click me" *!*onclick="alert('Click!')"*/!* type="button">
```

On mouse click, the code inside `onclick` runs.

Please note that inside `onclick` we use single quotes, because the attribute itself is in double quotes. If we forget that the code is inside the attribute and use double quotes inside, like this:  `onclick="alert("Click!")"`, then it won't work right.

An HTML-attribute is not a convenient place to write a lot of code, so we'd better create a JavaScript function and call it there.

Here a click runs the function `countRabbits()`:-->

```html autorun height=50
<script>
  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert("Rabbit number " + i);
    }
  }
</script>

<input type="button" *!*onclick="countRabbits()"*/!* value="Count rabbits!">
```

Comme nous le savons, les noms d'attributs HTML ne sont pas sensibles aux distinctions linguistiques, "case-sensitive", donc `ONCLICK` fonctionne aussi bien que `onClick` et `onCLICK`... Mais généralement les attributs sont en minuscules : `onclick`.

### Propriété du DOM

Nous pouvons assigner un gestionnaire en utilisant une propriété du DOM `on<event>`.

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

Si le gestionnaire est affecté à l'aide d'un attribut HTML, le navigateur le lit, crée une nouvelle fonction à partir du contenu de l'attribut et l'écrit dans la propriété du DOM.

Donc, cette façon est en fait la même que la précédente.

Ces deux morceaux de code fonctionnent de la même manière :

1. HTML seul :

<!--
As we know, HTML attribute names are not case-sensitive, so `ONCLICK` works as well as `onClick` and `onCLICK`... But usually attributes are lowercased: `onclick`.

### DOM property

We can assign a handler using a DOM property `on<event>`.

For instance, `elem.onclick`:

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

If the handler is assigned using an HTML-attribute then the browser reads it, creates a new function from the attribute content and writes it to the DOM property.

So this way is actually the same as the previous one.

These two code pieces work the same:

1. Only HTML:
-->
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

Dans le premier exemple, l'attribut HTML est utilisé pour initialiser le `button.onclick`, tandis que dans le second exemple -- le script, c'est toute la différence.

**Comme il n'y a qu'une seule propriété `onclick`, nous ne pouvons pas attribuer plus d'un gestionnaire d'événements.**

Dans l'exemple ci-dessous, l'ajout d'un gestionnaire avec JavaScript écrase le gestionnaire existant :

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Avant')" value="Click me">
<script>
*!*
  elem.onclick = function() { // écrase le gestionnaire existant
    alert('After'); // seul cela sera affiché
  };
*/!*
</script>
```

Pour supprimer le gestionnaire -- il suffit d'assigner `elem.onclick = null`.
<!--
In the first example, the HTML attribute is used to initialize the `button.onclick`, while in the second example -- the script, that's all the difference.

**As there's only one `onclick` property, we can't assign more than one event handler.**

In the example below adding a handler with JavaScript overwrites the existing handler:

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

To remove a handler -- assign `elem.onclick = null`. -->

## Accéder à l'élément : this

La valeur de `this` à l'intérieur d'un gestionnaire est celle de l'élément. Celui sur lequel est positionné le gestionnaire.

Dans le code ci-dessous, `button` affiche son contenu en utilisant `this.innerHTML` :

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Click me</button>
```
<!--
## Accessing the element: this

The value of `this` inside a handler is the element. The one which has the handler on it.

In the code below `button` shows its contents using `this.innerHTML`:

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Click me</button>
```
-->

## Erreurs possibles 

Si vous commencez à travailler avec des événements, veuillez noter quelques subtilités.

Nous pouvons définir une fonction existante en tant que gestionnaire :

```js
function sayThanks() {
  alert('Thanks!');
}

elem.onclick = sayThanks;
```

Mais attention : la fonction doit être assignée comme `sayThanks`, pas `sayThanks()`.

```js
// right
button.onclick = sayThanks;

// wrong
button.onclick = sayThanks();
```

Si nous ajoutons des parenthèses, alors `sayThanks()` devient un appel de fonction. Ainsi, la dernière ligne prend en fait le *résultat* de l'exécution de la fonction, c'est-à-dire `undefined` (puisque la fonction ne renvoie rien), et l'affecte à `onclick`. Cela ne fonctionne pas.

... D'un autre côté, dans le balisage, nous avons besoin des parenthèses :

```html
<input type="button" id="button" onclick="sayThanks()">
```
La différence est facile à expliquer. Lorsque le navigateur lit l'attribut, il crée une fonction de gestionnaire avec un corps à partir du contenu de l'attribut.

Le balisage génère donc cette propriété :

```js
button.onclick = function() {
*!*
  sayThanks(); // <-- le contenu de l'attribut se place ici
*/!*
};
```

<!--
## Possible mistakes

If you're starting to work with events -- please note some subtleties.

We can set an existing function as a handler:

```js
function sayThanks() {
  alert('Thanks!');
}

elem.onclick = sayThanks;
```

But be careful: the function should be assigned as `sayThanks`, not `sayThanks()`.

```js
// right
button.onclick = sayThanks;

// wrong
button.onclick = sayThanks();
```

If we add parentheses, then `sayThanks()` becomes a function call. So the last line actually takes the *result* of the function execution, that is `undefined` (as the function returns nothing), and assigns it to `onclick`. That doesn't work.

...On the other hand, in the markup we do need the parentheses:

```html
<input type="button" id="button" onclick="sayThanks()">
```

The difference is easy to explain. When the browser reads the attribute, it creates a handler function with body from the attribute content.

So the markup generates this property:
```js
button.onclick = function() {
*!*
  sayThanks(); // <-- the attribute content goes here
*/!*
};
```
-->
**N'utilisez pas `setAttribute` pour les gestionnaires.**

Un appel comme celui-ci ne fonctionne pas :

```js exécute sans embellir
// un clic sur le <body> va générer une erreur,
// parce que les attributs sont toujours des chaînes, "string", la fonction devient une chaîne
document.body.setAttribute('onclick', function() { alert(1) });
```

** La propriété du DOM est sensible aux distinctions linguistiques. **

On peut attribuer un gestionnaire à `elem.onclick`, et non à `elem.ONCLICK`, car les propriétés du DOM sont aux distinctions linguistiques.
<!--
**Don't use `setAttribute` for handlers.**

Such a call won't work:

```js run no-beautify
// a click on <body> will generate errors,
// because attributes are always strings, function becomes a string
document.body.setAttribute('onclick', function() { alert(1) });
```

**DOM-property case matters.**

Assign a handler to `elem.onclick`, not `elem.ONCLICK`, because DOM properties are case-sensitive.-->

## addEventListener

Il y a un problème fondamental avec les manières mentionnées ce-dessus d'attribuer des gestionnaires - nous ne pouvons pas attribuer plusieurs gestionnaires à un événement.

Disons qu'une partie de notre code veut mettre en évidence un bouton lors d'un clic, et une autre veut afficher un message lors du même clic.

Nous aimerions affecter deux gestionnaires d'événements pour cela. Mais une nouvelle propriété DOM écrasera celle existante :

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // remplace le gestionnaire précédent
```

Les développeurs de standards Web l'ont compris il y a longtemps et ont suggéré une autre façon de gérer les gestionnaires en utilisant les méthodes spéciales `addEventListener` et `removeEventListener`. Ils sont exempts d'un tel problème.

La syntaxe pour ajouter un gestionnaire :

<!--
The fundamental problem of the aforementioned ways to assign handlers -- we can't assign multiple handlers to one event.

Let's say, one part of our code wants to highlight a button on click, and another one wants to show a message on the same click.

We'd like to assign two event handlers for that. But a new DOM property will overwrite the existing one:

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // replaces the previous handler
```

Developers of web standards understood that long ago and suggested an alternative way of managing handlers using special methods `addEventListener` and `removeEventListener`. They are free of such a problem.

The syntax to add a handler:
-->
```js
element.addEventListener(event, handler, [options]);
```

`event`
: Nom de l'événement, par exemple `"click"`.

`handler`
: La fonction du gestionnaire.

`options`
: Un objet facultatif supplémentaire avec les propriétés :
    - `once` : si `true`, l'auditeur, "listener", est automatiquement supprimé après son déclenchement.
    - `capture` : la phase où gérer l'événement, qui sera couverte plus tard dans le chapitre <info:bubbling-and-capturing>. Pour des raisons historiques, `options` peut également être `false/true`, c'est la même chose que `{capture : false/true}`.
    - `passive` : si `true`, alors le gestionnaire n'appellera pas `preventDefault()`, nous expliquerons cela plus tard dans <info:default-browser-action>.

Pour supprimer le gestionnaire, utilisez `removeEventListener` :
<!--
`event`
: Event name, e.g. `"click"`.

`handler`
: The handler function.

`options`
: An additional optional object with properties:
    - `once`: if `true`, then the listener is automatically removed after it triggers.
    - `capture`: the phase where to handle the event, to be covered later in the chapter <info:bubbling-and-capturing>. For historical reasons, `options` can also be `false/true`, that's the same as `{capture: false/true}`.
    - `passive`: if `true`, then the handler will not call `preventDefault()`, we'll explain that later in <info:default-browser-action>.

To remove the handler, use `removeEventListener`:-->

```js
element.removeEventListener(event, handler, [options]);
```

``warn header="Le retrait nécessite la même fonction"
Pour supprimer un gestionnaire, nous devons transmettre exactement la même fonction que celle qui lui a été assignée.

Cela ne fonctionne pas :
<!--
````warn header="Removal requires the same function"
To remove a handler we should pass exactly the same function as was assigned.

This doesn't work:-->

```js no-beautify
elem.addEventListener( "click" , () => alert('Thanks!'));
// ....
elem.removeEventListener( "click", () => alert('Thanks!'));
```

Le gestionnaire ne sera pas supprimé, car `removeEventListener` obtient une autre fonction - avec le même code, mais cela n'a pas d'importance, car il s'agit d'une fonction d'objet différente.

Voici la bonne Méthode :
<!--
The handler won't be removed, because `removeEventListener` gets another function -- with the same code, but that doesn't matter, as it's a different function object.

Here's the right way:-->

```js
function handler() {
  alert( 'Thanks!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

Veuillez noter que si nous ne stockons pas la fonction dans une variable, nous ne pouvons pas la supprimer. Il n'y a aucun moyen de "relire" les gestionnaires assignés par `addEventListener`.

Plusieurs appels à `addEventListener` permettent d'ajouter plusieurs gestionnaires, comme ceci :
<!--
Please note -- if we don't store the function in a variable, then we can't remove it. There's no way to "read back" handlers assigned by `addEventListener`.
````

Multiple calls to `addEventListener` allow to add multiple handlers, like this:-->

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

Comme nous pouvons le voir dans l'exemple ci-dessus, nous pouvons définir des gestionnaires *double* en utilisant une propriété DOM et `addEventListener`. Mais généralement nous n'utilisons qu'un seul de ces moyens.

````warn header="Pour certains événements, les gestionnaires ne fonctionnent qu'avec `addEventListener`"
Il existe des événements qui ne peuvent pas être assignés via une propriété DOM. Uniquement avec `addEventListener`.

Par exemple, l'événement `DOMContentLoaded`, qui se déclenche lorsque le document est chargé et que DOM est construit.
<!--
As we can see in the example above, we can set handlers *both* using a DOM-property and `addEventListener`. But generally we use only one of these ways.

````warn header="For some events, handlers only work with `addEventListener`"
There exist events that can't be assigned via a DOM-property. Only with `addEventListener`.

For instance, the `DOMContentLoaded` event, that triggers when the document is loaded and DOM is built.-->

```js
// ne sera jamais exécuté
document.onDOMContentLoaded = function() {
  alert("DOM built");
};
```

```js
// de cette manière cela fonctionne
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM built");
});
```
Donc `addEventListener` est plus universel. Bien que de tels événements soient une exception plutôt que la règle.
````

## Objet événement

Pour gérer correctement un événement, nous voudrions en savoir plus sur ce qui s'est passé. Pas seulement un "clic" ou un "keydown", mais quelles étaient les coordonnées du pointeur ? Quelle touche a été enfoncée ? Etc.

Lorsqu'un événement se produit, le navigateur crée un *objet d'événement*, y met des détails et le transmet comme argument au gestionnaire.

Voici un exemple d'obtention des coordonnées du pointeur à partir de l'objet événement :

```html run
<input type="button" value="Click me" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // show event type, element and coordinates of the click
    alert(event.type + " at " + event.currentTarget);
    alert("Coordinates: " + event.clientX + ":" + event.clientY);
  };
</script>
```

Certaines propriétés de l'objet `event` :

`event.type`
: Type d'événement, ici c'est `"clic"`.

`event.currentTarget`
: élément qui a géré l'événement. C'est exactement la même chose que `this`, sauf si le gestionnaire est une fonction fléchée, ou si `this` est lié à autre chose, alors nous pouvons obtenir l'élément de `event.currentTarget`.

`event.clientX / event.clientY`
: Coordonnées relatives à la fenêtre du curseur, pour les événements de pointeur.

Il y existe bien plus de propriétés. Beaucoup d'entre elles dépendent du type d'événement : les événements de clavier ont un ensemble de propriétés, les événements de pointeur en ont un autre, nous les étudierons plus tard lorsque nous aborderons différents événements en détail.

````smart header="L'objet d'événement est également disponible dans les gestionnaires HTML"
Si nous attribuons un gestionnaire en HTML, nous pouvons également utiliser l'objet `event`, comme ceci :

C'est possible car lorsque le navigateur lit l'attribut, il crée un gestionnaire comme celui-ci : `function(event) { alert(event.type) }`. C'est-à-dire : son premier argument est appelé `"événement"`, et le corps est tiré de l'attribut.
````

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Event type">
```

<!--
So `addEventListener` is more universal. Although, such events are an exception rather than the rule.
````

## Event object

To properly handle an event we'd want to know more about what's happened. Not just a "click" or a "keydown", but what were the pointer coordinates? Which key was pressed? And so on.

When an event happens, the browser creates an *event object*, puts details into it and passes it as an argument to the handler.

Here's an example of getting pointer coordinates from the event object:

```html run
<input type="button" value="Click me" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // show event type, element and coordinates of the click
    alert(event.type + " at " + event.currentTarget);
    alert("Coordinates: " + event.clientX + ":" + event.clientY);
  };
</script>
```

Some properties of `event` object:

`event.type`
: Event type, here it's `"click"`.

`event.currentTarget`
: Element that handled the event. That's exactly the same as `this`, unless the handler is an arrow function, or its `this` is bound to something else, then we can get the element from  `event.currentTarget`.

`event.clientX / event.clientY`
: Window-relative coordinates of the cursor, for pointer events.

There are more properties. Many of them depend on the event type: keyboard events have one set of properties, pointer events - another one, we'll study them later when we come to different events in details.

````smart header="The event object is also available in HTML handlers"
If we assign a handler in HTML, we can also use the `event` object, like this:

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Event type">
```

That's possible because when the browser reads the attribute, it creates a handler like this:  `function(event) { alert(event.type) }`. That is: its first argument is called `"event"`, and the body is taken from the attribute.
````
-->

## Gestionnaires d'objet : handleEvent

Nous pouvons affecter non seulement une fonction, mais un objet en tant que gestionnaire d'événements en utilisant `addEventListener`. Lorsqu'un événement se produit, sa méthode `handleEvent` est appelée.

Par exemple:

<!--
## Object handlers: handleEvent

We can assign not just a function, but an object as an event handler using `addEventListener`. When an event occurs, its `handleEvent` method is called.

For instance:-->


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

Comme nous pouvons le voir, lorsque `addEventListener` reçoit un objet en tant que gestionnaire, il appelle `obj.handleEvent(event)` en cas d'événement.

On pourrait aussi utiliser une classe pour ça :
<!--
As we can see, when `addEventListener` receives an object as the handler, it calls `obj.handleEvent(event)` in case of an event.

We could also use a class for that:-->


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

Ici, le même objet gère les deux événements. Veuillez noter que nous devons configurer explicitement les événements à écouter en utilisant `addEventListener`. L'objet `menu` n'obtient ici que `mousedown` et `mouseup`, pas d'autres types d'événements.

La méthode `handleEvent` n'a pas à faire tout le travail par elle-même. Il peut appeler d'autres méthodes spécifiques à un événement à la place, comme ceci :
<!--
Here the same object handles both events. Please note that we need to explicitly setup the events to listen using `addEventListener`. The `menu` object only gets `mousedown` and `mouseup` here, not any other types of events.

The method `handleEvent` does not have to do all the job by itself. It can call other event-specific methods instead, like this:-->

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

Désormais, les gestionnaires d'événements sont clairement séparés, ce qui peut être plus facile à prendre en charge.

## Résumé

Il existe 3 façons d'affecter des gestionnaires d'événements :

1. Attribut HTML : `onclick="..."`.
2. Propriété DOM : `elem.onclick = fonction`.
3. Méthodes : `elem.addEventListener(event, handler[, phase])` pour ajouter, `removeEventListener` pour supprimer.

Les attributs HTML sont utilisés avec parcimonie, car JavaScript au milieu d'une balise HTML semble un peu étrange et étranger. Je ne peux pas non plus y écrire beaucoup de code.

Les propriétés DOM peuvent être utilisées, mais nous ne pouvons pas affecter plus d'un gestionnaire à l'événement particulier. Dans de nombreux cas, cette limitation n'est pas urgente.

La dernière façon est la plus souple, mais c'est aussi la plus longue à écrire. Il y a peu d'événements qui ne fonctionnent qu'avec lui, par exemple `transitionend` et `DOMContentLoaded` (à couvrir). `addEventListener` prend également en charge les objets en tant que gestionnaires d'événements. Dans ce cas, la méthode `handleEvent` est appelée en cas d'événement.

Quelle que soit la manière dont vous affectez le gestionnaire, il obtient un objet événement comme premier argument. Cet objet contient les détails de ce qui s'est passé.

Nous en apprendrons plus sur les événements en général et sur les différents types d'événements dans les prochains chapitres.
<!--
Now event handlers are clearly separated, that may be easier to support.

## Summary

There are 3 ways to assign event handlers:

1. HTML attribute: `onclick="..."`.
2. DOM property: `elem.onclick = function`.
3. Methods: `elem.addEventListener(event, handler[, phase])` to add, `removeEventListener` to remove.

HTML attributes are used sparingly, because JavaScript in the middle of an HTML tag looks a little bit odd and alien. Also can't write lots of code in there.

DOM properties are ok to use, but we can't assign more than one handler of the particular event. In many cases that limitation is not pressing.

The last way is the most flexible, but it is also the longest to write. There are few events that only work with it, for instance `transitionend` and `DOMContentLoaded` (to be covered). Also `addEventListener` supports objects as event handlers. In that case the method `handleEvent` is called in case of the event.

No matter how you assign the handler -- it gets an event object as the first argument. That object contains the details about what's happened.

We'll learn more about events in general and about different types of events in the next chapters.
-->