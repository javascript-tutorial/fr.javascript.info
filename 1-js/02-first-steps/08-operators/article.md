# Opérateurs de base, mathématiques

Nous connaissons bon nombre d'opérateur grâce à l'école. Ce sont les additions `+`, multiplications `*`, soustractions `-` et ainsi de suite.

Dans ce chapitre, nous nous concentrons sur les aspects qui ne sont pas couverts par l'arithmétique scolaire.

## Termes: "unaire", "binaire", "opérande"

Avant de continuer, saisissons la terminologie commune.

- Un opérande est ce à quoi les opérateurs sont appliqués. Par exemple, dans la multiplication `5 * 2`, il y a deux opérandes : l'opérande gauche est `5` et l'opérande droit est `2`. Parfois, les gens disent "arguments" au lieu de "opérandes".
- Un opérateur est unaire s'il a un seul opérande. Par exemple, la négation unaire `-` inverse le signe du nombre :

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert(x); // -1, le moins unaire a été appliqué
    ```
- Un opérateur est *binaire* s'il a deux opérandes. La même négation existe également dans la forme binaire :

    ```js run no-beautify
    let x = 1, y = 3;
    alert(y - x); // 2, le moins binaire soustrait des valeurs
    ```

    D'un point de vue formel, dans les exemples ci-dessus, nous avons deux opérateurs différents qui partagent le même symbole : l'opérateur de négation, un opérateur unaire qui inverse le signe, et l'opérateur de soustraction, un opérateur binaire qui soustrait un nombre à un autre.

## Opérations mathématiques

Les opérations mathématiques suivantes sont supportées :

- Addition `+`,
- Soustraction `-`,
- Multiplication `*`,
- Division `/`,
- Reste `%`,
- Exponentiation `**`.

Les quatre premières sont assez simples, tandis que `%` et `**` nécessitent quelques explications.

### Reste % (Modulo)

L'opérateur reste `%`, malgré son apparence, n'est pas lié aux pourcentages.

Le résultat de `a % b` est le [reste](https://fr.wikipedia.org/wiki/Reste) de la division entière (euclidienne) de `a` par `b`.

Par exemple :

```js run
alert(5 % 2); // 1, le reste de 5 divisé par 2
alert(8 % 3); // 2, le reste de 8 divisé par 3
alert(8 % 2); // 0, le reste de 8 divisé par 2
```

### Exponentiation **

L'opérateur d'exponentiation `a ** b` multiplie `a` par lui-même `b` fois.
En mathématiques à l'école, nous écrivons cela a<sup>b</sup>.

Par exemple :

```js run
alert(2 ** 2); // 2² = 4
alert(2 ** 3); // 2³ = 8
alert(2 ** 4); // 2⁴ = 16
```

Mathématiquement, l'exponentiation est également définie pour les nombres non entiers. 

Par exemple, une racine carrée est une exponentiation de `½` :

```js run
alert(4 ** (1/2)); // 2 (la puissance de 1/2 équivaut à une racine carrée)
alert(8 ** (1/3)); // 2 (la puissance de 1/3 équivaut à une racine cubique)
```

## Concaténation de chaînes de caractères, binaire `+`

Découvrons les fonctionnalités des opérateurs JavaScript qui vont au-delà de l'arithmétique scolaire.

Habituellement, l'opérateur `+` additionne des chiffres.

Mais si l'opérateur binaire `+` est appliqué aux chaînes de caractères, il les fusionne (concatène) :

```js
let s = "my" + "string";
alert(s); // mystring
```

Notez que si l'un des opérandes est une chaîne de caractères, l'autre est automatiquement converti en chaîne de caractères.

Par exemple :

```js run
alert('1' + 2); // "12"
alert(2 + '1'); // "21"
```

Peu importe que le premier opérande soit une chaîne de caractères ou le second. La règle est simple : si l'un des opérandes est une chaîne de caractères, convertissez l'autre également en une chaîne de caractères.

Cependant, notez que les opérations se déroulent de gauche à droite. S'il y a deux nombres suivis d'une chaîne, les nombres seront ajoutés avant d'être convertis en chaîne :

```js run
alert(2 + 2 + '1'); // "41" et non "221"
```

Ici, les opérateurs travaillent les uns après les autres. Le premier `+` additionne deux nombres, donc il renvoie `4`, puis le `+` suivant ajoute la chaîne de caractères `1`, donc c'est comme `4 + '1' = 41`.

```js run
alert('1' + 2 + 2); // "122" et non "14"
```
Ici, le premier opérande est une chaîne de caractères, le compilateur traite également les deux autres opérandes comme des chaînes de caractères. Le `2` est concaténé à `'1'`, donc c'est comme `'1'+ 2 = "12"` et `"12" + 2 = "122"`.


L'opérateur binaire `+` est le seul opérateur qui prend en charge les chaînes de caractères de cette manière. D'autres opérateurs arithmétiques ne fonctionnent qu'avec des nombres et convertissent toujours leurs opérandes en nombres.

Voici l'exemple pour la soustraction et la division :
```js run
alert(6 - '2'); // 4, convertit '2' en nombre
alert('6' / '2'); // 3, convertit les deux opérandes en nombres
```

## Conversion numérique, unaire +

Le plus `+` existe sous deux formes. La forme binaire que nous avons utilisée ci-dessus et la forme unaire.

L’unaire plus ou, en d’autres termes, l’opérateur plus `+` appliqué à une seule valeur, ne fait rien avec les nombres, mais si l’opérande n’est pas un nombre, alors il est converti en nombre.

Par exemple :

```js run
// Aucun effet sur les nombres
let x = 1;
alert(+x); // 1

