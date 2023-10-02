Nous pouvons utiliser `slice()` pour faire une copie et exécuter le tri sur celle-ci :

```js run
function copySorted(arr) {
  return arr.slice().sort();
}

let arr = ["HTML", "JavaScript", "CSS"];

*!*
let sorted = copySorted(arr);
*/!*

alert(sorted);
alert(arr);
```
