<<<<<<< HEAD
# Evenements de base de la souris
=======
# Mouse events
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Dans ce chapitre, nous verrons plus en détails les événements de la souris et leurs propriétés.

Remarque: Ces événements peuvent provenir non seulement de "périphériques de souris", mais également de périphériques, tels que les téléphones et les tablettes, où ils sont émulés pour des raisons de compatibilité.

## Les types d'évènements de Souris 

<<<<<<< HEAD
Nous  regroupons les évènements de la souris en deux catégories: "Simples" et "Complexes" .

###  Les évènements simples

Les évènements simples les plus utilisés sont: 
=======
We've already seen some of these events:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

`mousedown/mouseup`
: Le bouton de la souris est appuyé puis relâché sur un élément.

`mouseover/mouseout`
: Le pointeur de la souris entre  ou sort d'un élément.

`mousemove`
: Chaque déplacement de la souris sur un élément déclenche cet évènement.

<<<<<<< HEAD
`contextmenu`
: Des déclencheurs lors de l'ouverture d'un menu contextuel sont tentés. Dans le cas le plus courant, cela se produit lorsque le bouton droit de la souris est enfoncé. Bien qu'il existe d'autres moyens d'ouvrir un menu contextuel, par exemple en utilisant une touche spéciale du clavier, donc ce n'est pas exactement l'événement de la souris.

...Il existe plusieurs autres types d'évènements aussi, nous allons les couvrir plus tard.

### Les évènements complexes

=======
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
`click`
: est déclenché après un évènement `mousedown` et suite à un  `mouseup`  sur le même élément, si le bouton gauche de la souris a été utilisé

`dblclick`
<<<<<<< HEAD
: est déclenché après un  évènement double clique sur un élément.

Les évènements complexes sont faits à partir d’évènements simples, donc en théorie nous pourrions nous en passer. Mais ils existent et cela est une bonne chose parce qu’ils sont convenables.

### L’ordre des évènements

Une action peut déclencher plusieurs évènements.

Par exemple, un clic déclenche d'abord  un évènement `mousedown`, lorsqu'un bouton est appuyé, ensuite  un évènement `mouseup` et un évènement `click` lorsqu’il est relâché.
=======
: Triggers after two clicks on the same element within a short timeframe. Rarely used nowadays.

`contextmenu`
: Triggers when the right mouse button is pressed. There are other ways to open a context menu, e.g. using a special keyboard key, it triggers in that case also, so it's not exactly the mouse event.

...There are several other events too, we'll cover them later.

## Events order

As you can see from the list above, a user action may trigger multiple events.

For instance, a left-button click first triggers `mousedown`, when the button is pressed, then `mouseup` and `click` when it's released.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Au cas où une action unique initialise plusieurs évènements, leur ordre est fixé. C'est-à-dire que les gestionnaires sont appelés dans l'ordre `mousedown` -> `mouseup` -> `click`.

```online
Clique sur le bouton en bas et vous verrez les évènements. Essayez l’évènement double clic aussi. Dans TestStand en bas tous les évènements de la souris sont enregistrés, et si il y a plus d’une seconde de retard entre eux, ils sont alors séparés par une ligne horizontale.

Sur le banc de test ci-dessous, tous les événements de souris sont enregistrés et s'il y a un délai de plus d'une seconde entre eux, ils sont séparés par une règle horizontale.

<<<<<<< HEAD
Nous pouvons voir la propriété `which` qui permet de détecter le bouton de la souris.
=======
Also we can see the `button` property that allows to detect the mouse button, it's explained below.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click me with the right or the left mouse button" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

<<<<<<< HEAD
## Obtenir le bouton: which

Les évènements relatifs à l’événement clic ont toujours la propriété `which`, qui permet d’obtenir le bouton exact de la souris .

Elle  n’est pas utilisée pour  les évènements  `click` et  `contextmenu`, parce que le premier se passe uniquement sur le clic gauche et le dernier – uniquement sur le clic droit.

Mais si nous voulons controler les évènements `mousedown` et `mouseup`, nous en avons besoin, parce que ces évènements se déclenchent sur n’importe quel bouton, `which` nous permet de distinguer entre "right-mousedown" et  "left-mousedown".

Voici les trois valeurs possibles:
=======
## Mouse button

Click-related events always have the `button` property, which allows to get the exact mouse button.

We usually don't use it for `click` and `contextmenu` events, because the former happens only on left-click, and the latter -- only on right-click.

From the other hand, `mousedown` and `mouseup` handlers we may need `event.button`, because these events trigger on any button, so `button` allows to distinguish between "right-mousedown" and "left-mousedown".

The possible values of `event.button` are:

| Button state | `event.button` |
|--------------|----------------|
| Left button (primary) | 0 |
| Middle button (auxillary) | 1 |
| Right button (secondary) | 2 |
| X1 button (back) | 3 |
| X2 button (forward) | 4 |
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Most mouse devices only have the left and right buttons, so possible values are `0` or `2`. Touch devices also generate similar events when one taps on them.

<<<<<<< HEAD
Le bouton du milieu est quelque peu exotique jusqu’à présent et est très rarement utilisé. 
=======
Also there's `event.buttons` property that has all currently pressed buttons as an integer, one bit per button. In practice this property is very rarely used, you can find details at [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons) if you ever need it.

```warn header="The outdated `event.which`"
Old code may use `event.which` property that's an old non-standard way of getting a button, with possible values:

