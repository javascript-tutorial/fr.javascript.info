
# Fetch: Download progress

La méthode `fetch` permet de suivre la progression du *téléchargement*.

Veuillez noter: il n'y a actuellement aucun moyen pour `fetch` de suivre la progression du *téléchargement*. À cette fin, veuillez utiliser [XMLHttpRequest](info:xmlhttprequest), nous le couvrirons plus tard.

Pour suivre la progression du téléchargement, nous pouvons utiliser la propriété `response.body`. C'est `ReadableStream` - un objet spécial qui fournit le corps morceau par morceau, comme il vient. Les flux lisibles sont décrits dans la spécification [Streams API](https://streams.spec.whatwg.org/#rs-class).

Contrairement à `response.text()`, `response.json()` et à d'autres méthodes, `response.body` donne un contrôle total sur le processus de lecture, et nous pouvons compter la quantité consommée à tout moment.

Voici l'esquisse de code qui lit la réponse de `response.body` :

```js
// au lieu de response.json() et d'autres méthodes
const reader = response.body.getReader();

// boucle infinie pendant le téléchargement du corps
while(true) {
  // done is true for the last chunk
  // value is Uint8Array of the chunk bytes
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

Le résultat de l'appel `await reader.read()` est un objet avec deux propriétés :
- **`done`** -- `true` lorsque la lecture est terminée, sinon `false`.
- **`value`** -- un tableau typé d'octets : `Uint8Array`.

```smart
L'API Streams décrit également l'itération asynchrone sur `ReadableStream` avec la boucle `for wait..of`, mais elle n'est pas encore largement prise en charge (voir les [problèmes de navigateurs](https://github.com/whatwg/streams/issues/778#issuecomment-461341033)), nous utilisons donc la boucle `while`.
```

Nous recevons des morceaux de réponse dans la boucle, jusqu'à ce que le chargement se termine, c'est-à-dire: jusqu'à ce que `done` devienne `true`.

Pour enregistrer la progression, nous avons juste besoin d'ajouter la longueur de la `value` de chaque fragment reçu au compteur.

Voici l'exemple de travail complet qui obtient la réponse et enregistre la progression dans la console, plus d'explications à suivre :

```js run async
// Étape 1: démarrez la récupération et obtenir un lecteur
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// Étape 2: obtenir la longueur totale
const contentLength = +response.headers.get('Content-Length');

// Étape 3: lecture des données
let receivedLength = 0; // reçu autant d'octets en ce moment
let chunks = []; // tableau de morceaux binaires reçus (comprend le corps)
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Received ${receivedLength} of ${contentLength}`)
}

// Étape 4: concaténer des morceaux en un seul Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
	chunksAll.set(chunk, position); // (4.2)
	position += chunk.length;
}

// Étape 5: décoder en une chaîne de caractères
let result = new TextDecoder("utf-8").decode(chunksAll);

// Nous avons fini !
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

Expliquons cela étape par étape :

1. Nous effectuons un `fetch` comme d'habitude, mais au lieu d'appeler `response.json() `, nous obtenons un lecteur de flux `response.body.getReader()`.

    Veuillez noter que nous ne pouvons pas utiliser ces deux méthodes pour lire la même réponse : utilisez un lecteur ou une méthode de réponse pour obtenir le résultat.
2. Avant la lecture, nous pouvons déterminer la longueur complète de la réponse à partir de l'en-tête `Content-Length`.

    Il peut être absent pour les requêtes cross-origin (voir le chapitre <info:fetch-crossorigin>), techniquement, un serveur n'a pas à le configurer. Mais généralement, c'est à sa place.
3. Appel de `await reader.read()` jusqu'à ce que ce soit fait.

    Nous rassemblons des blocs de réponse dans le tableau `chunks`. C'est important, car une fois la réponse consommée, nous ne pourrons pas la "relire" à l'aide de `response.json()` ou d'une autre manière (vous pouvez essayer, il y aura une erreur).
4. À la fin, nous avons `chunks` -- un tableau de morceaux d'octets `Uint8Array`. Nous devons les joindre en un seul résultat. Malheureusement, il n'y a pas de méthode unique qui les concatène, donc il y a du code pour le faire :
    1. Nous créons `chunksAll = new Uint8Array(receivedLength)` -- un tableau de même type avec la longueur combinée.
    2. Ensuite nous utilisons la méthode `.set(chunk, position)` pour copier chaque `chunk` l'un après l'autre.
5. Nous avons le résultat dans `chunksAll`. C'est un tableau d'octets cependant, pas une chaîne de caractères.

    Pour créer une chaîne de caractères, nous devons interpréter ces octets. Le [TextDecoder](info:text-decoder) intégré fait exactement cela. Ensuite, nous pouvons `JSON.parse`, si nécessaire.

    Et si nous avions besoin d'un contenu binaire au lieu d'une chaîne de caractères ? C'est encore plus simple. Remplacez les étapes 4 et 5 par une seule ligne qui crée un `Blob` à partir de tous les morceaux :
    ```js
    let blob = new Blob(chunks);
    ```

À la fin, nous avons le résultat (sous forme de chaîne de caractères ou d'objet blob, selon ce qui est pratique) et le suivi des progrès dans le processus.

Encore une fois, veuillez noter que ce n'est pas pour la progression en *upload* (pas de possibilité actuellement avec `fetch`), seulement pour la progression en *download*.

De plus, si la taille est inconnue, nous devrions vérifier `receiveLength` dans la boucle et la briser une fois qu'elle atteint une certaine limite. Pour que les `chunks` ne débordent pas de mémoire.
