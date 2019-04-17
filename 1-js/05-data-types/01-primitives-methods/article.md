# Méthodes des primitives

JavaScript nous permet de travailler avec des primitives (chaînes de caractères, nombres, etc.) comme s'il s'agissait d'objets.

ils prévoient également des méthodes pour les appeler en tant que tel. Nous étudierons cela très bientôt, mais nous verrons d'abord comment cela fonctionne car, bien entendu, les primitives ne sont pas des objets ( et nous allons rendre cela plus clair).

Examinons les principales différences entre primitives et objets.

Une primitive
- Est une valeur de type primitif.
- Il existe 6 types primitifs: `chaîne de caractères`, `nombre`, `booléen`, `symbole`, `null` et `undefined`.

Un objet
- Est capable de stocker plusieurs valeurs en tant que propriétés.
- Peut être crée avec `{}`, par exemple:`{name:"John", age: 30}`. Il existe d'autres types d'objets en JavaScript; les fonctions, par exemple, sont des objets.

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

Nous avons donc crée un objet `john` avec la méthode `sayHI`.

De nombreux objets intégrés existent déjà, tels que ceux qui fonctionnent avec des dates, des erreurs, des éléments HTML, etc. Ils ont des propriétés et des méthodes différente.

Mais, ces fonctionnalités ont un coût!

Les objets sont "plus lourds" que les primitives. Ils ont besoin de ressources supplémentaires pour soutenir le mécanisme interne. Mais comme les propriétés et les méthodes sont très utiles en programmation, les moteurs JavaScript tentent de les optimiser pour réduire la charge supplémentaire.

## Une primitive en tant qu'objet

Voici le paradoxe auquel est confronté le créateur de JavaScript:

- Il y a beaucoup de choses que l'on voudrait faire avec une primitive telle qu'une chaîne de caractères ou un nombre. Ce serait génial d'y avoir accès avec des méthodes.
- Les primitives doivent être aussi rapides et légères que possible.

La solution semble peu commode, mais la voici:

1. Les primitives sont toujours primitives. Une seule valeur, au choix.
2. Le langage permet d'accéder aux méthodes et aux propriétés des chaînes de caractères, des nombres, des booléens et des symboles.
3. Lorsque cela se produit, un "wrapper d'objet" (conteneur)  spécial est crée pour fournir la fonctionnalité supplémentaire, puis est détruit.

Les "wrapper d'objets" (conteneurs) sont différents pour chaque type de primitive et sont appelés: `String`, `Number`, `Boolean` et `Symbol`. Ainsi, ils fournissent différents ensembles de méthodes.

Par exemple, il existe une méthode [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) qui renvoie une chaîne de caractères en majuscule. 

Voici comment ça fonctionne:

```js run
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
```

Simple, non? Voici ce qui se passe réellement dans `str.toUpperCase()`:

1. La chaîne de caractères `str` est une primitive. Ainsi, au moment d'accéder à sa propriété, un objet spécial est crée, qui connaît la valeur de la chaîne de caractères et possède des méthodes utiles, comme `toUpperCase()`. 
2. Cette méthode s'exécute et retourne une nouvelle chaîne de caractères (indiquée par `alert`).
3. L'objet spécial est détruit, laissant le primitif `str` seul.

Les primitives peuvent donc fournir des méthodes, mais elles restent légères.

Le moteur JavaScript optimise fortement ce processus. il peut même ignorer la création de l'objet supplémentaire. Mais il doit toujours adhérer à la spécification et se comporter comme s'il en crée une.

Un nombre a ses propres méthodes, par exemple, [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) arrondit le nombre à la précision indiquée:

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

Nous verrons des méthodes plus spécifiques dans les chapitres [Nombres](https://javascript.info/number) et [Chaînes de caractères](https://javascript.info/string).


````warn header="Les constructeurs `String/Number/Boolean` sont réservés à un usage interne."
Certains langages comme Java nous permettent de créer des "wrapper d'objet" (conteneur) pour les primitives en utilisant explicitement une syntaxe telle que `new Number(1)` ou `new Boolean (false)`.

En JavaScript, cela est également possible pour des raisons historique, mais fortement **déconseillé**. Cela peut très vite se compliquer à plusieurs endroits.

Par exemple:

```js run
alert( typeof 1 ); // "number"

alert( typeof new Number(1) ); // "object"!
```

Ici `zéro` est un objet, alors l'alerte s'affichera:
```js run
let zero = new Number(0);

if (zero) { // zero est true, parce que c'est un objet
  alert( "zero est vrai?!?" );
}
```

Par ailleurs, utiliser les mêmes fonctions `Chaîne / Nombre / Booléen` sans `new` est une chose totalement valide et même recommandée. Ils convertissent une valeur dans le type correspondant: une chaîne de caractères, un nombre ou un booléen (primitive).

Par exemple, ceci est entièrement valide:
```js
let num = Number("123"); // convertir une chaîne de caractères en nombre
```


````warn header="null/undefined n'ont pas de méthode"
Les primitives spéciales null et undefined sont des exceptions. Elles n'ont pas de "wrapper d'objet" (conteneur) correspondants et ne fournissent aucune méthode. En un sens, elles sont "les plus primitives".

Une tentative d'accès à une propriété d'une telle valeur donnerait l'erreur suivante:

```js run
alert(null.test); // error

## Sommaire

- Les primitives sauf null et undefined fournissent de nombreuses méthodes utiles. Nous étudierons cela dans les prochains chapitres.
- Officiellement, ces méthodes fonctionnent via des objets temporaires, mais les moteurs JavaScript sont bien ajustés pour optimiser cela en interne, elles ne sont donc pas coûteuses à appeler.
