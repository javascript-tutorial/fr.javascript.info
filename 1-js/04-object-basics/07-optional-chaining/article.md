

# Chaînage optionnel '?.'

[recent browser="new"]

<<<<<<< HEAD
Le chaînage optionnel `?.` Est un moyen sans erreur d'accéder aux propriétés d'objet imbriquées, même si une propriété intermédiaire n'existe pas.

## Le problème
=======
The optional chaining `?.` is a safe way to access nested object properties, even if an intermediate property doesn't exist.

## The "non-existing property" problem
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

Si vous venez de commencer à lire le tutoriel et à apprendre JavaScript, peut-être que le problème ne vous a pas encore touché, mais c'est assez courant.

<<<<<<< HEAD
Par exemple, certains de nos utilisateurs ont des adresses, mais peu ne les ont pas fournies. Ensuite, nous ne pouvons pas lire en toute sécurité `user.address.street` :

```js run
let user = {}; // l'utilisateur se trouve être sans adresse
=======
As an example, let's consider objects for user data. Most of our users have addresses in `user.address` property, with the street `user.address.street`, but some did not provide them. 

In such case, when we attempt to get `user.address.street`, we'll get an error:

```js run
let user = {}; // the user without "address" property
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

alert(user.address.street); // Error!
```

<<<<<<< HEAD
Ou, dans le développement Web, nous aimerions obtenir une information sur un élément de la page, mais il peut ne pas exister :
=======
That's the expected result, JavaScript works like this, but many practical cases we'd prefer to get `undefined` instead of an error (meaning "no street").

...And another example. In the web development, we may need to get an information about an element on the page, that sometimes doesn't exist:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js run
// Erreur si le résultat de querySelector(...) est null
let html = document.querySelector('.my-element').innerHTML;
```

Avant l'apparition de `?.` Dans le langage, l'opérateur `&&` était utilisé pour contourner ce problème.

Par exemple :

```js run
let user = {}; // l'utilisateur n'a pas d'adresse

alert( user && user.address && user.address.street ); // undefined (no error)
```

<<<<<<< HEAD
ET le chemin d'accès complet à la propriété garantit que tous les composants existent, mais il est difficile à écrire.
=======
AND'ing the whole path to the property ensures that all components exist (if not, the evaluation stops), but is cumbersome to write.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

## Chaînage optionnel

Le chaînage facultatif `?.` Arrête l'évaluation et renvoie `undefined` si la partie avant `?.` est `undefined` ou `null`.

**Plus loin dans cet article, par souci de brièveté, nous dirons que quelque chose "existe" si ce n'est pas "null" et non "undefined".**

Voici le moyen sûr d'accéder `user.address.street` :

```js run
let user = {}; // l'utilisateur n'a pas d'adresse

alert( user?.address?.street ); // undefined (no error)
```

La lecture de l'adresse avec `user?.address` fonctionne même si l'objet `user` n'existe pas :

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

Remarque: la syntaxe `?.` Rend facultative la valeur qui la précède, mais pas plus.

Dans l'exemple ci-dessus, `user?.` Permet uniquement à `user` d'être `null/undefined`.

D'un autre côté, si `user` existe, alors il doit avoir la propriété `user.address`, sinon `user?.address.street` donne une erreur au deuxième point.

```warn header="N'abusez pas du chaînage optionnel"
Nous ne devrions utiliser `?.` que là où il est normal que quelque chose n'existe pas.

Par exemple, si selon notre logique de codage, l'objet `user` doit être là, mais que `address` est facultatif, alors `user.address?.street` serait mieux.

<<<<<<< HEAD
Donc, si `user` n'est pas défini à cause d'une erreur, nous le saurons et le réparerons. Sinon, les erreurs de codage peuvent être réduites au silence lorsqu'elles ne sont pas appropriées et devenir plus difficiles à déboguer.
=======
So, if `user` happens to be undefined due to a mistake, we'll see a programming error about it and fix it. Otherwise, coding errors can be silenced where not appropriate, and become more difficult to debug.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
```

````warn header="La variable avant `?.` doit être déclarée"
S'il n'y a pas du tout de variable `user`, alors `user?.anything` déclenche une erreur :

```js run
// ReferenceError: user is not defined
user?.address;
```
<<<<<<< HEAD
<<<<<<< HEAD
Il doit y avoir `let/const/var user`. Le chaînage optionnel ne fonctionne que pour les variables déclarées.
=======
There must be `let/const/var user`. The optional chaining works only for declared variables.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
=======
There must be a declaration (e.g. `let/const/var user`). The optional chaining works only for declared variables.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
````

## Court-circuit

