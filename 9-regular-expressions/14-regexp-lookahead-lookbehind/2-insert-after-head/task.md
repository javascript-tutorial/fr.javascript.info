# Insérer après Body

Nous avons une chaîne avec un document HTML.

Écrivez une expression régulière qui insère `<h1>Hello</h1>` immédiatement après la balise `<body>`.
La balise peut avoir des attributs.

Par exemple:

```js
let regexp = /your regular expression/;

let str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;

str = str.replace(regexp, `<h1>Hello</h1>`);
```

Après cela, la valeur de `str` devrait être :
```html
<html>
  <body style="height: 200px"><h1>Hello</h1>
  ...
  </body>
</html>
```
