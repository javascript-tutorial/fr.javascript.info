# Méthodes de tableau

<<<<<<< HEAD
Les tableaux viennent avec beaucoup de méthodes. Pour faciliter les choses, dans ce chapitre, ils ont été divisés en groupes.
=======
Arrays provide a lot of methods. To make things easier, in this chapter, they are split into groups.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## Ajouter/Supprimer des éléments

Nous connaissons déjà des méthodes qui ajoutent et suppriment des éléments au début ou à la fin :

- `arr.push(...items)` -- ajoute des éléments à la fin,
- `arr.pop()` -- supprime un élément à la fin,
- `arr.shift()` -- supprime un élément au début,
- `arr.unshift(...items)` -- ajouter des éléments au début.

En voici quelques autres.

### splice

Comment supprimer un élément du tableau ?

Les tableaux sont des objets, nous pouvons donc utiliser `delete` :

```js run
let arr = ["I", "go", "home"];

delete arr[1]; // supprime "go"

alert( arr[1] ); // undefined

// maintenant arr = ["I",  , "home"];
alert( arr.length ); // 3
```

L'élément a été supprimé, mais le tableau a toujours 3 éléments, on peut voir que `arr.length == 3`

<<<<<<< HEAD
C'est normal, car `delete obj.key` supprime une valeur par la `clé`. C'est tout ce que ça fait. C'est donc parfait pour les objets. Mais pour les tableaux, nous souhaitons généralement que le reste des éléments se déplace et occupe la place libérée. Nous nous attendons à avoir un tableau plus court maintenant.
=======
That's natural, because `delete obj.key` removes a value by the `key`. It's all it does. Fine for objects. But for arrays we usually want the rest of the elements to shift and occupy the freed place. We expect to have a shorter array now.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Des méthodes spéciales doivent donc être utilisées.

<<<<<<< HEAD
La méthode [arr.splice](mdn:js/Array/splice) est un couteau suisse pour les tableaux. Elle peut tout faire : ajouter, supprimer et remplacer des éléments.
=======
The [arr.splice](mdn:js/Array/splice) method is a Swiss army knife for arrays. It can do everything: insert, remove and replace elements.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

La syntaxe est la suivante :

```js
arr.splice(start[, deleteCount, elem1, ..., elemN])
```

Il a modifié `arr` à partir de l'index `start` : supprime les éléments `deleteCount` puis insère `elem1, ..., elemN` à leur place. Renvoie le tableau des éléments supprimés.

Cette méthode est facile à comprendre avec des exemples.

Commençons par la suppression :

```js run
let arr = ["I", "study", "JavaScript"];

*!*
arr.splice(1, 1); // À partir de l'index 1 supprime 1 élément
*/!*

alert( arr ); // ["I", "JavaScript"]
```

Facile, non ? À partir de l'index 1, il a supprimé 1 élément.

<<<<<<< HEAD
Dans l'exemple suivant, nous supprimons 3 éléments et les remplaçons par les deux autres :
=======
In the next example, we remove 3 elements and replace them with the other two:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let arr = [*!*"I", "study", "JavaScript",*/!* "right", "now"];

// supprime les 3 premiers éléments et les remplace par d'autre
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // maintenant [*!*"Let's", "dance"*/!*, "right", "now"]
```

Nous pouvons voir ici que `splice` renvoie le tableau des éléments supprimés :

```js run
let arr = [*!*"I", "study",*/!* "JavaScript", "right", "now"];

// supprime les 2 premiers éléments
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- tableau des éléments supprimés
```

<<<<<<< HEAD
La méthode `splice` est également capable d'insérer les éléments sans aucune suppression. Pour cela, nous devons définir `nombreDeSuppression` sur 0 :
=======
The `splice` method is also able to insert the elements without any removals. For that, we need to set `deleteCount` to `0`:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let arr = ["I", "study", "JavaScript"];

// de l'index 2
// supprime 0
// et ajoute "complex" et "language"
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

````smart header="Index négatifs autorisés"
Ici et dans d'autres méthodes de tableau, les index négatifs sont autorisés. Ils spécifient la position à partir de la fin du tableau, comme ici :

```js run
let arr = [1, 2, 5];

// de l'index -1 (un déplacement à partir de la fin)
// supprime 0 éléments,
// puis insère 3 et 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

