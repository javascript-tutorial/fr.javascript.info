
# Map and Set

Nous avons découvert les structures de données complexes suivantes :

- Objects (les objets) pour stocker des valeurs par clés.
- Arrays (les tableaux) pour stocker des valeurs en conservant l'ordre d'insertion.

Il existe aussi `Map` (les dictionnaires de données) et `Set` (les ensembles) qui sont très utiles dans notre quotidien de développeur.


## Map

[Map](mdn:js/Map) is a collection of keyed data items, just like an `Object`. But the main difference is that `Map` allows keys of any type.

[Map](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map) (dictionnaire de donnée) peut être vu comme un `Object` car elle permet de stocker plusieurs éléments sous la forme de clés valeurs. A la différence que les clés peuvent être de n'importe qu'elle type.

Methods and properties are:

Les méthodes et les propriétés sont:

- `new Map()` -- creates the map.
- `new Map()` -- instancie la map.
- `map.set(key, value)` -- stores the value by the key.
- `map.set(key, value)` -- définie la valeur pour une clé.
- `map.get(key)` -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- `map.get(key)` -- retourne la valeur associée à la clé, `undefined` si `key` n'existe pas dans la map.
- `map.has(key)` -- returns `true` if the `key` exists, `false` otherwise.
- `map.has(key)` -- retourne `true` si `key` existe, sinon `false`.
- `map.delete(key)` -- removes the value by the key.
- `map.delete(key)` -- supprime la valeur associer à `key`
- `map.clear()` -- removes everything from the map.
- `map.clear()` -- supprime tout le contenu de la map.
- `map.size` -- returns the current element count.
- `map.size` -- retourne le nombre d'éléments.

For instance:

Par exemple :

```js run
let map = new Map();

map.set('1', 'str1');   // une clé de type chaîne de caractère
map.set(1, 'num1');     // une clé de type numérique
map.set(true, 'bool1'); // une clé de type booléenne

// remember the regular Object? it would convert keys to string
// souvenez-vous, dans un `Object`, les clés sont converties en chaîne de caractères
// Map keeps the type, so these two are different:
// alors que `Map` conserve le type d'origine de la clé, c'est pourquoi les deux appels suivants retournent des valeurs différentes:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

As we can see, unlike objects, keys are not converted to strings. Any type of key is possible.

Au travers de cet exemple nous pouvons voir, qu'à la différence des `Objects`, les clés ne sont pas converties en chaîne de caractère.
Il est donc possible d'utiliser n'importe quel type.

**Map can also use objects as keys.**

**On peut aussi utiliser les `Objects` comme clé dans une `Map`.**

For instance:

Par exemple:

```js run
let john = { name: "John" };

// for every user, let's store their visits count
// pour chaque utilisateur, nous stockons le nombre de visites
let visitsCountMap = new Map();

// john is the key for the map
// john est utilisé comme clé dans la map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

Using objects as keys is one of most notable and important `Map` features. For string keys, `Object` can be fine, but not for object keys.

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

As `visitsCountObj` is an object, it converts all keys, such as `john` to strings, so we've got the string key `"[object Object]"`. Definitely not what we want.

`visitsCountObj` est un objet, de ce fait, toutes les clés, comme `john`, sont transformées en chaîne de caractères. C'est pourquoi nous obtenons comme valeur de clé 
`"[object Object]"`. Ce n'est clairement pas ce que l'on souhaite.

```smart header="How `Map` compares keys"
```smart header="Comment `Map` compare les clés"
To test keys for equivalence, `Map` uses the algorithm [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). It is roughly the same as strict equality `===`, but the difference is that `NaN` is considered equal to `NaN`. So `NaN` can be used as the key as well.

Pour tester l'égalité entre les clés, `Map` se base sur l'algorithme [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). C'est grosso modo la même chose
que l'opérateur de stricte égalité `===`, à la différence que `NaN` est considéré comme étant égal à `NaN`. `NaN` peut donc être utilisé comme clé.

This algorithm can't be changed or customized.

