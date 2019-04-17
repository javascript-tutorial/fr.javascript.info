# La solution simple mais fausse

La solution la plus simple mais fausse serait de générer une valeur de `min` à `max` et de l'arrondir:

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

La fonction marche, mais elle est incorrecte. La probabilité d'obtenir les valeurs `min` et `max` est deux fois inférieure à toute autre.

Si vous exécutez l'exemple ci-dessous plusieurs fois, vous verrez facilement que `2` apparaît le plus souvent.

Cela se produit car `Math.round()` obtient des nombres aléatoires à partir de l'intervalle `1..3` et les arrondit comme ici:

```js no-beautify
values from 1    ... to 1.4999999999  devient 1
values from 1.5  ... to 2.4999999999  devient 2
values from 2.5  ... to 2.9999999999  devient 3
```

Maintenant, nous pouvons clairement voir que `1` obtient deux fois moins de valeurs que `2`. Et la même chose avec `3`.

# La bonne solution

il existe de nombreuses solutions correctes à la tâche. L'une d'elles consiste à ajuster les limites d'intervalle. Pour garantir les mêmes intervalles, nous pouvons générer des valeurs comprises entre `0.5` et `3.5`, ajoutant ainsi les probabilités requises:

```js run
*!*
function randomInteger(min, max) {
  // maintenant rand est entre (min-0.5) et (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Une autre solution pourrait être d'utiliser `Math.floor` pour un nombre aléatoie compris entre `min` et `max+1`.

```js run
*!*
function randomInteger(min, max) {
  // ici rand est de min à (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Maintenant,tous les intervalles sont mappés de cette façon:

```js no-beautify
values from 1  ... to 1.9999999999  devient 1
values from 2  ... to 2.9999999999  devient 2
values from 3  ... to 3.9999999999  devient 3
```

Tous les intervalles ont la même longueur, rendant la distribution finale uniforme.
