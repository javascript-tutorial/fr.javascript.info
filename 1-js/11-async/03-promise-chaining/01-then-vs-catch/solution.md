La réponse courte est : **non, ils ne sont pas égaux**:

La différence est que si une erreur survient dans `f1`, elle est gérée par` .catch` ici:

```js run
promise
  .then(f1)
  .catch(f2);
```

...Mais pas ici:

```js run
promise
  .then(f1, f2);
```

En effet, une erreur est transmise dans la chaîne et, dans le second code, il n'y a pas de chaîne à la suite de `f1`.

En d'autres termes, `.then` transmet les résultats/erreurs au prochain `.then/catch`. Donc, dans le premier exemple, il y a un `catch` en dessous, et dans le second - il n'y en a pas, donc l'erreur n'est pas gérée.
