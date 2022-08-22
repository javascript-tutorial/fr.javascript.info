importance: 5

<<<<<<< HEAD
# Fonction dans if
=======
---
# Function in if
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

Regardez ce code. Quel sera le résultat de l'appel à la dernière ligne ?

```js run
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```
