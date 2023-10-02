# Trouver des couleurs au format #abc ou #abcdef

Écrire une RegExp qui correspond à des couleurs au format `#abc` ou `#abcdef`.
C'est à dire : `#` suivi par 3 ou 6 chiffres hexadécimaux.

Exemple d'utilisation :
```js
let regexp = /your regexp/g;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert(str.match(regexp)); // #3f3 #AA00ef
```

P.S.
Cela doit être exactement 3 ou 6 chiffres.
Des valeurs avec 4 chiffres, comme `#abcd`, ne doivent pas ressortir.
