

# Chaînage optionnel '?.'

[recent browser="new"]


Le chaînage optionnel `?.` Est un moyen sécurisé d'accéder aux propriétés d'objet imbriquées, même si une propriété intermédiaire n'existe pas.

## Le problème de la "propriété non existante"


Si vous venez de commencer à lire le tutoriel et à apprendre JavaScript, peut-être que le problème ne vous a pas encore touché, mais c'est assez courant.


À titre d'exemple, disons que nous avons des objets `user` qui contiennent les informations sur nos utilisateurs.

La plupart de nos utilisateurs ont des adresses dans la propriété `user.address`, avec la rue `user.address.street`, mais certains ne les ont pas fournies.

Dans ce cas, lorsque nous essayons d'obtenir `user.address.street`, et que l'utilisateur se trouve sans adresse, nous obtenons une erreur :

```js run
let user = {}; // un utilisateur sans propriété "address"


alert(user.address.street); // Error!
```

C'est le résultat attendu. JavaScript fonctionne comme cela. Comme `user.address` est `undefined`, une tentative d'obtention de `user.address.street` échoue avec une erreur.

Dans de nombreux cas pratiques, nous préférerions obtenir `undefined` au lieu d'une erreur ici (signifiant "pas de rue").

... Et un autre exemple. Dans le développement Web, nous pouvons obtenir un objet qui correspond à un élément de page Web à l'aide d'un appel de méthode spécial, tel que `document.querySelector('.elem')`, et il renvoie `null` lorsqu'il n'y a pas ce type d'élément.

```js run
// document.querySelector('.elem') est nul s'il n'y a pas d'élément
let html = document.querySelector('.elem').innerHTML; // error if it's null
```

<<<<<<< HEAD
Encore une fois, si l'élément n'existe pas, nous obtiendrons une erreur lors de l'accès à `.innerHTML` de` null`. Et dans certains cas, lorsque l'absence de l'élément est normale, nous aimerions éviter l'erreur et accepter simplement `html = null` comme résultat.
=======
Once again, if the element doesn't exist, we'll get an error accessing `.innerHTML` property of `null`. And in some cases, when the absence of the element is normal, we'd like to avoid the error and just accept `html = null` as the result.
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f

Comment peut-on le faire ?

La solution évidente serait de vérifier la valeur en utilisant `if` ou l'opérateur conditionnel `?`, Avant d'accéder à sa propriété, comme ceci :

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

<<<<<<< HEAD
Cela fonctionne, il n'y a pas d'erreur ... Mais c'est assez inélégant. Comme vous pouvez le voir, `"user.address"` apparaît deux fois dans le code. Pour des propriétés plus profondément imbriquées, cela devient un problème car plus de répétitions sont nécessaires.

Par exemple. essayons d'obtenir `user.address.street.name`.

Nous devons vérifier à la fois `user.address` et `user.address.street` :
=======
It works, there's no error... But it's quite inelegant. As you can see, the `"user.address"` appears twice in the code.

Here's how the same would look for `document.querySelector`:

```js run
let html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null;
```

We can see that the element search `document.querySelector('.elem')` is actually called twice here. Not good.

For more deeply nested properties, it becomes even uglier, as more repetitions are required.

E.g. let's get `user.address.street.name` in a similar fashion.
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f

```js
let user = {}; // l'utilisateur n'a pas d'adresse

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

C'est juste horrible, on peut même avoir des problèmes pour comprendre un tel code.

<<<<<<< HEAD
Ne vous en souciez même pas, car il existe une meilleure façon de l'écrire, en utilisant l'opérateur `&&` :
=======
There's a little better way to write it, using the `&&` operator:
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f

```js run
let user = {}; // l'utilisateur n'a pas d'adresse

alert( user.address && user.address.street && user.address.street.name ); // undefined (no error)
```

Et le chemin complet vers la propriété garantit que tous les composants existent (sinon, l'évaluation s'arrête), mais n'est pas non plus idéal.

Comme vous pouvez le voir, les noms de propriétés sont toujours dupliqués dans le code. Par exemple. dans le code ci-dessus, `user.address` apparaît trois fois.

C'est pourquoi le chaînage facultatif `?.` A été ajouté au langage. Pour résoudre ce problème une fois pour toutes !


## Chaînage optionnel

Le chaînage optionnel `?.` arrête l'évaluation si la valeur avant `?.` est `undefined` ou `null` et renvoie `undefined`.

**Plus loin dans cet article, par souci de brièveté, nous dirons que quelque chose "existe" si ce n'est pas "null" et non "undefined".**

En d'autres termes, `value?.prop` :
- est identique à `value.prop` si `value` existe,
- sinon (lorsque `value` est `undefined/nul`), il renvoie `undefined`.

Voici le moyen sûr d'accéder à `user.address.street` en utilisant `?.` :

```js run
let user = {}; // l'utilisateur n'a pas d'adresse

