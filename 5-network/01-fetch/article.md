
# Fetch

JavaScript peut envoyer des requêtes réseau au serveur et charger de nouvelles informations chaque fois que nécessaire.

Par exemple, nous pouvons utiliser une requête réseau pour :

- Soumettre une commande,
- Charger des informations utilisateur,
- Recevoir les dernières mises à jour du serveur,
- ...etc.

... Et tout cela sans recharger la page !

Il y a un terme générique "AJAX" (abrégé de <b>A</b>synchronous <b>J</b>avaScript <b>A</b>nd <b>X</b>ML) pour les requêtes réseau à partir de JavaScript. Cependant nous n'avons pas besoin d'utiliser XML : le terme vient de l'ancien temps, c'est pourquoi ce mot est là. Vous avez peut-être déjà entendu ce terme.

Il existe plusieurs façons d'envoyer une requête réseau et d'obtenir des informations du serveur.

La méthode `fetch()` est moderne et polyvalente, nous allons donc commencer avec celle-ci. Elle n'est pas prise en charge par les anciens navigateurs (peut être polyfilled), mais très bien prise en charge par les navigateurs modernes.

La syntaxe de base est :

```js
let promise = fetch(url, [options])
```

- **`url`** -- l'URL cible.
- **`options`** -- paramètres facultatifs : méthode, en-têtes, etc...

Sans `options`, c'est une simple requête GET, téléchargeant le contenu de l'`url`.

Le navigateur démarre la requête immédiatement et renvoie une promesse que le code appelant devrait utiliser pour obtenir le résultat.

Obtenir une réponse est généralement un processus en deux étapes.

**Premièrement, la `promise`, renvoyée par `fetch`, se résout avec un objet de la classe intégrée [Response](https://fetch.spec.whatwg.org/#response-class) dès que le serveur répond avec des en-têtes.**

À ce stade, nous pouvons vérifier l'état HTTP, pour voir s'il est réussi ou non, vérifier les en-têtes, mais nous ne disposons pas encore du corps.

La promesse rejette si le `fetch` n'a pas pu faire de requête HTTP, par exemple problèmes de réseau, ou si l'adresse n'existe pas. Les statuts HTTP anormaux, tels que 404 ou 500, ne provoquent pas d'erreur.

Nous pouvons voir l'état HTTP dans les propriétés de réponse :

- **`status`** -- Code d'état HTTP, par exemple 200.
- **`ok`** -- booléen, `true` si le code d'état HTTP est 200-299.

Par exemple :

```js
let response = await fetch(url);

if (response.ok) { // if HTTP-status is 200-299
  // obtenir le corps de réponse (la méthode expliquée ci-dessous)
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
```

**Deuxièmement, pour obtenir le corps de la réponse, nous devons utiliser un appel de méthode supplémentaire.**

`Response` fournit plusieurs méthodes basées sur les promesses pour accéder au corps dans différents formats :

- **`response.text()`** -- lit la réponse et retourne sous forme de texte,
- **`response.json()`** -- analyse la réponse en JSON,
- **`response.formData()`** -- retourne la réponse en tant que objet `FormData` (expliqué dans le [chapitre suivant](info:formdata)),
- **`response.blob()`** -- retourne la réponse en tant que [Blob](info:blob) (donnée binaire avec type),
- **`response.arrayBuffer()`** -- retourne la réponse en tant que [ArrayBuffer](info:arraybuffer-binary-arrays) (représentation de bas niveau de donnée binaire),
- aditionellement, `response.body` est un objet [ReadableStream](https://streams.spec.whatwg.org/#rs-class), qui permet de lire le corps morceau par morceau, nous verrons un exemple plus tard.

Par exemple, obtenons un objet JSON avec les derniers commits de GitHub :

```js run async
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);

*!*
let commits = await response.json(); // lire le corps de réponse et analyser en JSON
*/!*

alert(commits[0].author.login);
```

Ou, la même chose sans `await`, en utilisant la syntaxe des promesses pures :

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

Pour obtenir la réponse en texte, `await response.text()` au lieu de `.json()` :

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); // lire le corps de la réponse sous forme de texte

alert(text.slice(0, 80) + '...');
```

En tant que vitrine pour la lecture au format binaire, récupérons et affichons une image du logo de ["fetch" specification](https://fetch.spec.whatwg.org) (voir le chapitre [Blob](info:blob) pour plus de détails sur les opérations de `Blob`):

```js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
let blob = await response.blob(); // télécharger en tant qu'objet Blob
*/!*

// create <img> for it
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

// l'afficher
img.src = URL.createObjectURL(blob);

setTimeout(() => { // le cacher après 3 secondes
  img.remove();
  URL.revokeObjectURL(img.src);
}, 3000);
```

````warn
Nous ne pouvons choisir qu'une seule méthode de lecture du corps.

Si nous avons déjà la réponse avec `response.text()`, alors `response.json()` ne fonctionnera pas, car le contenu du corps a déjà été traité.

```js
<<<<<<< HEAD
let text = await response.text(); // corps de la réponse consommé
let parsed = await response.json(); // echec (déjà consommé)
=======
let text = await response.text(); // response body consumed
let parsed = await response.json(); // fails (already consumed)
```
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
````

## En-têtes de réponse

Les en-têtes de réponse sont disponibles dans un objet d'en-têtes de type Map-like `response.headers`.

Ce n'est pas exactement un Map, mais il a des méthodes similaires pour obtenir des en-têtes individuels par nom ou les parcourir :

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// get one header
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// iterate over all headers
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

## En-têtes de requêtes

Pour définir un en-tête de requête dans `fetch`, nous pouvons utiliser l'option `headers`. Il a un objet avec des en-têtes sortants, comme ceci :

```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'secret'
  }
});
```

... Mais il y a une liste d'[en-têtes HTTP interdits](https://fetch.spec.whatwg.org/#forbidden-header-name) que nous ne pouvons pas définir :

- `Accept-Charset`, `Accept-Encoding`
- `Access-Control-Request-Headers`
- `Access-Control-Request-Method`
- `Connection`
- `Content-Length`
- `Cookie`, `Cookie2`
- `Date`
- `DNT`
- `Expect`
- `Host`
- `Keep-Alive`
- `Origin`
- `Referer`
- `TE`
- `Trailer`
- `Transfer-Encoding`
- `Upgrade`
- `Via`
- `Proxy-*`
- `Sec-*`

Ces en-têtes assurent un HTTP correct et sûr, ils sont donc contrôlés exclusivement par le navigateur.

## Requêtes POST

Pour faire une requête `POST`, ou une requête avec une autre méthode, nous devons utiliser les options `fetch` :

- **`method`** -- HTTP-method, par exemple `POST`,
- **`body`** -- le corps de la requête, un parmi ceux-ci :
  - une chaîne de caractères (par exemple encodé en JSON),
  - un objet `FormData`, pour soumettre les données en tant que `form/multipart`,
  - `Blob`/`BufferSource` pour envoyer des données binaires,
  - [URLSearchParams](info:url), pour soumettre les données au format `x-www-form-urlencoded`, rarement utilisé.

Le format JSON est utilisé la plupart du temps.

Par exemple, ce code soumet l'objet `user` en JSON :

```js run async
let user = {
  name: 'John',
  surname: 'Smith'
};

