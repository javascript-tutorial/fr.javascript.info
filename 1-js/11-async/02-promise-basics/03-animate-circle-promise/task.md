
# Animer un cercle avec une promesse

Ré-écrivez la fonction `showCircle` dans la solution de la tâche <info:task/animate-circle-callback> pour qu'elle renvoie une promesse au lieu d'une fonction de retour.

La nouvelle utilisation :

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

Prenez la solution de la tâche <info:task/animate-circle-callback> comme base.
