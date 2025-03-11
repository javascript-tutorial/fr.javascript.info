importance: 2

---

# Chaining

<<<<<<< HEAD
Il y a un objet `ladder` qui permet de monter et descendre :
=======
There's a `ladder` object that allows you to go up and down:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
let ladder = {
  step: 0,
  up() { 
    this.step++;
  },
  down() { 
    this.step--;
  },
  showStep: function() { // affiche l'étape en cours
    alert( this.step );
  }
};
```

<<<<<<< HEAD
Maintenant, si nous devons faire plusieurs appels en séquence, nous pouvons le faire comme ceci :
=======
Now, if we need to make several calls in sequence, we can do it like this:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

<<<<<<< HEAD
Modifiez le code de `up` et `down` pour rendre les appels chaînables, comme ceci :
=======
Modify the code of `up`, `down`, and `showStep` to make the calls chainable, like this:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

<<<<<<< HEAD
Cette approche est largement utilisée dans les bibliothèques JavaScript.
=======
Such an approach is widely used across JavaScript libraries.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
