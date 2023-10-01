
C’est parce que `map.keys()` retourne un itérable, mais pas un tableau.

Nous pouvons le convertir en tableau en utilisant `Array.from` :

```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
