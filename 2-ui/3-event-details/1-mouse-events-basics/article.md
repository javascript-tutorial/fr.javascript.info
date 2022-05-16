# Evenements de la souris

Dans ce chapitre, nous verrons plus en détails les événements de la souris et leurs propriétés.

Remarque: Ces événements peuvent provenir non seulement de "périphériques de souris", mais également de périphériques, tels que les téléphones et les tablettes, où ils sont émulés pour des raisons de compatibilité.

## Les types d'évènements de Souris 

Nous avons déjà vu certains de ces événements :

`mousedown/mouseup`
: Le bouton de la souris est appuyé puis relâché sur un élément.

`mouseover/mouseout`
: Le pointeur de la souris entre  ou sort d'un élément.

`mousemove`
: Chaque déplacement de la souris sur un élément déclenche cet évènement.

`click`
: est déclenché après un évènement `mousedown` et suite à un  `mouseup`  sur le même élément, si le bouton gauche de la souris a été utilisé

`dblclick`
: Se déclenche après deux clics sur le même élément dans un court laps de temps. Rarement utilisé de nos jours.

`contextmenu`
: Se déclenche lorsque le bouton droit de la souris est enfoncé. Il existe d'autres façons d'ouvrir un menu contextuel, par ex. en utilisant une touche spéciale du clavier, il se déclenche dans ce cas également, donc ce n'est pas exactement l'événement de la souris.

... Il y a aussi plusieurs autres événements, nous les couvrirons plus tard.

## Ordre des événements

Comme vous pouvez le voir dans la liste ci-dessus, une action utilisateur peut déclencher plusieurs événements.

Par exemple, un clic gauche déclenche d'abord `mousedown`, lorsque le bouton est enfoncé, puis `mouseup` et `click` lorsqu'il est relâché.

Au cas où une action unique initialise plusieurs évènements, leur ordre est fixé. C'est-à-dire que les gestionnaires sont appelés dans l'ordre `mousedown` -> `mouseup` -> `click`.

```online
Clique sur le bouton en bas et vous verrez les évènements. Essayez l’évènement double clic aussi. Dans TestStand en bas tous les évènements de la souris sont enregistrés, et si il y a plus d’une seconde de retard entre eux, ils sont alors séparés par une ligne horizontale.

Sur le banc de test ci-dessous, tous les événements de souris sont enregistrés et s'il y a un délai de plus d'une seconde entre eux, ils sont séparés par une règle horizontale.

Nous pouvons également voir la propriété `button` qui permet de détecter le bouton de la souris, c'est expliqué ci-dessous.

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click me with the right or the left mouse button" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## Bouton de la souris

Les événements liés aux clics ont toujours la propriété `button`, qui permet d'obtenir le bouton exact de la souris.

Nous ne l'utilisons généralement pas pour les événements `click` et `contextmenu`, car le premier se produit uniquement lors d'un clic gauche, et le second - uniquement lors d'un clic droit.

<<<<<<< HEAD
D'un autre côté, les gestionnaires `mousedown` et `mouseup` peuvent avoir besoin de `event.button`, car ces événements se déclenchent sur n'importe quel bouton, donc` button` permet de faire la distinction entre "right-mousedown" et "left-mousedown".
=======
On the other hand, `mousedown` and `mouseup` handlers may need `event.button`, because these events trigger on any button, so `button` allows to distinguish between "right-mousedown" and "left-mousedown".
>>>>>>> 2901e0c64590a67d8a2bde1ea76a514d96f80469

Les valeurs possibles de `event.button` sont :

| État du bouton              | `event.button` |
|-----------------------------|----------------|
| Bouton gauche (principal)   | 0              |
| Bouton central (auxiliaire) | 1              |
| Bouton droit (secondaire)   | 2              |
| X1 bouton (arrière)         | 3              |
| X2 bouton (avant)          | 4              |

La plupart des souris n'ont que les boutons gauche et droit, donc les valeurs possibles sont `0` ou `2`. Les appareils tactiles génèrent également des événements similaires lorsque l'on appuie dessus.

Il existe également la propriété `event.buttons` qui a tous les boutons actuellement pressés sous forme d'entier, un bit par bouton. En pratique cette propriété est très rarement utilisée, vous pouvez trouver des détails sur [MDN](mdn:/api/MouseEvent/buttons) si jamais vous en avez besoin.

```warn header="Le `event.which` obsolète"
L'ancien code peut utiliser la propriété `event.which` qui est une ancienne manière non standard d'obtenir un bouton, avec des valeurs possibles :

- `event.which == 1` – bouton gauche,
- `event.which == 2` – bouton du milieu,
- `event.which == 3` – bouton de droite.

Dorénavant, `event.which` est obsolète, nous ne devrions pas l'utiliser.
```

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

```warn header="Il y a aussi les appareils mobiles"

Les combinaisons de clavier sont un bon complément au flux de travail. Donc, si le visiteur utilise un clavier -- ils fonctionnent.

Mais si leur appareil n'en a pas, il devrait y avoir un moyen de vivre sans touches de modification.
```

## Cordonnées: clientX/Y, pageX/Y

Tous les événements de souris fournissent des coordonnées de deux manières :


Nous avons déjà couvert la différence entre eux dans le chapitre <info:coordinates>.

En résumé, les coordonnées relatives au document `pageX/Y` sont comptées à partir du coin supérieur gauche du document, et ne changent pas lorsque la page défile, tandis que` clientX/Y` sont comptées à partir du coin supérieur gauche de la fenêtre actuelle . Lorsque la page défile, ils changent.

Par exemple, si nous avons une fenêtre de taille 500x500 et que la souris est dans le coin supérieur gauche, alors `clientX` et `clientY` sont `0`, peu importe comment la page est défilée.

Et si la souris est au centre, alors `clientX` et `clientY` sont `250`, quelle que soit la place dans le document. Ils sont similaires à `position:fixed` dans cet aspect.

````online
Déplacez la souris sur le champ de saisie pour voir `clientX/clientY` (l'exemple est dans l `iframe`, ainsi les cordonnées sont relatives à cet `iframe`) :

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
```
````
Les coordonnées relatives au document `pageX`,` pageY` sont comptées à partir du coin supérieur gauche du document, pas de la fenêtre. Vous pouvez en savoir plus sur les coordonnées dans le chapitre <info:coordinates>.

## Empêcher la sélection sur le mousedown

<<<<<<< HEAD
Le double clic de souris a un effet secondaire qui peut être dérangeant dans certaines interfaces: il sélectionne du texte.
=======
Double mouse click has a side effect that may be disturbing in some interfaces: it selects text.
>>>>>>> 2901e0c64590a67d8a2bde1ea76a514d96f80469

par exemple, double-cliquer sur le texte ci-dessous le sélectionne en plus de notre gestionnaire :

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

- Bouton: `button`.
- Touches de modification (`true` si pressées): `altKey`, `ctrlKey`, `shiftKey` et `metaKey` (Mac).
  - Si vous voulez gérer `key:Ctrl`, alors n'oubliez pas les utilisateurs de Mac, ils utilisent généralement `key:Cmd`, il est donc préférable de vérifier `if (e.metaKey || e.ctrlKey)`.

- Coordonnées relatives à la fenêtre : `clientX/clientY`.
- Coordonnées relatives au document : `pageX/pageY`.

L'action par défaut du navigateur de `mousedown` est la sélection de texte. Si ce n'est pas bon pour l'interface, alors il faut l'empêcher.

Dans le chapitre suivant, nous verrons plus en détails les événements qui suivent le mouvement du pointeur et  comment suivre les changements d’élément sous ce dernier.
