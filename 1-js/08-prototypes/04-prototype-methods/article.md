
# Méthodes de prototypes, objets sans __proto__

Dans le premier chapitre de cette section, nous avons indiqué qu'il existe des méthodes modernes pour configurer un prototype.

<<<<<<< HEAD
Le `__proto__` est considéré comme dépassée et quelque peu obsolète (dans la partie de la norme JavaScript réservée au navigateur).

Les méthodes modernes sont:

- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- crée un objet vide avec un `proto` donné en tant que `[[Prototype]]` et des descripteurs de propriété facultatifs.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- retourne le `[[Prototype]]` of `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- configure le  `[[Prototype]]` de `obj` à `proto`.

Ceux-ci devraient être utilisés à la place de `__proto__`.
=======
Setting or reading the prototype with `obj.__proto__` is considered outdated and somewhat deprecated (moved to the so-called "Annex B" of the JavaScript standard, meant for browsers only).

The modern methods to get/set a prototype are:

- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto`.

The only usage of `__proto__`, that's not frowned upon, is as a property when creating a new object: `{ __proto__: ... }`.

Although, there's a special method for this too:

- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- creates an empty object with given `proto` as `[[Prototype]]` and optional property descriptors.
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c

Par exemple:

```js run
let animal = {
  eats: true
};

// créer un nouvel objet avec animal comme prototype
*!*
let rabbit = Object.create(animal); // same as {__proto__: animal}
*/!*

alert(rabbit.eats); // true

*!*
alert(Object.getPrototypeOf(rabbit) === animal); // true
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // change le prototype de rabbit en {}
*/!*
```

<<<<<<< HEAD
`Object.create` a un deuxième argument facultatif: les descripteurs de propriété. Nous pouvons fournir des propriétés supplémentaires au nouvel objet, comme ceci:
=======
The `Object.create` method is a bit more powerful, as it has an optional second argument: property descriptors.

We can provide additional properties to the new object there, like this:
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c

```js run
let animal = {
  eats: true
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

alert(rabbit.jumps); // true
```

Les descripteurs sont dans le même format que décrit dans le chapitre <info:property-descriptors>.

Nous pouvons utiliser `Object.create` pour effectuer un clonage d'objet plus puissant que la copie des propriétés dans la boucle `for..in`:

```js
let clone = Object.create(
  Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
);
```

Cet appel crée une copie véritablement exacte de `obj`, y compris de toutes les propriétés: énumérable et non, des propriétés de données et des accesseurs/mutateurs - tout, et avec le bon `[[Prototype]]`.

<<<<<<< HEAD
## Bref historique

Si on compte tous les moyens de gérer `[[Prototype]]`, il y en a beaucoup! De nombreuses façons de faire la même chose !

Pourquoi ?
=======

## Brief history

There're so many ways to manage `[[Prototype]]`. How did that happen? Why?
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c

C'est pour des raisons historiques.

<<<<<<< HEAD
- La propriété `"prototype"` d'une fonction constructeur fonctionne depuis très longtemps.
- Plus tard dans l'année 2012 : `Object.create` est apparu dans le standard. Cela permettait de créer des objets avec le prototype donné, mais ne permettait pas d'y accéder/muter. Les navigateurs ont donc implémenté un accesseur non standard `__proto__` qui permettait d'accéder/muter un prototype à tout moment.
- Plus tard, dans l'année 2015 : `Object.setPrototypeOf` et `Object.getPrototypeOf` ont été ajoutés dans le standard pour exécuter la même fonctionnalité que `__proto__`. Comme `__proto__` était implémenté de facto partout, il était en quelque sorte obsolète et passait à l'Annexe B de la norme, qui est facultative pour les environnements autres que les navigateurs.

Pour l'instant, nous avons tous ces moyens à notre disposition.

Pourquoi `__proto__` a-t-il été remplacé par les fonctions `getPrototypeOf/setPrototypeOf`? C'est une question intéressante, qui nous oblige à comprendre pourquoi `__proto__` est mauvais. Lisez la suite pour obtenir la réponse.
=======
The prototypal inheritance was in the language since its dawn, but the ways to manage it evolved over time.

- The `prototype` property of a constructor function has worked since very ancient times. It's the oldest way to create objects with a given prototype.
- Later, in the year 2012, `Object.create` appeared in the standard. It gave the ability to create objects with a given prototype, but did not provide the ability to get/set it. Some browsers implemented the non-standard `__proto__` accessor that allowed the user to get/set a prototype at any time, to give more flexibility to developers.
- Later, in the year 2015, `Object.setPrototypeOf` and `Object.getPrototypeOf` were added to the standard, to perform the same functionality as `__proto__`. As `__proto__` was de-facto implemented everywhere, it was kind-of deprecated and made its way to the Annex B of the standard, that is: optional for non-browser environments.
- Later, in the year 2022, it was officially allowed to use `__proto__` in object literals `{...}` (moved out of Annex B), but not as a getter/setter `obj.__proto__` (still in Annex B).

