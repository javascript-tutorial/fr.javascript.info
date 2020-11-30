# Les références d'objet et leur copie

<<<<<<< HEAD
Une des différences fondamentale des objets avec les primitives est que ceux-ci sont stockés et copiés "par référence", en opposition des valeurs primitives : strings, numbers, booleans, etc. -- qui sont toujours copiés comme "valeur entière".

On comprendra plus facilement en regardant "sous le capot" le fonctionnement de la copie d'une valeur.
=======
One of the fundamental differences of objects versus primitives is that objects are stored and copied "by reference", whereas primitive values: strings, numbers, booleans, etc -- are always copied "as a whole value".

That's easy to understand if we look a bit under the hood of what happens when we copy a value.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Commençons avec une primitive, comme une chaîne de caractères.

Ici nous assignons une copie de `message` dans `phrase` :

```js
let message = "Hello!";
let phrase = message;
```

<<<<<<< HEAD
Il en résulte deux variables indépendantes, chacune stockant la chaîne de caractères `"Hello!"`.
=======
As a result we have two independent variables, each one storing the string `"Hello!"`.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

![](variable-copy-value.svg)

Un résultat plutôt évident n'est-ce pas ?

Les objets ne fonctionnent pas comme cela.

<<<<<<< HEAD
**Une variable assignée à un objet ne stocke pas l'objet lui-même, mais son "adresse mémoire", en d'autres termes "une référence" à celui-ci.**

Prenons un exemple d'une telle variable :
=======
**A variable assigned to an object stores not the object itself, but its "address in memory" -- in other words "a reference" to it.**

Let's look at an example of such a variable:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

```js
let user = {
  name: "John"
};
```

Et ici comment elle est stockée en mémmoire :

![](variable-contains-reference.svg)

L'objet est stocké quelque part dans la mémoire (du coté droit de l'image), tandis que la varaible `user` (du coté gauche) a une référence à celui-ci.

<<<<<<< HEAD
On peut voir la variable d'objet, ici `user`, comme une feuille de papier avec l'adresse.

Lorque l'on réalise une action avec l'objet, par exemple récupérer la propriété `user.name`, le moteur de Javascript regarde à l'adresse et réalise l'opération sur l'objet.
=======
We may think of an object variable, such as `user`, as like a sheet of paper with the address of the object on it.

When we perform actions with the object, e.g. take a property `user.name`, the JavaScript engine looks at what's at that address and performs the operation on the actual object.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Et voilà pourquoi cela est important.

<<<<<<< HEAD
**Lorsqu'une la variable d'objet est copiée -- la référence est copiée, l'objet n'est pas dupliqué.**
=======
**When an object variable is copied, the reference is copied, but the object itself is not duplicated.**
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Par exemple:

```js no-beautify
let user = { name: "John" };

let admin = user; // copie la référence
```

<<<<<<< HEAD
Maintenant nous avons deux variables, chacune avec la référence vers le même objet :

![](variable-copy-reference.svg)

Comme vous pouvez le voir, il y a toujours qu'un seul objet, avec deux variables qui le référence.

On peut utiliser n'importe quelle variable pour accéder à l'objet et modifier le contenu :
=======
Now we have two variables, each storing a reference to the same object:

![](variable-copy-reference.svg)

As you can see, there's still one object, but now with two variables that reference it.

We can use either variable to access the object and modify its contents:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // changé par la référence "admin"
*/!*

alert(*!*user.name*/!*); // 'Pete', les changements sont visibles sur la référence "user"
```

<<<<<<< HEAD
C'est comme si l'on avait un cabinet avec deux clés et que on l'on utilisait l'une d'elles (`admin`) pour y accéder. Puis, si l'on utilise plus tard la clé (`user`) on peut voir les changements.
=======
It's as if we had a cabinet with two keys and used one of them (`admin`) to get into it and make changes. Then, if we later use another key (`user`), we are still opening the same cabinet and can access the changed contents.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

## Comparaison par référence

Deux objets sont egaux seulement s'ils sont le même objet.

Par exemple, ici `a` et `b` référence le même objet, aussi sont-ils similaires :

```js run
let a = {};
let b = a; // copie la référence

alert( a == b ); // true, les deux variables référencent le même objet
alert( a === b ); // true
```

Et ici deux objets indépendants ne sont pas égaux, même s'ils se ressemblent (les deux sont vides) :

```js run
let a = {};
let b = {}; // 2 objets indépendants

alert( a == b ); // false
```

<<<<<<< HEAD
Pour des comparaisons comme `obj1 > obj2` ou des comparaisons avec une primitive `obj == 5`, les objets sont convertis en primitive. Nous étudierons comment les conversions d'objets fonctionnent bientôt, mais pour dire la vérité, de telles comparaisons sont rarement nécessaires, en général elles sont le résultat d'une erreur de programmation.
=======
For comparisons like `obj1 > obj2` or for a comparison against a primitive `obj == 5`, objects are converted to primitives. We'll study how object conversions work very soon, but to tell the truth, such comparisons are needed very rarely -- usually they appear as a result of a programming mistake.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

## Clonage et fusionage, Object.assign

Copier une variable object créé une référence en plus vers le même objet.

Mais quid si nous voulons dupliquer un objet ? Créer une copie indépendante, un clone ?

<<<<<<< HEAD
C'est aussi faisable, mais un peu plus compliqué, car en Javascript il n'y pas de méthode intégrée pour cela. En fait c'est rarement utile. Copier par référence fonctionne la plupart du temps.
=======
That's also doable, but a little bit more difficult, because there's no built-in method for that in JavaScript. But there is rarely a need -- copying by reference is good most of the time.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Mais si nous le voulons, alors nous devons créer un nouvel objet et répliquer sa structure en itérant ses propriétés et en les copiant au niveau primitive.

Comme cela :

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // le nouvel object vide

// on copie toutes les propritété de user
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// maintenant clone est un objet complétemnet indépendant  avec le même contenu
clone.name = "Pete"; // On change les données de celui-ci

alert( user.name ); // c'est toujour john dans l'objet copié
```

