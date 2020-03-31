Utilisons `eval` pour calculer l'expression mathématique :

```js demo run
let expr = prompt("Type an arithmetic expression?", '2*3+2');

alert( eval(expr) );
```

L'utilisateur peut envoyer n'importe quel texte ou code cependant.

Pour rendre les choses sûres, et les limiter à de l'arithmétique, nous pouvons vérifier `expr` en utilisant une [expression régulière](info:regular-expressions), pour qu'elle ne contienne que des nombres et des opérateurs.
