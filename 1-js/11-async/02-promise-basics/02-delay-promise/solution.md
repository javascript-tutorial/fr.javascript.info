```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('runs after 3 seconds'));
```

Notez bien que dans cette tâche, `resolve` est appelée sans arguments. Nous ne retournons aucune valeur de `delay`, nous nous assurons seulement du délai.