Un nombre positif avec une éventuelle partie décimale correspond à : `pattern:\d+(\.\d+)?`.

Ajoutons-y l'option `pattern:-` au début :

```js run
let regexp = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) );   // -1.5, 0, 2, -123.4
```
