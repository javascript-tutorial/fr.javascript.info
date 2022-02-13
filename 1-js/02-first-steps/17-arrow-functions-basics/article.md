# Fonctions fléchées, les bases

Il existe une syntaxe plus simple et concise pour créer des fonctions, c'est souvent mieux que les Expressions de Fonction.

Les "fonctions fléchées" sont appelées ainsi pour leur syntaxe :

```js
let func = (arg1, arg2, ..., argN) => expression;
```

Cela va créér une function `func` qui accepte les arguments `arg1...argN`, puis évalue l'`expression` sur le côté droit et retourne le résultat.

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

alert( sum(1, 2) ); // 3
```

Comme vous pouvez le voir `(a, b) => a + b` représente une fonction qui accepte 2 arguments nommés `a` et `b`. Lors de l'éxécution, elle évalue l'expression `a + b` et retourne le résultat.

- Pour un argument unique, alors les parenthèses autour du paramètre peuvent être omises, rendant la fonction encore plus courte.

    For example:

    ```js run
    *!*
    let double = n => n * 2;
    // Similaire à : let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- Sans arguments, les parenthèses seront alors vides (mais elles doivent êtres présentes) :

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

Les fonctions fléchées peuvent être utilisées de la même manière que les Expressions de Fonction.

Par exemple pour créer une fonction dynamiquement :

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ok now
```

Les fonctions fléchées peuvent paraître étranges et peu lisibles au début, mais cela change rapidement avec les yeux s'habituant à cette structure.

Elles sont très utile pour des actions sur une ligne et que l'on est juste paresseux d'écrire d'autres mots.

## Les fonctions fléchées multiligne

L'exemple ci-dessous prend les arguments sur la gauche de `=>` et évalue le coté droit avec ces arguments.

Parfois nous avons besoin de plus de compléxité, comme des expressions multiples ou des déclarations. Cela est possible avec des accolades les délimitant. Il faut ensuite utiliser un `return` à l'intérieur de celles-ci.

Comme cela :

```js run
let sum = (a, b) => {  // Les accolades ouvre une fonction multiligne
  let result = a + b;
*!*
  return result; // si nous utilisons des accolades, nous avons besoin d'un "return" explicite
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="Plus à venir"
Ici nous nous arrêtons sur les fonctions fléchées pour leur syntaxe bréve mais ce n'est pas tout !

Les fonctions fléchées ont d'autres particularités intéressantes.

Pour les aprrendre en profondeur, nous devons d'abord voir d'autres aspects de Javascript, nous reviendrons donc aux fonctions fléchées plus tard dans le chapitre <info:arrow-functions>.

Pour l'instant, nous pouvons les utiliser pour des actions sur une ligne ou des callbacks (rappels).
```

## Résumé

Les fonctions fléchées sont pratiques pour les déclarations sur une ligne. Elles ont deux syntaxes :

1. Sans accolades : `(...args) => expression` -- le coté droit est une expression : la fonction l'évalue et retourne le résultat.
2. Avec accolades : `(...args) => { body }` -- les accolades nous permet des déclarations multiples au sein de la fonction, mais nous devons ajouter un `return` pour retourner quelque chose.
