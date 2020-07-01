# Cookies, document.cookie

Les cookies sont de petites chaînes de données qui sont stockées directement dans le navigateur. Ils font partie du protocole HTTP, défini par la spécification [RFC 6265](https://tools.ietf.org/html/rfc6265).

Les cookies sont généralement définis par un serveur Web en utilisant l'en-tête HTTP de réponse `Set-Cookie`. Ensuite, le navigateur les ajoute automatiquement à (presque) chaque demande au même domaine en utilisant l'en-tête HTTP `Cookie`.

L'authentification est l'un des cas d'utilisation les plus répandus :

1. Une fois connecté, le serveur utilise l'en-tête HTTP `Set-Cookie` dans la réponse pour définir un cookie avec un "identifiant de session" unique.
2. La prochaine fois que la demande est définie sur le même domaine, le navigateur envoie le cookie sur le net en utilisant l'en-tête HTTP `Cookie`.
3. Le serveur sait donc qui a fait la demande.

Nous pouvons également accéder aux cookies à partir du navigateur, en utilisant la propriété `document.cookie`.

Il y a beaucoup de choses délicates sur les cookies et leurs options. Dans ce chapitre, nous les couvrirons en détail.

## Lire à partir de document.cookie

```online
Votre navigateur stocke-t-il des cookies de ce site? Voyons voir :
```

```offline
En supposant que vous êtes sur un site Web, il est possible d'en voir les cookies, comme ceci :
```

```js run
//Chez javascript.info, nous utilisons Google Analytics pour les statistiques,
// donc il devrait y avoir des cookies
alert( document.cookie ); // cookie1=value1; cookie2=value2;...
```


La valeur de `document.cookie` est constituée de paires `nom=valeur`, délimitées par `; `. Chacune est un cookie distinct.

Pour trouver un cookie particulier, nous pouvons diviser `document.cookie` par `; `, puis trouver le bon nom. Nous pouvons utiliser une expression régulière ou des fonctions de tableau pour ce faire.

Nous le laissons comme exercice pour le lecteur. De plus, à la fin du chapitre, vous trouverez des fonctions d'assistance pour manipuler les cookies.

## Écrire dans document.cookie

Nous pouvons écrire dans `document.cookie`. Mais ce n'est pas une propriété de données, c'est un accesseur (getter/setter). Une affectation à celui-ci est traitée spécialement.

**Une opération d'écriture dans `document.cookie` ne met à jour que les cookies qui y sont mentionnés, mais ne touche pas aux autres cookies.**

Par exemple, cet appel définit un cookie avec le nom `user` et la valeur `John` :

```js run
document.cookie = "user=John"; // met à jour uniquement le cookie nommé 'user'
alert(document.cookie); // montre tous les cookies
```

Si vous l'exécutez, vous verrez probablement plusieurs cookies. En effet, l'opération `document.cookie=` n'écrase pas tous les cookies. Il ne définit que le cookie mentionné `user`.

Techniquement, le nom et la valeur peuvent avoir n'importe quel caractère, pour conserver la mise en forme valide, ils doivent être échappés à l'aide d'une fonction intégrée `encodeURIComponent` :

```js run
// Les caractères spéciaux (espaces), nécéssitent un encodage
let name = "my name";
let value = "John Smith"

// code le cookie en my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith
```


```warn header =" Limitations "
Il y a peu de limitations:
- La paire `name=value`, après `encodeURIComponent`, ne doit pas dépasser 4kb. Nous ne pouvons donc pas stocker quelque chose d'énorme dans un cookie.
- Le nombre total de cookies par domaine est limité à environ 20+, la limite exacte dépend du navigateur.
```

Les cookies ont plusieurs options, beaucoup d'entre elles sont importantes et doivent être définies.

Les options sont listées après `key=value`, délimitées par `; `, comme ceci:

```js run
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

## path

- **`path=/mypath`**

Le préfixe du chemin url, le cookie sera accessible pour les pages sous ce chemin. Doit être absolu. Par défaut, c'est le chemin actuel.

Si un cookie est défini avec `path=/admin`, il est visible sur les pages `/admin` et `/admin/something`, mais pas sur `/home` ou `/adminpage`.

Habituellement, nous devons définir `path` à la racine : `path=/` pour rendre le cookie accessible à partir de toutes les pages du site Web.

## domain

- **`domain=site.com`**

Un domaine où le cookie est accessible. En pratique cependant, il y a des limites. Nous ne pouvons définir aucun domaine.

Par défaut, un cookie n'est accessible qu'au niveau du domaine qui l'a défini. Donc, si le cookie a été défini par `site.com`, nous ne l'obtiendrons pas sur `other.com`.

... Mais ce qui est plus délicat, nous n'obtiendrons pas non plus le cookie sur un sous-domaine `forum.site.com`!

```js
// sur site.com
document.cookie = "user=John"

// sur forum.site.com
alert(document.cookie); // no user
```

**Il n'y a aucun moyen de laisser un cookie accessible depuis un autre domaine de deuxième niveau, donc `other.com` ne recevra jamais de cookie défini sur `site.com`.**

C'est une restriction de sécurité, pour nous permettre de stocker des données sensibles dans des cookies, qui ne devraient être disponibles que sur un seul site.

...Mais si nous souhaitons permettre à des sous-domaines comme `forum.site.com` d'obtenir un cookie, c'est possible. Lors de la configuration d'un cookie sur `site.com`, nous devons explicitement définir l'option` domain` sur le domaine racine: `domain=site.com` :

```js
// sur site.com
// Rendre le cookie accessible sur n'importe quel sous-doimaine *.site.com:
document.cookie = "user=John; domain=site.com"

// plus tard

// sur forum.site.com
alert(document.cookie); // a le cookie user=John
```

Pour des raisons historiques, `domain=.site.com` (un point avant `site.com`) fonctionne également de la même manière, permettant l'accès au cookie à partir de sous-domaines. C'est une ancienne notation, à utiliser si nous devons prendre en charge de très anciens navigateurs.

Ainsi, l'option `domain` permet de rendre un cookie accessible aux sous-domaines.

## expires, max-age

Par défaut, si un cookie n'a pas l'une de ces options, il disparaît lorsque le navigateur est fermé. Ces cookies sont appelés "cookies de session".

Pour laisser les cookies survivre à la fermeture du navigateur, nous pouvons définir l'option `expires` ou `max-age`.

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

Date d'expiration du cookie, lorsque le navigateur le supprimera automatiquement.

La date doit être exactement dans ce format, dans le fuseau horaire GMT. Nous pouvons utiliser `date.toUTCString` pour l'obtenir. Par exemple, nous pouvons configurer le cookie pour qu'il expire dans 1 jour :

```js
// +1 jour à partir de maintenant
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```

If we set `expires` to a date in the past, the cookie is deleted.

-  **`max-age=3600`**

Si nous définissons `expires` à une date antérieure, le cookie est supprimé.

Si nous le définissons à zéro ou négatif, le cookie est supprimé :

```js
// le cookie mourra dans 1 heure
document.cookie = "user=John; max-age=3600";

// supprimer le cookie (laissez-le expirer maintenant)
document.cookie = "user=John; max-age=0";
```  

## secure

- **`secure`**

Le cookie ne doit être transféré que via HTTPS.

**Par défaut, si nous définissons un cookie sur `http://site.com`, il apparaît également sur `https://site.com` et vice versa.**

Autrement dit, les cookies sont basés sur un domaine, ils ne font pas de distinction entre les protocoles.

Avec cette option, si un cookie est défini par `https://site.com`, il n'apparaît pas lorsque le même site est accessible par HTTP, comme `http://site.com`. Donc, si un cookie a un contenu sensible qui ne doit jamais être envoyé via HTTP non crypté, l'indicateur est la bonne chose.

```js
// en supposant que nous sommes sur https:// maintenant
// mettre le cookie sur secure (accessible uniquement si sur HTTPS)
document.cookie = "user=John; secure";
```  

## samesite

C'est un autre attribut de sécurité `samesite`. Il est conçu pour protéger contre les attaques dites XSRF (contrefaçon de demande intersite).

Pour comprendre comment cela fonctionne et quand il est utile, regardons les attaques XSRF.

### Attaque XSRF

Imaginez, vous êtes connecté au site `bank.com`. Autrement dit : vous disposez d'un cookie d'authentification de ce site. Votre navigateur l'envoie à `bank.com` à chaque demande, afin qu'il vous reconnaisse et effectue toutes les opérations financières sensibles.

Maintenant, lorsque vous naviguez sur le Web dans une autre fenêtre, vous accédez accidentellement à un autre site `evil.com`. Ce site possède un code JavaScript qui soumet un formulaire `<form action="https://bank.com/pay">` à `bank.com` avec des champs qui initient une transaction sur le compte du pirate.

Le navigateur envoie des cookies à chaque fois que vous visitez le site `bank.com`, même si le formulaire a été envoyé par `evil.com`. La banque vous reconnaît donc et effectue le paiement.

![](cookie-xsrf.svg)

Cela s'appelle une attaque "Cross-Site Request Forgery" (en bref, XSRF).

Les vraies banques en sont bien sûr protégées. Tous les formulaires générés par `bank.com` ont un champ spécial, appelé "jeton de protection XSRF", qu'une page malveillante ne peut pas générer ou extraire d'une page distante (elle peut y soumettre un formulaire, mais ne peut pas obtenir le retour des données). Et le site `bank.com` vérifie ce jeton sous toutes les formes qu'il reçoit.

Mais une telle protection prend du temps à mettre en œuvre: nous devons nous assurer que chaque formulaire possède le champ de jeton, et nous devons également vérifier toutes les demandes.

### Entrez l'option cookie samesite

L'option de cookie `samesite` fournit un autre moyen de se protéger contre de telles attaques, qui (en théorie) ne devrait pas nécessiter de "jetons de protection xsrf".

Il a deux valeurs possibles:

- **`samesite=strict` (identique à `samesite` sans valeur)**

Un cookie avec `samesite=strict` n'est jamais envoyé si l'utilisateur vient de l'extérieur du même site.

En d'autres termes, qu'un utilisateur suive un lien de son courrier électronique ou soumette un formulaire de `evil.com`, ou effectue une opération provenant d'un autre domaine, le cookie n'est pas envoyé.

Si les cookies d'authentification ont l'option `samesite`, alors l'attaque XSRF n'a aucune chance de réussir, car une soumission de `evil.com` est livrée sans cookies. Ainsi, `bank.com` ne reconnaîtra pas l'utilisateur et ne procédera pas au paiement.

La protection est assez fiable. Seules les opérations provenant de `bank.com` enverront le cookie `samesite`, par ex. une soumission de formulaire à partir d'une autre page sur `bank.com`.

Cependant, il y a un petit inconvénient.

Lorsqu'un utilisateur suit un lien légitime vers `bank.com`, comme à partir de ses propres notes, il sera surpris que `bank.com` ne les reconnaisse pas. En effet, les cookies `samesite=strict` ne sont pas envoyés dans ce cas.

Nous pourrions contourner cela en utilisant deux cookies: l'un pour la "reconnaissance générale", uniquement dans le but de dire: "Bonjour, John", et l'autre pour les opérations de changement de données avec `samesite=strict`. Une personne venant de l'extérieur du site verra alors un accueil, mais les paiements doivent être initiés depuis le site de la banque, pour l'envoi du second cookie.

- **`samesite=lax`**

Une approche plus détendue qui protège également du XSRF et ne rompt pas l'expérience utilisateur.

Le mode Lax, tout comme `strict`, interdit au navigateur d'envoyer des cookies en provenance de l'extérieur du site, mais ajoute une exception.

Un cookie `samesite = lax` est envoyé si ces deux conditions sont remplies :
1. La méthode HTTP est "sûre" (par exemple GET, mais pas POST).

    La liste complète des méthodes HTTP sécurisées se trouve dans la [spécification RFC7231](https://tools.ietf.org/html/rfc7231). Fondamentalement, ce sont les méthodes qui devraient être utilisées pour lire, mais pas pour écrire les données. Ils ne doivent effectuer aucune opération de modification des données. Suivre un lien est toujours GET, la méthode sûre.

2. L'opération effectue une navigation de niveau supérieur (modifie l'URL dans la barre d'adresse du navigateur).

    C'est généralement vrai, mais si la navigation est effectuée dans un `<iframe>`, alors ce n'est pas de niveau supérieur. De plus, les méthodes JavaScript pour les requêtes réseau n'effectuent aucune navigation, elles ne conviennent donc pas.

Donc, ce que `samesite=lax` fait, c'est essentiellement permettre à une opération "aller à l'URL" la plus courante d'avoir des cookies. Par exemple. l'ouverture d'un lien vers un site Web à partir de notes remplit ces conditions.

Mais quelque chose de plus compliqué, comme une demande de réseau d'un autre site ou une soumission de formulaire, perd les cookies.

Si cela vous convient, l'ajout de `samesite=lax` ne bloquera probablement pas l'expérience utilisateur et ajoutera une protection.

Dans l'ensemble, `samesite` est une excellente option, mais il présente un inconvénient important:
- `samesite` est ignoré (non pris en charge) par les anciens navigateurs, avant 2017 environ.

**Donc, si nous comptons uniquement sur `samesite` pour assurer la protection, les anciens navigateurs seront vulnérables.**

Mais nous pouvons sûrement utiliser `samesite` avec d'autres mesures de protection, comme les jetons xsrf, pour ajouter une couche de défense supplémentaire, puis, à l'avenir, lorsque les anciens navigateurs disparaîtront, nous serons probablement en mesure de supprimer les jetons xsrf.

## httpOnly

Cette option n'a rien à voir avec JavaScript, mais nous devons la mentionner pour être complets.

Le serveur Web utilise l'en-tête `Set-Cookie` pour définir un cookie. Et il peut définir l'option `httpOnly`.

Cette option interdit tout accès JavaScript au cookie. Nous ne pouvons pas voir un tel cookie ou le manipuler en utilisant `document.cookie`.

Ceci est utilisé par mesure de précaution, pour se protéger de certaines attaques lorsqu'un pirate informatique injecte son propre code JavaScript dans une page et attend qu'un utilisateur visite cette page. Cela ne devrait pas être possible du tout, un pirate ne devrait pas être en mesure d'injecter son code dans notre site, mais il peut y avoir des bogues qui permettent aux pirates de le faire.


Normalement, si une telle chose se produit et qu'un utilisateur visite une page Web avec le code JavaScript du pirate, ce code s'exécute et accède à `document.cookie` avec des cookies utilisateur contenant des informations d'authentification. C'est une mauvaise chose.

Mais si un cookie est `httpOnly`, alors `document.cookie` ne le voit pas, il est donc protégé.

## Annexe: Fonctions des cookies

Voici un petit ensemble de fonctions pour travailler avec les cookies, plus pratique qu'une modification manuelle de `document.cookie`.

Il existe de nombreuses bibliothèques de cookies pour cela, elles sont donc à des fins de démonstration. Cela fonctionne bien cependant.


### getCookie(name)

Le moyen le plus court d'accéder aux cookies est d'utiliser une [expression régulière](info:regular-expressions).

La fonction `getCookie (name)` retourne le cookie avec le `name` donné:

```js
// renvoie le cookie avec le nom donné,
// ou indéfini s'il n'est pas trouvé
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
```

Ici, `new RegExp` est généré dynamiquement pour correspondre à `; name=<value>`.

Veuillez noter qu'une valeur de cookie est codée, donc `getCookie` utilise une fonction intégrée `decodeURIComponent` pour la décoder.

### setCookie(name, value, options)

Définit le cookie `name` à la `value` donnée avec `path=/` par défaut (peut être modifié pour ajouter d'autres valeurs par défaut):

```js run
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // ajoutez d'autres valeurs par défaut ici si nécessaire
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// Exemple d'utilisation :
setCookie('user', 'John', {secure: true, 'max-age': 3600});
```

### deleteCookie(name)

Pour supprimer un cookie, nous pouvons l'appeler avec une date d'expiration négative :

```js
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
```

```warn header="La mise à jour ou la suppression doit utiliser le même chemin d'accès et le même domaine"
Remarque : lorsque nous mettons à jour ou supprimons un cookie, nous devons utiliser exactement le même chemin d'accès et les mêmes options de domaine que lorsque nous le définissons.
```

Ensemble: [cookie.js](cookie.js).


## Annexe: Cookies tiers

Un cookie est appelé "tiers" s'il est placé par un domaine autre que la page visitée par l'utilisateur.

Par exemple :
1. Une page sur `site.com` charge une bannière d'un autre site: `<img src="https://ads.com/banner.png">`.
2. Parallèlement à la bannière, le serveur distant sur `ads.com` peut définir l'en-tête `Set-Cookie` avec un cookie comme `id=1234`. Ce cookie provient du domaine `ads.com` et ne sera visible que sur `ads.com`:

    ![](cookie-third-party.svg)

3. La prochaine fois que l'on accède à `ads.com`, le serveur distant obtient le cookie `id` et reconnaît l'utilisateur:

    ![](cookie-third-party-2.svg)

4. Ce qui est encore plus important, lorsque les utilisateurs passent de `site.com` à un autre site `other.com` qui a également une bannière, alors `ads.com` obtient le cookie, car il appartient à `ads.com`, reconnaissant ainsi le visiteur et le suivant lorsqu'il se déplace entre les sites:

    ![](cookie-third-party-3.svg)


Les cookies tiers sont traditionnellement utilisés pour les services de suivi et de publicité, en raison de leur nature. Ils sont liés au domaine d'origine, donc `ads.com` peut suivre le même utilisateur entre différents sites, s'ils y accèdent tous.

Naturellement, certaines personnes n'aiment pas être suivies, les navigateurs permettent donc de désactiver ces cookies.

De plus, certains navigateurs modernes utilisent des politiques spéciales pour ces cookies:
- Safari n'autorise pas du tout les cookies tiers.
- Firefox est livré avec une "liste noire" de domaines tiers où il bloque les cookies tiers.


```smart
Si nous chargeons un script à partir d'un domaine tiers, comme `<script src="https://google-analytics.com/analytics.js">`, et que ce script utilise `document.cookie` pour définir un cookie, alors ce cookie n'est pas tiers.

Si un script définit un cookie, peu importe d'où vient le script -- le cookie appartient au domaine de la page Web actuelle.
```

## Appendice : RGPD

Ce sujet n'est pas du tout lié à JavaScript, juste quelque chose à garder à l'esprit lors de la configuration des cookies.

Il existe une législation en Europe appelée RGPD, qui applique un ensemble de règles pour que les sites Web respectent la vie privée des utilisateurs. Et l'une de ces règles est d'exiger une autorisation explicite pour le suivi des cookies d'un utilisateur.

Veuillez noter qu'il s'agit uniquement de suivre/identifier/autoriser les cookies.

Donc, si nous définissons un cookie qui enregistre simplement des informations, mais ne suit ni n'identifie l'utilisateur, nous sommes libres de le faire.

Mais si nous allons définir un cookie avec une session d'authentification ou un identifiant de suivi, un utilisateur doit l'autoriser.

Les sites Web ont généralement deux variantes du RGPD suivant. Vous devez les avoir déjà vus sur le Web:

1. Si un site Web souhaite définir des cookies de suivi uniquement pour les utilisateurs authentifiés.

    Pour ce faire, le formulaire d'inscription doit avoir une case à cocher comme "accepter la politique de confidentialité"» (qui décrit comment les cookies sont utilisés), l'utilisateur doit le vérifier, puis le site Web est libre de définir des cookies d'authentification.

2. Si un site Web souhaite définir des cookies de suivi pour tout le monde.

    Pour ce faire légalement, un site Web affiche un "écran de démarrage" modal pour les nouveaux arrivants et les oblige à accepter les cookies. Ensuite, le site Web peut les définir et laisser les gens voir le contenu. Cela peut cependant être dérangeant pour les nouveaux visiteurs. Personne n'aime voir les écrans de démarrage modaux "à cliquer" au lieu du contenu. Mais le RGPD nécessite un accord explicite.


Le RGPD ne concerne pas seulement les cookies, il concerne également d'autres problèmes liés à la confidentialité, mais cela dépasse de beaucoup notre portée.


## Résumé

`document.cookie` donne accès aux cookies
- les opérations d'écriture ne modifient que les cookies qui y sont mentionnés.
- le nom/la valeur doit être encodé.
- un cookie jusqu'à 4 Ko, plus de 20 cookies par site (dépend d'un navigateur).

Options de cookies :
- `path=/`, par défaut le chemin actuel, rend le cookie visible uniquement sous ce chemin.
- `domain=site.com`, par défaut, un cookie n'est visible que sur le domaine actuel, s'il est défini explicitement sur le domaine, rend le cookie visible sur les sous-domaines.
- `expires` ou `max-age` définit l'heure d'expiration du cookie, sans eux le cookie meurt lorsque le navigateur est fermé.
- `secure` rend le cookie accessibles aux sites HTTPS uniquement.
- `samesite` interdit au navigateur d'envoyer le cookie avec des requêtes provenant de l'extérieur du site, aide à prévenir les attaques XSRF.

Aditionellement :
- Les cookies tiers peuvent être interdits par le navigateur, par exemple Safari le fait par défaut.
- Lors de la configuration d'un cookie de suivi pour les citoyens de l'UE, le RGPD nécessite de demander la permission.
