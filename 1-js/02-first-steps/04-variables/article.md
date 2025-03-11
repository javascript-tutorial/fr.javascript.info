# Les variables

La plupart du temps, une application JavaScript doit utiliser des informations. Voici 2 exemples :
1. Une boutique en ligne - les informations peuvent inclure des articles vendus et un panier d'achat. 
2. Une application de chat - les informations peuvent inclure des utilisateurs, des messages et bien plus encore.

Les variables sont utilisées pour stocker ces informations.

## Une variable

Une [variable](https://fr.wikipedia.org/wiki/Variable_(informatique)) est un "stockage nommé" pour les données. Nous pouvons utiliser des variables pour stocker des goodies, des visiteurs et d'autres données.

Pour créer une variable en JavaScript, nous devons utiliser le mot-clé `let`.

L'instruction ci-dessous crée (autrement dit: *déclare*) une variable avec le nom "message" :

```js
let message;
```

Maintenant, nous pouvons y mettre des données en utilisant l'opérateur d'affectation `=` :

```js
let message;

*!*
message = 'Hello'; // stocke la chaîne de caractères 'Hello' dans la variable nommée message
*/!*
```

La chaîne de caractères est maintenant enregistrée dans la zone de mémoire associée à la variable. Nous pouvons y accéder en utilisant le nom de la variable :

```js run
let message;
message = 'Hello!';

*!*
alert(message); // affiche le contenu de la variable
*/!*
```

Pour être concis, nous pouvons fusionner la déclaration et l'affectation de variables en une seule ligne :

```js run
let message = 'Hello!'; // définir la variable et assigner la valeur

alert(message); // Hello!
```

Nous pouvons également déclarer plusieurs variables sur une seule ligne :

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

Cela peut sembler plus court, mais ce n'est pas recommandé. Pour une meilleure lisibilité, veuillez utiliser une seule ligne par variable.

La variante multiligne est un peu plus longue, mais plus facile à lire :

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

Certaines personnes définissent également plusieurs variables dans ce style multiligne :

```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hello';
```

... Ou même dans le style "virgule première" :

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hello';
```

Techniquement, toutes ces variantes font la même chose. C'est donc une question de goût personnel et d'esthétique.

````smart header="`var` au lieu de `let`"
Dans les anciens scripts, vous pouvez également trouver un autre mot-clé : `var` au lieu de `let` :

```js
*!*var*/!* message = 'Hello';
```

<<<<<<< HEAD
Le mot-clé `var` est *presque* identique à `let`. Il déclare également une variable, mais d'une manière légèrement différente, à la mode "old school".

Il y a des différences subtiles entre `let` et `var`, mais elles n'ont pas encore d'importance pour nous. Nous les couvrirons en détails plus tard, dans le chapitre <info:var>.
=======
The `var` keyword is *almost* the same as `let`. It also declares a variable but in a slightly different, "old-school" way.

There are subtle differences between `let` and `var`, but they do not matter to us yet. We'll cover them in detail in the chapter <info:var>.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
````

## Une analogie avec la vie réelle

Nous pouvons facilement saisir le concept d'une "variable" si nous l'imaginons comme une "boîte" pour les données, avec un autocollant portant un nom unique.

<<<<<<< HEAD
Par exemple, la variable message peut être imaginée comme une boîte étiquetée "message" avec la valeur "Hello!" à l'intérieur :
=======
For instance, the variable `message` can be imagined as a box labelled `"message"` with the value `"Hello!"` in it:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

![](variable.svg)

Nous pouvons mettre n'importe quelle valeur dans la boîte.

On peut aussi le changer autant de fois qu'on veut :

```js run
let message;

message = 'Hello!';

message = 'World!'; // valeur changée

alert(message);
```

Lorsque la valeur est modifiée, les anciennes données sont supprimées de la variable :

![](variable-change.svg)

Nous pouvons également déclarer deux variables et copier des données de l'une à l'autre.

```js run
let hello = 'Hello world!';

let message;

*!*
// copier 'Hello world' de hello vers message
message = hello;
*/!*

// maintenant les deux variables contiennent les mêmes données
alert(hello); // Hello world!
alert(message); // Hello world!
```

````warn header="Déclarer deux fois déclenche une erreur"
Une variable ne doit être déclarée qu'une seule fois.

Une déclaration répétée de la même variable est une erreur :

```js run
let message = "This";

// répéter 'let' conduit à une erreur
let message = "That"; // SyntaxError: 'message' has already been declared
```
Donc, nous devrions déclarer une variable une fois et y faire référence sans `let`.
````

```smart header="Langages fonctionnels"
Il peut être intéressant de savoir qu'il existe aussi des langages de [programmation purement fonctionelle](https://fr.wikipedia.org/wiki/Programmation_fonctionnelle), comme [Haskell](https://www.scala-lang.org/) qui interdisent de modifier une valeur de variable.

Dans ce genre de langage, une fois la valeur stockée dans la boîte, elle est là pour toujours. Si nous devons stocker autre chose, le langage nous oblige à créer une nouvelle boîte (déclarer une nouvelle variable). Nous ne pouvons pas réutiliser l’ancienne.

Bien que cela puisse paraître un peu étrange à première vue, ces langages sont tout à fait capables de développements sérieux. Plus que cela, il existe des domaines tels que les calculs parallèles où cette limitation confère certains avantages.
```

## Nom de variable [#variable-naming]

Il existe deux limitations pour un nom de variable en JavaScript :

1. Le nom ne doit contenir que des lettres, des chiffres, des symboles `$` et `_`.
2. Le premier caractère ne doit pas être un chiffre.

Noms valides, par exemple :

```js
let userName;
let test123;
```

Lorsque le nom contient plusieurs mots, le [camelCase](https://fr.wikipedia.org/wiki/Camel_case) est couramment utilisé. C'est-à-dire que les mots se succèdent, chaque mot à l'exception du premier commence par une majuscule : `monTresLongNom`.

Ce qui est intéressant -- le signe dollar `'$'` et l'underscore `'_'` peuvent également être utilisé dans les noms. Ce sont des symboles réguliers, tout comme les lettres, sans aucune signification particulière.

Ces noms sont valides :

```js run untrusted
let $ = 1; // déclarer une variable avec le nom "$"
let _ = 2; // et maintenant une variable avec le nom "_"

alert($ + _); // 3
```

Exemples de noms de variables incorrects :

```js no-beautify
let 1a; // ne peut pas commencer avec un chiffre

let mon-nom; // un trait d'union '-' n'est pas autorisé dans le nom
```

```smart header="La casse est importante"
Des variables nommées `apple` et `APPLE` sont deux variables différentes.
```

<<<<<<< HEAD
````smart header="Les lettres non latines sont autorisées mais non recommandées"
Il est possible d'utiliser n'importe quelle langue, y compris les lettres cyrilliques, les logogrammes chinois, etc., comme ceci :
=======
````smart header="Non-Latin letters are allowed, but not recommended"
It is possible to use any language, including Cyrillic letters, Chinese logograms and so on, like this:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
let имя = '...';
let 我 = '...';
```

<<<<<<< HEAD
Techniquement, il n'y a pas d'erreur ici, ces noms sont autorisés, mais il existe une convention internationale d'utiliser l'anglais dans les noms de variables. Même si nous écrivons un petit script, sa vie peut être longue. Les personnes d'autres pays peuvent avoir besoin de les lire quelque temps.

=======
Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names. Even if we're writing a small script, it may have a long life ahead. People from other countries may need to read it sometime.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
````

````warn header="Noms réservés"
Il existe une [liste de mots réservés](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Grammaire_lexicale#Mots-cl%C3%A9s), qui ne peuvent pas être utilisés comme noms de variables, car ils sont utilisés par le langage lui-même.

Par exemple, les mots `let`, `class`, `return`, `function` sont réservés.

Le code ci-dessous donne une erreur de syntaxe :

```js run no-beautify
let let = 5; // impossible de nommer une variable "let", erreur!
let return = 5; // on ne peut pas la nommer "return" aussi, erreur!
```
````

````warn header="Une affectation sans : `use strict`"

Normalement, nous devons définir une variable avant de l'utiliser. Mais jadis, il était techniquement possible de créer une variable par simple affectation de la valeur, sans `let`. Cela fonctionne toujours maintenant si nous ne mettons pas `use strict`. Le comportement est conservé pour la compatibilité avec les anciens scripts.

```js run no-strict
// note : pas de "use strict" dans cet exemple

num = 5; // la variable "num" est créée si elle n'existe pas

alert(num); // 5
```

C’est une mauvaise pratique, cela donne une erreur en mode strict :

```js run untrusted
"use strict";

*!*
num = 5; // erreur: num n'est pas défini
*/!*
```
````


## Les Constantes

Pour déclarer une constante (non changeante), on peut utiliser `const` plutôt que `let` :

```js
const myBirthday = '18.04.1982';
```

Les variables déclarées à l'aide de `const` sont appelées "constantes". Elles ne peuvent pas être réassignées. Une tentative de le faire provoquerait une erreur :

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // erreur, ne peut pas réaffecter la constante !
```

<<<<<<< HEAD
Lorsqu'un programmeur est certain que la variable ne doit jamais changer, il peut utiliser `const` pour le garantir et également le montrer clairement à tout le monde.
=======
When a programmer is sure that a variable will never change, they can declare it with `const` to guarantee and communicate that fact to everyone.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a


<<<<<<< HEAD
### Les constantes en majuscules
=======
There is a widespread practice to use constants as aliases for difficult-to-remember values that are known before execution.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Il existe une pratique répandue d’utiliser des constantes comme alias pour des valeurs difficiles à mémoriser, qui sont connues avant leur exécution.

Ces constantes sont nommées en utilisant des majuscules et des underscores.

Par exemple, créons des constantes pour les couleurs au format dit "web" (hexadécimal) :

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ... quand il faut choisir une couleur
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Bénéfices:

- `COLOR_ORANGE` est beaucoup plus facile à retenir que `"#FF7F00"`.
- Il est beaucoup plus facile de mal saisir `"#FF7F00"` que `COLOR_ORANGE`.
- En lisant le code, `COLOR_ORANGE` est beaucoup plus significatif que `#FF7F00`.

Quand devrions-nous utiliser les majuscules pour une constante et quand devrions-nous les nommer normalement ? Soyons clairs.

<<<<<<< HEAD
Être une "constante" signifie simplement que la valeur ne change jamais. Mais il existe des constantes connues avant l'exécution (comme une valeur hexadécimale pour le rouge), et il y a celles qui sont *calculées* en temps réel, pendant l'exécution, mais ne changent pas après l'affectation.
=======
Being a "constant" just means that a variable's value never changes. But some constants are known before execution (like a hexadecimal value for red) and some constants are *calculated* in run-time, during the execution, but do not change after their initial assignment.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Par exemple :

```js
const pageLoadTime = /* temps pris par une page Web pour charger */;
```

<<<<<<< HEAD
La valeur de `pageLoadTime` n’est pas connue avant le chargement de la page, elle est donc nommée normalement. Mais cela reste une constante, car elle ne change pas après l’affectation.
=======
The value of `pageLoadTime` is not known before the page load, so it's named normally. But it's still a constant because it doesn't change after the assignment.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

En d'autres termes, les constantes nommées en majuscules ne sont utilisées que comme alias pour les valeurs "codées en dur".

## Nommez les choses correctement

En parlant de variables, il y a une autre chose extrêmement importante.

Un nom de variable doit avoir une signification claire et évidente, décrivant les données qu'elle stocke.

<<<<<<< HEAD
Le nommage de variables est l’une des compétences les plus importantes et les plus complexes de la programmation. Un rapide coup d’œil sur les noms de variables peut révéler quel code est écrit par un débutant et par un développeur expérimenté.

Dans un projet réel, la majeure partie du temps est consacrée à la modification et à l'extension de la base de code existant, plutôt que d'écrire quelque chose de complètement séparé de zéro. Et lorsque nous revenons au code après un certain temps, il est beaucoup plus facile de trouver des informations bien étiquetées. Ou, en d'autres termes, lorsque les variables ont de bons noms.
=======
Variable naming is one of the most important and complex skills in programming. A glance at variable names can reveal which code was written by a beginner versus an experienced developer.

In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely separate from scratch. When we return to some code after doing something else for a while, it's much easier to find information that is well-labelled. Or, in other words, when the variables have good names.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Veuillez prendre le temps de réfléchir à un nom pertinent pour une variable avant de la déclarer. Cela vous facilitera énormément la vie.

Voici quelques règles à suivre :

<<<<<<< HEAD
- Utilisez des noms lisibles par des humains comme `userName` ou `shoppingCart`.
- Restez à l’écart des abréviations ou des noms courts tels que `a`, `b`, `c`, à moins que vous ne sachiez vraiment ce que vous faites.
- Faire en sorte que le nom soit le plus descriptif et concis possible. Des exemples de noms incorrects sont `data` et `value`. Un tel nom ne dit rien. C’est tout à fait acceptable de les utiliser si le contexte dans lequel les données ou les valeurs sont impliquées est particulièrement évident.
- S'accorder avec son équipe (et soi-même) sur les termes utilisés. Si un visiteur du site est appelé un "utilisateur", nous devrions nommer les variables connexes comme `currentUser` ou `newUser`, mais non `currentVisitor` ou encore `newManInTown`.
=======
- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, and `c`, unless you know what you're doing.
- Make names maximally descriptive and concise. Examples of bad names are `data` and `value`. Such names say nothing. It's only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your mind. If a site visitor is called a "user" then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Cela semble simple ? En effet, ça l'est, mais la création de noms descriptifs et concis dans la pratique ne l'est pas. Fonce.

```smart header="Réutiliser ou créer ?"
Une dernière note. Certains programmeurs paresseux, au lieu de déclarer une nouvelle variable, ont tendance à réutiliser ceux qui existent déjà.

En conséquence, la variable est comme une boîte où les gens jettent des choses différentes sans changer l'autocollant. Qu'est-ce qu'il y a dedans maintenant ? Qui sait … Nous devons creuser et vérifier.

Un tel programmeur économise un peu sur la déclaration de variable, mais perd dix fois plus sur le débogage du code.

Une variable supplémentaire est une bonne chose, cela ne complique pas le code, bien au contraire.

Les minificateurs et navigateurs modernes optimisent suffisamment le code pour ne pas créer de problèmes de performances. L'utilisation de différentes variables pour différentes valeurs peut même aider le moteur à optimiser.
```

## Résumé

Nous pouvons déclarer des variables pour stocker des données. Cela peut être fait en utilisant `var` ou `let` ou `const`.

- `let` -- est une déclaration de variable moderne.
- `var` -- est une déclaration de variable old-school. Normalement, nous ne l’utilisons pas du tout, mais nous couvrirons les différences subtiles par rapport à `let` dans le chapitre <info:var>, juste au cas où vous en auriez besoin.
- `const` -- est équivalent à `let`, mais la valeur de la variable ne peut pas être modifiée.

Les variables doivent être nommées d’une manière qui nous permet de comprendre facilement ce qui est à l’intérieur.