### slice

<<<<<<< HEAD
La méthode [arr.slice](mdn:js/Array/slice) est beaucoup plus simple qu'un similaire `arr.splice`.
=======
The method [arr.slice](mdn:js/Array/slice) is much simpler than the similar-looking `arr.splice`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

La syntaxe est la suivante :

```js
arr.slice([start], [end])
```

Il retourne un nouveau tableau dans lequel il copie tous les éléments index qui commencent de `start` à `end` (sans compter `end`). Les deux `start` et `end` peuvent être négatifs, dans ce cas, la position depuis la fin du tableau est supposée.

<<<<<<< HEAD
Cela ressemble à une méthode string `str.slice`, mais au lieu de sous-chaînes de caractères, cela crée des sous-tableaux.
=======
It's similar to a string method `str.slice`, but instead of substrings, it makes subarrays.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Par exemple :

```js run
let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s (copie de 1 à 3, 3 non compris)

alert( arr.slice(-2) ); // s,t (copie de -2 jusqu'à la fin)
```

Nous pouvons aussi l'appeler sans arguments : `arr.slice()` créer une copie de `arr`. Cela est souvent utilisé pour obtenir une copie pour d'autres transformations qui ne devraient pas affecter le tableau d'origine.

### concat

La méthode [arr.concat](mdn:js/Array/concat) crée un nouveau tableau qui inclut les valeurs d'autres tableaux et des éléments supplémentaires.

La syntaxe est la suivante :

```js
arr.concat(arg1, arg2...)
```

Il accepte n'importe quel nombre d'arguments -- des tableaux ou des valeurs.

Le résultat est un nouveau tableau contenant les éléments `arr`, puis `arg1`, `arg2`, etc.

Si un argument `argN` est un tableau, alors tous ses éléments sont copiés. Sinon, l'argument lui-même est copié.

Par exemple :

```js run
let arr = [1, 2];

// créer un tableau à partir de arr et [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

// créer un tableau à partir de arr et [3,4] et [5,6]
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// créer un tableau à partir de arr et [3,4], puis ajoute les valeurs 5 et 6
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
```

Normalement, il ne copie que les éléments des tableaux. Les autres objets, même s'ils ressemblent à des tableaux, sont ajoutés dans leur ensemble :

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
```

… Mais si un objet de type tableau (array-like) a une propriété spéciale `Symbol.isConcatSpreadable`, alors il est traité comme un tableau par `concat` : ses éléments sont ajoutés à la place :

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else
```

## Itérer: forEach (pourChaque)

La méthode [arr.forEach](mdn:js/Array/forEach) permet d’exécuter une fonction pour chaque élément du tableau.

La syntaxe :

```js
arr.forEach(function(item, index, array) {
<<<<<<< HEAD
  // ... fait quelques chose avec l'élément
=======
  // ... do something with an item
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
});
```

Par exemple, cela montre chaque élément du tableau :

```js run
// pour chaque élément appel l'alerte
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

Et ce code est plus élaboré sur leurs positions dans le tableau cible :

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} est à l'index ${index} dans ${array}`);
});
```

Le résultat de la fonction (s'il en renvoie) est jeté et ignoré.

## Recherche dans le tableau

Voyons maintenant les méthodes de recherche dans un tableau.

### indexOf/lastIndexOf et includes

Les méthodes [arr.indexOf](mdn:js/Array/indexOf), et [arr.includes](mdn:js/Array/includes) ont la même syntaxe et utilisent essentiellement la même chose que leurs équivalents de chaîne, mais fonctionnent sur des éléments au lieu de caractères :

- `arr.indexOf(item, from)` recherche l'élément `item` à partir de l'index `from`, et retourne l'index où il a été trouvé, sinon il retourne `-1`.
- `arr.includes(item, from)` -- recherche l'élément `item` en commençant par l'index `from`, retourne `true` si il est trouvé.

Habituellement, ces méthodes sont utilisées avec un seul argument : l'élément à rechercher. Par défaut, la recherche s'effectue depuis le début.

<<<<<<< HEAD
Par exemple :
=======
Usually, these methods are used with only one argument: the `item` to search. By default, the search is from the beginning.

For instance:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

Veuillez noter que `indexOf` utilise l'égalité stricte `===` pour la comparaison. Donc, si nous cherchons "faux", il trouve exactement "faux" et non le zéro.

<<<<<<< HEAD
Si nous voulons vérifier si `item` existe dans le tableau et n'avons pas besoin de l'index, alors `arr.includes` est préféré.
=======
If we want to check if `item` exists in the array and don't need the index, then `arr.includes` is preferred.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

La méthode [arr.lastIndexOf](mdn:js/Array/lastIndexOf) est la même que `indexOf`, mais recherche de droite à gauche.

```js run
let fruits = ['Apple', 'Orange', 'Apple']

