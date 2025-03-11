# Les types de données

Une valeur en JavaScript est toujours d'un certain type. Par exemple, une chaîne de caractères ou un nombre.

Il existe huit types de données de base en JavaScript. Ici, nous les couvrirons en général et dans les prochains chapitres, nous parlerons de chacun d'eux en détail.

Nous pouvons mettre n'importe quel type dans une variable. Par exemple, une variable peut à un moment être une chaîne de caractères puis stocker un nombre :

```js
// pas d'erreur
let message = "hello";
message = 123456;
```

Les langages de programmation qui permettent de telles choses sont appelés "typés dynamiquement", ce qui signifie qu'il existe des types de données, mais que les variables ne sont liées à aucun d'entre eux.


## Number

```js
let n = 123;
n = 12.345;
```

Le type *number* sert à la fois à des nombres entiers et à des nombres à virgule flottante.

Il existe de nombreuses opérations pour les nombres, par ex. multiplication `*`, division `/`, addition `+`, soustraction `-` et ainsi de suite.

Outre les nombres réguliers, il existe des "valeurs numériques spéciales" qui appartiennent également à ce type: `Infinity`, `-Infinity` et `NaN`.

- `Infinity` représente l'[Infini](https://fr.wikipedia.org/wiki/Infini) ∞ mathématique. C'est une valeur spéciale qui est plus grande que n'importe quel nombre.

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
    alert( NaN + 1 ); // NaN
    alert( 3 * NaN ); // NaN
    alert( "not a number" / 2 - 1 ); // NaN
    ```

    Donc, s'il y a `NaN` quelque part dans une expression mathématique, il se propage à l'ensemble du résultat (il n'y a qu'une seule exception : `NaN ** 0` vaut `1`).

```smart header="Les opérations mathématiques sont sûres"
Faire des maths est sans danger en JavaScript. Nous pouvons faire n'importe quoi : diviser par zéro, traiter les chaînes non numériques comme des nombres, etc.

Le script ne s'arrêtera jamais avec une erreur fatale ("die"). Au pire, nous aurons `NaN` comme résultat.
```

Les valeurs numériques spéciales appartiennent formellement au type "number". Bien sûr, ce ne sont pas des nombres au sens commun de ce mot.

Nous allons en voir plus sur le travail avec les nombres dans le chapitre <info:number>.

## BigInt [#bigint-type]

En JavaScript, le type "number" ne peut pas représenter des valeurs entières supérieures à <code>(2<sup>53</sup>-1)</code> (c'est `9007199254740991`), ou moins que <code>-(2<sup>53</sup>-1)</code> pour les chiffres négatifs. C'est une limitation technique causée par leur représentation interne.

Pour être vraiment précis, le type "number" peut stocker des entiers plus grands (jusqu'à <code>1.7976931348623157 * 10<sup>308</sup></code>), mais en dehors de la plage d'entiers sûrs <code>±(2 <sup>53</sup>-1)</code> il y aura une erreur de précision, car tous les chiffres ne rentrent pas dans le stockage 64 bits fixe. Ainsi, une valeur "approximative" peut être stockée.

Par exemple, ces deux nombres (juste au-dessus de la plage de sécurité) sont identiques :

```js
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992
```

Ainsi, tous les entiers impairs supérieurs à <code>(2<sup>53</sup>-1)</code> ne peuvent pas du tout être stockés dans le type "number".

Dans la plupart des cas, la plage <code>±(2<sup>53</sup>-1)</code> est tout à fait suffisante, mais parfois nous avons besoin de toute la plage de très grands nombres entiers, par ex. pour la cryptographie ou les horodatages de précision à la microseconde.

`BigInt` a récemment été ajouté au langage pour représenter des entiers de longueur arbitraire.

Une valeur `BigInt` est créé en ajoutant `n` à la fin d'un entier :

```js
// le "n" à la fin signifie que c'est un BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

Comme les chiffres `BigInt` sont rarement nécessaires, nous leur avons consacré un chapitre dédié <info:bigint>. Lisez-le lorsque vous avez besoin d'aussi gros chiffres.

<<<<<<< HEAD
```smart header="Problèmes de compatibilité"
À l'heure actuelle, `BigInt` est pris en charge dans Firefox/Chrome/Edge/Safari, mais pas dans IE.
```

You can check [*MDN* BigInt compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) to know which versions of a browser are supported.

=======
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
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

// une expression encapsulée
alert( `the result is *!*${1 + 2}*/!*` ); // le résultat est 3
```

L'expression à l'intérieur de `${…}` est évaluée et le résultat devient une partie de la chaîne. On peut y mettre n'importe quoi : une variable comme `name` ou une expression arithmétique comme `1 + 2` ou quelque chose de plus complexe.

Veuillez noter que cela ne peut être fait que dans les backticks. Les autres guillemets ne permettent pas une telle intégration !

```js run
alert( "the result is ${1 + 2}" ); // le résultat est ${1 + 2} (les doubles quotes ne font rien)
```

Nous couvrirons les chaînes de caractères plus en détails dans le chapitre <info:string>.

```smart header="Il n'y a pas de type *character*."
Dans certains langages, il existe un type spécial "character" pour un seul caractère. Par exemple, en langage C et en Java, il s'agit de "char".

