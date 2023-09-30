Les backticks incorporent l'expression à l'intérieur de `${...}` dans la chaîne de caractères.

```js run
let name = "Ilya";

// L'expression est un numéro 1
alert( `hello ${1}` ); // hello 1

// L'expression est une chaîne de caractères "name"
alert( `hello ${"name"}` ); // hello name

// L'expression est une variable, il intègre son contenu
alert( `hello ${name}` ); // hello Ilya
```