alert( fruits.indexOf('Apple') ); // 0 (first Apple)
alert( fruits.lastIndexOf('Apple') ); // 2 (last Apple)
```

````smart header="La méthode `includes` gère `NaN` correctement"
Une caractéristique mineure mais remarquable de `includes` est qu'il gère correctement `NaN`, contrairement à `indexOf` :

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (faux, devrait être 0)
alert( arr.includes(NaN) ); // true (correct)
```
<<<<<<< HEAD
C'est parce que `includes` a été ajouté à JavaScript beaucoup plus tard et utilise l'algorithme de comparaison le plus à jour en interne.
=======
That's because `includes` was added to JavaScript much later and uses the more up-to-date comparison algorithm internally.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
````

### find et findIndex/findLastIndex

<<<<<<< HEAD
Imaginez que nous ayons un tableau d'objets. Comment pouvons-nous trouver un objet avec une condition spécifique ?
=======
Imagine we have an array of objects. How do we find an object with a specific condition?
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Ici la méthode [arr.find(fn)](mdn:js/Array/find) se révèle vraiment pratique.

La syntaxe est la suivante :

```js
let result = arr.find(function(item, index, array) {
 // devrait retourner true si l'élément correspond à ce que nous recherchons
 // pour le scénario de falsy (fausseté), renvoie undefined
});
```

La fonction est appelée pour chaque élément du tableau, l'un après l'autre :

- `item` est l'élément.
- `index` est sont index.
- `array` est le tableau lui même.

<<<<<<< HEAD
S'il renvoie `true`, la recherche est arrêtée, l'`item` est renvoyé. Si rien n'est trouvé, `undefined` est renvoyé.
=======
If it returns `true`, the search is stopped, the `item` is returned. If nothing is found, `undefined` is returned.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Par exemple, nous avons un tableau d’utilisateurs, chacun avec les champs `id` et `name`. Trouvons le premier avec l'`id == 1` :

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```

<<<<<<< HEAD
Dans la vie réelle, les tableaux d'objets sont une chose courante, la méthode `find` est donc très utile.
=======
In real life, arrays of objects are a common thing, so the `find` method is very useful.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Notez que dans l'exemple, nous fournissons à `find` la fonction `item => item.id == 1` avec un argument. C'est typique, les autres arguments de cette fonction sont rarement utilisés.

<<<<<<< HEAD
La méthode [arr.findIndex](mdn:js/Array/findIndex) est essentiellement la même, mais elle retourne l'index où l'élément a été trouvé à la place de l'élément lui-même. La valeur de `-1` est retournée si rien n'est trouvé.
=======
The [arr.findIndex](mdn:js/Array/findIndex) method has the same syntax but returns the index where the element was found instead of the element itself. The value of `-1` is returned if nothing is found.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

La méthode [arr.findLastIndex](mdn:js/Array/findLastIndex) est comme `findIndex`, mais recherche de droite à gauche, similaire à `lastIndexOf`.

Voici un exemple :

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"},
  {id: 4, name: "John"}
];

// Trouver l'index du premier John
alert(users.findIndex(user => user.name == 'John')); // 0

// Trouver l'index du dernier John
alert(users.findLastIndex(user => user.name == 'John')); // 3
```

### filter

La méthode `find` recherche un seul (le premier) élément qui rend la fonction true.

S'il y en a plusieurs, nous pouvons utiliser [arr.filter(fn)](mdn:js/Array/filter).

La syntaxe est à peu près identique à celle de `find`, mais `filter` renvoie un tableau d'éléments correspondants :

```js
let results = arr.filter(function(item, index, array) {
  // si true, l'item est poussé vers résultats et l'itération continue
  // retourne un tableau vide si rien n'est trouvé
});
```

Par exemple :

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// retourne les tableaux des deux premiers users
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

