# Server Sent Events

La spécification [Server-Sent Events](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) décrit une classe intégrée `EventSource`, qui maintient la connexion avec le serveur et permet de recevoir des événements de celui-ci.

Similaire à `WebSocket`, la connexion est persistante.

Mais il existe plusieurs différences importantes :

| `WebSocket`                                                             | `EventSource`                                       |
| ----------------------------------------------------------------------- | --------------------------------------------------- |
| Bi-directionnel : le client et le serveur peuvent échanger des messages | Unidirectionnel: seul le serveur envoie des données |
| Données binaires et texte                                               | Texte uniquement                                    |
| Protocol WebSocket                                                      | HTTP régulier                                       |

`EventSource` est un moyen de communication avec le serveur moins puissant que `WebSocket`.

Dans ce cas pourquoi devrait-on l'utiliser ?

La raison principale : c'est plus simple. Dans de nombreuses applications, la puissance de `WebSocket` est un peu trop importante.

Nous devons recevoir un flux de données du serveur: peut-être des messages de chat ou des prix du marché, ou autre chose. C'est à cela qu'`EventSource` est bon. Il prend également en charge la reconnexion automatique, quelque chose que nous devons implémenter manuellement avec `WebSocket`. De plus, c'est un vieux HTTP simple, pas un nouveau protocole.

## Recevoir des messages

Pour commencer à recevoir des messages, il suffit de créer `new EventSource(url)`.

Le navigateur se connectera à `url` et gardera la connexion ouverte, en attendant les événements.

Le serveur doit répondre avec le statut 200 et l'en-tête `Content-Type: text/event-stream`, puis conserver la connexion et y écrire des messages au format spécial, comme ceci :

```
data: Message 1

data: Message 2

data: Message 3
data: of two lines
```

- Un texte de message va après `data:`, l'espace après les deux points est facultatif.
- Les messages sont délimités par des doubles sauts de ligne `\n\n`.
- Pour envoyer un saut de ligne `\n`, nous pouvons immédiatement envoyer une autre `data:` (3e message ci-dessus).

En pratique, les messages complexes sont généralement envoyés au format JSON. Les sauts de ligne sont codés en tant que `\n`, donc les messages multilignes de `data:` ne sont pas nécessaires.

Par exemple :

```js
data: {"user":"John","message":"First line*!*\n*/!* Second line"}
```

… On peut donc supposer qu'une `data:` contient exactement un message.

Pour chacun de ces messages, l'événement `message` est généré :

```js
let eventSource = new EventSource("/events/subscribe");

eventSource.onmessage = function(event) {
  console.log("New message", event.data);
  // se connectera 3 fois pour le flux de données ci-dessus
};

// or eventSource.addEventListener('message', ...)
```

### Requêtes Cross-origin

`EventSource` prend en charge les requêtes cross-origin, comme `fetch` toute autre méthode de mise en réseau. Nous pouvons utiliser n'importe quelle URL :

```js
let source = new EventSource("https://another-site.com/events");
```

Le serveur distant obtiendra l'en-tête `Origin` et doit répondre avec `Access-Control-Allow-Origin` pour continuer.

Pour transmettre les informations d'identification, nous devons définir l'option supplémentaire `withCredentials`, comme ceci :

```js
let source = new EventSource("https://another-site.com/events", {
  withCredentials: true
});
```

Veuillez consulter le chapitre <info:fetch-crossorigin> pour plus de détails sur les en-têtes cross-origin.

## Reconnexion

Lors de la création, `new EventSource` se connecte au serveur, et si la connexion est rompue -- se reconnecte.

C'est très pratique, car nous n'avons pas à nous en soucier.

Il y a un petit délai entre les reconnexions, quelques secondes par défaut.

Le serveur peut définir le délai recommandé en utilisant `retry:` en réponse (en millisecondes) :

```js
retry: 15000
data: Hello, I set the reconnection delay to 15 seconds
```

Le `retry:` peut venir à la fois avec certaines données, ou en tant que message autonome.

