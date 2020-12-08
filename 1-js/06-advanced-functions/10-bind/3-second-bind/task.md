importance: 5

---

# Seconde contrainte (bind)

Peut-on changer `this` en ajoutant une contrainte ?

Quelle sera la sortie ?

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
```