## Transformer un tableau

Passons aux méthodes qui transforment et réorganisent un tableau.

### map

La méthode [arr.map](mdn:js/Array/map) est l’une des plus utiles et des plus utilisées.

Elle appelle la fonction pour chaque élément du tableau et renvoie le tableau de résultats.

La syntaxe est :

```js
let result = arr.map(function(item, index, array) {
  // renvoie la nouvelle valeur au lieu de l'item
});
```

Par exemple, ici nous transformons chaque élément en sa longueur :

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length)
alert(lengths); // 5,7,6
```

### sort(fn)

La méthode [arr.sort](mdn:js/Array/sort) trie le tableau *en place*, en changeant son ordre d'élément.

Elle renvoie également le tableau trié, mais la valeur renvoyée est généralement ignorée, comme `arr` est lui-même modifié.

Par exemple :

```js run
let arr = [ 1, 2, 15 ];

// la méthode réordonne le contenu de arr
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

Avez-vous remarqué quelque chose d'étrange dans le résultat ?

L'ordre est devenu `1, 15, 2`. C'est incorrect. Mais pourquoi ?

**Les éléments sont triés en tant que chaînes par défaut.**

Littéralement, tous les éléments sont convertis en chaînes de caractères pour comparaisons. Pour les chaînes de caractères, l’ordre lexicographique est appliqué et donc `"2" > "15"`.

Pour utiliser notre propre ordre de tri, nous devons fournir une fonction comme argument de `arr.sort()`.

La fonction doit comparer deux valeurs arbitraires et renvoyer le résultat :

```js
function compare(a, b) {
  if (a > b) return 1; // if the first value is greater than the second
  if (a == b) return 0; // if values are equal
  if (a < b) return -1; // if the first value is less than the second
}
```

Par exemple, pour trier sous forme de nombres :

```js run
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

*!*
arr.sort(compareNumeric);
*/!*

alert(arr);  // *!*1, 2, 15*/!*
```

Maintenant, ça fonctionne comme nous l'avons prévu.

<<<<<<< HEAD
Mettons cela de côté et regardons ce qui se passe. L'`arr` peut être un tableau de n'importe quoi, non ? Il peut contenir des nombres, des chaînes de caractères, des objets ou autre. Nous avons donc un ensemble de *quelques items*. Pour le trier, nous avons besoin d’une *fonction de classement* qui sache comment comparer ses éléments. La valeur par défaut est un ordre de chaîne de caractères.
=======
Let's step aside and think about what's happening. The `arr` can be an array of anything, right? It may contain numbers or strings or objects or whatever. We have a set of *some items*. To sort it, we need an *ordering function* that knows how to compare its elements. The default is a string order.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a


<<<<<<< HEAD
La méthode `arr.sort(fn)` intégre l'implémentation d'un algorithme générique de tri. Nous n'avons pas besoin de nous préoccuper de son fonctionnement interne (c'est un [tri rapide optimisé](https://fr.wikipedia.org/wiki/Tri_rapide) la plupart du temps). Il va parcourir le tableau, comparer ses éléments à l'aide de la fonction fournie et les réorganiser. Tout ce dont nous avons besoin est de fournir la `fn` qui effectue la comparaison.


À propos, si nous voulons savoir quels éléments sont comparés, rien ne nous empêche de les alerter :
=======
By the way, if we ever want to know which elements are compared -- nothing prevents us from alerting them:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});
```

L'algorithme peut comparer un élément à plusieurs autres dans le processus, mais il essaie de faire le moins de comparaisons possible.

````smart header="Une fonction de comparaison peut renvoyer n'importe quel nombre"
En réalité, une fonction de comparaison est requise uniquement pour renvoyer un nombre positif pour dire "plus grand" et un nombre négatif pour dire "plus petit".

Cela permet d'écrire des fonctions plus courtes :

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````smart header="Fonction fléchée pour le meilleur"
Souvenez-vous des [fonctions fléchées](info:arrow-functions-basics) ? Nous pouvons les utiliser ici pour un tri plus net :

```js
arr.sort( (a, b) => a - b );
```

Cela fonctionne exactement comme la version longue ci-dessus.
````

````smart header="Utiliser `localeCompare` pour les chaînes de caractères"
Souvenez-vous de l'algorithme de comparaison [des chaînes de caractères](info:string#correct-comparisons) ? Il compare les lettres par leurs codes par défaut.

Pour de nombreux alphabets, il est préférable d'utiliser la méthode `str.localeCompare` pour trier correctement les lettres, comme `Ö`.

Par exemple, trions quelques pays en allemand :

```js run
let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (wrong)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (correct!)
```
````

### reverse

La méthode [arr.reverse](mdn:js/Array/reverse) inverse l'ordre des éléments dans l'`arr`.

Par exemple :

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

Il retourne également le tableau `arr` après l'inversion.

### split et join

Voici une situation réele. Nous écrivons une application de messagerie et la personne entre dans la liste des destinataires délimités par des virgules : `John, Pete, Mary`. Mais pour nous, un tableau de noms serait beaucoup plus confortable qu'une simple chaîne de caractères. Alors, comment l'obtenir ?

La méthode [str.split(separator)](mdn:js/String/split) fait exactement cela. Elle divise la chaîne en un tableau selon le délimiteur `separator` donné.

<<<<<<< HEAD
Dans l'exemple ci-dessous, nous les séparons par une virgule suivie d'un espace :
=======
In the example below, we split by a comma followed by a space:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `Un message à ${name}.` ); // Un message à Bilbo  (ainsi que les autres noms)
}
```