Why was `__proto__` replaced by the functions `getPrototypeOf/setPrototypeOf`?

Why was `__proto__` partially rehabilitated and its usage allowed in `{...}`, but not as a getter/setter?

That's an interesting question, requiring us to understand why `__proto__` is bad.

And soon we'll get the answer.
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c

```warn header="Ne changez pas `[[Prototype]]` sur des objets existants si la vitesse est importante"
Techniquement, nous pouvons accéder/muter `[[Prototype]]` à tout moment. Mais en général, nous ne le définissons qu’une fois au moment de la création de l’objet, puis nous ne modifions pas : `rabbit` hérite de `animal`, et cela ne changera pas.

Et les moteurs JavaScript sont hautement optimisés pour cela. Changer un prototype "à la volée" avec `Object.setPrototypeOf` ou `obj.__ proto __=` est une opération très lente, elle rompt les optimisations internes pour des opérations d'accès aux propriétés d'objet. Alors évitez-la à moins que vous ne sachiez ce que vous faites, ou que la vitesse de JavaScript n'a pas d'importance pour vous.
```

## Objets "très simples" [#very-plain]

Comme nous le savons, les objets peuvent être utilisés en tant que tableaux associatifs pour stocker des paires clé/valeur.

...Mais si nous essayons de stocker des clés *fournies par l'utilisateur* (par exemple, un dictionnaire saisi par l'utilisateur), nous verrons un petit problème intéressant: toutes les clés fonctionnent très bien, sauf `"__proto __"`.

Découvrez l'exemple:

```js run
let obj = {};

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // [object Object], pas "some value"!
```

<<<<<<< HEAD
Ici, si l'utilisateur tape `__proto__`, l'assignation est ignorée!

Cela ne devrait pas nous surprendre. La propriété `__proto__` est spéciale: elle doit être un objet ou` null`. Une chaîne de caractères ne peut pas devenir un prototype.
=======
Here, if the user types in `__proto__`, the assignment in line 4 is ignored!

That could surely be surprising for a non-developer, but pretty understandable for us. The `__proto__` property is special: it must be either an object or `null`. A string can not become a prototype. That's why an assignment a string to `__proto__` is ignored.
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c

Mais nous n'avions pas * l'intention * de mettre en œuvre un tel comportement, non? Nous voulons stocker des paires clé / valeur, et la clé nommée `"__proto __"` n'a pas été correctement enregistrée. Donc c'est un bug!

<<<<<<< HEAD
Ici les conséquences ne sont pas terribles. Mais dans d'autres cas, nous pouvons attribuer des valeurs d'objet, le prototype peut en effet être modifié. En conséquence, l'exécution se déroulera de manière totalement inattendue.
=======
Here the consequences are not terrible. But in other cases we may be storing objects instead of strings in `obj`, and then the prototype will indeed be changed. As a result, the execution will go wrong in totally unexpected ways.
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c

Ce qui est pire -- généralement les développeurs ne pensent pas du tout à cette possibilité. Cela rend ces bugs difficiles à remarquer et même à les transformer en vulnérabilités, en particulier lorsque JavaScript est utilisé côté serveur.

<<<<<<< HEAD
Des choses inattendues peuvent également se produire lors de l'attribution à `toString`, qui est une fonction par défaut, et d'autres méthodes intégrées.
=======
Unexpected things also may happen when assigning to `obj.toString`, as it's a built-in object method.
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c

Comment pouvons-nous éviter ce problème ?

<<<<<<< HEAD
Tout d'abord, nous pouvons simplement passer à l'utilisation de `Map` pour le stockage au lieu d'objets simples, puis tout va bien.

Mais `Object` peut également bien nous servir ici, car les créateurs du langage ont réfléchi à ce problème il y a longtemps.

`__proto__` n'est pas une propriété d'un objet, mais un accesseur de propriété de `Object.prototype`:
=======
First, we can just switch to using `Map` for storage instead of plain objects, then everything's fine:

```js run
let map = new Map();

let key = prompt("What's the key?", "__proto__");
map.set(key, "some value");

alert(map.get(key)); // "some value" (as intended)
```

...But `Object` syntax is often more appealing, as it's more concise.

Fortunately, we *can* use objects, because language creators gave thought to that problem long ago.

As we know, `__proto__` is not a property of an object, but an accessor property of `Object.prototype`:
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c

![](object-prototype-2.svg)

Ainsi, si `obj.__ proto__` est lu ou muté, l'accésseur/mutateur correspondant est appelé à partir de son prototype et il accède/mute `[[Prototype]] `.

Comme il a été dit au début de cette section de tutoriel: `__proto__` est un moyen d'accéder `[[Prototype]] `, il n'est pas `[[Prototype]]` lui-même.

