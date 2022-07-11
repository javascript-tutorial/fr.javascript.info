
# Type symbole

<<<<<<< HEAD
Par spécification, les clés de propriété d'objet peuvent être de type chaîne de caractères ou de type symbole. Pas des nombres, pas des booléens, uniquement des chaînes de caractères ou des symboles.

Jusqu'à présent, nous n'avons vu que des chaînes de caractères. Voyons maintenant les avantages que les symboles peuvent nous apporter.
=======
By specification, only two primitive types may serve as object property keys:

- string type, or
- symbol type.

Otherwise, if one uses another type, such as number, it's autoconverted to string. So that `obj[1]` is the same as `obj["1"]`, and `obj[true]` is the same as `obj["true"]`.

Until now we've been using only strings.

Now let's explore symbols, see what they can do for us.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

## Symboles

Un “Symbol” représente un identifiant unique.

Une valeur de ce type peut être créée en utilisant `Symbol()` :

```js
<<<<<<< HEAD
// id est un nouveau symbole
let id = Symbol();
```

Lors de la création, nous pouvons donner à symbole une description (également appelée nom de symbole), particulièrement utile pour le débogage :
=======
let id = Symbol();
```

Upon creation, we can give symbols a description (also called a symbol name), mostly useful for debugging purposes:
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

```js
// id est un symbole avec la description "id"
let id = Symbol("id");
```

<<<<<<< HEAD
Les symboles sont garantis d'être uniques. Même si nous créons beaucoup de symboles avec la même description, ce sont des valeurs différentes. La description est juste une étiquette qui n’affecte rien.
=======
Symbols are guaranteed to be unique. Even if we create many symbols with exactly the same description, they are different values. The description is just a label that doesn't affect anything.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

Par exemple, voici deux symboles avec la même description -- ils ne sont pas égaux :

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Si vous connaissez Ruby ou un autre langage qui comporte également une sorte de "symboles", attention à ne pas vous tromper. Les symboles JavaScript sont différents.

<<<<<<< HEAD
````warn header="Les symboles ne se convertissent pas automatiquement en chaîne de caractères"
La plupart des valeurs de JavaScript prennent en charge la conversion implicite en chaîne de caractères. Par exemple, nous pouvons `alert` presque toutes les valeurs et cela fonctionnera. Les symboles sont spéciaux. Ils ne se convertissent pas automatiquement.
=======
So, to summarize, a symbol is a "primitive unique value" with an optional description. Let's see where we can use them.

````warn header="Symbols don't auto-convert to a string"
Most values in JavaScript support implicit conversion to a string. For instance, we can `alert` almost any value, and it will work. Symbols are special. They don't auto-convert.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

Par exemple, cette `alert` affichera une erreur :

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Impossible de convertir une valeur de symbole en chaîne de caractères
*/!*
```
C'est un "garde du langage" contre les erreurs, parce que les chaînes de caractères et les symboles sont fondamentalement différents et ne doivent accidentellement pas être convertis les uns en les autres. 

<<<<<<< HEAD
Si nous voulons vraiment afficher un symbole, nous devons appeler `.toString()` dessus, comme ici :
=======
That's a "language guard" against messing up, because strings and symbols are fundamentally different and should not accidentally convert one into another.

If we really want to show a symbol, we need to explicitly call `.toString()` on it, like here:

