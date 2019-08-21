# Object.keys, values, entries

Éloignons-nous des structures de données individuelles et parlons des itérations les concernant.

Dans le chapitre précédent, nous avons vu les méthodes `map.keys()`, `map.values()`, `map.entries()`.

Ces méthodes sont génériques, il existe une convention de les utiliser pour les structures de données. Si nous devions créer notre propre structure de données, nous devrions aussi les implémenter.

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

```warn header="Object.keys/values/entries ignorer les propriétés symboliques"

Tout comme une boucle `for..in`, ces méthodes ignorent les propriétés qui utilisent `Symbol(...)` comme clés.

D'habitude c'est pratique. Mais si nous voulons aussi des clés symboliques, il existe une méthode distincte [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) qui retourne un tableau composé uniquement de clés symboliques. De plus, la méthde [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) renvoie *toutes* les clés.
```

## Object.fromEntries pour transformer des objets

Nous avons parfois besoin de transformer un objet en `Map` et de revenir en arrière.

Nous avons déjà `new Map(Object.entries(obj))` pour faire un `Map` à partir de `obj`.

La syntaxe de `Object.fromEntries` fait l'inverse. Étant donné un tableau de paire `[key, value]`, cela crée un objet :

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Voyons les applications pratiques.

Par exemple, nous aimerions créer un nouvel objet avec un double prix par rapport à celui existant.

Pour les tableaux, nous avons la méthode `.map` qui permet de transformer un tableau, mais rien de tel pour les objets.

Nous pouvons donc utiliser une boucle :

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

… Ou nous pouvons représenter l'objet sous forme de `Array` à l'aide de `Object.entries`, puis effectuer les opérations avec `map` (et éventuellement d'autres méthodes de tableau), puis revenir en arrière à l'aide de `Object.fromEntries`.

Faisons-le pour notre objet :

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // convertir en tableau, mapper, puis fromEntries restitue l'objet
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
*/!*

alert(doublePrices.meat); // 8
```   

Cela peut sembler difficile au premier abord, mais cela devient facile à comprendre après l’avoir utilisé une ou deux fois.

Nous pouvons également utiliser `fromEntries` pour obtenir un objet depuis `Map`.

Par exemple. nous avons un `Map` des prix, mais nous devons le transmettre à un code tiers qui attend un objet.

Allons-y :

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map);

// now obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```
