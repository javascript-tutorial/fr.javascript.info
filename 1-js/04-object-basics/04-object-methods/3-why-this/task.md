importance: 3

---

# Expliquez la valeur de "this"

Dans le code ci-dessous, nous avons l'intention d'appeler la méthode `user.go()` 4 fois de suite.

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

