
# Closure

JavaScript est un langage très fonctionnel. Cela nous donne beaucoup de liberté. Une fonction peut être créée dynamiquement, copiée dans une autre variable ou transmise en tant qu'argument à une autre fonction et appelée ultérieurement à partir d'un endroit totalement différent.

Nous savons qu'une fonction peut accéder aux variables en dehors de celle-ci, cette fonctionnalité est utilisée assez souvent.

Mais que se passe-t-il quand une variable externe change ? Une fonction obtient-elle la valeur la plus récente ou celle qui existait lors de la création de la fonction ?

De plus, que se passe-t-il lorsqu'une fonction se déplace à un autre endroit du code et est appelée à partir de là - a-t-elle accès aux variables externes du nouvel endroit ?

Les différents langages se comportent différemment ici, dans ce chapitre, nous traitons du comportement de JavaScript en particulier.

## Quelques questions

Examinons d’abord deux situations, puis étudions la mécanique interne pièce par pièce pour pouvoir répondre aux questions suivantes et à des questions plus complexes à venir.

1. La fonction `sayHi` utilise une variable externe `name`. Lorsque la fonction est exécutée, quelle valeur va-t-elle utiliser ?

    ```js
    let name = "John";

    function sayHi() {
      alert("Hi, " + name);
    }

    name = "Pete";

    *!*
    sayHi(); // qu'est-ce que ça va afficher : "John" ou "Pete" ?
    */!*
    ```

    De telles situations sont courantes dans les développements côté navigateur et côté serveur. Une fonction peut être planifiée pour s'exécuter plus tard que sa création, par exemple après une action de l'utilisateur ou une requête du réseau.

    Donc, la question est : est-ce que cela prend en compte les dernières modifications ?


2. La fonction `makeWorker` crée une autre fonction et la renvoie. Cette nouvelle fonction peut être appelée ailleurs. Aura-t-elle accès aux variables externes à partir de son lieu de création, ou du lieu d'invocation, ou des deux ?

    ```js
    function makeWorker() {
      let name = "Pete";

      return function() {
        alert(name);
      };
    }

    let name = "John";

    // create a function
    let work = makeWorker();

    // appel
    *!*
    work(); // qu'est-ce que ça va afficher ? "Pete" (nom où elle a été créé) ou "John" (nom où elle a été appelée) ?
    */!*
    ```


## Environnement Lexical

Pour comprendre ce qui se passe, voyons d’abord ce qu’est une "variable".

En JavaScript, chaque fonction en cours d'exécution, le bloc de code `{...}` et le script dans son ensemble ont un objet associé interne (masqué) appelé *Environnement Lexical*.

L'objet Environnement Lexical comprend deux parties :

1. *Environnement Record (Enregistrement d'Environnement)* -- un objet qui stocke toutes les variables locales en tant que propriétés (et d'autres informations telles que la valeur de `this`).
2. Une référence à *l'environnement lexical externe*, celui associé au code externe.

**Une "variable" est simplement une propriété de l'objet interne spécial `Environment Record`. "obtenir ou modifier une variable" signifie "obtenir ou modifier une propriété de cet objet".**

Par exemple, dans ce code simple, il n’existe qu’un seul Environnement Lexical :

![lexical environment](lexical-environment-global.svg)

Appelé aussi Environnement Lexical global, il est associé à l'ensemble du script.

Sur l'image ci-dessus, le rectangle correspond à l'enregistrement de l'environnement (magasin de variables) et la flèche à la référence externe. L'environnement lexical global n'a pas de référence externe, il pointe donc sur `null`.

Et c'est comme ça que ça change quand une variable est définie et assignée :

![lexical environment](lexical-environment-global-2.svg)

Les rectangles de droite nous montrent comment l'environnement lexical global change au cours de l'exécution :

1. Lorsque le script démarre, l'environnement lexical est vide.
2. La déclaration de `let phrase` apparaît. Aucune valeur n’a été affectée, donc `undefined` est stocké.
3. Une valeur est assignée à `phrase`.
4. `phrase` change de valeur.

