# Les types de données

Une variable en JavaScript peut contenir n'importe quelle donnée. Une variable peut à un moment être une chaîne  de caractères et recevoir plus tard une valeur numérique :

```js
// pas d'erreur
let message = "hello";
message = 123456;
```

Les langages de programmation qui permettent de telles choses sont appelés "typés dynamiquement", ce qui signifie qu'il existe des types de données, mais que les variables ne sont liées à aucun d'entre eux.

Il existe huit types de données de base en JavaScript. Nous étudierons ici les bases et dans les chapitres suivants, nous parlerons de chacun d’eux en détail.

## Number

```js
let n = 123;
n = 12.345;
```

Le type *number* sert à la fois à des nombres entiers et à des nombres à virgule flottante.

Il existe de nombreuses opérations pour les nombres, par ex. multiplication `*`, division `/`, addition `+`, soustraction `-` et ainsi de suite.

Outre les nombres réguliers, il existe des "valeurs numériques spéciales" qui appartiennent également à ce type: `Infinity`, `-Infinity` et `NaN`.

- `Infinity` répresente l'[Infini](https://fr.wikipedia.org/wiki/Infini) ∞ mathématique. C'est une valeur spéciale qui est plus grande que n'importe quel nombre.

    Nous pouvons l'obtenir à la suite d'une division par zéro :

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    Ou mentionnez-le simplement dans le code directement :

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` représente une erreur de calcul. C'est le résultat d'une opération mathématique incorrecte ou non définie, par exemple :

    ```js run
    alert( "pas un nombre" / 2 ); // NaN, une telle division est erronée
    ```

    `NaN` est contagieux. Toute autre opération sur `NaN` donnerait un `NaN` :

    ```js run
    alert( "pas un nombre" / 2 + 5 ); // NaN
    ```

    Donc, s'il y a `NaN` quelque part dans une expression mathématique, elle se propage à l'ensemble du résultat.

```smart header="Les opérations mathématiques sont sûres"
Faire des maths est sans danger en JavaScript. Nous pouvons faire n'importe quoi : diviser par zéro, traiter les chaînes non numériques comme des nombres, etc.

Le script ne s'arrêtera jamais avec une erreur fatale ("die"). Au pire, nous aurons `NaN` comme résultat.
```

Les valeurs numériques spéciales appartiennent formellement au type "number". Bien sûr, ce ne sont pas des nombres au sens commun de ce mot.

Nous allons en voir plus sur le travail avec les nombres dans le chapitre <info:number>.

## BigInt

En JavaScript, le type "number" ne peut pas représenter des valeurs entières supérieures à <code>2<sup>53</sup></code> (ou moins de <code>-2<sup>53</sup></code> pour les négatifs), c'est une limitation technique causée par leur représentation interne. Cela correspond à environ 16 chiffres décimaux. Ainsi, dans la plupart des cas, la limitation ne pose pas de problème, mais nous avons parfois besoin de très gros chiffres, par exemple pour les horodatages de cryptographie ou de précision à la microseconde.

`BigInt` a récemment été ajouté au langage pour représenter des entiers de longueur arbitraire.

Un `BigInt` est créé en ajoutant `n` à la fin d'un entier littéral :

```js
// le "n" à la fin signifie que c'est un BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

Comme les chiffres `BigInt` sont rarement nécessaires, nous leur avons consacré un chapitre dédié <info:bigint>.

```smart header="Problèmes de compatibilité"
Actuellement, `BigInt` est pris en charge dans Firefox et Chrome, mais pas dans Safari/IE/Edge.
```

## String

Une chaîne de caractères en JavaScript doit être entre guillemets.

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
```

En JavaScript, il existe 3 types de guillemets.

1. Double quotes: `"Hello"`.
2. Single quotes: `'Hello'`.
3. Backticks: <code>&#96;Hello&#96;</code>.

Les guillemets simples et doubles sont des guillemets "simples". Il n'y a pratiquement pas de différence entre eux en JavaScript.

Les backticks sont des guillemets "à fonctionnalité étendue". Ils nous permettent d’intégrer des variables et des expressions dans une chaîne en les encapsulant dans `${…}`, par exemple :

```js run
let name = "John";

// une variable encapsulée
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// une expression encapulée
alert( `the result is *!*${1 + 2}*/!*` ); // le résultat est 3
```

L'expression à l'intérieur de `${…}` est évaluée et le résultat devient une partie de la chaîne. On peut y mettre n'importe quoi : une variable comme `name` ou une expression arithmétique comme `1 + 2` ou quelque chose de plus complexe.

Veuillez noter que cela ne peut être fait que dans les backticks. Les autres guillemets ne permettent pas une telle intégration !
```js run
alert( "the result is ${1 + 2}" ); // le résultat est ${1 + 2} (les doubles quotes ne font rien)
```

Nous couvrirons les chaînes de caractères plus en détails dans le chapitre <info:string>.

```smart header="Il n'y a pas de type *character*."
Dans certaines langues, il existe un type spécial "character" pour un seul caractère. Par exemple, en langage C et en Java, il s'agit de "char".

