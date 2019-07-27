importance: 5

---

# Additionner tous les nombres jusqu'à celui donné

Écrire une fonction `sumTo(n)` qui calcule la somme des nombres `1 + 2 + ... + n`.

Par exemple:

```js no-beautify
sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
```

Faites 3 variantes de solution:

1. Utiliser une boucle for.
2. Utiliser une récursion, avec `sumTo(n) = n + sumTo(n-1)` pour `n > 1`.
3. Utiliser la formule de [progression arithmétique](https://en.wikipedia.org/wiki/Arithmetic_progression).

Un exemple de résultat:

```js
function sumTo(n) { /*... ton code ... */ }

alert( sumTo(100) ); // 5050
```

P.S. Quelle solution est la plus rapide? La plus lente? Pourquoi?

P.P.S. Peut-on utiliser la récursion pour compter `sumTo(100000)`? 
