

# Chaînage optionnel '?.'

[recent browser="new"]


Le chaînage optionnel `?.` Est un moyen sécurisé d'accéder aux propriétés d'objet imbriquées, même si une propriété intermédiaire n'existe pas.

## Le problème de la "propriété non existante"


Si vous venez de commencer à lire le tutoriel et à apprendre JavaScript, peut-être que le problème ne vous a pas encore touché, mais c'est assez courant.


À titre d'exemple, considérons les objets pour les données utilisateur. La plupart de nos utilisateurs ont des adresses dans la propriété `user.address`, avec la rue `user.address.street`, mais certains ne les ont pas fournies.
Dans ce cas, lorsque nous tentons d'obtenir `user.address.street`, nous obtenons une erreur :

```js run
let user = {}; // l'utilisateur sans propriété "address"


alert(user.address.street); // Error!
```


C'est le résultat attendu, JavaScript fonctionne comme ça, mais dans de nombreux cas pratiques, nous préférerions obtenir `undefined` au lieu d'une erreur (signifiant "pas de rue").

... Et un autre exemple. Dans le développement Web, nous pouvons avoir besoin d'obtenir une information sur un élément de la page, qui n'existe parfois pas:


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


ET l'ensemble du chemin d'accès à la propriété garantit que tous les composants existent (sinon, l'évaluation s'arrête), mais est difficile à écrire.


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


Donc, si `user` n'est pas défini en raison d'une erreur, nous verrons une erreur de programmation à ce sujet et la corrigerons. Sinon, les erreurs de codage peuvent être réduites au silence lorsqu'elles ne sont pas appropriées et devenir plus difficiles à déboguer.

```

````warn header="La variable avant `?.` doit être déclarée"
S'il n'y a pas du tout de variable `user`, alors `user?.anything` déclenche une erreur :

```js run
// ReferenceError: user is not defined
user?.address;
```

Il doit y avoir une déclaration (par exemple `let/const/var user`). Le chaînage optionnel ne fonctionne que pour les variables déclarées.

````

## Court-circuit

Comme il a été dit précédemment, le `?.` arrête immédiatement ("court-circuite") l'évaluation si la partie gauche n'existe pas.


Donc, s'il y a d'autres appels de fonction ou effets secondaires, ils ne se produisent pas :

Par exemple :

```js run
let user = null;
let x = 0;


user?.sayHi(x++); // pas de "sayHi", donc l'exécution n'atteint pas x++


alert(x); // 0, la valeur n'est pas incrémenté
```


## Autres variantes : ?.(), ?.[]

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


Ici, dans les deux lignes, nous utilisons d'abord le point (`user1.admin`) pour obtenir la propriété `admin`, car l'objet utilisateur doit exister, donc il peut être lu en toute sécurité.
Puis `?.()` Vérifie la partie gauche : si la fonction admin existe, alors elle s'exécute (c'est le cas pour `user1`). Sinon (pour `user2`) l'évaluation s'arrête sans erreur.


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


```warn header="Nous pouvons utiliser `?.` pour lire et supprimer en toute sécurité, mais pas pour écrire"
Le chaînage optionnel `?.` n'a aucune utilité sur le côté gauche d'une affectation :


For example:
```js run

let user = null;

user?.name = "John"; // Erreur, ne fonctionne pas
// car il évalue à undefined = "John"
```
Ce n'est tout simplement pas si intelligent.

## Résumé

Le chaînage optionnel '?.' A trois formes :

1. `obj?.prop` -- retourne `obj.prop` si `obj` existe, sinon `undefined`.
2. `obj?.[prop]` -- retourne `obj[prop]` si `obj` existe, sinon `undefined`.
3. `obj?.method()` -- appel `obj.method()` si `obj.method` existe, sinon retourne `undefined`.


Comme nous pouvons le voir, tous sont simples et simples à utiliser. Le `?.` vérifie la partie gauche pour `nul/undefined` et permet à l'évaluation de se poursuivre si ce n'est pas le cas.

Une chaîne de `?.` permet d'accéder en toute sécurité aux propriétés imbriquées.


Néanmoins, nous devons appliquer «?.» Avec soin, uniquement s'il est acceptable que la partie gauche n'existe pas. Pour ne pas nous cacher les erreurs de programmation, si elles se produisent.

