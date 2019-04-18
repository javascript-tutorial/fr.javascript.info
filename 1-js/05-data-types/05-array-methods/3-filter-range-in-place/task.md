importance: 4

---

# Filter range "in place"

Ecrivez une fonction `filterRangeInPlace(arr, a, b)` qui obtient un tableau `arr` et en supprime toutes les valeurs, sauf celles comprises entre `a` et `b`. Le test est: `a ≤ arr[i] ≤ b`.

La fonction doit juste modifier que le tableau. Elle ne doit rien retourner.

Par exemple:
```js
let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // supprime les nombres qui ne sont pas entre 1 et 4

alert( arr ); // [3, 1]
```
