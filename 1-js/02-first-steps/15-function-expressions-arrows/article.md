# Fonctions Expressions et Fonctions Fléchées

En JavaScript, une fonction n'est pas une "structure de langage magique", mais un type de valeur particulier.

La syntaxe utilisée précédemment s'appelle une *déclaration de fonction* :

```js
function sayHi() {
  alert( "Hello" );
}
```

Il existe une autre syntaxe pour créer une fonction appelée *Expression de Fonction*.

Cela ressemble à ceci :

```js
let sayHi = function() {
  alert( "Hello" );
};
```

Ici, la fonction est créée et attribuée explicitement à la variable, comme toute autre valeur. Quelle que soit la définition de la fonction, il ne s’agit que d’une valeur stockée dans la variable `sayHi`.


La signification de ces exemples de code est la même : "créer une fonction et la placer dans la variable `sayHi`".

Nous pouvons même afficher cette valeur en utilisant `alert` :

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // affiche le code de la fonction
*/!*
```

Veuillez noter que la dernière ligne n'exécute pas la fonction, car il n'y a pas de parenthèses après `sayHi`. Il y a des langages de programmation où toute mention d'un nom de fonction provoque son exécution, mais JavaScript n'est pas comme ça.

En JavaScript, une fonction est une valeur, nous pouvons donc la traiter comme une valeur. Le code ci-dessus montre sa représentation sous forme de chaîne de caractères, qui est le code source.

Certes, une fonction est une valeur spéciale, en ce sens que nous pouvons l'appeler comme cela `sayHi()`.

Mais c’est toujours une valeur. Nous pouvons donc travailler avec comme avec d’autres types de valeurs.

Nous pouvons copier une fonction dans une autre variable :

```js run no-beautify
function sayHi() {   // (1) créer
  alert( "Hello" );
}

let func = sayHi;    // (2) copier

func(); // Hello     // (3) exécuter la copie (ça fonctionne)!
sayHi(); // Hello    //     cela fonctionne toujours aussi (pourquoi pas)
```

Voici ce qui se passe ci-dessus en détail :

1. La Déclaration de Fonction `(1)` crée la fonction et la place dans la variable nommée `sayHi`.
2. La ligne `(2)` le copie dans la variable `func`. Veuillez noter à nouveau : il n'y a pas de parenthèses après `sayHi`. S'il y en avait, alors `func = sayHi()` écrirait *le résultat de l'appel* `sayHi()` dans `func`, et non *la fonction* `sayHi` elle-même.
3. Maintenant, la fonction peut être appelée à la fois en tant que `sayHi()` et `func()`.

Notez que nous aurions aussi pu utiliser une Expression de Fonction pour déclarer `sayHi`, à la première ligne :

```js
let sayHi = function() { ... };

let func = sayHi;
// ...
```

Tout fonctionnerait de la même manière. Ce qui se passe est encore plus évident, non ?


````smart header="Pourquoi y a-t-il un point-virgule à la fin ?"
Il peut y avoir une question, pourquoi l'Expression de Fonction a un point-virgule `;` à la fin, et la Déclaration de Fonction non :


```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

<<<<<<< HEAD
La réponse est simple :
- Il n’ya pas besoin de `;` à la fin des blocs de code et des structures de syntaxe qui les utilisent comme `if { ... }`, `for {  }`, `function f {  }` etc.
- Une Fonction Expression est utilisée dans la déclaration : `let sayHi = …;`, en tant que valeur. Ce n’est pas un bloc de code, mais plutôt une affectation. Le point-virgule `;` est recommandé à la fin des déclarations, quelle que soit la valeur. Donc, le point-virgule ici n'est en aucun cas lié à la Fonction Expression elle même, il termine simplement l'instruction.
=======
The answer is simple:
- There's no need for `;` at the end of code blocks and syntax structures that use them like `if { ... }`, `for {  }`, `function f { }` etc.
- A Function Expression is used inside the statement: `let sayHi = ...;`, as a value. It's not a code block, but rather an assignment. The semicolon `;` is recommended at the end of statements, no matter what the value is. So the semicolon here is not related to the Function Expression itself, it just terminates the statement.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
````

