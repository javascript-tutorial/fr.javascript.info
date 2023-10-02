importance: 2

---

# Chaînage

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
  showStep: function() { // Affiche l'étape en cours
    alert(this.step);
  }
};
```

Maintenant, si nous devons faire plusieurs appels en séquence, nous pouvons le faire comme ceci :

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

Modifiez le code de `up` et `down` pour rendre les appels chaînables, comme ceci :

```js
ladder.up().up().down().showStep().down().showStep(); // Afficher 1 puis 0
```

Cette approche est largement utilisée dans les bibliothèques JavaScript.