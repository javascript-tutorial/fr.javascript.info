Pour rebondir, nous pouvons utiliser les propriétés CSS `top` et `position:absolute` pour la balle à l'intérieur du champ avec `position:relative`.

La coordonnée du bas du champ est `field.clientHeight`.
La propriété CSS `top` fait référence au bord supérieur de la balle.
Elle doit donc aller de `0` à `field.clientHeight - ball.clientHeight`, c'est-à-dire la position finale la plus basse du bord supérieur de la balle.

Pour obtenir l'effet de "rebond", nous pouvons utiliser la fonction de timing `bounce` en mode `easeOut`.

Voici le code final de l'animation :

```js
let to = field.clientHeight - ball.clientHeight;

animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw(progress) {
    ball.style.top = to * progress + 'px'
  }
});
```
