
Essayez de lancer:

```js run
let str = "Hello";

str.test = 5; // (*)

alert(str.test);
```

<<<<<<< HEAD
Il peut y avoir deux types de résultats:
1. `undefined`
2. une erreur.
=======
Depending on whether you have `use strict` or not, the result may be:
1. `undefined` (no strict mode)
2. An error (strict mode).
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

Pourquoi? Répétons ce qui se pase à la ligne`(*)`:

<<<<<<< HEAD
1. Lorsqu'on accède à une propiété de `str`, un "wrapper d'objet" (conteneur) est créé.
2. L'opération avec la propriété est effectuée dessus. Ainsi, l'objet obtient la propriété test.
3. L'opération se termine et "le wrapper d'objet" (conteneur) disparait.

Ainsi, sur la dernière ligne, `str` n'a aucune trace de la propriété. Un nouveau "wrapper d’objet" (conteneur) est créé pour chaque opération sur le `string`.

Certains navigateurs peuvent toutefois décider de limiter davantage le programmeur et d'empêcher l'attribution de propriétés aux primitives. C'est pourquoi, dans la pratique, nous pouvons également voir les erreurs sur la ligne `(*)`. C'est cependant un peu plus éloigné de la spécification. 
=======
1. When a property of `str` is accessed, a "wrapper object" is created.
2. In strict mode, writing into it is an error.
3. Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the "wrapper object" disappears.

So, without strict mode, in the last line `str` has no trace of the property.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

**Cet exemple montre clairement que les primitives ne sont pas des objets.**

<<<<<<< HEAD
Ils ne peuvent tout simplement pas stocker de données.

Toutes les opérations de propriété / méthode sont effectuées à l'aide d'objets temporaires.

=======
They can't store additional data.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f
