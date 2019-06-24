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

<<<<<<< HEAD
C’est parce que les règles qui définissent `this` ne prennent pas en compte les littéraux d’objet.

Ici, la valeur de this à l'intérieur de `makeUser()` est `undefined`, car elle est appelée en tant que fonction et non en tant que méthode.

Et l'objet littéral lui-même n'a aucun effet sur `this`. La valeur de `this` est un pour toute la fonction, les blocs de code et les littéraux d'objet ne l'affectent pas.
=======
That's because rules that set `this` do not look at object definition. Only the moment of call matters.

Here the value of `this` inside `makeUser()` is `undefined`, because it is called as a function, not as a method with "dot" syntax.

The value of `this` is one for the whole function, code blocks and object literals do not affect it.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

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

<<<<<<< HEAD
Maintenant cela fonctionne car `user.ref()` est une méthode. Et la valeur de `this` est définie sur l'objet avant le point `.`.


=======
Now it works, because `user.ref()` is a method. And the value of `this` is set to the object before dot `.`.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
