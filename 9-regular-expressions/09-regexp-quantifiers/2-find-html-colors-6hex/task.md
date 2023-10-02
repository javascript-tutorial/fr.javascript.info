# Regexp pour couleurs HTML

Créez une regexp pour trouver les couleurs HTML écrites comme `#ABCDEF`: d'abord `#` puis 6 caractères hexadécimaux.

Exemple d'utilisation:

```js
let regexp = /...votre regexp.../

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert(str.match(regexp))  // #121212,#AA00ef
```

P.S. Dans cette tâche nous n'avons pas besoin des autres formats de couleur comme `#123` ou `rgb(1,2,3)` etc.
