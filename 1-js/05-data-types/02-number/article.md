# Nombres

En JavaScript moderne, il existe deux types de nombres :

1. Les nombres standards en JavaScript sont stockés au format 64 bits [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), également connu sous le nom de "nombres à virgule flottante double précision". Ce sont des chiffres que nous utilisons le plus souvent, et nous en parlerons dans ce chapitre.

<<<<<<< HEAD
2. Les nombres BigInt pour représenter des entiers de longueur arbitraire. Ils sont parfois nécessaires, car un nombre régulier ne peut pas dépasser de manière précise <code>2<sup>53</sup></code> ou être inférieur à <code>-2<sup>53</sup></code>. Comme les bigints sont utilisés dans quelques zones spéciales, nous leur consacrons un chapitre spécial <info:bigint>.
=======
2. BigInt numbers represent integers of arbitrary length. They are sometimes needed because a regular integer number can't safely exceed <code>(2<sup>53</sup>-1)</code> or be less than <code>-(2<sup>53</sup>-1)</code>, as we mentioned earlier in the chapter <info:types>. As bigints are used in a few special areas, we devote them to a special chapter <info:bigint>.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Nous allons donc parler ici des nombres réguliers. Développons nos connaissances à leur sujet.

## Plus de façons d'écrire un nombre

Imaginez que nous ayons besoin d'écrire 1 milliard. Le moyen évident est :

```js
let milliard = 1000000000;
```

Nous pouvons également utiliser l’underscore `_` comme séparateur :

```js
let billion = 1_000_000_000;
```

Ici, l'underscore `_` joue le rôle de "[sucre syntaxique](https://en.wikipedia.org/wiki/Syntactic_sugar)", il rend le nombre plus lisible. Le moteur JavaScript ignore simplement `_` entre les chiffres, donc c'est exactement le même milliard que ci-dessus.

Dans la vraie vie cependant, nous essayons d'éviter d'écrire de longues séquences de zéros. Nous sommes trop paresseux pour ça. Nous essaierons d'écrire quelque chose comme "1 milliard" pour un milliard ou "7,3 milliards" pour 7 milliards 300 millions. La même chose est vraie pour la plupart des grands nombres.

En JavaScript, nous pouvons raccourcir un nombre en y ajoutant la lettre `"e"` et en spécifiant le nombre de zéros :

```js run
let milliard = 1e9;  // 1 milliard, littéralement : 1 suivi de 9 zéros

alert( 7.3e9 );  // 7.3 milliards (pareil que 7300000000 ou 7_300_000_000)
```

En d'autres termes, `e` multiplie le nombre par `1` suivi du nombre de zéros spécifié.

```js
1e3 === 1 * 1000 // e3 signifie *1000
1.23e6 === 1.23 * 1000000 // e6 signifie *1000000
```

<<<<<<< HEAD
Maintenant, écrivons quelque chose de très petit. Disons, 1 microseconde (un millionième de seconde) :
=======
Now let's write something very small. Say, 1 microsecond (one-millionth of a second):
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
let us = 0.000001;
```

Comme avant, l'utilisation de `"e"` peut nous aider. Si nous voulons éviter d'écrire les zéros explicitement, nous pourrions dire la même chose comme :

```js
let us = 1e-6; // cinq zéros à gauche de 1
```

Si nous comptons les zéros dans `0.000001`, il y en a 6. Donc logiquement, c'est `1e-6`.

En d'autres termes, un nombre négatif après `"e"` signifie une division par 1 suivi du nombre spécifié de zéros :

```js
// -3 divise par 1 avec 3 zéros
1e-3 === 1 / 1000; // 0.001

// -6 divise par 1 avec 6 zéros
1.23e-6 === 1.23 / 1000000; // 0.00000123

// an example with a bigger number
1234e-2 === 1234 / 100; // 12.34, decimal point moves 2 times
```

### Nombres hexadécimaux, binaires et octaux

Les nombres [Hexadécimaux](https://fr.wikipedia.org/wiki/Syst%C3%A8me_hexad%C3%A9cimal) sont souvent utilisés en JavaScript pour représenter des couleurs, encoder des caractères et pour beaucoup d'autres choses. Alors, naturellement, il existe un moyen plus court de les écrire : `0x` puis le nombre.

Par exemple :

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (même résultat car la casse n'a pas d'importance)
```