En JavaScript, il n'y a pas un tel type. Il n’ya qu’un seul type : `string`. Une chaîne de caractères ne peut comporter qu'un seul caractère ou plusieurs. 
```

## Boolean (type logique)

Le type booléen n'a que deux valeurs: `true` et `false`.

Ce type est couramment utilisé pour stocker des valeurs oui / non: `true` signifie "oui, correct" et `false` signifie "non, incorrect".

Par exemple :

```js
let nameFieldChecked = true; // oui, le champ de nom est coché
let ageFieldChecked = false; // non, le champ d'âge n'est pas coché
```

Les valeurs booléennes résultent également de comparaisons :

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (le résultat de la comparaison est "oui")
```

Nous couvrirons plus profondément les booléens plus tard dans le chapitre <info:logical-operators>.

## La valeur "null" 

La valeur spéciale `null` n'appartient à aucun type de ceux décrits ci-dessus.

Il forme un type bien distinct qui ne contient que la valeur `null` :

```js
let age = null;
```

En JavaScript, `null` n'est pas une "référence à un objet non existant" ou un "pointeur nul" comme dans d'autres langages.

C’est juste une valeur spéciale qui a le sens de "rien", "vide" ou "valeur inconnue".

Le code ci-dessus indique que l'`age` est inconnu ou vide pour une raison quelconque.

## La valeur "undefined" 

La valeur spéciale `undefined` se distingue des autres. C'est un type à part entière, comme `null`.

La signification de `undefined` est "la valeur n'est pas attribuée".

Si une variable est déclarée mais non affectée, alors sa valeur est exactement `undefined` :

```js run
let x;

alert(x); // affiche "undefined"
```

Techniquement, il est possible d'affecter `undefined` à n'importe quelle variable :

```js run
let x = 123;

x = undefined;

alert(x); // "undefined"
```

… Mais il n’est pas recommandé de le faire. Normalement, nous utilisons `null` pour écrire une valeur "vide" ou "inconnue" dans la variable, et `undefined` n'est utilisé que pour les vérifications, pour voir si la variable est affectée ou similaire.

## Objects et Symbols

Le type `object` est spécial.

Tous les autres types sont appelés "primitifs", car leurs valeurs ne peuvent contenir qu’une seule chose (que ce soit une chaîne de caractères, un nombre ou autre). En revanche, les objets servent à stocker des collections de données et des entités plus complexes. Nous les traiterons plus tard dans le chapitre <info:object> après en avoir suffisamment appris sur les primitives.

Le type `symbol` est utilisé pour créer des identificateurs uniques pour les objets. Nous devons le mentionner ici pour être complet, mais nous l'étudierons après les objets.

## L'opérateur typeof [#type-typeof]

L'opérateur `typeof` renvoie le type de l'argument. Il est utile lorsqu'on souhaite traiter différemment les valeurs de différents types ou de faire une vérification rapide.

Il supporte deux formes de syntaxe :

1. Sous forme d'opérateur : `typeof x`.
2. En style de fonction : `typeof(x)`.

En d'autres termes, cela fonctionne à la fois avec ou sans parenthèses. Le résultat est le même.

L'appel `typeof x` renvoie une chaîne de caractères avec le nom du type :

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

Les trois dernières lignes peuvent nécessiter des explications supplémentaires :

1. `Math` est un objet interne au langage qui fournit des opérations mathématiques. Nous allons l'apprendre dans le chapitre <info:number>. Ici, il sert uniquement comme exemple d'un objet.
2. Le résultat de `typeof null` est `"object"`. C'est faux. C'est une erreur officiellement reconnue dans `typeof`, conservée pour compatibilité. Bien sûr, `null` n'est pas un objet. C'est une valeur spéciale avec un type distinct qui lui est propre. Donc, encore une fois, c’est une erreur dans le langage.
3. Le résultat de `typeof alert` est `"function"`, car `alert` est une fonction du langage. Nous étudierons les fonctions dans les chapitres suivants, et nous verrons qu’il n’y a pas de type "fonction". Les fonctions appartiennent au type `object`. Mais `typeof` les traite différemment, en retournant `"fonction"`. Ce n’est pas tout à fait correct, mais très pratique à l'usage.


## Résumé

Il existe 8 types de données de base en JavaScript.

- `number` pour les nombres de toute nature : entier ou virgule flottante, les nombres entiers sont limités à ±2<sup>53</sup>.
- `bigint` pour des nombres entiers de longueur arbitraire.
- `string` pour les strings. Une chaîne de caractères peut avoir un ou plusieurs caractères, il n’existe pas de type à caractère unique distinct.
- `boolean` pour `true`/`false`.
- `null` pour les valeurs inconnues - un type autonome qui a une seule valeur `null`.
- `undefined` pour les valeurs non attribuées - un type autonome avec une valeur unique `undefined`.
- `object` pour des structures de données plus complexes.
- `symbol` pour les identifiants uniques.

L'opérateur `typeof` nous permet de voir quel type est stocké dans la variable.

- Deux formes : `typeof x` ou `typeof(x)`.
- Renvoie une chaîne de caractères avec le nom du type, comme `"string"`.
- Pour `null` il renvoit `"object"` -- C’est une erreur dans le langage, ce n’est pas un objet en fait.

Dans les chapitres suivants, nous nous concentrerons sur les valeurs primitives et une fois que nous les connaîtrons, nous passerons aux objets.
