# XMLHttpRequest

`XMLHttpRequest` est un objet intégré du navigateur qui permet de faire des requêtes HTTP en JavaScript.

Bien qu'il ait le mot "XML" dans son nom, il peut fonctionner sur toutes les données, pas seulement au format XML. Nous pouvons upload/download des fichiers, suivre les progrès et bien plus encore.

À l'heure actuelle, il existe une autre méthode, plus moderne, `fetch`, qui déprécie quelque peu `XMLHttpRequest`.

Dans le développement Web moderne, `XMLHttpRequest` est utilisé pour trois raisons :

1. Raisons historiques : nous devons prendre en charge les scripts existants avec `XMLHttpRequest`.
2. Nous devons prendre en charge les anciens navigateurs et nous ne voulons pas de polyfills (par exemple pour garder les scripts minuscules).
3. Nous avons besoin de quelque chose que `fetch` ne peut pas encore faire, par exemple pour suivre la progression de l'upload.

Cela vous semble-t-il familier ? Si oui, alors d'accord, continuez avec `XMLHttpRequest`. Sinon, rendez-vous sur <info:fetch>.

## Les bases

`XMLHttpRequest` a deux modes de fonctionnement : synchrone et asynchrone.

Voyons d'abord l'asynchrone, car il est utilisé dans la majorité des cas.

Pour faire la requête, nous avons besoin de 3 étapes :

1. Créer `XMLHttpRequest`:
    ```js
    let xhr = new XMLHttpRequest();
    ```
    Le constructeur n'a aucun argument.

2. L'initialiser, généralement juste après `new XMLHttpRequest` :
    ```js
    xhr.open(method, URL, [async, user, password])
    ```

    Cette méthode spécifie les principaux paramètres de la requête :

    - `method` -- Méthode HTTP. Habituellement `"GET"` ou `"POST"`.
    - `URL` -- l'URL à demander, une chaîne de caractères, peut être l'objet [URL](info:url).
    - `async` -- si explicitement défini sur `false`, alors la demande est synchrone, nous couvrirons cela un peu plus tard.
    - `user`, `password` -- identifiant et mot de passe pour l'authentification HTTP de base (si nécessaire).

    Veuillez noter que l'appel `open`, contrairement à son nom, n'ouvre pas la connexion. Il configure uniquement la demande, mais l'activité réseau ne démarre qu'avec l'appel de `send`.

3. L'envoyer.

    ```js
    xhr.send([body])
    ```

    Cette méthode ouvre la connexion et envoie la demande au serveur. Le paramètre facultatif `body` contient le corps de la requête.

    Certaines méthodes de requête comme `GET` n'ont pas de corps. Et certains d'entre eux comme `POST` utilisent `body` pour envoyer les données au serveur. Nous verrons des exemples de cela plus tard.

