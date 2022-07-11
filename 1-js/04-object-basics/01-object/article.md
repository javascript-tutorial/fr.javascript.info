
# Objets

Comme nous le savons du chapitre <info:types>, il existe huit types de données dans le langage JavaScript. Sept d'entre elles sont appelées "primitives", car leurs valeurs ne contiennent qu'une seule chose (que ce soit une chaîne, un nombre ou autre).

En revanche, les objets sont utilisés pour stocker des collections de données variées et d’entités plus complexes. En JavaScript, les objets pénètrent dans presque tous les aspects du langage. Nous devons donc d'abord les comprendre avant d'aller plus loin.

Un objet peut être créé avec des accolades `{…}`, avec une liste optionnelle de *propriétés*. Une propriété est une paire "clé: valeur", dans laquelle la clé (`key`) est une chaîne de caractères (également appelée "nom de la propriété"), et la valeur (`value`) peut être n'importe quoi.

Nous pouvons imaginer un objet comme une armoire avec des fichiers signés. Chaque donnée est stockée dans son fichier par la clé. Il est facile de trouver un fichier par son nom ou d’ajouter/supprimer un fichier.

![](object.svg)

Un objet vide ("armoire vide") peut être créé en utilisant l'une des deux syntaxes suivantes :

```js
let user = new Object(); // syntaxe "constructeur d'objet"
let user = {};  // syntaxe "littéral objet"
```

![](object-user-empty.svg)

Habituellement, les accolades `{...}` sont utilisées. Cette déclaration s'appelle un littéral objet (*object literal*).

## Littéraux et propriétés

Nous pouvons immédiatement inclure certaines propriétés dans `{...}` sous forme de paires "clé: valeur" :

```js
let user = {     // un objet
  name: "John",  // par clé "nom" valeur de stockage "John"
  age: 30        // par clé "age" valeur de stockage 30
};
```

Une propriété a une clé (également appelée "nom" ou "identifiant") avant les deux points `":"` et une valeur à sa droite.

Dans l'objet `user`, il y a deux propriétés :

1. La première propriété porte le nom `"name"` et la valeur `"John"`.
2. La seconde a le nom `"age"` et la valeur `30`.

L'objet `user` résultant peut être imaginé comme une armoire avec deux fichiers signés intitulés "nom" et "âge".

![user object](object-user.svg)

<<<<<<< HEAD
Nous pouvons ajouter, supprimer et lire des fichiers à tout moment.
=======
We can add, remove and read files from it at any time.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

Les valeurs de propriété sont accessibles à l'aide de la notation par points :

```js
// récupère les valeurs de propriété de l'objet :
alert( user.name ); // John
alert( user.age ); // 30
```

La valeur peut être de tout type. Ajoutons un booléen :

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

<<<<<<< HEAD
Pour supprimer une propriété, nous pouvons utiliser l'opérateur `delete` :
=======
To remove a property, we can use the `delete` operator:
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

```js
delete user.age;
```

![user object 3](object-user-delete.svg)

Nous pouvons également utiliser des noms de propriété multi-mots, mais ils doivent ensuite être entourés de quotes :

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // le nom de la propriété multi-mots doit être entourée de quotes
};
```

![](object-user-props.svg)


La dernière propriété de la liste peut se terminer par une virgule :
```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```
Cela s'appelle une virgule  "trailing" ou "hanging". Elle facilite l'ajout/suppression/déplacement des propriétés, car toutes les lignes se ressemblent.

## Crochets

Pour les propriétés multi-mots, l’accès par points ne fonctionne pas :

```js run
// cela donnerait une erreur de syntaxe
user.likes birds = true
```

JavaScript ne comprend pas cela. Il pense que nous adressons `user.likes`, ensuite il donne une erreur de syntaxe lorsqu'il rencontre des `birds` inattendus.

Le point nécessite que la clé soit un identificateur de variable valide. Cela implique qu'elle ne contient aucun espace, ne commence pas par un chiffre et n'inclut pas de caractères spéciaux (`$` et `_` sont autorisés).

Il existe une autre “notation entre crochets” qui fonctionne avec n’importe quelle chaîne :

```js run
let user = {};

