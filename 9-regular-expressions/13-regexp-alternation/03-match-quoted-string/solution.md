La solution : `pattern:/"(\\.|[^"\\])*"/g`.

Etape par etape :

- D'abord nous recherchons une guillemet ouvrante `pattern:"`
- Ensuite si nous avons un antislash `pattern:\\` (puisque c'est un caractère spécial nous devons le doubler, mais dans les faits c'est un unique antislash), alors n'importe quel caractère peut se trouver à sa suite (un point).
- Sinon nous prenons n'importe quel caractère à part une guillemet (cela signifierait la fin de la chaine de caractère) et un antislash (pour empêcher les antislash solitaires, un antislash est seulement utilisé avec un autre symbole après lui): `pattern:[^"\\]`
- ...Et on continue jusqu'à atteindre la guillemet fermante.

En action :

```js run
let regexp = /"(\\.|[^"\\])*"/g;
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

alert( str.match(regexp) ); // "test me","Say \"Hello\"!","\\ \""
```
