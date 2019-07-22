importance: 5

---

# Stocker les messages non-lus

Il y a un tableau de messages :

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

Votre code peut y accéder, mais les messages sont gérés par le code d’une autre personne. De nouveaux messages sont ajoutés, les anciens sont régulièrement supprimés par ce code et vous ne connaissez pas le moment exact où cela se produit.

Maintenant, quelle structure de données pouvez-vous utiliser pour stocker des informations si le message "a été lu"? La structure doit être bien adaptée pour donner la réponse "a-t-il été lu ?" Pour l'objet de message donné.

P.S. Lorsqu'un message est supprimé des `messages`, il doit également disparaître de votre structure.

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/task.md
P.P.S. Nous ne devrions pas modifier les objets de message directement. Si elles sont gérées par le code d’une autre personne, l’ajout de propriétés supplémentaires peut avoir de graves conséquences.
=======
P.P.S. We shouldn't modify message objects, add our properties to them. As they are managed by someone else's code, that may lead to bad consequences.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/task.md
