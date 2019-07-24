<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/solution.md
Le bon choix ici est un `WeakSet`:
=======
Let's store read messages in `WeakSet`:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/solution.md

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// deux messages ont été lus
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages a 2 éléments

// ...Relisons le premier message !
readMessages.add(messages[0]);
// readMessages a encore 2 éléments uniques

// réponse : le message[0] a-t-il été lu ?
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// maintenant readMessages a 1 élément (techniquement, la mémoire peut être nettoyée plus tard)
```

Le `WeakSet` permet de stocker un ensemble de messages et de vérifier facilement l’existence d’un message.

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/solution.md
Il se nettoie automatiquement. Le compromis est que nous ne pouvons pas le parcourir. Nous ne pouvons pas obtenir "tous les messages lus" directement. Mais nous pouvons le faire en parcourant tous les messages et en filtrant ceux qui sont dans le set.

P.S. Ajouter une propriété propre à chaque message peut être dangereux si les messages sont gérés par le code d’une autre personne, mais nous pouvons en faire un symbole pour éviter les conflits.
=======
It cleans up itself automatically. The tradeoff is that we can't iterate over it,  can't get "all read messages" from it directly. But we can do it by iterating over all messages and filtering those that are in the set.

Another, different solution could be to add a property like `message.isRead=true` to a message after it's read. As messages objects are managed by another code, that's generally discouraged, but we can use a symbolic property to avoid conflicts.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/solution.md

Comme ceci :
```js
// la propriété symbolique n'est connue que de notre code
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/solution.md
Maintenant, même si le code de quelqu'un d'autre utilise `for..in` pour les propriétés du message, notre indicateur secret n'apparaîtra pas.
=======
Now third-party code probably won't see our extra property.

Although symbols allow to lower the probability of problems, using `WeakSet` is better from the architectural point of view.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/solution.md
