importance: 5

---

# Créer une nouvelle calculatrice

Créer une fonction constructeur `Calculator` qui crée des objets avec 3 méthodes :

<<<<<<< HEAD
- `read()` demande deux valeurs en utilisant `prompt` et les écrits dans les propriétés de l'objet.
- `sum()` renvoie la somme de ces propriétés.
- `mul()` renvoie le produit de la multiplication de ces propriétés.
=======
- `read()` prompts for two values and saves them as object properties with names `a` and `b` respectively.
- `sum()` returns the sum of these properties.
- `mul()` returns the multiplication product of these properties.
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c

Par exemple :

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
