importance: 5

---

# Le salaire maximal

Il y a un objet `salaries` :

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
```

Créer la fonction `topSalary(salaries)` qui renvoie le nom de la personne la mieux payée.

- Si `salaries` est vide, devrait retourner `null`.
- S'il y a plusieurs personnes les mieux payées, renvoyez-en une.

P.S.
Utilisez `Object.entries` et la décomposition pour parcourir les paires clé / valeur.
