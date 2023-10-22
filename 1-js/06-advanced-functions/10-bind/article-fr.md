libs:
  - lodash

---

# Le "bind" de fonction

Lorsque l'on passe des méthodes objets en tant que callback, par exemple à `setTimeout`, il y un problème connu: "la perte du `this`".

Dans ce chapitre nous verrons les façons de régler ça.