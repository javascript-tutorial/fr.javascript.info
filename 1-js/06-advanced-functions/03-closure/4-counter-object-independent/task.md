importance: 5

---

# Objet compteur

Ici, un objet compteur est créé à l'aide de la fonction constructeur.

Est-ce que cela fonctionnera ? Que va-t-elle afficher ?

```js
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert(counter.up()); // ?
alert(counter.up()); // ?
alert(counter.down()); // ?
```

