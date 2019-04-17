La solution consiste à renvoyer l'objet lui-même à partir de chaque appel.

```js run
let ladder = {
  step: 0,
  up() {
    this.step++;
*!*
    return this;
*/!*
  },
  down() {
    this.step--;
*!*
    return this;
*/!*
  },
  showStep() {
    alert( this.step );
*!*
    return this;
*/!*
  }
}

ladder.up().up().down().up().down().showStep(); // 1
```

Nous pouvons également écrire un seul appel par ligne. Pour les longues chaînes, c'est plus lisible :

```js 
ladder
  .up()
  .up()
  .down()
  .up()
  .down()
  .showStep(); // 1
```