La méthode `split` a un deuxième argument numérique facultatif -- une limite sur la longueur du tableau. S'il est fourni, les éléments supplémentaires sont ignorés. En pratique, il est rarement utilisé cependant :

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="Divisé en lettres"
L'appel de `split(s)` avec un `s` vide diviserait la chaîne en un tableau de lettres :

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

L'appel de [arr.join(separator)](mdn:js/Array/join) fait l'inverse de `split`. Elle crée une chaîne de caractères avec les éléments de `arr` joints entre eux par `separator`.

Par exemple :

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // joint les éléments du tableau en une string en utilisant le caractère ";"

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight

Lorsque nous devons parcourir un tableau, nous pouvons utiliser `forEach`, `for` ou `for..of`.

Lorsque nous devons itérer et renvoyer les données pour chaque élément, nous pouvons utiliser `map`.

Les méthodes [arr.reduce](mdn:js/Array/reduce) et [arr.reduceRight](mdn:js/Array/reduceRight) appartiennent également à cette famille, mais sont un peu plus complexes. Ce méthodes sont utilisées pour calculer une valeur unique basée sur un tableau.

La syntaxe est la suivante :

```js
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```

La fonction est appliquée à tous les éléments du tableau les uns après les autres et "reporte" son résultat à l'appel suivant.

Les arguments :

- `accumulator` -- est le résultat de l'appel de fonction précédent, égal à `initial` la première fois (si `initial` est fourni).
- `item` -- est l'élément actuel du tableau.
- `index` -- est sa position.
- `array` -- est le tableau.

<<<<<<< HEAD
Lorsque la fonction est appliquée, le résultat de l'appel de fonction précédent est transmis au suivant en tant que premier argument.

Ainsi, le premier argument est l'accumulateur qui stocke le résultat combiné de toutes les exécutions précédentes. À la fin, il devient le résultat de la fonction `reduce`.
=======
As the function is applied, the result of the previous function call is passed to the next one as the first argument.

So, the first argument is essentially the accumulator that stores the combined result of all previous executions. And at the end, it becomes the result of `reduce`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Cela semble compliqué ?

Le moyen le plus simple pour comprendre c'est avec un exemple.

Ici nous obtenons la somme d'un tableau sur une ligne :

```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

La fonction passée à `reduce` utilise seulement 2 arguments, c’est généralement suffisant.

Voyons en détails ce qu'il se passe.

1. Lors du premier passage, `sum` prend la valeur de `initial` (le dernier argument de `reduce`), égale à `0`, et `current` correspond au premier élément du tableau, égal à `1`. Donc le résultat de la fonction est `1`.
2. Lors du deuxième passage, `sum = 1`, nous y ajoutons le deuxième élément du tableau (`2`) et `sum` est retourné.
3. Au troisième passage, `sum = 3` et nous y ajoutons un élément supplémentaire, et ainsi de suite...

Le flux de calcul :

![](reduce.svg)

Ou sous la forme d'un tableau, où chaque ligne représente un appel de fonction sur l'élément de tableau suivant :

|   |`sum`|`current`|result|
|---|-----|---------|------|
|premier appel|`0`|`1`|`1`|
|deuxième appel|`1`|`2`|`3`|
|troisième appel|`3`|`3`|`6`|
|quatrième appel|`6`|`4`|`10`|
|cinquième appel|`10`|`5`|`15`|

Ici, nous pouvons clairement voir comment le résultat de l'appel précédent devient le premier argument du suivant.

Nous pouvons également omettre la valeur initiale :

```js run
let arr = [1, 2, 3, 4, 5];