>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), maintenant ça marche
*/!*
```
<<<<<<< HEAD
Ou récupérer la propriété  `symbol.description` pour afficher la description uniquement :
=======

Or get `symbol.description` property to show the description only:

>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## Propriétés "cachées"

<<<<<<< HEAD
Les symboles nous permettent de créer des propriétés "cachées" d'un objet, qu'aucune autre partie du code ne peut accéder accidentellement ou écraser.
=======

Symbols allow us to create "hidden" properties of an object, that no other part of code can accidentally access or overwrite.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

Par exemple, si nous travaillons avec des objets `user` qui appartiennent à un code tiers, nous aimerions leur ajouter des identificateurs.

Utilisons une clé symbole pour cela :

```js run
let user = { // belongs to another code
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // nous pouvons accéder aux données en utilisant le symbole comme clé
```

Quel est l’avantage de l’utilisation de `Symbol("id")` sur une chaîne de caractères `"id"` ?

<<<<<<< HEAD
Poussons un peu plus loin l’exemple pour voir cela.

Comme les objets `user` appartiennent à un autre code et que ce code fonctionne également avec eux, nous ne devrions pas simplement y ajouter de champs. C’est dangereux. Cependant, il est parfois impossible d’accéder à un symbole. Mais un symbole ne peut pas être accédé accidentellement, le code tiers ne le verra probablement même pas, il est donc probablement correct de le faire.
=======
As `user` objects belong to another codebase, it's unsafe to add fields to them, since we might affect pre-defined behavior in that other codebase. However, symbols cannot be accessed accidentally. The third-party code won't be aware of newly defined symbols, so it's safe to add symbols to the `user` objects.

Also, imagine that another script wants to have its own identifier inside `user`, for its own purposes.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

Imaginez qu'un autre script veuille avoir son propre identifiant à l'intérieur de `user`, pour sa propre utilisation. Cela peut être une autre bibliothèque JavaScript, donc les scripts ne sont absolument pas conscients les uns des autres.

Ensuite, ce script peut créer son propre `symbol("id")`, comme ceci :

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

Il n'y aura pas de conflit entre nos identificateurs et les leurs, car les symboles sont toujours différents, même s'ils portent le même nom.

Notez que si nous utilisions une chaîne de caractère `"id"` au lieu d'un symbole dans le même but, il y *aurait* un conflit :


```js
let user = { name: "John" };

// Notre script utilise la propriété "id"
user.id = "Our id value";

// ...Un autre script veut aussi "id" pour ses besoins …

user.id = "Their id value"
// Boom! écrasé par un autre script!
```

### Symboles dans un objet littéral

Si nous voulons utiliser un symbole dans un objet littéral `{...}`, nous avons besoin de crochets.

Comme ceci :

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // pas "id": 123
*/!*
};
```
C’est parce que nous avons besoin de la valeur de la variable `id` comme clé, pas de la chaîne de caractères "id".

### Les symboles sont ignorés par for…in

Les propriétés symboliques ne participent pas à la boucle `for..in`.

Par exemple :

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // name, age (pas de symboles)
*/!*

<<<<<<< HEAD
// l'accès direct par le symbole fonctionne
alert( "Direct: " + user[id] );
=======
// the direct access by the symbol works
alert( "Direct: " + user[id] ); // Direct: 123
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523
```

[Object.keys(user)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) les ignore également. Cela fait partie du principe général du "dissimulation des propriétés symboliques". Si un autre script ou une bibliothèque parcourt notre objet, il n’accédera pas de manière inattendue à une propriété symbolique.

En revanche, [Object.assign](mdn:js/Object/assign) copie les propriétés de chaîne de caractères et de symbole :

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

Il n’y a pas de paradoxe ici. C'est par conception. L'idée est que lorsque nous clonons un objet ou que nous fusionnons des objets, nous souhaitons généralement que *toutes* les propriétés soient copiées (y compris les symboles tels que `id`).

## Symboles globaux

Comme nous l’avons vu, habituellement tous les symboles sont différents, même s’ils portent les mêmes noms. Mais parfois, nous voulons que les symboles portant le même nom soient les mêmes entités. Par exemple, différentes parties de notre application veulent accéder au symbole `"id"` qui signifie exactement la même propriété.

Pour cela, il existe un *registre de symboles global*. Nous pouvons créer des symboles et y accéder ultérieurement, ce qui garantit que les accès répétés portant le même nom renvoient exactement le même symbole.

Pour lire (créer en cas d'absence) un symbole du registre, utilisez `Symbol.for(key)`.

Cet appel vérifie le registre global et, s’il existe un symbole décrit comme `key`, le renvoie, sinon il crée un nouveau symbole `Symbol(key)` et le stocke dans le registre avec la `key` donnée.

Par exemple :

```js run
// lit le registre global
let id = Symbol.for("id"); // si le symbole n'existait pas, il est créé

// relit le registre (peut-être à partir d'une autre partie du code)
let idAgain = Symbol.for("id");

// le même symbole
alert( id === idAgain ); // true
```

Les symboles à l'intérieur de ce registre sont appelés *symboles globaux*. Si nous voulons un symbole à l’échelle de l’application, accessible partout dans le code, c’est ce moyen que nous allons utiliser.

```smart header="Cela ressemble à Ruby"
Dans certains langages de programmation, comme Ruby, il existe un seul symbole par nom.

<<<<<<< HEAD
Comme nous pouvons le constater, en JavaScript, c’est bien pour les symboles globaux.
=======
In JavaScript, as we can see, that's true for global symbols.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523
```

### Symbol.keyFor

<<<<<<< HEAD
Pour les symboles globaux, pas seulement `Symbol.for(key)` renvoie un symbole par son nom, mais il existe un appel inversé : `Symbol.keyFor(sym)`, cela fait l'inverse: retourne un nom par un symbole global.
=======
We have seen that for global symbols, `Symbol.for(key)` returns a symbol by name. To do the opposite -- return a name by global symbol -- we can use: `Symbol.keyFor(sym)`:
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

Par exemple :

```js run
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// obtenir le nom par symbole
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

`Symbol.keyFor` utilise en interne le registre de symboles global pour rechercher la clé du symbole. Donc, cela ne fonctionne pas pour les symboles non globaux. Si le symbole n’est pas global, il ne pourra pas le trouver et retournera `undefined`.

<<<<<<< HEAD
Cela dit, tous les symboles ont la propriété `description`.
=======
That said, all symbols have the `description` property.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

Par exemple :

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, not global

alert( localSymbol.description ); // name
```

## System symbols

Il existe de nombreux "systèmes" symboles que JavaScript utilise en interne et que nous pouvons utiliser pour affiner divers aspects de nos objets.

Ils sont listés dans la documentation [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) : 

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- …etc.

Par exemple, `Symbol.toPrimitive` nous permet de décrire une conversion d’objet en primitive. Nous verrons son utilisation très bientôt.

Nous nous familiariserons également avec d’autres symboles lorsque nous étudierons les caractéristiques du langage correspondantes.

## Résumé

`Symbol` est un type primitif pour les identificateurs uniques.

Les symboles sont créés avec l'appel `Symbol()` ainsi qu'une description facultative.

Les symboles sont toujours de valeurs différentes, même s'ils portent le même nom. Si nous voulons que les symboles portant le même nom soient égaux, nous devons utiliser le registre global : `Symbol.for(key)` renvoie (crée si nécessaire) un symbole global avec `key` comme nom. 
Les multiples appels de `Symbol.for` avec la même `key` renvoient exactement le même symbole.

Les symboles ont deux principaux cas d'utilisation :

<<<<<<< HEAD
1. Propriétés d'objet "masquées".
    Si nous voulons ajouter une propriété à un objet qui "appartient" à un autre script ou à une librairie, nous pouvons créer un symbole et l'utiliser comme clé de propriété. Une propriété symbolique n’apparait pas dans `for..in`, elle ne sera donc pas traitée accidentellement avec d'autres propriétés. De plus, elle ne sera pas accessible directement, car un autre script n’a pas notre symbole. Ainsi, la propriété sera protégée contre une utilisation accidntelle ou un écrasement.
=======
1. "Hidden" object properties.

    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

    Ainsi, nous pouvons "dissimuler" quelque chose dans des objets dont nous avons besoin, mais que les autres ne devraient pas voir, en utilisant des propriétés symboliques.

2. De nombreux symboles système utilisés par JavaScript sont accessibles en tant que `Symbol.*`. Nous pouvons les utiliser pour modifier certains comportements internes. Par exemple, plus tard dans le tutoriel, nous utiliserons `Symbol.iterator` pour [iterables](info:iterable), `Symbol.toPrimitive` etc.

<<<<<<< HEAD
Techniquement, les symboles ne sont pas cachés à 100%. Il y a une méthode intégrée [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) qui nous permet d’obtenir tous les symboles. Il y a aussi une méthode nommée [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) qui renvoie *toutes* les clés d'un objet, y compris celles symboliques. Donc, ils ne sont pas vraiment cachés. Mais la plupart des bibliothèques, fonctions intégrées et structures de syntaxe n'utilisent pas ces méthodes.
=======
Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys of an object including symbolic ones. But most libraries, built-in functions and syntax constructs don't use these methods.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523
