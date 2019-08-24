

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

// vérifier
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // montre 3 après 1 seconde
```
