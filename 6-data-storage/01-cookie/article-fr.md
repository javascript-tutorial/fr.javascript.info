# Cookies, document.cookie

Les cookies sont des petites chaînes de donnés stockées directement dans le navigateur. Ils font partie du protocole HTTP, ils sont définis par la spécification [RFC 6265](https://tools.ietf.org/html/rfc6265) specification.

Les cookies sont en général définit par le serveur web en utilisant l'entête HTTP `Set-Cookie`. Alors, le navigateur les ajoutes automatiquement à (presque) toutes les requêtes provenant du même domaine en utilisant l'entête HTTP `Cookie`.

L'un des cas d'utilisation les plus répandus est l'authentification :

1. Une fois connecté, le serveur utilise l'entête HTTP `Set-Cookie` dans la réponse pour définir a cookie avec un "identifiant de session" unique.
2. La prochaine fois quand la requête est envoyée au même domaine, le navigateur envoie le cookie sur le réseau en utilisant l'entête HTTP `Cookie`.
3. Alors le serveur sait qui a fait la requête.

Nous pouvons aussi accéder aux cookies depuis le navigateur, en utilisant la propriété `document.cookie`.

Il y a beaucoup de chose malignes à faire à propos des cookies and leurs options. Dans ce chapitre nous les couvrirons en détail.

## Lire depuis document.cookie

```online
Votre navigateur stocke t-il des cookies depuis ce site ? Voyons voir :
```

```offline
En admettant que vous êtes sur un site web, il est possible de voir ses cookies, comme ça :
```

```js run
// Sur javascript.info, nous utilisons Google Analytics pour les statistiques,
// Donc il devrait y avoir quelques cookies
alert( document.cookie ); // cookie1=value1; cookie2=value2;...
```

La valeur de `document.cookie` consiste en des paires `name=value`, délimité par `; `. Chacun est un cookie séparé.

Pour trouver un cookie en particulier, nous pouvons divisé `document.cookie` par `; `, et donc trouver le bon nom. Nous pouvons utiliser soit une expression régulière (regex) ou les fonctions de tableau pour faire cela.

Nous laissons ça en tant qu'exercice pour le lecteur. Aussi, à la fin du chapitre vous trouverez des fonctions utilitaires pour manipuler les cookies.

## Écrire depuis document.cookie

Nous pouvons écrire avec `document.cookie`. Mais ce n'est pas une propriété de données, c'est un [accesseur (getter/setter)](info:property-accessors). Une affectation à ça est traitée de façon particulière.

**Une opération d'écriture à `document.cookie` met à jour seulement les cookies mentionnés dedans, mais ne touche pas les autres cookies.**

Par exemple, cet appel définit un cookie avec le nom `user` et la valeur `John` :

```js run
document.cookie = "user=John"; // Met à jour uniquement le cookie nommé 'user'
alert(document.cookie); // Affiche tous les cookies
```

Si vous exécutez ça, vous verrez probablement plusieurs cookies. Car l'opération `document.cookie=` ne réécrit pas tous les cookies. Elle définit uniquement le cookie `user` mentionné.

Techniquement, le nom et la valeur peuvent être n'importe quel caractère. Pour garder un formattage valide, ils devraient pouvoir être échappés en utilisant la fonction integrée `encodeURIComponent` :

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
- La paire `name=value`, après `encodeURIComponent`, ne peut pas excéder 4KB. Donc on ne peut pas stocker quelque chose trop lourd sur un cookie.
- Le nombre total de cookie par domaine est limité à ~ 20+, la limite exacte dépend du navigateur.
```

Les cookies ont plusieurs options, beaucoup d'entre elles sont importantes et devraient être définies.

Les options sont listées après `key=value`, délimité par `;`, comme ça :

```js run
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

## path

- **`path=/mypath`**

Le préfix du chemin de l'URL doit être absolu. Ça rend le cookie accessible depuis les pages du même chemin. Par défaut, c'est le chemin courant.

Si un cookie est défini avec `pah=/admin`, il est visible depuis les pages `/admin` et `/admin/something`, mais pas depuis `/home` ou `/adminpage`.

Généralement, nous devons définir `path` à la racine `path=/` pour rendre le cookie accessible depuis toutes les pages du site.

## domain

- **`domain=site.com`**

Un domaine définit où le cookie est accessible. Cependant en pratique, il y a des limites. Nous ne pouvons pas définir n'importe quel domaine.

**Il n'y a pas de moyen de laisser un cookie être accessible depuis un domaine de second niveau, donc `other.com` ne recevra jamais un cookie défini à `site.com`**

C'est une restriction de sécurité, pour nous permettre de stocker des données sensible dans nos cookies qui ne seront disponibles que sur un site.

Par défaut, un cookie est accessible uniquement depuis le domaine qui l'a définit.

Veuillez noter, par défaut un cookie n'est pas partagé avec un sous-domaine, tel que `forum.site.com`.


```js
// Si nous définissons un cookie sur site.com
document.cookie = "user=John"

// ...Nous ne le verrons pas depuis forum.site.com
alert(document.cookie); // no user
```

...Mais ça peut changer. Si nous voulions permettre aux sous-domaines comme `forum.site.com` de récupérer un cookie défini par `site.com`, c'est possible.

Pour que ça arrive, quand nous definissons un cookie depuis `site.com`, nous pouvons définir l'option `domain` à la racine du domaine : `domain=site.com`. Alors tous les sous-domaines verront un tel cookie.

Par exemple :

```js
// Depuis site.com
// Rendre le cookie accessible à tous les sous-domaines *.site.com:
document.cookie = "user=John; *!*domain=site.com*/!*"

// Plus tard

// Depuis forum.site.com
alert(document.cookie); // Le cookie user=John existe
```

Pour des raisons historiques, `domain=.site.con` (avec un point avant `site.com`) fonctionne de la même manière, permettant l'accés au cookie depuis les sous-domaines. C'est une vielle façon de faire et pourrait être utilisée si nous voulons prendre en charge les très vieux navigateurs.

Pour résumer, l'option `domain` permet de rendre un cookie accessible aux sous-domaines.

## expires, max-age

Par défaut, si un cookie n'a pas ces options, il disparait quand le navigateur est fermé. De tels cookies sont appellés "cookies de session"

Pour laisser les cookies survivre à la fermeture du navigateur, nous pouvons soit définir l'option `expires` ou `max-age`.

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

La date d'expiration du cookie définit le temps, quand le navigateur va automatiquement le supprimer.

La date doit être exactement dans ce format, en timezone GMT. Nous pouvons utiliser `date.toUTCString` pour le récupérer. Par exemple, nous pouvons définir le cookie pour qu'il expire dans 1 jour :

```js
// +1 jour depuis maintenant
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```

Si nous définissons `expires` à une date antérieure dans le temps, le cookie est supprimé.

- **`max-age=3600`**

C'est une alternative à `expires` et elle spécifie l'expiration du cookie en seconde à partir de l'instant.

Si elle est définie à zero ou une valeur négative, le cookie sera supprimé :

```js
// Le cookie mourra dans +1 heure à partir de maintenant
document.cookie = "user=John; max-age=3600";

// Supprime le cookie (le laisser expirer tout de suite)
document.cookie = "user=John; max-age=0";
```

## secure

- **`secure`**

Le cookie pourrait être transféré avec HTTPS.

**Par défaut, si nous définissons un cookie depuis `http://site.com`, alors il apparaitra aussi depuis `https://site.com` et vice versa.**

Les cookies sont "domain-based", ils ne sont pas distinguables entre les protocoles.

Avec cette option, si un cookie est défini par `https://site.com`, alors il n'apparait pas quand le même site est accéder par HTTP, comme `http://site.com`. Donc si un cookie a un contenu sensible il ne devrait pas être envoyé sur HTTP qui est non chiffré, le flag `secure` est la bonne chose.

```js
// Admettons que nous soyons sur https:// maintenant
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

Une telle protection prend du temps à implémenter cependant. Nous avons besoin de nous assurer que tous les formulaires ont le champ de token requis, et nous devons aussi vérifier toutes les requêtes.

### Entrer un cookie avec l'option samesite

L'option `samesite` de cookie fournit un autre moyen de se protéger de telles attaques, ça (en théorie) ne devrait pas nécessiter de "tokens de protections xsrf".

Elle a deux valeurs possible :

- **`samesite=strict` (pareil que `samesite` sans valeur)**

Un cookie avec `samesite=strict` n'est jamais envoyé si un utilisateur vient d'en dehors du même site.

En d'autres termes, qu'importe que l'utilise suive un lien de ses mails ou soumette un formulaire provenant d'`evil.com`, ou qu'il fasse des opérations originaires d'un autre domaine, le cookie n'est pas envoyé.

Si le cookie d'authentification a l'option `samesite`, alors l'attaque XSRF n'a aucun chance d'être un succés, car une soumission depuis `evil.com` ne vient pas avec les cookies. Donc `bank.com` ne reconnaitra pas l'utilisateur et ne procédera pas au paiement.

La protection est plutôt fiable. Seules les opérations provenants de `bank.com` vont envoyés le cookie `samesite`, e.g. une soumission de formulaire depuis une autre page à `bank.com`.

Bien que, il y a un petit inconvénient.

Quand un utilisateur suit un lien légitime vers `bank.com`, comme depuis ses propres notes, il sera surpris que `bank.com` ne le reconnaisse pas. En effet, les cookies `samesite=strict` ne sont pas envoyés dans ce cas.

Nous pouvons travailler autour de ça avec deux cookies : une pour la "reconnaissance générale", uniquement dans le but de dire : "Salut, John", et un autre pour les opérations de changements de données avec `samesite=strict`. Alors, une personne venant de l'extérieur du site verra un message de bienvenue, mais les paiements doivent être initié depuis le site de la banque, pour que le second cookie soit envoyé.

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

Si ça vous convient, alors ajouter `samesite=lax` ne cassera probablement pas l'expérience utilisateur et ajoutera une protection.

Dans l'ensemble, `samesite` est une bonne option.

Il y un inconvénient :

- `samesite` est ignoré (non supporté) par les très vieux navigateurs, de 2017 et avant.

**Donc si nous comptions uniquement sur `samesite` pour fournir une protection, alors les anciens navigateurs seraient vulnérables.**

Mais nous pouvons sûrement utiliser `samesite` avec d'autres mesures de protections, comme les tokens xsrf, pour ajouter une couche de défense additionnelle et donc, dans le futur, quand les anciens navigateurs mourreront, nous pourrons probablement nous passer des tokens xsrf.