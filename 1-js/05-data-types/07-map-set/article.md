
# Map and Set

Jusqu'à présent, nous avons découvert les structures de données complexes suivantes :

- Les objets sont utilisés pour stocker des collections de clés.
- Les tableaux sont utilisés pour stocker des collections ordonnées.


## Map

Une [Map](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map) (dictionnaire de donnée) permet, comme pour un `Object`, de stocker plusieurs éléments sous la forme de clés valeurs. Sauf que cette fois, les clés peuvent être de n'importe qu'elle type.

Voici les méthodes et les propriétés d'une `Map` :

<<<<<<< HEAD
- `new Map()` -- instancie la map.
- `map.set(key, value)` -- définie la valeur pour une clé.
- `map.get(key)` -- retourne la valeur associée à la clé, `undefined` si `key` n'existe pas dans la map.
- `map.has(key)` -- retourne `true` si `key` existe, sinon `false`.
- `map.delete(key)` -- supprime la valeur associée à `key`
- `map.clear()` -- supprime tout le contenu de la map.
- `map.size` -- retourne le nombre d'éléments.
=======
- `new Map()` -- creates the map.
- [`map.set(key, value)`](mdn:js/Map/set) -- stores the value by the key.
- [`map.get(key)`](mdn:js/Map/get) -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- [`map.has(key)`](mdn:js/Map/has) -- returns `true` if the `key` exists, `false` otherwise.
- [`map.delete(key)`](mdn:js/Map/delete) -- removes the value by the key.
- [`map.clear()`](mdn:js/Map/clear) -- removes everything from the map.
- [`map.size`](mdn:js/Map/size) -- returns the current element count.
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

Par exemple :

```js run
let map = new Map();

map.set('1', 'str1');   // une clé de type chaîne de caractère
map.set(1, 'num1');     // une clé de type numérique
map.set(true, 'bool1'); // une clé de type booléenne

// souvenez-vous, dans un `Object`, les clés sont converties en chaîne de caractères
// alors que `Map` conserve le type d'origine de la clé, 
// c'est pourquoi les deux appels suivants retournent des valeurs différentes:

alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Au travers de cet exemple nous pouvons voir, qu'à la différence des `Objects`, les clés ne sont pas converties en chaîne de caractère.
Il est donc possible d'utiliser n'importe quel type.

```smart header="`map[key]` n'est pas la bonne façon d'utiliser un `Map`"
Bien que `map[key]` fonctionne également, par exemple nous pouvons définir `map[key] = 2`, cela traite `map` comme un objet JavaScript simple, ce qui implique toutes les limitations correspondantes (uniquement des clés chaîne de caractères/symbol etc...).

Nous devons donc utiliser les méthodes `map`: `set`, `get` et ainsi de suite.
```

**Map peut également utiliser des objets comme clés.**

Par exemple:

```js run
let john = { name: "John" };

// pour chaque utilisateur, nous stockons le nombre de visites
let visitsCountMap = new Map();

// john est utilisé comme clé dans la map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

Utiliser des objets comme clés est l'une des fonctionnalités les plus notables et les plus importantes de `Map`. La même chose ne compte pas pour `Object`. Une chaîne de caractères comme clé dans `Object` est très bien, mais nous ne pouvons pas utiliser un autre `Object` comme clé dans `Object`.

Essayons de faire comme l'exemple précédent directement avec un `Object`:

```js run
let john = { name: "John" };
let ben = { name: "Ben" };

let visitsCountObj = {}; // on créé notre object

visitsCountObj[ben] = 234; // essayez d'utiliser l'objet ben comme clé
visitsCountObj[john] = 123; // essayez d'utiliser l'objet john comme clé, l'objet ben sera remplacé

*!*
// C'est ce qui a été écrit!
alert( visitsCountObj["[object Object]"] ); // 123 
*/!*
```
Comme `visitesCountObj` est un objet, il convertit toutes les clés `Object`, telles que `john` et `ben` ci-dessus, en la même chaîne de caractères `"[object Object]"`. Certainement pas ce que nous voulons.

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