Cet algorithme ne peut pas peut être modifié.
```

````smart header="Chaining"
Every `map.set` call returns the map itself, so we can "chain" the calls:

Chaque appel à `map.set` retourne la map elle-même, ce qui nous permet d'enchaîner les appels:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## Map from Object
## Map depuis Object

When a `Map` is created, we can pass an array (or another iterable) with key-value pairs for initialization, like this:

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

If we have a plain object, and we'd like to create a `Map` from it, then we can use built-in method [Object.entries(obj)](mdn:js/Object/entries) that returns an array of key/value pairs for an object exactly in that format.

Si nous voulons créer une `Map` à partir d'un `Object`, nous pouvons utiliser la méthode [Object.entries(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/entries) qui retourne un tableau de couple clé/valeur pour un objet qui respectent ce format.

So we can initialize a map from an object like this:

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

Here, `Object.entries` returns the array of key/value pairs: `[ ["name","John"], ["age", 30] ]`. That's what `Map` needs.

`Object.entries` retourne le tableau de couple clé/valeur `[ ["name","John"], ["age", 30] ]` que nous pouvons utiliser pour créer notre `Map`.

## Iteration over Map

## Parcourir les éléments d'une `Map`

For looping over a `map`, there are 3 methods:

Il existe 3 façons de parcourir les éléments d'une `map` :

- `map.keys()` -- returns an iterable for keys,
- `map.keys()` -- retourne toutes les clés sous forme  d'`iterable`,
- `map.values()` -- returns an iterable for values,
- `map.values()` -- retourne les valeurs sous forme d'`iterable`,
- `map.entries()` -- returns an iterable for entries `[key, value]`, it's used by default in `for..of`.
- `map.entries()` -- retourne les `entries` (couple sous forme de `[clé, valeur]`), c'est la méthode utilisée par défaut par `for..of`.

For instance:

Par exemple :

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterate over keys (vegetables)
// on parcourt les clés (les légumes)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// iterate over values (amounts)
// on parcourt les valeurs (les montants)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// iterate over [key, value] entries
// on parcourt les entries (couple [clé, valeur])
for (let entry of recipeMap) { // équivalent à : recipeMap.entries()
  alert(entry); // cucumber,500 (etc...)
}
```

```smart header="L'ordre d'insertion est conservé"
The iteration goes in the same order as the values were inserted. `Map` preserves this order, unlike a regular `Object`.
Contraitement aux `Object`, `Map` conserve l'ordre d'insertion des valeurs.
```

Besides that, `Map` has a built-in `forEach` method, similar to `Array`:

Il est aussi possible d'utiliser `forEach` avec `Map` comme on pourrait le faire avec un tableau :

```js
// runs the function for each (key, value) pair
// exécute la fonction pour chaque couple (key, value)
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```

## Set

A `Set` is a special type collection - "set of values" (without keys), where each value may occur only once.

Its main methods are:

- `new Set(iterable)` -- creates the set, and if an `iterable` object is provided (usually an array), copies values from it into the set.
- `set.add(value)` -- adds a value, returns the set itself.
- `set.delete(value)` -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- `set.has(value)` -- returns `true` if the value exists in the set, otherwise `false`.
- `set.clear()` -- removes everything from the set.
- `set.size` -- is the elements count.

The main feature is that repeated calls of `set.add(value)` with the same value don't do anything. That's the reason why each value appears in a `Set` only once.

For example, we have visitors coming, and we'd like to remember everyone. But repeated visits should not lead to duplicates. A visitor must be "counted" only once.

`Set` is just the right thing for that:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set keeps only unique values
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (then Pete and Mary)
}
```

The alternative to `Set` could be an array of users, and the code to check for duplicates on every insertion using [arr.find](mdn:js/Array/find). But the performance would be much worse, because this method walks through the whole array checking every element. `Set` is much better optimized internally for uniqueness checks.

## Iteration over Set

We can loop over a set either with `for..of` or using `forEach`:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Note the funny thing. The callback function passed in `forEach` has 3 arguments: a `value`, then *the same value* `valueAgain`, and then the target object. Indeed, the same value appears in the arguments twice.

That's for compatibility with `Map` where the callback passed `forEach` has three arguments. Looks a bit strange, for sure. But may help to replace `Map` with `Set` in certain cases with ease, and vice versa.

The same methods `Map` has for iterators are also supported:

- `set.keys()` -- returns an iterable object for values,
- `set.values()` -- same as `set.keys()`, for compatibility with `Map`,
- `set.entries()` -- returns an iterable object for entries `[value, value]`, exists for compatibility with `Map`.

## Summary

`Map` -- is a collection of keyed values.

Methods and properties:

- `new Map([iterable])` -- creates the map, with optional `iterable` (e.g. array) of `[key,value]` pairs for initialization.
- `map.set(key, value)` -- stores the value by the key.
- `map.get(key)` -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- `map.has(key)` -- returns `true` if the `key` exists, `false` otherwise.
- `map.delete(key)` -- removes the value by the key.
- `map.clear()` -- removes everything from the map.
- `map.size` -- returns the current element count.

The differences from a regular `Object`:

- Any keys, objects can be keys.
- Additional convenient methods, the `size` property.

`Set` -- is a collection of unique values.

Methods and properties:

- `new Set([iterable])` -- creates the set, with optional `iterable` (e.g. array) of values for initialization.
- `set.add(value)` -- adds a value (does nothing if `value` exists), returns the set itself.
- `set.delete(value)` -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- `set.has(value)` -- returns `true` if the value exists in the set, otherwise `false`.
- `set.clear()` -- removes everything from the set.
- `set.size` -- is the elements count.

Iteration over `Map` and `Set` is always in the insertion order, so we can't say that these collections are unordered, but we can't reorder elements or directly get an element by its number.
