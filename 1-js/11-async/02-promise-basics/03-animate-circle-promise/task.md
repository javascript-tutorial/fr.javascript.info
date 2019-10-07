
# Cercle animé avec une promesse

Réécrivez la fonction `showCircle` dans la solution de la tâche <info:task/animate-circle-callback> afin qu'elle retourne une promesse au lieu d'accepter un rappel.

La nouvelle utilisation:

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

Prenez la solution de la tâche <info:task/animate-circle-callback> comme base.