- `event.which == 1` – left button,
- `event.which == 2` – middle button,
- `event.which == 3` – right button.

As of now, `event.which` is deprecated, we shouldn't use it.
```
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

## Les Touches de Modifications: shift, alt, ctrl and meta

Tous les évènements de la souris contiennent des informations à propos des touches de modifications qui sont appuyées.

Propriétés d'événement :

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (or `key:Opt` for Mac)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: `key:Cmd` for Mac

Ils sont `true` si la touche correspondante fut appuyée durant l'évènement.

Par exemple le bouton en bas fonctionne seulement avec `key:Alt+Shift`+click:

```html autorun height=60 
<button id="button">Alt+Shift+Click on me!</button>

<script>
  button.onclick = function(event) {
*!*
    if (event.altKey && event.shiftKey) {
*/!*
      alert('Hooray!');
    }
  };
</script>
```
```warn header="Attention : Sur Mac c’est souvent `Cmd` au lieu de `Ctrl`"

Sous Windows et Linux, il y a des touches modificatrices `key:Alt`, `key:Shift` et `key:Ctrl`. Sur Mac, il y en a une en plus : `key:Cmd`, correspondant à la propriété `metaKey`.

Dans la plupart des applications, lorsque Windows / Linux utilise `key:Ctrl`, sur Mac `key:Cmd` est utilisée.

C'est-à-dire : lorsqu'un utilisateur Windows appuie sur `key:Ctrl+Enter` ou `key:Ctrl+A`, un utilisateur Mac presserait sur `key:Cmd+Enter` ou `key:Cmd+A`, etc.

Donc, si nous voulons supporter des combinaisons comme `key:Ctrl`+click, alors pour Mac, il est logique d'utiliser `key:Cmd`+click. C'est plus confortable pour les utilisateurs de Mac.

Même si nous aimerions forcer les utilisateurs de Mac à `key:Ctrl`+click -- c'est un peu difficile. Le problème est: un clic gauche avec `key:Ctrl` est interprété comme un *clic droit* sur MacOS, et il génère l'évènement `menu contextuel`, et non un `click` comme sur Windows/Linux.

Donc, si nous voulons que les utilisateurs de tous les systèmes d'exploitation se sentent à l'aise, alors avec `ctrlKey` nous devrions vérifier la `metaKey`.

Pour JS-code cela signifie que nous devons contrôler si `if (event.ctrlKey || event.metaKey)`.
```

<<<<<<< HEAD

```warn header="Il y a aussi les appareils mobiles"

Les combinaisons de clavier sont un bon ajout au flux de travail. Tant que le visiteur a un
  clavier - ça fonctionne. Mais si leur appareil n’en a pas -- alors il devrait y avoir un autre moyen de faire la même chose.

=======
```warn header="There are also mobile devices"
Keyboard combinations are good as an addition to the workflow. So that if the visitor uses a keyboard -- they work. 

But if their device doesn't have it -- then there should be a way to live without modifier keys.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
```

## Cordonnées: clientX/Y, pageX/Y

Tous les évènements de souris ont des cordonnées en deux types :

<<<<<<< HEAD
1. Window-relative: `clientX` et `clientY`.
2. Document-relative: `pageX` et `pageY`.
=======
All mouse events provide coordinates in two flavours:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2


