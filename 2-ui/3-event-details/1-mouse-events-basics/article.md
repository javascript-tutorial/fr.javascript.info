# Evenements de base de la souris

Dans ce chapitre, nous verrons plus en détails les événements de la souris et leurs propriétés.

Remarque: Ces événements peuvent provenir non seulement de "périphériques de souris", mais également de périphériques, tels que les téléphones et les tablettes, où ils sont émulés pour des raisons de compatibilité.

## Les types d'évènements de Souris 

Nous  regroupons les évènements de la souris en deux catégories: "Simples" et "Complexes" .

###  Les évènements simples

Les évènements simples les plus utilisés sont: 

`mousedown/mouseup`
: Le bouton de la souris est appuyé puis relâché sur un élément.

`mouseover/mouseout`
: Le pointeur de la souris entre  ou sort d'un élément.

`mousemove`
: Chaque déplacement de la souris sur un élément déclenche cet évènement.

`contextmenu`
: Des déclencheurs lors de l'ouverture d'un menu contextuel sont tentés. Dans le cas le plus courant, cela se produit lorsque le bouton droit de la souris est enfoncé. Bien qu'il existe d'autres moyens d'ouvrir un menu contextuel, par exemple en utilisant une touche spéciale du clavier, donc ce n'est pas exactement l'événement de la souris.

...Il existe plusieurs autres types d'évènements aussi, nous allons les couvrir plus tard.

### Les évènements complexes

`click`
: est déclenché après un évènement `mousedown` et suite à un  `mouseup`  sur le même élément, si le bouton gauche de la souris a été utilisé

`dblclick`
: est déclenché après un  évènement double clique sur un élément.

Les évènements complexes sont faits à partir d’évènements simples, donc en théorie nous pourrions nous en passer. Mais ils existent et cela est une bonne chose parce qu’ils sont convenables.

### L’ordre des évènements

Une action peut déclencher plusieurs évènements.

Par exemple, un clic déclenche d'abord  un évènement `mousedown`, lorsqu'un bouton est appuyé, ensuite  un évènement `mouseup` et un évènement `click` lorsqu’il est relâché.

Au cas où une action unique initialise plusieurs évènements, leur ordre est fixé. C'est-à-dire que les gestionnaires sont appelés dans l'ordre `mousedown` -> `mouseup` -> `click`.

```online
Clique sur le bouton en bas et vous verrez les évènements. Essayez l’évènement double clic aussi. Dans TestStand en bas tous les évènements de la souris sont enregistrés, et si il y a plus d’une seconde de retard entre eux, ils sont alors séparés par une ligne horizontale.

Sur le banc de test ci-dessous, tous les événements de souris sont enregistrés et s'il y a un délai de plus d'une seconde entre eux, ils sont séparés par une règle horizontale.

Nous pouvons voir la propriété `which` qui permet de détecter le bouton de la souris.

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click me with the right or the left mouse button" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## Obtenir le bouton: which

Les évènements relatifs à l’événement clic ont toujours la propriété `which`, qui permet d’obtenir le bouton exact de la souris .

Elle  n’est pas utilisée pour  les évènements  `click` et  `contextmenu`, parce que le premier se passe uniquement sur le clic gauche et le dernier – uniquement sur le clic droit.

Mais si nous voulons controler les évènements `mousedown` et `mouseup`, nous en avons besoin, parce que ces évènements se déclenchent sur n’importe quel bouton, `which` nous permet de distinguer entre "right-mousedown" et  "left-mousedown".

Voici les trois valeurs possibles:

- `event.which == 1` -- the left button
- `event.which == 2` -- the middle button
- `event.which == 3` -- the right button

Le bouton du milieu est quelque peu exotique jusqu’à présent et est très rarement utilisé. 

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
  clavier - ça fonctionne. Mais si leur appareil n’en a pas - alors il devrait y avoir un autre moyen de faire de même.

=======
```warn header="There are also mobile devices"
Keyboard combinations are good as an addition to the workflow. So that if the visitor has a keyboard -- it works. And if their device doesn't have it -- then there should be another way to do the same.
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622
```

## Cordonnées: clientX/Y, pageX/Y

Tous les évènements de souris ont des cordonnées en deux types :

1. Window-relative: `clientX` et `clientY`.
2. Document-relative: `pageX` et `pageY`.


Par exemple, si nous avons une fenêtre de taille 500x500, et que la souris est dans le coin supérieur gauche, alors `clientX` et  `clientY` ont une valeur de `0`. Et si la souris est au centre, alors `clientX` et  `clientY` ont une valeur de  `250`, peu importe sa position dans le document. Et ils ont une position similaire à`position:fixed`.


````online
Déplacez la souris sur le champ de saisie pour voir `clientX/clientY` (l'exemple est dans l `iframe`, ainsi les cordonnées sont relatives à cet `iframe`) :

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
```
````
Les coordonnées relatives au document `pageX`,` pageY` sont comptées à partir du coin supérieur gauche du document, pas de la fenêtre. Vous pouvez en savoir plus sur les coordonnées dans le chapitre <info:coordinates>.

## Désactiver la sélection

Un double clic de souris a un effet secondaire qui peut être gênant dans certaines interfaces: il sélectionne le texte.


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

- Button: `which`.
- Touches modificatrices (`true` si pressées) : `altKey`, `ctrlKey`, `shiftKey` et `metaKey` (Mac).
  - Si vous voulez gérer `key:Ctrl`, alors n'oubliez pas les utilisateurs de Mac, ils utilisent généralement `key:Cmd`, il vaut donc mieux vérifier `if (e.metaKey || e.ctrlKey)`.

- Coordonnées relatives à la fenêtre : `clientX/clientY`.
- Coordonnées relatives au document : `pageX/pageY`.

L'action par défaut du navigateur de `mousedown` est la sélection de texte. Si ce n'est pas bon pour l'interface, alors il faut l'empêcher.

Dans le chapitre suivant, nous verrons plus en détails les événements qui suivent le mouvement du pointeur et  comment suivre les changements d’élément sous ce dernier.
