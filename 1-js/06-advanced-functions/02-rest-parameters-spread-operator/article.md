# Les paramètres Rest et l'opérateur spread

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

<<<<<<< HEAD
Les paramètres restants peuvent être mentionnés dans une fonction définition à trois points `...`. Ils signifient littéralement "rassemblez les paramètres restants dans un tableau".
=======
The rest of the parameters can be included in the function definition by using three dots `...` followed by the name of the array that will contain them. The dots literally mean "gather the remaining parameters into an array".
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

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

Nous venons de voir comment obtenir un tableau à partir de la liste de paramètres.

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

*Spread operator* à la rescousse! Il ressemble aux paramètres rest, en utilisant également `...`, mais fait tout le contraire.

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

On peut même combiner l'opérateur spread avec des valeurs normales :


```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

De plus, l'opérateur spread peut être utilisé pour fusionner des tableaux :

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, ensuite arr, ensuite 2, ensuite arr2)
```

Dans les exemples ci-dessus, nous avons utilisé un tableau pour illustrer l'opérateur spread, mais toutes les fonctions itérables feront l'affaire.

Par exemple, nous utilisons ici l'opérateur spread pour transformer le string en tableau de caractères :

```js run
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

L’opérateur spread utilise en interne des itérateurs pour rassembler les éléments, de la même manière que `for..of`.

Donc, pour une chaine de caractères, `for..of` retourn des caractères et `...str` devient `"H","e","l","l","o"`. La liste de caractères est transmise à l'initialiseur de tableau `[...str]`.

Pour cette tâche particulière, nous pourrions également utiliser `Array.from`, car il convertit un itérable (comme une chaîne de caractères) en un tableau : 

```js run
let str = "Hello";

// Array.from convertit un itérable en tableau
alert( Array.from(str) ); // H,e,l,l,o
```

Le résultat est le même que `[...str]`.

Mais il existe une différence subtile entre `Array.from(obj)` et `[...obj]` :

- `Array.from` fonctionne à la fois sur les tableaux et les iterables.
- L'opérateur spread ne fonctionne que sur des iterables.

Donc, pour transformer quelque chose en tableau, `Array.from` tend à être plus universel.


## Résumé

Quand on voit `"..."` dans le code, il s’agit soit des paramètres rest ou de l’opérateur spread.

Il existe un moyen facile de les distinguer :

- Lorsque `...` se trouve à la fin des paramètres de fonction, il s'agit des "paramètres rest" et rassemble le reste de la liste des arguments dans un tableau.
- Lorsque `...` est présent dans un appel de fonction ou similaire, on l'appelle "opérateur spread" (opérateur de propagation) et étend un tableau en une liste.

Modèles d'utilisation :

- Les paramètres rest permettent de créer des fonctions acceptant un nombre quelconque d'arguments.
- L'opérateur spread est utilisé pour passer un tableau à des fonctions nécessitant normalement une liste d'arguments.

Ensemble, ils permettent de voyager facilement entre une liste et un tableau de paramètres.

Tous les arguments d'un appel de fonction sont également disponibles dans les `arguments` "à l'ancienne" : objet itérable array-like.
