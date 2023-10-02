Par définition, une factorielle est `n!` peut être écrit `n * (n-1)!`.

En d'autres termes, le résultat de `factorial(n)` peut être calculé comme `n` multiplié par le résultat de `factorial(n-1)`. Et l'appel de `n-1` peut récursivement descendre plus bas, et plus bas, jusqu'à `1`.

```js run
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert(factorial(5)); // 120
```

La base de la récursivité est la valeur `1`. Nous pouvons aussi faire de `0` la base ici, ça importe peu, mais donne une étape récursive supplémentaire:

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert(factorial(5)); // 120
```