Les systèmes numériques binaires et octaux sont rarement utilisés, mais sont également supportés avec les préfixes `0b` et `0o` :

```js run
let a = 0b11111111; // forme binaire de 255
let b = 0o377; // forme octale de 255

alert( a == b ); // true, car a et b valent le même nombre, soit 255
```

Cependant ça ne fonctionne qu'avec ces 3 systèmes de numération. Pour les autres systèmes numérique, nous devrions utiliser la fonction `parseInt` (que nous verrons plus loin dans ce chapitre).

## La méthode toString(base)

La méthode `num.toString(base)` retourne une chaîne de caractères représentant `num` dans le système numérique de la `base` donnée.

Par exemple :

```js run
let num = 255;

alert( num.toString(16) ); // ff
alert( num.toString(2) );  // 11111111
```

<<<<<<< HEAD
La `base` peut varier de `2` à `36`. Par défaut, il s'agit de `10`.
=======
The `base` can vary from `2` to `36`. By default, it's `10`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Les cas d'utilisation courants sont :

<<<<<<< HEAD
- **base=16** est utilisé pour les couleurs hexadécimales, les encodages de caractères, etc. Les chiffres peuvent être `0..9` ou `A..F`.
- **base=2** est principalement utilisé pour le débogage d'opérations binaires, les chiffres pouvant être `0` ou `1`.
- **base=36** est le maximum, les chiffres peuvent être `0..9` ou `A..Z`. L'alphabet latin entier est utilisé pour représenter un nombre. Un cas amusant mais utile pour la base `36` consiste à transformer un identifiant numérique long en quelque chose de plus court, par exemple pour créer une URL courte. On peut simplement le représenter dans le système numérique avec base `36` :
=======
- **base=16** is used for hex colors, character encodings etc, digits can be `0..9` or `A..F`.
- **base=2** is mostly for debugging bitwise operations, digits can be `0` or `1`.
- **base=36** is the maximum, digits can be `0..9` or `A..Z`. The whole Latin alphabet is used to represent a number. A funny, but useful case for `36` is when we need to turn a long numeric identifier into something shorter, for example, to make a short url. Can simply represent it in the numeral system with base `36`:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="Deux points pour appeler une méthode"
Veuillez noter que deux points sur `123456..toString(36)` n'est pas une faute de frappe. Si nous voulons appeler une méthode directement sur un nombre, comme `toString` dans l'exemple ci-dessus, nous devons placer deux points `..` avant la méthode.

<<<<<<< HEAD
Si nous plaçions un seul point : `123456.toString(36)`, il y aurait une erreur, car la syntaxe JavaScript applique la partie décimale après le premier point et il lirait `toString(36)` comme étant la partie décimale de `123456` ce qui n'est pas le cas. Si nous plaçons un point de plus, alors JavaScript sait que la partie décimale est vide et peut maintenant appliquer la méthode.
=======
If we placed a single dot: `123456.toString(36)`, then there would be an error, because JavaScript syntax implies the decimal part after the first dot. And if we place one more dot, then JavaScript knows that the decimal part is empty and now uses the method.

