# Boucles : while et for

Nous avons souvent besoin d'effectuer des actions similaires plusieurs fois de suite.

Par exemple, lorsque nous devons extraire des marchandises d'une liste les unes à la suite des autres. Ou exécuter simplement le même code pour chaque numéro de 1 à 10.

*Les boucles* permettent de répéter plusieurs fois la même partie du code.

```smart header="Les boucles for..of et for..in"
Une petite annonce pour les lecteurs avertis.

Cet article ne couvre que les boucles de base : `while`, `do..while` et `for(..;..;..)`.

Si vous êtes venu à cet article à la recherche d'autres types de boucles, voici les pointeurs :

- Voir [for..in](info:object#forin) pour boucler sur les propriétés de l'objet.
- Voir [for..of](info:array#loops) et [iterables](info:iterable) pour boucler sur des tableaux et des objets itérables.

Sinon, lisez la suite.
```

## La boucle "while"

La boucle `while` a la syntaxe suivante :

```js
while (condition) {
  // code
  // Nommé "loop body" ("corps de boucle")
}
```

Tant que la `condition` est vraie, le `code` du corps de la boucle est exécuté.

Par exemple, la boucle ci-dessous affiche `i` tant que `i < 3` :

```js run
let i = 0;
while (i < 3) { // Affiche 0, puis 1, puis 2
  alert(i);
  i++;
}
```

Une unique exécution du corps de la boucle est appelée **une itération**. La boucle dans l'exemple ci-dessus fait trois itérations.

S'il n'y avait pas d'`i++` dans l'exemple ci-dessus, la boucle se répéterait (en théorie) pour toujours. En pratique, le navigateur fournit des moyens d’arrêter ces boucles, et pour JavaScript côté serveur, nous pouvons tuer le processus.

Toute expression ou variable peut être une condition de boucle, pas seulement une comparaison. Elles sont évaluées et converties en un booléen par `while`.

Par exemple, le moyen le plus court d'écrire `while (i != 0)` est `while (i)` :

```js run
let i = 3;
*!*
while (i) { // Quand i devient 0, la condition devient fausse et la boucle s'arrête
*/!*
  alert(i);
  i--;
}
```