En JavaScript, ce type n'existe pas. Il n'y a qu'un seul type: `string`. Une chaîne de caractères peut être composée de zéro caractère (être vide), d'un caractère ou de plusieurs d'entre eux.
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

Le code ci-dessus indique que l'`age` est inconnu.

## La valeur "undefined"

La valeur spéciale `undefined` se distingue des autres. C'est un type à part entière, comme `null`.

La signification de `undefined` est "la valeur n'est pas attribuée".

Si une variable est déclarée mais non affectée, alors sa valeur est exactement `undefined` :

```js run
let age;

alert(age); // affiche "undefined"
```

Techniquement, il est possible d'affecter explicitement `undefined` à une variable :

```js run
let age = 100;

// change the value to undefined
age = undefined;

alert(age); // "undefined"
```

… Mais il n’est pas recommandé de faire cela. Normalement, nous utilisons `null` pour assigner une valeur "vide" ou "inconnue" à une variable, tandis que `undefined` est réservé comme valeur initiale par défaut pour les éléments non attribués.

## Objects et Symbols

Le type `object` est spécial.

Tous les autres types sont appelés "primitifs", car leurs valeurs ne peuvent contenir qu’une seule chose (que ce soit une chaîne de caractères, un nombre ou autre). À contrario, les objets servent à stocker des collections de données et des entités plus complexes.

Étant aussi important, les objets méritent un traitement spécial. Nous les traiterons plus tard dans le chapitre <info:object>, après en savoir plus sur les primitifs.

Le type `symbol` est utilisé pour créer des identificateurs uniques pour les objets. Nous devons le mentionner ici par souci d'exhaustivité, mais nous allons le voir en détails après avoir étudié les objets.

## L'opérateur typeof [#type-typeof]

L'opérateur `typeof` renvoie le type de l'opérande. Il est utile lorsqu'on souhaite traiter différemment les valeurs de différents types ou de faire une vérification rapide.

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
2. Le résultat de `typeof null` est `"object"`. C'est une erreur officiellement reconnue dans `typeof`, datant des premiers jours de JavaScript et conservée pour compatibilité. Bien sûr, `null` n'est pas un objet. C'est une valeur spéciale avec un type distinct qui lui est propre. Le comportement de `typeof` est incorrect ici.
3. Le résultat de `typeof alert` est `"function"`, car `alert` est une fonction. Nous étudierons les fonctions dans les chapitres suivants, et nous verrons qu’il n’y a pas de type "fonction" en JavaScript. Les fonctions appartiennent au type `object` mais `typeof` les traite différemment en retournant `"function"`. Cela vient également des débuts de JavaScript. Techniquement ce n’est pas tout à fait correct, mais très pratique à l'usage.

```smart header="La syntaxe `typeof(x)`"
Vous pouvez également rencontrer une autre syntaxe : `typeof(x)`. C'est la même chose que `typeof x`.

Pour être clair : `typeof` est un opérateur, pas une fonction. Les parenthèses ici ne font pas partie de `typeof`. C'est le genre de parenthèses utilisées pour le regroupement mathématique.

Habituellement, ces parenthèses contiennent une expression mathématique, telle que `(2 + 2)`, mais ici elles ne contiennent qu'un seul argument `(x)`. Syntaxiquement, ils permettent d'éviter un espace entre l'opérateur `typeof` et son argument, et certains aiment ça.

Certaines personnes préfèrent `typeof(x)`, bien que la syntaxe `typeof x` soit beaucoup plus courante.
```

## Résumé

Il existe 8 types de données de base en JavaScript.

- Sept types de données primitifs :
    - `number` pour les nombres de toute nature : entier ou virgule flottante, les nombres entiers sont limités à <code>±(2<sup>53</sup>-1)</code>.
    - `bigint` pour des nombres entiers de longueur arbitraire.
    - `string` pour les chaînes de caractères. Une chaîne de caractères peut avoir zéro ou plusieurs caractères, il n'y a pas de type à caractère unique distinct.
    - `boolean` pour `true`/`false` (vrai/faux).
    - `null` pour les valeurs inconnues - un type autonome qui a une seule valeur `null`.
    - `undefined` pour les valeurs non attribuées - un type autonome avec une valeur unique `undefined`.
    - `symbol` pour les identifiants uniques.
- Et un type de données non primitif :
    - `object` pour des structures de données plus complexes.

L'opérateur `typeof` nous permet de voir quel type est stocké dans la variable.

- Généralement utilisé sous cette forme `typeof x`, mais `typeof(x)` est également possible.
- Renvoie une chaîne de caractères avec le nom du type, comme `"string"`.
- Pour `null` il renvoie `"object"` -- C’est une erreur dans le langage, ce n’est pas un objet en fait.

Dans les chapitres suivants, nous nous concentrerons sur les valeurs primitives et une fois que nous les connaîtrons, nous passerons aux objets.
