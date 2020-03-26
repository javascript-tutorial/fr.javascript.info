importance: 5

---

# Produire une liste de simple lien

Disons que nous avons une liste de simple lien (comme décrit dans le chapitre <info:recursion>):

```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
```

Écrire une fonction `printList(list)` qui sort les éléments de la liste un par un.

Faites deux variantes de la solution: en utilisant une boucle et en utilisant la récursion.

Qu'est-ce qui est le mieux: Avec ou sans récursion ?
