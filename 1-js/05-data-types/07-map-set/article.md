
# Map and Set

Nous avons découvert les structures de données complexes suivantes :

- Objects (les objets) pour stocker des valeurs par clés.
- Arrays (les tableaux) pour stocker des valeurs en conservant l'ordre d'insertion.

Il existe aussi `Map` (les dictionnaires de données) et `Set` (les ensembles) qui sont très utiles dans notre quotidien de développeur.


## Map

Une [Map](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map) (dictionnaire de donnée) permet, comme pour un `Object`, de stocker plusieurs éléments sous la forme de clés valeurs. Sauf que cette fois, les clés peuvent être de n'importe qu'elle type.

Voici les méthodes et les propriétés d'une `Map` :

- `new Map()` -- instancie la map.
- `map.set(key, value)` -- définie la valeur pour une clé.
- `map.get(key)` -- retourne la valeur associée à la clé, `undefined` si `key` n'existe pas dans la map.
- `map.has(key)` -- retourne `true` si `key` existe, sinon `false`.
- `map.delete(key)` -- supprime la valeur associée à `key`
- `map.clear()` -- supprime tout le contenu de la map.
- `map.size` -- retourne le nombre d'éléments.

Par exemple :

```js run
let map = new Map();

map.set('1', 'str1');   // une clé de type chaîne de caractère
map.set(1, 'num1');     // une clé de type numérique
map.set(true, 'bool1'); // une clé de type booléenne

// souvenez-vous, dans un `Object`, les clés sont converties en chaîne de caractères
/* 
  alors que `Map` conserve le type d'origine de la clé, 
  c'est pourquoi les deux appels suivants retournent des valeurs différentes:
*/
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Au travers de cet exemple nous pouvons voir, qu'à la différence des `Objects`, les clés ne sont pas converties en chaîne de caractère.
Il est donc possible d'utiliser n'importe quel type.

**On peut aussi utiliser les `Objects` comme clé dans une `Map`.**

Par exemple:

```js run
let john = { name: "John" };

// pour chaque utilisateur, nous stockons le nombre de visites
let visitsCountMap = new Map();

// john est utilisé comme clé dans la map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

Pourvoir utilisé un `Object` comme une clé est l'une des raisons principales d'utiliser une `Map`.
`Map` est à privilégier à `Object` lorsque que l'on utilise autre chose que des chaînes de caractères comme clé.

Essayons de faire comme l'exemple précédent directement avec un `Object`:

```js run
let john = { name: "John" };

let visitsCountObj = {}; // on créé notre object

visitsCountObj[john] = 123; // on souhaite utiliser john comme clé

*!*
// Et voilà ce que l'on obtient !
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```
`visitsCountObj` est un objet, de ce fait, toutes les clés, comme `john`, sont transformées en chaîne de caractères. 
C'est pourquoi nous obtenons comme valeur de clé `"[object Object]"`. Ce n'est clairement pas ce que l'on souhaite.

```smart header="Comment `Map` compare les clés"

Pour tester l'égalité entre les clés, `Map` se base sur l'algorithme [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). 
C'est grosso modo la même chose que l'opérateur de stricte égalité `===`, à la différence que `NaN` est considéré comme étant égal à `NaN`. 
`NaN` peut donc être utilisé comme clé.

Cet algorithme ne peut pas peut être modifié.
```

````smart header="Chaining"

Chaque appel à `map.set` retourne la map elle-même, ce qui nous permet d'enchaîner les appels:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## Map depuis Object

Lorsqu'une `Map` est créée, nous pouvons utiliser un tableau (ou n'importe quel `iterable`) qui possède un couple clé-valeur. 

Par exemple :
```js
// un tableau avec couple [clé, valeur]
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);
```

Si nous voulons créer une `Map` à partir d'un `Object`, nous pouvons utiliser la méthode [Object.entries(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/entries) qui retourne un tableau de couple clé/valeur pour un objet qui respectent ce format.

Nous pouvons donc initialiser une `Map` à partir d'un objet de la manière suivante :

```js
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*
```

`Object.entries` retourne le tableau de couple clé/valeur `[ ["name","John"], ["age", 30] ]` que nous pouvons utiliser pour créer notre `Map`.

## Parcourir les éléments d'une `Map`

Il existe 3 façons de parcourir les éléments d'une `map` :

- `map.keys()` -- retourne toutes les clés sous forme  d'`iterable`,
- `map.values()` -- retourne les valeurs sous forme d'`iterable`,
- `map.entries()` -- retourne les `entries` (couple sous forme de `[clé, valeur]`), c'est la méthode utilisée par défaut par `for..of`.

