```js run demo
function sumSalaries(salaries) {

  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }

  return sum; // 650
}

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```
Ou, éventuellement, nous pourrions aussi obtenir la somme en utilisant `Object.values` et `reduce`:

```js
// boucles de reduce sur les salaires,
// en les additionnant
// et retourne le résultat
function sumSalaries(salaries) {
  return Object.values(salaries).reduce((a, b) => a + b, 0) // 650
}
```
