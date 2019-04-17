importance: 5

---

# Créer un nouvel accumulateur

Créer une fonction constructeur `Accumulator(startingValue)`.

L'objet qu'il crée devrait :

- Stocker la "valeur actuelle" dans la propriété `value`. La valeur de départ est définie sur l'argument du constructeur `startingValue`.
- La méthode `read()` devrait utiliser `prompt` pour lire un nouveau numéro et l'ajouter à `value`.

En d'autres termes, la propriété `value` est la somme de toutes les valeurs entrées par l'utilisateur avec la valeur initiale `startingValue`.

Voici la démo du code :

```js
let accumulator = new Accumulator(1); // valeur initiale 1
accumulator.read(); // ajoute la valeur entrée par l'utilisateur
accumulator.read(); // ajoute la valeur entrée par l'utilisateur
alert(accumulator.value); // montre la somme de ces valeurs
```

[demo]
