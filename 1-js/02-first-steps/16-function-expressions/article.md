# Fonctions Expressions

En JavaScript, une fonction n'est pas une "structure de langage magique", mais un type de valeur particulier.

La syntaxe utilisée précédemment s'appelle une *déclaration de fonction* :

```js
function sayHi() {
  alert( "Hello" );
}
```

Il existe une autre syntaxe pour créer une fonction appelée *Expression de Fonction*.

Cela nous permet de créer une nouvelle fonction au milieu de n'importe quelle expression.

Par exemple :

```js
let sayHi = function() {
  alert( "Hello" );
};
```

Ici, nous pouvons voir une variable `sayHi` obtenir une valeur, la nouvelle fonction, créée en tant que `function() { alert("Hello"); }`.

Comme la création de la fonction se produit dans le contexte de l'expression d'affectation (à droite de `=`), il s'agit d'une *Fonction Expression*.

Veuillez noter qu'il n'y a pas de nom après le mot clé `function`. L'omission d'un nom est autorisée pour les fonctions expressions.

Ici, nous l'assignons immédiatement à la variable, donc la signification de ces exemples de code est la même : "créer une fonction et la mettre dans la variable `sayHi`".

Dans des situations plus avancées, que nous verrons plus tard, une fonction peut être créée et immédiatement appelée ou planifiée pour une exécution ultérieure, non stockée nulle part, restant ainsi anonyme.

## La fonction est une valeur

Répétons-le : quelle que soit la manière dont la fonction est créée, une fonction est une valeur. Les deux exemples ci-dessus stockent une fonction dans la variable `sayHi`.

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
2. La ligne `(2)` la copie dans la variable `func`. Veuillez noter à nouveau : il n'y a pas de parenthèses après `sayHi`. S'il y en avait, alors `func = sayHi()` écrirait *le résultat de l'appel* `sayHi()` dans `func`, et non *la fonction* `sayHi` elle-même.
3. Maintenant, la fonction peut être appelée à la fois en tant que `sayHi()` et `func()`.

Nous aurions aussi pu utiliser une Fonction Expression pour déclarer `sayHi`, à la première ligne :

```js
let sayHi = function() { // (1) create
  alert( "Hello" );
};

let func = sayHi;  //(2)
// ...
```

Tout fonctionnerait de la même manière.


````smart header="Pourquoi y a-t-il un point-virgule à la fin ?"
Il peut y avoir une question, pourquoi la Fonction Expression a un point-virgule `;` à la fin, et la Fonction Déclaration non :


```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

La réponse est simple : une expression de fonction est créée ici en tant que `function(…) {…}` à l'intérieur de l'instruction d'affectation : `let sayHi = …;`. Le point-virgule `;` est recommandé à la fin de l'instruction, il ne fait pas partie de la syntaxe de la fonction.

Le point-virgule serait là pour une affectation plus simple, telle que `let sayHi = 5;`, et il est également là pour une affectation de fonction.
````

## Fonctions callback (de rappel)

Examinons plus d’exemples de fonctions passées en tant que valeurs et utilisant des expressions de fonction.

Nous allons écrire une fonction `ask(question, yes, no)` avec trois paramètres :

`question`
: Texte de la question

`yes`
: Fonction à exécuter si la réponse est “Yes”

`no`
: Fonction à exécuter si la réponse est “No”

La fonction doit poser la question et, en fonction de la réponse de l'utilisateur, appeler `yes()` ou `no()` :

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes();
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

En pratique, ces fonctions sont très utiles. La principale différence entre une demande réelle (`ask`) et l'exemple ci-dessus est que les fonctions réelles utilisent des moyens d'interagir avec l'utilisateur plus complexes que la simple confirmation (`confirm`). Dans le navigateur, une telle fonction dessine généralement une belle fenêtre de questions. Mais c'est une autre histoire.

**Les arguments `showOk` et `showCancel` de `ask` s'appellent des *fonctions callback* (fonctions de rappel) ou simplement des *callbacks* (rappels).**

L'idée est que nous passions une fonction et attendions qu'elle soit "rappelée" plus tard si nécessaire. Dans notre cas, `showOk` devient le rappel pour la réponse "oui" et `showCancel` pour la réponse "non".

Nous pouvons utiliser les Fonctions Expressions pour écrire la même fonction mais plus courte :

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes();
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

Ici, les fonctions sont déclarées directement dans l'appel `ask(...)`. Elles n'ont pas de nom et sont donc appelées *anonymes*. De telles fonctions ne sont pas accessibles en dehors de `ask` (car elles ne sont pas affectées à des variables), mais c’est exactement ce que nous voulons ici.

Ce genre de code apparaît dans nos scripts très naturellement, c’est dans l’esprit de JavaScript.

```smart header="Une fonction est une valeur représentant une \"action\""
Des valeurs régulières telles que des chaînes de caractères ou des nombres représentent les *données*.

