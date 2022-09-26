importance: 5

<<<<<<< HEAD
# Fonction dans if
=======
---
# Function in if
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

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
