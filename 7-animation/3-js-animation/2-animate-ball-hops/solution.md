Dans la tâche <info:task/animate-ball>, nous n'avions qu'une seule propriété à animer. Maintenant, nous avons besoin d'une supplémentaire : `elem.style.left`.

La coordonnée horizontale change selon une autre loi : elle ne "rebondit" pas, mais augmente progressivement en déplaçant la balle vers la droite.

Nous pouvons écrire un autre `animate` pour elle.

Comme fonction de temporisation, nous pourrions utiliser `linear`, mais quelque chose comme `makeEaseOut(quad)` semble bien mieux.

Le code :

```js
let height = field.clientHeight - ball.clientHeight;
let width = 100;

// animer top (rebondissement)
animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw: function(progress) {
    ball.style.top = height * progress + 'px'
  }
});

// animer left (déplacement vers la droite)
animate({
  duration: 2000,
  timing: makeEaseOut(quad),
  draw: function(progress) {
    ball.style.left = width * progress + "px"
  }
});
```
