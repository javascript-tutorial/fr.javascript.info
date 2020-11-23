# Chargement des ressources: onload et onerror

Le navigateur nous permet de suivre le chargement des ressources externes - scripts, iframes, images, etc.

Il y a deux événements pour cela:

- `onload` - chargement réussi,
- `onerror` - une erreur s'est produite.

## Chargement d'un script

Disons que nous devons charger un script tiers et appeler une fonction qui y réside.

Nous pouvons le charger dynamiquement, comme ceci:

```js
let script = document.createElement('script');
script.src = "my.js";

document.head.append(script);
```

...Mais comment exécuter la fonction déclarée dans ce script? Nous devons attendre que le script se charge pour l'appeler.

```smart
Pour nos propres scripts, nous pourrions utiliser des [modules JavaScript] (info:modules) ici, mais ils ne sont pas largement adoptés par les bibliothèques tierces.
```

### script.onload

L'assistant principal est l'événement `load`. Il se déclenche après le chargement et l'exécution du script.

Par exemple:

```js run untrusted
let script = document.createElement('script');

// peut charger n'importe quel script, depuis n'importe quel domaine
script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
document.head.append(script);

*!*
script.onload = function() {
  // le script crée une variable "_"
  alert( _.VERSION ); // affiche la version de la bibliothèque

};
*/!*
```

Donc, dans `onload`, nous pouvons utiliser des variables de script, exécuter des fonctions, etc.

...Et si le chargement échouait? Par exemple, il n'y a pas de tel script (erreur 404) ou le serveur est en panne (indisponible).

### script.onerror

Les erreurs qui se produisent pendant le chargement du script peuvent être suivies dans un événement `error`.

Par exemple, demandons un script qui n'existe pas:

```js run
let script = document.createElement('script');
script.src = "https://example.com/404.js"; // pas de tel script
document.head.append(script);

*!*
script.onerror = function() {
  alert("Error loading " + this.src); // Erreur de chargement de https://example.com/404.js
};
*/!*
```

Veuillez noter que nous ne pouvons pas obtenir les détails des erreurs HTTP ici. Nous ne savons pas si c'était une erreur 404 ou 500 ou autre chose. Juste que le chargement a échoué.

```warn
Les événements `onload`/`onerror` ne suivent que le chargement lui-même.

Les erreurs qui peuvent survenir lors du traitement et de l'exécution du script sont hors de portée de ces événements. C'est-à-dire: si un script s'est chargé avec succès, alors `onload` se déclenche, même s'il contient des erreurs de programmation. Pour suivre les erreurs de script, on peut utiliser le gestionnaire global `window.onerror`.
```

## Autres ressources

Les événements `load` et `error` fonctionnent aussi pour d'autres ressources, essentiellement pour toute ressource qui a un `src` externe.

Par exemple:

```js run
let img = document.createElement('img');
img.src = "https://js.cx/clipart/train.gif"; // (*)

img.onload = function() {
  alert(`Image loaded, size ${img.width}x${img.height}`);
};

img.onerror = function() {
  alert("Error occurred while loading image");
};
```

Il y a quelques notes cependant:

- La plupart des ressources commencent à se charger lorsqu'elles sont ajoutées au document. Mais `<img>` est une exception. Elle commence à se charger lorsqu'elle obtient un src `(*)`.
- Pour `<iframe>`, l'événement `iframe.onload` se déclenche lorsque le chargement de l'iframe est terminé, à la fois pour un chargement réussi et en cas d'erreur.

C'est pour des raisons historiques.

## Politique de crossorigin

Il y a une règle: les scripts d'un site ne peuvent pas accéder au contenu de l'autre site. Donc, par exemple un script sur `https://facebook.com` ne peut pas lire la boîte aux lettres de l'utilisateur sur `https://gmail.com`.

Ou, pour être plus précis, une origine (triplet domaine/port/protocole) ne peut pas accéder au contenu à partir d'une autre. Donc, même si nous avons un sous-domaine, ou juste un autre port, ce sont des origines différentes sans accès les uns aux autres.

Cette règle affecte également les ressources d'autres domaines.

