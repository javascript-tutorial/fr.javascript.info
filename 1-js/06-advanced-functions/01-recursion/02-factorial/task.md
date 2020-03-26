importance: 4

---

# Calcule factoriel

Le [factorielle](https://en.wikipedia.org/wiki/Factorial) d'un nombre naturel est multiplié par `"nombre moins un"`, ensuite par `"nombre moins deux"`, et ainsi de suite jusqu'à `1`. La factorielle de `n` est noté comme `n!`

Nous pouvons écrire une définition de factorielle comme ceci:

```js
n! = n * (n - 1) * (n - 2) * ...*1
```

Valeurs des factorielles pour des `n` différents:

```js
1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120
```

La tâche est d'écrire une fonction `factorial(n)` qui calcule `n!` en utilisant des appels récursifs.

```js
alert( factorial(5) ); // 120
```

P.S. Indice: `n!` peut être écrit `n * (n-1)!` Par exemple: `3! = 3*2! = 3*2*1! = 6`
