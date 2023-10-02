# Ancres : début ^ et fin $ d'une chaîne de caractères

L'accent circonflexe `pattern:^` et le signe dollar `pattern:$` ont une signification particulière dans une regexp.
Ils sont appelés "ancres".

L'accent circonflexe `pattern:^` correspond au début du texte, et le signe dollar `pattern:$` -- à la fin.

Par exemple, testons si le texte commence par `Mary`:

```js run
let str1 = "Mary had a little lamb";
alert(/^Mary/.test(str1)); // true
```

Le paterne `pattern:^Mary` signifie : "le texte commence puis Mary".

Similairement, nous pouvons vérifier si le texte termine par `snow` en utilisant `pattern:snow$`:

```js run
let str1 = "its fleece was white as snow";
alert(/snow$/.test(str1)); // true
```

In these particular cases we could use string methods `startsWith/endsWith` instead.
Regular expressions should be used for more complex tests.

## Test pour une correspondance complète

Les deux ancres mises ensemble `pattern:^...$` pour vérifier si une chaîne de caractères correspond entièrement à un paterne.
Par exemple, pour vérifier si l'entrée de l'utilisateur est dans le bon format.

Vérifions si une chaîne de caractères est une heure au format `12:34`.
En résumé : deux nombres, puis deux points, et enfin deux autres nombres.

Dans le langage des expressions régulières, c'est `pattern:\d\d:\d\d`:

```js run
let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
alert(regexp.test(goodInput)); // true
alert(regexp.test(badInput)); // false
```

Ici, la correspondance pour `pattern:\d\d:\d\d` doit commencer juste après le début du texte `pattern:^`, et la fin `pattern:$` doit immédiatement suivre.

La chaîne entière doit être dans ce format.
S'il y a la moindre déviation ou le moindre caractère de trop, le résultat sera `false`.

Les ancres agissent différemment si le marqueur `pattern:m` est présent.
Nous verrons cela dans le prochain article.

```smart header="Les ancres n'ont \"aucune longueur\""
Les ancres `pattern:^` et `pattern:$` sont des tests.
Elles n'ont aucune longueur.

En d'autres termes, elles ne vérifient pas un caractère, mais forcent plutôt le moteur à vérifier une condition (le texte commence/termine).
```
