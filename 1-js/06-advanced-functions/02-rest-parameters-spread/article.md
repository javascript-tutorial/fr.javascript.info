<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
# Les paramètres Rest et l'opérateur spread
=======
# Rest parameters and spread syntax
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

De nombreuses fonctions intégrées à JavaScript prennent en charge un nombre arbitraire d'arguments.

Par exemple :

- `Math.max(arg1, arg2, ..., argN)` -- renvoie le plus grand des arguments.
- `Object.assign(dest, src1, ..., srcN)` -- copie les propriétés de `src1..N` dans `dest`.
- ... etc.

Dans ce chapitre, nous allons apprendre à faire de même. Et aussi, comment passer des tableaux à des fonctions telles que des paramètres.

## Les paramètres Rest `...`

Une fonction peut être appelée avec un nombre quelconque d'arguments, peu importe comment elle a été définie.

Comme ici :
```js run
function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
```

Il n'y aura pas d'erreur en raison d'arguments "excessifs". Mais bien sûr, dans le résultat, seuls les deux premiers seront comptés.

Le reste des paramètres peut être inclus dans la définition de la fonction en utilisant trois points `...` suivis du nom du tableau qui les contiendra. Les points signifient littéralement "rassemblez les paramètres restants dans un tableau".

Par exemple, pour rassembler tous les arguments dans un tableau `args` :

```js run
function sumAll(...args) { // args est le nom du tableau
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

Nous pouvons choisir d’obtenir les premiers paramètres sous forme de variables et de ne rassembler que le reste.

Ici, les deux premiers arguments vont dans les variables et le reste dans le tableau `titles` :

```js run
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // le reste va dans le tableau titles
  // i.e. titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

````warn header="Les paramètres rest doivent être à la fin"
Les paramètres rest regroupent tous les arguments restants. Par conséquent, ce qui suit n'a pas de sens et génère une erreur :

```js
function f(arg1, ...rest, arg2) { // arg2 après ...rest ?!
  // error
}
```

Le `...rest` doit toujours être le dernier.
````

## La variable "arguments"

Il existe également un objet spécial array-like nommé `arguments` qui contient tous les arguments en fonction de leur index.

Par exemple :

```js run
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // c'est iterable
  // for(let arg of arguments) alert(arg);
}

// affiche : 2, Julius, Caesar
showName("Julius", "Caesar");

// affiche : 1, Ilya, undefined (pas de second argument)
showName("Ilya");
```

Autrefois, les paramètres rest n'existaient pas dans le langage, et utiliser les `arguments` était le seul moyen d'obtenir tous les arguments de la fonction. Et cela fonctionne toujours, on peut le trouver dans l'ancien code.

Mais l’inconvénient est que, bien que les `arguments` ressemblent à un tableau et qu’ils soient itératifs, ce n’est pas un tableau. Il ne supporte pas les méthodes de tableau, nous ne pouvons donc pas appeler `arguments.map(...)` par exemple.

De plus, il contient toujours tous les arguments. Nous ne pouvons pas les capturer partiellement, comme nous l’avons fait avec les paramètres rest.

Ainsi, lorsque nous avons besoin de ces fonctionnalités, les paramètres rest sont préférés.

````smart header="Les fonctions fléchées n'ont pas d'`\"arguments\"`"
Si nous accédons à l'objet `arguments` à partir d'une fonction fléchée, il le prend à la fonction externe "normale".

Voici un exemple :

```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```

Comme nous nous en souvenons, les fonctions fléchées n’ont pas leur propre `this`. Nous savons maintenant qu’ils n’ont pas non plus l’objet spécial `arguments`.
````

## L'opérateur Spread [#spread-operator]

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Nous venons de voir comment obtenir un tableau à partir de la liste de paramètres.
=======
## Spread syntax [#spread-syntax]
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Mais parfois, nous devons faire exactement l'inverse.

Par exemple, il existe une fonction intégrée [Math.max](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/max) qui renvoie le plus grand nombre d'une liste :

```js run
alert( Math.max(3, 5, 1) ); // 5
```

Maintenant, disons que nous avons un tableau `[3, 5, 1]`. Comment appelons-nous `Math.max` avec ?

Le passer "tel quel" ne fonctionnera pas, car `Math.max` attend une liste d’arguments numériques et non un tableau :

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

