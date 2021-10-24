# Utiliser une récursion

La logique récursive est un peu délicate ici.

Nous devons d'abord afficher le reste de la liste et *ensuite* afficher l'actuel:

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

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

# En utilisant une boucle

<<<<<<< HEAD
La variante de boucle est aussi un peu plus compliquée que la sortie directe.
=======
The loop variant is also a little bit more complicated than the direct output.
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef

Il n'y a aucun moyen d'obtenir la dernière valeur de notre `list`. Nous ne pouvons pas non plus "revenir en arrière".

Nous pouvons donc commencer par parcourir les éléments dans l'ordre direct et les mémoriser dans un tableau, puis afficher ce que nous nous sommes rappelés dans l'ordre inverse:

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

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

Veuillez noter que la solution récursive fait exactement la même chose: elle suit la liste, mémorise les éléments de la chaîne d'appels imbriqués (dans la pile de contexte d'exécution), puis les affiches.