````smart header="Les accolades ne sont pas requis pour un corps à une seule ligne"
Si le corps de la boucle contient une seule instruction, nous pouvons omettre les accolades `{…}` :

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
  // Corps de la boucle
} while (condition);
```

La boucle exécute d'abord le corps, puis vérifie la condition, tant qu'elle est vraie, l'exécute encore et encore.

Par exemple :

```js run
let i = 0;
do {
  alert(i);
  i++;
} while (i < 3);
```

Cette forme de syntaxe est rarement utilisée, sauf lorsque vous souhaitez que le corps de la boucle s'exécute **au moins une fois**, quelle que soit la condition. Habituellement, l'autre forme est préférée : `while(…) {…}`.

## La boucle "for"

La boucle `for` est plus complexe, mais c’est aussi la boucle la plus utilisée.

Cela ressemble à ceci :

```js
for (initialisation; condition; expression) {
  // ... Corps de la boucle ...
}
```

Apprenons la signification de ces parties par l'exemple. La boucle ci-dessous exécute `alert(i)` pour `i` en partant de `0` jusqu'à `3` (non compris) :

```js run
for (let i = 0; i < 3; i++) { // Affiche 0, puis 1, puis 2
  alert(i);
}
```

Examinons l'instruction conditionnelle (la boucle) `for` partie par partie :

| Partie         |             |                                                                                                        |
| -------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| initialisation | `let i = 0` | S'exécute une fois avant d'exécuter le corps de la boucle.                                             |
| condition      | `i < 3`     | Vérifie avant chaque itération de la boucle, si la condition est fausse, l'exécution sort de la boucle |
| corps          | `alert(i)`  | S'exécute encore et encore tant que la condition est vraie                                             |
| expression     | `i++`       | S'exécute après le corps à chaque itération                                                            |


L'algorithme de boucle général fonctionne comme ceci :
```
Déclarer et affecter une variable itérative (Initialisation)
→ (si condition est vraie → exécuter le corps et exécuter l'expression)
→ (si condition est vraie → exécuter le corps et exécuter l'expression)
→ (si condition est vraie → exécuter le corps et exécuter l'expression)
→ ...
```

C'est-à-dire qu'`initialisation` est exécutée une fois, après chaque vérification de `condition`, `corps` et `expressions` sont exécutés.

Si vous débutez dans les boucles, il pourrait être utile de revenir à l'exemple et de reproduire comment elle s'exécute pas à pas sur une feuille de papier.

Voici ce qui se passe exactement dans notre cas :

```js
// for (let i = 0; i < 3; i++) alert(i)

// Exécute l'initialisation
let i = 0
// Si condition est vraie → exécuter le corps et exécuter l'étape
if (i < 3) { alert(i); i++ }
// Si condition est vraie → exécuter le corps et exécuter l'étape
if (i < 3) { alert(i); i++ }
// Si condition est vraie → exécuter le corps et exécuter l'étape
if (i < 3) { alert(i); i++ }
// ... Fini, car i vaut 3
```

````smart header="Déclaration de variable en ligne"
Ici, la variable intérative `i` est déclarée et affectée directement dans l'instruction de la boucle. Cela s'appelle une déclaration de variable "en ligne". De telles variables ne sont visibles que dans le corps de la boucle.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // Erreur, pas de variable
```

Au lieu de déclarer une variable, nous pouvons en utiliser une existante :

```js run
let i = 0;

for (i = 0; i < 3; i++) { // Utiliser une variable existante
  alert(i); // 0, 1, 2
}

alert(i); // 3, visible, car déclarée en dehors de la boucle
```
````

### Sauter des parties

Toute partie de `for` peut être ignorée.

Par exemple, nous pouvons omettre `l'initialisation` si nous n'avons rien à faire au début de la boucle.

Comme ici :

```js run
let i = 0; // Nous avons déjà déclaré et assigné une valeur à 'i'

for (; i < 3; i++) { // Pas besoin d'initalisation
  alert(i); // 0, 1, 2
}
```

Nous pouvons également supprimer la partie `expression` :

```js run
let i = 0;

for (; i < 3;) {
  alert(i++);
}
```

La boucle est devenue identique à `while (i < 3)`.

Nous pouvons tout supprimer, créant ainsi une boucle infinie :

```js
for (;;) {
  // Répète sans limites
}
```

Veuillez noter que les deux les points-virgules `;` de `for` doivent être présents, sinon ce serait une erreur de syntaxe.

## Briser la boucle

Normalement, l'exécution de la boucle s'achève quand la condition devient fausse.

Mais nous pouvons forcer la sortie à tout moment. Il y a une instruction spéciale appelée `break` pour cela.

Par exemple, la boucle ci-dessous demande à l'utilisateur une série de chiffres, mais "se casse" quand aucun numéro n'est entré :

```js run
let sum = 0;

while (true) {

  let value = +prompt("Entrez un nombre", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert('Sum: ' + sum);
```

L'instruction `break` est exécutée sur la ligne `(*)` si l'utilisateur entre une ligne vide ou annule l'entrée. Il interrompt l'exécution de la boucle immédiatement, en passant à la première ligne après la boucle. À savoir, `alert`.

La combinaison "boucle infinie + `break` au besoin" est idéale pour les situations où la condition doit être vérifiée non pas au début / à la fin de la boucle, mais au milieu, voire à plusieurs endroits du corps.

## Continuer jusqu'à la prochaine itération [#continue]

L'instruction `continue` est une "version plus légère" de `break`. Cela n'arrête pas l'exécution de la boucle. Au lieu de cela, elle arrête l'itération en cours et force la boucle à en démarrer une nouvelle (si la condition le permet).

Nous pouvons l’utiliser si nous avons terminé l’itération en cours et aimerions passer à la suivante.

La boucle ci-dessous utilise `continue` pour ne produire que des valeurs impaires :

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // Si vrai, saute le reste du corps
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, ensuite 3, 5, 7, 9
}
```

Pour les valeurs paires de `i`, l'instruction `continue` arrête l'exécution du corps en passant à la prochaine itération de `for` (avec le nombre suivant). Donc, l'`alert` n'est appelée que pour les valeurs impaires.

````smart header="L'instruction `continue` aide à réduire le niveau d'imbrication"
Une boucle affichant des valeurs impaires pourrait ressembler à ceci :

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert(i);
  }

}
```

D'un point de vue technique, c'est identique à l'exemple du dessus. Certes, nous pouvons simplement envelopper le code dans un bloc `if` au lieu de `continue`.

Mais comme effet secondaire, nous avons obtenu un niveau d'imbrication supplémentaire (l'appel de l'`alert` à l'intérieur des accolades). Si le code à l'intérieur du `if` est plus long que quelques lignes, la lisibilité globale peut en être réduite.
````

````warn header="Pas de `break/continue` à droite de '?'"
Veuillez noter que les constructions de syntaxe qui ne sont pas des expressions ne peuvent pas être utilisées avec l'opérateur ternaire `?`. Tout particulièrement les instructions telles que `break/continue` ne sont pas utilisables.

Par exemple, si nous prenons ce code :

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

… Et le réécrivons sous forme ternaire :

```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // 'continue' n'est pas autorisé ici
```

… Ensuite cesse de fonctionner : il y a une erreur de syntaxe.

C’est une autre raison de ne pas utiliser l'opérateur point d’interrogation `?` au lieu de `if`.
````

## Des labels pour break/continue

Parfois, nous devons sortir de plusieurs boucles imbriquées en même temps.

Par exemple, dans le code ci-dessous, nous bouclons sur `i` et `j` pour demander les coordonnées `(i, j)` de `(0,0)` à `(2,2)` :

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // Et si nous voulons sortir d'ici à Done (ci-dessous) ?
  }
}

