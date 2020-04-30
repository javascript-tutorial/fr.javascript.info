importance: 5

---

# Créer un arbre à partir de l'objet

Écrivez une fonction `createTree` qui crée une liste imbriquée `ul/li` à partir de l'objet imbriqué.

Par exemple :

```js
let data = {
  "Fish": {
    "trout": {},
    "salmon": {}
  },

  "Tree": {
    "Huge": {
      "sequoia": {},
      "oak": {}
    },
    "Flowering": {
      "apple tree": {},
      "magnolia": {}
    }
  }
};
```

La syntaxe :

```js
let container = document.getElementById('container');
*!*
createTree(container, data); // crée l'arbre dans le conteneur
*/!*
```

Le résultat (arbre) devrait ressembler à ceci :

[iframe border=1 src="build-tree-dom"]

Choisissez l'une des deux façons de résoudre cette tâche :

1. Créez le code HTML de l'arborescence, puis attribuez-le à `container.innerHTML`.
2. Créez des nœuds d'arbre et ajoutez-les avec les méthodes DOM.

Ce serait génial si vous pouviez faire les deux.

P.S. L'arbre ne doit pas avoir d'éléments "supplémentaires" comme des `<ul></ul>` vides pour les feuilles (de l'arbre).
