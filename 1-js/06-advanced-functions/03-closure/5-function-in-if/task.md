
# Fonction dans if

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
