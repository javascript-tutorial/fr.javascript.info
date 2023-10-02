importance: 5

---

# Les compteurs sont-ils indépendants ?

Ici, nous faisons deux compteurs : `counter` et `counter2` en utilisant la même fonction `makeCounter`.

Sont-ils indépendants ? Que va montrer le deuxième compteur ? `0,1` ou `2,3` ou autre chose ?

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert(counter()); // 0
alert(counter()); // 1

*!*
alert(counter2()); // ?
alert(counter2()); // ?
*/!*
```

