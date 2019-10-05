importance: 5

---

# Classe étend l'objet?

Comme nous le savons, tous les objets héritent normalement de `Object.prototype` et ont accès à des méthodes d'objet "génériques" comme `hasOwnProperty` etc.

Par exemple:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// la méthode hasOwnProperty provient de Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```

Mais si nous l’épelons explicitement comme suit: `"class Rabbit extends Object"`, le résultat serait alors différent d´un simple `"class Rabbit"`?

Quelle est la différence?

Voici un exemple d'un tel code (cela ne fonctionne pas - pourquoi? Réparez le?):

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // true
```
