# Solution basée sur la boucle

La variante de la solution basée sur la boucle:

```js run
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

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }

}

printList(list);
```

Veuillez noter que nous utilisons une variable temporaire `tmp` pour parcourir la liste. Techniquement, nous pourrions utiliser un paramètre de fonction `list` à la place:

```js
function printList(list) {

  while(*!*list*/!*) {
    alert(list.value);
    list = list.next;
  }

}
```

...Mais ce ne serait pas sage. Dans le futur, nous allons peut-être devoir étendre une fonction, faire autre chose avec la liste. Si nous changeons `list`, alors nous perdons cette capacité.

Parlant des bons noms de variables, `list` est la liste elle-même. Le premier élément de celui-ci. Et ça devrait rester comme ça. C'est clair et fiable.

De l’autre côté, le rôle de `tmp` est exclusivement une liste de traversée, comme `i` dans la boucle `for`.

# Solution récursive

La variante récursive de `printList(list)` suit une logique simple: pour afficher une liste, il faut afficher l'élément courant `list`, puis faire de même pour `list.next`:

```js run
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

function printList(list) {

  alert(list.value); // affiche l'élément en cours

  if (list.next) {
    printList(list.next); // fait la même chose pour le reste de la liste
  }

}

printList(list);
```

Maintenant qu'est-ce qui est le mieux?

Techniquement, la boucle est plus efficace. Ces deux variantes font la même chose, mais la boucle ne dépense pas de ressources pour les appels de fonction imbriqués.

De l'autre côté, la variante récursive est plus courte et parfois plus facile à comprendre.
