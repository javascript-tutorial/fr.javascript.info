
# Conversion d'objet en primitive

Que se passe-t-il lorsque des objets sont ajoutés `obj1 + obj2`, soustraits `obj1 - obj2` ou imprimés à l'aide de `alert (obj)` ?

Dans ce cas, les objets sont automatiquement convertis en primitives, puis l'opération est effectuée.

Dans le chapitre <info:type-conversions> nous avons vu les règles pour les conversions numériques, chaînes et booléennes de primitives. Mais nous avions mis de côté les objets. Maintenant que nous connaissons les méthodes et les symboles, il devient possible de l'aborder.

Pour les objets, il n’y a pas de conversion to-boolean, car tous les objets sont `true` dans un contexte booléen. Il n'y a donc que des conversions de chaînes de caractères et de chiffres.

1. Tous les objets sont `true` dans un contexte booléen. Il n'y a que des conversions numériques et de chaînes de caractères.
2. La conversion numérique se produit lorsque nous soustrayons des objets ou appliquons des fonctions mathématiques. Par exemple, les objets `Date` (à traiter dans le chapitre <info:date>) peut être soustrait et le résultat de `date1 - date2` est la différence de temps entre deux dates.
3. En ce qui concerne la conversion de chaîne de caractères - cela se produit généralement lorsque nous affichons un objet tel que `alert (obj)` et dans des contextes similaires.


## ToPrimitive

Nous pouvons affiner la conversion de chaînes de caractères et de chiffres en utilisant des méthodes d’objet spéciales.

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

`"default"`
: Se produit dans de rares cas où l'opérateur n'est "pas sûr" du type auquel il doit s'attendre.

<<<<<<< HEAD
Par exemple, le binaire plus `+` peut fonctionner à la fois avec des chaînes de caractères (les concaténer) et des nombres (les ajouter). Ou quand un objet est comparé en utilisant `==` avec une chaîne, un numéro ou un symbole, il est également difficile de savoir quelle conversation doit être faite.

```js
// binary plus
let total = car1 + car2;

// obj == string/number/symbol
if (user == 1) { ... };
```

L'opérateur supérieur / inférieur `<>` peut également utiliser des chaînes de caractères et des nombres. Néanmoins, il utilise un indice `"number"` non `"default"`. C’est pour des raisons historiques.

En pratique, tous les objets intégrés, à l'exception d'un cas (l'objet `Date`, nous l'apprendrons plus tard) implémentent la conversion `"default"` de la même manière que `"number"`. Et probablement nous devrions faire la même chose.

Veuillez noter qu'il n'y a que trois "hints" ("indices"). C'est simple. Il n'y a pas d'indice "booléen" (tous les objets sont vrais dans un contexte booléen) ou autre chose. Et si nous traitons `"default"` et `"number"` de la même manière, comme le font la plupart des programmes intégrés, il n'y a que deux conversions.
=======
    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them), so both strings and numbers would do. So if the a binary plus gets an object as an argument, it uses the `"default"` hint to convert it.

    Also, if an object is compared using `==` with a string, number or a symbol, it's also unclear which conversion should be done, so the `"default"` hint is used.

    ```js
    // binary plus uses the "default" hint
    let total = obj1 + obj2;

    // obj == number uses the "default" hint
    if (user == 1) { ... };
    ```

    The greater and less comparison operators, such as `<` `>`, can work with both strings and numbers too. Still, they use the `"number"` hint, not `"default"`. That's for historical reasons.

    In practice though, we don't need to remember these peculiar details, because all built-in objects except for one case (`Date` object, we'll learn it later) implement `"default"` conversion the same way as `"number"`. And we can do the same.

```smart header="No `\"boolean\"` hint"
Please note -- there are only three hints. It's that simple.

