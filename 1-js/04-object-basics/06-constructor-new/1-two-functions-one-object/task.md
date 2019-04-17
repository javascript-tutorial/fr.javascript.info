importance: 2

---

# Deux fonctions - un objet

Est-il possible de créer des fonctions `A` et `B` tel que `new A()==new B()` ?

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Si c'est le cas, donnez un exemple de leur code.
