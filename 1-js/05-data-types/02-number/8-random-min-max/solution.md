Nous devons "mapper" toutes les valeurs de l'intervalle 0...1 en valeurs de `min` à `max`.

Cela peut être fait en deux étapes:

1. Si nous multiplions un nombre aléatoire de 0... 1 par `max-min`, l'intervalle des valeurs possible augmente de `0..1` à `0..max-min`.
2. Maintenant, si nous ajoutons `min`, l'intervalle possible devient de `min` à `max`.

La fonction:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

