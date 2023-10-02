La solution utilisant une boucle:

```js run
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert(sumTo(100));
```

La solution utilisant la récursion:

```js run
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert(sumTo(100));
```

La solution utilisant la formule: `sumTo(n) = n*(n+1)/2`:

```js run
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert(sumTo(100));
```

P.S. Naturellement, la formule est la solution la plus rapide. Elle n’utilise que 3 opérations pour n’importe quel nombre `n`. Le calcul aide!

La variante de boucle est la seconde en termes de vitesse. Dans la variante récursive et la variante de boucle, nous additionnons les mêmes nombres. Mais la récursion implique des appels imbriqués et la gestion de la pile d'exécution. Donc, cela prend des ressources, donc c'est plus lent.

P.P.S. Certains moteurs prennent en charge l'optimisation "tail call" (dernier appel) : si un appel récursif est le tout dernier dans la fonction, sans autres calculs effectués, alors la fonction externe n'aura pas besoin de reprendre l'exécution, donc le moteur n'a pas besoin de se souvenir son contexte d'exécution. Cela supprime le fardeau de la mémoire. Mais si le moteur JavaScript ne prend pas en charge l'optimisation des appels de queue (la plupart d'entre eux ne le font pas), il y aura une erreur : taille maximale de la pile dépassée, car il y a généralement une limitation sur la taille totale de la pile.
