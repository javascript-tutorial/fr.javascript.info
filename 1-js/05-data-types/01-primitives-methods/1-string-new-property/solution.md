
Essayez de lancer:

```js run
let str = "Hello";

str.test = 5; // (*)

alert(str.test);
```

Selon que vous utilisiez `use strict` ou non, le résultat peut être :
1. `undefined` (pas de mode strict)
2. une erreur (mode strict)

Pourquoi ? Répétons ce qui se pase à la ligne`(*)`:

<<<<<<< HEAD
1. Lorsqu'on accède à une propiété de `str`, un "wrapper d'objet" (conteneur) est créé.
2. En mode strict, l'écriture à l'intérieur est une erreur.
3. Sinon, l'opération avec la propriété est poursuivie, l'objet obtient la propriété test, mais après cela, "l'objet wrapper" disparaît.

Donc, sans mode strict, dans la dernière ligne, `str` n'a aucune trace de la propriété.
=======
1. When a property of `str` is accessed, a "wrapper object" is created.
2. In strict mode, writing into it is an error.
3. Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the "wrapper object" disappears, so in the last line `str` has no trace of the property.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74


**Cet exemple montre clairement que les primitives ne sont pas des objets.**

Ils ne peuvent pas stocker de données supplémentaires.
