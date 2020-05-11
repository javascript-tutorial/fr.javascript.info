# Mode multiligne des ancres ^ $, marqueur "m"

Le mode multiligne est activé avec le marqueur `pattern:m`.

Il affecte seulement le fonctionnement des ancres `pattern:^` et `pattern:$`.

Dans le mode multiligne, elles ne vérifient pas seulement le début et la fin d'une chaîne de caractères, mais également le début et la fin d'une ligne.

## Recherche au début de ligne ^

Dans l'exemple ci-dessous, le texte comporte plusieurs lignes. Le pattern `pattern:/^\d/gm` prend un chiffre au début de chaque ligne:

```js run
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;

*!*
alert( str.match(/^\d/gm) ); // 1, 2, 3
*/!*
```

Sans le marqueur `pattern:m`, seul le premier chiffre est renvoyé :

```js run
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;

*!*
alert( str.match(/^\d/g) ); // 1
*/!*
```

Cela est dû au fait que, par défaut, l'accent circonflexe `pattern:^` ne vérifie que le début d'un texte, et dans le mode multiligne -- le début de n'importe quelle ligne.

```smart
"Début de ligne" désigne formellement "immédiatement après un saut à la ligne" : le test  `pattern:^` en mode multiligne vérifie à toutes les positions suivant un caractère de retour à la ligne `\n`, en plus du début du texte.
```

## Recherche en fin de ligne $

Le signe dollar `pattern:$` se comporte similairement.

L'expression régulière `pattern:\d$` prend le premier chiffre à la fin de chaque ligne.

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

alert( str.match(/\d$/gm) ); // 1,2,3
```

Sans le marqueur `pattern:m`, le signe dollar `pattern:$` vérifierait uniquement la fin de tout le texte, donc uniquement le tout dernier chiffre serait trouvé.

```smart
"Fin de ligne" désigne formellement "immédiatement avant un saut à la ligne" : le test  `pattern:$` en mode multiligne vérifie à toutes les positions précédant un caractère de retour à la ligne `\n`, en plus de la fin du texte.
```

## Recherche de \n au lieu de ^ $

Pour chercher un retour à la ligne, nous pouvons non seulement utiliser les ancres `pattern:^` et `pattern:$`, mais également le caractère de retour à la ligne `\n`.

Quelle est la différence ? Regardons un exemple.

Ici, nous cherchons `pattern:\d\n` au lieu de `pattern:\d$`:

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

alert( str.match(/\d\n/gm) ); // 1\n,2\n
```

Comme nous pouvons le voir, il y a 2 correspondances au lieu de 3.

C'est parce qu'il n'y a pas de retour à la ligne après `subject:3` (il y a la fin du texte cependant, donc ça correspond avec `pattern:$`).

Une autre différence : maintenant, chaque correspondance inclue un caractère de retour à la ligne `match:\n`. Contrairement aux ancres `pattern:^` `pattern:$`, qui ne testent qu'une condition (début/fin d'une ligne), `\n` est un caractère, donc il devient une partie du résultat.

Ainsi, un `\n` dans le pattern est utilisé quand nous avons besoin dudit caractère dans le résultat, tandis que les ancres sont utilisées pour chercher quelque chose au début/à la fin d'une ligne.
