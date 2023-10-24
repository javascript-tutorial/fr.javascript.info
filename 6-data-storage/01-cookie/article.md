# Cookies, document.cookie

Les cookies sont des donnés stockées sous forme de petites chaîne de caractères directement dans le navigateur. Ils font parti du protocole HTTP, ils sont définis par la spécification [RFC 6265](https://tools.ietf.org/html/rfc6265).

Les cookies sont en général définis par le serveur web en utilisant l'entête HTTP `Set-Cookie`. Alors, le navigateur les ajoutent automatiquement à (presque) toutes les requêtes provenant du même domaine en utilisant l'entête HTTP `Cookie`.

L'un des cas d'utilisation les plus répandus est l'authentification :

1. Une fois connecté, le serveur utilise l'entête HTTP `Set-Cookie` dans la réponse pour définir un cookie avec un "identifiant de session" unique.
2. La prochaine fois lorsque la requête est envoyée au même domaine, le navigateur envoie le cookie sur le réseau en utilisant l'entête HTTP `Cookie`.
3. Alors le serveur sait qui a fait la requête.

Nous pouvons aussi accéder aux cookies depuis le navigateur, en utilisant la propriété `document.cookie`.

Il y a beaucoup de chose malignes à faire à propos des cookies et leurs options. Dans ce chapitre nous les couvrirons en détail.

## Lire depuis document.cookie

```online
Votre navigateur stocke t-il des cookies depuis ce site ? Voyons voir :
```

```offline
En considérant que vous êtes sur un site web, il est possible de voir ses cookies, comme ceci :
```

```js run
// Sur javascript.info, nous utilisons Google Analytics pour les statistiques,
// Donc il devrait y avoir quelques cookies
alert( document.cookie ); // cookie1=value1; cookie2=value2;...
```

La valeur de `document.cookie` consiste en des paires `name=value`, délimitées par `; `. Chacune étant un cookie séparé.

Pour trouver un cookie en particulier, nous pouvons diviser `document.cookie` par `; `, et donc trouver le bon nom. Nous pouvons utiliser soit une expression régulière (regex) ou des fonctions de tableau pour faire cela.

Nous laissons cela en tant qu'exercice pour le lecteur. Aussi, à la fin du chapitre vous trouverez des fonctions utilitaires pour manipuler les cookies.

## Écrire dans document.cookie

Nous pouvons écrire dans `document.cookie`. Mais ce n'est pas une propriété de données, c'est un [accesseur (getter/setter)](info:property-accessors). Une affectation à ce dernier est traitée spécialement.

**Une opération d'écriture dans `document.cookie` met à jour seulement les cookies mentionnés dedans, mais ne touche pas les autres cookies.**

Par exemple, cet appel définit un cookie avec le nom `user` et la valeur `John` :

```js run
document.cookie = "user=John"; // Met à jour uniquement le cookie nommé 'user'
alert(document.cookie); // Affiche tous les cookies
```

Si vous exécutez cela, vous verrez probablement plusieurs cookies. Car l'opération `document.cookie=` ne réécrit pas tous les cookies. Elle définit uniquement le cookie `user` mentionné.

Techniquement, le nom et la valeur peuvent être n'importe quel caractère. Pour garder le formattage valide, ils devraient être échappés en utilisant la fonction integrée `encodeURIComponent` :

```js run
// Les caractères spéciaux ont besoin d'encodage
let name = "my name";
let value = "John Smith"

// Encode le cookie en tant que my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith
```

```warn header="Limitations"
Il y a quelques limites :
- La paire `name=value`, après `encodeURIComponent`, ne peut pas excéder 4KB. Donc on ne peut pas stocker quelque chose de trop lourd sur un cookie.
- Le nombre total de cookie par domaine est limité à ~ 20+, la limite exacte dépend du navigateur.
```

Les cookies ont plusieurs options, beaucoup d'entre elles sont importantes et devraient être définies.

Les options sont listées après `key=value`, délimité par `;`, comme ceci :

```js run
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

## path

- **`path=/mypath`**

Le préfix du chemin de l'URL doit être absolu. Ça rend le cookie accessible pour les pages du même chemin. Par défaut, il s'agit du chemin courant.

Si un cookie est défini avec `path=/admin`, il est visible aux pages `/admin` et `/admin/something`, mais pas à `/home` ou `/adminpage`.

Généralement, nous devons définir `path` à la racine `path=/` pour rendre le cookie accessible depuis toutes les pages du site.

## domain

- **`domain=site.com`**

Un domaine définit par où le cookie est accessible. Cependant en pratique, il y a des limites. Nous ne pouvons pas définir n'importe quel domaine.

**Il n'y a pas de moyen de laisser un cookie être accessible depuis un domaine de second niveau, donc `other.com` ne recevra jamais un cookie défini à `site.com`**

Il s'agit d'une restriction de sécurité, pour nous permettre de stocker des données sensibles dans nos cookies qui ne seront disponibles que sur un site.

Par défaut, un cookie est accessible uniquement depuis le domaine qui l'a défini.

Veuillez noter, par défaut un cookie n'est pas partagé avec un sous-domaine, tel que `forum.site.com`.

```js
// Si nous définissons un cookie sur site.com
document.cookie = "user=John"

// ...Nous ne le verrons pas depuis forum.site.com
alert(document.cookie); // no user
```

...Mais cela peut changer. Si nous aimerions permettre aux sous-domaines comme `forum.site.com` de récupérer un cookie défini par `site.com`, c'est possible.

Pour que cela arrive, quand nous definissons un cookie depuis `site.com`, nous pouvons définir l'option `domain` à la racine du domaine : `domain=site.com`. Alors tous les sous-domaines verront un tel cookie.

Par exemple :

```js
// Depuis site.com
// Rendre le cookie accessible à tous les sous-domaines *.site.com:
document.cookie = "user=John; *!*domain=site.com*/!*"

// Plus tard

// Depuis forum.site.com
alert(document.cookie); // Le cookie user=John existe
```

Pour des raisons historiques, `domain=.site.con` (avec un point avant `site.com`) fonctionne de la même manière, permettant l'accés au cookie depuis les sous-domaines. C'est une vielle notation et devrait être utilisée si nous avons besoin de prendre en charge les très vieux navigateurs.

Pour résumer, l'option `domain` permet de rendre un cookie accessible aux sous-domaines.

## expires, max-age

Par défaut, si un cookie n'a pas ces options, il disparait quand le navigateur est fermé. De tels cookies sont appellés "cookies de session"

Pour laisser les cookies survivre à la fermeture du navigateur, nous pouvons soit définir soit l'option `expires` ou `max-age`.

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

La date d'expiration du cookie définit la date, à laquelle le navigateur le supprimera automatiquement.

La date doit être exactement dans ce format, en timezone GMT. Nous pouvons utiliser `date.toUTCString` pour le récupérer. Par exemple, nous pouvons définir le cookie pour qu'il expire dans 1 jour :

```js
// +1 jour depuis maintenant
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```

Si nous définissons `expires` à une date dans le passé, le cookie est supprimé.

- **`max-age=3600`**

Il s'agit d'une alternative à `expires` et elle spécifie l'expiration du cookie en seconde à partir de l'instant.

Si elle est définie à zero ou une valeur négative, le cookie sera supprimé :

```js
// Le cookie mourra dans +1 heure à partir de maintenant
document.cookie = "user=John; max-age=3600";

// Supprime le cookie (le laisser expirer tout de suite)
document.cookie = "user=John; max-age=0";
```

## secure

- **`secure`**

Le cookie devrait être transféré seulement avec HTTPS.

**Par défaut, si nous définissons un cookie à `http://site.com`, alors il apparaitra aussi à `https://site.com` et vice versa.**

Les cookies sont "domain-based", ils ne sont pas distinguables entre les protocoles.

Avec cette option, si un cookie est défini par `https://site.com`, alors il n'apparait pas quand le même site est accédé par HTTP, comme `http://site.com`. Donc si un cookie a un contenu sensible il ne devrait pas être envoyé sur HTTP qui n'est chiffré, le flag `secure` est la bonne chose.

```js
// Considérons que nous soyons sur https:// maintenant
// Définit le cookie pour être sécurisé (seulement accessible par HTTPS)
document.cookie = "user=John; secure";
```

## samesite

Il s'agit d'un nouvel attribut de sécurité `samesite`. Il a été conçu pour protéger de ce qu'on appelle attaques XSRF (cross-site request forgery).

## L'attaque XSRF

Imaginez, vous êtes connecté sur le site `bank.com`. Ce qui signifie : que vous avez un cookie d'authentification sur ce site. Votre navigateur l'envoie à `bank.com` à chaque requête, donc il vous reconnait et effectue toutes les opérations financières sensibles.

Maintenant, pendant que vous naviguez sur le web dans une autre fenêtre, vous arrivez accidentellement sur un autre site `evil.com`. Ce site a du code JavaScript qui soumet un formulaire `<form action="https://bank.com/pay">` à `bank.com` avec les champs qui initient une transaction avec le compte du hacker.

Le navigateur envoie des cookies à chaque fois que vous visitez le site `bank.com`, même si le formulaire a été envoyé depuis `evil.com`. Donc la banque vous reconnait et effectue le paiement.

![](cookie-xsrf.svg)

C'est ce qu'on appelle une attaque "Cross-Site Request Forgery" (XSRF en plus court).

Les vraies banques en sont évidemment protégées. Tous les formulaires générés par `bank.com` ont un champ spécial, un certain "XSRF protection token", qu'une page malveillante ne peut pas générer ou extraire de la page distante. Elle peut y soumettre un formulaire, mais pas récupérer les données. Le site `bank.com` vérifie ce genre de token dans tous les formulaires qu'il reçoit.

Une telle protection prend du temps à mettre en œuvre cependant. Nous avons besoin de nous assurer que tous les formulaires ont le champ de token requis, et nous devons aussi vérifier toutes les requêtes.

### Entrer un cookie avec l'option samesite

L'option `samesite` de cookie fournit un autre moyen de se protéger de telles attaques, cela ne devrait (en théorie) pas nécessiter de "tokens de protections xsrf".

Elle a deux valeurs possible :

- **`samesite=strict` (pareil que `samesite` sans valeur)**

Un cookie avec `samesite=strict` n'est jamais envoyé si un utilisateur vient d'en dehors du même site.

En d'autres termes, qu'importe que l'utilisateur suive un lien de ses mails ou soumette un formulaire provenant d'`evil.com`, ou qu'il fasse des opérations provenants d'un autre domaine, le cookie n'est pas envoyé.

Si le cookie d'authentification a l'option `samesite`, alors l'attaque XSRF n'a aucune chance de se solder par un succés, car une soumission depuis `evil.com` ne vient pas avec les cookies. Donc `bank.com` ne reconnaitra pas l'utilisateur et ne procédera pas au paiement.

La protection est plutôt fiable. Seules les opérations provenants de `bank.com` vont envoyer le cookie `samesite`, e.g. une soumission de formulaire depuis une autre page à `bank.com`.

Bien que, il y a un petit inconvénient.

Quand un utilisateur suit un lien légitime vers `bank.com`, comme depuis ses propres notes, il sera surpris que `bank.com` ne le reconnaisse pas. En effet, les cookies `samesite=strict` ne sont pas envoyés dans ce cas.

Nous pouvons travailler autour de ça avec deux cookies : une pour la "reconnaissance générale", uniquement dans le but de dire : "Salut, John", et un autre pour les opérations de changements de données avec `samesite=strict`. Alors, une personne venant de l'extérieur du site verra un message de bienvenue, mais les paiements devront être initié depuis le site de la banque, pour que le second cookie soit envoyé.

- **`samesite=lax`**

Une approche plus relax qui protège aussi des XSRF et qui ne casse pas l'expérience utilisateur.

Le mode lax, tout comme `strict`, interdit le navigateur à envoyer des cookies quand venu de l'extérieur du site, mais ajoute une exception.

Un cookie `samesite=lax` est envoyé lorsque deux conditions sont réunies :

1. La méthode HTTP est "safe" (e.g. GET, mais pas POST).

  La liste complète des méthodes HTTP safes est dans la [spécification RFC7231](https://tools.ietf.org/html/rfc7231). Basiquement ce sont des méthodes qui peuvent être utilisées pour lire, mais pas pour écrire de données. Elles ne doivent pas effectuer d'opérations de modifications de données. Suivre un lien c'est toujours du GET, la méthode safe.

2. L'opération effectue une navigation de haut niveau (change l'URL dans la barre d'adresse).

  C'est généralement vrai, mais si la navigation est effectuée dans une `<iframe>`, alors ce n'est pas du haut-niveau. Aussi, les méthodes JavaScript n'effectuent aucune navigation, ainsi elles ne conviennent pas.

Donc, que fait `samesite=lax`, il permet les opérations basiques "va à l'URL" à avoir des cookies. E.g. ouvrir un lien depuis des notes satisfait ces conditions.

Mais quelque chose de plus compliqué, comme une requête depuis un autre site ou une soumission de formulaire, perd les cookies.

Si cela vous convient, alors ajouter `samesite=lax` ne cassera probablement pas l'expérience utilisateur et ajoutera une protection.

Dans l'ensemble, `samesite` est une bonne option.

Il y a un inconvénient :

- `samesite` est ignoré (non supporté) par les très vieux navigateurs, datant de 2017 et avant.

**Donc si nous comptions uniquement sur `samesite` pour fournir une protection, alors les anciens navigateurs seraient vulnérables.**

Mais nous pouvons assurément utiliser `samesite` avec d'autres mesures de protections, comme les tokens xsrf, pour ajouter une couche de défense additionnelle et donc, dans le futur, quand les anciens navigateurs mourront, nous pourrons probablement nous passer des tokens xsrf.

## httpOnly

Cette option n'a rien à faire avec JavaScript, mais nous devons la mentionner pour des raisons d'exhaustivité.

Le serveur web utilise l'entête `Set-Cookie` pour définir un cookie. Aussi, il peut définir l'option `httpOnly`.

Cette option interdit à JavaScript d'accéder au cookie. Nous ne pouvons pas voir de tels cookies ou les manipuler en utilisant `document.cookie`.

C'est utilisé en tant que précaution, pour protéger de certaines attaques quand un hacker injecte son propre code JavaScript dans une page et attend qu'un utilisateur visite la page. Ça ne devrait pas être possible du tout, les hackers ne devraient pas être capable d'injecter leur code dans votre site, mais il peut y avoir des bugs qui les laisserai le faire.

Normalement, si ce genre de chose arrive, et qu'un utilisateur visite une page web avec le code JavaScript d'un hacker, alors le code s'exécute et obtient l'accès à `document.cookie` avec les cookies de l'utilisateur contenant les informations d'authentification. C'est mauvais.

Mais si un cookie est `httpOnly`, alors `document.cookie` ne le voit pas, donc il est protégé.

## Annexe : Les fonctions du cookie

Ici un petit ensemble de fonctions qui fonctionnent avec les cookies, plus pratiques que des modifications manuelles de `document.cookie`.

Il existe beaucoup de librairies de cookie pour ça, celles là sont à but démonstratifs. Elles fonctionnent complétement cependant.

### getCookie(name)

Le moyen le plus court d'accéder à un cookie est d'utiliser une [expression régulière](info:regular-expressions).

La fonction `getCookie(name)` retourne un cookie avec le nom donné :

```js
// Retourne le cookie correspondant au nom donné,
// ou undefined si non trouvé
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
```

Ici `new RegExp` est généré dynamiquement, pour faire correspondre `; name=<value>`.

Veuillez noter qu'un cookie a une valeur encodée, donc `getCookie` utilise une fonction `decodeURIComponent` intégrée pour la décoder.

### setCookie(name, value, options)

Définit le cookie `name` à la valeur `valeur` avec `path=/` par défaut (peut être modifié pour ajouter d'autres valeurs par défaut) :

```js run
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // Ajoute d'autres valeurs par défaut si nécessaire
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

```warn header="Mettre à jour ou supprimer doivent utiliser le même path et domain"
Veuillez noter : quand nous mettons à jour ou supprimons un cookie, nous devons utiliser exactement les mêmes options path et domain que lorsque nous l'avions défini
```

Ensemble : [cookie.js](cookie.js).

## Annexe : Les cookies tiers

Un cookie est appellé "tiers" s'il est placé par un domaine autre que la page que l'utilisateur visite.

Par exemple :
1. Une page à `site.com` charge une bannière depuis un autre site : `<img src="https://ads.com/banner.png">`.
2. Le long de la bannière, le serveur distant à `ads.com` peut définir un entête `Set-Cookie` avec un cookie type `id=1234`. Un tel cookie provenant du domaine `ads.com`, et ne sera visible que par `ads.com` :

    ![](cookie-third-party.svg)

3. La prochaine fois que `ads.com` est accéder, le serveur distant récupère le cookie `id` et reconnait l'utilisateur :
 
    ![](cookie-third-party-2.svg)

4. Le plus important c'est que, quand un utilisateur bouge depuis `site.com` vers un autre site `other.com`, qui a lui aussi une bannière, alors `ads.com` récupère le cookie, comme elle appartient à `ads.com`, de fait il reconnait le visiteur et le tracke puisqu'il a bougé entre les sites :

    ![](cookie-third-party-3.svg)

Les cookies tiers sont traditionnellement utilisés pour le tracking et les services publicitaires, en raison de leur nature. Ils sont liés au domaine dont ils proviennent, donc `ads.com` peut tracker le même utilisateur entre différents sites, s'ils y accédent tous.

Naturellement, certaines personnes n'aiment pas être trackées, donc les navigateurs permettent de désactiver ce genre de cookie.

Aussi, les navigateur modernes mettent en place des politiques spéciales pour de tels cookies :
- Safari ne permet pas du tout les cookies tiers
- Firefox vient avec une "black list" de domaines tiers où sont bloqués les cookies tiers.

```smart
Si nous chargeons un script d'un domaine tiers, comme `<script src="https://google-analytics.com/analytics.js">`, et que ce script utilise `document.cookie` pour définir un cookie, alors un tel cookie n'est pas un cookie tiers.

Si un script définit un cookie, alors peu importe d'où vient le script -- le cookie appartient au domaine de la page courante.
```

## Annexe : RGPD

Ce sujet n'est pas lié à JavaScript du tout, il s'agit de quelque chose à garder à l'esprit quand nous définissons des cookies.

Il y a une législation en Europe appellée RGPD, qui force les sites web à suivre un ensemble de règle pour respecter la vie privée de l'utilisateur. L'une de ces règles est de nécessiter une permission explicite de l'utilisateur pour les cookies de tracking.

Veuillez noter, ça concerne seulement les cookies de tracking/identification/autorisation.

Donc, si nous définissons un cookie pour sauvegarder certaines informations, mais sans tracker ni identifier l'utilisateur, nous sommes libre de le faire.

Mais si nous allons définir un cookie avec une session d'authentification ou un identifiant de tracking, alors l'utilisateur doit le permettre.

Les sites web ont généralement deux variantes pour suivre le RGPD. Vous devez les avoir déjà vu sur le web :

1. Si un site web veut définir des cookies de tracking uniquement pour les utilisateurs authentifiés.

    Pour faire ça, le formulaire d'enregistrement doit avoir une case à cocher comme "Accepter la politique sur la vie privée" (qui décrit comment les cookies sont utilisés), l'utilisateur doit la cocher, et alors le site web est libre de définir des cookies d'authentification.

2. Si un site web veut définir des cookies de tracking pour tout le monde.

    Pour faire ça légalement, un site web affiche une fenêtre contextuelle "de démarrage" pour les nouveaux venus, et nécessite qu'ils acceptent les cookies. Alors le site web peut les définir et laisser les gens voir le contenu. Ça peut être dérangeant pour les nouveaux visiteurs cependant. Personne n'aime voir de tel fenêtre contextuelle "doit cliquer" plutôt que le contenu. Mais le RGPD requiert un accord explicite.

Le RGPD ne concerne pas uniquement les cookies, ça concerne aussi les trucs d'ordres personnels. Mais ça va au delà de notre portée.

## Résumé

`document.cookie` fournit un accès aux cookies.
- Les opérations d'écriture modifient uniquement les cookies qu'elles mentionnent.
- Name/value doivent être encodés.
- Un cookie ne peut pas excéder 4KB en taille. Le nombre de cookies permis sur un domaine est d'environ 20+ (variable selon le navigateur)

Les options de cookies sont :

- `path=/`, par défaut le chemin courant, rend les cookies visibles uniquement sous ce chemin.
- `domain=site.com`, par défaut un cookie est visible seulement sur le domaine courant. Si le domaine est défini explicitement, le cookie devient visible depuis les sous domaines.
- `expires` ou `max-age` définissent la date d'expiration du cookie. Sans eux le cookie meurt à la fermeture du navigateur.
- `secure` empêche le navigateur d'envoyer un cookie avec les requêtes en dehors du site. Ça aide à prévenir des attaques XSRF.

Additionnellement :

- Les cookies tiers peuvent être interdis par le navigateur, e.g. Safari le fait par défaut.
- Quand nous définissons un cookie de tracking pour les citoyens Européens, le RGPD nécessite qu'on en demande la permissions.
