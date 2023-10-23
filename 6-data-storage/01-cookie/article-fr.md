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

La valeur de `document.cookie` consiste en des pairs `name=value`, délimité par `; `. Chacun est un cookie séparé.

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
