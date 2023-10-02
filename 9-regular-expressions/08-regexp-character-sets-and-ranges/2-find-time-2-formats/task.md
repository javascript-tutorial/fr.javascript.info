# Trouvez l'heure sous forme hh:mm ou hh-mm

L'heure peut être au format `hours:minutes` ou `hours-minutes`. Les nombres "hours" et "minutes" sont composées de deux chiffres :  `09:00` ou `21-30`.

Écrire une expression rationnelle pour trouver l'heure quelle que soit sa forme :

```js
let regexp = /your regexp/g;
alert("Breakfast at 09:00. Dinner at 21-30".match(regexp)); // 09:00, 21-30
```

P.S. Dans cet exercice, on considère n'importe quelle heure comme valide, il n'y a pas besoin d'exclure une heure comme "45:67" par exemple. Nous nous occuperons de cela plus tard.