Une fonction peut être perçue comme une *action*.

Nous pouvons tout aussi bien la passer en tant que variable ou l'exécuter si nous le voulons.
```

## Fonction Expression vs Fonction Déclaration

Formulons les principales différences entre les déclarations de fonction et les expressions de fonctions.

Tout d'abord, la syntaxe : comment les différencier dans le code.

- *La Fonction Déclaration* une fonction déclarée séparément dans le flux de code principal.

    ```js
    // Function Declaration
    function sum(a, b) {
      return a + b;
    }
    ```
- *La Fonction Expression :* une fonction créée dans une expression ou dans une autre construction de syntaxe. Ici, la fonction est créée à droite de "l'affectation de l'expression" `=` :

    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    };
    ```

La différence la plus subtile est *quand* une fonction est créée par le moteur JavaScript.

**Une Fonction Expression est créée lorsque l’exécution l’atteint.**

Une fois que le flux d'exécution passe à droite de l'affectation, `let sum = function…` , la fonction est créée et peut désormais être utilisée (assignée, appelée, etc.).

Les déclarations de fonction sont différentes.

**Une Fonction Déclaration peut être appelée plus tôt que sa définition.**

Par exemple, une fonction déclaration globale est visible dans tout le script, peu importe où elle se trouve.

Cela est dû aux algorithmes internes. Lorsque JavaScript se prépare à exécuter le script, il recherche d'abord les fonctions déclarations globales et les crée. Nous pouvons considérer cela comme une "étape d'initialisation".

Une fois que toutes les déclarations de fonctions ont été traitées, le reste du code est exécuté. Ainsi, il a accès à ces fonctions pour les appeler.

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

 
Une autre particularité des Fonctions Declaration est leur portée de bloc.
 

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
    alert("Hello!");       //  |  La déclaration de fonction est disponible
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

Ou nous pourrions simplifier encore davantage en utilisant un opérateur conditionnel ternaire `?` :

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
En règle générale, lorsque nous devons déclarer une fonction, la première chose à prendre en compte est la syntaxe de la fonction déclaration. Cela donne plus de liberté dans l'organisation de notre code, car nous pouvons appeler de telles fonctions avant qu'elles ne soient déclarées.

C’est également meilleur pour la lisibilité, car il est plus facile de rechercher la `fonction f(…) {…}` dans le code que `let f = function(…) {…};`. Les fonction déclarations sont plus "accrocheuses".

… Mais si une déclaration de fonction ne nous convient pas pour une raison quelconque (nous en avons vu un exemple ci-dessus), alors il convient d'utiliser une Fonction Expression.
```


## Résumé

- Les fonctions sont des valeurs. Elles peuvent être attribuées, copiées ou déclarées à n’importe quel endroit du code.
- Si la fonction est déclarée comme une instruction distincte dans le flux de code principal, cela s'appelle une "déclaration de fonction".
- Si la fonction est créée dans le cadre d’une expression, elle est appelée "expression de fonction".
- Les déclarations de fonctions sont traitées avant l'exécution du bloc de code. Elles sont visibles partout dans le bloc.
- Les expressions de fonction sont créées lorsque le flux d’exécution les atteint.

Dans la plupart des cas, lorsque nous devons déclarer une fonction, une fonction déclaration est préférable parce qu'elle est visible avant la déclaration elle-même. Cela nous donne plus de flexibilité dans l'organisation du code et il est généralement plus lisible.

Nous devrions donc utiliser une fonction expression uniquement lorsqu'une fonction déclaration n'est pas adaptée à la tâche. Nous en avons vu quelques exemples dans ce chapitre et nous en verrons d'autres à l'avenir.
