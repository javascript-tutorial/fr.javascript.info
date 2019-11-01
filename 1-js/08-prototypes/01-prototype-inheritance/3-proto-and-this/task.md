importance: 5

---

<<<<<<< HEAD
# Où est-ce écrit?
=======
# Where does it write?
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

Nous avons `rabbit` héritant de `animal`.

Si nous appelons `rabbit.eat()`, quel objet reçoit la propriété `full`: `animal` ou `rabbit`?

```js
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
```