let y = -2;
alert(+y); // -2

*!*
// Convertit les valeurs non-numérales
alert(+true); // 1
alert(+"");   // 0
*/!*
```

En fait, il fait la même chose que `Number(...)`, mais il est plus court.

La nécessité de convertir des chaînes de caractères en nombres est très fréquente. Par exemple, si nous obtenons des valeurs à partir de champs de formulaire HTML, il s’agit généralement de chaînes de caractères. Et si on veut les additionner ?

L'opérateur binaire `+` les concatènerait comme des chaînes de caractères :

```js run
let apples = "2";
let oranges = "3";

alert(apples + oranges); // "23", l'opérateur binaire concatène les chaînes de caractères
```

Si nous voulons les traiter comme des nombres, nous devons d'abord les convertir et ensuite seulement nous pouvons les additionner :

```js run
let apples = "2";
let oranges = "3";

*!*
// Les deux valeurs converties en nombres avant le binaire plus
alert(+apples + +oranges); // 5
*/!*

/* C'est équivalent à cette variante plus longue
alert(Number(apples) + Number(oranges)); (5) *;
```

Du point de vue du mathématicien, l’abondance des `+` peut sembler étrange. Mais du point de vue du développeur, il n’y a rien de spécial : les opérateurs `+` unaires sont appliqués en premier, ils convertissent les chaînes de caractères en nombres, puis le plus binaire les additionne.

Pourquoi les plus unaires sont-ils appliqués aux valeurs avant les binaires ? Comme nous allons le voir, c’est à cause de *leur précédence supérieure*.

## Précédence des opérateurs

Si une expression a plusieurs opérateurs, l’ordre d’exécution est défini par leur *priorité* ou, en d’autres termes, il existe un ordre de priorité implicite entre les opérateurs.

De l'école, nous savons tous que la multiplication dans l'expression `1 + 2 * 2` devrait être calculée avant l'addition. C’est exactement cela la précédence. On dit de la multiplication qu'elle a une *précédence supérieure* à l'addition.

Les parenthèses outrepassent toute priorité, donc si nous ne sommes pas satisfaits de l'ordre par défaut, nous pouvons les utiliser, comme : `(1 + 2) * 2`.

Il y a beaucoup d'opérateurs en JavaScript. Chaque opérateur a un numéro correspondant à sa priorité de précédence. Celui qui est plus haut sur le tableau s'exécute en premier. Si la priorité est la même, l'ordre d'exécution est de gauche à droite.

Un extrait du [tableau de précédence](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#tableau) (vous n'avez pas besoin de vous en souvenir, mais notez que les opérateurs unaires ont une priorité plus élevée que les binaires correspondants) :

| Précédence | Nom             | Symbole |
| ---------- | --------------- | ------- |
| ...        | ...             | ...     |
| 14         | plus unaire     | `+`     |
| 14         | négation unaire | `-`     |
| 13         | exponentiation  | `**`    |
| 12         | multiplication  | `*`     |
| 12         | division        | `/`     |
| 11         | addition        | `+`     |
| 11         | soustraction    | `-`     |
| ...        | ...             | ...     |
| 2          | affectation     | `=`     |
| ...        | ...             | ...     |

Comme on peut le voir, le "plus unaire" a une priorité de `14`, ce qui est supérieur à `11` pour "l'addition" (plus binaire). C’est pourquoi, dans l’expression `+apples + +oranges`, les opérateurs `+` unaires fonctionnent avant l’addition.

## Affectation

Notons qu’une affectation `=` est aussi un opérateur. Il est répertorié dans le tableau des précédences avec la très faible priorité de `2`.

C’est pourquoi lorsque nous assignons une variable, comme `x = 2 * 2 + 1`, les calculs sont effectués en premier, puis le `=` est évalué, stockant le résultat dans `x`.

```js
let x = 2 * 2 + 1;

alert(x); // 5
```

### Affectation = retourne une valeur

Le fait que `=` soit un opérateur, pas une construction de langage "magique" a une implication intéressante.

Tous les opérateurs en JavaScript renvoient une valeur. C'est évident pour `+` et `-`, mais aussi vrai pour `=`.

L'appel `x = valeur` écrit la `valeur` dans `x`.

Voici un exemple qui utilise une affectation dans le cadre d'une expression plus complexe :

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert(a); // 3
alert(c); // 0
```

Dans l'exemple ci-dessus, le résultat de l'expression`(a = b + 1)` est la valeur qui a été affectée à `a` (c'est-à-dire `3`). Il est ensuite utilisé pour d'autres évaluations.

Drôle de code, n'est-ce pas? Nous devons comprendre comment cela fonctionne, car parfois nous le voyons dans les bibliothèques JavaScript.

Cependant, n'écrivez pas le code comme ça. De telles astuces ne rendent certainement pas le code plus clair ou lisible.

### Affectations chaînées

Une autre caractéristique intéressante est la possibilité de chaîner des affectations :

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert(a); // 4
alert(b); // 4
alert(c); // 4
```

Les affectations en chaîne sont évaluées de droite à gauche. D'abord, l'expression la plus à droite `2 + 2` est évaluée puis assignée aux variables de gauche : `c`, `b` et `a`. À la fin, toutes les variables partagent une seule valeur.

Encore une fois, pour des raisons de lisibilité, il est préférable de diviser ce code en quelques lignes :

```js
c = 2 + 2;
b = c;
a = c;
```
C'est plus facile à lire, en particulier lors de la numérisation rapide du code.

## Modification sur place

Nous avons souvent besoin d'appliquer un opérateur à une variable et d'y stocker le nouveau résultat.

Par exemple :

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Cette notation peut être raccourcie en utilisant les opérateurs `+=` et `*=` :

```js run
let n = 2;
n += 5; // Maintenant n = 7 (identique à n = n + 5)
n *= 2; // Maintenant n = 14 (identique à n = n * 2)

alert(n); // 14
```

Il existe des opérateurs de "modification et assignation" courts pour tous les opérateurs arithmétiques binaires : `/=`, `-=` etc.

Ces opérateurs ont la même précédence qu'une affectation normale. Ils s'exécutent donc après la plupart des autres calculs :

```js run
let n = 2;

n *= 3 + 5; // La partie de droite est évaluée en premier (identique à n *= 8)

alert(n); // 16  
```

## Incrémentation / décrémentation

<!-- Can't use -- in title, because built-in parse turns it into – -->

L'augmentation ou la diminution d'un nombre par `1` compte parmi les opérations numériques les plus courantes.

Il y a donc des opérateurs spéciaux pour cela :

- **Incrémentation** `++` augmente la valeur d'une variable de 1 :

    ```js run no-beautify
    let counter = 2;
    counter++;        // Fonctionne de la même manière que counter = counter + 1, mais c'est plus court
    alert(counter); // 3
    ```
- **Décrémentation** `--` diminue la valeur d'une variable de 1 :

    ```js run no-beautify
    let counter = 2;
    counter--;        // Fonctionne de la même manière que counter = counter - 1, mais c'est plus court
    alert(counter); // 1
    ```

```warn
L'incrémentation / décrémentation ne peut être appliquée qu'à une variable. Une tentative pour l'utiliser sur une valeur comme `5++` donnera une erreur.
```

Les opérateurs `++` et `--` peuvent être placés à la fois avant et après la variable.

- Lorsque l'opérateur va après la variable, cela s'appelle une "forme postfixe" : `counter++`.
- La "forme préfixe" est celle où l'opérateur se place devant la variable : `++counter`.

Ces deux opérateurs font la même chose : augmenter le `counter` de `1`.

Y a-t-il une différence ? Oui, mais nous ne pouvons le voir que si nous utilisons la valeur renvoyée de `++/--`.

Soyons clairs. Comme nous le savons, tous les opérateurs renvoient une valeur. L'incrémentation / décrémentation n'est pas une exception ici. La forme préfixe renvoie la nouvelle valeur, tandis que la forme postfixe renvoie l'ancienne valeur (avant l'incrémentation / décrémentation).

Pour voir la différence, voici un exemple :

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

Ici, dans la ligne `(*)`, l'appel du *préfixe* `++counter` incrémente le compteur et retourne la nouvelle valeur qui est `2`. Ainsi, l'`alert` affiche `2`.

Maintenant, utilisons la forme postfixe :

```js run
let counter = 1;
let a = counter++; // (*) changé ++counter pour counter++

alert(a); // *!*1*/!*
```

Dans la ligne `(*)`, la forme postfixe `counter++` incrémente également `counter`, mais renvoie l'*ancienne* valeur (avant l'incrémentation). Donc, l'`alert` montre `1`.

Pour résumer :

- Si le résultat de l'incrémentation/décrémentation n'est pas utilisé, alors il n'y a pas de différence dans la forme à utiliser :

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert(counter); // 2, les lignes ci-dessus ont fait la même chose
    ```
