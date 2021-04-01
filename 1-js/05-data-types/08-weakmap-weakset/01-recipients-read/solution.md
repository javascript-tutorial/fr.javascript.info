Stockons les messages lus dans `WeakSet`:

```js run
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

Le `WeakSet` permet de stocker un ensemble de messages et de vérifier facilement l’existence d’un message dedans.

Il se nettoie automatiquement. Le compromis est que nous ne pouvons pas le parcourir, nous ne pouvons pas obtenir "tous les messages lus" directement. Mais nous pouvons le faire en parcourant tous les messages et en filtrant ceux qui sont dans le set.

Une autre solution pourrait consister à ajouter une propriété telle que `message.isRead = true` à un message après sa lecture. Comme les objets de messages sont gérés par un autre code, cela est généralement déconseillé, mais nous pouvons utiliser une propriété symbolique pour éviter les conflits.

Comme ceci :
```js
// la propriété symbolique n'est connue que de notre code
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Maintenant, le code tiers ne verra probablement pas notre propriété supplémentaire.

Bien que les symboles permettent de réduire la probabilité de problèmes, l’utilisation de `WeakSet` est préférable du point de vue de l’architecture.
