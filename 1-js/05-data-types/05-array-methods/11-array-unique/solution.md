Parcourons les éléments du tableau:
- Pour chaque élément, nous vérifierons si le tableau résultant contient déjà cet élément.
- S'il en est ainsi, alors ignorez-le, sinon ajoutez aux résultats.

```js run
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert(unique(strings)); // Hare, Krishna, :-O
```

Le code fonctionne, mais il comporte un problème de performances potentiel.

La méthode `result.includes(str)` parcourt en interne le tableau `result` et compare chaque élément à `str` pour trouver la correspondance.

Donc, s'il y a `100` éléments dans` result` et que personne ne correspond à `str`, alors il parcourra tout le `result` et fera exactement les `100` comparaisons.
Et si `result` est grand, exemple `10000`, alors il y aura des `10000` comparaisons .

Ce n'est pas un problème en soi, parce que les moteurs JavaScript sont très rapides, alors parcourir un tableau de `10000` éléments  est une question de microsecondes.

Mais nous faisons ce test pour chaque élément de `arr`, dans la boucle` for`.

Donc, si `arr.length` vaut `10000`, nous aurons quelque chose comme `10000*10000` = 100 millions de comparaisons.
C'est beaucoup.

La solution n’est donc valable que pour les petits tableaux.

Plus loin dans le chapitre <info:map-set>, nous verrons comment l'optimiser.