// set
user["likes birds"] = true;

// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];
```

Maintenant tout va bien. Veuillez noter que la chaîne de caractères entre crochets est correctement entourée de quotes (tout type de guillemets fera l'affaire).

Les crochets fournissent également un moyen d'obtenir le nom de la propriété comme résultat de toute expression (par opposition à une chaîne de caractères littérale), semblable à une variable, comme ceci :

```js
let key = "likes birds";

// pareil que user["likes birds"] = true;
user[key] = true;
```

Ici, la variable `key` peut être calculée au moment de l'exécution ou dépendre de la saisie de l'utilisateur. Et ensuite, nous l'utilisons pour accéder à la propriété. Cela nous donne beaucoup de flexibilité. 

Par exemple :

```js run
let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// accès par variable
alert( user[key] ); // John (si entré "name")
```

The dot notation cannot be used in a similar way:

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```

### Propriétés calculées

Nous pouvons utiliser des crochets dans un objet littéral, lorsqu'on crée un objet. Cela s'appelle des propriétés calculées (*computed propertie*).

Par exemple :

```js run
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
*!*
  [fruit]: 5, // le nom de la propriété est tiré de la variable fruit
*/!*
};

alert( bag.apple ); // 5 si fruit="apple"
```

La signification d'une propriété calculée est simple: `[fruit]` signifie que le nom de la propriété doit être extrait de `fruit`.

Ainsi, si un visiteur entre `"apple"`, `bag` deviendra `{apple: 5}`.

Essentiellement, cela fonctionne de la même façon que :
```js run
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {};

// prendre le nom de la propriété de la variable fruit
bag[fruit] = 5;
```

… Mais a une meilleure apparence.

Nous pouvons utiliser des expressions plus complexes entre crochets :

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

<<<<<<< HEAD
Les crochets sont beaucoup plus puissants que la notation par points. Ils autorisent tous les noms de propriété et variables. Mais ils sont aussi plus lourds à écrire.
=======
Square brackets are much more powerful than dot notation. They allow any property names and variables. But they are also more cumbersome to write.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

Ainsi, la plupart du temps, lorsque les noms de propriété sont connus et simples, le point est utilisé. Et si nous avons besoin de quelque chose de plus complexe, nous passons aux crochets.

## Valeur de propriété abrégée (Property value shorthand)

<<<<<<< HEAD
Dans le code, nous utilisons souvent des variables existantes en tant que valeurs pour les noms de propriétés.
=======
In real code, we often use existing variables as values for property names.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

Par exemple :

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age,
    // ...autres propriétés
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

Dans l'exemple ci-dessus, les propriétés portent les mêmes noms que les variables. Le cas d’utilisation de la création d’une propriété à partir d’une variable est si courant qu’il existe une valeur spéciale de propriété abrégée (*property value shorthand*) pour la rendre plus courte.

Au lieu de `name:name`, nous pouvons simplement écrire `name`, comme ceci :

```js
function makeUser(name, age) {
*!*
  return {
    name, // pareil que name: name
    age,  // pareil que age: age
    // ...
  };
*/!*
}
```

Nous pouvons utiliser à la fois des propriétés normales et des raccourcis dans le même objet :

```js
let user = {
  name,  // pareil que name:name
  age: 30
};
```

## Limitations des noms de propriété

Comme nous le savons déjà, une variable ne peut pas avoir un nom égal à l'un des mots réservés au language comme "for", "let", "return" etc.

<<<<<<< HEAD
Mais pour une propriété d'objet, il n'y a pas de telle restriction :
=======
As we already know, a variable cannot have a name equal to one of the language-reserved words like "for", "let", "return" etc.

But for an object property, there's no such restriction:
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

```js run
// these properties are all right
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

En bref, il n'y a aucune limitation sur les noms de propriété. Il peut s'agir de n'importe quelle chaîne de caractères ou symbole (un type spécial pour les identifiants, qui sera traité plus tard).

Les autres types sont automatiquement convertis en chaînes de caractères.

Par exemple, un nombre `0` devient une chaîne `"0"` lorsqu'il est utilisé comme clé de propriété :

```js run
let obj = {
  0: "test" // same as "0": "test"
};

