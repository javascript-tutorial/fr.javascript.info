importance: 4

---

# Réécrire setTimeout avec setInterval

Voici une fonction qui utilise un `setTimeout` imbriqué pour découper une tâche en petit bouts.

Réécrire le bloc suivant en utilisant `setInterval`:

```js run
let i = 0;

let start = Date.now();

function count() {

  if (i == 1000000000) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count);
  }

  // un morceau d'une très grosse tâche
  for(let j = 0; j < 1000000; j++) {
    i++;
  }

}

count();
```
