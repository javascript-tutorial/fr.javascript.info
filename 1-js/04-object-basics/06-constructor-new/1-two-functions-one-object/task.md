importance: 2

---

# Deux fonctions - un objet

<<<<<<< HEAD
Est-il possible de créer des fonctions `A` et `B` tel que `new A()==new B()` ?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Si c'est le cas, donnez un exemple de leur code.
