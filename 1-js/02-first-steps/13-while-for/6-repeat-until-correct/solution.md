
```js run demo
let num;

do {
  num = prompt("Enter a number greater than 100?", 0);
} while (num <= 100 && num);
```

La boucle `do..while` se répète tant que les deux vérifications sont vrai :

1. La vérification de `num <= 100` - c’est-à-dire que la valeur entrée n’est toujours pas supérieure à `100`.
2. La vérification que `&& num` est `false` lorsque `num` est `null` ou une chaîne vide. Ensuite, la boucle `while` s'arrête aussi.

P.S. Si `num` est `null`, alors `num <= 100` est `true`. Par conséquent, sans la seconde vérification, la boucle ne s’arrêterait pas si l’utilisateur cliquait sur CANCEL. Les deux vérifications sont obligatoires.
