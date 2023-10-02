importance: 5

---

# Filtrer les membres uniques du tableau

Disons que `arr` est un tableau.

Créez une fonction `unique(arr)` qui devrait renvoyer un tableau avec les éléments uniques d'arr.

Par exemple :

```js
function unique(arr) {
  /* your code */
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert(unique(values)); // Hare, Krishna, :-O
```

P.S. Ici, les chaînes de caractères sont utilisées, mais elles peuvent être des valeurs de n'importe quel type.

P.P.S. Utilisez `Set` pour stocker des valeurs uniques.
