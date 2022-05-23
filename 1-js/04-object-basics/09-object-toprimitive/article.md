
# Conversion d'objet en primitive

Que se passe-t-il lorsque des objets sont ajoutés `obj1 + obj2`, soustraits `obj1 - obj2` ou imprimés à l'aide de `alert (obj)` ?

<<<<<<< HEAD
JavaScript ne permet pas exactement de personnaliser le fonctionnement des opérateurs sur les objets. Contrairement à certains autres langages de programmation, tels que Ruby ou C++, nous ne pouvons pas implémenter une méthode objet spéciale pour gérer un ajout (ou d'autres opérateurs).
=======
JavaScript doesn't allow you to customize how operators work on objects. Unlike some other programming languages, such as Ruby or C++, we can't implement a special object method to handle addition (or other operators).
>>>>>>> d5e8b6d308869738bd1f08dde62b64c969b0673e

Dans le cas de telles opérations, les objets sont auto-convertis en primitives, puis l'opération est effectuée sur ces primitives et aboutit à une valeur primitive.

<<<<<<< HEAD
C'est une limitation importante, car le résultat de `obj1 + obj2` ne peut pas être un autre objet !
=======
That's an important limitation: the result of `obj1 + obj2` (or another math operation) can't be another object!
>>>>>>> d5e8b6d308869738bd1f08dde62b64c969b0673e

Par exemple. nous ne pouvons pas créer d'objets représentant des vecteurs ou des matrices (ou des réalisations ou autre), les ajouter et s'attendre à un objet "sommé" comme résultat. De telles prouesses architecturales sont automatiquement "hors jeu".

<<<<<<< HEAD
Donc, parce que nous ne pouvons pas faire grand-chose ici, il n'y a pas de maths avec des objets dans de vrais projets. Lorsque cela se produit, c'est généralement à cause d'une erreur de codage.
=======
So, because we can't technically do much here, there's no maths with objects in real projects. When it happens, with rare exceptions, it's because of a coding mistake.
>>>>>>> d5e8b6d308869738bd1f08dde62b64c969b0673e

Dans ce chapitre, nous verrons comment un objet se convertit en primitif et comment le personnaliser.

Nous avons deux objectifs :

1. Cela nous permettra de comprendre ce qui se passe en cas d'erreur de codage, lorsqu'une telle opération s'est produite accidentellement.
2. Il existe des exceptions, où de telles opérations sont possibles et semblent bonnes. Par exemple. soustraire ou comparer des dates (objets `Date`). Nous les verrons plus tard.

## Règles de conversion

Dans le chapitre <info:type-conversions> nous avons vu les règles pour les conversions numériques, chaînes et booléennes de primitives. Mais nous avions mis de côté les objets. Maintenant que nous connaissons les méthodes et les symboles, il devient possible de l'aborder.

<<<<<<< HEAD
Pour les objets, il n’y a pas de conversion to-boolean, car tous les objets sont `true` dans un contexte booléen. Il n'y a donc que des conversions de chaînes de caractères et de chiffres.

1. Tous les objets sont `true` dans un contexte booléen. Il n'y a que des conversions numériques et de chaînes de caractères.
2. La conversion numérique se produit lorsque nous soustrayons des objets ou appliquons des fonctions mathématiques. Par exemple, les objets `Date` (à traiter dans le chapitre <info:date>) peut être soustrait et le résultat de `date1 - date2` est la différence de temps entre deux dates.
3. En ce qui concerne la conversion de chaîne de caractères - cela se produit généralement lorsque nous affichons un objet tel que `alert (obj)` et dans des contextes similaires.


Nous pouvons affiner la conversion de chaînes de caractères et de chiffres en utilisant des méthodes d’objet spéciales.
=======
1. There's no conversion to boolean. All objects are `true` in a boolean context, as simple as that. There exist only numeric and string conversions.
2. The numeric conversion happens when we subtract objects or apply mathematical functions. For instance, `Date` objects (to be covered in the chapter <info:date>) can be subtracted, and the result of `date1 - date2` is the time difference between two dates.
3. As for the string conversion -- it usually happens when we output an object with `alert(obj)` and in similar contexts.

We can implement string and numeric conversion by ourselves, using special object methods.

Now let's get into technical details, because it's the only way to cover the topic in-depth.

## Hints

How does JavaScript decide which conversion to apply?

There are three variants of type conversion, that happen in various situations. They're called "hints", as described in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive):
>>>>>>> d5e8b6d308869738bd1f08dde62b64c969b0673e

Il existe trois variantes de conversion de type, appelées "hints", décrites dans la [specification](https://tc39.github.io/ecma262/#sec-toprimitive) :


**`"string"`**

Pour une conversion d'un objet vers une chaîne de caractères, lorsque nous effectuons une opération sur un objet qui attend une chaîne, comme `alert` :

```js
// output
alert(obj);

// utiliser un objet comme clé de propriété
anotherObj[obj] = 123;
```


**`"number"`**

Pour une conversion d'objet en nombre, comme lorsque nous faisons des calculs :

```js
// conversion explicite
let num = Number(obj);

// maths (except binary plus)
let n = +obj; // unary plus
let delta = date1 - date2;

// comparaison supérieur/inférieur
let greater = user1 > user2;
```

    Most built-in mathematical functions also include such conversion.

`"default"`
: Se produit dans de rares cas où l'opérateur n'est "pas sûr" du type auquel il doit s'attendre.

<<<<<<< HEAD
    Par exemple, le binaire plus `+` peut fonctionner à la fois avec des chaînes de caractères (les concaténer) et des nombres (les ajouter), donc les chaînes de caractères et les chiffres feraient l'affaire. Donc, si le plus binaire obtient un objet sous forme d'argument, il utilise l'indicateur `"default"` pour le convertir.
=======
    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them). So if a binary plus gets an object as an argument, it uses the `"default"` hint to convert it.
>>>>>>> d5e8b6d308869738bd1f08dde62b64c969b0673e

    En outre, si un objet est comparé à l'aide de `==` avec une chaîne de caractères, un nombre ou un symbole, il est également difficile de savoir quelle conversion doit être effectuée, par conséquent l'indicateur `"default"` est utilisé.

    ```js
    // binary plus uses the "default" hint
    let total = obj1 + obj2;

    // obj == number uses the "default" hint
    if (user == 1) { ... };
    ```

    Les opérateurs de comparaison supérieurs et inférieurs, tels que `<` `>`, peuvent également fonctionner avec des chaînes de caractères et des nombres. Néanmoins, ils utilisent l'indicateur `"number"`, pas `default`. C'est pour des raisons historiques,

<<<<<<< HEAD
    En pratique cependant, nous n'avons pas besoin de nous souvenir de ces détails particuliers, car tous les objets intégrés, à l'exception d'un cas (l'objet `Date`, nous l'apprendrons plus tard), implémentent la conversion `'default'` de la même manière que `"number"`. Et nous pouvons faire la même chose.

```smart header="Pas d'indice `\"boolean\"`"
Veuillez noter qu'il n'y a que trois indices. C'est aussi simple que cela.

Il n'y a pas d'indice "boolean" (tous les objets sont `true` dans un contexte booléen) ou autre chose. Et si nous traitons de la même manière `'default'` et `'number'`, comme le font la plupart des programmes intégrés, il n'y a au final que deux conversions.
```
=======
In practice though, things are a bit simpler.

All built-in objects except for one case (`Date` object, we'll learn it later) implement `"default"` conversion the same way as `"number"`. And we probably should do the same.

Still, it's important to know about all 3 hints, soon we'll see why.
>>>>>>> d5e8b6d308869738bd1f08dde62b64c969b0673e

**Pour effectuer la conversion, JavaScript essaie de trouver et d'appeler trois méthodes d'objet :**

<<<<<<< HEAD
1. Appeler `obj[Symbol.toPrimitive](hint)` - la méthode avec la clé symbolique `Symbol.toPrimitive` (symbole système), si une telle méthode existe,
2. Sinon, si l'indice est `"string"`
    - essaie `obj.toString()` et `obj.valueOf()`, tout ce qui existe.
3. Sinon, si l'indice est `"number"` ou `"default"`
    - essaie `obj.valueOf()` et `obj.toString()`, tout ce qui existe.
=======
1. Call `obj[Symbol.toPrimitive](hint)` - the method with the symbolic key `Symbol.toPrimitive` (system symbol), if such method exists,
2. Otherwise if hint is `"string"`
    - try calling `obj.toString()` or `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try calling `obj.valueOf()` or `obj.toString()`, whatever exists.
>>>>>>> d5e8b6d308869738bd1f08dde62b64c969b0673e

## Symbol.toPrimitive

Commençons par la première méthode. Il existe un symbole intégré appelé `Symbol.toPrimitive` qui devrait être utilisé pour nommer la méthode de conversion, comme ceci :

```js
obj[Symbol.toPrimitive] = function(hint) {
  // voici le code pour convertir cet objet en une primitive
  // il doit retourner une valeur primitive
  // hint = un de "string", "number", "default"
};
```

Si la méthode `Symbol.toPrimitive` existe, elle est utilisée pour tous les hints et aucune autre méthode n'est nécessaire.

Par exemple, ici l'objet `user` l'implémente :

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// conversions demo:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

<<<<<<< HEAD
Comme on peut le voir d'après le code, `user` devient une chaîne de caractères auto-descriptive ou un montant d'argent en fonction de la conversion. La méthode unique `user[Symbol.toPrimitive]` gère tous les cas de conversion.

=======
As we can see from the code, `user` becomes a self-descriptive string or a money amount, depending on the conversion. The single method `user[Symbol.toPrimitive]` handles all conversion cases.
>>>>>>> d5e8b6d308869738bd1f08dde62b64c969b0673e

## toString / valueOf

S'il n'y a pas de `Symbol.toPrimitive` alors JavaScript essaie de trouver les méthodes `toString` et `valueOf` :

<<<<<<< HEAD
- Pour le hint "string" : `toString`, et s'il n'existe pas, alors `valueOf` (donc `toString` a la priorité pour les conversions de chaînes de caractères).
- Pour d'autres hints : `valueOf`, et s'il n'existe pas, alors `toString` (donc `valueOf` a la priorité pour les mathématiques).
=======
- For the `"string"` hint: call `toString` method, and if it doesn't exist, then `valueOf` (so `toString` has the priority for string conversions).
- For other hints: `valueOf`, and if it doesn't exist, then `toString` (so `valueOf` has the priority for maths).
>>>>>>> d5e8b6d308869738bd1f08dde62b64c969b0673e

Les méthodes `toString` et `valueOf` viennent des temps anciens. Ce ne sont pas des symboles (les symboles n'existaient pas il y a si longtemps), mais plutôt des méthodes nommées par des chaînes de caractères "normales". Ils fournissent une alternative "à l'ancienne" pour implémenter la conversion.

Ces méthodes doivent renvoyer une valeur primitive. Si `toString` ou `valueOf` renvoie un objet, il est ignoré (comme s'il n'y avait pas de méthode).

Par défaut, un objet brut a les méthodes `toString` et `valueOf` suivantes :

- La méthode `toString` renvoie une chaîne de caractères `"[object Object]"`.
- La méthode `valueOf` renvoie l'objet en question.

Voici la démo :

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

Donc, si nous essayons d'utiliser un objet en tant que chaîne de caractères, comme dans un `alert` ou autre chose, nous voyons par défaut `[object Object]`.

Et la valeur par défaut `valueOf` n'est mentionnée ici que par souci d'exhaustivité, afin d'éviter toute confusion. Comme vous pouvez le constater, l'objet lui-même est renvoyé et est donc ignoré. Ne me demandez pas pourquoi, c'est pour des raisons historiques. Nous pouvons donc supposer que cela n'existe pas.

Implémentons ces méthodes pour personnaliser la conversion.

Par exemple, ici, `user` fait la même chose que ci-dessus en combinant `toString` et `valueOf` au lieu de `Symbol.toPrimitive` :

```js run
let user = {
  name: "John",
  money: 1000,

  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // pour hint="number" ou "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

Comme on peut le constater, le comportement est identique à celui de l'exemple précédent avec `Symbol.toPrimitive`.

Nous voulons souvent un seul endroit "fourre-tout" pour gérer toutes les conversions primitives. Dans ce cas, nous pouvons implémenter `toString` uniquement, comme ceci :

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

En l'absence de `Symbol.toPrimitive` et de `valueOf`, `toString` gérera toutes les conversions primitives.

### Une conversion peut renvoyer n'importe quel type primitif

La chose importante à savoir sur toutes les méthodes de conversion de primitives est qu'elles ne renvoient pas nécessairement la primitive "hinted".

<<<<<<< HEAD
Il n'y a pas de control pour vérifier si `ToString()` renvoie exactement une chaîne de caractères ou si la méthode `Symbol.toPrimitive` renvoie un nombre pour un indice `"number"`.
=======
There is no control whether `toString` returns exactly a string, or whether `Symbol.toPrimitive` method returns a number for the hint `"number"`.
>>>>>>> d5e8b6d308869738bd1f08dde62b64c969b0673e

**La seule chose obligatoire : ces méthodes doivent renvoyer une primitive, pas un objet.**

```smart header="Notes historiques"
Pour des raisons historiques, si `toString` ou `valueOf` renvoie un objet, il n’y a pas d’erreur, mais cette valeur est ignorée (comme si la méthode n’existait pas). C’est parce que jadis, il n’existait pas de bon concept "d’erreur" en JavaScript.

<<<<<<< HEAD
En revanche, `Symbol.toPrimitive` doit renvoyer une primitive, sinon une erreur se produira.
=======
In contrast, `Symbol.toPrimitive` is stricter, it *must* return a primitive, otherwise there will be an error.
>>>>>>> d5e8b6d308869738bd1f08dde62b64c969b0673e
```

## Autres conversions

Comme nous le savons déjà, de nombreux opérateurs et fonctions effectuent des conversions de types, par exemple la multiplication `*` convertit les opérandes en nombres.

<<<<<<< HEAD
Si nous passons un objet en argument, il y a deux étapes :
1. L'objet est converti en primitive (en utilisant les règles décrites ci-dessus).
2. Si la primitive résultante n'est pas du bon type, elle est convertie.
=======
If we pass an object as an argument, then there are two stages of calculations:
1. The object is converted to a primitive (using the rules described above).
2. If the necessary for further calculations, the resulting primitive is also converted.
>>>>>>> d5e8b6d308869738bd1f08dde62b64c969b0673e

Par exemple :

```js run
let obj = {
  // toString gère toutes les conversions en l'absence d'autres méthodes
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, objet converti en primitive "2", puis la multiplication le transforme en un nombre
```

1. La multiplication `obj * 2` convertit d'abord l'objet en primitive (cela devient une chaîne de caractère `"2"`).
2. Ensuite `"2" * 2` devient `2 * 2` (la chaîne de caractères est convertie en nombre).

Le binaire plus va concaténer des chaînes de caractères dans la même situation, car il accepte volontiers une chaîne de caractères :

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22 ("2" + 2), la conversion en primitive a renvoyé une chaîne de caractères => concaténation
```

## Résumé

La conversion objet à primitive est appelée automatiquement par de nombreuses fonctions intégrées et opérateurs qui attendent une primitive en tant que valeur.

<<<<<<< HEAD
Il en existe 3 types (hints) :
- [ ] `"string"` (pour `alert` et d'autres opérations qui nécessitent une chaîne de caractères)
- `"number"` (pour des maths)
- `"default"` (peu d'opérateurs)

La spécification décrit explicitement quel opérateur utilise quel indice (hint). Très peu d’opérateurs "ne savent pas à quoi s’attendre" et utilisent l'indice `"default"`. Habituellement, pour les objets intégrés, l'indice `"default"` est traité de la même façon que `"number"`, de sorte qu'en pratique, les deux derniers sont souvent fusionnés.
=======
There are 3 types (hints) of it:
- `"string"` (for `alert` and other operations that need a string)
- `"number"` (for maths)
- `"default"` (few operators, usually objects implement it the same way as `"number"`)

The specification describes explicitly which operator uses which hint.
>>>>>>> d5e8b6d308869738bd1f08dde62b64c969b0673e

L'algorithme de conversion est :

<<<<<<< HEAD
1. Appeler `obj[Symbol.toPrimitive](hint)` si la méthode existe,
2. Sinon, si l'indice est `"string"`
    - essaie `obj.toString()` et `obj.valueOf()`, tout ce qui existe.
3. Sinon, si l'indice est `"number"` ou `"default"`
    - essaie `obj.valueOf()` et `obj.toString()`, tout ce qui existe.

En pratique, il suffit souvent d'implémenter uniquement `obj.toString()` comme méthode "fourre-tout" pour les conversions de chaînes de caractères qui devraient renvoyer une représentation "lisible par l'homme" d'un objet, à des fins de journalisation ou de débogage.

En ce qui concerne les opérations mathématiques, JavaScript ne fournit pas de moyen de les "remplacer" à l'aide de méthodes, de sorte que les projets réels les utilisent rarement sur des objets.
=======
1. Call `obj[Symbol.toPrimitive](hint)` if the method exists,
2. Otherwise if hint is `"string"`
    - try calling `obj.toString()` or `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try calling `obj.valueOf()` or `obj.toString()`, whatever exists.

All these methods must return a primitive to work (if defined).

In practice, it's often enough to implement only `obj.toString()` as a "catch-all" method for string conversions that should return a "human-readable" representation of an object, for logging or debugging purposes.
>>>>>>> d5e8b6d308869738bd1f08dde62b64c969b0673e
