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
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

Par exemple :

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
