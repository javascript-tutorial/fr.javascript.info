importance: 5

---

# Où est-ce écrit ?

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
