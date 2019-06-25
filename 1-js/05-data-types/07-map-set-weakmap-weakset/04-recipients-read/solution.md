Le bon choix ici est un `WeakSet`:

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

Il se nettoie automatiquement. Le compromis est que nous ne pouvons pas le parcourir. Nous ne pouvons pas obtenir "tous les messages lus" directement. Mais nous pouvons le faire en parcourant tous les messages et en filtrant ceux qui sont dans le set.

P.S. Ajouter une propriété propre à chaque message peut être dangereux si les messages sont gérés par le code d’une autre personne, mais nous pouvons en faire un symbole pour éviter les conflits.

Comme ceci :
```js
// la propriété symbolique n'est connue que de notre code
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Maintenant, même si le code de quelqu'un d'autre utilise `for..in` pour les propriétés du message, notre indicateur secret n'apparaîtra pas.