Le navigateur doit attendre autant de millisecondes avant de se reconnecter. Ou plus, par exemple si le navigateur sait (depuis le système d'exploitation) qu'il n'y a pas de connexion réseau pour le moment, il peut attendre que la connexion apparaisse, puis réessayer.

- Si le serveur souhaite que le navigateur cesse de se reconnecter, il doit répondre avec l'état HTTP 204.
- Si le navigateur souhaite fermer la connexion, il doit appeler `eventSource.close()`:

```js
let eventSource = new EventSource(...);

eventSource.close();
```

De plus, il n'y aura pas de reconnexion si la réponse a un `Content-Type` incorrect ou si son état HTTP diffère de 301, 307, 200 et 204. Dans de tels cas, l'événement `"error"` sera émis et le navigateur ne se reconnecte pas.

```smart
Lorsqu'une connexion est finalement fermée, il n'y a aucun moyen de la "rouvrir". Si nous souhaitons nous reconnecter, créez simplement un nouveau `EventSource`.
```

## ID du message

Lorsqu'une connexion est interrompue en raison de problèmes de réseau, les deux parties ne peuvent pas savoir quels messages ont été reçus et lesquels ne l'ont pas été.

Pour reprendre correctement la connexion, chaque message doit avoir un champ `id`, comme ceci :

```
data: Message 1
id: 1

data: Message 2
id: 2

data: Message 3
data: of two lines
id: 3
```

Lorsqu'un message avec `id:` est reçu, le navigateur :

- Définit la propriété `eventSource.lastEventId` sur sa valeur.
- Lors de la reconnexion, l'en-tête `Last-Event-ID` est envoyé avec cet `id`, afin que le serveur puisse renvoyer les messages suivants.

```smart header="Mettre `id:` après `data:`"
Veuillez noter : l'`id` est ajouté sous le message `data` par le serveur, pour s'assurer que `lastEventId` est mis à jour après la réception du message.
```

## État de connexion : readyState

L'objet `EventSource` a la propriété `readyState`, qui a l'une des trois valeurs :

```js no-beautify
EventSource.CONNECTING = 0; // connexion ou reconnexion
EventSource.OPEN = 1;       // connecté
EventSource.CLOSED = 2;     // connexion fermée
```

Lorsqu'un objet est créé ou que la connexion est interrompue, il s'agit toujours de `EventSource.CONNECTING` (égal à `0`).

Nous pouvons interroger cette propriété pour connaître l'état de `EventSource`.

## Types d'événements

Par défaut, l'objet `EventSource` génère trois événements :

- `message` -- un message reçu, disponible en tant que `event.data`.
- `open` -- la connexion est ouverte.
- `error` -- la connexion n'a pas pu être établie, par exemple le serveur a renvoyé le statut HTTP 500.

Le serveur peut spécifier un autre type d'événement avec `event: ...` au début de l'événement.

Par exemple :

```
event: join
data: Bob

data: Hello

event: leave
data: Bob
```

Pour gérer des événements personnalisés, nous devons utiliser `addEventListener`, pas `onmessage` :

```js
eventSource.addEventListener('join', event => {
  alert(`Joined ${event.data}`);
});

eventSource.addEventListener('message', event => {
  alert(`Said: ${event.data}`);
});

eventSource.addEventListener('leave', event => {
  alert(`Left ${event.data}`);
});
```

## Exemple complet

Voici le serveur qui envoie des messages avec `1`, `2`, `3`, puis `bye` et rompt la connexion.

Ensuite, le navigateur se reconnecte automatiquement.

[codetabs src="eventsource"]

## Résumé

L'objet `EventSource` établit automatiquement une connexion persistante et permet au serveur d'envoyer des messages par-dessus.

Cela offre :
- Reconnexion automatique, avec délai d'attente de `retry` réglable.
- Identifiants des messages pour reprendre les événements, le dernier identifiant reçu est envoyé dans l'en-tête `Last-Event-ID` lors de la reconnexion.
- L'état actuel est dans la propriété `readyState`.

Cela fait de `EventSource` une alternative viable à `WebSocket`, car il est plus bas niveau et manque de telles fonctionnalités intégrées (bien qu'elles puissent être implémentées).

Dans de nombreuses applications réelles, la puissance de `EventSource` est juste suffisante.

Pris en charge dans tous les navigateurs modernes (pas IE).

La syntaxe est :

```js
let source = new EventSource(url, [credentials]);
```

Le deuxième argument n'a qu'une seule option possible: `{withCredentials: true}`, il permet d'envoyer des informations d'identification cross-origin.

La sécurité globale de cross-origin est la même que pour `fetch` et d'autres méthodes réseau.

### Propriétés d'un objet `EventSource`

`readyState`
: L'état de connexion actuel : soit `EventSource.CONNECTING (=0)`, `EventSource.OPEN (=1)` ou `EventSource.CLOSED (=2)`.

`lastEventId`
: Le dernier `id` reçu. Lors de la reconnexion, le navigateur l'envoie dans l'en-tête `Last-Event-ID`.

### Les méthodes

`close()`
: Ferme la connexion.

### Les événements

`message`
: Message reçu, les données sont dans `event.data`.

`open`
: La connexion est établie.

`error`
: En cas d'erreur, y compris la perte de connexion (se reconnectera automatiquement) et les erreurs fatales. Nous pouvons vérifier `readyState` pour voir si la reconnexion est tentée.

Le serveur peut définir un nom d'événement personnalisé dans `event:`. De tels événements doivent être gérés en utilisant `addEventListener`, pas `on<event>`.

### Format de réponse du serveur

Le serveur envoie des messages, délimités par `\n\n`.

Un message peut contenir les champs suivants :

- `data:` -- corps du message, une séquence de plusieurs `data` est interprétée comme un seul message, avec `\n` entre les parties.
- `id:` -- renouvelle `lastEventId`, envoyé dans `Last-Event-ID` lors de la reconnexion.
- `retry:` -- recommande un délai de relance pour les reconnexions en ms. Il n'y a aucun moyen de le définir à partir de JavaScript.
- `event:` -- nom de l'événement, doit précéder `data:`.

Un message peut inclure un ou plusieurs champs dans n'importe quel ordre, mais `id:` va généralement en dernier.