Also could write `(123456).toString(36)`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Il est aussi possible d'écrire `(123456).toString(36)`.
```

## Arrondir

Arrondir est l'une des opérations les plus utilisées pour travailler avec des nombres.

Il existe plusieurs fonctions intégrées pour arrondir :

`Math.floor`
: Arrondis vers le bas : `3.1` devient `3`, et `-1.1` devient `-2`.

`Math.ceil`
: Arrondis ver le haut : `3.1` devient `4`, et `-1.1` devient `-1`.

`Math.round`
<<<<<<< HEAD
: Arrondit à l'entier le plus proche : `3,1` devient `3`, `3,6` devient `4` et pour le cas du milieu, `3,5` est également arrondit à `4`.
=======
: Rounds to the nearest integer: `3.1` becomes `3`, `3.6` becomes `4`. In the middle cases `3.5` rounds up to `4`, and `-3.5` rounds up to `-3`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

`Math.trunc` (non pris en charge par Internet Explorer)
: Supprime tout ce qui suit le point décimal : `3.1` devient `3`, `-1.1` devient `-1`.

Voici le tableau pour résumer les différences entre eux :

<<<<<<< HEAD
|      | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|------|--------------|-------------|--------------|--------------|
| `3.1`|          `3` |         `4` |          `3` |          `3` |
| `3.6`|          `3` |         `4` |          `4` |          `3` |
|`-1.1`|         `-2` |        `-1` |         `-1` |         `-1` |
|`-1.6`|         `-2` |        `-1` |         `-2` |         `-1` |
=======
|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.5`|  `3`    |   `4`  |    `4`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.5`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Ces fonctions couvrent toutes les manières possibles de traiter la partie décimale d'un nombre. Mais que se passe-t-il si nous voulons arrondir le nombre à un certain chiffre après la virgule ?

Par exemple, nous avons `1.2345` et voulons l'arrondir à 2 chiffres, pour obtenir seulement `1.23`.

Il y a deux façons de le faire:

1. Multiplier et diviser.

    Par exemple, pour arrondir le nombre au 2ème chiffre après la décimale, nous pouvons multiplier le nombre par "100", appeler la fonction d'arrondi puis le diviser.

    ```js run
    let num = 1.23456;

    alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. La méthode [toFixed(n)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/toFixed) arrondit le nombre à `n` chiffres après le point et renvoie une chaîne de caractères du résultat.

    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    Ceci arrondit à la valeur la plus proche, similaire à `Math.round` :

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

    Veuillez noter que le résultat de `toFixed` est une chaîne de caractères. Si la partie décimale est plus courte qu'indiquée, des zéros sont ajoutés à la fin :

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", ajout de zéros pour faire exactement 5 chiffres
    ```

<<<<<<< HEAD
    Nous pouvons le convertir en un nombre en utilisant le plus unaire `+` ou un appel `Number()` : `+num.toFixed(5)`.
=======
    We can convert it to a number using the unary plus or a `Number()` call, e.g. write `+num.toFixed(5)`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## Calculs imprécis

En interne, un nombre est représenté au format 64 bits [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), il y a donc exactement 64 bits pour stocker un nombre : 52 d'entre eux sont utilisés pour stocker les chiffres, 11 d'entre eux stockent la position du point décimal (ils sont zéro pour les nombres entiers), et 1 bit est pour le signe.

Si un nombre est vraiment énorme, il peut déborder du stockage 64 bits et devenir une valeur numérique spéciale `Infinity` :

```js run
alert( 1e500 ); // infini
```

Ce qui est peut-être un peu moins évident, mais qui arrive souvent, est la perte de précision.

Considérez ce (faux !) test d'égalité :

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*faux*/!*
```

Si on vérifie si la somme de `0.1` et `0.2` est égale à `0.3` on obtient `faux`.

Étrange ! Qu'est-ce que c'est alors si ce n'est pas `0.3`?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

Aie ! Imaginez que vous créiez un site d'e-commerce et que le visiteur mette des produits à `0,10 €` et `0,20 €` dans son panier. Le total de la commande sera de `0,30000000000000004 €`. Cela surprendrait n'importe qui.

Mais pourquoi cela se produit-il ?

Un nombre est stocké en mémoire sous sa forme binaire, une séquence de uns et de zéros. Mais les fractions telles que `0.1`, `0.2`, qui semblent simples dans le système numérique décimal, sont en réalité des fractions sans fin dans leur forme binaire.

<<<<<<< HEAD
En d'autres termes, qu'est-ce que `0.1` ? C'est un divisé par dix `1/10`, un dixième. Dans le système numérique décimal, ces nombres sont facilement représentables. Comparez-le à un tiers : `1/3`. Cela devient une fraction sans fin `0.33333(3)`.
=======
```js run
alert(0.1.toString(2)); // 0.0001100110011001100110011001100110011001100110011001101
alert(0.2.toString(2)); // 0.001100110011001100110011001100110011001100110011001101
alert((0.1 + 0.2).toString(2)); // 0.0100110011001100110011001100110011001100110011001101
```

What is `0.1`? It is one divided by ten `1/10`, one-tenth. In the decimal numeral system, such numbers are easily representable. Compare it to one-third: `1/3`. It becomes an endless fraction `0.33333(3)`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Ainsi, la division par puissances `10` est garantie de bien fonctionner dans le système décimal, mais la division par `3` ne l'est pas. Pour la même raison, dans le système de numération binaire, la division par des puissances de `2` est garantie, mais `1/10` devient une fraction binaire sans fin.

Il n'existe aucun moyen de stocker **exactement 0.1** ou **exactement 0.2** à l'aide du système binaire, tout comme il n'existe aucun moyen de stocker un tiers sous forme de fraction décimale.

