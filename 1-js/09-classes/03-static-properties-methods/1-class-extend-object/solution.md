Voyons d'abord pourquoi ce dernier code ne fonctionne pas.

La raison devient évidente si nous essayons de l'exécuter.
Un constructeur de classe héritant doit appeler `super()`.
Sinon `"this"` ne sera pas "défini".

Alors, voici la solution:

```js run
class Rabbit extends Object {
  constructor(name) {
*!*
    super(); // besoin d'appeler le constructeur parent lors de l'héritage
*/!*
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert(rabbit.hasOwnProperty('name')); // true
```

Mais ce n'est pas tout.

Même après le correctif, il existe toujours une différence importante entre `"class Rabbit extends Object"` et `class Rabbit`.

Comme on le sait, la syntaxe "extend" configure deux prototypes:

1.
Entre le `"prototype"` des fonctions du constructeur (pour les méthodes).
2.
Entre les fonctions du constructeur elles-mêmes (pour les méthodes statiques).

Dans notre cas, pour `class Rabbit extends Object`, cela signifie:

```js run
class Rabbit extends Object {}

alert(Rabbit.prototype.__proto__ === Object.prototype); // (1) true
alert(Rabbit.__proto__ === Object); // (2) true
```

Donc `Rabbit` donne maintenant accès aux méthodes statiques de `Object` via `Rabbit`, comme ceci:

```js run
class Rabbit extends Object {}

*!*
// normalement nous appelons Object.getOwnPropertyNames
alert (Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
*/!*
```

Mais si nous n’avons pas `extends Object`, alors `Rabbit.__proto__` n'est pas défini sur `Object`.

Voici la démo:

```js run
class Rabbit {}

alert(Rabbit.prototype.__proto__ === Object.prototype); // (1) true
alert(Rabbit.__proto__ === Object); // (2) false (!)
alert(Rabbit.__proto__ === Function.prototype); // comme toute fonction par défaut

*!*
// error, no such function in Rabbit
alert (Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error
*/!*
```

Donc, `Rabbit` ne donne pas accès aux méthodes statiques de `Object` dans ce cas.

En passant, `Function.prototype` a des méthodes de fonction  "génériques", comme `call`, `bind`, etc.
Elles sont finalement disponibles dans les deux cas, car pour le constructeur `Object` intégré, `Object.__proto__ === Function.prototype`.

Voici l'image:

![](rabbit-extends-object.svg)

Donc, pour faire court, il y a deux différences:

| class Rabbit                              | class Rabbit extends Object                 |
| ----------------------------------------- | ------------------------------------------- |
| --                                        | doit appeler `super()` dans le constructeur |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object`               |
