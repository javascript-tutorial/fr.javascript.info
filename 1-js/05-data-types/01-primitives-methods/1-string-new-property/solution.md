Essayez de lancer :

```js run
let str = "Hello";

str.test = 5; // (*)

alert(str.test);
```

Selon que vous utilisiez `use strict` ou non, le résultat peut être :

1.
`undefined` (pas de mode strict)
2.
une erreur (mode strict)

Pourquoi ? Répétons ce qui se pase à la ligne `(*)`:

1.
Lorsqu'on accède à une propiété de `str`, un "wrapper d'objet" (conteneur) est créé.
2.
En mode strict, l'écriture à l'intérieur est une erreur.
3.
Sinon, l'opération avec la propriété est poursuivie, l'objet obtient la propriété `test`.
Mais après cela, "l'objet wrapper" disparaît, de sorte que dans la dernière ligne, `str` n'a aucune trace de la propriété `test`.

**Cet exemple montre clairement que les primitives ne sont pas des objets.**

Ils ne peuvent pas stocker de données supplémentaires.