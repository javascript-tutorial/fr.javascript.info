importance: 5

---

# Clés Iterables

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/03-iterable-keys/task.md
Nous voulons obtenir un tableau de `map.keys()` et continuer à l'utiliser (en dehors du map lui même).

Mais il y a un problème :
=======
We'd like to get an array of `map.keys()` in a variable and then do apply array-specific methods to it, e.g. `.push`.

But that doesn't work:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3:1-js/05-data-types/07-map-set/03-iterable-keys/task.md

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Error: keys.push is not a function
keys.push("more");
*/!*
```

Pourquoi ? Comment pouvons-nous corriger le code pour que `keys.push` fonctionne ?