Maintenant, si nous avons l'intention d'utiliser un objet comme tableau associatif et de ne pas avoir de tels problèmes, nous pouvons le faire avec une petite astuce :

```js run
*!*
let obj = Object.create(null);
// or: obj = { __proto__: null }
*/!*

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // "some value"
```

`Object.create(null)` crée un objet vide sans prototype (`[[Prototype]]` est `null`):

![](object-prototype-null.svg)

Donc, il n'y a pas d'accésseur/mutateur hérité pour `__proto__`. Maintenant, il est traité comme une propriété de données normale, ainsi l'exemple ci-dessus fonctionne correctement.

Nous pouvons appeler de tels objets des objets "très simples" ou "dictionnaire pur", car ils sont encore plus simples que les objets simples ordinaires `{...}`.
Nous pouvons appeler ces objets "très simple" car ils sont encore plus simples qu'un objet ordinaire `{...}`.

L'inconvénient est que de tels objets ne possèdent aucune méthode d'objet intégrée, par exemple `toString`:

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Error (pas de toString)
```

...Mais c'est généralement acceptable pour les tableaux associatifs.

Notez que la plupart des méthodes liées aux objets sont `Object.quelquechose(...)`, comme `Object.keys(obj)` - elles ne sont pas dans le prototype, elles continueront donc à travailler sur de tels objets:

```js run
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";

alert(Object.keys(chineseDictionary)); // hello,bye
```

## Résumé

<<<<<<< HEAD
Les méthodes modernes pour configurer et accéder directement au prototype sont les suivantes :

- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- crée un objet vide avec un `proto` donné en tant que `[[Prototype]]` (peut être `null`) et des descripteurs de propriété facultatifs.
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) -- retourne le `[[Prototype]]` de `obj` (identique au getter `__proto__`).
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) -- configure le `[[Prototype]]` de `obj` à `proto` (identique au setter `__proto__`).

Le getter/setter `__proto__` intégré est dangereux si nous souhaitons placer les clés générées par l'utilisateur dans un objet. Tout simplement parce qu'un utilisateur peut entrer `"__proto __"` comme clé, et il y aura une erreur, avec des conséquences légères, espérons-le, mais généralement imprévisibles.

Nous pouvons donc utiliser `Object.create(null)` pour créer un objet "très simple" sans `"__proto__"` ou nous en tenir à des objets `Map` pour cela.

En outre, `Object.create` fournit un moyen simple de copier superficiellement un objet avec tous les descripteurs:
=======
- To create an object with the given prototype, use:

    - literal syntax: `{ __proto__: ... }`, allows to specify multiple properties
    - or [Object.create(proto, [descriptors])](mdn:js/Object/create), allows to specify property descriptors.

    The `Object.create` provides an easy way to shallow-copy an object with all descriptors:

    ```js
    let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    ```
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c

- Modern methods to get/set the prototype are:

<<<<<<< HEAD
Nous avons également précisé que `__proto__` est un accésseur/mutateur pour `[[Prototype]]` et réside dans `Object.prototype`, tout comme les autres méthodes.

Nous pouvons créer un objet sans prototype avec `Object.create(null)`. De tels objets sont utilisés comme "dictionnaires purs", ils n'ont aucun problème avec `"__proto __"` comme clé.

Autres méthodes:

- [Object.keys(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/keys) / [Object.values(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/values) / [Object.entries(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/entries) -- retourne un tableau de paires nom / propriété / clé-valeur de propriété de chaîne de caractères énumérable.
- [Object.getOwnPropertySymbols(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/getOwnPropertySymbols) -- renvoie un tableau de toutes les clés symboliques.
- [ ] [Object.getOwnPropertyNames(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/getOwnPropertyNames) -- renvoie un tableau de toutes les clés de chaîne de caractères.
- [Reflect.ownKeys(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Reflect/ownKeys) -- renvoie un tableau de toutes les clés.
- [obj.hasOwnProperty(key)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/hasOwnProperty): renvoie `true` si `obj` a sa propre clé (non héritée) appelée `key`.

Toutes les méthodes qui renvoient des propriétés d'objet (comme `Object.keys` et autres) - renvoient leurs propres propriétés. Si nous voulons les hérités, alors nous pouvons utiliser `for..in`.
=======
    - [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj` (same as `__proto__` getter).
    - [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto` (same as `__proto__` setter).

- Getting/setting the prototype using the built-in `__proto__` getter/setter isn't recommended, it's now in the Annex B of the specification.

- We also covered prototype-less objects, created with `Object.create(null)` or `{__proto__: null}`.

    These objects are used as dictionaries, to store any (possibly user-generated) keys.

    Normally, objects inherit built-in methods and `__proto__` getter/setter from `Object.prototype`, making corresponding keys "occupied" and potentially causing side effects. With `null` prototype, objects are truly empty.
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c
