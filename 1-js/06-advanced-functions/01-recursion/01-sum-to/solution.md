La solution utilisant une boucle:

```js run
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(100) );
```

La solution utilisant la récursion:

```js run
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert( sumTo(100) );
```

La solution utilisant la formule: `sumTo(n) = n*(n+1)/2`:

```js run
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
```

P.S. Naturellement, la formule est la solution la plus rapide. Elle n’utilise que 3 opérations pour n’importe quel nombre `n`. Le calcul aide!

La variante de boucle est la seconde en termes de vitesse. Dans la variante récursive et la variante de boucle, nous additionnons les mêmes nombres. Mais la récursion implique des appels imbriqués et la gestion de la pile d'exécution. Donc, cela prend des ressources, donc c'est plus lent.

<<<<<<< HEAD
P.P.S. Certains moteurs prennent en charge l'optimisation du "tail call (dernier appel)": si un appel récursif est le dernier de la fonction (comme dans la somme ci-dessus), le moteur n'a pas besoin de reprendre son contexte d'exécution. Cela supprime la charge en mémoire, donc compter `sumTo (100000)` devient possible. Toutefois, si le moteur JavaScript ne prend pas en charge l'optimisation des appels en bout de ligne, il y aura une erreur: maximum stack size exceeded (la taille maximale de la pile est dépassée), car la taille totale de la pile est généralement limitée.
=======
P.P.S. Some engines support the "tail call" optimization: if a recursive call is the very last one in the function, with no other calculations performed, then the outer function will not need to resume the execution, so the engine doesn't need to remember its execution context. That removes the burden on memory. But if the JavaScript engine does not support tail call optimization (most of them don't), there will be an error: maximum stack size exceeded, because there's usually a limitation on the total stack size.
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4
