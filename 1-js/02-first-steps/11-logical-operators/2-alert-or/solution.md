La réponse : d'abord `1` puis `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

Règle importante à retenir : **L'appel de l'`alert` ne renvoie pas de valeur. Ou, en d'autres termes, il retourne `undefined`.**

1. Le premier OR `||` évalue son opérande gauche `alert(1)`. Cela affiche le premier message avec 1.
2. L'`alert` retourne `undefined`, donc OR passe au deuxième opérande en recherchant une valeur vraie.
3. Le deuxième opérande `2` est vrai, donc l'exécution est interrompue, `2` est renvoyé puis affiché par l'alerte externe.

Il n'y aura pas de `3`, car l'évaluation n'atteint pas l'`alert (3)`.
