importance: 5

---

# Stocker les dates de lectures

Il existe un tableau de messages comme dans la [previous task](info:task/recipients-read). La situation est similaire.

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

La question qui se pose maintenant est la suivante : quelle structure de données suggérez-vous pour stocker les informations : "quand le message a-t-il été lu ?".

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/05-recipients-when-read/task.md
Dans la tâche précédente, nous n'avions besoin que de stocker le fait "oui/non". Nous devons maintenant stocker la date et cette fois encore, elle devrait disparaître si le message a disparu.
=======
In the previous task we only needed to store the "yes/no" fact. Now we need to store the date, and it should only remain in memory until the message is garbage collected.

P.S. Dates can be stored as objects of built-in `Date` class, that we'll cover later.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3:1-js/05-data-types/08-weakmap-weakset/02-recipients-when-read/task.md
