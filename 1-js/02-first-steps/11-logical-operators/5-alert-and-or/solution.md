La réponse : `3`.

```js run
alert( null || 2 && 3 || 4 );
```

La priorité de AND `&&` est supérieure à OR `||`, elle s'exécute donc en premier.

Le résultat de `2 && 3 = 3`, donc l'expression devient :

```
null || 3 || 4
```

Maintenant, le résultat est la première valeur vraie : `3`.

