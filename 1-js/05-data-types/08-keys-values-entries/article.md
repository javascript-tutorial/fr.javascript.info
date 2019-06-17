# Object.keys, values, entries

<<<<<<< HEAD
Éloignons-nous des structures de données individuelles et parlons des itérations les concernant.
=======
Let's step away from the individual data structures and talk about the iterations over them.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

Dans le chapitre précédent, nous avons vu les méthodes `map.keys()`, `map.values()`, `map.entries()`.

<<<<<<< HEAD
Ces méthodes sont génériques, il existe un accord commun pour les utiliser dans les structures de données. Si jamais nous créons notre propre structure de données, nous devrions aussi les implémenter.
=======
These methods are generic, there is a common agreement to use them for data structures. If we ever create a data structure of our own, we should implement them too.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

Ils sont pris en charge par:

- `Map`
- `Set`
- `Array` (sauf `arr.values()`)

Les objets simples prennent également en charge des méthodes similaires, mais la syntaxe est un peu différente.

## Object.keys, values, entries

Pour les objets simples, les méthodes suivantes sont disponibles:

- [Object.keys(obj)](mdn:js/Object/keys) -- retourne un tableau de clés.
- [Object.values(obj)](mdn:js/Object/values) -- retourne un tableau de valeurs.
- [Object.entries(obj)](mdn:js/Object/entries) -- retourne un tableau de paires `[clé, valeur]`.

...Mais s'il vous plaît noter les différences (par rapport à map par exemple):

|             | Map              | Object       |
|-------------|------------------|--------------|
| Syntaxe d'appel | `map.keys()`  | `Object.keys(obj)`, mais pas `obj.keys()` |
| Retours     | iterable    | "vrai" Array                     |

La première différence est que nous devons appeler `Object.keys(obj)` et non `obj.keys()`.

Pourquoi ça? La principale raison est la flexibilité. N'oubliez pas que les objets sont une base de toutes les structures complexes en JavaScript. Ainsi, nous pouvons avoir un objet de notre propre `order` qui implémente sa propre méthode `order.values()`. Et nous pouvons toujours appeler `Object.values(order)` dessus.

La seconde différence réside dans le fait que les méthodes `Object.*` retourne de "réels" objets de tableau, et pas seulement des objets itératifs. C'est principalement pour des raisons historiques.

Par exemple:

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = [name, age]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

Voici un exemple d'utilisation d'`Object.values` pour boucler les valeurs de propriété:

```js run
let user = {
  name: "John",
  age: 30
};

// boucle sur les valeurs
for (let value of Object.values(user)) {
  alert(value); // John, ensuite 30
}
```

<<<<<<< HEAD
## Object.keys/values/entries ignorer les propriétés symboliques

Tout comme une boucle `for..in`, ces méthodes ignorent les propriétés qui utilisent `Symbol(...)` comme clés.

D'habitude c'est pratique. Mais si nous voulons aussi des clés symboliques, il existe une méthode distincte [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) qui retourne un tableau composé uniquement de clés symboliques. De plus, la méthde [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) renvoie *toutes* les clés.
=======
```warn header="Object.keys/values/entries ignore symbolic properties"
Just like a `for..in` loop, these methods ignore properties that use `Symbol(...)` as keys.

Usually that's convenient. But if we want symbolic keys too, then there's a separate method [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) that returns an array of only symbolic keys. Also, there exist a method [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys.
```

## Object.fromEntries to transform objects

Sometimes we need to perform a transformation of an object to `Map` and back.

We already have `new Map(Object.entries(obj))` to make a `Map` from `obj`.

The syntax of `Object.fromEntries` does the reverse. Given an array of `[key, value]` pairs, it creates an object:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Let's see practical applications.

For example, we'd like to create a new object with double prices from the existing one.

For arrays, we have `.map` method that allows to transform an array, but nothing like that for objects.

So we can use a loop:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = {};
for(let [product, price] of Object.entries(prices)) {
  doublePrices[product] = price * 2;
}

alert(doublePrices.meat); // 8
```

...Or we can represent the object as an `Array` using `Object.entries`, then perform the operations with `map` (and potentially other array methods), and then go back using `Object.fromEntries`.

Let's do it for our object:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // convert to array, map, and then fromEntries gives back the object
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
*/!*

alert(doublePrices.meat); // 8
```   

It may look difficult from the first sight, but becomes easy to understand after you use it once or twice.

We also can use `fromEntries` to get an object from `Map`.

E.g. we have a `Map` of prices, but we need to pass it to a 3rd-party code that expects an object.

Here we go:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map);

// now obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```
>>>>>>> 027933531e121650120f7e8385f691de99af12d2
