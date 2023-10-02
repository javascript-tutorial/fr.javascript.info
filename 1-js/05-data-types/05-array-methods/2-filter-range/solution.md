```js run demo
function filterRange(arr, a, b) {
  // ajout de crochets autour de l'expression pour une meilleure lisibilité
  return arr.filter(item => (a <= item && item <= b));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert(filtered); // 3,1 (valeur correspondate)

alert(arr); // 5,3,8,1 (non modifié)
```
