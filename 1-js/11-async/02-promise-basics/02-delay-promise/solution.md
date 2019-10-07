```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('runs after 3 seconds'));
```

Veuillez noter que dans cette tâche, `resolve` est appelé sans arguments. Nous ne renvoyons aucune valeur a partir de `delay`, nous assurons simplement le délai.