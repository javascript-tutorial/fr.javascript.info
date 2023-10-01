La réponse est: **Non, cela n'arrivera pas:**:

```js run
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

Comme décrit dans le chapitre, il y a un "`try..catch` implicite" autour du code de la fonction. Toutes les erreurs synchrones sont donc traitées.

Mais ici, l'erreur n'est pas générée pendant l'exécution de l'exécuteur, mais plus tard. Donc la promesse ne peut pas tenir.
