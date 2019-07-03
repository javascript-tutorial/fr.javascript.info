Nous ne pouvons pas "remplacer" le premier caractère, car les chaînes de caractères en JavaScript sont immuables.

Mais nous pouvons créer une nouvelle chaîne de caractères basée sur celle existante, avec le premier caractère majuscule :

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

<<<<<<< HEAD
Il y a un petit problème cependant. Si `str` est vide, alors `str[0]` est indéfini, nous allons donc avoir une erreur.
=======
There's a small problem though. If `str` is empty, then `str[0]` is `undefined`, and as `undefined` doesn't have the `toUpperCase()` method, we'll get an error.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Il y a deux variantes ici ;;

1. Utiliser `str.charAt(0)`, comme il retourne toujours une chaîne de caractères (peut-être vide).
2. Ajouter un test pour une chaîne de caractères vide.

Voici la deuxième variante :

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```

