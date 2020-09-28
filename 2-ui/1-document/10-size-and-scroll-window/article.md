# Tailles des fenêtres et défilement

Comment trouver la largeur et la hauteur de la fenêtre du navigateur ? Comment obtenir la largeur et la hauteur complètes du document, y compris la partie déroulante ? Comment faire défiler la page en utilisant JavaScript ?

<<<<<<< HEAD
Pour la plupart de ces requêtes, nous pouvons utiliser l'élément de document racine `document.documentElement`, qui correspond à la balise `<html>`. Mais il existe des méthodes et des particularités supplémentaires suffisamment importantes pour être prises en compte.
=======
For this type of information, we can use the root document element `document.documentElement`, that corresponds to the `<html>` tag. But there are additional methods and peculiarities to consider.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

## Largeur/hauteur de la fenêtre

<<<<<<< HEAD
Pour obtenir la largeur et la hauteur de la fenêtre, nous pouvons utiliser `clientWidth/clientHeight` de `document.documentElement` :
=======
To get window width and height, we can use the `clientWidth/clientHeight` of `document.documentElement`:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

![](document-client-width-height.svg)

```online
Par exemple, ce bouton affiche la hauteur de votre fenêtre :

<button onclick="alert(document.documentElement.clientHeight)">alert(document.documentElement.clientHeight)</button>
```

<<<<<<< HEAD
````warn header="Pas `window.innerWidth/Height`"
Les navigateurs prennent également en charge les propriétés `window.innerWidth/innerHeight`. Ils ressemblent à ce que nous voulons. Alors pourquoi ne pas les utiliser à la place ?

S'il existe une barre de défilement et qu'elle occupe de l'espace, `clientWidth/clientHeight` fournit la largeur/hauteur sans elle (cela la soustrait). En d'autres termes, elles renvoient la largeur/hauteur de la partie visible du document, disponible pour le contenu.

… Et `window.innerWidth/innerHeight` inclut la barre de défilement.
=======
````warn header="Not `window.innerWidth/innerHeight`"
Browsers also support properties like `window.innerWidth/innerHeight`. They look like what we want, so why not to use them instead?

If there exists a scrollbar, and it occupies some space, `clientWidth/clientHeight` provide the width/height without it (subtract it). In other words, they return the width/height of the visible part of the document, available for the content.

`window.innerWidth/innerHeight` includes the scrollbar.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

S'il y a une barre de défilement et qu'elle occupe de l'espace, ces deux lignes affichent des valeurs différentes :
```js run
alert( window.innerWidth ); // pleine largeur de fenêtre
alert( document.documentElement.clientWidth ); // largeur de la fenêtre moins la barre de défilement
```

<<<<<<< HEAD
Dans la plupart des cas, nous avons besoin de la largeur de fenêtre *disponible* : pour dessiner ou positionner quelque chose. C'est-à-dire : à l'intérieur des barres de défilement s'il y en a. Nous devons donc utiliser `documentElement.clientHeight/Width`.
=======
In most cases, we need the *available* window width in order to draw or position something within scrollbars (if there are any), so we should use `documentElement.clientHeight/clientWidth`.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d
````

```warn header="`Le DOCTYPE` est important"
Remarque: les propriétés de géométrie de niveau supérieur peuvent fonctionner un peu différemment lorsqu'il n'y a pas de `<!DOCTYPE HTML>` dans HTML. Des choses étranges sont possibles.

Dans le HTML moderne, nous devons toujours écrire le `DOCTYPE`.
```

## Largeur/hauteur du document

<<<<<<< HEAD
Théoriquement, comme l'élément de document racine est `document.documentElement` et qu'il contient tout le contenu, nous pourrions mesurer le document en taille réelle comme `document.documentElement.scrollWidth/scrollHeight`.

Mais sur cet élément, pour la page entière, ces propriétés ne fonctionnent pas comme prévu. Dans Chrome/Safari/Opera s'il n'y a pas de défilement, alors `documentElement.scrollHeight` peut être encore moins que `documentElement.clientHeight` ! Cela ressemble à un non-sens, bizarre, non ?
=======
Theoretically, as the root document element is `document.documentElement`, and it encloses all the content, we could measure the document's full size as `document.documentElement.scrollWidth/scrollHeight`.

