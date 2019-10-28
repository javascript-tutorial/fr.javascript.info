importance: 5

---

# instanceof étrange

<<<<<<< HEAD
Pourquoi `instanceof` ci-dessous renvoie `true`? Nous pouvons facilement voir que `a` n'est pas créé par `B()`.
=======
In the code below, why does `instanceof` return `true`? We can easily see that `a` is not created by `B()`.
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
