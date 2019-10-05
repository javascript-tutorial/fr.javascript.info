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

<<<<<<< HEAD
..Mais si quelqu'un, pour ainsi dire, écrase `User.prototype` et oublie de recréer `"constructor"`, alors cela échouera.
=======
..But if someone, so to speak, overwrites `User.prototype` and forgets to recreate `"constructor"`, then it would fail.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

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
2. Ensuite, il suit la chaîne de prototype. Le prototype de `user` est `User.prototype` et il n'a également rien.
3. La valeur de `User.prototype` est un objet simple `{}`, son prototype est `Object.prototype`. Et il y a `Object.prototype.constructor == Object`. Alors c'est utilisé.

À la fin, nous avons `let user2 = new Object('Pete')`. Le constructeur `Object` intégré ignore les arguments, il crée toujours un objet vide - c'est ce que nous avons dans `user2` après tout.
