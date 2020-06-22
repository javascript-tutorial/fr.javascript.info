<<<<<<< HEAD
La raison en est que l'invite renvoie l'entrée utilisateur sous forme de chaîne.

Les variables ont donc respectivement les valeurs `"1"` et `"2"`.
=======
The reason is that prompt returns user input as a string.

So variables have values `"1"` and `"2"` respectively.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js run
let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);

alert(a + b); // 12
```

<<<<<<< HEAD
Ce que nous devons faire est de convertir les chaînes en nombres avant `+`. Par exemple, en utilisant `Number ()` ou en les ajoutant au début avec `+`.

Par exemple, juste avant `prompt`:
=======
What we should to is to convert strings to numbers before `+`. For example, using `Number()` or prepending them with `+`.

For example, right before `prompt`:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js run
let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);

alert(a + b); // 3
```

<<<<<<< HEAD
Ou dans l'`alert`:
=======
Or in the `alert`:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(+a + +b); // 3
```

<<<<<<< HEAD
Nous utilisons à la fois unaire et binaire `+` dans le dernier code. Ça a l'air drôle, non?
=======
Using both unary and binary `+` in the latest code. Looks funny, doesn't it?
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
