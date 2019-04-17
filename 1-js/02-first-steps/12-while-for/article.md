# Boucles : while et for

Nous avons souvent besoin d'effectuer des actions similaires plusieurs fois de suite.

Par exemple, lorsque nous devons extraire des marchandises d'une liste les unes à la suite des autres. Ou exécutez simplement le même code pour chaque numéro de 1 à 10.

*Les boucles* permettent de répéter plusieurs fois la même partie du code.

## La boucle "while"

La boucle `while` a la syntaxe suivante :

```js
while (condition) {
  // code
  // appelé "loop body" ("corps de boucle")
}
```

Tant que la `condition` est `true`, le `code` du corps de la boucle est exécuté.

Par exemple, la boucle ci-dessous affiche `i` tant que `i < 3` :

```js run
let i = 0;
while (i < 3) { // affiche 0, puis 1, puis 2
  alert( i );
  i++;
}
```

Une unique exécution du corps de la boucle est appelée **une itération**. La boucle dans l'exemple ci-dessus fait trois itérations.

S'il n'y avait pas d'`i++` dans l'exemple ci-dessus, la boucle se répèterait (en théorie) pour toujours. En pratique, le navigateur fournit des moyens d’arrêter ces boucles, et pour JavaScript côté serveur, nous pouvons tuer le processus.

Toute expression ou variable peut être une condition de boucle, pas seulement une comparaison. Ils sont évalués et convertis en un booléen par `while`.

Par exemple, le moyen le plus court d'écrire `while (i != 0)` pourrait être `while (i)` :

```js run
let i = 3;
*!*
while (i) { // quand i devient 0, la condition devient fausse et la boucle s'arrête
*/!*
  alert( i );
  i--;
}
```

````smart header="Les accolades ne sont pas requis pour un corps à une seule ligne"
Si le corps de la boucle a une seule déclaration, nous pouvons omettre les accolades `{…}` :

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## La boucle "do…while"

La vérification de la condition peut être déplacée *sous* le corps de la boucle en utilisant la syntaxe `do..while` :

```js
do {
  // corps de la boucle
} while (condition);
```

La boucle exécute d'abord le corps, puis vérifie la condition et, tant que c'est vrai, l'exécute encore et encore.

Par exemple :

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

Cette forme de syntaxe est rarement utilisée, sauf lorsque vous souhaitez que le corps de la boucle s'exécute **au moins une fois**, quelle que soit la condition. Habituellement, l'autre forme est préférée : `while(…) {…}`.

## La boucle "for"

La boucle `for` est la plus utilisée.

Cela ressemble à ceci :

```js
for (début; condition; étape) {
  // ... corps de la boucle ...
}
```

Apprenons la signification de ces parties par l'exemple. La boucle ci-dessous exécute `alert(i)` pour `i` en partant de `0` jusqu'à (mais non compris) `3` :

```js run
for (let i = 0; i < 3; i++) { // affiche 0, puis 1, puis 2
  alert(i);
}
```

Examinons la déclaration `for` partie par partie :

| partie    |            |                                                                                        |
|-----------|------------|----------------------------------------------------------------------------------------|
| début     | `i = 0`    | Exécute une fois en entrant dans la boucle.                                            |
| condition | `i < 3`    | Vérifié avant chaque itération de la boucle, en cas d'échec, la boucle s'arrête.       |
| étape     | `i++`      | Exécute après le corps à chaque itération, mais avant la vérification de la condition. |
| corps     | `alert(i)` | Exécute encore et encore tant que la condition est vraie                               |


L'algorithme de boucle général fonctionne comme ceci :
```
Exécuter le début
→ (si condition → exécuter le corps et exécuter l'étape)
→ (si condition → exécuter le corps et exécuter l'étape)
→ (si condition → exécuter le corps et exécuter l'étape)
→ ...
```

Si vous ne connaissez pas les boucles, alors il serait peut-être utile de revenir à l'exemple et de reproduire le déroulement pas à pas sur une feuille de papier.

Voici ce qui se passe exactement dans notre cas :

```js
// for (let i = 0; i < 3; i++) alert(i)

// exécute début
let i = 0
// si condition → exécuter le corps et exécuter l'étape
if (i < 3) { alert(i); i++ }
// si condition → exécuter le corps et exécuter l'étape
if (i < 3) { alert(i); i++ }
// si condition → exécuter le corps et exécuter l'étape
if (i < 3) { alert(i); i++ }
// ... fini, parce que maintenant i == 3
```

````smart header="Déclaration de variable en ligne"
Ici, la variable "counter" `i` est déclarée directement dans la boucle. Cela s'appelle une déclaration de variable "en ligne". De telles variables ne sont visibles que dans la boucle.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // erreur, pas de variable
```

Au lieu de définir une variable, nous pouvons en utiliser une existante :

```js run
let i = 0;

for (i = 0; i < 3; i++) { // utiliser une variable existante
  alert(i); // 0, 1, 2
}

alert(i); // 3, visible, car déclaré en dehors de la boucle
```

````


### Sauter des parties

Toute partie de `for` peut être ignorée.

Par exemple, nous pouvons omettre `le début` si nous n'avons rien à faire au début de la boucle.

Comme ici :

```js run
let i = 0; // nous avons i déjà déclaré et assigné

