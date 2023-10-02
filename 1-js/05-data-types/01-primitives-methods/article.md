# Méthodes des primitives

JavaScript nous permet de travailler avec des primitives (chaînes de caractères, nombres, etc.) comme s'il s'agissait d'objets. Il fournit également des méthodes pour les appeler en tant que tel. Nous étudierons cela très bientôt, mais voyons d'abord comment cela fonctionne car, bien entendu, les primitives ne sont pas des objets (et nous allons rendre cela plus clair).

Examinons les principales différences entre primitives et objets.

Une primitive :

- Est une valeur de type primitif.
- Il existe 7 types primitifs : `string`, `number`, `bigint`, `boolean`, `symbol`, `null` et `undefined`.

Un objet :

- Est capable de stocker plusieurs valeurs en tant que propriétés.
- Peut être créé avec `{}`, par exemple : `{name: "John", age: 30}`. Il existe d'autres types d'objets en JavaScript. Les fonctions par exemple, sont des objets.

L'une des meilleurs choses à propos des objets est que nous pouvons stocker une fonction en tant que l'une de ses propriétés.

```js run
let john = {
  name: "John",
  sayHi: function() {
    alert("Hi buddy!");
  }
};

john.sayHi(); // Hi buddy!
```

Nous avons donc crée un objet `john` possèdant la méthode `sayHi`.

De nombreux objets intégrés existent déjà, tels que ceux qui fonctionnent avec des dates, des erreurs, des éléments HTML, etc. Ils ont des propriétés et des méthodes différentes.

Mais, ces fonctionnalités ont un coût !

Les objets sont "plus lourds" que les primitives. Ils ont besoin de ressources supplémentaires pour soutenir le mécanisme interne.

## Une primitive en tant qu'objet

Voici le paradoxe auquel est confronté le créateur de JavaScript :

- Il y a beaucoup de choses que l'on voudrait faire avec une primitive telle qu'une chaîne de caractères ou un nombre. Ce serait génial d'y avoir accès via des méthodes.
- Les primitives doivent être aussi rapides et légères que possible.

La solution semble peu commode, mais la voici :

1. Les primitives sont toujours primitives. Une seule valeur.
2. Le langage permet d'accéder aux méthodes et aux propriétés des chaînes de caractères, des nombres, des booléens et des symboles.
3. Pour que cela fonctionne, un "wrapper d'objet" (conteneur) spécial est crée pour fournir la fonctionnalité supplémentaire, puis il est détruit.

Les "wrapper d'objets" (conteneurs) sont différents pour chaque type de primitive et sont appelés `String`, `Number`, `Boolean` et `Symbol`. Ainsi, ils fournissent différents ensembles de méthodes.

Par exemple, il existe une méthode de string [str.toUpperCase()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) qui retourne une chaîne de caractères `str` en majuscule.

Voici comment ça fonctionne :

```js run
let str = "Hello";

alert(str.toUpperCase()); // HELLO
```

Simple, non? Voici ce qui se passe réellement dans `str.toUpperCase()`:

1. La chaîne de caractères `str` est une primitive. Ainsi, au moment d'accéder à sa propriété, un objet spécial est crée, qui connaît la valeur de la chaîne de caractères et possède des méthodes utiles, comme `toUpperCase()`.
2. Cette méthode s'exécute et retourne une nouvelle chaîne de caractères (indiquée par `alert`).
3. L'objet spécial est détruit, laissant le primitif `str` seul.

Les primitives peuvent donc fournir des méthodes, mais elles restent légères.

Le moteur JavaScript optimise fortement ce processus. Il peut même ignorer la création de l'objet supplémentaire. Mais il doit toujours adhérer à la spécification et se comporter comme s'il en crée un.

Un nombre a ses propres méthodes, par exemple, [toFixed(n)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) arrondit le nombre à la précision indiquée :

```js run
let n = 1.23456;

alert(n.toFixed(2)); // 1.23
```

Nous verrons des méthodes plus spécifiques dans les chapitres [Nombres](https://javascript.info/number) et [Chaînes de caractères](https://javascript.info/string).

````warn header="Les constructeurs `String`, `Number` et `Boolean` sont réservés à un usage interne."
Certains langages comme Java nous permettent de créer des "wrapper d'objet" (conteneur) pour les primitives en utilisant une syntaxe telle que `new Number(1)` ou `new Boolean(false)`.

En JavaScript, cela est également possible pour des raisons historique, mais fortement **déconseillé**. Cela peut très vite se compliquer à plusieurs endroits.

Par exemple :

```js run
alert(typeof 0); // "number"

alert(typeof new Number(0)); // "object"!
```

Les objets sont toujours vrais dans les `if`, alors l'alerte apparaîtra ici :

```js run
let zero = new Number(0);

if (zero) { // Zéro est vrai, parce que c'est un objet
  alert("zero is truthy!?!");
}
```

Par ailleurs, utiliser les mêmes fonctions `String`, `Number` et `Boolean` sans `new` est une chose totalement valide et même recommandée. Elles convertissent une valeur dans le type correspondant : une chaîne de caractères, un nombre ou un booléen (primitive).

Par exemple, ceci est entièrement valide :

```js
let num = Number("123"); // Convertir une chaîne de caractères en nombre
```
````

````warn header="`null` / `undefined` n'ont pas de méthode"
Les primitives spéciales `null` et `undefined` sont des exceptions. Elles n'ont pas de "wrapper d'objet" (conteneur) correspondants et ne fournissent aucune méthode. En un sens, elles sont "les plus primitives".

Une tentative d'accès à une propriété d'une telle valeur donnerait l'erreur suivante :

```js run
alert(null.test); // erreur
```
````

## Résumé

- Les primitives sauf `null` et `undefined` fournissent de nombreuses méthodes utiles. Nous étudierons cela dans les prochains chapitres.
- Officiellement, ces méthodes fonctionnent via des objets temporaires, mais les moteurs JavaScript sont bien ajustés pour optimiser cela en interne, elles ne sont donc pas coûteuses à appeler.