alert('Done!');
```

Nous avons besoin d'un moyen d'arrêter le processus si l'utilisateur annule la saisie.

Le `break` ordinaire après `input` ne ferait que briser la boucle intérieure. Ce n’est pas suffisant -- les *labels* viennent à la rescousse.

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

    // Si une chaîne est vide ou annulée, alors rompre les deux boucles
    if (!input) *!*break outer*/!*; // (*)

    // Faire quelque chose avec la valeur …
  }
}

alert('Done!');
```

Dans le code ci-dessus, `break outer` regarde vers le haut le label `outer` et sort de cette boucle.

Donc, l'exécution passe directement de `(*)` à `alert('Done!')`.

Nous pouvons également déplacer le label sur une ligne séparée :

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

L'instruction `continue` peut également être utilisée avec un label. Dans ce cas, l'exécution passe à l'itération suivante de la boucle labellisée.

````warn header="Les labels ne permettent pas de \"sauter\" n'importe où"
Les labels ne nous permettent pas de sauter à un endroit arbitraire du code.

Par exemple, il est impossible de faire ceci :

```js
break label; // Saute au label ci-dessous (ne fonctionne pas)

label: for (...)
```

Une instruction `break` doit être à l'intérieur d'un bloc de code. Techniquement, tout bloc de code étiqueté fera l'affaire, par exemple :

```js
label: {
  // ...
  break label; // Fonctionne
  // ...
}
```

... Bien que 99,9% du temps les `break` sont utilisés à l'intérieur de boucles, comme nous l'avons vu dans les exemples ci-dessus.

Un `continue` n'est possible que depuis l'intérieur d'une boucle.
````

## Résumé

Nous avons couvert 3 types de boucles :

- `while` -- La condition est vérifiée avant chaque itération.
- `do..while` -- La condition est vérifiée après chaque itération.
- `for (;;)` -- La condition est vérifiée avant chaque itération, des paramètres supplémentaires sont disponibles.

Pour créer une boucle "infinie", on utilise généralement la construction `while(true)`. Une telle boucle, comme toute autre, peut être stoppée avec l'instruction `break`.

Si nous ne voulons rien faire avec l’itération actuelle et que nous souhaitons avancer jusqu'à la suivante, l'instruction `continue` nous permet de faire cela.

`break/continue` accepte les labels précédents la boucle. Un label est le seul moyen d'utiliser `break/continue` pour échapper à l'imbrication et accéder en dehors de la boucle.