Par exemple :

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// on parcourt les clés (les légumes)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// on parcourt les valeurs (les montants)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// on parcourt les entries (couple [clé, valeur])
for (let entry of recipeMap) { // équivalent à : recipeMap.entries()
  alert(entry); // cucumber,500 (etc...)
}
```

```smart header="L'ordre d'insertion est conservé"
Contraitement aux `Object`, `Map` conserve l'ordre d'insertion des valeurs.
```

Il est aussi possible d'utiliser `forEach` avec `Map` comme on pourrait le faire avec un tableau :

```js
// exécute la fonction pour chaque couple (key, value)
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```

## Set

`Set` est une liste sans doublons.

Ses principales méthodes sont :

- `new Set(iterable)` -- créé un `set`, si un `iterable` (la plupart du temps, un tableau) est passé en paramètre, ses valeurs sont copiées dans le `set`
- `set.add(value)` -- ajoute l'élément `value` et retourne le `set`.
- `set.delete(value)` -- supprime l'élément `value` et retourne `true` si la valeur existait au moment de l'appel sinon `false`.
- `set.has(value)` -- retourne `true` si la valeur existe dans le `set`, sinon faux.
- `set.clear()` -- supprime tout le contenu du `set`.
- `set.size` -- le nombre d'éléments dans le tableau.

Ce qu'il faut surtout savoir c'est que lorsque l'on appelle plusieurs fois `set.add(value)` avec la même valeur, la méthode ne fait rien. 
C'est pourquoi chaque valeur est unique dans un `Set`.

Par exemple, nous souhaitons nous souvenir de tous nos visiteurs. Mais chaque visiteurs doit être unique.

`Set` est exactement ce qu'il nous faut :

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visites, certains utilisateurs viennent plusieurs fois
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set conserve une fois chaque visiteurs
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (puis Pete et Mary)
}
```

Nous aurions aussi pu utiliser un tableau (`Array`) en vérifiant avant chaque insertion que l'élément n'existe pas en utilisant 
[arr.find](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/find). Cependant les performances auraient été 
moins bonnes car cette méthode parcours chaque élément du tableau. `Set` est beaucoup plus efficace car il est optimisé en interne pour vérifier l'unicité des valeurs.

## Parcourir un Set

Nous pouvons parcourir les éléments d'un Set avec `for..of` ou en utilisant `forEach` 

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// même chose en utilisant forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

A noter que la fonction de callback utilisée par `forEach` prend 3 arguments en paramètres: une `value`, puis *la même valeur* `valueAgain`,
et enfin le set lui-même.


C'est pour des raisons de compatibilité avec `Map` que `forEach` prend en paramètre 3 arguments. C'est quelque peu surprenant, mais cela permet de 
remplacer facilement une `Map` par un `Set`. 

Les méthodes pour parcourir les éléments d'une `Map` peuvent être utilisées :

- `set.keys()` -- retourne un objet iterable contenant les valeurs,
- `set.values()` -- même chose que pour `set.keys()`, méthode présente pour des raisons de compatibilité avec `Map`,
- `set.entries()` -- retourne un objet iterable sous la forme de `[value, value]`, , méthode présente pour des raisons de compatibilité avec `Map`

## Summary

`Map` -- est une collection de clé valeurs.

Méthodes et propriétés:

- `new Map([iterable])` -- créé une map, potentiellement initialisée avec un `iterable` (ex: un array) de couple clé valeur `[key, value]`.
- `map.set(key, value)` -- définie la valeur `value` pour la clé `key`.
- `map.get(key)` -- retourne la valeur associée à `key`, `undefined` si `key` n'existe pas.
- `map.has(key)` -- retourne `true` si `key` existe sinon `false`.
- `map.delete(key)` -- supprime la valeur associé à `key` dans la map.
- `map.clear()` -- supprime tous les éléments dans la map.
- `map.size` -- retourne le nombre d'éléments.

La différence entre avec un objet traditionel :

- N'importe quel type peut être utilisé comme clé
- Accès à des méthodes tels que `size`.

`Set` -- est une collection de valeurs uniques

Méthodes et propriétés :

- `new Set([iterable])` -- créé un set, potentiellement initialisé avec un `iterable` (ex: un array) de valeurs.
- `set.add(value)` -- ajoute une valeur sauf si elle existe et retourne le set en cours.
- `set.delete(value)` -- supprime la valeur, retourne `true` si `value` existait au moment de l'appel sinon `false`.
- `set.has(value)` -- retourne `true` si la valeur existe dans le `set`, sinon `false`.
- `set.clear()` -- supprime tous les éléments du set.
- `set.size` -- retourne le nombre d'éléments.

On ne peut pas dire que les éléments dans une `Map` ou un `Set` sont désordonnés car ils sont toujours parcourut par ordre d'insertion.
Il est cependant impossible de réorganiser les éléments ou bien de les retrouver par leur index.
