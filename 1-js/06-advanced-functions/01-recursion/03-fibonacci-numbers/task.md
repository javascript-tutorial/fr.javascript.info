importance: 5

---

# Numéros de Fibonacci

La séquence des [Numéros de Fibonacci](https://fr.wikipedia.org/wiki/Nombre_de_Fibonacci) a la formule <code>F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub></code>. En d'autres termes, le nombre suivant est la somme des deux précédents.

Les deux premiers chiffres sont `1`, puis `2(1+1)`, ensuite `3(1+2)`, `5(2+3)` etc: `1, 1, 2, 3, 5, 8, 13, 21...`.

Les nombres de Fibonacci sont liés au [nombre d'or](https://fr.wikipedia.org/wiki/Nombre_d%27or) et de nombreux phénomènes naturels autour de nous.

Écrire une fonction `fib(n)` qui retourne le Numéro de Fibonacci `n-th`.

Un exemple de travail:

```js
function fib(n) { /* votre code */ }

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757
```

P.S. La fonction devrait être rapide. L'appel de `fib(77)` devrait prendre pas plus d'une fraction de seconde.
