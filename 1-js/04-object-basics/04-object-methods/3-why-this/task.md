importance: 3

---

# Expliquez la valeur de "this"

<<<<<<< HEAD
Dans le code ci-dessous, nous avons l'intention d'appeler la méthode `user.go()` 4 fois de suite.
=======
In the code below we intend to call `obj.go()` method 4 times in a row.
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

Mais les appels `(1)` et `(2)` fonctionnent différemment de `(3)` et `(4)`. Pourquoi ?

```js run no-beautify
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```

