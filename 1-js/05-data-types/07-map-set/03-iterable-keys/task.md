importance: 5

---

# Clés Iterables

Nous voulons obtenir un tableau de `map.keys()` dans une variable puis lui appliquer des méthodes spécifiques aux tableaux, par ex: `push`.

Mais cela ne fonctionne pas :

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
