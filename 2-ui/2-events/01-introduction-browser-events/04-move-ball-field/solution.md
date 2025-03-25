
Tout d'abord, on doit choisir une méthode de positionnement du ballon.

On ne peut pas utiliser `position:fixed` pour le ballon, car scroller la page ferait sortir le ballon du terrain.

On devrait donc plutôt utiliser `position:absolute` et, pour consolider tout ça, positioner aussi le terrain `field`.

Puis le ballon est positionné relativement au terrain:

```css
#field {
  width: 200px;
  height: 150px;
  position: relative;
}

#ball {
  position: absolute;
  left: 0; /* relatif au parent le plus proche (le terrain) */
  top: 0;
  transition: 1s all; /* Les animations CSS pour gauche/haut fait s'envoler le ballon */
}
```

Ensuite, on doit assigner les valeurs correctes pour `ball.style.left/top`. Elles contiennent maintenant les coordonnées relatives au terrain.

Voici l'image:

![](move-ball-coords.svg)

On a `event.clientX/clientY` -- les coordonnées du clic relatives à la fenêtre.

Pour récupérer les coordonnées relatives au terrain `left` du clic, on peut soustraire la bordure gauche du terrain et la largeur de la bordure:

```js
let left = event.clientX - fieldCoords.left - field.clientLeft;
```

Normalement, `ball.style.left` signifie "la bordure gauche de l'élément" (le ballon). Donc si on assigne cette valeur `left`, alors c'est le bord du ballon, et non son centre, qui seraient à la position du clic.

On doit déplacer le ballon de la moitié de sa largeur vers la gauche, et de la moitié de sa hauteur vers le haut.

La valeur finale de `left` serait:

```js
let left = event.clientX - fieldCoords.left - field.clientLeft - ball.offsetWidth/2;
```

La coordonnée verticale est calculée en suivant la même logique.

Notez que la largeur/hauteur du ballon doivent être connues quand on accède à `ball.offsetWidth`. Elles devraient être spécifiées dans le HTML ou le CSS.