- Si nous souhaitons augmenter la valeur et utiliser le résultat de l'opérateur immédiatement, nous avons besoin de la forme préfixe :

    ```js run
    let counter = 0;
    alert(++counter); // 1
    ```
- Si nous souhaitons incrémenter, mais utiliser la valeur précédente, alors nous avons besoin de la forme postfixe :

    ```js run
    let counter = 0;
    alert(counter++); // 0
    ```

````smart header="Incrémentation / décrémentation parmi d'autres opérateurs"
Les opérateurs `++/--` peuvent également être utilisés dans une expression. Leur précédence est plus élevée que la plupart des autres opérations arithmétiques.

Par exemple :

```js run
let counter = 1;
alert(2 * ++counter); // 4
```

À comparer avec :

```js run
let counter = 1;
alert(2 * counter++); // 2, counter++ renvoie "l'ancienne" valeur
```

Bien que techniquement acceptable, une telle notation rend le code moins lisible. Une ligne fait plusieurs choses -- pas bien.

Lors de la lecture du code, un scan oculaire "vertical" rapide peut facilement manquer un tel `counter++`, et il n’est pas évident que la valeur de la variable augmente.

Le style "une ligne -- une action" est conseillé :

```js run
let counter = 1;
alert(2 * counter);
counter++;
```
````

