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

<<<<<<< HEAD
1. Tout d'abord, il cherche `constructor` dans `user`. Rien.
2. Ensuite, il suit la chaîne de prototype. Le prototype de `user` est `User.prototype` et il n'a également rien.
3. La valeur de `User.prototype` est un objet simple `{}`, son prototype est `Object.prototype`. Et il y a `Object.prototype.constructor == Object`. Alors c'est utilisé.

À la fin, nous avons `let user2 = new Object ('Pete')`. Le constructeur `Object` intégré ignore les arguments, il crée toujours un objet vide, similaire à `let user2 = {}`, c'est ce que nous avons dans `user2` après tout.
=======
1. First, it looks for `constructor` in `user`. Nothing.
2. Then it follows the prototype chain. The prototype of `user` is `User.prototype`, and it also has no `constructor` (because we "forgot" to set it right!).
3. Going further up the chain, `User.prototype` is a plain object, its prototype is the built-in `Object.prototype`. 
4. Finally, for the built-in `Object.prototype`, there's a built-in `Object.prototype.constructor == Object`. So it is used.

Finally, at the end, we have `let user2 = new Object('Pete')`. 

Probably, that's not what we want. We'd like to create `new User`, not `new Object`. That's the outcome of the missing `constructor`.

(Just in case you're curious, the `new Object(...)` call converts its argument to an object. That's a theoretical thing, in practice no one calls `new Object` with a value, and generally we don't use `new Object` to make objects at all).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