4. Écouter les événements `xhr` pour obtenir une réponse.

    Ces trois événements sont les plus utilisés :
    - `load` -- lorsque la requête est terminée (même si l'état HTTP est de type 400 ou 500) et que la réponse est entièrement téléchargée.
    - `error` -- lorsque la requête n'a pas pu être faite, par exemple réseau en panne ou URL non valide.
    - `progress` -- se déclenche périodiquement pendant le téléchargement de la réponse, indique combien a été téléchargé.

    ```js
    xhr.onload = function() {
      alert(`Loaded: ${xhr.status} ${xhr.response}`);
    };

    xhr.onerror = function() { // ne se déclenche que si la demande n'a pas pu être faite du tout
      alert(`Network Error`);
    };

    xhr.onprogress = function(event) { // se déclenche périodiquement
      // event.loaded - combien d'octets téléchargés
      // event.lengthComputable = true si le serveur a envoyé l'en-tête Content-Length
      // event.total - nombre total d'octets (si lengthComputable)
      alert(`Received ${event.loaded} of ${event.total}`);
    };
    ```

Voici un exemple complet. Le code ci-dessous charge l'URL vers `/article/xmlhttprequest/example/load` depuis le serveur et affiche la progression :

```js run
// 1. Créer un nouvel objet XMLHttpRequest
let xhr = new XMLHttpRequest();

// 2. Le configure : GET-request pour l'URL /article/.../load
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. Envoyer la requête sur le réseau
xhr.send();

// 4. Ceci sera appelé après la réception de la réponse
xhr.onload = function() {
  if (xhr.status != 200) { // analyse l'état HTTP de la réponse
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
  } else { // show the result
<<<<<<< HEAD
    alert(`Done, got ${xhr.response.length} bytes`); // responseText est le serveur
=======
    alert(`Done, got ${xhr.response.length} bytes`); // response is the server
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
  }
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    alert(`Received ${event.loaded} bytes`); // pas de Content-Length
  }

};

xhr.onerror = function() {
  alert("Request failed");
};
```

Une fois que le serveur a répondu, nous pouvons recevoir le résultat dans les propriétés `xhr` suivantes :

`status`
: Code d'état HTTP (un nombre): `200`, `404`, `403` et ainsi de suite, peut être `0` en cas d'échec non-HTTP.

`statusText`
: Message d'état HTTP (une chaîne de caractères): généralement `OK` pour `200`, `Not Found` pour `404`, `Forbidden` pour `403` et ainsi de suite.

`response` (les anciens scripts peuvent utiliser `responseText`)
: Le corps de réponse du serveur.

Nous pouvons également spécifier un délai d'expiration en utilisant la propriété correspondante :

```js
xhr.timeout = 10000; // délai d'attente en ms, 10 secondes
```

Si la demande échoue dans le délai imparti, elle est annulée et l'événement `timeout` se déclenche.

````smart header="Paramètres de recherche d'URL"
Pour ajouter des paramètres à l'URL, comme `?name=value`, et assurer le bon encodage, nous pouvons utiliser l'objet [URL](info:url) :

```js
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!');

// le paramètre 'q' est encodé
xhr.open('GET', url); // https://google.com/search?q=test+me%21
```

````

## Type de réponse

Nous pouvons utiliser la propriété `xhr.responseType` pour définir le format de réponse :

- `""` (default) -- obtenir en tant que chaîne de caractères,
- `"text"` -- obtenir en tant que chaîne de caractères,
- `"arraybuffer"` -- obtenir en tant que `ArrayBuffer` (pour les données binaires, voir le chapitre <info:arraybuffer-binary-arrays>),
- `"blob"` -- obtenir en tant que `Blob` (pour les données binaires, voir le chapitre <info:blob>),
- `"document"` -- obtenir en tant que document XML (peut utiliser XPath et d'autres méthodes XML),
- `"json"` -- obtenir en tant que JSON (analysé automatiquement).

Par exemple, obtenons la réponse en JSON :

```js run
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/example/json');

*!*
xhr.responseType = 'json';
*/!*

xhr.send();

// la réponse est {"message": "Hello, world!"}
xhr.onload = function() {
  let responseObj = xhr.response;
  alert(responseObj.message); // Hello, world!
};
```

```smart
Dans les anciens scripts, vous pouvez également trouver des propriétés `xhr.responseText` et même `xhr.responseXML`.

Ils existent pour des raisons historiques, pour obtenir une chaîne de caractères ou un document XML. De nos jours, nous devons définir le format dans `xhr.responseType` et obtenir `xhr.response` comme illustré ci-dessus.
```

## États prêts

`XMLHttpRequest` change entre les états au fur et à mesure de sa progression. L'état actuel est accessible en tant que `xhr.readyState`.

Tous les États, comme dans [la spécification](https://xhr.spec.whatwg.org/#states):

```js
UNSENT = 0; // état initial
OPENED = 1; // open appelé
HEADERS_RECEIVED = 2; // en-têtes de réponse reçus
LOADING = 3; // la réponse est en cours de chargement (une donnée empaquetée est reçue)
DONE = 4; // requête terminée
```

Un objet `XMLHttpRequest` voyagent dans l'ordre `0` -> `1` -> `2` -> `3` -> ... -> `3` -> `4`. L'état `3` se répète chaque fois qu'un paquet de données est reçu sur le réseau.

Nous pouvons les suivre en utilisant l'événement `readystatechange` :

```js
xhr.onreadystatechange = function() {
  if (xhr.readyState == 3) {
    // chargement
  }
  if (xhr.readyState == 4) {
    // requête terminée
  }
};
```

Vous pouvez trouver des écouteurs `readystatechange` dans un code très ancien, il est là pour des raisons historiques, car il fut un temps où il n'y avait pas de `load` et d'autres événements. De nos jours, les gestionnaires `load/error/progress` le déprécient.

## Abandon de la requête

Nous pouvons mettre fin à la requête à tout moment. L'appel à `xhr.abort()` fait cela :

```js
xhr.abort(); // met fin à la requête
```

Cela déclenche l'événement `abort` et `xhr.status` devient `0`.

## Requêtes synchrones

Si dans la méthode `open` le troisième paramètre `async` est réglé sur `false`, la demande est faite de manière synchrone.

En d'autres termes, l'exécution de JavaScript s'interrompt à `send()` et reprend lorsque la réponse est reçue. Un peu comme les commandes `alert` ou `prompt`.

Voici l'exemple réécrit, le 3ème paramètre de `open` est `false` :

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/hello.txt', *!*false*/!*);

try {
  xhr.send();
  if (xhr.status != 200) {
    alert(`Error ${xhr.status}: ${xhr.statusText}`);
  } else {
    alert(xhr.response);
  }
} catch(err) { // en cas d'erreur
  alert("Request failed");
}
```

Cela peut sembler correct, mais les appels synchrones sont rarement utilisés, car ils bloquent le JavaScript dans la page jusqu'à la fin du chargement. Dans certains navigateurs, il devient impossible de faire défiler. Si un appel synchrone prend trop de temps, le navigateur peut suggérer de fermer la page Web "suspendue".

De nombreuses capacités avancées de `XMLHttpRequest`, comme la requête d'un autre domaine ou la spécification d'un délai d'expiration, ne sont pas disponibles pour les demandes synchrones. De plus, comme vous pouvez le voir, aucune indication de progression.

À cause de tout cela, les requêtes synchrones sont utilisées avec parcimonie, pour ainsi dire presque jamais. Nous n'en parlerons plus.

## En-têtes HTTP

`XMLHttpRequest` permet à la fois d'envoyer des en-têtes personnalisés et de lire les en-têtes à partir de la réponse.

Il existe 3 méthodes pour les en-têtes HTTP :

`setRequestHeader(name, value)`
: Définit l'en-tête de demande avec le `name` donné et la `value`.

    Par exemple :

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

    ```warn header="Limites des en-têtes"
    Plusieurs en-têtes sont gérés exclusivement par le navigateur, par exemple `Referer` et `Host`.
    La liste complète est [dans la spécification](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method).

    `XMLHttpRequest` n'est pas autorisé à les modifier, pour la sécurité des utilisateurs et l'exactitude de la requête.
    ```

    ````warn header="Impossible de supprimer un en-tête"
    Une autre particularité de `XMLHttpRequest` est qu'on ne peut pas annuler `setRequestHeader`.

    Une fois l'en-tête défini, il est défini. Des appels supplémentaires ajoutent des informations à l'en-tête, ils ne les écrasent pas.

    Par exemple :

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

    // l'en-tête sera :
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(name)`
: Obtient l'en-tête de réponse avec le `name` donné (sauf `Set-Cookie` et `Set-Cookie2`).

    Par exemple :

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
: Renvoie tous les en-têtes de réponse, à l'exception de `Set-Cookie` et `Set-Cookie2`.

    Les en-têtes sont renvoyés sur une seule ligne, par exemple :

    ```http
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

    Le saut de ligne entre les en-têtes est toujours `"\r\n"` (ne dépend pas du système d'exploitation), nous pouvons donc facilement le diviser en en-têtes individuels. Le séparateur entre le nom et la valeur est toujours un deux-points suivi d'un espace `": "`. C'est fixé dans la spécification.

    Donc, si nous voulons obtenir un objet avec des paires nom/valeur, nous devons ajouter un peu de JS.

    Comme ceci (en supposant que si deux en-têtes ont le même nom, alors le dernier écrase l'ancien) :

    ```js
    let headers = xhr
      .getAllResponseHeaders()
      .split('\r\n')
      .reduce((result, current) => {
        let [name, value] = current.split(': ');
        result[name] = value;
        return result;
      }, {});

    // headers['Content-Type'] = 'image/png'
    ```

## POST, FormData

Pour faire une requête POST, nous pouvons utiliser l'objet intégrée [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData).

La syntaxe :

```js
let formData = new FormData([form]); // crée un objet, éventuellement remplir à partir de <form>
formData.append(name, value); // ajoute un champ
```

Nous le créons, remplissons éventuellement à partir d'un formulaire, ajoutons d'autres champs si nécessaire, puis :

1. `xhr.open('POST', ...)` – utilise la méthode `POST`.
2. `xhr.send(formData)` pour soumettre le formulaire au serveur.

Par exemple :

```html run refresh
<form name="person">
  <input name="name" value="John">
  <input name="surname" value="Smith">
</form>

<script>
  // pré-remplir FormData du formulaire
  let formData = new FormData(document.forms.person);

  // ajouter un champ de plus
  formData.append("middle", "Lee");

  // l'envoie
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(formData);

  xhr.onload = () => alert(xhr.response);
</script>
```

Le formulaire est envoyé avec un encodage `multipart/form-data`.

Ou, si nous aimons davantage JSON, alors `JSON.stringify` et l'envoyer sous forme de chaîne de caractères.

N'oubliez juste pas de définir l'en-tête `Content-Type: application/json`, de nombreux frameworks côté serveur décodent automatiquement JSON avec :

```js
let xhr = new XMLHttpRequest();

let json = JSON.stringify({
  name: "John",
  surname: "Smith"
});

xhr.open("POST", '/submit')
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

xhr.send(json);
```

La méthode `.send(body)` est assez omnivore. Il peut envoyer presque n'importe quel `body`, y compris les objets `Blob` et `BufferSource`.

## Progression de l'upload

L'événement `progress` se déclenche uniquement à l'étape du téléchargement.

C'est-à-dire: si nous envoyons via `POST` quelque chose, `XMLHttpRequest` upload d'abord nos données (le corps de la requête), puis télécharge la réponse.

Si nous uploadons quelque chose de gros, alors nous sommes sûrement plus intéressés à suivre la progression de l'envoi. Mais `xhr.onprogress` n'aide pas ici.

Il existe un autre objet, sans méthodes, exclusivement pour suivre les événements de l'envoi : `xhr.upload`.

Il génère des événements, similaires à `xhr`, mais `xhr.upload` les déclenche uniquement lors de l'upload :

- `loadstart` -- upload démarré.
- `progress` -- se déclenche périodiquement pendant l'upload.
- `abort` -- upload annulé.
- `error` -- erreur non-HTTP.
- `load` -- upload terminé avec succès.
- `timeout` -- upload expiré (si la propriété `timeout` est définie).
- `loadend` -- upload terminé avec succès ou erreur.

Exemple de gestionnaires :

```js
xhr.upload.onprogress = function(event) {
  alert(`Uploaded ${event.loaded} of ${event.total} bytes`);
};

xhr.upload.onload = function() {
  alert(`Upload finished successfully.`);
};

xhr.upload.onerror = function() {
  alert(`Error during the upload: ${xhr.status}`);
};
```

Voici un exemple réel : upload de fichier avec indication de progression :

```html run
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

  // suivre la progression de l'upload
*!*
  xhr.upload.onprogress = function(event) {
    console.log(`Uploaded ${event.loaded} of ${event.total}`);
  };
*/!*

  // suivi de l'envoi : réussi ou non
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      console.log("success");
    } else {
      console.log("error " + this.status);
    }
  };

  xhr.open("POST", "/article/xmlhttprequest/post/upload");
  xhr.send(file);
}
</script>
```

## Requêtes Cross-origin 

`XMLHttpRequest` peut faire des requêtes cross-origin, en utilisant la même politique CORS que [fetch](info:fetch-crossorigin).

Tout comme `fetch`, elle n'envoie pas de cookies et d'autorisation HTTP à une autre origine par défaut. Pour les activer, définissez `xhr.withCredentials` sur `true` :

```js
let xhr = new XMLHttpRequest();
*!*
xhr.withCredentials = true;
*/!*

