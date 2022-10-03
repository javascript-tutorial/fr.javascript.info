# Solution lente

Nous pouvons calculer tous les subsums possibles.

Le moyen le plus simple consiste à prendre chaque élément et à calculer les sommes de tous les sous-tableaux à partir de celui-ci.

Par exemple, pour `[-1, 2, 3, -9, 11]`:

```js no-beautify
// Commence à -1:
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// Commence à 2:
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// Commence à 3:
3
3 + (-9)
3 + (-9) + 11

// Commence à -9
-9
-9 + 11

// Commence à 11
11
```

Le code est en réalité une boucle imbriquée: la boucle externe recouvrant les éléments du tableau, et l'interne compte les sous-sommes commençant par l'élément en cours.

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // si on ne prend aucun élément, zéro sera retourné

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
```

La solution a une complexité temporelle de [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation). En d'autres termes, si nous augmentons la taille du tableau 2 fois, l'algorithme fonctionnera 4 fois plus longtemps.

<<<<<<< HEAD
Pour les grands tableaux (1000, 10000 ou plus), de tels algorithmes peuvent conduire à une grande lenteur.
=======
For big arrays (1000, 10000 or more items) such algorithms can lead to serious sluggishness.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

# Solution rapide

Parcourons le tableau et conservons la somme partielle actuelle des éléments dans la variable `s`. Si `s` devient négatif à un moment donné, assignez `s=0`. Le maximum de tous ces `s` sera la réponse.

Si la description est trop vague, veuillez voir le code, il est assez court:

```js run demo
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // pour chaque élément d'arr
    partialSum += item; // l'ajouter à partialSum
    maxSum = Math.max(maxSum, partialSum); // rappelle le maximum
    if (partialSum < 0) partialSum = 0; // zéro si négatif
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([-1, -2, -3]) ); // 0
```

L'algorithme nécessite exactement 1 passage de tableau, la complexité temporelle est donc O(n).

Vous pouvez trouver plus d'informations détaillées sur l'algorithme ici: [Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem). Si la raison de ce fonctionnement n’est pas encore évidente, tracez l’algorithme à partir des exemples ci-dessus et voyez comment il fonctionne.

<<<<<<< HEAD
=======
You can find more detailed information about the algorithm here: [Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem). If it's still not obvious why that works, then please trace the algorithm on the examples above, see how it works, that's better than any words.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e
