Bien sûr, ça fonctionne, pas de problème.

Le `const` ne protège que la variable elle-même du changement.

En d'autres termes, `user` stocke une référence à l'objet.
Et cela ne peut pas être changé.
Mais le contenu de l'objet peut.

```js run
const user = {
  name: "John"
};

*!*
// fonctionne
user.name = "Pete";
*/!*

// erreur
user = 123;
```