alert( user?.address?.street ); // undefined (no error)
```

Le code est court et propre, il n'y a aucune duplication.

<<<<<<< HEAD
La lecture de l'adresse avec `user?.address` fonctionne même si l'objet `user` n'existe pas :
=======
Here's an example with `document.querySelector`:

```js run
let html = document.querySelector('.elem')?.innerHTML; // will be null, if there's no element
```

Reading the address with `user?.address` works even if `user` object doesn't exist:
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

Remarque: la syntaxe `?.` Rend facultative la valeur qui la précède, mais pas plus.

Par exemple. dans `user?.address.street.name` le `?.` permet à `user` d'être en toute sécurité `null/undefined` (et renvoie `undefined` dans ce cas), mais ce n'est que pour `user`. D'autres propriétés sont accessibles de manière régulière. Si nous voulons que certaines d'entre elles soient optionnelles, alors nous devrons remplacer plus de `.` par `?.`.

```warn header="N'abusez pas du chaînage optionnel"
Nous ne devrions utiliser `?.` que là où il est normal que quelque chose n'existe pas.

<<<<<<< HEAD
Par exemple, si selon notre logique de codage, l'objet `user` doit exister, mais que `address` est facultatif, alors nous devrions écrire `user.address?.street`, mais pas `user?.address?.street`.

=======
For example, if according to our code logic `user` object must exist, but `address` is optional, then we should write `user.address?.street`, but not `user?.address?.street`.

Then, if `user` happens to be undefined, we'll see a programming error about it and fix it. Otherwise, if we overuse `?.`, coding errors can be silenced where not appropriate, and become more difficult to debug.
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f
```

````warn header="La variable avant `?.` doit être déclarée"
S'il n'y a pas du tout de variable `user`, alors `user?.anything` déclenche une erreur :

```js run
// ReferenceError: user is not defined
user?.address;
```
La variable doit être déclarée (par exemple `let/const/var user` ou en tant que paramètre de fonction). Le chaînage facultatif ne fonctionne que pour les variables déclarées.
````

## Court-circuit

Comme il a été dit précédemment, le `?.` arrête immédiatement ("court-circuite") l'évaluation si la partie gauche n'existe pas.


<<<<<<< HEAD
Donc, s'il y a d'autres appels de fonction ou effets secondaires, ils ne se produisent pas :
=======
So, if there are any further function calls or operations to the right of `?.`, they won't be made.
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f

Par exemple :

```js run
let user = null;
let x = 0;

<<<<<<< HEAD
=======
user?.sayHi(x++); // no "user", so the execution doesn't reach sayHi call and x++
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f

user?.sayHi(x++); // pas de "sayHi", donc l'exécution n'atteint pas x++


alert(x); // 0, la valeur n'est pas incrémenté
```


## Autres variantes : ?.(), ?.[]

`?.` n'est pas un opérateur, mais une construction syntaxique particulière qui fonctionne aussi avec les appels de fonction et les crochets.

Par exemple, `?.()` est utilisé pour exécuter une fonction seulement si elle existe.

Ainsi dans cet exemple la méthode `admin` n'existe pas pour tout le monde :

```js run
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // I am admin
*/!*

*!*
userGuest.admin?.(); // nothing happens (no such method)
*/!*
```

<<<<<<< HEAD
=======
Here, in both lines we first use the dot (`userAdmin.admin`) to get `admin` property, because we assume that the `user` object exists, so it's safe read from it.
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f

Ici, dans les deux lignes, nous utilisons d'abord le point (`userAdmin.admin`) pour obtenir la propriété `admin`, car l'objet utilisateur doit exister, donc il peut être lu en toute sécurité.

Puis `?.()` Vérifie la partie gauche : si la fonction admin existe, alors elle s'exécute (c'est le cas pour `userAdmin`). Sinon (pour `userGuest`) l'évaluation s'arrête sans erreur.


La syntaxe `?.[]` Fonctionne également, si nous voulons utiliser des crochets `[]` pour accéder aux propriétés au lieu du point `.`. Similaire aux cas précédents, il permet de lire en toute sécurité une propriété à partir d'un objet qui peut ne pas exister.

```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
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

<<<<<<< HEAD
user?.name = "John"; // Erreur, ne fonctionne pas
// car il évalue à undefined = "John"
=======
user?.name = "John"; // Error, doesn't work
// because it evaluates to: undefined = "John"
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f
```
Ce n'est tout simplement pas si intelligent.

<<<<<<< HEAD
## Résumé

Le chaînage optionnel '?.' A trois formes :
=======
````
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f

1. `obj?.prop` -- retourne `obj.prop` si `obj` existe, sinon `undefined`.
2. `obj?.[prop]` -- retourne `obj[prop]` si `obj` existe, sinon `undefined`.
3. `obj?.method()` -- appel `obj.method()` si `obj.method` existe, sinon retourne `undefined`.


Comme nous pouvons le voir, tous sont simples et simples à utiliser. Le `?.` vérifie la partie gauche pour `nul/undefined` et permet à l'évaluation de se poursuivre si ce n'est pas le cas.

Une chaîne de `?.` permet d'accéder en toute sécurité aux propriétés imbriquées.


<<<<<<< HEAD
Néanmoins, nous devons appliquer `?.` avec soin, uniquement s'il est acceptable que la partie gauche n'existe pas. Pour ne pas nous cacher les erreurs de programmation, si elles se produisent.
=======
Still, we should apply `?.` carefully, only where it's acceptable, according to our code logic, that the left part doesn't exist. So that it won't hide programming errors from us, if they occur.
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f
