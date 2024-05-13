# Introduction aux événements du navigateur

*Un événement* est le signal que quelque chose s'est produit. Tous les nœuds du DOM génèrent de tels signaux (mais les événements ne se limitent pas au DOM).

Voici la liste des événements du DOM les plus utiles, juste pour avoir un aperçu :

**Événements de la souris :**
- `click` -- lorsque la souris clique sur un élément (les appareils avec un écran tactile le génèrent d'un simple toucher).
- `contextmenu` -- lorsque la souris effectue un clic droit sur un élément.
- `mouseover` / `mouseout` -- lorsque le curseur de la souris survole ou sort d'un élément.
- `mousedown` / `mouseup` -- lorsque le button de la souris est pressé / relâché sur un élément.
- `mousemove` -- lorsque la souris est bougée.

**Événements du clavier :**
- `keydown` / `keyup` -- lorsqu'une touche du clavier est pressée et relachée.

**Événements d'éléments de formulaire :**
- `submit` -- lorsque le visiteur soumet un `<form>`.
- `focus` -- lorsque le visiteur se concentre sur un élément, e.g sur un `<input>`.

**Événements du document :**
- `DOMContentLoaded` -- lorsque le HTML est chargé et traité, DOM est complétement construit.

**Événements CSS :**
- `transitionend` -- lorsqu'une animation CSS se termine.

Il y a beaucoup d'autres événements. Nous verrons plus en détails les événements particuliers dans les chapitres à venir.

## Handlers d'événements

Pour réagir aux événements nous pouvons assigner un **handler** -- une fonction qui tourne dans le cas d'un événement.

Les handlers sont un moyen d'exécuter du code JavaScript lors d'actions de l'utilisateur.

Il existe plusieurs façons d'assigner un handler.
Voyons les, en commençant par la plus simple.

### L'attribut HTML

Un handler peut être défini dans le HTML avec un attribut nommé `on<event>`.

Par exemple, pour assigner un handler `click` sur un `input`, nous pouvons utiliser `onclick`, comme ici

```html run
<input value="Click me" *!*onclick="alert('Click!')"*/!* type="button">
```

Lors d'un clic de souris, le code dans `onclick` s'exécute.

Notez que dans `onclick` nous utilisons des apostrophes, car l'attribut lui-même se trouve dans des guillemets. Si nous oublions que le code est à l'intérieur de l'attribut et que nous utilisons des guillemets à l'intérieur, comme ça `onclick="alert("Click!")"` alors ça ne fonctionnera pas correctement.

Un attribut HTML n'est pas un endroit pratique où placer beaucoup de code, donc on ferait mieux de créer une fonction JavaScript et l'appeler ici.

Ici un clic exécute la fonction `countRabbits()` :

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

Comme on le sait, les noms d'attributs HTML ne sont pas sensibles à la casse, donc `ONCLICK` fonctionne aussi bien que `onClick` et `onCLICK`... Cependant habituellement les attributs sont écrits en minuscule : `onclick`.

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