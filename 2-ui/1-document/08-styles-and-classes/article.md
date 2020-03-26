# Styles et classes

Avant d'entrer dans les méthodes que JavaScript utilise pour traiter les styles et classes, voici une règle importante. Elle devrait être assez évidente, mais nous devons encore la mentionner.

Il y a, en général, deux façons de styliser un élément:

1. Créer une classe dans CSS et l'ajouter: `<div class="...">`
2. Écrire les propriétés directement dans `style`: `<div style="...">`.

JavaScript peut modifier les classes et les propriétés de `style`.

Nous devrions toujours choisir d'utiliser les classes CSS plutôt que `style`. Ce dernier devrait seulement être utilisé si les classes sont incapables d'effectuer la tâche requise.

Par exemple, `style` est acceptable si nous calculons les coordonnées d'un élément dynamiquement et souhaitons les définir à partir de JavaScript, comme ceci:

```js
let top = /* calculs complexes */;
let left = /* calculs complexes */;

elem.style.left = left; // par ex. '123px', calculé lors de l'exécution
elem.style.top = top; // par ex. '456px'
```

Pour les autres cas, comme rendre le texte rouge, ajouter une icône d'arrière-plan -- décrivez cela dans CSS et ensuite ajoutez la classe (JavaScript peut effectuer ceci). 
For other cases, like making the text red, adding a background icon -- describe that in CSS and then add the class (JavaScript can do that). C'est plus flexible et plus facile à gérer.

## className et classList

Changer une classe est l'une des actions les plus utilisées dans les scripts.

Dans les temps anciens, il existait une limitation dans JavaScript: un mot réservé comme `"class"` ne pouvait pas être une propriété d'un object. Cette limitation n'existe plus maintenant, mais à l'époque, il était impossible d'avoir une propriété de `"class"`, comme `elem.class`.

Alors pour les classes, une propriété similaire, `"className"`, a été introduite: `elem.className` correspond à l'attribut `"class"`.

Prenons, par example:

```html run
<body class="page d'accueil">
  <script>
    alert(document.body.className); // page d'accueil
  </script>
</body>
```

Si nous attribuons quelque chose à `elem.className`, elle remplace la chaîne entière de classes. Parfois c'est ce que nous avons besoin, mais souvent, nous voulons seulement ajouter ou enlever une classe.

Il y a une autre propriété pour ce besoin: `elem.classList`.

`elem.classList` est un objet spécial avec des méthodes pour `add/remove/toggle` une seule classe.

Prenons, par exemple:

```html run
<body class="page d'accueil">
  <script>
*!*
    // ajouter une classe
    document.body.classList.add('article');
*/!*

    alert(document.body.className); // l'article de la page d'accueil
  </script>
</body>
```

Alors nous pouvons opérer avec la chaîne de toutes les classes en utilisant `className` ou avec les classes individuelles en utilisant `classList`. Ce que nous choisissons dépend de nos besoins.

Méthodes de `classList`:

- `elem.classList.add/remove("class")` -- ajoute ou enlève la classe.
- `elem.classList.toggle("class")` -- ajoute la classe si elle n'existe pas, sinon enlève-la.
- `elem.classList.contains("class")` -- vérifie pour la classe donnée, renvoie `true/false`.

En outre, `classList` est itérable, alors nous pouvons lister toutes les classes avec `for..of`, comme ceci:

```html run
<body class="page d'accueil">
  <script>
    for (let name of document.body.classList) {
      alert(name); // page d'accueil, ensuite page
    }
  </script>
</body>
```

## Style de l'élément

La propriété `elem.style` est un objet qui correspond à ce qui est écrit cans l'attribut `"style"`. Attribuant `elem.style.width="100px"` fonctionne de la même façon qu'un attribut `style` ayant une chaîne `width:100px`.

Pour une propriété ayant plusieurs mots, camelCase est utilisé:

```js no-beautify
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
```

Prenons, par exemple:

```js run
document.body.style.backgroundColor = prompt('background color?', 'green');
```

````smart header="Propriétés prédétérminées"
Les propriétés prédéterminées par le navigateur comme `-moz-border-radius`, `-webkit-border-radius` suivent la même règle: un tiret signifie une majuscule.

Prenons, par exemple:

```js
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```
````

## Réinitialiser la propriété de style

Parfois nous voulons attribuer une propriété de style, et ensuite la retirer.

Par exemple, pour cacher un élément, nous pouvons définir `elem.style.display = "none"`.

Plus tard, nous voulons peut-être enlever `style.display` comme si cette propriété n'était définie. Au lieu de `delete elem.style.display`, nous devrions attribuer une chaîne vide à la propriété de style: `elem.style.display = ""`.

```js run
// si nous exécutons cette code, <body> clignotera
document.body.style.display = "none"; // cacher

setTimeout(() => document.body.style.display = "", 1000); // retour à la normale
```

Si nous attribuons `style.display` à une chaîne vide, le navigateur applique les classes CSS et ses styles intégrés normalement, comme s'il n'y avait pas de propriété `style.display`.

````smart header="Réécriture complète avec `style.cssText`"
Normalement, nous utilisons `style.*` pour attribuer des propriétés de style individuelles. Nous ne pouvons pas attribuer le style complet comme `div.style="color: red; width: 100px"`, parce que `div.style` est un object, et il est en lecture seulement.