## Fonctions callback (de rappel)

Examinons plus d’exemples de :fonctions passées en tant que valeurs et utilisant des expressions de fonction.

Nous allons écrire une fonction `ask(question, oui, non)` avec trois paramètres :

`question`
: Texte de la question

`Yes`
: Fonction à exécuter si la réponse est “Yes”

`no`
: Fonction à exécuter si la réponse est “No”

La fonction doit poser la question et, en fonction de la réponse de l'utilisateur, appeler `yes()` ou `no()` :

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// utilisation: les fonctions showOk, showCancel sont transmises en tant qu'arguments à ask
ask("Do you agree?", showOk, showCancel);
```

Avant d’explorer comment nous pouvons l’écrire de manière beaucoup plus courte, notons que dans le navigateur (et du côté serveur dans certains cas), ces fonctions sont très populaires. La principale différence entre une implémentation réelle et l'exemple ci-dessus est que les fonctions réelles utilisent des moyens plus complexes d'interagir avec l'utilisateur qu'un simple `confirm`. Dans le navigateur, une telle fonction dessine généralement une belle fenêtre de questions. Mais c’est une autre histoire.

<<<<<<< HEAD
**Les arguments de `ask` s'appellent des *fonctions de rappel* (callback functions) ou simplement des *rappels* (callbacks).**
=======
**The arguments `showOk` and `showCancel` of `ask` are called *callback functions* or just *callbacks*.**
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

L'idée est que nous passions une fonction et attendions qu'elle soit "rappelée" plus tard si nécessaire. Dans notre cas, `showOk` devient le rappel pour la réponse "oui" et `showCancel` pour la réponse "non".

Nous pouvons utiliser les Expressions de Fonction pour écrire la même fonction mais plus courte :

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
*/!*
```


Ici, les fonctions sont déclarées directement dans l'appel `ask(...)`. Ils n'ont pas de nom et sont donc appelés *anonymes*. De telles fonctions ne sont pas accessibles en dehors de `ask` (car elles ne sont pas affectées à des variables), mais c’est exactement ce que nous voulons ici.

Ce genre de code apparaît dans nos scripts très naturellement, c’est dans l’esprit de JavaScript.


```smart header="Une fonction est une valeur représentant une \"action\""
Des valeurs régulières telles que des chaînes de caractères ou des nombres représentent des *données*.

Une fonction peut être perçue comme une *action*.

Nous pouvons tout aussi bien la passer en tant que variable ou l'exécuter si nous le voulons.
```


## Fonction Expression vs Fonction Déclaration

Formulons les principales différences entre les déclarations de fonction et les expressions de fonctions.

Tout d'abord, la syntaxe : comment les différencier dans le code.

- *Déclaration de fonction:* une fonction déclarée séparément dans le flux de code principal.

    ```js
    // Function Declaration
    function sum(a, b) {
      return a + b;
    }
    ```
- *Fonction Expression :* une fonction créée dans une expression ou dans une autre construction de syntaxe. Ici, la fonction est créée à droite de "l'affectation de l'expression" `=` :
    
    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    };
    ```

La différence la plus subtile est *quand* une fonction est créée par le moteur JavaScript.

**Une Fonction Expression est créée lorsque l’exécution l’atteint et est utilisable à partir de cet moment.**

Une fois que le flux d'exécution passe à droite de l'affectation, `let sum = function…` -- voilà, la fonction est créée et peut désormais être utilisée (assignée, appelée, etc.) à partir de maintenant.

Les déclarations de fonction sont différentes.

**Une fonction déclaration peut être appelée plus tôt que sa définition.**

Par exemple, une fonction déclaration globale est visible dans tout le script, peu importe où elle se trouve.

Cela est dû aux algorithmes internes. Lorsque JavaScript se prépare à exécuter le script, il recherche d'abord les fonction déclarations globales et créer les fonctions. Nous pouvons considérer cela comme une "étape d'initialisation".

Et après le traitement de toutes les fonction déclarations, le code est exécuté. Donc, il a accès à ces fonctions.

Par exemple, cela fonctionne :

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

La déclaration de fonction `sayHi` est créée lorsque JavaScript est sur le point de démarrer le script et est visible partout dans celui-ci.

… S’il s’agissait d’une Fonction Expression, cela ne fonctionnerait pas :

```js run refresh untrusted
*!*
sayHi("John"); // erreur!
*/!*

