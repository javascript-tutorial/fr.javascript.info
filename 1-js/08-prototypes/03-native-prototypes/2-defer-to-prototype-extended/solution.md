```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

// vérification
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // montre 3 après 1 seconde
```

Notez que nous utilisons `this` dans `f.apply` pour que notre décoration fonctionne pour les méthodes d'objets.

Ainsi, si la fonction wrapper est appelée en tant que méthode d'objet, alors `this` est passé à la méthode originale `f`.

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

let user = {
  name: "John",
  sayHi() {
    alert(this.name);
  }
}

user.sayHi = user.sayHi.defer(1000);

user.sayHi();
```