## Parcourir les éléments d'une `Map`

Il existe 3 façons de parcourir les éléments d'une `map` :

<<<<<<< HEAD
- `map.keys()` -- retourne toutes les clés sous forme  d'`iterable`,
- `map.values()` -- retourne les valeurs sous forme d'`iterable`,
- `map.entries()` -- retourne les `entries` (couple sous forme de `[clé, valeur]`), c'est la méthode utilisée par défaut par `for..of`.
=======
- [`map.keys()`](mdn:js/Map/keys) -- returns an iterable for keys,
- [`map.values()`](mdn:js/Map/values) -- returns an iterable for values,
- [`map.entries()`](mdn:js/Map/entries) -- returns an iterable for entries `[key, value]`, it's used by default in `for..of`.
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

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

## Object.entries: Map from Object

When a `Map` is created, we can pass an array (or another iterable) with key/value pairs for initialization, like this:

```js run
// array of [key, value] pairs
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

If we have a plain object, and we'd like to create a `Map` from it, then we can use built-in method [Object.entries(obj)](mdn:js/Object/entries) that returns an array of key/value pairs for an object exactly in that format.

So we can create a map from an object like this:

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

Here, `Object.entries` returns the array of key/value pairs: `[ ["name","John"], ["age", 30] ]`. That's what `Map` needs.


## Object.fromEntries: Object from Map

We've just seen how to create `Map` from a plain object with `Object.entries(obj)`.

There's `Object.fromEntries` method that does the reverse: given an array of `[key, value]` pairs, it creates an object from them:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

We can use `Object.fromEntries` to get a plain object from `Map`.

E.g. we store the data in a `Map`, but we need to pass it to a 3rd-party code that expects a plain object.

Here we go:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // make a plain object (*)
*/!*

// done!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

A call to `map.entries()` returns an iterable of key/value pairs, exactly in the right format for `Object.fromEntries`.

We could also make line `(*)` shorter:
```js
let obj = Object.fromEntries(map); // omit .entries()
```

That's the same, because `Object.fromEntries` expects an iterable object as the argument. Not necessarily an array. And the standard iteration for `map` returns same key/value pairs as `map.entries()`. So we get a plain object with same key/values as the `map`.

## Set

`Set` est une liste sans doublons.

Ses principales méthodes sont :

<<<<<<< HEAD
- `new Set(iterable)` -- créé un `set`, si un `iterable` (la plupart du temps, un tableau) est passé en paramètre, ses valeurs sont copiées dans le `set`
- `set.add(value)` -- ajoute l'élément `value` et retourne le `set`.
- `set.delete(value)` -- supprime l'élément `value` et retourne `true` si la valeur existait au moment de l'appel sinon `false`.
- `set.has(value)` -- retourne `true` si la valeur existe dans le `set`, sinon faux.
- `set.clear()` -- supprime tout le contenu du `set`.
- `set.size` -- le nombre d'éléments dans le tableau.
=======
- `new Set(iterable)` -- creates the set, and if an `iterable` object is provided (usually an array), copies values from it into the set.
- [`set.add(value)`](mdn:js/Set/add) -- adds a value, returns the set itself.
- [`set.delete(value)`](mdn:js/Set/delete) -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- [`set.has(value)`](mdn:js/Set/has) -- returns `true` if the value exists in the set, otherwise `false`.
- [`set.clear()`](mdn:js/Set/clear) -- removes everything from the set.
- [`set.size`](mdn:js/Set/size) -- is the elements count.
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

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


<<<<<<< HEAD
C'est pour des raisons de compatibilité avec `Map` que `forEach` prend en paramètre 3 arguments. C'est quelque peu surprenant, mais cela permet de 
remplacer facilement une `Map` par un `Set`. 
=======
That's for compatibility with `Map` where the callback passed `forEach` has three arguments. Looks a bit strange, for sure. But this may help to replace `Map` with `Set` in certain cases with ease, and vice versa.
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

Les méthodes pour parcourir les éléments d'une `Map` peuvent être utilisées :

<<<<<<< HEAD
- `set.keys()` -- retourne un objet iterable contenant les valeurs,
- `set.values()` -- même chose que pour `set.keys()`, méthode présente pour des raisons de compatibilité avec `Map`,
- `set.entries()` -- retourne un objet iterable sous la forme de `[value, value]`, , méthode présente pour des raisons de compatibilité avec `Map`
=======
- [`set.keys()`](mdn:js/Set/keys) -- returns an iterable object for values,
- [`set.values()`](mdn:js/Set/values) -- same as `set.keys()`, for compatibility with `Map`,
- [`set.entries()`](mdn:js/Set/entries) -- returns an iterable object for entries `[value, value]`, exists for compatibility with `Map`.
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

## Summary

`Map` -- est une collection de clé valeurs.

Méthodes et propriétés:

<<<<<<< HEAD
- `new Map([iterable])` -- créé une map, potentiellement initialisée avec un `iterable` (ex: un array) de couple clé valeur `[key, value]`.
- `map.set(key, value)` -- stocke la valeur par la clé, renvoie la carte elle-même.
- `map.get(key)` -- retourne la valeur associée à `key`, `undefined` si `key` n'existe pas.
- `map.has(key)` -- retourne `true` si `key` existe sinon `false`.
- `map.delete(key)` -- supprime la valeur par la clé, retourne `true` si `key` existait au moment de l'appel, sinon `false`.
- `map.clear()` -- supprime tous les éléments dans la map.
- `map.size` -- retourne le nombre d'éléments.
=======
- `new Map([iterable])` -- creates the map, with optional `iterable` (e.g. array) of `[key,value]` pairs for initialization.
- [`map.set(key, value)`](mdn:js/Map/set) -- stores the value by the key, returns the map itself.
- [`map.get(key)`](mdn:js/Map/get)` -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- [`map.has(key)`](mdn:js/Map/has) -- returns `true` if the `key` exists, `false` otherwise.
- [`map.delete(key)`](mdn:js/Map/delete) -- removes the value by the key, returns `true` if `key` existed at the moment of the call, otherwise `false`.
- [`map.clear()`](mdn:js/Map/clear) -- removes everything from the map.
- [`map.size`](mdn:js/Map/size) -- returns the current element count.
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