let sayHi = function(name) {  // (*) plus de magie
  alert( `Hello, ${name}` );
};
```

Les expressions de fonction sont créées lorsque l'exécution les atteint. Cela ne se produirait que dans la ligne `(*)`. Trop tard.

Une autre particularité des Fonction Declaration est leur portée de bloc.

**En mode strict, quand une Fonction Déclaration se trouve dans un bloc de code, elle est visible partout dans ce bloc. Mais pas en dehors.**

Par exemple, imaginons que nous ayons besoin de déclarer une fonction `welcome()` en fonction de la variable d’`age` obtenue lors de l’exécution. Et ensuite, nous prévoyons de l'utiliser quelque temps plus tard.

Si nous utilisons la fonction déclaration, cela ne fonctionnera pas comme prévu :

```js run
let age = prompt("Quel est votre age ?", 18);

// déclarer conditionnellement une fonction
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...l'utiliser plus tard
*!*
welcome(); // Error: welcome is not defined
*/!*
```

C’est parce qu’une déclaration de fonction n’est visible que dans le bloc de code dans lequel elle réside.

Voici un autre exemple :

```js run
let age = 16; // prendre 16 comme exemple

if (age < 18) {
*!*
  welcome();               // \   (exécution)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Hello!");      //  |  La déclaration de fonction est disponible
  }                        //  |  partout dans le bloc où elle est déclarée
                           //  |
*!*
  welcome();               // /   (exécution)
*/!*

} else {

  function welcome() {    
    alert("Greetings!");
  }
}

// Ici, nous sommes en dehors des accolades,
// nous ne pouvons donc pas voir les déclarations de fonction faites à l'intérieur de celles-ci.

*!*
welcome(); // Error: welcome is not defined
*/!*
```

Que pouvons-nous faire pour rendre `welcome` visible en dehors de `if` ?

L'approche correcte consisterait à utiliser une expression de fonction et à attribuer `welcome` à la variable déclarée en dehors de `if` et offrant la visibilité appropriée.

Ce code fonctionne comme prévu :

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

*!*
welcome(); // ok maintenant
*/!*
```

Ou nous pourrions simplifier encore davantage en utilisant un opérateur point d'interrogation `?` :

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

*!*
welcome(); // ok maintenant
*/!*
```


```smart header="Quand choisir la fonction déclaration par rapport à la fonction expression ?"
En règle générale, lorsque nous devons déclarer une fonction, la première chose à prendre en compte est la syntaxe de la fonction déclaration, celle que nous utilisions auparavant. Cela donne plus de liberté dans l'organisation de notre code, car nous pouvons appeler de telles fonctions avant qu'elles ne soient déclarées.

C’est également meilleur pour la lisibilité, car il est plus facile de rechercher la `fonction f(…) {…}` dans le code que `let f = function(…) {…}`. Les fonction déclarations sont plus "accrocheuses".

… Mais si une déclaration de fonction ne nous convient pas pour une raison quelconque (nous en avons vu un exemple ci-dessus), alors il convient d'utiliser une Fonction Expression.
```


## Fonctions fléchées [#arrow-functions]

Il existe une autre syntaxe très simple et concise pour la création de fonctions, qui est souvent meilleure que Expressions de fonctions. On l’appelle "fonctions fléchées", car elle ressemble à ceci :


```js
let func = (arg1, arg2, ...argN) => expression
```

… Ceci crée une fonction `func` qui a les arguments `arg1..argN`, évalue l'`expression` du côté droit avec leur utilisation et retourne le résultat.

En d’autres termes, c’est à peu près la même chose que :

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
}
```

