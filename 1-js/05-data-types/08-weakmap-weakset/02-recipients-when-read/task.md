importance: 5

---

# Stocker les dates de lectures

Il existe un tableau de messages comme dans la [previous task](info:task/recipients-read).
La situation est similaire.

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

La question qui se pose maintenant est la suivante : quelle structure de données suggérez-vous pour stocker les informations : "quand le message a-t-il été lu ?".

Dans la tâche précédente, nous n'avions besoin que de stocker le fait "oui/non".
Nous devons maintenant stocker la date et elle ne doit rester en mémoire que tant que le message n’a pas été nettoyé.

P.S.
Les dates peuvent être stockées en tant qu'objets de la classe intégrée `Date`, que nous couvrirons plus tard.