for (; i < 3; i++) { // pas besoin de "début"
  alert( i ); // 0, 1, 2
}
```

Nous pouvons également supprimer la partie `étape` :

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

La boucle est devenue identique à `while (i < 3)`.

Nous pouvons tout supprimer, créant ainsi une boucle infinie :

```js
for (;;) {
  // répète sans limites
}
```

Veuillez noter que les deux les points-virgules `;` de `for` doivent être présents, sinon ce serait une erreur de syntaxe.

## Briser la boucle

Normalement, la boucle sort quand la condition devient fausse.

Mais nous pouvons forcer la sortie à tout moment. Il y a une directive spéciale appelée `break` pour cela.

Par exemple, la boucle ci-dessous demande à l'utilisateur une série de chiffres, mais "se casse" quand aucun numéro n'est entré :

```js
let sum = 0;

while (true) {

  let value = +prompt("Entrez un nombre", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Sum: ' + sum );
```

La directive `break` est activée sur la ligne `(*)` si l'utilisateur entre une ligne vide ou annule l'entrée. Il arrête la boucle immédiatement, en passant le contrôle à la première ligne après la boucle. À savoir, `alert`.

La combinaison "boucle infinie + `break` au besoin" est idéale pour les situations où la condition doit être vérifiée non pas au début / à la fin de la boucle, mais au milieu, voire à plusieurs endroits du corps.

## Continuer jusqu'à la prochaine itération [#continue]

La directive `continue` est une "version plus légère" de `break`. Cela n'arrête pas toute la boucle. Au lieu de cela, elle arrête l'itération en cours et force la boucle à en démarrer une nouvelle (si la condition le permet).

Nous pouvons l’utiliser si nous avons terminé l’itération en cours et aimerions passer à la suivante.

La boucle ci-dessous utilise `continue` pour ne produire que des valeurs impaires :

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // si vrai, saute le reste du corps
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, ensuite 3, 5, 7, 9
}
```

Pour les valeurs paires de `i`, la directive `continue` arrête l'exécution du corps en passant le contrôle à la prochaine itération de `for` (avec le nombre suivant). Donc, l'`alert` n'est appelée que pour les valeurs impaires.

````smart header="La directive `continue` aide à réduire le niveau d'imbrication"
Une boucle affichant des valeurs impaires pourrait ressembler à ceci :

```js
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

D'un point de vue technique, c'est identique à l'exemple du dessus. Certes, nous pouvons simplement envelopper le code dans un bloc `if` au lieu de `continue`.

Mais comme effet secondaire, nous avons obtenu un niveau d'imbrication supplémentaire (l'appel de l'`alert` à l'intérieur des accolades). Si le code à l'intérieur est plus long que quelques lignes, la lisibilité globale peut en être réduite.
````

````warn header="Pas de `break/continue` à droite de '?'"
Veuillez noter que les constructions de syntaxe qui ne sont pas des expressions ne peuvent pas être utilisées avec l'opérateur ternaire `?`. Tout particulièrement les directives telles que `break/continue` ne sont pas autorisées.

Par exemple, si nous prenons ce code :

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

… Et le réécrivons à l'aide d'un point d'interrogation :


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue n'est pas autorisé ici
```

… Ensuite cesse de fonctionner. Le code comme celui-ci donnera une erreur de syntaxe :


C’est une autre raison pour ne pas utiliser l'opérateur point d’interrogation `?` au lieu de `if`.
````

## Des labels pour break/continue

Parfois, nous devons sortir de plusieurs boucles imbriquées en même temps.

Par exemple, dans le code ci-dessous, nous passons en boucle sur `i` et `j` pour demander les coordonnées `(i, j)` de `(0,0)` à `(3,3)` :

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // Et si je veux sortir d'ici à Done (ci-dessous) ?

  }
}

alert('Done!');
```

Nous avons besoin d'un moyen d'arrêter le processus si l'utilisateur annule la saisie.

Le `break` ordinaire après `input` ne ferait que briser la boucle intérieure. Ce n’est pas suffisant. Les *labels* viennent à la rescousse.

Une *label* est un identifiant avec deux points avant une boucle :
```js
labelName: for (...) {
  ...
}
```

L'instruction `break <labelName>` dans la boucle interrompt tout le bloc de code relatif au label.

Comme ici :

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // si une chaîne est vide ou annulée, alors rompre les deux boucles
    if (!input) *!*break outer*/!*; // (*)

    // faire quelque chose avec la valeur …
  }
}
alert('Done!');
```

Dans le code ci-dessus, `break outer` regarde vers le haut le label `outer` et sort de cette boucle.

Donc, le contrôle va directement de `(*)` à `alert('Done!')`.

Nous pouvons également déplacer le label sur une ligne séparée :

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

La directive `continue` peut également être utilisée avec un label. Dans ce cas, l'exécution passe à l'itération suivante de la boucle labelisée.

````warn header="Les labels ne sont pas des \"goto\""
Les labels ne nous permettent pas de sauter de manière arbitraire dans le code.

Par exemple, il est impossible de faire ceci :
```js
break label;  // Sauter au label ? Non.

label: for (...)
```

L'appel d'un `break/continue` n'est possible qu'à partir de l'intérieur de la boucle et le libellé doit se situer quelque part au dessus de la directive.
````

## Résumé

Nous avons couvert 3 types de boucles :

- `while` -- La condition est vérifiée avant chaque itération.
- `do..while` -- La condition est vérifiée après chaque itération.
- `for (;;)` -- La condition est vérifiée avant chaque itération, des paramètres supplémentaires sont disponibles.

Pour créer une boucle "infinie", on utilise généralement la construction `while(true)`. Une telle boucle, comme toute autre, peut être stoppée avec la directive `break`.

Si nous ne voulons rien faire avec l’itération actuelle et que nous souhaitons avancer jusqu'à la suivante, la directive `continue` nous permet de faire cela.

`break/continue` accepte les labels précédents la boucle. Un label est le seul moyen de `break/continue` pour échapper à l'imbrication et accéder en dehors de la boucle.