… Mais beaucoup plus concis.

Voyons un exemple :

```js run
let sum = (a, b) => a + b;

/* La fonction fléchée est une forme plus courte de :

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3

```

Si nous n’avons qu’un seul argument, alors les parenthèses autour peuvent être omises, ce qui le rend encore plus court :

```js run
// identique à
// let double = function(n) { return n * 2 }
*!*
let double = n => n * 2;
*/!*

alert( double(3) ); // 6
```

S'il n'y a pas d'argument, les parenthèses doivent être vides (mais elles doivent être présentes) :

```js run
let sayHi = () => alert("Hello!");

sayHi();
```

Les fonctions fléchées peuvent être utilisées de la même manière que les expressions de fonction.

Par exemple, voici l’exemple réécrit avec `welcome()` :

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ok maintenant
```

Les fonctions fléchées peuvent sembler inconnues et pas très lisibles au début, mais cela change rapidement au fur et à mesure que les yeux s'habituent à la structure.

Ils sont très pratiques pour les actions simples en une ligne, quand nous sommes trop paresseux pour écrire beaucoup de mots.

```smart header="Fonctions de flèche multilignes"

Les exemples ci-dessus ont pris les arguments à gauche de `=>` et ont évalué l'expression de droite avec eux.

Parfois, nous avons besoin de quelque chose d'un peu plus complexe, comme plusieurs expressions ou déclarations. C'est également possible, mais nous devrions les enfermer entre des accolades. Ensuite, utilisez un `return` normal en leur sein.

Comme ceci :

```js run
let sum = (a, b) => {  // l'accolade ouvre une fonction multiligne
  let result = a + b;
*!*
  return result; // si nous utilisons des accolades, utilisez return pour obtenir des résultats
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="Plus à venir"

Ici, nous avons félicité les fonctions fléchées pour leur brièveté. Mais ce n'est pas tout! Les fonctions fléchées ont d'autres caractéristiques intéressantes. Nous y reviendrons plus tard dans le chapitre <info:arrow-functions>.

Pour l'instant, nous pouvons déjà les utiliser pour des actions d'une seule ligne et des rappels.
```

## Résumé

- Les fonctions sont des valeurs. Ils peuvent être attribués, copiés ou déclarés à n’importe quel endroit du code.
- Si la fonction est déclarée comme une instruction distincte dans le flux de code principal, cela s'appelle une "déclaration de fonction".
- Si la fonction est créée dans le cadre d’une expression, elle est appelée "expression de fonction".
- Les déclarations de fonctions sont traitées avant l'exécution du bloc de code. Elles sont visibles partout dans le bloc.
- Les expressions de fonction sont créées lorsque le flux d’exécution les atteint.


Dans la plupart des cas, lorsque nous devons déclarer une fonction, une déclaration de fonction est préférable car elle est visible avant la déclaration elle-même. Cela nous donne plus de flexibilité dans l'organisation du code et il est généralement plus lisible.

Nous devrions donc utiliser une expression de fonction uniquement lorsqu'une déclaration de fonction n'est pas adaptée à la tâche. Nous en avons vu quelques exemples dans ce chapitre et nous en verrons davantage à l’avenir.

Les fonctions fléchées sont pratiques pour les one-liners (action sur une ligne). Ils viennent sous deux formes :

1. Sans accolades : `(...args) => expression` -- le côté droit est une expression: la fonction l'évalue et renvoie le résultat.
2. Avec des accolades : `(...args) => { body }` -- les accolades nous permettent d'écrire plusieurs instructions dans la fonction, mais nous avons besoin d'un `return` explicite pour retourner quelque chose.
