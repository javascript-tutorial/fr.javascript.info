
# API Fetch

Jusqu'à présent, nous en savons pas mal sur `fetch`.

Voyons le reste de l'API, pour couvrir toutes ses capacités.

```smart
Remarque: la plupart de ces options sont rarement utilisées. Vous pouvez ignorer ce chapitre et continuer à utiliser `fetch` correctement.

Pourtant, il est bon de savoir ce que `fetch` peut faire, donc si le besoin s'en fait sentir, vous pouvez revenir et lire les détails.
```

Voici la liste complète de toutes les options possibles de `fetch` avec leurs valeurs par défaut (alternatives dans les commentaires) :

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    // la valeur de l'en-tête du type de contenu est généralement définie automatiquement
    // selon la requête du body
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string, FormData, Blob, BufferSource, or URLSearchParams
  referrer: "about:client", // ou "" pour ne pas envoyer de header Referer,
  // ou une URL de l'origine actuelle
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // un hash, comme "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController pour annuler la requête
  window: window // null
});
```

Une liste impressionnante, non ?

Nous avons entièrement couvert `method`, `headers` et `body` dans le chapitre <info:fetch>.

L'option `signal` est couverte dans <info:fetch-abort>.

Explorons maintenant le reste des capacités.

## referrer, referrerPolicy

Ces options régissent la façon dont `fetch` définit l'en-tête HTTP `Referer`.

Habituellement, cet en-tête est défini automatiquement et contient l'url de la page à l'origine de la requête. Dans la plupart des scénarios, ce n'est pas important du tout, parfois, pour des raisons de sécurité, il est logique de le supprimer ou de le raccourcir.

**L'option `referer` permet de définir n'importe quel `Referer` dans l'origine actuelle) ou de le supprimer.**

Pour n'envoyer aucun referer, définissez une chaîne de caractères vide :
```js
fetch('/page', {
*!*
  referrer: "" // pas de header Referer
*/!*
});
```

Pour définir une autre URL dans l'origine actuelle :

```js
fetch('/page', {
  // en supposant que nous sommes sur https://javascript.info
  // nous pouvons définir n'importe quel en-tête Referer, mais uniquement dans l'origine actuelle
*!*
  referrer: "https://javascript.info/anotherpage"
*/!*
});
```

**L'option `referrerPolicy` établit des règles générales pour `Referer`.**

Les requêtes sont divisées en 3 types :

1. Requête à la même origine.
2. Requête à une autre origine.
3. Requête de HTTPS à HTTP (du protocole sûr au protocole non sécurisé).

Contrairement à l'option `referrer` qui permet de définir la valeur exacte de `Referer`, `referrerPolicy` indique les règles générales du navigateur pour chaque type de requête.

Les valeurs possibles sont décrites dans la [spécification Referrer Policy](https://w3c.github.io/webappsec-referrer-policy/):

<<<<<<< HEAD
- **`"no-referrer-when-downgrade"`** -- la valeur par défaut : le `Referer` complet est toujours envoyé, sauf si nous envoyons une requête de HTTPS à HTTP (vers un protocole moins sécurisé).
- **`"no-referrer"`** -- ne jamais envoyer de `Referer`.
- **`"origin"`** -- envoyer uniquement l'origine dans `Referer`, pas l'URL de la page complète, par exemple uniquement `http://site.com` au lieu de` http://site.com/path`.
- **`"origin-when-cross-origin"`** -- envoyer un `Referer` complet à la même origine, mais uniquement la partie origine pour les requêtes cross-origin(comme ci-dessus).
- **`"same-origin"`** -- envoyer un `Referer` complet à la même origine, mais pas de referer pour les requêtes cross-origin.
- **`"strict-origin"`** -- envoyer uniquement l'origine, ne pas envoyer de `Referer` pour les requêtes HTTPS → HTTP.
- **`"strict-origin-when-cross-origin"`** -- pour la même origine envoyer un `Referer` complet, pour une cross-origin, envoyer uniquement l'origine, à moins que ce ne soit HTTPS → requête HTTP, puis ne rien envoyer.
- **`"unsafe-url"`** -- toujours envoyer l'url complète dans `Referer`, même pour les requêtes HTTPS → HTTP
=======
- **`"no-referrer-when-downgrade"`** -- the default value: full `Referer` is sent always, unless we send a request from HTTPS to HTTP (to less secure protocol).
- **`"no-referrer"`** -- never send `Referer`.
- **`"origin"`** -- only send the origin in `Referer`, not the full page URL, e.g. only `http://site.com` instead of `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- send full `Referer` to the same origin, but only the origin part for cross-origin requests (as above).
- **`"same-origin"`** -- send full `Referer` to the same origin, but no `Referer` for cross-origin requests.
- **`"strict-origin"`** -- send only origin, don't send `Referer` for HTTPS→HTTP requests.
- **`"strict-origin-when-cross-origin"`** -- for same-origin send full `Referer`, for cross-origin send only origin, unless it's HTTPS→HTTP request, then send nothing.
- **`"unsafe-url"`** -- always send full url in `Referer`, even for HTTPS→HTTP requests.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Voici un tableau avec toutes les combinaisons :

| Valeur                                           | Vers la même origine | Vers une autre origine | HTTPS→HTTP |
|--------------------------------------------------|----------------------|------------------------|------------|
| `"no-referrer"`                                  | -                    | -                      | -          |
| `"no-referrer-when-downgrade"` or `""` (default) | full                 | full                   | -          |
| `"origin"`                                       | origin               | origin                 | origin     |
| `"origin-when-cross-origin"`                     | full                 | origin                 | origin     |
| `"same-origin"`                                  | full                 | -                      | -          |
| `"strict-origin"`                                | origin               | origin                 | -          |
| `"strict-origin-when-cross-origin"`              | full                 | origin                 | -          |
| `"unsafe-url"`                                   | full                 | full                   | full       |

Disons que nous avons une zone d'administration avec une structure d'URL qui ne devrait pas être connue de l'extérieur du site.

Si nous envoyons un `fetch`, alors par défaut, il envoie toujours l'en-tête `Referer` avec l'url complète de notre page (sauf lorsque nous demandons de HTTPS à HTTP, alors pas de `Referer`).

Par exemple : `Referer: https://javascript.info/admin/secret/paths`.

