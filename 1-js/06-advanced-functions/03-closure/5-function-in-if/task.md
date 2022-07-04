importance: 5

<<<<<<< HEAD
# Fonction dans if
=======
---
# Function in if
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

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
