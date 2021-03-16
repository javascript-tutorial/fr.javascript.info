La différence devient évidente quand on regarde le code dans une fonction.

<<<<<<< HEAD
Le comportement est différent s'il y a un "saut" en dehors de `try..catch`.

Par exemple, quand il y a un `return` dans `try..catch`. La clause `finally` fonctionne en cas de *toute* sortie de` try..catch`, même via l'instruction `return`: juste après la fin de `try..catch`, mais avant que le code appelant obtienne le contrôle.
=======
The behavior is different if there's a "jump out" of `try...catch`.

For instance, when there's a `return` inside `try...catch`. The `finally` clause works in case of *any* exit from `try...catch`, even via the `return` statement: right after `try...catch` is done, but before the calling code gets the control.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

```js run
function f() {
  try {
    alert('start');
*!*
    return "result";
*/!*
  } catch (err) {
    /// ...
  } finally {
    alert('cleanup!');
  }
}

f(); // cleanup!
```

...Ou quand il y a un `throw`, comme ici:

```js run
function f() {
  try {
    alert('start');
    throw new Error("an error");
  } catch (err) {
    // ...
    if("can't handle the error") {
*!*
      throw err;
*/!*
    }

  } finally {
    alert('cleanup!')
  }
}

f(); // cleanup!
```

C'est `finally` qui garantit le nettoyage ici. Si nous mettons simplement le code à la fin de `f`, il ne fonctionnerait pas dans ces situations.