Si nous souhaitons que d'autres sites Web connaissent uniquement la partie origin, pas le chemin URL, nous pouvons définir l'option :

```js
fetch('https://another.com/page', {
  // ...
  referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
});
```

Nous pouvons le mettre à tous les appels `fetch`, peut-être l'intégrer dans la bibliothèque JavaScript de notre projet qui fait toutes les requêtes et utilise `fetch` à l'intérieur.

Sa seule différence par rapport au comportement par défaut est que pour les requêtes vers une autre origine, `fetch` envoie uniquement la partie origine de l'URL (par exemple `https://javascript.info`, sans le chemin). Pour les requêtes à notre origine, nous obtenons toujours le `Referer` complet (peut-être utile à des fins de débogage).

```smart header="La Referrer policy n'est pas seulement pour `fetch`"
La Referrer policy, décrite dans la [spécification](https://w3c.github.io/webappsec-referrer-policy/), n'est pas seulement pour `fetch`, mais plus globale.

Plus particulièrement, il est possible de définir la politique par défaut pour toute la page en utilisant l'en-tête HTTP `Referrer-Policy`, ou par lien, avec `<a rel="noreferrer">`.
```

## mode

L'option `mode` est un garde-fou qui empêche les requêtes cross-origin occasionnelles :

- **`"cors"`** -- par défaut, les requêtes cross-origin sont autorisées, comme décrit dans <info:fetch-crossorigin>,
- **`"same-origin"`** -- les requêtes cross-origin requests sont interdites,
- **`"no-cors"`** -- seules les simples requêtes cross-origin sont autorisées.

Cette option peut être utile lorsque l'URL de `fetch` provient d'un tiers, et nous voulons un "interrupteur de mise hors tension" pour limiter les capacités de cross-origin.

## credentials

L'option `credentials` spécifie si `fetch` doit envoyer des cookies et des en-têtes d'autorisation HTTP avec la requête.

- **`"same-origin"`** -- par défaut, n'envoyez pas de requêtes cross-origin,
- **`"include"`** -- toujours envoyer, nécessite `Accept-Control-Allow-Credentials` du serveur cross-origin pour que JavaScript accède à la réponse, qui a été traitée dans le chapitre <info:fetch-crossorigin>,
- **`"omit"`** -- ne jamais envoyer, même pour des requêtes cross-origin.

## cache

