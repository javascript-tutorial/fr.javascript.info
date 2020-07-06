
<<<<<<< HEAD

# Chaînage optionnel '?.'

[recent browser="new"]

La syntaxe *chaînage optionnel* `?.` permet de consulter une propriété d'un objet, propriété qui se trouve située profondément dans sa chaîne de propriétés et ce sans encourir d'erreur si les propriétés intermédiaires dans cette chaîne n'existent pas.

## Le problème

Si vous abordez juste ce tutoriel et débutez en JavaScript, il se peut que vous ne soyez pas très concerné, mais ce problème est cependant assez fréquemment rencontré.

Par exemple, si seulement certains de vos utilisateurs possèdent une adresse. Vous ne pouvez pas simplement lire `user.address.street` comme ceci :

```js run
let user = {}; // 'user' n'a pas de propriété 'address'

alert(user.address.street); // Erreur !
```

De même, en développant du code exécuté dans un navigateur, il se peut qu'on veuille accéder au contenu d'un élément de la page qui quelquefois n'existe pas :

```js run
// Erreur si le résultat de 'querySelector(...)' est 'null'
let html = document.querySelector(".my-element").innerHTML;
```

Avant que  `?.` ne soit disponible, l'opérateur `&&` était utilisé pour contourner le problème.

Par exemple :

```js run
let user = {}; // 'user' n'a pas de pas de propriété 'address'

alert(user && user.address && user.address.street);
// => 'undefined' (mais pas d'erreur envoyée)
```

Raccorder tout ce chaînage de propriétés en répétant l'opérateur `&&` fonctionne certes, en évitant une erreur d'exécution, mais cela devient fatigant à la longue.

## Chaînage optionnel

L'opérateur de chaînage optionnel `?.` arrête l'évaluation de toute l'expression et retourne `undefined` si la partie à gauche `?.` prend la valeur `undefined` ou `null`.

À la suite de cette article, pour simplifier, nous dirons que quelque chose <u>*existe*</u> si et seulement si cette chose n'a ni la valeur `null` ni la valeur `undefined`.

Voici donc la façon succincte et sûre d'accéder à la valeur de `user.address.street` :

```js run
let user = {}; // 'user' n'a pas de pas de propriété 'address'

alert(user?.address?.street);
// => 'undefined' (mais pas d'erreur envoyée)
```

Et cela fonctionne même si `user` n'existe pas :
=======
# Optional chaining '?.'

[recent browser="new"]

The optional chaining `?.` is an error-proof way to access nested object properties, even if an intermediate property doesn't exist.

## The problem

If you've just started to read the tutorial and learn JavaScript, maybe the problem hasn't touched you yet, but it's quite common.

For example, some of our users have addresses, but few did not provide them. Then we can't safely read `user.address.street`:

```js run
let user = {}; // the user happens to be without address

alert(user.address.street); // Error!
```

Or, in the web development, we'd like to get an information about an element on the page, but it may not exist:

```js run
// Error if the result of querySelector(...) is null
let html = document.querySelector('.my-element').innerHTML;
```

Before `?.` appeared in the language, the `&&` operator was used to work around that.

For example:

```js run
let user = {}; // user has no address

alert( user && user.address && user.address.street ); // undefined (no error)
```

AND'ing the whole path to the property ensures that all components exist, but is cumbersome to write.

## Optional chaining

The optional chaining `?.` stops the evaluation and returns `undefined` if the part before `?.` is `undefined` or `null`.

Further in this article, for brevity, we'll be saying that something "exists" if it's not `null` and not `undefined`.


Here's the safe way to access `user.address.street`:

```js run
let user = {}; // user has no address

alert( user?.address?.street ); // undefined (no error)
```

Reading the address with `user?.address` works even if `user` object doesn't exist:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let user = null;

<<<<<<< HEAD
alert(user?.address); // undefined

alert(user?.address.street); // undefined
alert(user?.address.street.anything); // undefined
```

Notez bien que que `?.` n'opère qu'à l'immédiate partie gauche d'où il est placé et pas plus loin dans l'expression.

Ainsi dans l'exemple précédent l'expression s'arrête si `user` n'existe pas pas. Cependant s'il existe, il y aura erreur d'exécution si `address` ou même `address.street` n'existent pas.

```warn header="N'abusons pas de cette facilité"
N'utilisons cependant `?.` que dans le cas où on est sûr que cette non-existence n'est pas problématique dans la logique même du code.

Si par exemple dans cette logique, il faut que `user` existe mais que `address` est optionnel, il sera bien mieux d'écrire `user.address?.street`.

Ainsi si par erreur `user` n'existe pas, on rencontrera une erreur d'exécution signalant un codage incorrect. Autrement, cette erreur de codage pourrait être silencieusement ignorée la rendant difficile à pointer et corriger.
```

````warn header="Ne teste pas que quelque chose ne soit pas déclaré"
Notons que chaînage optionnel ne teste que les valeurs `null` et `undefined` et n'interfère pas avec d'autres mécanismes du langage. Ainsi, si une variable *n'est pas déclarée*, une erreur sera levée comme dans le cas suivant :

```js run
// ReferenceError: user is not defined
user.?address;
```
````

## Court-circuit

Comme précisé, `?.` stoppe immédiatement ("court-circuite") l'évaluation si la partie gauche de cette construction syntaxique n'existe pas.

Donc tout appel de fonction ou potentiel effet de bord (modification externe) en aval (à droite) dans l'évaluation ne s'exécutera pas :
=======
alert( user?.address ); // undefined

alert( user?.address.street ); // undefined
alert( user?.address.street.anything ); // undefined
```

Please note: the `?.` syntax works exactly where it's placed, not any further.

