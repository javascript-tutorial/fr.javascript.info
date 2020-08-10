
# L'ancien "var"

```smart header="Cet article est pour comprendre les anciens scripts"
Les informations contenues dans cet article sont utiles pour comprendre les anciens scripts.

Ce n'est pas ainsi que nous écrivons un nouveau code.
```

Dans le tout premier chapitre qui parle des [variables](info:variables), nous avons mentionné trois façons pour déclarer une variable :

1. `let`
2. `const`
3. `var`

<<<<<<< HEAD
`let` et `const` agissent exactement de la même façon en ce qui concerne les environnements lexicaux (Lexical Environments).

Cependant, `var` est une bête d'une autre nature qui provient des temps très anciens. Ce n'est pas généralement utilisé dans les scripts modernes, mais elle peut se retrouver encore dans les anciens scripts.

Si vous ne planifiez pas rencontrer ces types de scripts, vous pouvez même sauter ce chapitre ou le remettre à plus tard, mais il y a une chance que cela peut vous causer des ennuis dans le futur.

Au premier regard, `var` agit de manière similaire à `let`. C'est à dire, elle déclare une variable:

```js run
function sayHi() {
  var phrase = "Hello"; // variable locale, "var" au lieu de "let"

  alert(phrase); // Hello
}
=======
The `var` declaration is similar to `let`. Most of the time we can replace `let` by `var` or vice-versa and expect things to work:

```js run
var message = "Hi";
alert(message); // Hi
```
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

But internally `var` is a very different beast, that originates from very old times. It's generally not used in modern scripts, but still lurks in the old ones.

<<<<<<< HEAD
alert(phrase); // Erreur, phrase n'est pas définie
```

...mais voici les différences.
=======
If you don't plan on meeting such scripts you may even skip this chapter or postpone it.

On the other hand, it's important to understand differences when migrating old scripts from `var` to `let`, to avoid odd errors.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

## "var" n'a pas de portée limitée aux blocs

Les variables, déclarées avec `var`, sont globales ou à l'échelle de la fonction. Elles sont visibles à travers les blocs.

Par exemple:

```js run
if (true) {
  var test = true; // utilise "var" au lieu "let"
}

*!*
alert(test); // vrai, la variable existe après if
*/!*
```

Comme `var` ignore les blocs de code, nous avons une variable globale `test`.

Si nous aurions utilisé `let test` au lieu de `var test`, la variable aurait seulement été visible à l'intérieur de `if`:

```js run
if (true) {
  let test = true; // utilise "let"
}

*!*
alert(test); // Erreur: test n'est pas défini
*/!*
```

Même principe pour les boucles: `var` ne peut pas être locale pour les blocs ni les boucles :

```js
for (var i = 0; i < 10; i++) {
  // ...
}

*!*
alert(i); // 10, "i" est visible après la boucle, c'est une variable globale
*/!*
```

Si un bloc de code est à l'intérieur d'une fonction, `var` devient une variable à l'échelle de la fonction :

```js run
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // fonctionne
}

sayHi();
alert(phrase); // Erreur : phrase n'est pas définie (vérifiez la console développeur)
```

Comme nous pouvons le constater, `var` pénètre à travers `if`, `for` ou autres blocs de code. C'est parce que, il y a longtemps, les blocs de JavaScript n'avaient pas d'environnements lexicaux. Et `var` est un vestige de ce dernier.

<<<<<<< HEAD
## Les déclarations "var" sont traitées au début de la fonction
=======
## "var" tolerates redeclarations

If we declare the same variable with `let` twice in the same scope, that's an error:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

With `var`, we can redeclare a variable any number of times. If we use `var` with an already-declared variable, it's just ignored:

```js run
var user = "Pete";

var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error

alert(user); // John
```

## "var" variables can be declared below their use
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Les déclarations `var` sont traitées quand la fonction commence (ou quand le script commence pour le cas global).

En d'autres mots, les variables `var` sont définies au début de la fonction, peu importe où la définition se retrouve (présumant que la définition n'est pas dans une fonction imbriquée).

Alors ce code:

```js run
function sayHi() {
  phrase = "Hello";

  alert(phrase);

*!*
  var phrase;
*/!*
}
sayHi();
```

...est techniquement identique à ceci (nous avons simplement bougé `var phrase` du code juste avant):

```js run
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "Hello";

  alert(phrase);
}
sayHi();
```

...ou même ceci (souvenez-vous, les blocs de code sont ignorés):

```js run
function sayHi() {
  phrase = "Hello"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
sayHi();
```

