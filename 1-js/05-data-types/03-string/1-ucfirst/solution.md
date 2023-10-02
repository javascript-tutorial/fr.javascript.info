Nous ne pouvons pas "remplacer" le premier caractère, car les chaînes de caractères en JavaScript sont immuables.

Mais nous pouvons créer une nouvelle chaîne de caractères basée sur celle existante, avec le premier caractère majuscule :

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

Il y a un petit problème cependant.
Si `str` est vide, alors `str[0]` est `undefined`, et comme `undefined` n’a pas la méthode `toUpperCase()`, nous aurons une erreur.

La solution la plus simple consiste à ajouter un test pour une chaîne vide, comme ceci :

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert(ucFirst("john")); // John
```
