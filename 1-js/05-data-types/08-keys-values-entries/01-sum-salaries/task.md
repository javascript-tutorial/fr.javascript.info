importance: 5

---

# Additionner les propriétés

Il existe un objet `salaries` object avec un nombre arbitraire de salaires.

Ecrivez la fonction  `sumSalaries(salaries)` qui retourne la somme des salaires en utilisant `Object.values` et la boucle `for..of`.

Si `salaries` est vide, le résultat doit être `0`.

Par exemple:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```

