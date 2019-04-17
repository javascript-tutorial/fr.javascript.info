
Essayez de lancer:

```js run
let str = "Hello";

str.test = 5; // (*)

alert(str.test); 
```

Il peut y avoir deux types de résultats:
1. `undefined`
2. une erreur.

Pourquoi? Répétons ce qui se pase à la ligne`(*)`:

1. Lorsqu'on accède à une propiété de `str`, un "wrapper d'objet" (conteneur) est créé.
2. L'opération avec la propriété est effectuée dessus. Ainsi, l'objet obtient la propriété test.
3. L'opération se termine et "le wrapper d'objet" (conteneur) disparait.

Ainsi, sur la dernière ligne, `str` n'a aucune trace de la propriété. Un nouveau "wrapper d’objet" (conteneur) est créé pour chaque opération sur le `string`.

Certains navigateurs peuvent toutefois décider de limiter davantage le programmeur et d'empêcher l'attribution de propriétés aux primitives. C'est pourquoi, dans la pratique, nous pouvons également voir les erreurs sur la ligne `(*)`. C'est cependant un peu plus éloigné de la spécification. 

**Cet exemple montre clairement que les primitives ne sont pas des objets.**

Ils ne peuvent tout simplement pas stocker de données.

Toutes les opérations de propriété / méthode sont effectuées à l'aide d'objets temporaires.

