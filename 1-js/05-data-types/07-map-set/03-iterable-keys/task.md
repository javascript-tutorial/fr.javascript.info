importance: 5

---

# Clés Iterables

<<<<<<< HEAD
Nous voulons obtenir un tableau de `map.keys()` dans une variable puis lui appliquer des méthodes spécifiques aux tableaux, par ex: `push`.
=======
We'd like to get an array of `map.keys()` in a variable and then apply array-specific methods to it, e.g. `.push`.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

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