Le format numérique IEEE-754 résout ce problème en arrondissant au nombre le plus proche possible. Ces règles d'arrondissement ne nous permettent normalement pas de voir cette "petite perte de précision", mais elle existe.

Nous pouvons voir cela en action :

```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

Et quand on additionne deux nombres, leurs "pertes de précision" s'additionnent.

C'est pourquoi `0.1` + `0.2` n'est pas exactement `0.3`.

```smart header="Pas seulement JavaScript"
Le même problème existe dans de nombreux autres langages de programmation.

<<<<<<< HEAD
PHP, Java, C, Perl, Ruby donnent exactement le même résultat, car ils sont basés sur le même format numérique.
=======
PHP, Java, C, Perl, and Ruby give exactly the same result, because they are based on the same numeric format.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```

Pouvons-nous contourner le problème ? Bien sûr, la méthode la plus fiable est d'arrondir le résultat à l'aide d'une méthode [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // "0.30"
```


Veuillez noter que `toFixed` renvoie toujours une chaîne de caractères. Il s'assure qu'il a 2 chiffres après le point décimal. C'est pratique si nous avons un magasin en ligne et devons montrer `0.30$`. Pour les autres cas, nous pouvons utiliser le plus unaire `+` pour le contraindre en un nombre :


```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

Nous pouvons également multiplier temporairement les nombres par 100 (ou un nombre plus grand) pour les transformer en nombres entiers, faire le calcul, puis rediviser. Ensuite, comme nous faisons des calculs avec des nombres entiers, l'erreur diminue quelque peu, mais nous l'obtenons toujours sur la division :

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

<<<<<<< HEAD
Ainsi, l'approche multiplier/diviser réduit l'erreur, mais ne la supprime pas totalement.
=======
So, the multiply/divide approach reduces the error, but doesn't remove it totally.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Parfois, nous pourrions essayer d'éviter les fractions complètement. Par exemple, si nous traitons avec un magasin, nous pouvons stocker les prix en cents au lieu de dollars. Mais que se passe-t-il si nous appliquons une réduction de 30 % ? En pratique, il est rarement possible d'éviter totalement les fractions. Il suffit de les arrondir pour couper les "queues" si nécessaire.

````smart header="La chose amusante"
Essayez de lancer ceci :

```js run
// Bonjour! Je suis un nombre auto-croissant!
alert( 9999999999999999 ); // affiche 10000000000000000
```

La cause est encore une fois le manque de précision. Le nombre comporte 64 bits, dont 52 peuvent être utilisés pour stocker des chiffres, mais cela ne suffit pas. Alors, les chiffres les moins significatifs disparaissent.

JavaScript ne déclenche pas d'erreur dans de tels événements. il fait de son mieux pour adapter le nombre au format souhaité, mais malheureusement, ce format n'est pas assez grand.
````

```smart header="Deux zéros"
Une autre conséquence amusante de la représentation interne des nombres est l'existence de deux zéros : `0` et `-0`.

C'est parce que le signe est représenté par un bit, il peut donc être défini ou non pour n’importe quel nombre, y compris le zéro.

<<<<<<< HEAD
Dans le plupart des cas, la distinction est imperceptible, car les opérateurs peuvent les traiter de la même manière.
=======
In most cases, the distinction is unnoticeable, because operators are suited to treat them as the same.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```

## Tests : isFinite et isNaN

Vous rappelez-vous de ces deux valeurs numériques spéciales ?

- `Infinite` (et `-Infinite`) sont des valeurs numériques spéciales qui sont supérieures (inférieure) à tout.
- `NaN` représente une erreur.

Ils appartiennent au type `number`, mais ne sont pas des numéros "normaux". Il existe donc des fonctions spéciales pour les vérifier :

- `isNaN(valeur)` convertit son argument en un nombre et teste ensuite s'il est `NaN` :

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    Mais avons-nous besoin de cette fonction ? Ne pouvons-nous pas simplement utiliser la comparaison `=== NaN` ? Malheureusement non. La valeur `NaN` est unique en ce sens qu'elle ne vaut rien, y compris elle-même :

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(valeur)` convertit son argument en un nombre et renvoie true s'il s'agit d'un nombre régulier, pas de `NaN` / `Infinity` / `-Infinity` :

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, car c'est une valeur non régulière: NaN
    alert( isFinite(Infinity) ); // false, car c'est aussi une valeur non régulière: Infinity
    ```

Parfois, `isFinite` est utilisé pour valider si une valeur de chaîne de caractères est un nombre régulier :

```js run
let num = +prompt("Entrez un nombre", '');