But on that element, for the whole page, these properties do not work as intended. In Chrome/Safari/Opera, if there's no scroll, then `documentElement.scrollHeight` may be even less than `documentElement.clientHeight`! Weird, right?
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

Pour obtenir de manière fiable la pleine hauteur du document, nous devons prendre le maximum de ces propriétés :

```js run
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert('Full document height, with scrolled out part: ' + scrollHeight);
```

Pourquoi ? Mieux vaut ne pas demander. Ces incohérences viennent des temps anciens, pas d'une logique "intelligente".

## Obtenez le défilement actuel [#page-scroll]

<<<<<<< HEAD
Les éléments DOM ont leur état de défilement actuel dans `elem.scrollLeft/scrollTop`.

Pour le défilement de document, `document.documentElement.scrollLeft/Top` fonctionne dans la plupart des navigateurs, à l'exception des plus anciens basés sur WebKit, comme Safari (bug [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)), où nous devrions utiliser `document.body` au lieu de `document.documentElement`.

Heureusement, nous n'avons pas du tout à nous souvenir de ces particularités, car le défilement est disponible dans les propriétés spéciales `window.pageXOffset/pageYOffset` :
=======
DOM elements have their current scroll state in their `scrollLeft/scrollTop` properties.

For document scroll, `document.documentElement.scrollLeft/scrollTop` works in most browsers, except older WebKit-based ones, like Safari (bug [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)), where we should use `document.body` instead of `document.documentElement`.

Luckily, we don't have to remember these peculiarities at all, because the scroll is available in the special properties, `window.pageXOffset/pageYOffset`:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js run
alert('Current scroll from the top: ' + window.pageYOffset);
alert('Current scroll from the left: ' + window.pageXOffset);
```

Ces propriétés sont en lecture seule.

## Défilement : scrollTo, scrollBy, scrollIntoView [#window-scroll]

```warn
<<<<<<< HEAD
Pour faire défiler la page à partir de JavaScript, son DOM doit être entièrement construit.

Par exemple, si nous essayons de faire défiler la page à partir du script dans `<head>`, cela ne fonctionnera pas.
=======
To scroll the page with JavaScript, its DOM must be fully built.

For instance, if we try to scroll the page with a script in `<head>`, it won't work.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d
```

Les éléments réguliers peuvent défiler en changeant `scrollTop/scrollLeft`.

<<<<<<< HEAD
Nous pouvons faire de même pour la page utilisant `document.documentElement.scrollTop/Left` (sauf Safari, où `document.body.scrollTop/Left` devrait être utilisé à la place).

Alternativement, il existe une solution plus simple et universelle: des méthodes spéciales [window.scrollBy(x,y)](mdn:api/Window/scrollBy) et [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo).
=======
We can do the same for the page using `document.documentElement.scrollTop/scrollLeft` (except Safari, where `document.body.scrollTop/Left` should be used instead).

Alternatively, there's a simpler, universal solution: special methods [window.scrollBy(x,y)](mdn:api/Window/scrollBy) and [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo).
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

- La méthode `scrollBy(x, y)` fait défiler la page *par rapport à sa position actuelle*. Par exemple, `scrollBy(0,10)` fait défiler la page `10px` vers le bas.

    ```online
    Le bouton ci-dessous illustre cela:

    <button onclick="window.scrollBy(0,10)">window.scrollBy(0,10)</button>
    ```
- La méthode `scrollTo(pageX,pageY)` fait défiler la page *jusqu'aux coordonnées absolues*, de sorte que le coin supérieur gauche de la partie visible ait les coordonnées `(pageX, pageY)` par rapport au coin supérieur gauche du document. C'est comme définir `scrollLeft/scrollTop`.

    Pour faire défiler jusqu'au tout début, nous pouvons utiliser `scrollTo(0,0)`.

    ```online
    <button onclick="window.scrollTo(0,0)">window.scrollTo(0,0)</button>
    ```

Ces méthodes fonctionnent de la même manière pour tous les navigateurs.

## scrollIntoView

<<<<<<< HEAD
Pour être complet, couvrons une autre méthode : [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView).
=======
For completeness, let's cover one more method: [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView).
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

L'appel à `elem.scrollIntoView(top)` fait défiler la page pour rendre `elem` visible. Il a un argument :

<<<<<<< HEAD
- si `top=true` (c'est la valeur par défaut), alors la page défilera pour faire apparaître `elem` en haut de la fenêtre. Le bord supérieur de l'élément est aligné avec le haut de la fenêtre.
- si `top=false`, alors la page défile pour faire apparaître `elem` en bas. Le bord inférieur de l'élément est aligné avec le bas de la fenêtre.

```online
Le bouton ci-dessous fait défiler la page pour aligner l'élément en haut de la fenêtre :

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

