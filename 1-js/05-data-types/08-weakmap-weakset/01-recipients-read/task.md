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

<<<<<<< HEAD
Maintenant, quelle structure de données pouvez-vous utiliser pour stocker des informations si le message "a été lu"? La structure doit être bien adaptée pour donner la réponse "a-t-il été lu ?" Pour l'objet de message donné.
=======
Now, which data structure could you use to store information about whether the message "has been read"? The structure must be well-suited to give the answer "was it read?" for the given message object.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

P.S. Lorsqu'un message est supprimé des `messages`, il doit également disparaître de votre structure.

P.P.S. Nous ne devrions pas modifier les objets de message, leur ajouter nos propriétés. Comme ils sont gérés par le code de quelqu'un d'autre, cela peut avoir de mauvaises conséquences.
