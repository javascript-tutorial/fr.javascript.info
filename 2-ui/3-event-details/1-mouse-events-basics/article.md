# Evenements de base de la souris

Les évènements de souris ne proviennent pas uniquement  des "manipulateurs de la souris", mais ils peuvent aussi être émulés sur des appareils tactiles, afin de les rendre compatibles.

Dans ce chapitre nous verrons plus en détail  les évènements clics et leurs propriétés.

## Les types d'évènements de Souris 

Nous  regroupons les évènements de types souris en deux catégories: "Simples" et "Complexes" .

###  Les évènements simples

Les évènements simples les plus utilisés sont: 

`mousedown/mouseup`
: Le bouton de la souris est appuyé et relâché sur un élément.

`mouseover/mouseout`
: Le pointeur de la souris traverse à l'intérieur ou hors d'un élément.

`mousemove`
: Chaque déplacement de la souris sur un élément déclenche cet évènement.

...Il existe plusieurs autres types d'évènements aussi, nous allons les couvrir plus tard.

### Les évènements complexes

`click`
: est déclenché après un évènement `mousedown` et suite à un  `mouseup` un  sur le même élément si le bouton gauche de la souris a été utilisé

`contextmenu`
: est déclenché après un  évènement `mousedown` si le bouton gauche de la souris a été utilisé.

`dblclick`
: est déclenché après un  évènement double clique sur un élément.

Les évènements complexes sont faits à partir d’évènements simples, donc en théorie nous pourrions nous en passer. Mais ils existent et cela est une bonne chose parce qu’ils sont convenables.

### L’ordre des évènements

Une action peut déclencher plusieurs évènements.

Par exemple, un clic déclenche d'abord  un évènement `mousedown`, lorsqu'un bouton est appuyé, ensuite  un évènement `mouseup` et un évènement `click` lorsqu’il est relâché.

Au cas où une action unique initialise plusieurs évènements, leur ordre est fixé. Cela veut  dire, les gestionnaires d’évènements sont appelés selon l’ordre suivant `mousedown` -> `mouseup` -> `click`. Les évènements sont gérés selon la même séquence:  `onmouseup` finit avant que   `onclick` ne démarre.

```online
Clique sur le bouton en bas et vous verrez les évènements. Essayez l’évènement double clic aussi. Dans TestStand en bas tous les évènements de la souris sont enregistrés, et si il y a plus d’une seconde de retard entre eux, ils sont alors séparés par une ligne horizontale.

Nous pouvons voir la propriété `which` qui permet de détecter le bouton de la souris.

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click me with the right or the left mouse button" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## Obtenir le bouton: which

Les évènements relatifs à l’événement clic ont toujours la propriété `which`, qui permet d’obtenir le bouton exact de la souris .

Elle  n’est pas utilisée pour  les évènements  `click` et  `contextmenu`, parce que le premier se passe uniquement sur le clic gauche et le dernier – uniquement sur le clic droit.

Mais si nous voulons suivre les évènements `mousedown` and `mouseup`, alors nous en avons besoin, parce que ces évènements se déclenchent sur n’importe quel bouton, donc `which`permet de distinguer entre "right-mousedown" et  "left-mousedown".

Voici les trois valeurs possibles:

- `event.which == 1` -- the left button
- `event.which == 2` - the middle button
- `event.which == 3` - the right button

Le bouton du milieu est quelque peu exotique jusqu’à présent et est très rarement utilisé. 

## Les Touches de Modifications: shift, alt, ctrl and meta

Tous les évènements de la souris contiennent des informations à propos des touches de modifications qui sont appuyées.

Les propriétés sont :

- `shiftKey`
- `altKey`
- `ctrlKey`
- `metaKey` (`key:Cmd` for Mac)

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
```warn header="Attention: Sur Mac c’est souvent `Cmd` au lieu de `Ctrl`"

Sur Windows et Lunix il y a les touches de Modification key:Alt`, `key:Shift` and `key:Ctrl`.Sur Mac il y a une de plus: `key:Cmd`,  elle correspond à la propriété `metaKey`.

Dans la plus part des cas lorsque Windows/Linux utilise `key:Ctrl`, les gens sur Mac utilisent `key:Cmd`. Donc là ou un utilisateur Windows appuie sur  `key:Ctrl+Enter` ou `key:Ctrl+A`, un utilisateur Mac va appuyer sur  `key:Cmd+Enter` oubien sur `key:Cmd+A`, ainsi de suite, la plupart des apps utilisent `key:Cmd`  au lieu de `key:Ctrl`.

Donc si nous voulons supporter les combinaisons comme `key:Ctrl`+click, alors sur Mac on est sensé utiliser `key:Cmd`+click. C’est plus confortable pour les usagers de Mac.

Même si nous voudrions forcer les usagers de Mac à utiliser to `key:Ctrl`+click --  cela semble être difficile. Le problème en est : qu’un clic-gauche avec `key:Ctrl` est interprète comme un *right-click* sur Mac, et cela génère l’évènement `contextmenu`, non pas un `click` comme sous Windows/Lunix.

Donc si nous voulons que les usagers de tous les systèmes d’Exploitations soient confortables, alors avec `ctrlKey`  nous devons utiliser `metaKey`.

Pour JS-code cela signifie que nous devons contrôler si `if (event.ctrlKey || event.metaKey)`.
```

```warn header="Il y a aussi les appareils mobiles"

Les combinaisons du clavier sont tout aussi bonnes comme ajout au processus de travail. De sorte que si un visiteur a un clavier—cela fonctionne. Et si votre appareil n'en possède pas—qu’il possède un autre moyen d’effectuer la même chose.
```

