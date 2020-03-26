```js demo
function debounce(f, ms) {

  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };

}
```

Un appel à `debounce` renvoie un wrapper. Il peut y avoir deux états:

- `isCooldown = false` -- prêt à exécuter.
- `isCooldown = true` -- en attente du timeout.

Lors du premier appel, `is Cooldown` est fausse. L'appel se poursuit et l'état passe à` true`.

Alors que `isCooldown` est vrai, tous les autres appels sont ignorés.

Ensuite, `setTimeout` le rétablit à `false` après le délai imparti.