Tout a l'air simple pour l'instant, non ?

Pour résumer :

- Une variable est une propriété d'un objet interne spécial, associée au bloc / fonction / script en cours d'exécution.
- Travailler avec des variables, c'est travailler avec les propriétés de cet objet.

### Fonction Declaration

Jusqu'à présent, nous n'avons observé que des variables. Maintenant, entrons dans les Fonctions Declaration.

**Contrairement aux variables `let`, elles sont entièrement initialisées non pas lorsque l'exécution les atteint, mais plus tôt, lorsqu'un environnement lexical est créé.**

Pour les fonctions de niveau supérieur, cela signifie le moment où le script est lancé.

C'est pourquoi nous pouvons appeler une fonction déclaration avant qu'elle ne soit définie.

Le code ci-dessous montre que l'environnement lexical n'est pas vide depuis le début. Il a `say`, parce que c'est une fonction déclaration. Et plus tard, il obtient `phrase`, déclaré avec` let` :

![lexical environment](lexical-environment-global-3.svg)


### Environnement lexical intérieur et extérieur

Voyons maintenant ce qu’il se passe quand une fonction accède à une variable externe.

Pendant l'appel, `say()` utilise la variable externe `phrase`, regardons les détails de ce qui se passe.

Lorsqu'une fonction est exécutée, un nouvel environnement lexical est créé automatiquement pour stocker les variables locales et les paramètres de l'appel.

Par exemple, pour `say("John")`, cela ressemble à ceci (l'exécution est à la ligne, marquée d'une flèche) :

<!--
    ```js
    let phrase = "Hello";

    function say(name) {
     alert( `${phrase}, ${name}` );
    }

    say("John"); // Hello, John
    ```-->

![lexical environment](lexical-environment-simple.svg)

