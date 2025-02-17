# Conversion d'objet en primitive

Que se passe-t-il lorsque des objets sont ajoutés `obj1 + obj2`, soustraits `obj1 - obj2` ou affichés à l'aide de `alert(obj)` ?

JavaScript ne permet pas de personnaliser le fonctionnement des opérateurs sur les objets. Contrairement à certains autres langages de programmation, tels que Ruby ou C++, nous ne pouvons pas implémenter une méthode objet spéciale pour gérer un ajout (ou d'autres opérateurs).

Dans le cas de telles opérations, les objets sont auto-convertis en primitives, puis l'opération est effectuée sur ces primitives et aboutit à une valeur primitive.

C'est une limitation importante, car le résultat de `obj1 + obj2` (ou toute autre opération mathématique) ne peut pas être un autre objet !

Par exemple nous ne pouvons pas créer d'objets représentant des vecteurs ou des matrices (ou des réalisations ou autre), les ajouter et s'attendre à un objet "sommé" comme résultat. De telles prouesses architecturales sont automatiquement "hors jeu".

Donc, parce que nous ne pouvons pas faire grand-chose ici, il n'y a pas de maths avec des objets dans de vrais projets. Lorsque cela se produit, c'est généralement à cause d'une erreur de programmation.

Dans ce chapitre, nous verrons comment un objet se convertit en primitive et comment le personnaliser.

Nous avons deux objectifs :

1. Cela nous permettra de comprendre ce qui se passe en cas d'erreur de programmation, lorsqu'une telle opération s'est produite accidentellement.
2. Il existe des exceptions, où de telles opérations sont possibles et semblent bonnes. Par exemple, soustraire ou comparer des dates (objets `Date`). Nous les verrons plus tard.

## Règles de conversion

Dans le chapitre <info:type-conversions> nous avons vu les règles de conversion des types primitifs numériques, chaînes de caractères et booléens. Mais nous avions mis de côté les objets. Maintenant que nous connaissons les méthodes et les symboles, il devient possible de l'aborder.

1. Il n'y a pas de conversion en booléen. Tous les objets sont "true" dans un contexte booléen, aussi simple que cela. Il n'existe que des conversions numériques et de chaînes de caractères.
2. La conversion numérique se produit lorsque nous soustrayons des objets ou appliquons des fonctions mathématiques. Par exemple, les objets `Date` (à traiter dans le chapitre <info:date>) peut être soustrait et le résultat de `date1 - date2` est la différence de temps entre deux dates.
3. En ce qui concerne la conversion de chaîne de caractères, cela se produit généralement lorsque nous affichons un objet tel que `alert(obj)` et dans des contextes similaires.

Nous pouvons implémenter nous-mêmes la conversion de chaînes de caractères et de chiffres, en utilisant des méthodes d'objet spéciales.

Passons maintenant aux détails techniques, car c'est le seul moyen d'aborder le sujet en profondeur.

## Hints

Comment JavaScript décide-t-il quelle conversion appliquer ?

Il existe trois variantes de conversion de type, qui se produisent dans diverses situations. Ils sont appelés "hints" (indices), comme décrit dans la [spécification](https://tc39.github.io/ecma262/#sec-toprimitive) :

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

La plupart des fonctions mathématiques intégrées comprennent également ce type de conversion.

**`"default"`**

Se produit dans de rares cas où l'opérateur n'est "pas sûr" du type auquel il doit s'attendre.

Par exemple, le plus binaire `+` peut fonctionner à la fois avec des chaînes de caractères (les concaténer) et des nombres (les ajouter). Donc, si le plus binaire obtient un objet sous forme d'argument, il utilise le hint `"default"` pour le convertir.

En outre, si un objet est comparé à l'aide de `==` avec une chaîne de caractères, un nombre ou un symbole, il est également difficile de savoir quelle conversion doit être effectuée, par conséquent l'indicateur `"default"` est utilisé.

```js
// binary plus uses the "default" hint
let total = obj1 + obj2;

// obj == number uses the "default" hint
if (user == 1) { ... };
```

Les opérateurs de comparaison supérieurs et inférieurs, tels que `<` et `>`, peuvent également fonctionner avec des chaînes de caractères et des nombres. Néanmoins, ils utilisent l'indicateur `"number"`, pas `default`. C'est pour des raisons historiques.

En pratique cependant, les choses sont un peu plus simples.

Tous les objets intégrés à l'exception d'un cas (objet `Date`, nous l'apprendrons plus tard) implémentent la conversion `"default"` de la même manière que `"number"`. Et nous devrions probablement faire de même.

Pourtant, il est important de connaître les 3 hints, nous verrons bientôt pourquoi.

**Pour effectuer la conversion, JavaScript essaie de trouver et d'appeler trois méthodes d'objet :**

1. Appeler la méthode `obj[Symbol.toPrimitive](hint)` avec la clé symbolique `Symbol.toPrimitive` (symbole système), si une telle méthode existe.
2. Sinon, si l'indice est `"string"`, essaie d'appeler `obj.toString()` puis `obj.valueOf()`, selon ce qui existe.
3. Sinon, si l'indice est `"number"` ou `"default"`, essaie d'appeler `obj.valueOf()` puis `obj.toString()`, selon ce qui existe.

## Symbol.toPrimitive

Commençons par la première méthode. Il existe un symbole intégré appelé `Symbol.toPrimitive` qui devrait être utilisé pour nommer la méthode de conversion, comme ceci :

```js
obj[Symbol.toPrimitive] = function(hint) {
  // voici le code pour convertir cet objet en une primitive
  // il doit retourner une valeur primitive
  // hint = "string" ou "number" ou "default"
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

Comme on peut le voir d'après le code, `user` devient une chaîne de caractères auto-descriptive ou un montant d'argent en fonction de la conversion. La méthode unique `user[Symbol.toPrimitive]` gère tous les cas de conversion.

## toString / valueOf

S'il n'y a pas de `Symbol.toPrimitive` alors JavaScript essaie de trouver les méthodes `toString` et `valueOf` :

- Pour l'indice `"string"` : appel à la méthode `toString`, et si elle n'existe pas ou si elle renvoie un objet au lieu d'une valeur primitive, alors appel à `valueOf` (donc `toString` a la priorité pour la conversion  de chaînes de caractères).
- Pour les autres hints : appel à `valueOf`, et s'il n'existe pas ou s'il renvoie un objet au lieu d'une valeur primitive, alors appel à `toString` (donc `valueOf` a la priorité pour les mathématiques).

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

Il n'y a pas de control pour vérifier si `toString` renvoie exactement une chaîne de caractères ou si la méthode `Symbol.toPrimitive` renvoie un nombre pour le hint `"number"`.

**La seule chose obligatoire : ces méthodes doivent renvoyer une primitive, pas un objet.**

```smart header="Notes historiques"
Pour des raisons historiques, si `toString` ou `valueOf` renvoie un objet, il n’y a pas d’erreur, mais cette valeur est ignorée (comme si la méthode n’existait pas). C’est parce que jadis, il n’existait pas de bon concept "d’erreur" en JavaScript.

En revanche, `Symbol.toPrimitive` est plus strict, il *doit* retourner une primitive, sinon il y aura une erreur.
```

## Autres conversions

Comme nous le savons déjà, de nombreux opérateurs et fonctions effectuent des conversions de types, par exemple la multiplication `*` convertit les opérandes en nombres.

Si nous passons un objet en argument, il y a deux étapes de  calcul :

1. L'objet est converti en primitive (en utilisant les règles décrites ci-dessus).
2. Si cela est nécessaire pour d'autres calculs, la primitive résultante est également convertie.

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

Le plus binaire `+` va concaténer des chaînes de caractères dans la même situation, car il accepte volontiers une chaîne de caractères :

```js run
let obj = {
  toString() {
    return "2";
  }
};

<<<<<<< HEAD
alert(obj + 2); // 22 ("2" + 2), la conversion en primitive a renvoyé une chaîne de caractères => concaténation
=======
alert(obj + 2); // "22" ("2" + 2), conversion to primitive returned a string => concatenation
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```

## Résumé

La conversion objet à primitive est appelée automatiquement par de nombreuses fonctions intégrées et opérateurs qui attendent une primitive en tant que valeur.

Il en existe 3 types (hints) :

- `"string"` (pour `alert` et d'autres opérations qui nécessitent une chaîne de caractères)
- `"number"` (pour des maths)
- `"default"` (peu d'opérateurs, généralement les objets l'implémentent de la même manière que `"number"`)

La spécification décrit explicitement quel opérateur utilise quel hint.

L'algorithme de conversion est :

1. Appeler `obj[Symbol.toPrimitive](hint)` si la méthode existe,
2. Sinon, si l'indice est `"string"`, essaie `obj.toString()` puis `obj.valueOf()`, selon ce qui existe.
3. Sinon, si l'indice est `"number"` ou `"default"`, essaie `obj.valueOf()` puis `obj.toString()`, selon ce qui existe.

Toutes ces méthodes doivent renvoyer une primitive pour fonctionner (si elle est définie).

En pratique, il suffit souvent d'implémenter uniquement `obj.toString()` comme méthode "fourre-tout" pour les conversions de chaînes de caractères qui devraient renvoyer une représentation "lisible par l'homme" d'un objet, à des fins de journalisation ou de débogage.
