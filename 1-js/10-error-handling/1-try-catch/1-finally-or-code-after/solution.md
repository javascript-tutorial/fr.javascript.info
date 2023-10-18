La différence devient évidente quand on regarde le code dans une fonction.

Le comportement est différent s'il y a un "saut en dehors" de `try..catch`.

Par exemple, quand il y a un `return` dans `try..catch`. La clause `finally` fonctionne en cas de *toute* sortie de `try..catch`, même via l'instruction `return` : juste après la fin de `try..catch`, mais avant que le code appelant obtienne le contrôle.

```js run
function f() {
  try {
    alert('start');
*!*
    return "result";
*/!*
  } catch (err) {
    // ...
  } finally {
    alert('cleanup!');
  }
}

f(); // cleanup!
```

...Ou quand il y a un `throw`, comme ici :

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