In the last two lines the evaluation stops immediately after `user?.`, never accessing further properties. But if the `user` actually exists, then the further intermediate properties, such as `user.address` must exist.

```warn header="Don't overuse the optional chaining"
We should use `?.` only where it's ok that something doesn't exist.

For example, if according to our coding logic `user` object must be there, but `address` is optional, then `user.address?.street` would be better.

So, if `user` happens to be undefined due to a mistake, we'll know about it and fix it. Otherwise, coding errors can be silenced where not appropriate, and become more difficult to debug.
```

````warn header="The variable before `?.` must exist"
If there's no variable `user`, then `user?.anything` triggers an error:

```js run
// ReferenceError: user is not defined
user?.address;
```
The optional chaining only tests for `null/undefined`, doesn't interfere with any other language mechanics.
````

## Short-circuiting

As it was said before, the `?.` immediately stops ("short-circuits") the evaluation if the left part doesn't exist.

So, if there are any further function calls or side effects, they don't occur:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let user = null;
let x = 0;

<<<<<<< HEAD
user?.sayHi(x++); // rien ne se passe

alert(x); // 0, 'x' n'est pas incrémenté
```


## Autres cas : ?.(), ?.[]

`?.` n'est pas un opérateur, mais une construction syntaxique particulière qui fonctionne aussi avec les appels de fonction et les crochets.

Par exemple, `?.()` est utilisé pour exécuter une fonction seulement si elle existe.

Ainsi dans cet exemple la méthode `admin` n'existe pas pour tout le monde :
=======
user?.sayHi(x++); // nothing happens

alert(x); // 0, value not incremented
```

## Other cases: ?.(), ?.[]

The optional chaining `?.` is not an operator, but a special syntax construct, that also works with functions and square brackets.

For example, `?.()` is used to call a function that may not exist.

In the code below, some of our users have `admin` method, and some don't:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

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
Dans les deux dernières lignes de code de l'exemple, on utilise tout d'abord l'opérateur `.` ce qui implique que les objets `user1` et `user2` existent.

Ensuite, `?.()` permet de vérifier l'existence de la propriété `admin` et donc l'exécution ne se fera pour `user1` , rien ne passera pour `user2` et ce sans erreur d'exécution.

La syntaxe `?.[]` peut aussi être utilisée si on veut utiliser des crochets  `[]` au lieu de `.` pour accéder à une propriété d'objet. De la même manière, l'accès se fera sans craindre une erreur :
=======
Here, in both lines we first use the dot `.` to get `admin` property, because the user object must exist, so it's safe read from it.

Then `?.()` checks the left part: if the admin function exists, then it runs (for `user1`). Otherwise (for `user2`) the evaluation stops without errors.

The `?.[]` syntax also works, if we'd like to use brackets `[]` to access properties instead of dot `.`. Similar to previous cases, it allows to safely read a property from an object that may not exist.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let user1 = {
  firstName: "John"
};

<<<<<<< HEAD
let user2 = null;

let key = "firstName";

alert(user1?.[key]); // John
alert(user2?.[key]); // undefined

alert(user1?.[key]?.something?.not?.existing); // undefined
```

On peut aussi utiliser `?.` avec `delete` :

```js run
delete user?.name; // efface 'user.name' si 'user' existe
```

````warn header="fonctionne pour lire et effacer, mais pas pour écrire"
Le chaînage optionnel `?.` ne peut être pas utilisé come partie gauche d'une assignation :

```js run
// l'idée est de ne définir 'user.name' que si 'user' existe

user?.name = "John"; // Erreur ! Cela ne fonctionne pas
// parce que cette expression s'évalue comme : undefined = "John"
```
````

## En résumé

La syntaxe `?.` revêt trois formes :

1. `obj?.prop` -- retourne `obj.prop` si `obj` existe, sinon `undefined`.
2. `obj?.[prop]` -- retourne `obj[prop]` if `obj` existe, sinon `undefined`.
3. `obj?.method()` -- exécute `obj.method()` si `obj` existe, sinon retourne `undefined`.

Toutes ces formes sont simples et faciles à comprendre. La partie `?.` vérifie si ce qui se trouve à sa gauche est `null` ou `undefined` et permet dans le cas contraire de procéder à la suite de l'évaluation.

Ce qui permet à une chaîne de `?.` d'accéder à des propriétés imbriquées de manière sûre.

Cependant, il faut appliquer cette opération avec discernement, seulement si le fait que certaines propriétés intermédiaires soient nulles ou non définies est acceptable.

Sinon cela ferait passer à côté d'erreurs conceptuelles qui se trouveraient masquées.

=======
let user2 = null; // Imagine, we couldn't authorize the user

let key = "firstName";

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

Also we can use `?.` with `delete`:

```js run
delete user?.name; // delete user.name if user exists
```

```warn header="We can use `?.` for safe reading and deleting, but not writing"
The optional chaining `?.` has no use at the left side of an assignment:

```js run
// the idea of the code below is to write user.name, if user exists

user?.name = "John"; // Error, doesn't work
// because it evaluates to undefined = "John"
```

## Summary

The `?.` syntax has three forms:

1. `obj?.prop` -- returns `obj.prop` if `obj` exists, otherwise `undefined`.
2. `obj?.[prop]` -- returns `obj[prop]` if `obj` exists, otherwise `undefined`.
3. `obj?.method()` -- calls `obj.method()` if `obj` exists, otherwise returns `undefined`.

As we can see, all of them are straightforward and simple to use. The `?.` checks the left part for `null/undefined` and allows the evaluation to proceed if it's not so.

A chain of `?.` allows to safely access nested properties.

Still, we should apply `?.` carefully, only where it's ok that the left part doesn't to exist.

So that it won't hide programming errors from us, if they occur.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
