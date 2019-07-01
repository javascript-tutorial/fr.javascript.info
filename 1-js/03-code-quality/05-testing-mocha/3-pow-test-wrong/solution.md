Le test illustre l'une des tentations qu'un développeur rencontre lorsqu'il écrit des tests.

Ce que nous avons ici est en fait 3 tests, mais présentés comme une seule fonction avec 3 affirmations.

Parfois, il est plus facile d’écrire de cette façon, mais si une erreur se produit, ce qui a mal tourné est beaucoup moins évident.

<<<<<<< HEAD
Si une erreur survient dans un flux d’exécution complexe, nous devrons bien comprendre les données à ce stade. Nous devrons en fait *déboguer le test*.
=======
If an error happens in the middle of a complex execution flow, then we'll have to figure out the data at that point. We'll actually have to *debug the test*.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Il serait bien préférable de diviser le test en plusieurs blocs `it` avec des entrées et des sorties clairement écrites.

Comme ceci :
```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

Nous avons remplacé l'`it` unique par un `describe` et un groupe d'`it`. Si quelque chose échouait, nous verrions clairement quelles étaient les données erronées.

Nous pouvons également isoler un seul test et l'exécuter en mode autonome en l'écrivant `it.only` à la place de `it` :


```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

*!*
  // Mocha ne va exécuter que ce code
  it.only("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });
*/!*

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```
