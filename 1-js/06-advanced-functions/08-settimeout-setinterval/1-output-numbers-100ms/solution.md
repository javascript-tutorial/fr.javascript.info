
Avec `setInterval`:

```js run
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// usage:
printNumbers(5, 10);
```

<<<<<<< HEAD
Avec `setTimeout` de façon récursive :
=======
Using nested `setTimeout`:
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1


```js run
function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// utilisation :
printNumbers(5, 10);
```

Notons que, dans les deux solutions, il y a un délai initial avant le premier résultat. En effet, la fonction est appelée pour la première fois au bout de `1000ms`.

Afin d'exécuter la fonction immédiatement, on peut ajouter un autre appel avant `setInterval`.

```js run
function printNumbers(from, to) {
  let current = from;

  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }

*!*
  go();
*/!*
  let timerId = setInterval(go, 1000);
}

printNumbers(5, 10);
```
