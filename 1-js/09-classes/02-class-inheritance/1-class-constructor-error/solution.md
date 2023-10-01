C'est parce que le constructeur de l'enfant doit appeler `super()`.

Voici le code corrigé:

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) { 
    *!*
    super(name);
    */!*
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // OK maintenant
*/!*
alert(rabbit.name); // White Rabbit
```
