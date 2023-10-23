# Cookies, document.cookie

Les cookies sont des petites chaînes de donnés stockées directement dans le navigateur. Ils font partie du protocole HTTP, ils sont définis par la spécification [RFC 6265](https://tools.ietf.org/html/rfc6265) specification.

Les cookies sont en général définit par le serveur web en utilisant l'entête HTTP `Set-Cookie`. Alors, le navigateur les ajoutes automatiquement à (presque) toutes les requêtes provenant du même domaine en utilisant l'entête HTTP `Cookie`.

L'un des cas d'utilisation les plus répandus est l'authentification :

1. Une fois connecté, le serveur utilise l'entête HTTP `Set-Cookie` dans la réponse pour définir a cookie avec un "identifiant de session" unique.
2. La prochaine fois quand la requête est envoyée au même domaine, le navigateur envoie le cookie sur le réseau en utilisant l'entête HTTP `Cookie`.
3. Alors le serveur sait qui a fait la requête.

Nous pouvons aussi accéder aux cookies depuis le navigateur, en utilisant la propriété `document.cookie`.

Il y a beaucoup de chose malignes à faire à propos des cookies and leurs options. Dans ce chapitre nous les couvrirons en détail.

## Lecture depuis document.cookie

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