Par défaut, les requêtes `fetch` utilisent la mise en cache HTTP standard. Autrement dit, il honore les en-têtes `Expires`,`Cache-Control`, envoie `If-Modified-Since`, et ainsi de suite. Tout comme les requêtes HTTP régulières.

Les options `cache` permettent d'ignorer le cache HTTP ou d'affiner son utilisation :

- **`"default"`** -- `fetch` utilise des règles et des en-têtes de cache HTTP standard,
- **`"no-store"`** -- ignore totalement le cache HTTP, ce mode devient la valeur par défaut si nous définissons un en-tête `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, ou `If-Range`,
- **`"reload"`** -- ne prenez pas le résultat du cache HTTP (le cas échéant), mais remplissez le cache avec la réponse (si les en-têtes de réponse le permettent),
- **`"no-cache"`** -- créer une requête conditionnelle s'il y a une réponse mise en cache, et sinon une requête normale. Remplissez le cache HTTP avec la réponse,
- **`"force-cache"`** -- utilise une réponse du cache HTTP, même si elle est périmée. S'il n'y a pas de réponse dans le cache HTTP, fait une requête HTTP régulière, se comporte normalement,
- **`"only-if-cached"`** -- utilise une réponse du cache HTTP, même si elle est périmée. S'il n'y a pas de réponse dans le cache HTTP, alors erreur. Fonctionne uniquement lorsque le `mode` est sur `"same-origin"`.

## redirect

Normalement, `fetch` suit de manière transparente les redirections HTTP, comme 301, 302 etc.

L'option `redirect` permet de changer cela :

- **`"follow"`** -- par défaut, suit les redirections HTTP,
- **`"error"`** -- erreur en cas de redirection HTTP,
- **`"manual"`** -- ne suit pas la redirection HTTP, mais `response.url` sera la nouvelle URL, et `response.redirected` sera `true`, afin que nous puissions effectuer la redirection manuellement vers la nouvelle URL (si nécessaire).

## integrity

L'option `intégrité` permet de vérifier si la réponse correspond à la somme de contrôle connue à l'avance.

Comme décrit dans la [spécification](https://w3c.github.io/webappsec-subresource-integrity/), les fonctions de hachage prises en charge sont SHA-256, SHA-384 et SHA-512, il peut y en avoir d'autres en fonction du navigateur.

Par exemple, nous téléchargeons un fichier et nous savons que sa somme de contrôle SHA-256 est "abcdef" (une vraie somme de contrôle est plus longue, bien sûr).

Nous pouvons le mettre dans l'option `integrity`, comme ceci :

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

Ensuite, `fetch` calculera SHA-256 seul et le comparera avec notre chaîne de caractères. En cas de non-concordance, une erreur est déclenchée.

## keepalive

L'option `keepalive` indique que la demande peut "survivre" à la page Web qui l'a initiée.

Par exemple, nous recueillons des statistiques sur la façon dont le visiteur actuel utilise notre page (clics de souris, fragments de page qu'il consulte), pour analyser et améliorer l'expérience utilisateur.

Lorsque le visiteur quitte notre page -- nous aimerions enregistrer les données sur notre serveur.

Nous pouvons utiliser l'événement `window.onunload` pour cela :

```js run
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
*!*
    keepalive: true
*/!*
  });
};
```

Normalement, lorsqu'un document est déchargé, toutes les requêtes réseau associées sont abandonnées. Mais l'option `keepalive` indique au navigateur d'exécuter la requête en arrière-plan, même après avoir quitté la page. Cette option est donc essentielle à la réussite de notre demande.

Elle a quelques limitations :

- Nous ne pouvons pas envoyer de mégaoctets: la limite de corps pour les requêtes `keepalive` est de 64kb.
    - Si vous collectez plus de données, nous pouvons les envoyer régulièrement par paquets, de sorte qu'il ne restera pas grand-chose pour la dernière requête `onunload`.
    - La limite concerne toutes les demandes en cours. Nous ne pouvons donc pas le tromper en créant 100 requêtes, chacune de 64 Ko.
- Nous ne pouvons pas gérer la réponse du serveur si la demande est faite dans `onunload`, car le document est déjà déchargé à ce moment là, les fonctions ne fonctionneront pas.
    - Habituellement, le serveur envoie une réponse vide à de telles demandes, ce n'est donc pas un problème.
