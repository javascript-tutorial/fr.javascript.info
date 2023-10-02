
Le premier appel a `this==rabbit`, les autres ont `this` égal à `Rabbit.prototype`, car il s'agit en fait de l'objet avant le point.

Ainsi, seul le premier appel indique `Rabbit`, les autres affichent `undefined` :

```js run
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert(this.name);
}

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();                        // Rabbit
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined
```
