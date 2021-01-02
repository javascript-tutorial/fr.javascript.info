# Branche conditionnelle : if, '?'

Parfois, nous devons effectuer différentes actions en fonction d'une condition.

Pour ce faire, nous pouvons utiliser l'instruction `if` et l'opérateur conditionnel `? `, également appelé opérateur "point d'interrogation".

## L'instruction "if"

L'instruction `if(...)` évalue une condition entre parenthèses et, si le résultat est `true`, exécute un bloc de code.

Par exemple :

```js run
let year = prompt('In which year was ECMAScript-2015 specification published?', '');

*!*
if (year == 2015) alert( 'You are right!' );
*/!*
```

Dans l'exemple ci-dessus, la condition est une vérification d'égalité simple : `year == 2015`, mais elle peut être beaucoup plus complexe.

S'il y a plus d'une instruction à exécuter, nous devons envelopper notre bloc de code entre accolades :

```js
if (year == 2015) {
  alert( "That's correct!" );
  alert( "You're so smart!" );
}
```

Il est recommandé d'entourer votre bloc de code avec des accolades `{}` à chaque fois avec `if`, même s’il n’ya qu’une seule instruction. Cela améliore la lisibilité.

## Conversion booléenne

L'instruction `if (…)` évalue l'expression entre parenthèses et la convertit en type booléen.

Rappelons les règles de conversion du chapitre <info:type-conversions>:

- Un nombre `0`, une chaîne de caractères vide `""`, `null`, `undefined` et `NaN` deviennent `false`. À cause de cela, on dit de ces valeurs qu'elles sont "falsy".
- Les autres valeurs deviennent `true`, on dit qu'elles sont "truthy".

Donc, le code sous cette condition ne sera jamais exécuté :

```js
if (0) { // 0 est falsy
  ...
}
```

… Et à l'intérieur de cette condition - il fonctionne toujours :

```js
if (1) { // 1 est truthy
  ...
}
```

Nous pouvons également transmettre une valeur booléenne pré-évaluée à `if`, comme ici :

```js
let cond = (year == 2015); // l'égalité évalue à vrai ou faux

if (cond) {
  ...
}
```

## La clause "else"

<<<<<<< HEAD
L'instruction `if` peut contenir un bloc optionnel `else`. Il s'exécute lorsque la condition est incorrecte.
=======
The `if` statement may contain an optional "else" block. It executes when the condition is falsy.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

Par exemple :
```js run
let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (year == 2015) {
  alert( 'You guessed it right!' );
} else {
  alert( 'How can you be so wrong?' ); // toute autre valeur que 2015
}
```

## Plusieurs conditions : "else if"

Parfois, nous aimerions tester plusieurs variantes d'une condition. Il y a une clause `else if` pour cela.

Par exemple :

```js run
let year = prompt('En quelle année la spécification ECMAScript-2015 a-t-elle été publiée ?', '');

if (year < 2015) {
  alert( 'Too early...' );
} else if (year > 2015) {
  alert( 'Too late' );
} else {
  alert( 'Exactly!' );
}
```

Dans le code ci-dessus, JavaScript vérifie `year < 2015`. S'il est falsy, il passe à l'année de condition suivante `year > 2015` et c'est toujours `false` il passe à la dernière instruction et affiche la dernière alerte.

Il peut y avoir plus de blocks `else if`. Le dernier `else` est optionnel.

## Opérateur ternaire '?'

Parfois, nous devons attribuer une variable en fonction d'une condition.

Par exemple :

```js run no-beautify
let accessAllowed;
let age = prompt('How old are you?', '');

*!*
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

L'opérateur dit "ternaire" ou "point d'interrogation" nous permet de le faire plus rapidement et plus simplement.

L'opérateur est représenté par un point d'interrogation `?`. Appelé aussi "ternaire" parce que l'opérateur a trois opérandes. C'est en fait le seul et unique opérateur en JavaScript qui en a autant.

La syntaxe est :
```js
let result = condition ? value1 : value2
```

La `condition` est évaluée, si elle est vraie, alors `value1` est retournée, sinon -- `value2`.

Par exemple :

```js
let accessAllowed = (age > 18) ? true : false;
```

Techniquement, nous pouvons omettre les parenthèses autour de `age > 18`. L'opérateur point d'interrogation a une faible précédence, il s'exécute donc après la comparaison `>`.

Cet exemple fera la même chose que le précédent :

```js
// l'opérateur de comparaison "age > 18" s'exécute en premier quoiqu'il en soit
// (pas besoin de l'envelopper entre parenthèses)
let accessAllowed = age > 18 ? true : false;
```

Mais les parenthèses rendent le code plus lisible, il est donc recommandé de les utiliser.

````smart
Dans l'exemple ci-dessus, il est possible d'éviter l'opérateur ternaire, parce que la comparaison elle-même renvoie un `true/false`:

```js
// la même chose
let accessAllowed = age > 18;
```
````

## Multiple '?'

Une séquence d'opérateurs point d'interrogation `?` permettent de renvoyer une valeur qui dépend de plusieurs conditions.

Par exemple :
```js run
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
```

Il peut être difficile au début de comprendre ce qui se passe. Mais après un examen plus approfondi, nous constatons que ce n’est qu’une séquence de tests ordinaire.

1. Le premier point d'interrogation vérifie si `age < 3`.
2. Si vrai -- retourne `'Coucou bébé !'`, sinon il franchi les deux points `":"` et vérifie si `age < 18`.
3. Si vrai -- retourne `'Salut !'`, sinon -- il franchi à nouveau les deux points suivants `":"` et vérifie si `age < 100`.
4. Si vrai -- retourne `'Salutations !'`, sinon -- il franchi enfin les derniers deux points `":"` et retourne `'Quel âge inhabituel !'`.

La même logique utilisant `if..else` :

```js
if (age < 3) {
  message = 'Hi, baby!';
} else if (age < 18) {
  message = 'Hello!';
} else if (age < 100) {
  message = 'Greetings!';
} else {
  message = 'What an unusual age!';
}
```

## Utilisation non traditionnelle de '?'

Parfois, le point d'interrogation `?` est utilisé en remplacement de `if` :

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('Right!') : alert('Wrong.');
*/!*
```

Selon si la condition  `company == 'Netscape'` est vraie ou non, la première ou la deuxième partie après `?` s'exécute et affiche l'alerte correspondante.

Nous n’attribuons pas de résultat à une variable ici. L'idée est d'exécuter un code différent en fonction de la condition.

**Il n'est pas recommandé d'utiliser l'opérateur ternaire de cette manière.**

La notation semble être plus courte qu'un `if`, ce qui plaît à certains programmeurs. Mais c'est moins lisible.

Voici le même code avec `if` pour comparaison :

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('Right!');
} else {
  alert('Wrong.');
}
*/!*
```

Nos yeux scrutent le code verticalement. Les constructions qui couvrent plusieurs lignes sont plus faciles à comprendre qu'un jeu d'instructions horizontal long.

L'idée d'un point d'interrogation `?` est de renvoyer l'une ou l'autre valeur selon la condition. Veuillez l'utiliser pour cela exactement. Il y a `if` pour exécuter différentes branches du code.
