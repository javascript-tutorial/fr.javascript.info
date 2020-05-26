

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

```js run
let user = null;

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

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // rien ne se passe

alert(x); // 0, 'x' n'est pas incrémenté
```


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

Dans les deux dernières lignes de code de l'exemple, on utilise tout d'abord l'opérateur `.` ce qui implique que les objets `user1` et `user2` existent.

Ensuite, `?.()` permet de vérifier l'existence de la propriété `admin` et donc l'exécution ne se fera pour `user1` , rien ne passera pour `user2` et ce sans erreur d'exécution.

La syntaxe `?.[]` peut aussi être utilisée si on veut utiliser des crochets  `[]` au lieu de `.` pour accéder à une propriété d'objet. De la même manière, l'accès se fera sans craindre une erreur :

```js run
let user1 = {
  firstName: "John"
};

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

