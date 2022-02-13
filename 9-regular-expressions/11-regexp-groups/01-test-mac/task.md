# Vérification d'adresse MAC

L'[addresse MAC](https://fr.wikipedia.org/wiki/Adresse_MAC) d'une interface réseau est constitué de 6 paires de nombres hexadécimaux séparées par un double point.

Par exemple : `subject:'01:32:54:67:89:AB'`.

Écrire une regexp qui vérifie qu'une chaîne de caractères soit bien une adresse MAC.

Utilisation:
```js
let regexp = /your regexp/;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false (double point manquant)

alert( regexp.test('01:32:54:67:89') ); // false (5 paires, mais 6 attendues)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ à la fin)
```
