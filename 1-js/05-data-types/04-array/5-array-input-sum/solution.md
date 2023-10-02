Veuillez noter le détail subtile mais important de la solution. Nous ne convertissons pas instantanément `value` en nombre après le `prompt`, parce qu'après `value = +value` nous ne pourrions pas distinguer une chaîne vide (signe d’arrêt) du zéro (nombre valide). Nous le faisons plus tard à la place.

```js run demo
function sumInput() {

  let numbers = [];

  while (true) {

    let value = prompt("A number please?", 0);

    // devrions-nous annuler ?
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert(sumInput());
```
