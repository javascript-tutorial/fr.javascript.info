# Trouver les chaines de caractère

Créer une regexp pour trouver les chaines de caractère entre guillemets doubles `subject:"..."`.

La chaine de caractère devrait supporter l'échappement, comme les chaines de caractère JavaScript. Par exemple, des guillemets peuvent être insérés comme ceci `subject:\"` une nouvelle ligne comme `subject:\n`, et un antislash comme `subject:\\`.

```js
let str = "Just like \"here\".";
```

Veuillez noter qu'une guillemet échapée `subject:\"` ne termine pas une chaine de caractère.

Nous devrions donc chercher une guillemet puis la suivante en ignorant celles échapées.

C'est la partie essentielle de la tâche, à part cela, cela devrait être simple.

Exemple de chaine de caractère valides :
```js
.. *!*"test me"*/!* ..
.. *!*"Say \"Hello\"!"*/!* ... (guillemets échapées à l'intérieur)
.. *!*"\\"*/!* ..  (double backslash à l'intérieur)
.. *!*"\\ \""*/!* ..  (double backslash et guillemets échapées à l'intérieur)
```

En Javascript nous devons doubler les slash pour les placer dans la chaine de caractère, comme ceci :

```js run
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

// the in-memory string
alert(str); //  .. "test me" .. "Say \"Hello\"!" .. "\\ \"" ..
```
