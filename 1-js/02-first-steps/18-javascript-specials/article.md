# Les spécificités de JavaScript

Ce chapitre récapitule brièvement les fonctionnalités de JavaScript que nous avons apprises à ce jour, en accordant une attention particulière aux subtilités.

## Structure du code

Les instructions sont délimitées par un point-virgule :

```js run no-beautify
alert('Hello'); alert('World');
```

Habituellement, un saut de ligne est également traité comme un séparateur, de sorte que cela fonctionnerait également :

```js run no-beautify
alert('Hello')
alert('World')
```

Cela s'appelle "insertion automatique de point-virgule". Parfois, cela ne fonctionne pas, par exemple :

```js run
alert("Il y aura une erreur après ce message")

[1, 2].forEach(alert)
```

La plupart des guides de style de code conviennent que nous devrions mettre un point-virgule après chaque instruction.

Les points-virgules ne sont pas nécessaires après les blocs de code `{...}` et les constructions de syntaxe les utilisant, comme des boucles :

```js
function f() {
  // Aucun point-virgule nécessaire après la déclaration de la fonction
}

for(;;) {
  // Pas de point-virgule nécessaire après la boucle
}
```

… Mais même si nous pouvons mettre un point-virgule supplémentaire quelque part, ce n’est pas une erreur. Ce sera ignoré.

Plus d'informations dans : <info:structure>.

## Mode strict

Pour activer pleinement toutes les fonctionnalités de JavaScript moderne, nous devrions commencer les scripts avec la directive `"use strict"`.

```js
'use strict';

...
```

La directive doit être au sommet d'un script ou au début d'un corps de fonction.

Sans `"use strict"`, tout fonctionne toujours, mais certaines fonctionnalités se comportent à l'ancienne, de manière "compatible". Nous préférons généralement le comportement moderne.

Certaines fonctionnalités modernes du langage (telles que les classes que nous étudierons dans le futur) activent implicitement le mode strict.

Plus d’informations dans : <info:strict-mode>.

## Variables

Les variables peuvent être déclarées en utilisant les `mots-clés` suivants :

