
# L'ancien "var"

<<<<<<< HEAD
Dans le tout premier chapitre qui parle des [variables](info:variables), nous avons mentionné trois façons pour déclarer une variable:
=======
```smart header="This article is for understanding old scripts"
The information in this article is useful for understanding old scripts.

That's not how we write a new code.
```

In the very first chapter about [variables](info:variables), we mentioned three ways of variable declaration:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

1. `let`
2. `const`
3. `var`

`let` et `const` agissent exactement de la même façon en ce qui concerne les environnements lexicaux (Lexical Environments).

Cependant, `var` est une bête d'une autre nature qui provient des temps très anciens. Ce n'est pas généralement utilisé dans les scripts modernes, mais elle peut se retrouver encore dans les anciens scripts.

Si vous ne planifiez pas rencontrer ces types de scripts, vous pouvez même sauter ce chapitre ou le remettre à plus tard, mais il y a une chance que cela peut vous causer des ennuis dans le futur.

Au premier regard, `var` agit de manière similaire à `let`. C'est à dire, elle déclare une variable:

```js run
function sayHi() {
  var phrase = "Hello"; // variable locale, "var" au lieu de "let"

  alert(phrase); // Hello
}

sayHi();

alert(phrase); // Erreur, phrase n'est pas définie
```

...mais voici les différences.

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

## Les déclarations "var" sont traitées au début de la fonction

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

Il convient mieux de démontrer cet énoncé avec un exemple, comme celui ci :

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

<<<<<<< HEAD
## Résumé
=======
### IIFE

As in the past there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

```js run
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

Here a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript meets `"function"` in the main code flow, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Try to declare and immediately call a function
function() { // <-- Error: Unexpected token (

  let message = "Hello";

  alert(message); // Hello

}();
```

Even if we say: "okay, let's add a name", that won't work, as JavaScript does not allow Function Declarations to be called immediately:

```js run
// syntax error because of parentheses below
function go() {

}(); // <-- can't call Function Declaration immediately
```

So, the parentheses around the function is a trick to show JavaScript that the function is created in the context of another expression, and hence it's a Function Expression: it needs no name and can be called immediately.

There exist other ways besides parentheses to tell JavaScript that we mean a Function Expression:

```js run
// Ways to create IIFE

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

In all the above cases we declare a Function Expression and run it immediately. Let's note again: nowadays there's no reason to write such code.

## Summary
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

Il y a deux différences majeures entre `var` et `let/const`:

1. Les variables `var` n'ont pas de portée limitée aux blocs. Elles sont, au minimum, visibles au niveau de la fonction.
2. Les déclarations `var` sont traitées au début de la fonction (ou au début du script pour le cas global).

<<<<<<< HEAD
Il y a une autre différence mineure associée à l'objet global, mais nous traiterons ce point dans le prochain chapitre.
=======
There's one more very minor difference related to the global object, that we'll cover in the next chapter.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

Ces différences rendent `var` pire que `let` dans la plupart des cas. Les variables au niveau des blocs sont extraordinaires. C'est pourquoi `let` a été introduit au standard il y a longtemps et c'est maintenant un moyen majeur (avec `const`) pour déclarer une variable.
