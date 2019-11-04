<<<<<<< HEAD
La réponse courte est: **non, ils ne sont pas égaux**:
=======
The short answer is: **no, they are not equal**:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

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

<<<<<<< HEAD
En d'autres termes, `.then` transmet les résultats/erreurs au prochain `.then/catch`. Donc, dans le premier exemple, il y a un `catch` en dessous, et dans le second - il n'y en a pas, donc l'erreur n'est pas gérée.
=======
In other words, `.then` passes results/errors to the next `.then/catch`. So in the first example, there's a `catch` below, and in the second one there isn't, so the error is unhandled.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b