- `let`
- `const` (constante, ne peut pas être changé)
- `var` (à l'ancienne, nous le verrons plus tard)

Un nom de variable peut inclure :

- Lettres et chiffres, mais le premier caractère ne peut pas être un chiffre.
- Les caractères `$` et `_` sont normaux, à égalité avec les lettres.
- Les alphabets et les hiéroglyphes non latins sont également autorisés, mais ils ne sont généralement pas utilisés (Par convention).

Les variables sont typées dynamiquement. Elles peuvent stocker n'importe quelle valeur :

```js
let x = 5;
x = "John";
```

Il y a 8 types de données :

- `number` pour les nombres à virgule flottante et les nombres entiers,
- `bigint` pour des nombres entiers de longueur arbitraire,
- `string` pour les chaînes de caractères,
- `boolean` pour les valeurs logiques : `true/false`,
- `null` -- un type avec une seule valeur `null`, signifiant "vide" ou "n'existe pas",
- `undefined` -- un type avec une seule valeur `undefined`, signifiant "non assigné",
- `object` et `symbol` -- pour les structures de données complexes et les identifiants uniques, nous ne les avons pas encore appris.

L'opérateur `typeof` renvoie le type d'une valeur, à deux exceptions près :

```js
typeof null == "object" // Erreur dans le langage
typeof function(){} == "function" // Les fonctions sont traitées spécialement
```

Plus d’informations dans : <info:variables> et <info:types>.

## Les interactions au sein du navigateur

Nous utilisons un navigateur comme environnement de travail. Les fonctions de base de l'interface utilisateur sont les suivantes :

[`prompt(question[, default])`](mdn:api/Window/prompt)
: Poser une question et retourner soit ce que le visiteur a entré, soit `null` s'il clique sur "cancel".

[`confirm(question)`](mdn:api/Window/confirm)
: Poser une `question` et suggérer de choisir entre Ok et Annuler. Le choix est retourné comme `true/false`.

[`alert(message)`](mdn:api/Window/alert)
: Affiche un `message`.

Toutes ces fonctions sont *modales*, elles suspendent l'exécution du code et empêchent le visiteur d'interagir avec la page tant qu'il n'a pas répondu.

Par exemple :

```js run
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert("Visitor: " + userName); // Alice
alert("Tea wanted: " + isTeaWanted); // true
```

Plus d’informations dans : <info:alert-prompt-confirm>.

## Les opérateurs

JavaScript prend en charge les opérateurs suivants :

Arithmétique
: Regulier : `* + - /`, aussi `%` pour le reste et `**` pour la puissance d'un nombre.

    Le binaire plus `+` concatène des chaînes de caractères. Et si l'un des opérandes est une chaîne de caractères, l'autre est également converti en chaîne de caractères :

    ```js run
    alert('1' + 2); // '12', string
    alert(1 + '2'); // '12', string
    ```

Affectations
: Il y a une assignation simple : `a = b` et des combinées comme `a *= 2`.

Bitwise
: Les opérateurs au niveau du bit fonctionnent avec des entiers 32 bits au niveau du bit le plus bas : voir la [doc](mdn:/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) quand ils sont nécessaires.

Conditionnel
: Le seul opérateur avec trois opérandes : `cond ? resultA : resultB`. Si `cond` est vrai, retourne `resultA`, autrement `resultB`.

Opérateurs logiques
: ET logique `&&` et OU `||` effectuent une évaluation en court-circuit puis renvoient la valeur là où ils se sont arrêtés (pas nécessairement `true`/`false`). NOT logique `!` convertit l'opérande en type booléen et retourne la valeur inverse.

L'opérateur de coalescence des nuls
: L'opérateur `??` permet de choisir une valeur définie dans un ensemble de données. Le résultat de `a ?? b` est `a` sauf s'il est `null`/`undefined`, alors `b`.

Comparaisons
: Le contrôle d’égalité `==` pour les valeurs de types différents les convertit en un nombre (sauf `null` et `undefined`, égales entre elles et rien d’autre), elles sont donc égales :

    ```js run
    alert(0 == false); // true
    alert(0 == ''); // true
    ```

    D'autres comparaisons sont également converties en nombre.

    L’opérateur d’égalité stricte `===` ne fait pas la conversion : différents types signifient toujours différentes valeurs pour lui.

    Les valeurs `null` et `undefined` sont spéciales: elles sont égales `==` l'une à l'autre et n’égalent rien d’autre.

    Les comparaisons supérieures/inférieures comparent des chaînes caractère par caractère, les autres types sont convertis en nombre.

Autres opérateurs
: Il y en a quelques autres, comme un opérateur de virgule.

Plus d'informations dans : <info:operators>, <info:comparison>, <info:logical-operators>.

## Les boucles

- Nous avons couvert 3 types de boucles :

    ```js
    // 1
    while (condition) {
      ...
    }

    // 2
    do {
      ...
    } while (condition);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- La variable déclarée dans la boucle `for(let ...)` est visible uniquement à l'intérieur de la boucle. Mais nous pouvons aussi omettre `let` et réutiliser une variable existante.
- Les instructions `break/continue` permettent de sortir complètement de la boucle / de l'itération en cours. Utilisez des labels pour rompre les boucles imbriquées.

Details dans : <info:while-for>.

Plus tard, nous étudierons plus de types de boucles pour traiter des objets.

## La structure conditionnelle "switch"

La structure conditionnelle "switch" peut remplacer plusieurs vérifications `if`. Elle utilise `===` (égalité stricte) pour les comparaisons.

Par exemple :

```js run
let age = prompt('Your age?', 18);

switch (age) {
  case 18:
    alert("Won't work"); // Le résultat de prompt est une chaîne de caractères, pas un nombre

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}
```

Details dans : <info:switch>.

## Les fonctions

Nous avons couvert trois manières de créer une fonction en JavaScript :

1. Déclaration de fonction: la fonction dans le flux de code principal

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

2. Expression de fonction : fonction dans le contexte d'une expression

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    };
    ```

3. Fonctions fléchées :

    ```js
    // Expression à droite
    let sum = (a, b) => a + b;

    // Ou une syntaxe multiligne avec {...}, il faut return ici :
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    // Sans arguments
    let sayHi = () => alert("Hello");

    // Avec un seul argument
    let double = n => n * 2;
    ```

- Une fonction peut avoir des variables locales: celles déclarées à l'intérieur de son corps ou sa liste de paramètres. Ces variables ne sont visibles qu'à l'intérieur de la fonction.
- Les paramètres peuvent avoir des valeurs par défaut : `function sum(a = 1, b = 2) {...}`.
- Les fonctions retournent toujours quelque chose. Si aucune instruction `return` n’est déclarée ou qu'aucune expression ne suit l'instruction `return`, le résultat est `undefined`.

Details : voir <info:function-basics>, <info:arrow-functions-basics>.

## Plus à venir

C’était une brève liste de fonctionnalités de JavaScript. Pour l’instant, nous n’avons étudié que les bases. Plus loin dans le tutoriel, vous trouverez plus de spécificités avancées de JavaScript.