importance: 3

---

# Mélanger un tableau

Ecrivez la fonction `shuffle(array)` qui mélange les éléments (de manière aléatoire) du tableau.

Les exécutions multiples de `shuffle` peuvent conduire à différents ordres d'éléments. Par exemple:

```js
let arr = [1, 2, 3];

shuffle(arr);
// arr = [3, 2, 1]

shuffle(arr);
// arr = [2, 1, 3]

shuffle(arr);
// arr = [3, 1, 2]
// ...
```

Tous les ordres d'éléments doivent avoir une probabilité égale. Par exemple, `[1,2,3]` peut être réorganisé comme `[1,2,3]` ou `[1,3,2]` ou `[3,1,2]` etc., avec une probabilité égale de chaque cas.