// Suppression de la valeur initiale de reduce (pas de 0)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

Le résultat est le même. En effet, s'il n'y a pas de valeur initiale, alors `reduce` prend le premier élément du tableau comme valeur initiale et lance l'itération à partir du deuxième élément.

Le tableau de calcul est le même que celui ci-dessus, sans la première ligne.

Mais une telle utilisation nécessite une extrême prudence. Si le tableau est vide, alors `reduce` appelé sans valeur initiale génèrera une erreur.

Voici un exemple :

```js run
let arr = [];

// Erreur : Réduction du tableau vide sans valeur initiale
// si la valeur initiale existait, reduction le renverrait pour l'arr vide.
arr.reduce((sum, current) => sum + current);
```

Il est donc conseillé de toujours spécifier la valeur initiale.

<<<<<<< HEAD
La méthode [arr.reduceRight](mdn:js/Array/reduceRight) fait la même chose, mais va de droite à gauche.
=======
The method [arr.reduceRight](mdn:js/Array/reduceRight) does the same but goes from right to left.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## Array.isArray

Les tableaux ne forment pas un type distinct du langage. Ils sont basés sur des objets.

Donc son `typeof` ne permet pas de distinguer un objet brut d'un tableau :

```js run
alert(typeof {}); // object
alert(typeof []); // object (pareil)
```

...Mais les tableaux sont utilisés si souvent qu'il existe une méthode spéciale pour cela : [Array.isArray(value)](mdn:js/Array/isArray). Il renvoie `true` si la `value` est un tableau, sinon il renvoie `false`.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## La plupart des méthodes supportent "thisArg"

Presque toutes les méthodes de tableau qui appellent des fonctions -- comme `find`, `filter`, `map`, à l'exception de `sort`, acceptent un paramètre supplémentaire facultatif `thisArg`.

<<<<<<< HEAD
Ce paramètre n'est pas expliqué dans les sections ci-dessus, car il est rarement utilisé. Mais pour être complet, nous devons quand même le voir.
=======
That parameter is not explained in the sections above, because it's rarely used. But for completeness, we have to cover it.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Voici la syntaxe complète de ces méthodes :

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg est le dernier argument optionnel
```

La valeur du paramètre `thisArg` devient `this` pour `func`.

Par exemple, nous utilisons ici une méthode de l'objet `army` en tant que filtre et `thisArg` passe le contexte :

```js run
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