Ainsi, pendant l'appel de la fonction, nous avons deux environnements lexicaux : l'environnement interne (pour l'appel de fonction) et l'environnement externe (global) :

- L'environnement lexical interne correspond à l'exécution en cours de `say`.

    Il a une propriété unique: `name`, l'argument de la fonction. Nous avons appelé `say("John")`, donc la valeur de `name` est `John`.
- L'environnement lexical externe est l'environnement lexical global.

    Il a la variable `phrase` et la fonction elle-même.

L'environnement lexical interne a une référence à l'environnement "externe".

**Lorsque le code veut accéder à une variable -- l'environnement lexical interne est recherché en premier, puis l'environnement externe, puis l'environnement externe et ainsi de suite jusqu'à l'environnement global.**

Si une variable n’est trouvée nulle part, c’est une erreur en mode strict (sans `use strict`, une assignation à une variable inexistante, comme `user = "John"` crée une nouvelle variable globale `user`, c’est pour des soucis de compatibilité).

Voyons comment se déroule la recherche dans notre exemple :

- Lorsque le `alert` à l'intérieur de `say` veut accéder à `name`, il le trouve immédiatement dans l'environnement lexical de la fonction.
- Lorsqu'il souhaite accéder à `phrase`, il n'y a pas de `phrase` localement, il suit donc la référence à l'environnement lexical englobant et la trouve à cet emplacement.

![lexical environment lookup](lexical-environment-simple-lookup.svg)

Nous pouvons maintenant répondre à la première question du début de ce chapitre.

**Une fonction récupère les variables externes telles qu'elles sont maintenant, elle utilise les valeurs les plus récentes**

Les anciennes valeurs de variables ne sont enregistrées nulle part. Lorsqu'une fonction souhaite une variable, elle prend la valeur actuelle de son propre environnement lexical ou de l'environnement externe.

Donc, la réponse à la première question est `Pete` :

```js run
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete"; // (*)

*!*
sayHi(); // Pete
*/!*
```


Le flux d'exécution du code ci-dessus :

1. L’environnement lexical global a `name: "John"`.
2. A la ligne `(*)` la variable globale est changée, maintenant elle a `name: "Pete"`.
3. Lorsque la fonction `sayHi()` est exécutée elle prend `name` de l'extérieur. Ici, cela provient de l’environnement lexical global qui correspond à `"Pete"`.


```smart header="Un appel -- un environnement lexical"
Veuillez noter qu'un nouvel Environnement Lexical de fonction est créée à chaque exécution d'une fonction.

Et si une fonction est appelée plusieurs fois, chaque appel aura son propre environnement lexical, avec des variables locales et des paramètres spécifiques à cette exécution.
```

```smart header="L'environnement lexical est un objet de spécification"
"L'Environnement Lexical" est un objet de spécification : il n'existe que "théoriquement" dans le [language specification](https://tc39.es/ecma262/#sec-lexical-environments) pour décrire comment fonctionnent les choses. Nous ne pouvons pas obtenir cet objet dans notre code et le manipuler directement. Les moteurs JavaScript peuvent également l'optimiser, ignorer les variables non utilisées pour économiser de la mémoire et effectuer d'autres astuces internes, tant que le comportement visible reste tel que décrit.
```


## Fonctions imbriquées

Une fonction est appelée "imbriquée" lorsqu'elle est créée dans une autre fonction.

Il est facilement possible de faire cela avec JavaScript.

Nous pouvons l'utiliser pour organiser notre code, comme ceci :

```js
function sayHiBye(firstName, lastName) {

  // helper nested function to use below
  function getFullName() {
    return firstName + " " + lastName;
  }

  alert( "Hello, " + getFullName() );
  alert( "Bye, " + getFullName() );

}
```

Ici, la fonction *imbriquée* `getFullName()` est faite pour plus de commodité. Elle peut accéder aux variables externes et peut donc renvoyer le nom complet. Les fonctions imbriquées sont assez courantes dans JavaScript.

Plus intéressant encore, une fonction imbriquée peut être renvoyée : soit en tant que propriété d’un nouvel objet (si la fonction externe crée un objet avec des méthodes), soit en tant que résultat seul. Elle peut ensuite être utilisée ailleurs. Peu importe où, elle a toujours accès aux mêmes variables externes.

Par exemple, ici la fonction imbriquée est assignée au nouvel objet par le [constructeur de fonction](info:constructor-new):

```js run
// le constructeur de fonction retourne un nouvel objet
function User(name) {

  // la méthode de l'objet est créée en tant que fonction imbriquée
  this.sayHi = function() {
    alert(name);
  };
}

let user = new User("John");
user.sayHi(); // le code de la méthode "sayHi" a accès au "name" extérieur
```

Et ici, nous venons de créer et de renvoyer une fonction "counting" :

```js run
function makeCounter() {
  let count = 0;

  return function() {
    return count++; // a accès au "count" extérieur
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```

Continuons avec l'exemple `makeCounter`. Il crée la fonction "count" qui renvoie le nombre suivant à chaque appel. Bien qu’elles soient simples, des variantes légèrement modifiées de ce code ont des utilisations pratiques, par exemple  en tant que [pseudorandom number generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator), et plus.

Comment fonctionne le compteur en interne ?

Lorsque la fonction interne est exécutée, la variable dans `count ++` est recherchée de l'intérieur. Pour l'exemple ci-dessus, l'ordre sera :

![](lexical-search-order.svg)

1. Les locaux de la fonction imbriquée …
2. Les variables de la fonction externe …
3. Et ainsi de suite jusqu'à atteindre les variables globales.

Dans cet exemple, `count` se trouve à l'étape `2`. Lorsqu'une variable externe est modifiée, elle est modifiée à l'endroit où elle est trouvée. Donc `count ++` trouve la variable externe et l'augmente dans l'environnement lexical auquel elle appartient. Comme si nous avions `let count = 1`.

Voici deux questions à considérer :

1. Pouvons-nous en quelque sorte réinitialiser le compteur `count` à partir du code qui n'appartient pas à `makeCounter` ? Par exemple. après les appels `alert` dans l'exemple ci-dessus.
2. Si nous appelons `makeCounter()` plusieurs fois, cela retourne de nombreuses fonctions `counter`. Sont-ils indépendants ou partagent-ils le même `count` ?

Essayez d'y répondre avant de continuer à lire.

...

Terminé ?

Ok, passons en revue les réponses.

1. Il n'y a aucun moyen : `count` est une variable de fonction locale, nous ne pouvons y accéder de l'extérieur.
2. Pour chaque appel à `makeCounter()`, un nouveau Environnement Lexical de fonction est créé, avec son propre `count`. Les fonctions `counter` résultantes sont donc indépendantes.

Voici la démo :

```js run
function makeCounter() {
  let count = 0;
  return function() {
    return count++;
  };
}

let counter1 = makeCounter();
let counter2 = makeCounter();

alert( counter1() ); // 0
alert( counter1() ); // 1

alert( counter2() ); // 0 (independent)
```


Espérons que la situation avec les variables externes est claire maintenant. Dans la plupart des situations, une telle compréhension suffit. Il y a peu de détails dans la spécification que nous avons omis par souci de brièveté. Donc, dans la section suivante, nous couvrirons plus de détails.

## Les environnements en détail

Voici ce qui se passe dans l'exemple `makeCounter` pas à pas, suivez-le pour vous assurer de comprendre comment cela fonctionne en détail.

Veuillez noter que la propriété additionnelle `[[Environment]]` est couverte ici. Nous ne l'avions pas mentionné avant pour la simplicité.

1. Lorsque le script vient de commencer, il n’existe qu’un environnement lexical global :

    ![](lexenv-nested-makecounter-1.svg)

    A ce moment, il n'y a qu'une fonction `makeCounter`, car c'est une fonction déclaration. Elle n'a pas encore été exécutée.

    **Toutes les fonctions "à la naissance" reçoivent une propriété cachée `[[Environment]]` avec une référence à l'environnement lexical de leur création.**

    Nous n'en avons pas encore parlé, c'est ainsi que la fonction sait où elle a été créée.

    Ici, `makeCounter` est créé dans l'environnement lexical global, donc `[[Environment]]` en garde une référence.

    En d'autres termes, une fonction est "imprimée" avec une référence à l'environnement lexical où elle est née. Et `[[Environment]]` est la propriété cachée de la fonction qui a cette référence.

2. Le code s'exécute, la nouvelle variable globale `counter` est déclarée et obtient le résultat de l'appel de `makeCounter() `. Voici un instantané du moment où l'exécution est sur la première ligne de `makeCounter()` :

    ![](lexenv-nested-makecounter-2.svg)

    Au moment de l'appel de `makeCounter()`, l'environnement lexical est créé pour contenir ses variables et ses arguments.

    Comme tous les environnements lexicaux, il stocke deux choses :
    1. Un enregistrement d'environnement avec des variables locales. Dans notre cas, `count` est la seule variable locale (qui apparaît lorsque la ligne avec `let count` est exécutée).

    2. La référence lexicale externe, qui est définie sur la valeur de `[[Environment]]` de la fonction. Ici `[[Environnement]]` de `makeCounter` fait référence à l'environnement lexical global.

    Nous avons donc maintenant deux environnements lexicaux: le premier est global, le second est pour l’appel `makeCounter` actuel, avec la référence externe à global.

3. Lors de l'exécution de `makeCounter()`, une petite fonction imbriquée est créée.

    Peu importe que la fonction soit créée à l'aide de la fonction déclaration ou de la fonction expression. Toutes les fonctions obtiennent la propriété `[[Environment]]` qui fait référence à l'environnement lexical dans lequel elles ont été créées. Donc, notre nouvelle fonction imbriquée l'obtient également.

    Pour notre nouvelle fonction imbriquée, la valeur de `[[Environment]]` est l'environnement lexical actuel de `makeCounter()` (où elle est née) :

    ![](lexenv-nested-makecounter-3.svg)

    Veuillez noter qu'à cette étape, la fonction interne a été créée, mais pas encore appelée. Le code à l'intérieur de `function() { return count ++; }` n'est pas en cours d'exécution.

4. Au fur et à mesure de l'exécution, l'appel à `makeCounter()` se termine et le résultat (la fonction imbriquée minuscule) est affecté à la variable globale `counter` :

    ![](lexenv-nested-makecounter-4.svg)

    Cette fonction n'a qu'une seule ligne: `return count++`, qui sera exécutée lors de son exécution.

5. Lorsque `counter()` est appelé, un nouvel environnement lexical est créé pour l'appel. Il est vide, parce que `counter` n'a pas de variable locale par lui-même. Mais le `[[Environnement]]` de `counter` est utilisé comme référence `externe` pour lui, ce qui donne accès aux variables de l'ancien appel `makeCounter()` où il a été créé :

    ![](lexenv-nested-makecounter-5.svg)

    Désormais, lorsque l'appel recherche la variable `count`, il commence par rechercher son propre environnement lexical (vide), puis l'environnement lexical de l'appel` makeCounter() `extérieur, où il le trouve.

    Please note how memory management works here. Although `makeCounter()` call finished some time ago, its Lexical Environment was retained in memory, because there's a nested function with `[[Environment]]` referencing it.

    Generally, a Lexical Environment object lives as long as there is a function which may use it. And only when there are none remaining, it is cleared.

6. The call to `counter()` not only returns the value of `count`, but also increases it. Note that the modification is done "in place". The value of `count` is modified exactly in the environment where it was found.

    ![](lexenv-nested-makecounter-6.svg)

7. Next `counter()` invocations do the same.

The answer to the second question from the beginning of the chapter should now be obvious.

The `work()` function in the code below gets `name` from the place of its origin through the outer lexical environment reference:

![](lexenv-nested-work.svg)

So, the result is `"Pete"` here.

But if there were no `let name` in `makeWorker()`, then the search would go outside and take the global variable as we can see from the chain above. In that case it would be `"John"`.

```smart header="Closures"
There is a general programming term "closure", that developers generally should know.

A [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) is a function that remembers its outer variables and can access them. In some languages, that's not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exclusion, to be covered in <info:new-function>).

That is: they automatically remember where they were created using a hidden `[[Environment]]` property, and all of them can access outer variables.

When on an interview, a frontend developer gets a question about "what's a closure?", a valid answer would be a definition of the closure and an explanation that all functions in JavaScript are closures, and maybe few more words about technical details: the `[[Environment]]` property and how Lexical Environments work.
```

## Code blocks and loops, IIFE

The examples above concentrated on functions. But a Lexical Environment exists for any code block `{...}`.

A Lexical Environment is created when a code block runs and contains block-local variables. Here are a couple of examples.

### If

In the example below, the `user` variable exists only in the `if` block:

<!--
    ```js run
    let phrase = "Hello";

    if (true) {
        let user = "John";

        alert(`${phrase}, ${user}`); // Hello, John
    }

    alert(user); // Error, can't see such variable!
    ```-->

![](lexenv-if.svg)

When the execution gets into the `if` block, the new "if-only" Lexical Environment is created for it.

It has the reference to the outer one, so `phrase` can be found. But all variables and Function Expressions, declared inside `if`, reside in that Lexical Environment and can't be seen from the outside.

For instance, after `if` finishes, the `alert` below won't see the `user`, hence the error.

### For, while

For a loop, every iteration has a separate Lexical Environment. If a variable is declared in `for(let ...)`, then it's also in there:

```js run
for (let i = 0; i < 10; i++) {
  // Each loop has its own Lexical Environment
  // {i: value}
}

alert(i); // Error, no such variable
```

Please note: `let i` is visually outside of `{...}`. The `for` construct is special here: each iteration of the loop has its own Lexical Environment with the current `i` in it.

Again, similarly to `if`, after the loop `i` is not visible.

### Code blocks

We also can use a "bare" code block `{…}` to isolate variables into a "local scope".

For instance, in a web browser all scripts (except with `type="module"`) share the same global area. So if we create a global variable in one script, it becomes available to others. But that becomes a source of conflicts if two scripts use the same variable name and overwrite each other.

That may happen if the variable name is a widespread word, and script authors are unaware of each other.

If we'd like to avoid that, we can use a code block to isolate the whole script or a part of it:

```js run
{
  // do some job with local variables that should not be seen outside

  let message = "Hello";

  alert(message); // Hello
}

alert(message); // Error: message is not defined
```

The code outside of the block (or inside another script) doesn't see variables inside the block, because the block has its own Lexical Environment.

### IIFE

In the past, there were no block-level lexical environment in JavaScript.

So programmers had to invent something. And what they did is called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not a thing we should use nowadays, but you can find them in old scripts, so it's better to understand them.

IIFE looks like this:

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

So, parentheses around the function is a trick to show JavaScript that the function is created in the context of another expression, and hence it's a Function Expression: it needs no name and can be called immediately.

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

## Garbage collection

Usually, a Lexical Environment is cleaned up and deleted after the function run. For instance:

```js
function f() {
  let value1 = 123;
  let value2 = 456;
}

f();
```

Here two values are technically the properties of the Lexical Environment. But after `f()` finishes that Lexical Environment becomes unreachable, so it's deleted from the memory.

...But if there's a nested function that is still reachable after the end of `f`, then it has `[[Environment]]` property that references the outer lexical environment, so it's also reachable and alive:

```js
function f() {
  let value = 123;

  function g() { alert(value); }

*!*
  return g;
*/!*
}

let g = f(); // g is reachable, and keeps the outer lexical environment in memory
```

Please note that if `f()` is called many times, and resulting functions are saved, then all corresponding Lexical Environment objects will also be retained in memory. All 3 of them in the code below:

```js
function f() {
  let value = Math.random();

  return function() { alert(value); };
}

// 3 functions in array, every one of them links to Lexical Environment
// from the corresponding f() run
let arr = [f(), f(), f()];
```

A Lexical Environment object dies when it becomes unreachable (just like any other object). In other words, it exists only while there's at least one nested function referencing it.

In the code below, after `g` becomes unreachable, enclosing Lexical Environment (and hence the `value`) is  cleaned from memory;

```js
function f() {
  let value = 123;

  function g() { alert(value); }

  return g;
}

let g = f(); // while g is alive
// their corresponding Lexical Environment lives

g = null; // ...and now the memory is cleaned up
```

### Real-life optimizations

As we've seen, in theory while a function is alive, all outer variables are also retained.

But in practice, JavaScript engines try to optimize that. They analyze variable usage and if it's obvious from the code that an outer variable is not used -- it is removed.

**An important side effect in V8 (Chrome, Opera) is that such variable will become unavailable in debugging.**

Try running the example below in Chrome with the Developer Tools open.

When it pauses, in the console type `alert(value)`.

```js run
function f() {
  let value = Math.random();

  function g() {
    debugger; // in console: type alert(value); No such variable!
  }

  return g;
}

let g = f();
g();
```

As you could see -- there is no such variable! In theory, it should be accessible, but the engine optimized it out.

That may lead to funny (if not such time-consuming) debugging issues. One of them -- we can see a same-named outer variable instead of the expected one:

```js run global
let value = "Surprise!";

function f() {
  let value = "the closest value";

  function g() {
    debugger; // in console: type alert(value); Surprise!
  }

  return g;
}

let g = f();
g();
```

```warn header="See ya!"
This feature of V8 is good to know. If you are debugging with Chrome/Opera, sooner or later you will meet it.

That is not a bug in the debugger, but rather a special feature of V8. Perhaps it will be changed sometime.
You always can check for it by running the examples on this page.
```
