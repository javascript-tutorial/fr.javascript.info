importance: 2

---

# Deux fonctions - un objet

<<<<<<< HEAD
Est-il possible de créer des fonctions `A` et `B` tel que `new A()==new B()` ?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Si c'est le cas, donnez un exemple de leur code.