*!*
let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});
*/!*

let result = await response.json();
alert(result.message);
```

Veuillez noter que si la requête `body` est une chaîne de caractères, alors l'en-tête `Content-Type` est défini sur `text/plain;charset=UTF-8` par défaut.

Mais, si nous envoyons du JSON, nous utiliserons à la place l'option `headers` pour envoyer `application/json`, le bon `Content-Type` pour les données encodées en JSON.

## Envoi d'une image

Nous pouvons également soumettre des données binaires avec `fetch` en utilisant des objets `Blob` ou `BufferSource`.

Dans cet exemple, il y a un `<canvas>` où nous pouvons dessiner en déplaçant une souris dessus. Un clic sur le bouton "submit" envoie l'image au serveur :

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

      // le serveur répond avec confirmation et la taille de l'image
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

Veuillez noter qu'ici, nous ne définissons pas l'en-tête `Content-Type` manuellement, car un objet `Blob` a un type intégré (ici `image/png`, tel que généré par `toBlob`). Pour les objets `Blob`, ce type devient la valeur de `Content-Type`.

La fonction `submit()` peut être réécrite sans `async/await` comme ceci :

```js
function submit() {
  canvasElem.toBlob(function(blob) {        
    fetch('/article/fetch/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
```

## Résumé

Une requête fetch typique se compose de deux appels `await` :

```js
let response = await fetch(url, options); // se résout avec des en-têtes de réponse
let result = await response.json(); // lit le corps en tant que JSON
```

Ou, sans `await` :

```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* process result */)
```

Propriétés de réponse :
- `response.status` -- Code HTTP de la réponse,
- `response.ok` -- `true` est le statut 200-299.
- `response.headers` -- objet Map-like avec en-têtes HTTP.

Méthodes pour obtenir le corps de réponse :
- **`response.text()`** -- retourne la réponse sous forme de texte,
- **`response.json()`** -- analyse la réponse en tant qu'objet JSON,
- **`response.formData()`** -- retourne la réponse en tant qu'objet `FormData` (encodage formulaire/multipartie, voir le chapitre suivant),
- **`response.blob()`** -- retourne la réponse en tant que [Blob](info:blob) (données binaires avec type),
- **`response.arrayBuffer()`** -- retourne la réponse en tant que [ArrayBuffer](info:arraybuffer-binary-arrays) (données binaires de bas niveau),

Options de fetch jusque là :
- `method` -- Méthode HTTP,
- `headers` -- un objet avec en-têtes de requête (aucun en-tête n'est autorisé),
- `body` -- les données à envoyer (corps de la demande) en tant que `string`, `FormData`, `BufferSource`, `Blob` ou objet `UrlSearchParams`.

Dans les chapitres suivants, nous verrons plus d'options et de cas d'utilisation de `fetch`.