There is no "boolean" hint (all objects are `true` in boolean context) or anything else. And if we treat `"default"` and `"number"` the same, like most built-ins do, then there are only two conversions.
```
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

**Pour effectuer la conversion, JavaScript essaie de trouver et d'appeler trois méthodes d'objet :**

1. Appeler `obj[Symbol.toPrimitive](hint)` - la méthode avec la clé symbolique `Symbol.toPrimitive` (symbole système), si une telle méthode existe,
2. Sinon, si l'indice est `"string"`
    - essaie `obj.toString()` et `obj.valueOf()`, tout ce qui existe.
3. Sinon, si l'indice est `"number"` ou `"default"`
    - essaie `obj.valueOf()` et `obj.toString()`, tout ce qui existe.

## Symbol.toPrimitive

Commençons par la première méthode. Il existe un symbole intégré appelé `Symbol.toPrimitive` qui devrait être utilisé pour nommer la méthode de conversion, comme ceci :

```js
obj[Symbol.toPrimitive] = function(hint) {
  // doit renvoyer une valeur primitive
  // hint = un parmi "string", "number", "default"
};
```

Par exemple, ici l'objet `user` l'implémente :

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

Comme on peut le voir d'après le code, `user` devient une chaîne de caractères auto-descriptive ou un montant d'argent en fonction de la conversion. La méthode unique `user[Symbol.toPrimitive]` gère tous les cas de conversion.


## toString/valueOf

Méthodes `toString` et `valueOf` proviennent des temps anciens. Ce ne sont pas des symboles (les symboles n'existaient pas il n'y a pas si longtemps), mais plutôt des méthodes "régulières" avec des noms de chaînes de caractères. Ils fournissent une méthode alternative "à l'ancienne" pour implémenter la conversion.

S'il n'y a pas de `Symbol.toPrimitive`, alors JavaScript essaye de les trouver et essaie dans l'ordre :

- `toString -> valueOf` pour le hint "string".
- `valueOf -> toString` sinon.

<<<<<<< HEAD
Par exemple, ici `user` fait la même chose que ci-dessus en combinant `toString` et `valueOf` :
=======
These methods must return a primitive value. If `toString` or `valueOf` returns an object, then it's ignored (same as if there were no method).

By default, a plain object has following `toString` and `valueOf` methods:

- The `toString` method returns a string `"[object Object]"`.
- The `valueOf` method returns an object itself.

Here's the demo:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

So if we try to use an object as a string, like in an `alert` or so, then by default we see `[object Object]`.

And the default `valueOf` is mentioned here only for the sake of completeness, to avoid any confusion. As you can see, it returns the object itself, and so is ignored. Don't ask me why, that's for historical reasons. So we can assume it doesn't exist.

Let's implement these methods.

For instance, here `user` does the same as above using a combination of `toString` and `valueOf` instead of `Symbol.toPrimitive`:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

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

## Retourner des types

La chose importante à savoir sur toutes les méthodes de conversion de primitives est qu'elles ne renvoient pas nécessairement la primitive "hinted".

<<<<<<< HEAD
Il n'y a pas de control pour vérifier si `ToString()` renvoie exactement une chaîne de caractères ou si la méthode `Symbol.toPrimitive` renvoie un nombre pour un indice "number".
=======
There is no control whether `toString` returns exactly a string, or whether `Symbol.toPrimitive` method returns a number for a hint `"number"`.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

**La seule chose obligatoire : ces méthodes doivent renvoyer une primitive, pas un objet.**

```smart header="Notes historiques"
Pour des raisons historiques, si `toString` ou `valueOf` renvoie un objet, il n’y a pas d’erreur, mais cette valeur est ignorée (comme si la méthode n’existait pas). C’est parce que jadis, il n’existait pas de bon concept "d’erreur" en JavaScript.

En revanche, `Symbol.toPrimitive` doit renvoyer une primitive, sinon une erreur se produira.
```

<<<<<<< HEAD
## Autres opérations

Une opération qui a initié la conversion obtient cette primitive, puis continue à travailler avec elle, en appliquant d'autres conversions si nécessaire.
=======
## Further conversions

As we know already, many operators and functions perform type conversions, e.g. multiplication `*` converts operatnds to numbers.

If we pass an object as an argument, then there are two stages:
1. The object is converted to a primitive (using the rules described above).
2. If the resulting primitive isn't of the right type, it's converted.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

Par exemple :

<<<<<<< HEAD
- Les opérations mathématiques, sauf binaire plus, convertissent la primitive en nombre :

    ```js run
    let obj = {
      // toString gère toutes les conversions en l'absence d'autres méthodes
      toString() {
        return "2";
      }
    };

    alert(obj * 2); // 4, objet converti en primitive "2", puis multiplié par un nombre
    ```

- Le binaire plus va concaténer des chaînes dans la même situation :
    ```js run
    let obj = {
      toString() {
        return "2";
      }
    };

    alert(obj + 2); // 22 (la conversion en primitive a renvoyé une chaîne de caractères => concaténation)
    ```
=======
```js run
let obj = {
  // toString handles all conversions in the absence of other methods
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
```

1. The multiplication `obj * 2` first converts the object to primitive (that's a string `"2"`).
2. Then `"2" * 2` becomes `2 * 2` (the string is converted to number).

Binary plus will concatenate strings in the same situation, as it gladly accepts a string:

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22 ("2" + 2), conversion to primitive returned a string => concatenation
```
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

## Résumé

La conversion objet à primitive est appelée automatiquement par de nombreuses fonctions intégrées et opérateurs qui attendent une primitive en tant que valeur.

Il en existe 3 types (hints) :
- [ ] `"string"` (pour `alert` et d'autres opérations qui nécessitent une chaîne de caractères)
- `"number"` (pour des maths)
- `"default"` (peu d'opérateurs)

La spécification décrit explicitement quel opérateur utilise quel indice (hint). Très peu d’opérateurs "ne savent pas à quoi s’attendre" et utilisent l'indice `"default"`. Habituellement, pour les objets intégrés, l'indice `"default"` est traité de la même façon que `"number"`, de sorte qu'en pratique, les deux derniers sont souvent fusionnés.

L'algorithme de conversion est :

1. Appeler `obj[Symbol.toPrimitive](hint)` si la méthode existe,
2. Sinon, si l'indice est `"string"`
    - essaie `obj.toString()` et `obj.valueOf()`, tout ce qui existe.
3. Sinon, si l'indice est `"number"` ou `"default"`
    - essaie `obj.valueOf()` et `obj.toString()`, tout ce qui existe.

En pratique, il suffit souvent d’implémenter uniquement `obj.toString()` en tant que méthode "fourre-tout" pour toutes les conversions qui renvoient une représentation "lisible par l’homme" d’un objet, à des fins de journalisation ou de débogage.
