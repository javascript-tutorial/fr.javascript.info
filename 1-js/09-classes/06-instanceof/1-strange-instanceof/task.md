importance: 5

---

# instanceof étrange

Pourquoi `instanceof` ci-dessous renvoie `true`? Nous pouvons facilement voir que `a` n'est pas créé par `B()`.

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
