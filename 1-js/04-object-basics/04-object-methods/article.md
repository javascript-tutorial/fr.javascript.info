# Méthodes d'objet, "this"

Les objets sont généralement créés pour représenter des entités du monde réel, comme des utilisateurs, des commandes, etc. :

```js
let user = {
  name: "John",
  age: 30
};
```

Et, dans le monde réel, un utilisateur peut agir : sélectionner un élément du panier, se connecter, se déconnecter, etc.

Les actions sont représentées en JavaScript par des fonctions dans les propriétés.

## Exemples de méthodes

Pour commencer, apprenons à `user` à dire bonjour :

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
  alert("Hello!");
};
*/!*

user.sayHi(); // Hello!
```

Ici, nous venons d'utiliser une fonction expression pour créer la fonction et l'affecter à la propriété `user.sayHi` de l'objet.

Ensuite, nous pouvons l'appeler comme `user.sayHi()`. L'utilisateur peut maintenant parler!

Une fonction qui est la propriété d'un objet s'appelle sa *méthode*.

Nous avons donc ici une méthode `sayHi` de l’objet `user`.

Bien sûr, nous pourrions utiliser une fonction pré-déclarée comme méthode, comme ceci :

```js run
let user = {
  // ...
};

*!*
// d'abord, déclarer
function sayHi() {
  alert("Hello!");
}

// puis ajouter comme une méthode
user.sayHi = sayHi;
*/!*

user.sayHi(); // Hello!
```

```smart header="Programmation orientée objet"
Lorsque nous écrivons notre code en utilisant des objets pour représenter des entités, cela s'appelle une [programmation orientée objet](https://fr.wikipedia.org/wiki/Programmation_orient%C3%A9e_objet), en bref : "POO".

La programmation orientée objet est un élément important, une science intéressante en soi. Comment choisir les bonnes entités ? Comment organiser l'interaction entre elles ? C’est une architecture, et il existe d’excellents livres sur ce sujet, tels que "Design Patterns: Elements of Reusable Object-Oriented Software" de E. Gamma, R. Helm, R. Johnson, J. Vissides ou "Object-Oriented Analysis and Design with Applications" de G. Booch, et plus.
```
### Méthode abrégée

Il existe une syntaxe plus courte pour les méthodes dans un littéral d'objet :

```js
// ces objets font la même chose

user = {
  sayHi: function() {
    alert("Hello");
  }
};

// la méthode abrégée semble mieux, non ?
user = {
*!*
  sayHi() { // identique à "sayHi: function(){...}"
*/!*
    alert("Hello");
  }
};
```

Comme démontré, nous pouvons omettre `"function"` et simplement écrire `sayHi()`.

<<<<<<< HEAD
A vrai dire, les notations ne sont pas totalement identiques. Il existe des différences subtiles liées à l'héritage d'objet (à couvrir plus tard), mais pour le moment, elles importent peu. Dans presque tous les cas, la syntaxe la plus courte est préférable.
=======
To tell the truth, the notations are not fully identical. There are subtle differences related to object inheritance (to be covered later), but for now they do not matter. In almost all cases, the shorter syntax is preferred.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

## "this" dans les méthodes

Il est courant qu'une méthode d'objet ait besoin d'accéder aux informations stockées dans l'objet pour effectuer son travail.

Par exemple, le code à l'intérieur de `user.sayHi()` peut nécessiter le nom de `user`.

**Pour accéder à l'objet, une méthode peut utiliser le mot-clé `this`.**

La valeur de `this` est l'objet "avant le point", celui utilisé pour appeler la méthode.

Par exemple :

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    // "this" is the "current object"
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

Ici, lors de l'exécution de `user.sayHi()`, la valeur de `this` sera `user`.

Techniquement, il est également possible d’accéder à l’objet sans `this`, en le référençant via la variable externe :

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // "user" au lieu de "this"
*/!*
  }

};
```

… Mais un tel code n'est pas fiable. Si nous décidons de copier `user` dans une autre variable, par exemple `admin = user` et écraser `user` avec quelque chose d'autre, il accédera au mauvais objet.

Cela est démontré ci-dessous :

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // conduit à une erreur
*/!*
  }

};


