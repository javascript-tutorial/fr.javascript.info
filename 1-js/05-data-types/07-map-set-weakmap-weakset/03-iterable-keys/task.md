importance: 5

---

# Clés Iterables

Nous voulons obtenir un tableau de `map.keys()` et continuer à l'utiliser (en dehors du map lui même).

Mais il y a un problème :

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