// sera vrai, sauf si vous entrez Infinity, -Infinity ou NaN
alert( isFinite(num) );
```

Veuillez noter qu'une chaîne de caractères vide ou une chaîne de caractères contenant seulement des espaces est traitée comme `0` dans toutes les fonctions numérique, y compris `isFinite`.

````smart header="`Number.isNaN` et `Number.isFinite`"
Les méthodes [Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) et [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) sont des versions plus "strictes" des fonctions `isNaN` et `isFinite`. Elles ne convertissent pas automatiquement leur argument en nombre, mais vérifient s'il appartient au type `number`.

<<<<<<< HEAD
- `Number.isNaN(value)` retourne `true` si l'argument appartient au type `number` et s'il vaut `NaN`. Dans tous les autres cas, elle retourne `false`.
=======
- `Number.isNaN(value)` returns `true` if the argument belongs to the `number` type and it is `NaN`. In any other case, it returns `false`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

    ```js run
    alert( Number.isNaN(NaN) ); // true
    alert( Number.isNaN("str" / 2) ); // true

    // Notez la différence :
    alert( Number.isNaN("str") ); // false, car "str" est de type "string"
    alert( isNaN("str") ); // true, car isNaN convertit la string "str" en un nombre et obtient NaN comme résultatde la conversion
    ```

<<<<<<< HEAD
- `Number.isFinite(value)` retourne `true` si l'argument appartient au type `number` et s'il vaut ni `NaN`, ni `Infinity`, ni `-Infinity`. Dans tous les autres cas, elle retourne `false`.
=======
- `Number.isFinite(value)` returns `true` if the argument belongs to the `number` type and it is not `NaN/Infinity/-Infinity`. In any other case, it returns `false`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

    ```js run
    alert( Number.isFinite(123) ); // true
    alert( Number.isFinite(Infinity) ); // false
    alert( Number.isFinite(2 / 0) ); // false

    // Notez la différence :
    alert( Number.isFinite("123") ); // false, car "123" est de type "string"
    alert( isFinite("123") ); // true, car isFinite convertit la string "123" en un nombre 123
    ```

En quelque sorte, les fonction `Number.isNaN` et `Number.isFinite` sont plus simples et plus directes que les fonctions `isNaN` et `isFinite`. Cependant, en pratique `isNaN` et `isFinite` sont plus souvent utilisées car elles sont plus courtes à écrire.
````

```smart header="Comparer avec Object.is"

<<<<<<< HEAD
Il existe une méthode intégrée spéciale [Object.is](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/is) qui compare des valeurs telles que `===`, mais qui est plus fiable pour deux cas extrêmes :
=======
1. It works with `NaN`: `Object.is(NaN, NaN) === true`, that's a good thing.
2. Values `0` and `-0` are different: `Object.is(0, -0) === false`, technically that's correct because internally the number has a sign bit that may be different even if all other bits are zeroes.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

1. Cela fonctionne avec `NaN` : `Object.is(NaN, NaN) === true`, c'est une bonne chose.
2. Les valeurs `0` et `-0` sont différentes : `Object.is(0, -0) === false`, techniquement c’est vrai, car le numéro a en interne un bit de signe qui peut être différent même si tous les autres bits sont à zéro.

Dans tous les autres cas, `Object.is(a, b)` est identique à `a === b`.

Nous mentionnons `Object.is` ici, car il est souvent utilisé dans les spécifications JavaScript. Lorsqu'un algorithme interne doit comparer deux valeurs pour être exactement identiques, il utilise `Object.is` (appelé en interne [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
```

## parseInt et parseFloat

La conversion numérique à l'aide d'un plus `+` ou `Number()` est strict. Si une valeur n'est pas exactement un nombre, elle échoue :

```js run
alert( +"100px" ); // NaN
```

La seule exception concerne les espaces au début ou à la fin de la chaîne de caractères, car ils sont ignorés.

<<<<<<< HEAD
Mais dans la vraie vie, nous avons souvent des valeurs en unités, comme `"100px"` ou `"12pt"` en CSS. En outre, dans de nombreux pays, le symbole monétaire se situe après le montant. Nous avons donc `"19€"` et souhaitons en extraire une valeur numérique.
=======
But in real life, we often have values in units, like `"100px"` or `"12pt"` in CSS. Also in many countries, the currency symbol goes after the amount, so we have `"19€"` and would like to extract a numeric value out of that.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

C'est à quoi servent `parseInt` et `parseFloat`.

Ils "lisent" un nombre d'une chaîne jusqu'à ce qu'ils ne puissent plus. En cas d'erreur, le numéro rassemblé est renvoyé. La fonction `parseInt` renvoie un entier, tandis que `parseFloat` renvoie un nombre à virgule :

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, seule la partie entière est renvoyée
alert( parseFloat('12.3.4') ); // 12.3, le deuxième point arrête la lecture
```

