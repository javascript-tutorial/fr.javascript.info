Nous pouvons utiliser cette approche si nous sommes sûrs que la propriété `"constructeur"` a la valeur correcte.

Par exemple, si nous ne touchons pas le `"prototype"` par défaut, alors ce code fonctionne à coup sûr:

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (ça marche!)
```

Cela a fonctionné, car `User.prototype.constructor == User`.

..Mais si quelqu'un, pour ainsi dire, écrase `User.prototype` et oublie de recréer `constructor` pour faire référence à `User`, il échouera.

Par exemple:

```js run
function User(name) {
  this.name = name;
}
*!*
User.prototype = {}; // (*)
*/!*

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // undefined
```

Pourquoi `user2.name` est `undefined`?

Voici comment `new user.constructor('Pete')` fonctionne:

1. Tout d'abord, il cherche `constructor` dans `user`. Rien.
2. Ensuite, il suit la chaîne de prototypes. Le prototype de `user` est `User.prototype`, et il n'a pas non plus de `constructor` (parce que nous avons "oublié" de le régler correctement !).
3. En remontant la chaîne, `User.prototype` est un objet simple, son prototype est le `Object.prototype` intégré.
4. Enfin, pour le `Object.prototype` intégré, il existe un `Object.prototype.constructor == Object` intégré. Il est donc utilisé.

En fin de compte, nous avons `let user2 = new Object('Pete')`.

Ce n'est probablement pas ce que nous voulons. Nous aimerions créer un `new user`, pas un `new Object`. C'est le résultat du `constructor` manquant.

(Juste au cas où vous seriez curieux, l'appel `new Object(...)` convertit son argument en un objet. C'est une chose théorique, en pratique personne n'appelle `new Object` avec une valeur, et généralement nous n’utilisons pas `new Object` pour créer des objets).
