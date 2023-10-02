importance: 4

---

# La variable est-elle visible ?

Quel sera le résultat de ce code ?

```js
let x = 1;

function func() {
  console.log(x); // ?

  let x = 2;
}

func();
```

P.S.
Il y a un piège dans cette tâche.
La solution n'est pas évidente.
