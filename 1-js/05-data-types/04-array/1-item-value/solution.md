Le résultat est `4` :

```js run
let fruits = ["Apples", "Pear", "Orange"];

let shoppingCart = fruits;

shoppingCart.push("Banana");

*!*
alert(fruits.length); // 4
*/!*
```

C'est parce que les tableaux sont des objets.
Donc, shoppingCart et fruits sont les références du même tableau.