Et ce bouton fait défiler la page pour l'aligner en bas :
=======
- If `top=true` (that's the default), then the page will be scrolled to make `elem` appear on the top of the window. The upper edge of the element will be aligned with the window top.
- If `top=false`, then the page scrolls to make `elem` appear at the bottom. The bottom edge of the element will be aligned with the window bottom.

```online
The button below scrolls the page to position itself at the window top:

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

And this button scrolls the page to position itself at the bottom:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

<button onclick="this.scrollIntoView(false)">this.scrollIntoView(false)</button>
```

## Interdire le défilement

<<<<<<< HEAD
Parfois, nous devons rendre le document "non-défilable". Par exemple, lorsque nous devons le couvrir d'un gros message nécessitant une attention immédiate et que nous voulons que le visiteur interagisse avec ce message, pas avec le document.

Pour rendre le document impossible à faire défiler, il suffit de définir `document.body.style.overflow = "hidden"`. La page se fige sur son défilement actuel.
=======
Sometimes we need to make the document "unscrollable". For instance, when we need to cover the page with a large message requiring immediate attention, and we want the visitor to interact with that message, not with the document.

To make the document unscrollable, it's enough to set `document.body.style.overflow = "hidden"`. The page will "freeze" at its current scroll position.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```online
Essayez-le :

<button onclick="document.body.style.overflow = 'hidden'">document.body.style.overflow = 'hidden'</button>

<button onclick="document.body.style.overflow = ''">document.body.style.overflow = ''</button>

<<<<<<< HEAD
Le premier bouton fige le défilement, le second le reprend.
```

Nous pouvons utiliser la même technique pour "figer" le défilement pour d'autres éléments, pas seulement pour `document.body`.

L'inconvénient de la méthode est que la barre de défilement disparaît. S'il occupait de l'espace, cet espace est désormais libre et le contenu "saute" pour le remplir.

Cela semble un peu étrange, mais peut être contourné si nous comparons `clientWidth` avant et après le gel, et s'il a augmenté (la barre de défilement a disparu), puis ajoutez un `padding` à `document.body` à la place de la barre de défilement, pour conservez la même largeur de contenu.
=======
The first button freezes the scroll, while the second one releases it.
```

We can use the same technique to freeze the scroll for other elements, not just for `document.body`.

The drawback of the method is that the scrollbar disappears. If it occupied some space, then that space is now free and the content "jumps" to fill it.

That looks a bit odd, but can be worked around if we compare `clientWidth` before and after the freeze. If it increased (the scrollbar disappeared), then add `padding` to `document.body` in place of the scrollbar to keep the content width the same.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

## Résumé

Géométrie :

<<<<<<< HEAD
- Largeur/hauteur de la partie visible du document (largeur/hauteur de la zone de contenu) : `document.documentElement.clientWidth/Height`
- Largeur/hauteur de l'ensemble du document, avec la partie déroulante :
=======
- Width/height of the visible part of the document (content area width/height): `document.documentElement.clientWidth/clientHeight`
- Width/height of the whole document, with the scrolled out part:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

    ```js
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    ```

Défilement :

- Lire le défilement actuel : `window.pageYOffset/pageXOffset`.
- Modifiez le défilement actuel :

    - `window.scrollTo(pageX,pageY)` -- coordonnées absolues,
    - `window.scrollBy(x,y)` -- défilement par rapport à l'endroit actuel,
    - `elem.scrollIntoView(top)` -- défilement pour rendre `elem` visible (alignement avec le haut/bas de la fenêtre).
