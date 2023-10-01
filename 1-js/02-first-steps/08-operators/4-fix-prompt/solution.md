La raison est que le prompt renvoie l'entrée utilisateur sous forme de chaîne de caractères.

Les variables ont donc respectivement les valeurs `"1"` et `"2"`.

```js run
let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);

alert(a + b); // 12
```

Nous devons convertir les chaînes de caractères en nombres avant l'opérateur `+`. Par exemple, en utilisant `Number()` ou en les préfixant avec `+`.

Par exemple, juste avant `prompt` :

```js run
let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);

alert(a + b); // 3
```

Ou dans l'`alert` :

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(+a + +b); // 3
```

Nous utilisons à la fois l'opérateur unaire (en guise de convertisseur explicite) et binaire `+` dans le dernier code. Ça a l'air drôle, non ?