On peu aussi utiliser la méthode [Object.assign](mdn:js/Object/assign) pour cela.

La syntaxe est :

```js
Object.assign(dest, [src1, src2, src3...])
```

- Le premier argument `dest` est l'objet cible
- Les arguments suivants `src1, ..., srcN` (cela peut-être tant que l'on veut) sont les objets à copier.
- La méthode copie les propriétés de toutes les objets à copier `src1, ..., srcN` dans l'objet `dest`. En d'autres mots, les propriétés de tous les arguments à partir du deuxième sont copiés dans le premier argument.
- L'appel retourne `dest`.

Par exemple, on peut l'utiliser pour fusioner plusieurs objets en un seul :

```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copie toutes les propriétés de permissions1 et 2 dans user
Object.assign(user, permissions1, permissions2);
*/!*

// on a user = { name: "John", canView: true, canEdit: true }
```

Si la propriété copiée existe déja, elle est écrasée.

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // on a user = { name: "Pete" }
```

On peut aussi utiliser `Object.assign` to replace `for..in` boucle pour un clonage simple.

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

Cela copie toutes les propriétés de `user` dans l'objet vide et le retourne.

## Clonage imbriqué

Jusqu'à maintenat on suppose que toutes les propriétés de `use` sont des primitives. Mais les propriétés peuvent être des références vers d'autres objets. Comment gèrer ces cas-là ?

Comme ceci :
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Ce n'est plus suffisant de copier `clone.sizes = user.sizes`, car `user.sizes` est un objet, il sera copié par référence. Donc `clone` et `user` partageront le même objet `sizes` :

Comme cela :

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, c'est le même objet

// user et clone partage l'objet sizes
user.sizes.width++;       // on modifie la propriété à un endroit
alert(clone.sizes.width); // 51, on peut voir la modification dans un autre endroit
```

<<<<<<< HEAD
Pour régler ça, on doit utiliser la boucle de clonage qui examine chaque valeur de `user[key]` et, si c'est un objet, répliquer sa structure aussi. On appelle cela un "clone réél" (deep clone).

On peut utiliser la récursion pour l'implémenter. Ou, pour ne pas réinventer la roue, prendre un implémentation existante. par exemple [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) de la librairie [lodash](https://lodash.com).

```smart header="Les objets Const peuvent être modifiés"
Un "effet secondaire" important du stockage d'objets en tant que références est qu'un objet déclaré comme `const` *peut* être modifié.
=======
To fix that, we should use a cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning".

We can use recursion to implement it. Or, to not reinvent the wheel, take an existing implementation, for instance [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) from the JavaScript library [lodash](https://lodash.com).

````smart header="Const objects can be modified"
An important side effect of storing objects as references is that an object declared as `const` *can* be modified.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Par exemple :

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

<<<<<<< HEAD
Il peut sembler que la ligne `(*)` provoquerait une erreur, mais non. La valeur de `user` est constante, elle doit toujours référencer le même objet. Mais les propriétés de cet objet sont libres de changer.

En d'autres termes, le `const user` ne donne une erreur que si nous essayons de définir `user = ...` dans son ensemble, et c'est tout.

Cela dit, si nous avons vraiment besoin de créer des propriétés d'objet constantes, c'est également possible, mais en utilisant des méthodes totalement différentes, nous le mentionnerons dans le chapitre <info:property-descriptors>.
```
=======
It might seem that the line `(*)` would cause an error, but it does not. The value of `user` is constant, it must always reference the same object, but properties of that object are free to change.

In other words, the `const user` gives an error only if we try to set `user=...` as a whole.

That said, if we really need to make constant object properties, it's also possible, but using totally different methods. We'll mention that in the chapter <info:property-descriptors>.
````
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

## Résumé

<<<<<<< HEAD
Les objets sont assignés et copiés par référence. En d'autres mots, une variable ne stocke pas la "valeur de l'objet" mais la "référence" (l'adresse en mémoire) de la valeur. Donc copier cette variable, ou la passer en argument d'une fonction, copie la référence, pas l'objet.
=======
Objects are assigned and copied by reference. In other words, a variable stores not the "object value", but a "reference" (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object itself.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Toutes les opérations faites par une copie de la référence (comme ajouter/supprimer une propriété) sont faites sur le même objet.

Pour réaliser une copie (un clone) on peut utiliser `Object.assign`, pour faire une "copie superficielle" (les objets imbriqués sont copiés par référence), ou pour une "copie réelle" une fonction comme [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
