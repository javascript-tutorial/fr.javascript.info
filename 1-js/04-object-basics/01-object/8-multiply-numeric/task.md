importance: 3

---

<<<<<<< HEAD
# Multipliez les propriétés numériques par 2

Créez une fonction `multiplyNumeric(obj)` qui multiplie toutes les propriétés numériques de `obj` par `2`.
=======
# Multiply numeric property values by 2

Create a function `multiplyNumeric(obj)` that multiplies all numeric property values of `obj` by `2`.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

Par exemple :

```js
// before the call
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// after the call
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
```

Veuillez noter que `multiplyNumeric` n’a pas besoin de retourner quoi que ce soit. Il devrait modifier l'objet en place.

P.S. Utilisez `typeof` pour rechercher un `number` ici.