Pour définir un style complet comme une chaîne, il y a une propriété spéciale `style.cssText`:

```html run
<div id="div">Bouton</div>

<script>
  // nous pouvons attribuer des drapeaux de style spéciaux comme "important" ici
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
</script>
```

Cette propriété est rarement utilisée parce qu'une telle affectation enlève tous les styles pré-existants: au lieu d'être ajouté, elle les remplace. Peut occasionnellement effacer quelque chose de nécessaire. But we can safely use it for new elements, when we know we won't delete an existing style.

The same can be accomplished by setting an attribute: `div.setAttribute('style', 'color: red...')`.
````

## Mind the units

Don't forget to add CSS units to values.

For instance, we should not set `elem.style.top` to `10`, but rather to `10px`. Otherwise it wouldn't work:

```html run height=100
<body>
  <script>
  *!*
    // doesn't work!
    document.body.style.margin = 20;
    alert(document.body.style.margin); // '' (empty string, the assignment is ignored)
  */!*

    // now add the CSS unit (px) - and it works
    document.body.style.margin = '20px';
    alert(document.body.style.margin); // 20px

    alert(document.body.style.marginTop); // 20px
    alert(document.body.style.marginLeft); // 20px
  </script>
</body>
```

Please note: the browser "unpacks" the property `style.margin` in the last lines and infers `style.marginLeft` and `style.marginTop` from it.

## Computed styles: getComputedStyle

So, modifying a style is easy. But how to *read* it?

For instance, we want to know the size, margins, the color of an element. How to do it?

**The `style` property operates only on the value of the `"style"` attribute, without any CSS cascade.**

So we can't read anything that comes from CSS classes using `elem.style`.

For instance, here `style` doesn't see the margin:

```html run height=60 no-beautify
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  The red text
  <script>
*!*
    alert(document.body.style.color); // empty
    alert(document.body.style.marginTop); // empty
*/!*
  </script>
</body>
```

...But what if we need, say, to increase the margin by `20px`? We would want the current value of it.

There's another method for that: `getComputedStyle`.

The syntax is:

```js
getComputedStyle(element, [pseudo])
```

element
: Element to read the value for.

pseudo
: A pseudo-element if required, for instance `::before`. An empty string or no argument means the element itself.

The result is an object with styles, like `elem.style`, but now with respect to all CSS classes.

For instance:

```html run height=100
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
    let computedStyle = getComputedStyle(document.body);

    // now we can read the margin and the color from it

    alert( computedStyle.marginTop ); // 5px
    alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>

</body>
```

```smart header="Computed and resolved values"
There are two concepts in [CSS](https://drafts.csswg.org/cssom/#resolved-values):

1. A *computed* style value is the value after all CSS rules and CSS inheritance is applied, as the  result of the CSS cascade. It can look like `height:1em` or `font-size:125%`.
2. A *resolved* style value is the one finally applied to the element. Values like `1em` or `125%` are relative. The browser takes the computed value and makes all units fixed and absolute, for instance: `height:20px` or `font-size:16px`. For geometry properties resolved values may have a floating point, like `width:50.5px`.

A long time ago `getComputedStyle` was created to get computed values, but it turned out that resolved values are much more convenient, and the standard changed.

So nowadays `getComputedStyle` actually returns the resolved value of the property, usually in `px` for geometry.
```

````warn header="`getComputedStyle` requires the full property name"
We should always ask for the exact property that we want, like `paddingLeft` or `marginTop` or `borderTopWidth`. Otherwise the correct result is not guaranteed.

For instance, if there are properties `paddingLeft/paddingTop`, then what should we get for `getComputedStyle(elem).padding`? Nothing, or maybe a "generated" value from known paddings? There's no standard rule here.

There are other inconsistencies. As an example, some browsers (Chrome) show `10px` in the document below, and some of them (Firefox) --  do not:

```html run
<style>
  body {
    margin: 10px;
  }
</style>
<script>
  let style = getComputedStyle(document.body);
  alert(style.margin); // empty string in Firefox
</script>
```
````

```smart header="Styles applied to `:visited` links are hidden!"
Visited links may be colored using `:visited` CSS pseudoclass.

But `getComputedStyle` does not give access to that color, because otherwise an arbitrary page could find out whether the user visited a link by creating it on the page and checking the styles.

JavaScript may not see the styles applied by `:visited`. And also, there's a limitation in CSS that forbids applying geometry-changing styles in `:visited`. That's to guarantee that there's no side way for an evil page to test if a link was visited and hence to break the privacy.
```

## Summary

To manage classes, there are two DOM properties:

- `className` -- the string value, good to manage the whole set of classes.
- `classList` -- the object with methods `add/remove/toggle/contains`, good for individual classes.

To change the styles:

- The `style` property is an object with camelCased styles. Reading and writing to it has the same meaning as modifying individual properties in the `"style"` attribute. To see how to apply `important` and other rare stuff -- there's a list of methods at [MDN](mdn:api/CSSStyleDeclaration).

- The `style.cssText` property corresponds to the whole `"style"` attribute, the full string of styles.

To read the resolved styles (with respect to all classes, after all CSS is applied and final values are calculated):

- The `getComputedStyle(elem, [pseudo])` returns the style-like object with them. Read-only.
