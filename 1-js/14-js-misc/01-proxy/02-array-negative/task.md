
# Accès au tableau [-1]

Dans certains langages de programmation, nous pouvons accéder aux éléments du tableau à l'aide d'index négatifs, comptés à partir de la fin.

comme ça:

```js
let array = [1, 2, 3];

array[-1]; // 3, le premier élément en partant de la fin
array[-2]; // 2, le second élément en partant de la fin
array[-3]; // 1, le troisième élément en partant de la fin
```

En d'autres termes, `array[-N]` est identique à `array[array.length - N]`.

Créez un proxy pour implémenter ce comportement.

Voilà comment cela devrait fonctionner:

```js
let array = [1, 2, 3];

array = new Proxy(array, {
  /* your code */
});

alert(array[-1]); // 3
alert(array[-2]); // 2

// Les autres fonctionnalités de array doivent être conservées
```