Il y a des situations où `parseInt` / `parseFloat` retournera `NaN`. Cela arrive quand on ne peut lire aucun chiffre :

```js run
alert( parseInt('a123') ); // NaN, le premier symbole arrête le processus
```

````smart header="Le second argument de `parseInt(str, radix)`"
La fonction `parseInt()` a un second paramètre optionnel. Il spécifie la base du système numérique, ce qui permet à `parseInt` d'analyser également les chaînes de nombres hexadécimaux, binaires, etc. :

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, sans 0x cela fonctionne également

alert( parseInt('2n9c', 36) ); // 123456
```
````

## Autres fonctions mathématiques

JavaScript a un objet [Math](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math) intégré qui contient une petite bibliothèque de fonctions et de constantes mathématiques.

Quelques exemples :

`Math.random()`
: Retourne un nombre aléatoire de 0 à 1 (1 non compris).

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (tout nombre aléatoire)
    ```

`Math.max(a, b, c...)` et `Math.min(a, b, c...)`
: Renvoie le plus grand et le plus petit d'un nombre arbitraire d'arguments.

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: Renvoie `n` élevé à la puissance `power` donnée.

    ```js run
    alert( Math.pow(2, 10) ); // 2 puissance 10 = 1024
    ```

Il y a plus de fonctions et de constantes dans l'objet Math, y compris la trigonométrie, que vous pouvez trouver dans la [documentation de l'objet Math](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math).

## Résumé

Pour écrire des nombres avec beaucoup de zéros :

- Ajoutez `"e"` avec le nombre de zéros au nombre. Comme `123e6` est `123` avec 6 zéros soit `123000000`.
- Un nombre négatif après le `"e"` entraîne la division du nombre par 1 suivi par le nombre de zéros donnés. Comme `123-e6` est `123` divisé par 1 suivi de 6 zéros, soit `0.000123` (`123` millionièmes).

Pour différents systèmes de numération :

- Il est possible d'écrire des nombres directement dans les systèmes hex (`0x`), octal (`0o`) et binaire (`0b`).
- `parseInt(str, base)` passe la chaîne de caractères `str` vers un système numérique avec une `base` donnée : `2 ≤ base ≤ 36`.
- `num.toString(base)` convertit un nombre en chaîne de caractères dans le système numérique de la `base` donnée.

Pour les tests de nombres réguliers :

- `isNaN(value)` convertit son argument en nombre puis vérifie s'il s'agit de `NaN`.
- `Number.isNaN(value)` vérifie si son argument appartient au type `number` et, si c'est le cas, vérifie s'il s'agit de `NaN`.
- `isFinite(value)` convertit son argument en nombre puis vérifie s'il ne s'agit pas de `NaN` / `Infinity` / `-Infinity`.
- `Number.isFinite(value)` vérifie si son argument appartient au type `number` et, si c'est le cas, vérifie s'il ne s'agit pas de `NaN` / `Infinity` / `-Infinity`.

Pour convertir des valeurs telles que `12pt` et `100px` en nombres :

- Utiliser `parseInt` / `parseFloat` pour la conversion "soft", qui lit un nombre à partir d'une chaîne de caractères, puis renvoie la valeur qu'il pouvait lire avant de rencontrer une erreur.

Pour les fractions :

- Arrondissez en utilisant `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` ou `num.toFixed(précision)`.
- Assurez-vous de ne pas perdre de précision lorsque vous travaillez avec des fractions.

Plus de fonctions mathématiques :

<<<<<<< HEAD
- Voir l'objet [Math](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math) quand vous en avez besoin. La bibliothèque est très petite, mais peut couvrir les besoins de base.
=======
- See the [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object when you need them. The library is very small but can cover basic needs.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
