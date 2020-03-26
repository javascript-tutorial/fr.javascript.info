Nous avons besoin de `Origin`, car parfois `Referer` est absent. Par exemple, lorsque nous faisons un `fetch` de la page HTTP à partir de la page HTTPS (accès moins sécurisé de plus sécurisé), il n'y a pas de `Referer`.

Le [Content Security Policy](http://en.wikipedia.org/wiki/Content_Security_Policy) peut interdire l'envoi d'un `Referer`.

Comme nous le verrons, `fetch` a des options qui empêchent d'envoyer le` Referer` et permettent même de le changer (dans le même site).

Par spécification, `Referer` est un en-tête HTTP facultatif.

Précisément parce que `Referer` n'est pas fiable, `Origin` a été inventé. Le navigateur garantit une origine correcte pour les requêtes cross-origin.