## Opérateurs binaires

Les opérateurs binaires traitent les arguments comme des nombres entiers codés sur 32 bits et travaillent au niveau de leur représentation binaire.

Ces opérateurs ne sont pas spécifiques à JavaScript. Ils sont pris en charge dans la plupart des langages de programmation.

La liste des opérateurs :

- AND (`&`)
- OR (`|`)
- XOR (`^`)
- NOT (`~`)
- LEFT SHIFT / Décalage par la gauche au niveau du bit (`<<`)
- RIGHT SHIFT / Décalage par la droite au niveau du bit (`>>`)
- ZERO-FILL RIGHT SHIFT / Remplissage de la plage (32 bits) de 0 et décalage par la droite (`>>>`)

Ces opérateurs sont très rarement utilisés, lorsque nous devons jouer avec des nombres au niveau le plus bas (bit à bit). Nous n'aurons pas besoin de ces opérateurs de si tôt, car le développement Web les utilise peu, mais dans certains domaines particuliers, comme la cryptographie, ils sont utiles. Vous pouvez lire le chapitre [Opérateurs binaires](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_et_Op%C3%A9rateurs#Op%C3%A9rateurs_binaires) sur MDN en cas de besoin.

## Virgule

L'opérateur virgule `,` est l'un des opérateurs les plus rares et les plus inhabituels. Parfois, il faut écrire un code plus court, il faut donc le connaître pour comprendre ce qui se passe.

L'opérateur virgule nous permet d'évaluer plusieurs expressions en les divisant par une virgule `,`. Chacun d'eux est évalué, mais seulement le résultat de la dernière est renvoyé.

Par exemple :

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert(a); // 7 (le résultat de 3 + 4)
```

Ici, la première expression `1 + 2` est évaluée mais son résultat n'est pas utilisé, puis `3 + 4` est évalué et renvoyé comme résultat.

```smart header="La virgule a une très faible précédence"
Veuillez noter que l'opérateur virgule a une précédence très basse, inférieure à `=`, donc les parenthèses sont importantes dans l'exemple ci-dessus.

Sans eux : `a = 1 + 2, 3 + 4` évalue d'abord `+`, additionnant les nombres dans `a = 3, 7`, ensuite l'opérateur d'affectation `=` assigne `a = 3`, et le reste est ignoré. C'est comme `(a = 1 + 2), 3 + 4`.
```

Pourquoi avons-nous besoin d'un tel opérateur qui jette tout sauf la dernière partie ?

Parfois, les gens l'utilisent dans des constructions plus complexes pour placer plusieurs actions sur une seule ligne.

Par exemple :

```js
// trois opérations en une seule ligne
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Ces astuces sont utilisées dans de nombreux frameworks JavaScript, c’est pourquoi nous les mentionnons. Mais généralement, ils n'améliorent pas la lisibilité du code, nous devrions bien réfléchir avant de les utiliser.
