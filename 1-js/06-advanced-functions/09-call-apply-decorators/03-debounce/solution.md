```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}
<<<<<<< HEAD
```

Un appel à `debounce` renvoie un wrapper. Il peut y avoir deux états:

- `isCooldown = false` -- prêt à exécuter.
- `isCooldown = true` -- en attente du timeout.

Lors du premier appel, `is Cooldown` est fausse. L'appel se poursuit et l'état passe à` true`.

Alors que `isCooldown` est vrai, tous les autres appels sont ignorés.

Ensuite, `setTimeout` le rétablit à `false` après le délai imparti.
=======

```

A call to `debounce` returns a wrapper. When called, it schedules the original function call after given `ms` and cancels the previous such timeout.

>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
