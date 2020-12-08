importance: 5

---

# Fonction contrainte comme méthode

Qu'arrivera-t-il en sortie ?

```js
function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
```

