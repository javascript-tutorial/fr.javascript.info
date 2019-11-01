importance: 5

---

<<<<<<< HEAD
# Pourquoi deux hamsters sont pleins?
=======
# Why are both hamsters full?
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

Nous avons deux hamsters: `speedy` et `lazy` héritant de l'objet général `hamster`.

<<<<<<< HEAD
Lorsque nous nourrissons l'un d'eux, l'autre est également plein. Pourquoi? Comment y remédier?
=======
When we feed one of them, the other one is also full. Why? How can we fix it?
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Celui-ci a trouvé la nourriture
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Celui-ci l'a aussi, pourquoi? réparer s'il vous plaît.
alert( lazy.stomach ); // apple
```