La différence entre `Map` avec un objet traditionel :

- N'importe quel type peut être utilisé comme clé
- Accès à des méthodes tels que `size`.

`Set` -- est une collection de valeurs uniques

Méthodes et propriétés :

<<<<<<< HEAD
- `new Set([iterable])` -- créé un set, potentiellement initialisé avec un `iterable` (ex: un array) de valeurs.
- `set.add(value)` -- ajoute une valeur sauf si elle existe et retourne le set en cours.
- `set.delete(value)` -- supprime la valeur, retourne `true` si `value` existait au moment de l'appel sinon `false`.
- `set.has(value)` -- retourne `true` si la valeur existe dans le `set`, sinon `false`.
- `set.clear()` -- supprime tous les éléments du set.
- `set.size` -- retourne le nombre d'éléments.
=======
- `new Set([iterable])` -- creates the set, with optional `iterable` (e.g. array) of values for initialization.
- [`set.add(value)`](mdn:js/Set/add) -- adds a value (does nothing if `value` exists), returns the set itself.
- [`set.delete(value)`](mdn:js/Set/delete) -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- [`set.has(value)`](mdn:js/Set/has) -- returns `true` if the value exists in the set, otherwise `false`.
- [`set.clear()`](mdn:js/Set/clear) -- removes everything from the set.
- [`set.size`](mdn:js/Set/size) -- is the elements count.
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

On ne peut pas dire que les éléments dans une `Map` ou un `Set` sont désordonnés car ils sont toujours parcourut par ordre d'insertion.
Il est cependant impossible de réorganiser les éléments ou bien de les retrouver par leur index.
