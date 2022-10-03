Nous ne pouvons pas "remplacer" le premier caractère, car les chaînes de caractères en JavaScript sont immuables.

Mais nous pouvons créer une nouvelle chaîne de caractères basée sur celle existante, avec le premier caractère majuscule :

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

Il y a un petit problème cependant. Si `str` est vide, alors `str[0]` est `undefined`, et comme `undefined` n’a pas la méthode `toUpperCase()`, nous aurons une erreur.

<<<<<<< HEAD
Il y a deux variantes ici ;;

1. Utiliser `str.charAt(0)`, comme il retourne toujours une chaîne de caractères (peut-être vide).
2. Ajouter un test pour une chaîne de caractères vide.

Voici la deuxième variante :
=======
The easiest way out is to add a test for an empty string, like this:
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```
