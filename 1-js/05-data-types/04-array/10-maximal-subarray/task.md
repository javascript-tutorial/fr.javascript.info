importance: 2

---

# Un sous-tableau maximal

L'entrée est un tableau de nombres, par exemple `arr = [1, -2, 3, 4, -9, 6]`.

La tâche est la suivante : trouver le sous-tableau contigu de `arr` avec la somme maximale des items.

Écrire la fonction `getMaxSubSum(arr)` qui retournera cette somme.

Par exemple :

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) == 5 (la somme des éléments en surbrillance)
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) == 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) == 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) == 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) == 100
getMaxSubSum([*!*1, 2, 3*/!*]) == 6 (prend tout)
```

Si tous les éléments sont négatifs, cela signifie que nous n'en prenons aucun (le sous-tableau est vide), la somme est donc zéro :

```js
getMaxSubSum([-1, -2, -3]) = 0
```

S'il vous plaît essayez de penser à une solution rapide : [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation) ou même à O(n) si vous le pouvez.
