# Insérer après Body

Nous avons une chaîne avec un document HTML.

Écrivez une expression régulière qui insère `<h1>Hello</h1>` immédiatement après la balise `<body>`. La balise peut avoir des attributs.

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

<<<<<<< HEAD
Après cela, la valeur de `str` devrait être :
=======
After that the value of `str` should be:

>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c
```html
<html>
  <body style="height: 200px"><h1>Hello</h1>
  ...
  </body>
</html>
```
