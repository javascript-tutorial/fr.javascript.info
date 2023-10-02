importance: 5

---

# Créer une nouvelle calculatrice

Créez une fonction constructeur `Calculator` qui crée des objets avec 3 méthodes :

- `read()` demande deux valeurs et les enregistre en tant que propriétés d'objet avec les noms `a` et `b` respectivement.
- `sum()` retourne la somme de ces propriétés.
- `mul()` retourne le produit de la multiplication de ces propriétés.

Par exemple :

```js
let calculator = new Calculator();
calculator.read();

alert("Sum=" + calculator.sum());
alert("Mul=" + calculator.mul());
```

[demo]