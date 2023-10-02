importance: 5

---

# Appel dans un contexte de tableau

Quel est le résultat ? Et pourquoi ?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert(this);
});

arr[2](); // ?
```
