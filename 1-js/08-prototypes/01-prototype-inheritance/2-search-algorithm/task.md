importance: 5

---

# Algorithme de recherche

La tâche comporte deux parties.

Étant donné les objets suivants :

```js
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
```

1.
Utilisez `__proto__` pour attribuer des prototypes de manière à ce que toute recherche de propriété suive le chemin:`pockets` -> `bed` -> `table` -> `head`.
Par exemple, `pocket.pen` devrait être `3` (trouvé dans `table`), et `bed.glasses` devrait être `1` (trouvé dans `head`).
2.
Répondez à la question: est-il plus rapide d’obtenir `glasses` en tant que `pockets.glasses` ou `head.glasses`? Analyse si nécessaire.
