importance: 5

---

# Travailler avec prototype

Voici le code qui crée une paire d'objets, puis les modifie.

Quelles sont les valeurs affichées dans le processus ?

```js
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // ? (2)

delete animal.jumps;

alert( rabbit.jumps ); // ? (3)
```

Il devrait y avoir 3 réponses.
