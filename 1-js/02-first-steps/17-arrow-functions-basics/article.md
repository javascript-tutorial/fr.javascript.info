# Fonctions fléchées, les bases

Il existe une syntaxe plus simple et concise pour créer des fonctions, c'est souvent mieux que les expressions de fonction.

Les "fonctions fléchées" sont appelées ainsi pour leur syntaxe :

```js
let func = (arg1, arg2, ..., argN) => expression;
```

Cela va créer une function `func` qui accepte les arguments `arg1...argN`, puis évaluer l'`expression` sur le côté droit et retourner le résultat.

C'est donc la version raccourcie de :

```js
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

Voyons un exemple concret :

```js run
let sum = (a, b) => a + b;

/* Cette fonction fléchée est la forme raccourcie de :

let sum = function(a, b) {
  return a + b;
};
*/

alert(sum(1, 2)); // 3
```

Comme vous pouvez le voir `(a, b) => a + b` représente une fonction qui accepte 2 arguments (possède 2 paramètres) nommés `a` et `b`. Lors de l'exécution, elle évalue l'expression `a + b` et retourne le résultat.

- Pour un argument unique, les parenthèses autour du paramètre peuvent être omises, rendant la fonction encore plus courte.

    Par exemple:

    ```js run
    *!*
    let double = n => n * 2;
    // Similaire à : let double = function(n) { return n * 2 }
    */!*

    alert(double(3)); // 6
    ```

- S’il n’y a pas d’arguments, les parenthèses seront alors vides, mais elles doivent êtres présentes :

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

Les fonctions fléchées peuvent être utilisées de la même manière que les expressions de fonction.

Par exemple pour créer une fonction dynamiquement :

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert("Hello!") :
  () => alert("Greetings!");

welcome(); // Adapté
```

Les fonctions fléchées peuvent paraître étranges et peu lisibles au début, mais cela change rapidement avec le temps, les yeux s'habituant à cette structure.

Elles sont très utiles pour des actions sur une ligne et que l'on est juste paresseux d'écrire d'autres mots.

## Les fonctions fléchées multiligne

Les fonctions fléchées que nous avons vues jusqu'à présent étaient très simples. Elles ont pris des arguments à gauche de `=>`, les ont évalués et ont renvoyé l'expression à leurs droites.

Parfois nous avons besoin de plus de complexité, comme des expressions multiples ou des déclarations. Ceci est possible avec des accolades les délimitant. Il faut ensuite utiliser un `return` à l'intérieur de celles-ci.

Comme cela :

```js run
let sum = (a, b) => {  // Les accolades ouvrent une fonction multiligne
  let result = a + b;
*!*
  return result; // Si nous utilisons des accolades, nous avons besoin d'un "return" explicite
*/!*
};

alert(sum(1, 2)); // 3
```

```smart header="Plus à venir"
Nous nous arrêtons ici pour les fonctions fléchées et leur syntaxe brève mais ce n'est pas tout !

Les fonctions fléchées ont d'autres particularités intéressantes.

Pour les apprendre en profondeur, nous devons d'abord voir d'autres aspects de JavaScript, nous reviendrons aux fonctions fléchées plus tard dans le chapitre <info:arrow-functions>.

Pour l'instant, nous pouvons les utiliser pour des actions sur une ligne ou des callbacks (rappels).
```

## Résumé

Les fonctions fléchées sont pratiques pour des actions simples, en particulier pour les one-liners. Elles se déclinent en deux variantes :

1. Sans accolades : `(...args) => expression` -- le coté droit est une expression : la fonction l'évalue et retourne le résultat. Les parenthèses peuvent être omises s'il n'y a qu'un seul argument, par ex. `n => n*2`.
2. Avec accolades : `(...args) => { body }` -- les accolades nous permettent des instructions multiples au sein de la fonction, mais nous devons ajouter un `return` explicite pour retourner quelque chose.