Certains nomment ce comportement "hoisting" (hisser) parce que toutes les `var` sont "hoisted" (hissées) jusqu'en haut de la fonction.

Alors dans l'exemple au dessus, la branche `if (false)` n'est jamais exécutée, mais ce n'est pas grave. La `var` à l'intérieur de cette branche est traitée au début de la fonction, alors au moment `(*)`, la variable existe.

**Les déclarations sont hissées, mais les affectations ne le sont pas.**

Cela est mieux démontré avec un exemple :

```js run
function sayHi() {
  alert(phrase);  

*!*
  var phrase = "Hello";
*/!*
}

sayHi();
```

La ligne `var phrase = "Hello"` contient deux actions :

1. Déclaration de la variable `var`
2. Affectation de la variable `=`.

La déclaration est traitée au début de l'exécution de la fonction ("hoisted"), mais l'affectation fonctionne toujours à l'endroit où elle apparaît. Essentiellement, le code fonctionne comme ceci :

```js run
function sayHi() {
*!*
  var phrase; // déclaration fonctionne au début...
*/!*

  alert(phrase); // undefined

*!*
  phrase = "Hello"; // ...affectation - quand l'exécution y parvient.
*/!*
}

sayHi();
```

Parce que toutes les déclarations `var` sont traitées au début de la fonction, nous pouvons y faire référence n'importe où. Mais les variables sont indéfinies jusqu'aux affectations.

Dans les deux exemples au dessus, `alert` fonctionne sans erreur parce que la variable `phrase` existe. Mais sa valeur n'est pas encore affectée, alors cela donne `undefined`.

### IIFE

Comme par le passé, il n'y avait que `var`, et qu'il n'a pas de visibilité au niveau du bloc, les programmeurs ont inventé un moyen de l'imiter. Ce qu'ils ont fait a été appelé "expressions de fonction immédiatement invoquées" (en abrégé IIFE).

Ce n'est pas quelque chose que nous devrions utiliser de nos jours, mais vous pouvez les trouver dans d'anciens scripts.

Un IIFE ressemble à ceci :

```js run
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

Ici, une fonction expression est créée et immédiatement appelée. Ainsi, le code s'exécute immédiatement et possède ses propres variables privées.

La fonction expression est entourée de parenthèses `(fonction {...})`, car lorsque JavaScript rencontre `"fonction"` dans le flux de code principal, il le comprend comme le début d'une fonction déclaration. Mais une fonction déclaration doit avoir un nom, donc ce type de code donnera une erreur :

```js run
// Essayons de déclarer et d'appeler immédiatement une fonction
function() { // <-- Erreur : Les instructions de fonction nécessitent un nom de fonction

  let message = "Hello";

  alert(message); // Hello

}();
```

Même si nous disons : "d'accord, ajoutons un nom", cela ne fonctionnera toujours pas, parce que JavaScript ne permet pas d'appeler immédiatement les fonctions déclarations :

```js run
// erreur de syntaxe à cause des parenthèses ci-dessous
function go() {

}(); // <-- ne peut pas appeler la fonction déclaration immédiatement
```

Ainsi, les parenthèses autour de la fonction sont une astuce pour montrer à JavaScript que la fonction est créée dans le contexte d'une autre expression, et donc c'est une fonction expression : elle n'a pas besoin de nom et peut être appelée immédiatement.

Il existe d'autres façons que les parenthèses pour dire à JavaScript que nous souhaitons une fonction expression :

```js run
// Façons de créer une IIFE

(function() {
  alert("Parentheses around the function");
}*!*)*/!*();

(function() {
  alert("Parentheses around the whole thing");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT operator starts the expression");
}();

*!*+*/!*function() {
  alert("Unary plus starts the expression");
}();
```

Dans tous les cas ci-dessus, nous déclarons une fonction expression et l'exécutons immédiatement. Notons encore : de nos jours il n'y a aucune raison d'écrire un tel code.

## Résumé

Il y a deux différences majeures entre `var` et `let/const`:

1. Les variables `var` n'ont pas de portée limitée aux blocs. Elles sont, au minimum, visibles au niveau de la fonction.
2. Les déclarations `var` sont traitées au début de la fonction (ou au début du script pour le cas global).

Il y a une autre différence mineure associée à l'objet global, mais nous traiterons ce point dans le prochain chapitre.

Ces différences rendent `var` pire que `let` dans la plupart des cas. Les variables au niveau des blocs sont extraordinaires. C'est pourquoi `let` a été introduit au standard il y a longtemps et c'est maintenant un moyen majeur (avec `const`) pour déclarer une variable.
