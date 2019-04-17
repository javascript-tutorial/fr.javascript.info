
Backticks incorpore l'expression à l'intérieur de `${...}` dans la chaîne de caractères.

```js run
let name = "Ilya";

// l'expression est un numéro 1
alert( `hello ${1}` ); // hello 1

// l'expression est une chaîne de caractères "name"
alert( `hello ${"name"}` ); // hello name

// l'expression est une variable, il intègre son contenu
alert( `hello ${name}` ); // hello Ilya
```
