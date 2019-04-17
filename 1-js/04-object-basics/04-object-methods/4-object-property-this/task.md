importance: 5

---

# Utilisation de "this" dans le littéral d'objet

Ici, la fonction `makeUser` renvoie un objet.

Quel est le résultat de l'accès à sa `ref` ? Pourquoi ?

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // Quel est le résultat ?
```