## Cordonnées: clientX/Y, pageX/Y

Tous les évènements de souris ont des cordonnées en deux types :

1. Window-relative: `clientX` et `clientY`.
2. Document-relative: `pageX` et `pageY`.

Par exemple, si nous avons une fenêtre de taille 500x500, et la souris est au coin gauche en haut, alors `clientX` et  `clientY` ont une valeur de `0`. Et si la souris est au centre, alors `clientX` et  `clientY` ont une valeur de  `250`, quel que soit la position dans le document il se trouve. Et ils ont une position similaire à`position:fixed`.

````online
Glisse la souris à l’intérieur des champs de saisie texte pour voir les `clientX/clientY` (C’est dans l `iframe`, ainsi les cordonnées sont relatives à cet `iframe`):

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
```
````
Les cordonnées relatives au document sont comptés à partir du coin gauche en haut du document, et non pas par rapport à la fenêtre.
Les coordonnées `pageX`, `pageY` sont similaires à `position:absolute` au niveau document.
Vous pouvez lire plus à propos des cordonnées dans le chapitre <info:coordinates>.

## Aucune sélection au clic mousedown

Les clics de souris ont un effet secondaire qui peut être perturbant. Le double clic  sélectionne le texte.

Si nous voulons gérer les évènements clic, alors la sélection en   "extra" ne rend pas bien.
Par exemple, un double-clic sur le texte en bas le sélectionne en ajout à notre gestionnaire d’évènement : 

```html autorun height=50
<b ondblclick="alert('dblclick')">Double-click me</b>
```

Il existe un moyen par css de stopper la sélection : la propriété `user-select` voir  [CSS UI Draft](https://www.w3.org/TR/css-ui-4/).

Plusieurs navigateurs le supportent avec les préfixes :

```html autorun height=50
<style>
  b {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>

Avant...
<b ondblclick="alert('Test')">
  Non sélectionnable
</b>
...Apres
```

Maintenant si vous effectuez un double-clic sur "Non sélectionnable",  le texte n’est pas sélectionné. Ça semble marcher.

…But il y a un problème potentiel ! Le texte devient en réalité non sélectionnable. Même si un utilisateur commence la sélection à partir d’"Avant" et se termine par "Apres", la sélection saute la partie "Non sélectionnable". Voulons-nous vraiment rendre notre texte non sélectionnable ?

La plus part du temps, ce n’est pas ce que nous voulons. Un utilisateur peut avoir des raisons valides de sélectionner le texte, pour la copie ou d’autres besoins. Cela pourrait être inconvenable si nous ne leur permettrons pas de le faire. Donc cette solution n’est pas aussi bonne.

Ce que nous voulons c’est d’empêcher la sélection au  double-click, uniquement.

La sélection du texte est l’action par défaut du navigateur de  l’évènement `mousedown`. Donc une solution alternative serait de gérer le `mousedown` et de l’empêcher, comme ainsi :

```html autorun height=50
Avant...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
   Double-click sur moi
</b>
...Apres
```

Maintenant l’élément en gras n’est pas sélectionné aux doubles clics.
Le texte à l’intérieur est encore sélectionnable. Cependant, la sélection ne doit pas commencer sur le texte lui-même, mais avant ou après celui-ci. Souvent, c’est suffisant cependant.

````smart header="Canceling the selection"
Au lieu d’*empêcher* la sélection, nous pouvons l’annuler a posteriori dans le gestionnaire de l’évènement
Voici comment procéder:

```html autorun height=50
Avant...
<b ondblclick="*!*getSelection().removeAllRanges()*/!*">
  Double-click sur moi
</b>
...Après
```

Si vous faites un double-click sur l’élément en gras, alors la sélection apparait et ensuite elle est immédiatement enlevée. Cela n’est pas joli cependant.

````

````smart header="Preventing copying"
Si nous voulons désactiver la sélection pour protéger notre contenu du copier-coller, alors nous pouvons utiliser un autre évènement : `oncopy`.
```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>

Cher Utilisateur
  Il vous est interdit de faire du copier-coller.
Si vous connaissez JS ou HTML, alors vous pouvez tout obtenir à partir de la page source néanmoins.
</div>
```
Si vous essayer de copier une partie de texte dans un `<div>`, cela ne va pas fonctionner, parce que l’action par défaut `oncopy`  est empêchée.

Surement cela ne peut empêcher l’utilisateur d’ouvrir le code source HTML, mais tout le monde ne sait pas comment le faire.
````

## Résumé 

Les évènements de souris ont les propriétés suivantes :

- Button: `which`.
- Modifier keys (`true` if pressed): `altKey`, `ctrlKey`, `shiftKey` et  `metaKey` (Mac).
- Si vous voulez gérer `key:Ctrl`, alors n’oubliez pas les utilisateurs Mac qui utilisent `key:Cmd`, alors il est mieux de contrôler si `if (e.metaKey || e.ctrlKey)`.
- Window-relative coordinates: `clientX/clientY`.
- Document-relative coordinates: `pageX/pageY`.

Il est important de traiter la sélection de texte comme étant un effet secondaire non volontaire des clics
Il y a plusieurs moyens de faire cela, par exemple : 
1. La propriété css  `user-select:none` (avec les prefixes navigateur) désactive complètement la sélection de texte.
2. Annule la sélection post-factum en utilisant `getSelection().removeAllRanges()`.
3. Gere l’évènement `mousedown` et empêche l’action par default (souvent la meilleur option).
