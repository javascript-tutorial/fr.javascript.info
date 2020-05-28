**La réponse: de `0` à `4` dans les deux cas.**

```js run
for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );
```

Cela peut être facilement déduit de l'algorithme de `for` :

1. Exécute une fois `i = 0` avant tout (début).
2. Vérifie l'état `i < 5`
3. Si `true` -- execute le corps de la boucle `alert(i)`, et ensuite `i++`

L'incrément `i++` est séparé de la vérification de condition (2). C’est juste une autre déclaration.

La valeur renvoyée par l’incrémentation n’est pas utilisée ici, il n’y a donc pas de différence entre `i++` et `++i`.
