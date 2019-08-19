# Les évènements Glisser-Déposer de la souris

<<<<<<< HEAD
Le Glisser-déposer  est une excellente solution d’interface. Prendre quelque chose, la déplacer et la déposer est une manière claire et simple  de faire plusieurs choses, de copier et (voir les gestionnaires de fichiers) en passant par le rangement (déposer dans un panier).
 
Le standard modern de l’HTML dispose d’une  [section sur le  Glisser- Déposer](https://html.spec.whatwg.org/multipage/interaction.html#dnd) avec les évènements spéciaux tels que `dragstart`, `dragend`  et ainsi de suite.
=======
Drag'n'Drop is a great interface solution. Taking something, dragging and dropping is a clear and simple way to do many things, from copying and moving documents (as in file managers) to ordering (drop into cart).
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

Ils sont intéressants parce qu’ils permettent de résoudre  facilement des taches simples. Ils permettent aussi de gérer le glisser-déposer de fichiers  "externes" dans le navigateur. Donc nous pouvons prendre un fichier dans le gestionnaire du système d’exploitation et le déposer dans la fenêtre du navigateur. Ensuite JavaScript obtient l’accès à ses contenus.

Mais les Evènements natifs de types déplacer ont aussi leurs limites. Par exemple, nous ne pouvons pas limiter le glissement sur une certaine surface. Nous ne pouvons pas  le faire seulement de manière  "horizontale" ou "verticale". Il existe d’autres taches,  Glisser-déplacer, qui ne peuvent être implémentées en utilisant cet  Interface de Programmation d’Application.

<<<<<<< HEAD
Alors ici, nous allons voir comment mettre en œuvre le Glisser-déposer en utilisant  les évènements de la souris. Cela n’est pas difficile non plus.

## L’algorithme du Glisser- Déposer
=======
But native Drag Events also have limitations. For instance, we can't limit dragging by a certain area. Also we can't make it "horizontal" or "vertical" only. There are other drag'n'drop tasks that can't be done using that API.

Here we'll see how to implement Drag'n'Drop using mouse events.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

L’algorithme de base du Glisser-Déposer ressemble à ceci:

1. Attraper l’évènement `mousedown` sur un élément déplaçable.
2. Préparer l’élément pour un glissement (peut être créer une copie de celui-ci ou autre chose).
3. Ensuite à l’évènement `mousemove` le faire glisser en changeant les propriétés `left/top`  et `position:absolute`.
4. A l’exécution de l’évènement `mouseup` (relâchement du bouton) – faire toutes les  actions liées a un Glisser-Déposer effectué.

<<<<<<< HEAD
Ce sont les étapes de bases.  Nous pouvons l’étendre, par exemple, en mettant en valeur les éléments déposables (disponible a recevoir une action déposer) lorsqu’on les survolent.

Voici l’algorithme pour le Glisser-Déposer d’une balle:
=======
1. On `mousedown` - prepare the element for moving, if needed (maybe create a copy of it).
2. Then on `mousemove` move it by changing `left/top` and `position:absolute`.
3. On `mouseup` - perform all actions related to a finished Drag'n'Drop.

These are the basics. Later we can extend it, for instance, by highlighting droppable (available for the drop) elements when hovering over them.

Here's the algorithm for drag'n'drop of a ball:
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

```js
ball.onmousedown = function(event) { // (1) start the process

  // (2) prepare to moving: make absolute and on top by z-index
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  // le deplacer hors de ses parents en cours directement sur un l’element body 
  // le positionner relativement à l’élément body
  document.body.append(ball);  
<<<<<<< HEAD
  // ... et mettre cette balle positionnée de manière absolue sous le curseur
=======
  // ...and put that absolutely positioned ball under the pointer
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

  moveAt(event.pageX, event.pageY);

  // Centrer la balle aux coordonnées (pageX, pageY)
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (3) Faire glisser la balle a l’evenement mousemove
  document.addEventListener('mousemove', onMouseMove);

  // (4) déposer la balle, enlever les gestionnaires d’évènements dont on a pas besoin
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};
```

Si nous exécutons le code, nous pouvons remarquer quelque chose d’étrange. Au début de l’action Glisser-Déposer, la  balle est prise en "fourchette": Nous commençons à faire glisser son "clone".

```online
Voici un exemple en action:

[iframe src="ball" height=230]

<<<<<<< HEAD
Essayer de Glisser-Déposer avec la souris  et vous verrez l’étrange effet.
=======
Try to drag'n'drop the mouse and you'll see such behavior.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
```

C’est parce que le navigateur a son propre Glisser-Déposer pour les images  et quelques autres  éléments qui s’exécute automatiquement et entre en conflit avec le nôtre.

Pour le désactiver:

```js
ball.ondragstart = function() {
  return false;
};
```

Maintenant tout rentre dans l’ordre.

```online
En action:

[iframe src="ball2" height=230]
```

Un autre aspect important—nous suivons l’évènement `mousemove` sur le `document`, pas sur la `balle`. A première vue, il semblerait que la souris soit toujours sur la balle, et nous pouvons lui appliquer l’évènement `mousemove`.

<<<<<<< HEAD
Mais si nous nous rappelons, l’évènement `mousemove` se déclenche souvent, mais pas sur chaque pixel. Donc après un mouvement rapide, le curseur peut sauter de la balle pour aller quelque part au milieu du document (oubien même hors de la fenêtre).
=======
But as we remember, `mousemove` triggers often, but not for every pixel. So after swift move the pointer can jump from the ball somewhere in the middle of document (or even outside of the window).
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

Donc nous devons écouter le `document` pour le capturer.

## Positionnent correcte

Dans les exemples ci-dessus la balle est toujours déplacée ainsi, de sorte à ce que son centre soit au-dessous  du curseur:

```js
ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
```

<<<<<<< HEAD
Pas mal,  mais il y a un  effet secondaire. Pour initier le Glissser-Deposer, nous pouvons appliquer un `mousedown` n’importe où sur la balle. Mais si nous le faisons sur le rebord, alors la balle "saute" soudainement  pour être centrée.
=======
Not bad, but there's a side-effect. To initiate the drag'n'drop, we can `mousedown` anywhere on the ball. But if "take" it from its edge, then the ball suddenly "jumps" to become centered under the mouse pointer.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

Ce serait mieux si nous gardions le  changement initial de l’élément relativement au curseur.

<<<<<<< HEAD
Par exemple, si nous commençons le glissement par le rebord de la balle, alors le curseur doit rester sur le rebord pendant le déplacement.

![](ball_shift.svg)

1. Lorsqu’un visiteur appuye sur le bouton (`mousedown`) – nous pouvons garder en mémoire la distance du curseur au coin gauche en haut de la balle dans des variables `shiftX/shiftY`. Nous devons garder cette distance en faisant le glissement.
=======
For instance, if we start dragging by the edge of the ball, then the pointer should remain over the edge while dragging.

![](ball_shift.svg)

Let's update our algorithm:

1. When a visitor presses the button (`mousedown`) - remember the distance from the pointer to the left-upper corner of the ball in variables `shiftX/shiftY`. We'll keep that distance while dragging.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

   Pour obtenir ces changements nous pouvons soustraire les coordonnées:

    ```js
    // onmousedown
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;
    ```

2. Ensuite pendant qu’on fait le glissement nous positionnons la balle sur le même changement relativement au curseur, ainsi:

    ```js
    // onmousemove
<<<<<<< HEAD
    // la balle a un positionnement position:absoute
=======
    // у мяча ball стоит position:absoute
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
    ball.style.left = event.pageX - *!*shiftX*/!* + 'px';
    ball.style.top = event.pageY - *!*shiftY*/!* + 'px';
    ```

Le code final avec un meilleur positionnement:

```js
ball.onmousedown = function(event) {

*!*
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;
*/!*

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  // Déplace la balle aux cordonnées (pageX, pageY) 
  // Prenant en compte les changements initiaux 
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - *!*shiftX*/!* + 'px';
    ball.style.top = pageY - *!*shiftY*/!* + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // déplace la balle à l’évènement mousemove
  document.addEventListener('mousemove', onMouseMove);

  // dépose la balle, enlève les gestionnaires d’évènements dont on a pas besoin
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};

ball.ondragstart = function() {
  return false;
};
```

```online
En action (inside `<iframe>`):

[iframe src="ball3" height=230]
```

<<<<<<< HEAD
La différence est particulièrement notable si nous faisons glisser la balle depuis son coin gauche  et en bas. Dans l’exemple précèdent la balle "saute" sous le curseur. Maintenant il suit facilement le curseur à partir de sa position en cours.

## Potentiels Cibles pour un Déposer (déposables)

Dans les exemples précédents la balle pouvait être déposée juste "n’ importe où" pour qu’elle y soit. En réalité, nous prenons souvent un élément et le déposons sur un  autre. Par exemple, un fichier dans un dossier, oubien un utilisateur dans une poubelle, ou autre chose.

En d’autres termes, nous prenons un élément "déplaçable" et le déposons sur un élément  ou l’on peut déposer "déposable".
=======
The difference is especially noticeable if we drag the ball by its right-bottom corner. In the previous example the ball "jumps" under the pointer. Now it fluently follows the pointer from the current position.

## Potential drop targets (droppables)

In previous examples the ball could be dropped just "anywhere" to stay. In real-life we usually take one element and drop it onto another. For instance, a "file" into a "folder" or something else.

Speaking abstract, we take a "draggable" element and drop it onto "droppable" element.

We need to know:
- where the element was dropped at the end of Drag'n'Drop -- to do the corresponding action,
- and, preferably, know the droppable we're dragging over, to highlight it.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

Nous avons besoin de savoir ou l’élément fut déposé à la fin du Glisser-Déposer—pour faire l’action correspondante, et de préférence, connaitre l’objet sur lequel on peut effectuer une action déposer, pour le mettre en valeur.

<<<<<<< HEAD
La solution semble être intéressante et un tout petit peu délicat, donc nous allons la traiter ici.
Quelle pourrait être une première idée? Probablement assigner les gestionnaires d’évènement `mouseover/mouseup` aux potentiels objets déposables  et détecter quand le curseur de la souris apparait sur eux. Et ensuite savoir que nous sommes entrain d’effectuer un glisser-déposer sur cet élément.
=======
What may be the first idea? Probably to set `mouseover/mouseup` handlers on potential droppables?
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

Mais cela ne marche pas.

Le problème est que, pendant que nous exécutons le déplacement, l’élément déplaçable est toujours sur les autres éléments. Et les évènements de la souris ont lieu seulement sur l’élément, pas sur ceux se trouvant au-dessous  de ce dernier.

<<<<<<< HEAD
Par exemple, voici deux éléments `<div>` en bas, un en rouge au-dessus d’un autre en bleu. Il n’y a aucun moyen de capturer un évènement sur celui en bleu, parce que le div rouge se trouve au-dessus de celui-ci:
=======
For instance, below are two `<div>` elements, red one on top of the blue one (fully covers). There's no way to catch an event on the blue one, because the red is on top:
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

```html run autorun height=60
<style>
  div {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
  }
</style>
<div style="background:blue" onmouseover="alert(Ne marche jamais')"></div>
<div style="background:red" onmouseover="alert('sur le rouge!')"></div>
```

De la même manière avec l’élément déplaçable, la balle est toujours au-dessus des autres éléments, donc les évènements s’exécutent sur lui. Quel que soit les gestionnaires que l’on assigne aux éléments se trouvant en bas, ils ne vont pas fonctionner.

C’est pourquoi l’idée initiale de mettre les gestionnaires sur des potentiels objets déposables ne fonctionne pas  en pratique. Ils ne vont pas démarrer.

Alors, que faire?

Il existe une méthode appelée `document.elementFromPoint(clientX, clientY)`. Elle retourne l’élément le plus imbriqué sur les coordonnées données  relativement à une fenêtre (oubien `null` les coordonnées données sont hors de la fenêtre).

<<<<<<< HEAD
Donc sur n’importe lequel de nos gestionnaires d’évènements de souris  nous pouvons détecter l’objet potentiel qui peut recevoir un déposer sous le curseur ainsi:

```js
// dans un gestionnaire d’évènement 
ball.hidden = true; // (*)
let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
ball.hidden = false;
// elemBelow est l’élément au-dessous de la balle, elle peut recevoir un glisser-déposer 
```

Notez bien: nous avons  besoin de cacher la balle avant l’appel `(*)`. Autrement nous aurons souvent une balle sur ces coordonnées, étant donne c’est l’élément au-dessus qui est sous le curseur: `elemBelow=ball`.
=======
We can use it in any of our mouse event handlers to detect the potential droppable under the pointer, like this:

```js
// in a mouse event handler
ball.hidden = true; // (*) hide the element that we drag

let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
// elemBelow is the element below the ball, may be droppable

ball.hidden = false;
```

Please note: we need to hide the ball before the call `(*)`. Otherwise we'll usually have a ball on these coordinates, as it's the top element under the pointer: `elemBelow=ball`. So we hide it and immediately show again.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

Nous pouvons utiliser ce code pour voir quel élément nous sommes entrain de "survoler" à n’importe quel moment. Et gérer le déposer lorsque cela survient.

Une version élaborée du code de `onMouseMove` pour trouver les éléments qui peuvent recevoir un "déposer":

```js
<<<<<<< HEAD
let currentDroppable = null; // potentiel objet déposable que nous survolons actuellement  
=======
// potential droppable that we're flying over right now
let currentDroppable = null;

>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);

  ball.hidden = true;
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  ball.hidden = false;

<<<<<<< HEAD
  // Les évènements mousemove peuvent se déclencher en dehors de la fenêtre  (quand la balle est glissée  hors de l’écran)
  // Si les coordonnées clientX/clientY sont hors de la fenêtre, alors  elementfromPoint retourne null
=======
  // mousemove events may trigger out of the window (when the ball is dragged off-screen)
  // if clientX/clientY are out of the window, then elementFromPoint returns null
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
  if (!elemBelow) return;

  // Les objets potentiels pouvant recevoir les déposer sont étiquetés avec la classe "droppable" (peut être une autre logique)
  let droppableBelow = elemBelow.closest('.droppable');

<<<<<<< HEAD
  if (currentDroppable != droppableBelow) { // S’il y a des changements
    // nous survolons vers l’interieur ou hors de...
    // A noter: Les deux valeurs peuvent être nulles
    //   currentDroppable=null  si nous ne sommes pas sur un objet déposable avant cet évènement (e.g sur un espace vide)
    //   droppableBelow=null si nous ne sommes pas sur un objet déposable en ce moment, pendant l’évènement 
=======
  if (currentDroppable != droppableBelow) {
    // we're flying in or out...
    // note: both values can be null
    //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
    //   droppableBelow=null if we're not over a droppable now, during this event
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

    if (currentDroppable) {
      // logique pour évaluer  le "survol hors" de l’objet déposable (enlever la mise en valeur)
      leaveDroppable(currentDroppable);
    }
    currentDroppable = droppableBelow;
    if (currentDroppable) {
      // logique pour évaluer  le "survol vers l’intérieur" de l’objet déposable
      enterDroppable(currentDroppable);
    }
  }
}
```

Dans l’exemple en bas quand la balle est glissée sur le camp du gardien de but, ce dernier est mis en valeur.

[codetabs height=250 src="ball4"]

Maintenant nous avons  "l’objet cible" en cours,  que nous survolons, dans une  variable `currentDroppable` Durant tout le processus et nous pouvons l’utiliser pour mettre en valeur une chose ou faire une autre chose.

## Résume

Nous avons étudié un algorithme de base du glisser-déposer.
Les composantes clés sont:

1. L’ordre des évènements: `ball.mousedown` -> `document.mousemove` -> `ball.mouseup` (annule l’évènement natif de `ondragstart`).
2. Au démarrage du glissement – capturer le changement initial du curseur relativement à l’élément: `shiftX/shiftY` et le garder durant le glissement.
3. Détecter les éléments pouvant recevoir l’action déposer sous le curseur en utilisant `document.elementFromPoint`.

<<<<<<< HEAD
Nous pouvons faire beaucoup de choses sur cette base.
=======
1. Events flow: `ball.mousedown` -> `document.mousemove` -> `ball.mouseup` (don't forget to cancel native `ondragstart`).
2. At the drag start -- remember the initial shift of the pointer relative to the element: `shiftX/shiftY` and keep it during the dragging.
3. Detect droppable elements under the pointer using `document.elementFromPoint`.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

- A l’exécution de l’évènement `mouseup` nous pouvons finaliser le déposer: changer les données, déplacer les évènements.
- Nous pouvons mettre en valeur les éléments que nous survolons.
- Nous pouvons limiter le glissement sur une surface et selon une direction voulue. 
- Nous pouvons utiliser la délégation d’évènements avec  `mousedown/up`.  Un gestionnaire d’évènement sur une grande surface qui contrôle la propriété `event.target` peut gérer  le Glisser-déposer pour des centaines d’éléments.
- Ainsi de suite.

<<<<<<< HEAD
=======
- On `mouseup` we can intellectually finalize the drop: change data, move elements around.
- We can highlight the elements we're flying over.
- We can limit dragging by a certain area or direction.
- We can use event delegation for `mousedown/up`. A large-area event handler that checks  `event.target` can manage Drag'n'Drop for hundreds of elements.
- And so on.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

Il existe des cadres de programmation qui fondent leur architecture sur cela: `DragZone`, `Droppable`, `Draggable` et autres classes. La plus part d’entre elles font des choses similaires à celles décrites au-dessus, donc cela devrait être facile pour vous de les comprendre maintenant. Ou bien même déployer le vôtre, parce que vous savez déjà comment gérer le processus, et cela pourrait être plus flexible que d’adapter quelque chose d’autre.