Si nous utilisons un script d'un autre domaine et qu'il contient une erreur, nous ne pouvons pas obtenir les détails de l'erreur.

Par exemple, prenons un script `error.js` qui consiste en un seul (mauvais) appel de fonction:

```js
// 📁 error.js
noSuchFunction();
```

Maintenant, chargez-le depuis le même site où il se trouve:

```html run height=0
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script src="/article/onload-onerror/crossorigin/error.js"></script>
```

Nous pouvons voir un bon rapport d'erreur, comme ceci:

```
Uncaught ReferenceError: noSuchFunction is not defined
https://javascript.info/article/onload-onerror/crossorigin/error.js, 1:1
```

Maintenant, chargeons le même script à partir d'un autre domaine:

```html run height=0
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
```

Le rapport est différent, comme ceci:

```
Script error.
, 0:0
```

Les détails peuvent varier en fonction du navigateur, mais l'idée est la même: toute information sur les éléments internes d'un script, y compris les traces de pile d'erreurs, est masquée. Exactement parce que c'est d'un autre domaine.

Pourquoi avons-nous besoin de détails d'erreur?

Il existe de nombreux services (et nous pouvons créer le nôtre) qui écoutent les erreurs globales en utilisant `window.onerror`, enregistrent les erreurs et fournissent une interface pour y accéder et les analyser. C'est génial, car nous pouvons voir de vraies erreurs, déclenchées par nos utilisateurs. Mais si un script vient d'une autre origine, alors il n'y a pas beaucoup d'informations sur les erreurs, comme nous venons de le voir.

Une politique d’origine croisée similaire (CORS) est également appliquée pour d’autres types de ressources.

**Pour permettre l'accès cross-origin, la balise `<script>` doit avoir l'attribut `crossorigin`, et le serveur distant doit fournir des en-têtes spéciaux.**

Il existe trois niveaux d'accès cross-origin:

1. **Aucun attribut `crossorigin`** -- accès interdit.
2. **`crossorigin="anonymous"`** -- accès autorisé si le serveur répond avec l'en-tête `Access-Control-Allow-Origin` avec `*` ou notre origine. Le navigateur n'envoie pas d'autorisationinformation and cookies to remote server.
3. **`crossorigin="use-credentials"`** -- accès autorisé si le serveur renvoie l'en-tête `Access-Control-Allow-Origin` avec notre origine et `Access-Control-Allow-Credentials:true`. Le navigateur envoie des informations d'autorisation et des cookies au serveur distant.

```smart
Vous pouvez en savoir plus sur l'accès cross-origin dans le chapitre <info:fetch-crossorigin>. Il décrit la méthode `fetch` pour les requêtes réseau, mais la politique est exactement la même.

Les "cookies" sont hors de notre portée actuelle, mais vous pouvez les lire dans le chapitre <info:cookie>.
```

Dans notre cas, nous n'avions aucun attribut crossorigin. L'accès cross-origin était donc interdit. Ajoutons-le.

Nous pouvons choisir entre `"anonymous"` (aucun cookie envoyé, un en-tête côté serveur nécessaire) et `"use-credentials"` (envoie également des cookies, deux en-têtes côté serveur nécessaires).

Si nous ne nous soucions pas des cookies, alors `"anonymous"` est la voie à suivre:

```html run height=0
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script *!*crossorigin="anonymous"*/!* src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
```

Maintenant, en supposant que le serveur fournit un en-tête `Access-Control-Allow-Origin`, tout va bien. Nous avons le rapport d'erreur complet.

## Résumé

Les images `<img>`, les styles externes, les scripts et autres ressources fournissent des événements `load` et `error` pour suivre leur chargement:

- `load` se déclenche en cas de chargement réussi.
- `error` se déclenche en cas d'échec du chargement.

La seule exception est `<iframe>`: pour des raisons historiques, il déclenche toujours `load`, pour tout achèvement de chargement, même si la page n'est pas trouvée.

L'événement `readystatechange` fonctionne également pour les ressources, mais est rarement utilisé, car les événements `load/error` sont plus simples.
