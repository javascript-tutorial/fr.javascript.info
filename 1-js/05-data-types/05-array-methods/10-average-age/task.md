importance: 4

---

# Obtenir l'âge moyen

Ecrivez la fonction `getAverageAge(users)` qui obtient un tableau d'objets avec la propriété `age` et qui ensuite obtient la moyenne.

La formule pour la moyenne est `(age1 + age2 + ... + ageN) / N`.

Par exemple:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
```

