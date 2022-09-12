# Trouver les chaines de caractère

Créer une regexp pour trouver les chaines de caractère entre guillemets doubles `subject:"..."`.

<<<<<<< HEAD
La chaine de caractère devrait supporter l'échappement, comme les chaines de caractère JavaScript. Par exemple, des guillemets peuvent être insérés comme ceci `subject:\"` une nouvelle ligne comme `subject:\n`, et un antislash comme `subject:\\`.
=======
The strings should support escaping, the same way as JavaScript strings do. For instance, quotes can be inserted as `subject:\"` a newline as `subject:\n`, and the backslash itself as `subject:\\`.
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

```js
let str = "Just like \"here\".";
```

Veuillez noter qu'une guillemet échapée `subject:\"` ne termine pas une chaine de caractère.

Nous devrions donc chercher une guillemet puis la suivante en ignorant celles échapées.

C'est la partie essentielle de la tâche, à part cela, cela devrait être simple.

Exemple de chaine de caractère valides :
```js
<<<<<<< HEAD
.. *!*"test me"*/!* ..
.. *!*"Say \"Hello\"!"*/!* ... (guillemets échapées à l'intérieur)
.. *!*"\\"*/!* ..  (double slash à l'intérieur)
.. *!*"\\ \""*/!* ..  (double slash et guillemets échapées à l'intérieur)
```

En Javascript nous devons doubler les slash pour les placer dans la chaine de caractère, comme ceci :
=======
.. *!*"test me"*/!* ..  
.. *!*"Say \"Hello\"!"*/!* ... (escaped quotes inside)
.. *!*"\\"*/!* ..  (double backslash inside)
.. *!*"\\ \""*/!* ..  (double backslash and an escaped quote inside)
```

In JavaScript we need to double the backslashes to pass them right into the string, like this:
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

```js run
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

// the in-memory string
alert(str); //  .. "test me" .. "Say \"Hello\"!" .. "\\ \"" ..
```