<<<<<<< HEAD
Par exemple, si nous avons une fenêtre de taille 500x500, et que la souris est dans le coin supérieur gauche, alors `clientX` et  `clientY` ont une valeur de `0`. Et si la souris est au centre, alors `clientX` et  `clientY` ont une valeur de  `250`, peu importe sa position dans le document. Et ils ont une position similaire à`position:fixed`.

=======
We already covered the difference between them in the chapter <info:coordinates>.

In short, document-relative coordinates `pageX/Y` are counted from the left-upper corner of the document, and do not change when the page is scrolled, while `clientX/Y` are counted from the current window left-upper corner. When the page is scrolled, they change.

For instance, if we have a window of the size 500x500, and the mouse is in the left-upper corner, then `clientX` and `clientY` are `0`, no matter how the page is scrolled. 

And if the mouse is in the center, then `clientX` and `clientY` are `250`, no matter what place in the document it is. They are similar to `position:fixed` in that aspect.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

````online
Déplacez la souris sur le champ de saisie pour voir `clientX/clientY` (l'exemple est dans l `iframe`, ainsi les cordonnées sont relatives à cet `iframe`) :

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
```
````
Les coordonnées relatives au document `pageX`,` pageY` sont comptées à partir du coin supérieur gauche du document, pas de la fenêtre. Vous pouvez en savoir plus sur les coordonnées dans le chapitre <info:coordinates>.

<<<<<<< HEAD
## Désactiver la sélection

Un double clic de souris a un effet secondaire qui peut être gênant dans certaines interfaces: il sélectionne le texte.
=======
## Preventing selection on mousedown

Double mouse click has a side-effect that may be disturbing in some interfaces: it selects text.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2


```html autorun height=50
<span ondblclick="alert('dblclick')">Double-click me</span>
```

Si on appuie sur le bouton gauche de la souris et, sans le relâcher, on déplace la souris, la sélection devient alors souvent indésirable.

Il existe plusieurs façons d’empêcher la sélection, que vous pouvez lire dans le chapitre <info:selection-range>.

Dans ce cas particulier, le moyen le plus raisonnable consiste à empêcher l'action du navigateur lors du `mousedown`. Il empêche ces deux sélections :

```html autorun height=50
Avant...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
   Double-click sur moi
</b>
...Apres
```

Désormais, l'élément en gras n'est pas sélectionné lors d'un double-clic, et si vous appuyez sur le bouton gauche de la souris, la sélection ne sera pas lancée.

Remarque: le texte à l'intérieur est toujours sélectionnable. Cependant, la sélection ne doit pas commencer sur le texte lui-même, mais avant ou après. Cela convient généralement aux utilisateurs.

````smart header="Prévenir la copie"
Si nous voulons désactiver la sélection pour protéger le contenu de notre page du copier-coller, nous pouvons utiliser un autre événement : `oncopy`.

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>

Cher Utilisateur
  Il vous est interdit de faire du copier-coller.
Si vous connaissez JS ou HTML, alors vous pouvez tout obtenir à partir de la page source néanmoins.
</div>
```
Si vous essayer de copier une partie de texte dans un `<div>`, cela ne va pas fonctionner, parce que l’action par défaut `oncopy`  est empêchée.

Certes, l'utilisateur a accès à la source HTML de la page et peut en extraire le contenu, mais tout le monde ne sait pas comment le faire.
````

## Résumé 

Les évènements de souris ont les propriétés suivantes :

<<<<<<< HEAD
- Button: `which`.
- Touches modificatrices (`true` si pressées) : `altKey`, `ctrlKey`, `shiftKey` et `metaKey` (Mac).
  - Si vous voulez gérer `key:Ctrl`, alors n'oubliez pas les utilisateurs de Mac, ils utilisent généralement `key:Cmd`, il vaut donc mieux vérifier `if (e.metaKey || e.ctrlKey)`.
=======
- Button: `button`.
- Modifier keys (`true` if pressed): `altKey`, `ctrlKey`, `shiftKey` and `metaKey` (Mac).
  - If you want to handle `key:Ctrl`, then don't forget Mac users, they usually use `key:Cmd`, so it's better to check `if (e.metaKey || e.ctrlKey)`.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

- Coordonnées relatives à la fenêtre : `clientX/clientY`.
- Coordonnées relatives au document : `pageX/pageY`.

L'action par défaut du navigateur de `mousedown` est la sélection de texte. Si ce n'est pas bon pour l'interface, alors il faut l'empêcher.

Dans le chapitre suivant, nous verrons plus en détails les événements qui suivent le mouvement du pointeur et  comment suivre les changements d’élément sous ce dernier.
