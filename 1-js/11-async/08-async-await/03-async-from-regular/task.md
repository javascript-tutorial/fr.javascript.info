
# Appeler l'asynchrone à partir du non-asynchrone

Nous avons une fonction "normale" appelée `f`.
Comment pouvez-vous appeler la fonction `async` `wait()` et utiliser son résultat à l'intérieur de `f` ?

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...que devez-vous écrire ici?
  // nous devons appeler async wait() et attendre pour obtenir 10
  // Souvenez-vous, on ne peut pas utiliser "await".
}
```

P.S.
La tâche est techniquement très simple, mais la question est assez courante pour les développeurs novices en matière d'async/await.
