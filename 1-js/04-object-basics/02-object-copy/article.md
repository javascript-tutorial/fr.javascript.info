# Copie d'objets et références

Une des principales différences entre les objets et les primitives est qu'ils sont stockés et copiés "par référence"

Les valeurs primitives comme les chaînes de caractères, les nombres, les booléens, etc. sont assignées et copiées par leur valeur directement

Par exemple :

```js
let message = "Hello!"
let phrase = message
```

Comme résultat, nous avons deux variables indépendantes, chacune stockant la chaîne `"Hello!"`.

![](variable-copy-value.svg)

Les objets, eux, ne se comportent pas de cette façon.

**Une variable ne stocke pas l'objet directement en elle, mais son "adresse en mémoire", autrement dit "une référence" de l'object.

Voici un exemple pour l'objet :

```js
let user = {
    name: "John"
};
```

![](variable-contains-reference.svg)

Dans cet exemple, l'object est stocké quelque part en mémoire, et la variable `user` ne garde qu'une référence.

**Lorsque l'on tente de copier une variable avec un objet, seule la référence est copiée, l'objet n'est pas dupliqué.**

Par exemple :

```js no-beautify
let user = { name: "John" };

let admin = user; // copie de la référence
```

Nous avons maintenant deux variables, avec chacune une référence sur le même objet:

![](variable-copy-reference.svg)

Comme les variables partagent la même référence, on peut utiliser n'importe quelle variable pour accéder à l'objet et modifier son contenu :

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // changé par la référence de la variable "admin"
*/!*

alert(*!*user.name*/!*); // 'Pete', les changements sont visibles depuis la référence de "user"
```

L'exemple au-dessus montre qu'il n'y a qu'un seul objet. De la même façon, si nous avons un tiroir avec deux clés, et que nous utilisons la première clé (`admin`), alors nous pourrons voir les changements plus tard à l'aide de l'autre clé (`user`)

## Comparaison par la référence

L'égalité `==` et l'égalité stricte `===` fonctionnent tous les deux de la même manière pour les objets.

**Deux objets sont égaux uniquement lorsqu'il s'agit du même objet.**

Les deux variables dans l'exemple suivant font référence au même objet, elles sont donc égales:

```js run
let a = {};
let b = a; // Copie de la référence

alert( a == b ); // true, les variables font référence au même objet
alert( a === b ); // true
```

Maintenant deux objets indépendants, ils ne sont pas égaux même s'ils sont tous les deux vides:

```js run
let a = {};
let b = {}; // deux objets indépendants

alert( a == b ); // false
```

En ce qui concerne la comparaison comme `obj1 > obj2` ou pour une comparaison avec une valeur primitive `obj == 5`, les objets sont convertis en primitives. Nous verrons plus tard comment ces comparaisons fonctionnent, mais elles n'arrivent que très rarement, et sont souvent le résultat d'une erreur dans la façon de faire.

## Duplication et fusion, Object.assign

Copier une variable contenant un objet crée une nouvelle référence sur le même obket.

Mais comment faire lorsque l'on veut dupliquer un objet ? Créer une copie indépendante ou un clone ?

Ce type d'opération est également possible, mais est un peu plus compliqué, car il n'y a pas de méthode pré-faite dans JavaScript pour ça. C'est assez rare de vouloir faire ça, la copie par référence suffit dans la plupart des cas.

Mais si nous voulons absolument le faire, alors nous devons créer un nouvel objet et dupliquer la structure de l'objet existant en itérant sur toutes ses propriétés et en les copiant au niveau primitif.

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // nouvel objet vide

// copie de toutes les propriétés de user
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// La variable clone est désormais une copie indépendante avec le même contenu
clone.name = "Pete"; // Changement du contenu

alert( user.name ); // Toujours sur John dans l'objet original
```

Il est également possible d'utiliser la méthode [Object.assign](mdn:js/Object/assign) pour ça.

Syntaxe de la méthode:

```js
Object.assign(dest, [src1, src2, src3...])
```

- Le premier argument `dest` est l'objet cible
- Les arguments suivants `src1, ..., srcN` (on peut en mettre autant que l'on souhaite) sont les objets sources.  
- La fonction copie toutes les propriétes des objets sources `src, ..., srcN` vers la cible `dest`. Les propriétés de tous les arguments en commençant par le deuxième sont copiées dans le premier objet.
- La fonction retourne `dest`.

On peut l'utiliser pour fusionner plusieurs objets en un seul:

```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copie l'ensemble des propriétes de permissions1 et permissins2 dans user
Object.assign(user, permissions1, permissions2);
*/!*

// user = { name: "John", canView: true, canEdit: true }
```

Si le nom de la propriété copiée existe déjà, elle est alors réécrite:

```js run
let user = { name: "John" }

Object.assign(user, { name: "Pete" });

alert(user.name); //user = { name: "Pete" }
```

On peut également utiliser `Object.assign` pour remplacer la boucle `for..in` lors d'un simple clonage:

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

La fonction copie toutes les propriétés de `user` dans l'objet vide et nous le retourne.

## Nested cloning

Jusqu'à présent, nous avons considéré que toutes les propriétés de `user` sont des types primitifs. Mais les propriétés peuvent également être des références à d'autres objets. Que faire dans ce cas ?

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

Copier l'objet sizes `clone.sizes = user.sizes` ne suffira pas, `user.size` est un objet, il sera donc copié par référence. `clone` et `user` partagerons donc le même objet sizes:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, il s'agit de la même référence

// user et clone se partagent sizes
user.sizes.width++;       // on change une propriété d'un côté
alert(clone.sizes.width); // 51, nous pouvons voir les changements de l'autre côté
```

Pour corriger ça, nous pouvons utiliser une boucle qui vérifiera chaque valeur de `user[key]`, et si c'est un objet, on copiera sa structure également. Cette méthode s'appelle "deep cloning" (clonage profond).

Il existe un algorithme pour le deep cloning qui permet de gérer les cas au-dessus et ceux plus complexes, le [Structured cloning algorithm](https://html.spec.whatwg.org/multipage/structured-data.html#safe-passing-of-structured-data).

Pour implémenter cet algorithme, nous pouvons utiliser la récursion, ou pour éviter de réinventer la roue, prendre une implémentation déjà existante comme [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep), de [lodash](https://lodash.com).

## Summary

Les objets sont assignés et copiés par référence. En d'autres termes, les variables ne gardent pas l'objet en lui-même, mais une "reférence", une adresse en mémoire vers cet objet. La copie de la variable ou le passage en argument dans une fonction ne copie que la référence, pas l'objet en lui-même.

Les opérations effectuées sur les copies des références (comme l'ajout ou le retrait de propriétés) sont effectués sur le même objet.

Pour créer une vraie copie (un clone), nous pouvons utiliser `Object.assign` pour effectuer une copie superficielle (shallow copy) (les objets internes ne seront copiés que par référence) ou une fonction comme [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) permettant de faire une copie complète (deep cloning)