xhr.open('POST', 'http://anywhere.com/request');
...
```

Voir le chapitre <info:fetch-crossorigin> pour plus de détails sur les en-têtes cross-origin.


## Résumé

Code typique de la requête GET avec `XMLHttpRequest` :

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { // HTTP error?
    // handle error
    alert( 'Error: ' + xhr.status);
    return;
  }

  // obtenir la réponse de xhr.response
};

xhr.onprogress = function(event) {
  // report progress
  alert(`Loaded ${event.loaded} of ${event.total}`);
};

xhr.onerror = function() {
  // gérer les erreurs non HTTP (par exemple, panne de réseau)
};
```

Il y a en fait plus d'événements, la [spécification moderne](http://www.w3.org/TR/XMLHttpRequest/#events) les répertorie (dans l'ordre du cycle de vie) :

<<<<<<< HEAD
- `loadstart` -- la requête a commencé.
- `progress` -- un paquet de données de la réponse est arrivé, tout le corps de la réponse est actuellement dans `responseText`.
- `abort` -- la requête a été annulée par l'appel `xhr.abort()`.
- `error` -- une erreur de connexion s'est produite, par exemple nom de domaine incorrect. Ne se produit pas pour les erreurs HTTP comme 404.
- `load` -- la requête s'est terminée avec succès.
- `timeout` -- la requête a été annulée en raison du délai d'attente (ne se produit que si elle a été définie).
- `loadend` -- se déclenche après `load`, `error`, `timeout` ou `abort`.
=======
- `loadstart` -- the request has started.
- `progress` -- a data packet of the response has arrived, the whole response body at the moment is in `response`.
- `abort` -- the request was canceled by the call `xhr.abort()`.
- `error` -- connection error has occurred, e.g. wrong domain name. Doesn't happen for HTTP-errors like 404.
- `load` -- the request has finished successfully.
- `timeout` -- the request was canceled due to timeout (only happens if it was set).
- `loadend` -- triggers after `load`, `error`, `timeout` or `abort`.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

Les événements `error`, `abort`, `timeout`, et `load` s'excluent mutuellement. Un seul d'entre eux peut se produire.

Les événements les plus utilisés sont la progression du chargement (`load`), l'échec du chargement (` error`), ou nous pouvons utiliser un seul gestionnaire `loadend` et vérifier les propriétés de l'objet de requête `xhr` pour voir ce qui s'est passé.

Nous avons déjà vu un autre événement : `readystatechange`. Historiquement, il est apparu il y a longtemps, avant que la spécification ne soit réglée. De nos jours, il n'est pas nécessaire de l'utiliser, nous pouvons le remplacer par des événements plus récents, mais il peut souvent être trouvé dans des scripts plus anciens.

Si nous devons suivre spécifiquement l'uplaod, alors nous devons écouter les mêmes événements sur l'objet `xhr.upload`.