// both alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)
```

Il y a un problème mineur avec une propriété spéciale nommée `__proto__`. Nous ne pouvons pas le définir sur une valeur non-objet :


```js run
let obj = {};
obj.__proto__ = 5; // assign a number
alert(obj.__proto__); // [object Object] - la valeur est un objet, n'a pas fonctionné comme prévu
```

Comme nous le voyons dans le code, l'affectation à une primitive `5` est ignorée.

Nous couvrirons la nature particulière de `__proto__` dans les [chapitres suivants](info:prototype-inheritance), et nous suggèrerons une [façon de corriger](info:prototype-methods) ce genre de comportement.

## Test d'existence de propriété, opérateur "in"

Une caractéristique notable des objets en JavaScript, par rapport à de nombreux autres langages, est qu'il est possible d'accéder à n'importe quelle propriété. Il n'y aura pas d'erreur si la propriété n'existe pas !

La lecture d'une propriété non existante renvoie simplement `undefined`. Nous pouvons donc facilement tester si la propriété existe :

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true signifie "pas une telle propriété"
```

Il existe également un opérateur spécial `"in"` pour cela.

La syntaxe est :
```js
"key" in object
```

Par exemple :

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age existe
alert( "blabla" in user ); // false, user.blabla n'existe pas
```

Veuillez noter que sur le côté gauche de `in`, il doit y avoir un *nom de propriété*. C’est généralement une chaîne de caractères entre guillemets.

<<<<<<< HEAD
Si nous omettons les guillemets, cela signifie une variable, elle doit contenir le nom réel à tester. Par exemple :
=======
If we omit quotes, that means a variable should contain the actual name to be tested. For instance:
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

```js run
let user = { age: 30 };

let key = "age";
alert( *!*key*/!* in user ); // true, la propriété "age" existe
```

Pourquoi l'opérateur `in` existe-t-il ? N'est-ce pas suffisant de comparer avec `undefined` ?

Eh bien, la plupart du temps, la comparaison avec `undefined` fonctionne bien. Mais il y a un cas particulier quand il échoue, mais `"in"`fonctionne correctement.

C’est lorsque une propriété d’objet existe, mais qu'elle stocke undefined :

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // c'est indéfini, donc - pas une telle propriété ?

alert( "test" in obj ); // true, la propriété existe !
```


Dans le code ci-dessus, la propriété `obj.test` existe techniquement. Donc, l'opérateur `in` fonctionne bien.

Des situations comme celle-ci se produisent très rarement, parce que `undefined` n'est généralement pas attribué. Nous utilisons principalement `null` pour les valeurs "inconnues" ou "vides". Ainsi, l'opérateur `in` est un invité exotique dans le code.

<<<<<<< HEAD
=======
## The "for..in" loop [#forin]
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

## La boucle "for..in"

Pour parcourir toutes les clés d'un objet, il existe une forme spéciale de boucle : `for..in`. C'est une chose complètement différente de la construction `for(;;)` que nous avons étudiée auparavant.

La syntaxe :

```js
for(key in object) {
  // exécute le corps pour chaque clé parmi les propriétés de l'objet
}
```

Par exemple, affichons toutes les propriétés de `user` :

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for(let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // valeurs pour les clés
  alert( user[key] ); // John, 30, true
}
```

Notez que toutes les constructions "for" nous permettent de déclarer la variable en boucle à l'intérieur de la boucle, comme `let key` ici.

En outre, nous pourrions utiliser un autre nom de variable ici au lieu de `key`. Par exemple, `"for(let prop in obj)"` est également largement utilisé.


### Ordonné comme un objet

Les objets sont-ils ordonnés ? En d'autres termes, si nous parcourons un objet en boucle, obtenons-nous toutes les propriétés dans le même ordre où elles ont été ajoutées ? Pouvons-nous compter sur cela ?

La réponse courte est : "ordonné de manière spéciale" : les propriétés des entiers sont triées, les autres apparaissent dans l'ordre de création. Nous allons voir cela en détails.

Par exemple, considérons un objet avec les indicatifs de téléphone par pays :

```js run
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

