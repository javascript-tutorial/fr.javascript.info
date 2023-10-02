# Trouvez des commentaires HTML

Trouvez tous les commentaires HTML dans le texte :

```js
let regexp = /your regexp/g;

let str = `...
<!-- My -- comment
 test --> ..
 <!----> ..
`;

alert(str.match(regexp)); // '<!-- My -- comment \n test -->', '<!---->'
```
