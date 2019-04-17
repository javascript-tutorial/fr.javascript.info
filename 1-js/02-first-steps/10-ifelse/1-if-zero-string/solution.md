**Oui, il sera affiché.**

Toute chaîne de caractères à l'exception d'une chaîne vide (et `"0"` n'est pas vide) devient vraie dans le contexte logique.

Nous pouvons exécuter et vérifier:

```js run
if ("0") {
  alert( 'Hello' );
}
```