*!*
for(let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

<<<<<<< HEAD
L'objet peut être utilisé pour suggérer une liste d'options à l'utilisateur. Si nous créons un site principalement pour le public allemand, nous voulons probablement que `49` soit le premier.
=======
The object may be used to suggest a list of options to the user. If we're making a site mainly for a German audience then we probably want `49` to be the first.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

Mais si nous exécutons ce code, nous voyons une image totalement différente :

- USA (1) passe en premier
- puis Switzerland (41) et ainsi de suite.

Les indicatifs de téléphone sont classés par ordre croissant, car ce sont des entiers. Donc on voit `1, 41, 44, 49`.

````smart header="Propriétés entier (integer properties) ? Qu'est-ce que c'est ?"
Le terme "propriété entier" (integer properties) désigne ici une chaîne de caractères pouvant être convertie en un entier à partir de-et-sans modification.

<<<<<<< HEAD
Ainsi, "49" est un nom de propriété entier, parce que lorsqu'il est transformé en nombre entier et inversement, il reste identique. Mais "+49" et "1.2" ne le sont pas :

```js run
// Math.trunc est une fonction intégrée qui supprime la partie décimale
alert( String(Math.trunc(Number("49"))) ); // "49", idem, propriété entier (integer property)
alert( String(Math.trunc(Number("+49"))) ); // "49", pas pareil "+49" ⇒ pas une propriété entier (integer property)
alert( String(Math.trunc(Number("1.2"))) ); // "1", pas pareil "1.2" ⇒ pas une propriété entier (integer property)
=======
So, `"49"` is an integer property name, because when it's transformed to an integer number and back, it's still the same. But `"+49"` and `"1.2"` are not:

```js run
// Number(...) explicitly converts to a number
// Math.trunc is a built-in function that removes the decimal part
alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523
```
````

… Par contre, si les clés ne sont pas des entiers, elles sont listées dans l'ordre de création, par exemple :

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // Ajouter une clé de plus

*!*
// les propriétés non-entiers sont listées dans l'ordre de création
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

Donc, pour résoudre le problème avec les indicatifs de téléphone, nous pouvons "tricher" en rendant ces indicatifs non entiers. Ajouter un signe plus `"+"` avant chaque indicatif suffit.

Comme ceci :

```js run
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for(let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```

Maintenant, cela fonctionne comme prévu.


## Résumé

Les objets sont des tableaux associatifs dotés de plusieurs fonctionnalités spéciales.

<<<<<<< HEAD
Ils stockent des propriétés (paires clé-valeur), où :
- Les clés de propriété doivent être des chaînes de caractères ou des symboles (généralement des chaînes de caractères).
- Les valeurs peuvent être de tout type.
=======
To access a property, we can use:
- The dot notation: `obj.property`.
- Square brackets notation `obj["property"]`. Square brackets allow taking the key from a variable, like `obj[varWithKey]`.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

Pour accéder à une propriété, nous pouvons utiliser :
- La notation par points : `obj.property`.
- Notation entre crochets `obj["property"]`. Les crochets permettent de prendre la clé d’une variable, comme `obj[varWithKey]`.

Opérateurs supplémentaires :
- Pour supprimer une propriété : `delete obj.prop`.
- Pour vérifier si une propriété avec la clé donnée existe : `"key" in obj`.
- Pour parcourir un objet : la boucle `for (let key in obj)`.

Ce que nous avons étudié dans ce chapitre s’appelle un "objet simple" (plain object) ou juste `Object`.  
Il existe de nombreux autres types d'objets en JavaScript :

- `Array` pour stocker des collections de données ordonnées,
- `Date` pour stocker des informations sur la date et l'heure,
- `Error` pour stocker des informations sur une erreur.
- … Etc.

Ils ont leurs particularités que nous étudierons plus tard. Parfois, les gens disent quelque chose comme "Type de tableau" ou "Type de date", mais ils ne sont pas formellement propres, mais appartiennent à un seul type de données "objet". Et ils l'étendent de différentes manières.

Les objets en JavaScript sont très puissants. Nous venons de gratter la surface d’un sujet vraiment énorme. Nous allons travailler étroitement avec les objets et en apprendre davantage à leur sujet dans d’autres parties du tutoriel.
