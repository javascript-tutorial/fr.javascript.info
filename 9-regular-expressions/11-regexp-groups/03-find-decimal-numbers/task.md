# Trouvez tous les nombres

Écrire un regexp qui cherche tous les nombres décimaux, comprenant les entiers, les nombres décimaux avec le point comme séparateur et les nombres négatifs.

Un exemple d'utilisation :

```js
let regexp = /your regexp/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) ); // -1.5, 0, 2, -123.4
```
