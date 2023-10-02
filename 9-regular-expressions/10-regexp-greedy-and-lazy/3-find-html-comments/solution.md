Nous devons trouver le début d'un commentaire `match:<!--`, puis tout jusqu'à la fin de `match:-->`.

Une expression régulière possible est `pattern:<!--.*?-->` -- le quantificateur paresseux arrête le point juste avant `match:-->`. Nous avons aussi besoin du marqueur `pattern:s` pour que le point inclue les nouvelles lignes.

Les commentaires multi-lignes ne seraient pas trouvés sans ce marqueur :

```js run
let regexp = /<!--.*?-->/gs;

let str = `... <!-- My -- comment
 test --> ..  <!----> ..
`;

alert(str.match(regexp)); // '<!-- My -- comment \n test -->', '<!---->'
```
