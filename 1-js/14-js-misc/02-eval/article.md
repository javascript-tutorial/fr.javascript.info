# Eval : exécution d'un texte code

La fonction intégrée `eval` permet d'exécuter une chaîne de caractère comprenant du code.

La syntaxe est :

```js
let result = eval(code);
```

Par exemple:

```js run
let code = 'alert("Hello")';
eval(code); // Hello
```

Une chaîne de code peut être long, contenir des sauts à la ligne, des déclarations de fonctions, de variables et autres.

Le résultat de `eval` est le résultat de la dernière instruction.

For example:
```js run
let value = eval('1+1');
alert(value); // 2
```

```js run
let value = eval('let i = 0; ++i');
alert(value); // 1
```

Le code évalué est exécuté dans l'environnement lexical actuel, il peut donc voir les variables extérieures :

```js run no-beautify
let a = 1;

function f() {
  let a = 2;

*!*
  eval('alert(a)'); // 2
*/!*
}

f();
```

Il peut également changer les variables extérieures :

```js untrusted refresh run
let x = 5;
eval("x = 10");
alert(x); // 10, valeur modifiée
```

En mode strict, `eval` a son propre environnement lexical. Donc les fonctions et variables, déclarées au sein de l'eval, ne sont pas visibles en dehors :

```js untrusted refresh run
// rappel : 'use strict' est actif par défaut dans les exemples exécutables

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (pas de telle variable)
// la fonction f n'est pas visible non plus
```

Sans `use strict`, `eval` n'a pas d'environnement lexical propre, donc nous verrions `x` et `f` en dehors.

## Utiliser "eval"

Dans la programmation moderne, `eval` est utilisé avec beaucoup de parcimonie. Il est souvent dit que "eval est le mal".

La raison est simple : il y a très, très longtemps, JavaScript était un langage beaucoup plus faible, beaucoup de choses ne pouvaient être faites que par l'intermédiaire de `eval`. Mais ce temps est passé depuis une décennie.

À l'heure actuelle, il n'y a presque aucune raison `eval`. Si quelqu'un l'utilise, il y a de fortes chances pour qu'il/elle puisse le remplacer par une construction plus moderne ou un [Module JavaScript](info:modules).

Veuillez noter que son accessibilité aux variables extérieures a des effets secondaires.

Les minifacteurs de code (outils utilisés avant que JS parte en production, pour le compresser) renomment les variables locales avec des noms plus courts (comme `a`, `b` etc) pour rendre le code plus court. C'est souvent sûr, mais pas si `eval` est utilisé, étant donné que les variables locales peuvent être accessibles par le code évalué. Donc les minifacteurs ne font pas ce travail pour toutes les variables potentiellement visibles par le `eval`. Cela affecte négativement le ratio de compression.

Utiliser les variables locales extérieures dans un `eval` est de plus considéré comme une mauvaise pratique, étant donné que cela réduit la maintenabilité du code.

Il y a deux moyens pour être entièrement sûrs d'éviter de tels problèmes.

**Si le code évalué n'a pas besoin des variables extérieures, appelez `eval` via `window.eval(...)`:**

De ce fait, le code est exécuté dans la portée globale:

```js untrusted refresh run
let x = 1;
{
  let x = 5;
  window.eval('alert(x)'); // 1 (variable globale)
}
```

**Si le code évalué a besoin des variables extérieures, changez `eval` par `new Function` et passez-le comme argument :**

```js run
let f = new Function('a', 'alert(a)');

f(5); // 5
```

La construction `new Function` est expliquée dans le chapitre <info:new-function>. Elle crée une fonction à partir d'une chaîne de caractères dans la portée globale. Elle ne peut donc pas voir les variables locales. Mais c'est beaucoup plus clair de les passer explicitement comme arguments, comme dans l'exemple ci-dessus.

## Résumé

Un appel de `eval(code)` exécute la chaîne de code et retourne le résultat de la dernière instruction.
- Rarement utilisé dans le JavaScript moderne, puisque souvent inutile.
- Peut accéder aux variables locales extérieures. C'est considéré comme une mauvaise pratique.
- À la place, pour `eval` le code dans la portée globale, utilisez `window.eval(code)`.
- Sinon, si votre code a besoin de données de la portée extérieure, utilisez `new Function` et passez-le comme argument.
