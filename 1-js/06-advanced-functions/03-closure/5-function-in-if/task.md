importance: 5

<<<<<<< HEAD
# Fonction dans if
=======
---
# Function in if
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

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
