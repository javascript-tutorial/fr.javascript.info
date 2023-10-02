# Trouver des nombres entiers non négatifs

Il y a une chaîne de nombres entiers.

Créez une expression régulière qui ne recherche que les expressions non négatives (zéro est autorisé).

Un exemple d'utilisation :
```js
let regexp = /your regexp/g;

let str = "0 12 -5 123 -18";

alert(str.match(regexp)); // 0, 12, 123
```
