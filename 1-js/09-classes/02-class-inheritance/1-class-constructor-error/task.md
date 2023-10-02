importance: 5

---

# Erreur lors de la création d'une instance

Voici le code avec `Rabbit` étendant` Animal`.

Malheureusement, des objets `Rabbit` ne peuvent pas être créés.
Qu'est-ce qui ne va pas? Répare le.
```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) { 
    this.name = name;
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
*/!*
alert(rabbit.name);
```
