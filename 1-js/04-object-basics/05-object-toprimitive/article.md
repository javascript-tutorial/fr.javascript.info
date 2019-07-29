
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

<<<<<<< HEAD
L'algorithme de conversion s'appelle `ToPrimitive` dans la [specification](https://tc39.github.io/ecma262/#sec-toprimitive). Il est appelé avec un "indice" qui spécifie le type de conversion.

Il existe trois variantes :
=======
There are three variants of type conversion, so-called "hints", described in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive):
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

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

**Pour effectuer la conversion, JavaScript essaie de trouver et d'appeler trois méthodes d'objet :**

<<<<<<< HEAD
1. Appeler `obj[Symbol.toPrimitive](hint)` si la méthode existe,
2. Sinon, si l'indice est `"string"`
    - essaie `obj.toString()` et `obj.valueOf()`, tout ce qui existe.
3. Sinon, si l'indice est `"number"` ou `"default"`
    - essaie `obj.valueOf()` et `obj.toString()`, tout ce qui existe.
=======
1. Call `obj[Symbol.toPrimitive](hint)` - the method with the symbolic key `Symbol.toPrimitive` (system symbol), if such method exists,
2. Otherwise if hint is `"string"`
    - try `obj.toString()` and `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try `obj.valueOf()` and `obj.toString()`, whatever exists.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

## Symbol.toPrimitive

Commençons par la première méthode. Il existe un symbole intégré appelé `Symbol.toPrimitive` qui devrait être utilisé pour nommer la méthode de conversion, comme ceci :

```js
obj[Symbol.toPrimitive] = function(hint) {
<<<<<<< HEAD
  // retourne une valeur primitive
  // hint = un parmi "string", "number", "default"
}
=======
  // must return a primitive value
  // hint = one of "string", "number", "default"
};
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
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

Par exemple, ici `user` fait la même chose que ci-dessus en combinant `toString` et `valueOf` :

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

<<<<<<< HEAD
Souvent, nous voulons un seul endroit "fourre-tout" pour gérer toutes les conversions primitives. Dans ce cas, nous pouvons implémenter `toString` uniquement, comme ceci :
=======
As we can see, the behavior is the same as the previous example with `Symbol.toPrimitive`.

Often we want a single "catch-all" place to handle all primitive conversions. In this case, we can implement `toString` only, like this:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

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

Il n'y a pas de control pour vérifier si `ToString()` renvoie exactement une chaîne de caractères ou si la méthode `Symbol.toPrimitive` renvoie un nombre pour un indice "number".

**La seule chose obligatoire : ces méthodes doivent renvoyer une primitive, pas un objet.**

```smart header="Notes historiques"
Pour des raisons historiques, si `toString` ou `valueOf` renvoie un objet, il n’y a pas d’erreur, mais cette valeur est ignorée (comme si la méthode n’existait pas). C’est parce que jadis, il n’existait pas de bon concept "d’erreur" en JavaScript.

En revanche, `Symbol.toPrimitive` doit renvoyer une primitive, sinon une erreur se produira.
```

## Autres opérations

<<<<<<< HEAD
Une opération qui a initié la conversion obtient cette primitive, puis continue à travailler avec elle, en appliquant d'autres conversions si nécessaire.
=======
An operation that initiated the conversion gets the primitive, and then continues to work with it, applying further conversions if necessary.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

Par exemple :

<<<<<<< HEAD
- Les opérations mathématiques (sauf binaire plus) effectuent la conversion `ToNumber` :

```js run
let obj = {
toString() { // toString gère toutes les conversions en l'absence d'autres méthodes
    return "2";
  }
};

alert(obj * 2); // 4, ToPrimitive donne "2", ensuite cela devient 2
```

- Le binaire plus vérifie la primitive -- s’il s’agit d’une chaîne de caractères, il effectue une concaténation, sinon il exécute `ToNumber` et fonctionne avec les nombres.

    Exemple de chaîne de caractères :
=======
- Mathematical operations, except binary plus, convert the primitive to a number:

    ```js run
    let obj = {
      // toString handles all conversions in the absence of other methods
      toString() {
        return "2";
      }
    };

    alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
    ```

- Binary plus will concatenate strings in the same situation:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
    ```js run
    let obj = {
      toString() {
        return "2";
      }
    };

    alert(obj + 2); // 22 (ToPrimitive returned string => concatenation)
    ```

<<<<<<< HEAD
    Exemple de nombre :
    ```js run
    let obj = {
      toString() {
        return true;
      }
    };

    alert(obj + 2); // 3 (ToPrimitive returned boolean, not string => ToNumber)
    ```

```smart header="Notes historiques"
Pour des raisons historiques, les méthodes `toString` ou `valueOf` *doivent* renvoyer une primitive : si l’une d’elles renvoie un objet, il n’ya pas d’erreur, mais cet objet est ignoré (comme si la méthode n’existait pas).

En revanche, `Symbol.toPrimitive` *doit* renvoyer une primitive, sinon il y aura une erreur.
```

## Résumé
=======
## Summary
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

La conversion objet à primitive est appelée automatiquement par de nombreuses fonctions intégrées et opérateurs qui attendent une primitive en tant que valeur.

<<<<<<< HEAD
Il en existe 3 types (hints) :
- `"string"` (pour `alert` et autres conversions de chaînes de caractères)
- `"number"` (pour des maths)
- `"default"` (peu d'opérateurs)
=======
There are 3 types (hints) of it:
- `"string"` (for `alert` and other operations that need a string)
- `"number"` (for maths)
- `"default"` (few operators)
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

La spécification décrit explicitement quel opérateur utilise quel indice (hint). Très peu d’opérateurs "ne savent pas à quoi s’attendre" et utilisent l'indice `"default"`. Habituellement, pour les objets intégrés, l'indice `"default"` est traité de la même façon que `"number"`, de sorte qu'en pratique, les deux derniers sont souvent fusionnés.

L'algorithme de conversion est :

1. Appeler `obj[Symbol.toPrimitive](hint)` si la méthode existe,
2. Sinon, si l'indice est `"string"`
    - essaie `obj.toString()` et `obj.valueOf()`, tout ce qui existe.
3. Sinon, si l'indice est `"number"` ou `"default"`
    - essaie `obj.valueOf()` et `obj.toString()`, tout ce qui existe.

En pratique, il suffit souvent d’implémenter uniquement `obj.toString()` en tant que méthode "fourre-tout" pour toutes les conversions qui renvoient une représentation "lisible par l’homme" d’un objet, à des fins de journalisation ou de débogage.