Et nous ne pouvons sûrement pas lister manuellement les éléments dans le code `Math.max(arr[0], arr[1], arr[2])`, parce que nous pouvons ne pas savoir combien il y en a. Au fur et à mesure que notre script s'exécute, il peut y en avoir beaucoup ou pas du tout. Et ça deviendrait moche.

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
*Spread operator* à la rescousse! Il ressemble aux paramètres rest, en utilisant également `...`, mais fait tout le contraire.
=======
*Spread syntax* to the rescue! It looks similar to rest parameters, also using `...`, but does quite the opposite.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Quand `...arr` est utilisé dans l'appel de fonction, il "développe" un objet itérable `arr` dans la liste des arguments.

Pour `Math.max` :

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (spread transforme un tableau en une liste d'arguments)
```

Nous pouvons aussi passer plusieurs iterables de cette façon :

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
On peut même combiner l'opérateur spread avec des valeurs normales :
=======
We can even combine the spread syntax with normal values:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117:1-js/06-advanced-functions/02-rest-parameters-spread/article.md


```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
De plus, l'opérateur spread peut être utilisé pour fusionner des tableaux :
=======
Also, the spread syntax can be used to merge arrays:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, ensuite arr, ensuite 2, ensuite arr2)
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Dans les exemples ci-dessus, nous avons utilisé un tableau pour illustrer l'opérateur spread, mais toutes les fonctions itérables feront l'affaire.

Par exemple, nous utilisons ici l'opérateur spread pour transformer le string en tableau de caractères :
=======
In the examples above we used an array to demonstrate the spread syntax, but any iterable will do.

For instance, here we use the spread syntax to turn the string into array of characters:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

```js run
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
L’opérateur spread utilise en interne des itérateurs pour rassembler les éléments, de la même manière que `for..of`.
=======
The spread syntax internally uses iterators to gather elements, the same way as `for..of` does.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Donc, pour une chaine de caractères, `for..of` retourn des caractères et `...str` devient `"H","e","l","l","o"`. La liste de caractères est transmise à l'initialiseur de tableau `[...str]`.

Pour cette tâche particulière, nous pourrions également utiliser `Array.from`, car il convertit un itérable (comme une chaîne de caractères) en un tableau : 

```js run
let str = "Hello";

// Array.from convertit un itérable en tableau
alert( Array.from(str) ); // H,e,l,l,o
```

Le résultat est le même que `[...str]`.

Mais il existe une différence subtile entre `Array.from(obj)` et `[...obj]` :

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
- `Array.from` fonctionne à la fois sur les tableaux et les iterables.
- L'opérateur spread ne fonctionne que sur des iterables.
=======
- `Array.from` operates on both array-likes and iterables.
- The spread syntax works only with iterables.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Donc, pour transformer quelque chose en tableau, `Array.from` tend à être plus universel.


## Résumé

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Quand on voit `"..."` dans le code, il s’agit soit des paramètres rest ou de l’opérateur spread.
=======
When we see `"..."` in the code, it is either rest parameters or the spread syntax.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Il existe un moyen facile de les distinguer :

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
- Lorsque `...` se trouve à la fin des paramètres de fonction, il s'agit des "paramètres rest" et rassemble le reste de la liste des arguments dans un tableau.
- Lorsque `...` est présent dans un appel de fonction ou similaire, on l'appelle "opérateur spread" (opérateur de propagation) et étend un tableau en une liste.
=======
- When `...` is at the end of function parameters, it's "rest parameters" and gathers the rest of the list of arguments into an array.
- When `...` occurs in a function call or alike, it's called a "spread syntax" and expands an array into a list.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Modèles d'utilisation :

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
- Les paramètres rest permettent de créer des fonctions acceptant un nombre quelconque d'arguments.
- L'opérateur spread est utilisé pour passer un tableau à des fonctions nécessitant normalement une liste d'arguments.
=======
- Rest parameters are used to create functions that accept any number of arguments.
- The spread syntax is used to pass an array to functions that normally require a list of many arguments.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Ensemble, ils permettent de voyager facilement entre une liste et un tableau de paramètres.

Tous les arguments d'un appel de fonction sont également disponibles dans les `arguments` "à l'ancienne" : objet itérable array-like.
