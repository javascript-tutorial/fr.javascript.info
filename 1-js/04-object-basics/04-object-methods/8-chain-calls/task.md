importance: 2

---

# Chaining

Il y a un objet `ladder` qui permet de monter et descendre :

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

Maintenant, si nous devons faire plusieurs appels en séquence, nous pouvons le faire comme ceci :

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
```

Modifiez le code de `up` et `down` pour rendre les appels chaînables, comme ceci :

```js
ladder.up().up().down().showStep(); // 1
```

Cette approche est largement utilisée dans les bibliothèques JavaScript.
