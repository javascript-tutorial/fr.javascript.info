importance: 5

---

# Quel est le problème dans le test ?

Qu'est-ce qui ne va pas dans le test de `pow` ci-dessous ?

```js
it("Raises x to the power n", function() {
  let x = 5;

  let result = x;
  assert.equal(pow(x, 1), result);

  result *= x;
  assert.equal(pow(x, 2), result);

  result *= x;
  assert.equal(pow(x, 3), result);
});
```

P.S.
Syntaxiquement, le test est correct et réussi.