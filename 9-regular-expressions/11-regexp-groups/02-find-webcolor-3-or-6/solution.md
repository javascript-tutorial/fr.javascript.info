Une regexp pour chercher une couleur à trois chiffres `#abc`: `pattern:/#[a-f0-9]{3}/i`.

Nous pouvons y ajouter les 3 autres chiffres optionnels. Nous n'avons pas besoin de plus ou moins. La couleur a soit 3 ou 6 chiffres.

Utilisons le quantificateur `pattern:{1,2}` pour obtenir `pattern:/#([a-f0-9]{3}){1,2}/i`.

Ici le schéma `pattern:[a-f0-9]{3}` est entouré de parenthèses pour lui appliquer le quantificateur `pattern:{1,2}`.

En pratique :

```js run
let regexp = /#([a-f0-9]{3}){1,2}/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert(str.match(regexp)); // #3f3 #AA00ef #abc
```

Il reste un petit problème ici : car ce schéma trouve `match:#abc` dans `subject:#abcd`. Pour éviter cela nous pouvons ajouter à la fin `pattern:\b` :

```js run
let regexp = /#([a-f0-9]{3}){1,2}\b/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert(str.match(regexp)); // #3f3 #AA00ef
```
