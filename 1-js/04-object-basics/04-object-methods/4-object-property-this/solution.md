**Réponse : une erreur.**

Essayez le :
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // Erreur: Impossible de lire la propriété 'nom' de undefined
```

C’est parce que les règles qui définissent `this` ne prennent pas en compte les littéraux d’objet.

Ici, la valeur de this à l'intérieur de `makeUser()` est `undefined`, car elle est appelée en tant que fonction et non en tant que méthode.

Et l'objet littéral lui-même n'a aucun effet sur `this`. La valeur de `this` est un pour toute la fonction, les blocs de code et les littéraux d'objet ne l'affectent pas.

Donc `ref: this` prend actuellement le `this` courant de la fonction.

Voici le cas contraire :

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
};

let user = makeUser();

alert( user.ref().name ); // John
```

Maintenant cela fonctionne car `user.ref()` est une méthode. Et la valeur de `this` est définie sur l'objet avant le point `.`.