Comme il a été dit précédemment, le `?.` arrête immédiatement ("court-circuite") l'évaluation si la partie gauche n'existe pas.

<<<<<<< HEAD
Donc, s'il y a d'autres appels de fonction ou effets secondaires, ils ne se produisent pas :
=======
So, if there are any further function calls or side effects, they don't occur.

For instance:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js run
let user = null;
let x = 0;

<<<<<<< HEAD
user?.sayHi(x++); // rien ne se passe
=======
user?.sayHi(x++); // no "sayHi", so the execution doesn't reach x++
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

alert(x); // 0, la valeur n'est pas incrémenté
```

<<<<<<< HEAD
=======
## Other variants: ?.(), ?.[]
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

## Autres cas : ?.(), ?.[]

`?.` n'est pas un opérateur, mais une construction syntaxique particulière qui fonctionne aussi avec les appels de fonction et les crochets.

Par exemple, `?.()` est utilisé pour exécuter une fonction seulement si elle existe.

Ainsi dans cet exemple la méthode `admin` n'existe pas pour tout le monde :

```js run
let user1 = {
  admin() {
    alert("I am admin");
  }
}

let user2 = {};

*!*
user1.admin?.(); // I am admin
user2.admin?.();
*/!*
```

<<<<<<< HEAD
Ici, dans les deux lignes, nous utilisons d'abord le point `.` pour obtenir la propriété `admin`, car l'objet utilisateur doit exister, il peut donc être lu en toute sécurité.

Puis `?.()` Vérifie la partie gauche : si la fonction admin existe, alors elle s'exécute (pour `user1`). Sinon (pour `user2`), l'évaluation s'arrête sans erreur.
=======
Here, in both lines we first use the dot (`user1.admin`) to get `admin` property, because the user object must exist, so it's safe read from it.

Then `?.()` checks the left part: if the admin function exists, then it runs (that's so for `user1`). Otherwise (for `user2`) the evaluation stops without errors.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

La syntaxe `?.[]` Fonctionne également, si nous voulons utiliser des crochets `[]` pour accéder aux propriétés au lieu du point `.`. Similaire aux cas précédents, il permet de lire en toute sécurité une propriété à partir d'un objet qui peut ne pas exister.

```js run
let user1 = {
  firstName: "John"
};

let user2 = null; // Imaginez, nous ne pouvons pas autoriser l'utilisateur

let key = "firstName";

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

Nous pouvons également utiliser `?.` avec `delete` :

```js run
delete user?.name; // supprime user.name si user existe
```

<<<<<<< HEAD
```warn header="Nous pouvons utiliser `?.` pour lire et supprimer en toute sécurité, mais pas pour écrire"
Le chaînage optionnel `?.` n'a aucune utilité sur le côté gauche d'une affectation :
=======
````warn header="We can use `?.` for safe reading and deleting, but not writing"
The optional chaining `?.` has no use at the left side of an assignment.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

For example:
```js run
<<<<<<< HEAD
// l'idée du code ci-dessous est d'écrire user.name, si l'utilisateur existe
=======
let user = null;
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

user?.name = "John"; // Erreur, ne fonctionne pas
// car il évalue à undefined = "John"
```

<<<<<<< HEAD
## Résumé

La syntaxe `?.` A trois formes :

1. `obj?.prop` -- retourne `obj.prop` si `obj` existe, sinon `undefined`.
2. `obj?.[prop]` -- retourne `obj[prop]` si `obj` existe, sinon `undefined`.
3. `obj?.method()` -- appel `obj.method()` si `obj` existe, sinon retourne `undefined`.
=======
It's just not that smart.
````

## Summary

The optional chaining `?.` syntax has three forms:

1. `obj?.prop` -- returns `obj.prop` if `obj` exists, otherwise `undefined`.
2. `obj?.[prop]` -- returns `obj[prop]` if `obj` exists, otherwise `undefined`.
3. `obj.method?.()` -- calls `obj.method()` if `obj.method` exists, otherwise returns `undefined`.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

Comme nous pouvons le voir, tous sont simples et simples à utiliser. Le `?.` vérifie la partie gauche pour `nul/undefined` et permet à l'évaluation de se poursuivre si ce n'est pas le cas.

Une chaîne de `?.` permet d'accéder en toute sécurité aux propriétés imbriquées.

<<<<<<< HEAD
Néanmoins, nous devons appliquer `?.` Avec soin, uniquement là où il est normal que la partie gauche n'existe pas.

Pour qu'il ne nous cache pas les erreurs de programmation, si elles se produisent.
=======
Still, we should apply `?.` carefully, only where it's acceptable that the left part doesn't to exist. So that it won't hide programming errors from us, if they occur.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
