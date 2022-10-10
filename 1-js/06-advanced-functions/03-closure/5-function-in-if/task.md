importance: 5

<<<<<<< HEAD
# Fonction dans if
=======
---
# Function in if
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

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
