# Trouver des balises HTML

Écrire une expression régulière pour trouver toute balise HTML (ouvrante ou fermante) avec leurs attributs.

Exemple d'usage :

```js run
let regexp = /your regexp/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert( str.match(regexp) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

Pour simplifier un peu, nous considérons ici qu'une balise ne peut pas contenir de `<` ou `>` (même à l'intérieur de guillemets).