*!*
// trouve les utilisateurs pour qui army.canJoin retourne true
let soldiers = users.filter(army.canJoin, army);
*/!*

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
```

Si, dans l'exemple ci-dessus, nous utilisions `users.filter(army.canJoin)`, alors `army.canJoin` serait appelée en tant que fonction autonome, avec `this = undefined`, ce qui entraînerait une erreur instantanée.

Un appel à `users.filter(army.canJoin, army)` peut être remplacé par `users.filter(user => army.canJoin(user))`, qui fait la même chose. Le premier est utilisé plus souvent, car il est un peu plus facile à comprendre pour la plupart des gens.

## Résumé

Un cheat sheet des méthodes de tableau :

- Pour ajouter / supprimer des éléments :
  - `push(...items)` -- ajoute des éléments à la fin,
  - `pop()` -- extrait un élément en partant de la fin,
  - `shift()` -- extrait un élément depuis le début,
  - `unshift(...items)` -- ajoute des éléments au début.
  - `splice(pos, deleteCount, ...items)` -- à l'index `pos` supprime `deleteCount` éléments et insert les éléments `items`.
  - `slice(start, end)` -- crée un nouveau tableau, y copie les éléments de `start` jusqu'à `end` (non inclus).
  - `concat(...items)` -- retourne un nouveau tableau : copie tous les membres du groupe actuel et lui ajoute des éléments. Si un des `items` est un tableau, ses éléments sont pris.
- Pour rechercher parmi des éléments :
  - `indexOf/lastIndexOf(item, pos)` -- cherche l'`item` à partir de la position `pos`, retourne l'index `-1` s'il n'est pas trouvé.
  - `includes(value)` -- retourne `true` si le tableau contient une `value`, sinon `false`.
  - `find/filter(func)` -- filtre les éléments à travers la fonction, retourne la première / toutes les valeurs qui retournent `true`.
  - `findIndex` est similaire à `find`, mais renvoie l'index au lieu d'une valeur.
- Pour parcourir les éléments :
  - `forEach(func)` -- appelle `func` pour chaque élément, ne retourne rien.
- Pour transformer le tableau :
  - `map(func)` -- crée un nouveau tableau à partir des résultats de `func` pour chaque élément.
  - `sort(func)` -- trie le tableau courant, puis le renvoie.
  - `reverse()` -- inverse le tableau courant, puis le renvoie.
  - `split/join` -- convertit une chaîne en tableau et inversement.
  - `reduce(func, initial)` -- calcule une valeur unique sur le tableau en appelant `func` pour chaque élément et en transmettant un résultat intermédiaire entre les appels.
- Aditionellement :
  - `Array.isArray(value)` vérifie que `value` est un tableau, si c'est le cas, renvoie `true`, sinon `false`.

<<<<<<< HEAD
Veuillez noter que les méthodes `sort`, `reverse` et `splice` modifient le tableau lui-même.
=======
- To search among elements:
  - `indexOf/lastIndexOf(item, pos)` -- look for `item` starting from position `pos`, and return the index or `-1` if not found.
  - `includes(value)` -- returns `true` if the array has `value`, otherwise `false`.
  - `find/filter(func)` -- filter elements through the function, return first/all values that make it return `true`.
  - `findIndex` is like `find`, but returns the index instead of a value.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Ces méthodes sont les plus utilisées, elles couvrent 99% des cas d'utilisation. Mais il y en a encore d'autres :

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) vérifie le tableau.

  La fonction `fn` est appelée sur chaque élément du tableau comme pour `map`. Si n'importe quel / tous les résultats sont `true`, il retourne `true`, sinon il retourne `false`.

  La fonction `fn` est appelée sur chaque élément du tableau similaire à `map`. Si un/tous les résultats sont `true`, renvoie `true`, sinon `false`.

  Ces méthodes se comportent en quelque sorte comme les opérateurs `||` et `&&` : si `fn` renvoie une valeur vraie, `arr.some()` renvoie immédiatement `true` et arrête de parcourir les autres éléments ; si `fn` renvoie une valeur fausse, `arr.every()`retourne immédiatement `false` et arrête également d'itérer sur les autres éléments.

  On peut utiliser `every` pour comparer les tableaux :

  ```js run
  function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

  alert( arraysEqual([1, 2], [1, 2])); // true
  ```

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- remplit le tableau avec une répétition de `value` de l'index `start` à `end`.

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- copie ses éléments en lui-même de la position `start` jusqu'à la position `end`, à la position `target` (écrase les éléments éxistants).

- [arr.flat(depth)](mdn:js/Array/flat)/[arr.flatMap(fn)](mdn:js/Array/flatMap) créer un nouveau tableau plat à partir d'un tableau multidimensionnel.

Pour la liste complète, consultez le [manuel](mdn:js/Array).

<<<<<<< HEAD
À première vue, vous pouvez penser qu’il existe de nombreuses méthodes difficiles à retenir. Mais en réalité, c'est beaucoup plus facile qu'il n'y paraît.
=======
At first sight, it may seem that there are so many methods, quite difficult to remember. But actually, that's much easier.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Parcourez le cheat sheet et essayer de vous en souvenir. Ensuite, faites les exercices de ce chapitre afin de vous familiariser avec les méthodes de tableau.

Ensuite, chaque fois que vous avez besoin de faire quelque chose avec un tableau, et que vous ne savez plus comment - revenez ici, regardez le cheatsheet et trouvez la bonne méthode. Des exemples vous aideront à l'écrire correctement. Bientôt, à force de pratiquer, vous vous souviendrez automatiquement des méthodes, sans efforts particuliers.