let admin = user;
user = null; // écraser pour rendre les choses évidentes

*!*
admin.sayHi(); // TypeError: Cannot read property 'name' of null
*/!*
```

Si nous utilisions `this.name` au lieu de `user.name` dans l'`alert`, le code fonctionnerait.

## "this" n'est pas lié

En JavaScript, le mot clé `this` se comporte différemment de la plupart des autres langages de programmation. Il peut être utilisé dans n'importe quelle fonction, même si ce n'est pas une méthode d'un objet.

Il n’y a pas d’erreur de syntaxe dans le code suivant :

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

La valeur de `this` est évaluée pendant l'exécution, en fonction du contexte.

Par exemple, ici la même fonction est assignée à deux objets différents et a un "this" différent dans les appels :

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// utiliser la même fonction dans deux objets
user.f = sayHi;
admin.f = sayHi;
*/!*

// ces appels ont un this différent
// "this" à l'intérieur de la fonction se trouve l'objet "avant le point"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (le point ou les crochets accèdent à la méthode - peu importe)
```

La règle est simple: si `obj.f()` est appelé, alors `this` est `obj` pendant l'appel de `f`. C'est donc l'`user` ou l'`admin` dans l'exemple ci-dessus.

````smart header="Appel sans objet : `this` == undefined"
Nous pouvons même appeler la fonction sans objet du tout :

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

Dans ce cas, `this` est `undefined` en mode strict. Si nous essayons d'accéder à `this.name`, il y aura une erreur.

En mode non strict (si on oublie `use strict`), la valeur de `this` dans ce cas sera l’*objet global* (la fenêtre d’un navigateur, nous y reviendrons plus tard). Ceci est un comportement historique qui corrige `"use strict"`.

Cen genre d'appel est généralement une erreur de programmation. Si il y a un `this` dans une fonction, il s'attend à être appelée dans un contexte d'objet.
````

```smart header="Les conséquences d'un `this` non lié"
Si vous venez d'un autre langage de programmation, vous êtes probablement habitué à l'idée d'un "`this` lié", où les méthodes définies dans un objet ont toujours `this` en référence à cet objet.

En JavaScript, `this` est "libre", sa valeur est évaluée au moment de l'appel et ne dépend pas de l'endroit où la méthode a été déclarée, mais plutôt de l'objet "avant le point".

Le concept de temps d'exécution évalué de `this` présente à la fois des avantages et des inconvénients. D'une part, une fonction peut être réutilisée pour différents objets. D'autre part, une plus grande flexibilité ouvre la place à des erreurs.

Ici, notre position n'est pas de juger si cette décision de conception linguistique est bonne ou mauvaise. Nous comprendrons comment travailler avec elle, comment obtenir des avantages et éviter les problèmes.
```

## Les fonctions fléchées n'ont pas de "this"

Les fonctions fléchées sont spéciales : elles n’ont pas leur "propre" `this`. Si nous faisons référence à `this` à partir d’une telle fonction, cela provient de la fonction externe "normale".

Par exemple, ici `arrow()` utilise `this` depuis la méthode externe `user.sayHi()` :

```js run
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

C’est une particularité des fonctions fléchées. C’est utile lorsque nous ne voulons pas réellement avoir un this distinct, mais plutôt le prendre à partir du contexte extérieur. Plus tard dans le chapitre <info:arrow-functions> nous allons approfondir les fonctions fléchées.


## Résumé

- Les fonctions stockées dans les propriétés de l'objet s'appellent des "méthodes".
- Les méthodes permettent aux objets d’agir comme `object.doSomething()`.
- Les méthodes peuvent référencer l'objet comme `this`.

La valeur de `this` est définie au moment de l'exécution.
- Lorsqu'une fonction est déclarée, elle peut utiliser `this`, mais ce `this` n'a aucune valeur jusqu'à ce que la fonction soit appelée.
- Une fonction peut être copiée entre des objets.
- Lorsqu'une fonction est appelée dans la syntaxe "méthode" : `object.method()`, la valeur de `this` lors de l'appel est `objet`.

Veuillez noter que les fonctions fléchées sont spéciales : elles n'ont pas `this`. Lorsque `this` est accédé dans une fonction fléchée, il est pris de l'extérieur.
