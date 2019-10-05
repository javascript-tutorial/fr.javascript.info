Il existe de nombreux algorithmes pour cette tâche.

Utilisons une boucle imbriquée :

```js
Pour chaque i dans l'intervalle {
  vérifier si i a un diviseur de 1..i
  si oui => la valeur n'est pas un nombre premier
  si non => la valeur est un nombre premier, affichez-le
}
```

Un code utilisant un label :

```js run
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // Pour chaque i...

  for (let j = 2; j < i; j++) { // cherche un diviseur ..
    if (i % j == 0) continue nextPrime; // pas un premier, on passe au prochain i
  }

  alert( i ); // un premier
}
```

<<<<<<< HEAD
Il y a beaucoup d’espace pour l’optimiser. Par exemple, nous pourrions rechercher les diviseurs de 2 à la racine carrée de i. Quoi qu’il en soit, si nous voulons être vraiment efficaces pour les grands intervalles, nous devons changer d’approche et nous baser sur des mathématiques avancées et des algorithmes complexes comme [Crible quadratique](https://fr.wikipedia.org/wiki/Crible_quadratique), [Crible algébrique](https://fr.wikipedia.org/wiki/Crible_alg%C3%A9brique) etc.
=======
There's a lot of space to optimize it. For instance, we could look for the divisors from `2` to square root of `i`. But anyway, if we want to be really efficient for large intervals, we need to change the approach and rely on advanced maths and complex algorithms like [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) etc.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea
