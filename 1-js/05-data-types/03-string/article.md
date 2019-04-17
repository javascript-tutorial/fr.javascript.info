# Strings

En JavaScript, les données de type texte sont stockées sous forme de chaînes de caractères. Il n'y a pas de type séparé pour un seul caractère.

Le format interne des chaînes de caractères est toujours [UTF-16](https://en.wikipedia.org/wiki/UTF-16), il n'est pas lié au codage de la page.

## Quotes

Rappelons les types de quotes.

Les chaînes de caractères peuvent être placées entre guillemets simples, doubles ou backticks :

```js
let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`;
```

Les guillemets simples et doubles sont essentiellement les mêmes. Les backticks nous permettent toutefois d’incorporer n’importe quelle expression dans la chaîne de caractères, y compris les appels de fonction :

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

L’utilisation des backticks présente également l’avantage de permettre à une chaîne de caractères de couvrir plusieurs lignes :

```js run
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // a list of guests, multiple lines
```

Si nous essayons d'utiliser des guillemets simples ou doubles de la même manière, il y aura une erreur :
```js run
let guestList = "Guests:  // Error: Unexpected token ILLEGAL
  * John";
```

Les guillemets simples et doubles proviennent d'anciens temps de la création linguistique lorsque la nécessité de chaînes multilignes n'était pas prise en compte. Les backticks sont apparus beaucoup plus tard et sont donc plus polyvalents.

Les Backticks nous permettent également de spécifier un "modèle de fonction" avant le premier backtick. La syntaxe est la suivante : <code>func&#96;string&#96;</code>. La fonction `func` est appelée automatiquement, reçoit la chaîne de caractères et les expressions incorporées et peut les traiter. Vous pouvez en savoir plus à ce sujet dans la [doc](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Litt%C3%A9raux_gabarits#Gabarits_%C3%A9tiquet%C3%A9s_2). Cela s'appelle des "tagged templates" (Gabarits étiquetés). Cette fonctionnalité facilite l'intégration de chaînes de caractères dans des modèles personnalisés ou d'autres fonctionnalités, mais elle est rarement utilisée.


## Caractères spéciaux

Il est encore possible de créer des chaînes de caractères multilignes avec des guillemets simples en utilisant un "caractère de nouvelle ligne", écrit comme ceci `\n`, qui spécifie un saut de ligne :

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // une liste d'invités multiligne
```

Par exemple, ces deux lignes décrivent la même chose :

```js run
alert( "Hello\nWorld" ); // deux lignes utilisant un "symbole de nouvelle ligne"

// deux lignes utilisant une nouvelle ligne normale via les backticks 
alert( `Hello
World` );
```

Il existe également d'autres caractères "spéciaux" moins courants. Voici [la liste](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String#%C3%89chappement_des_caract%C3%A8res) :

| Caractères     | Description                                                                                                                                                                   |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `\b`           | Retour arrière                                                                                                                                                                |
| `\f`           | Saut de page (form feed)                                                                                                                                                      |
| `\n`           | Nouvelle ligne                                                                                                                                                                |
| `\r`           | Retour chariot                                                                                                                                                                |
| `\t`           | Tabulation                                                                                                                                                                    |
| `\uNNNN`       | Un symbole Unicode avec le code hexadécimal `NNNN`, par exemple `\u00A9` -- est un unicode pour le symbole de copyright `©`. Ce doit être exactement 4 chiffres hexadécimaux. |
| `\u{NNNNNNNN}` | Certains caractères rares sont codés avec deux symboles Unicode, prenant jusqu'à 4 octets. Ce long unicode nécessite des accolades autour de lui.                             |

Exemples avec unicode :

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, un rare hiéroglyphe chinois (long unicode)
alert( "\u{1F60D}" ); // 😍, un symbole de visage souriant (un autre long unicode)
```

Tous les caractères spéciaux commencent par un backslash (barre oblique inversée) `\`. On l'appelle aussi "caractère d'échappement".

Nous l'utilisons également si nous voulons insérer un quote dans la chaîne de caractères.

Par exemple :

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Comme vous pouvez le constater, nous devons précéder le simple quote intérieure du backslash `\'`, sinon, cela indiquerait la fin de la chaîne de caractères.

Bien sûr, cela ne concerne que les quotes identiques à ceux qui les entourent. Donc, comme solution plus élégante, nous pourrions utiliser des guillemets ou des backticks :

```js run
alert( `I'm the Walrus!` ); // I'm the Walrus!
```

Veuillez noter que le backslash `\` sert à la lecture correcte de la chaîne de caractères par JavaScript, puis disparaît. La chaîne de caractères en mémoire ne contient pas `\`. Vous pouvez le voir clairement dans l'`alert` à partir des exemples ci-dessus.

Mais que faire si nous devons afficher un réel backslash `\` à l'intérieur de la chaine de caractères ?

C’est possible, mais nous devons le doubler comme ceci `\\` :

```js run
alert( `The backslash: \\` ); // The backslash: \
```

## Longueur de chaine de caractères


La propriété `length` determine la longueur de chaine de caractères :

```js run
alert( `My\n`.length ); // 3
```

Notez que `\n` est un seul caractère "spécial", la longueur est donc bien `3`.

```warn header="`length` est une propriété"
Les personnes ayant des connaissances dans d'autres langages peuvent parfois commettre des erreurs en l'appelant `str.length()` au lieu de `str.length`. Cela ne fonctionne pas.

Veuillez noter que `str.length` est une propriété numérique et non une fonction. Il n'est pas nécessaire d'ajouter des parenthèses après.
```

## Accéder aux caractères

Pour obtenir un caractère à la position `pos`, utilisez des crochets `[pos]` ou appelez la méthode [str.charAt(pos)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/charAt). Le premier caractère commence à la position zéro :

```js run
let str = `Hello`;

// le premier caractère
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// le dernier caractère
alert( str[str.length - 1] ); // o
```

Les crochets sont un moyen moderne d’obtenir un caractère, tandis que `charAt` existe principalement pour des raisons historiques.

La seule différence entre eux est que si aucun caractère  n'est trouvé, `[]` retourne `undefined`, et `charAt` retourne une chaine de caractères vide :

```js run
let str = `Hello`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (un string vide)
```

Nous pouvons également parcourir les caractères en utilisant un `for..of` :

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char devient "H", ensuite "e", ensuite "l" etc)
}
```

## Les chaine de caractères sont immuables 

Les chaînes de caractères ne peuvent pas être changées en JavaScript. Il est impossible de modifier un caractère.

Essayons de démontrer que cela ne fonctionne pas :

```js run
let str = 'Hi';

str[0] = 'h'; // error
alert( str[0] ); // ne fonctionne pas
```

La solution habituelle consiste à créer une nouvelle chaîne et à l’affecter à `str` au lieu de l’ancienne.

Par exemple :

```js run
let str = 'Hi';

str = 'h' + str[1];  // remplace la chaine de caractères

alert( str ); // hi
```

Nous verrons plus d'exemples dans les sections suivantes.

## Modifier la casse

Les méthodes [toLowerCase()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/toLowerCase) et [toUpperCase()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/toUpperCase) modifient la casse :

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

Ou, si nous voulons un seul caractère minuscule :

```js
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## Rechercher un substring (partie de la chaine de caractères)

Il existe plusieurs façons de rechercher une partie d'une chaîne de caractères.

### str.indexOf

La première méthode est [str.indexOf(substr, pos)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/indexOf).

Il cherche le `substr` dans `str`, en partant de la position donnée `pos`, et retourne la position où la correspondance a été trouvée ou `-1` si rien ne peut être trouvé.

Par exemple :

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, parce que 'Widget' est trouvé au début
alert( str.indexOf('widget') ); // -1, pas trouvé, la recherche est sensible à la casse

alert( str.indexOf("id") ); // 1, "id" est trouvé à la position 1 (..idget avec id)
```

Le second paramètre optionnel nous permet de rechercher à partir de la position donnée.

Par exemple, la première occurrence de `"id"` est à la position `1`. Pour rechercher l’occurrence suivante, commençons la recherche à partir de la position `2` :

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```


Si toutes les occurrences nous intéressent, nous pouvons exécuter `indexOf` dans une boucle. Chaque nouvel appel est passé avec la position après le match précédent :


```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // cherchons le

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // continue la recherche à partir de la position suivante
}
```

Le même algorithme peut être raccourci :

```js run
let str = "As sly as a fox, as strong as an ox";
let target = "as";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(pos)`"
Il y a aussi une méthode similaire [str.lastIndexOf(pos)](mdn:js/String/lastIndexOf) qui cherche de la fin d'une chaîne de caractères à son début.

Elle liste les occurrences dans l'ordre inverse.
```

Il y a un léger inconvénient avec `indexOf` dans le test `if`. On ne peut pas le mettre dans le `if` comme ceci :

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it"); // ne fonctionne pas !
}
```

L’`alert` dans l’exemple ci-dessus ne s’affiche pas parce que `str.indexOf("Widget")` retourne `0` (ce qui signifie qu'il a trouvé la correspondance à la position de départ). Oui, mais `if` considère que `0` est `false`.

Nous devrions donc effectuer la vérification avec `-1`, comme ceci :

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("We found it"); // fonctionne maintenant !
}
```

````smart header="L'astuce du NON binaire"
L’un des vieux trucs utilisés ici est l'opérateur [NON binaire](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Op%C3%A9rateurs_binaires#(NON_binaire)) `~`. Il convertit le nombre en un entier de 32 bits (supprime la partie décimale, s'elle existe), puis inverse tous les bits de sa représentation binaire.

Pour les entiers 32 bits, l'appel `~n` signifie exactement la même chose que `-(n+1)` (en raison du format IEEE-754).

Par exemple :

```js run
alert( ~2 ); // -3, le même que -(2+1)
alert( ~1 ); // -2, le même que -(1+1)
alert( ~0 ); // -1, le même que -(0+1)
*!*
alert( ~-1 ); // 0, le même que -(-1+1)
*/!*
```

Comme on peut le voir, `~n` est zéro uniquement si `n == -1`.

Donc le test `if ( ~str.indexOf("...") )` est vrai tant que le résultat de `indexOf` n'est pas `-1`. En d'autres termes, quand il y a une correspondance.

Les gens l'utilisent pour raccourcir les vérifications `indexOf` :

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // fonctionne
}
```

Il n'est généralement pas recommandé d'utiliser les fonctionnalités du langage de manière non évidente, mais cette astuce particulière est largement utilisée dans l'ancien code. Nous devons donc le comprendre.

Rappelez-vous juste que : `if (~str.indexOf(...))` se lit "si trouvé".

````

### includes, startsWith, endsWith

La méthode plus moderne [str.includes(substr, pos)](mdn:js/String/includes) retourne `true/false` en fonction de si `str` contient `substr`.

C’est le bon choix si nous devons tester la présence, mais n’avons pas besoin de sa position :

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

Le deuxième argument optionnel de `str.includes` est la position de départ de la recherche :

```js run
alert( "Midget".includes("id") ); // true
alert( "Midget".includes("id", 3) ); // false, à partir de la position 3 il n'y a pas "id"
```

Les méthodes [str.startsWith](mdn:js/String/startsWith) et [str.endsWith](mdn:js/String/endsWith) font exactement ce qu'elle disent :

```js run
alert( "Widget".startsWith("Wid") ); // true, "Widget" commence avec "Wid"
alert( "Widget".endsWith("get") );   // true, "Widget" fini avec "get"
```

## Obtenir un substring (sous-chaine de caractères)

Il existe 3 méthodes en JavaScript pour obtenir un substring : `substring`, `substr` et `slice`.

`str.slice(start [, end])`
: Renvoie la partie de la chaîne de caractères de `start` jusqu'à (sans l'inclure) `end`.

    Par exemple :

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', le substring de 0 à 5 (sans inclure 5)
    alert( str.slice(0, 1) ); // 's', de 0 à 1, mais sans inclure 1, donc uniquement le caractère à l'index 0
    ```

    S'il n'y a pas de second argument, `slice` va jusqu'à la fin de la chaîne de caractères :

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // ringify, à partir de la 2e position jusqu'à la fin
    ```

    Des valeurs négatives pour `start/end` sont également possibles. Elles veulent dire que la position est comptée à partir de la fin de la chaîne de caractères :

    ```js run
    let str = "strin*!*gif*/!*y";

    // commence à la 4ème position à partir de la droite, se termine au 1er à partir de la droite
    alert( str.slice(-4, -1) ); // gif
    ```


`str.substring(start [, end])`
: Renvoie la partie de la chaîne de caractères *entre* `start` et `end`.

    C'est presque la même chose que `slice`, mais cela permet que `start` soit plus grand que `end`.

    Par exemple :


    ```js run
    let str = "st*!*ring*/!*ify";

    // ce sont les mêmes pour substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...mais pas pour slice :
    alert( str.slice(2, 6) ); // "ring" (le même résultat)
    alert( str.slice(6, 2) ); // "" (une chaine de caractères vide)

    ```

    Les arguments négatifs ne sont pas supportés (contrairement à slice), ils sont traités comme `0`.


`str.substr(start [, length])`
: Renvoie la partie de la chaîne de caractères à partir de `start`, avec le `length` (longueur) donné.

    Contrairement aux méthodes précédentes, celle-ci nous permet de spécifier la longueur `length` au lieu de la position finale :

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // ring, à partir de la 2ème position on obtient 4 caractères
    ```

    Le premier argument peut être négatif, pour compter à partir de la fin :

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // gi, à partir de la 4ème position on obtient 2 caractères
    ```

Récapitulons ces méthodes pour éviter toute confusion :

| méthodes                | séléction ...                           | valeurs negatives                    |
|-------------------------|-----------------------------------------|--------------------------------------|
| `slice(start, end)`     | de `start` à `end` (n'inclue pas `end`) | permet les négatifs                  |
| `substring(start, end)` | entre `start` et `end`                  | les valeurs négatives signifient `0` |
| `substr(start, length)` | de `start` obtient `length` caractères  | permet un `start` negatif            |


```smart header="Lequel choisir ?"
Tous peuvent faire le travail. Formellement, `substr` présente un inconvénient mineur : il n’est pas décrit dans la spécification JavaScript principale, mais dans l’Annexe B, qui couvre les fonctionnalités réservées au navigateur qui existent principalement pour des raisons historiques. Ainsi, les environnements autres que les navigateurs peuvent ne pas le prendre en charge. Mais dans la pratique, cela fonctionne partout.

L'auteur se retrouve à utiliser `slice` presque tout le temps.
```

## Comparer les strings

Comme nous le savons du chapitre <info:comparison>, les strings sont comparées caractère par caractère dans l'ordre alphabétique.

Bien que, il y a quelques bizarreries.

1. Une lettre minuscule est toujours plus grande que la majuscule :

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Les lettres avec des signes diacritiques sont "hors d'usage" :

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    Cela peut conduire à des résultats étranges si nous trions ces noms de pays. Habituellement, les gens s'attendent à `Zealand` pour venir après `Österreich` dans la liste.

Pour comprendre ce qui se passe, examinons la représentation interne des chaînes de caractères en JavaScript.

Toutes les chaînes de caractères sont encodées en utilisant [UTF-16](https://fr.wikipedia.org/wiki/UTF-16). C'est-à-dire que chaque caractère a un code numérique correspondant. Il existe des méthodes spéciales permettant d'obtenir le caractère pour le code et vice versa.

`str.codePointAt(pos)`
: Retourne le code du caractère à la position `pos`:

    ```js run
    // différentes casses de lettres ont des codes différents
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: Crée un caractère par son `code` chiffre 

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

    Nous pouvons également ajouter des caractères Unicode par leurs codes en utilisant `\u` suivi du code hexadécimal :

    ```js run
    // 90 is 5a en système hexadécimal
    alert( '\u005a' ); // Z
    ```

Voyons maintenant les caractères avec les codes `65..220` (l’alphabet latin et un peu plus) en créant une chaîne de caractères de ceux-ci :

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Vous voyez ? Les caractères majuscules sont les premiers, puis quelques spéciaux, puis les minuscules.

Maintenant, cela devient évident pourquoi `a > Z`.

Les caractères sont comparés par leur code numérique. Le plus grand code signifie que le caractère est plus grand. Le code pour `a` (97) est supérieur au code pour `Z` (90).

- Toutes les lettres minuscules vont après les lettres majuscules car leurs codes sont plus grands.
- Certaines lettres comme `Ö` se distinguent de l'alphabet principal. Ici, le code est supérieur à tout ce qui va de `a` à `z`.


### Les comparaisons correctes

L'algorithme "approprié" pour effectuer des comparaisons de chaînes de caractères est plus complexe qu'il n'y paraît, car les alphabets diffèrent d'une langue à l'autre. La même lettre peut être située différemment dans différents alphabets.

Le navigateur doit donc connaître la langue à comparer.

Heureusement, tous les navigateurs modernes (IE10- nécessite la bibliothèque supplémentaire [Intl.JS](https://github.com/andyearnshaw/Intl.js/)) supportent le standard d'internationalisation [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

Elle fournit une méthode spéciale pour comparer des chaînes de caractères dans différentes langues, en respectant leurs règles.

L'appel [str.localeCompare(str2)](mdn:js/String/localeCompare):

- Retourne `1` si `str` est supérieur à `str2` selon les règles de la langue.
- Retourne `-1` si `str` est inférieur à `str2`.
- Retourne `0` s'ils sont égaux.

Par exemple :

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

Cette méthode a en fait deux arguments supplémentaires spécifiés dans [la documentation](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/localeCompare), ce qui lui permet de spécifier la langue (prise par défaut de l'environnement) et de définir des règles supplémentaires telles que la sensibilité à la casse ou doit-on traiter `"a"` et `"á"` de la même manière, etc.

## Internals, Unicode

```warn header="Savoir avancé"
La section va plus loin dans les entrailles des strings. Cette connaissance vous sera utile si vous envisagez d'utiliser des émojis, des caractères mathématiques rares composés de hiéroglyphes ou d’autres symboles rares.

Vous pouvez ignorer cette section si vous ne prévoyez pas de les utiliser.
```

### Paires de substitution

La plupart des symboles ont un code de 2 octets. Les lettres dans la plupart des langues européennes, les chiffres et même la plupart des hiéroglyphes ont une représentation de 2 octets.

Mais 2 octets ne permettent que 65 536 combinaisons et cela ne suffit pas pour tous les symboles possibles. Les symboles les plus rares sont donc codés avec une paire de caractères de 2 octets appelée "paire de substitution".

La longueur de ces symboles est `2`:

```js run
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare chinese hieroglyph
```

Notez que les paires de substitution n'existaient pas au moment de la création de JavaScript et ne sont donc pas correctement traitées par le langage!

Nous avons en fait un seul symbole dans chacune des chaînes de caractères ci-dessus, mais la `length` indique une longueur de `2`.

`String.fromCodePoint` et `str.codePointAt` font partie des rares méthodes qui traitent correctement les paires de substitution. Ils sont récemment apparus dans le langage. Avant eux, il n'y avait que [String.fromCharCode](mdn:js/String/fromCharCode) and [str.charCodeAt](mdn:js/String/charCodeAt). Ces méthodes sont en fait les mêmes que `fromCodePoint/codePointAt`, mais ne fonctionnent pas avec des paires de substitution.

Mais, par exemple, obtenir un symbole peut être délicat, car les paires de substitution sont traitées comme deux caractères :

```js run
alert( '𝒳'[0] ); // symboles étranges …
alert( '𝒳'[1] ); // … partie de la paire de substitution
```

Notez que les parties isolées de la paire de substitution n'ont aucune signification sans l'autre moitié. Les alertes de l'exemple ci-dessus affichent donc des déchets.

Techniquement, les paires de substitution sont également détectables par leurs codes: si un caractère a le code dans l’intervalle de `0xd800..0xdbff`, alors c'est la première partie de la paire de substitution. Le caractère suivant (deuxième partie) doit avoir le code dans l'intervalle `0xdc00..0xdfff`. Ces intervalles sont réservés exclusivement aux paires de substitution par la norme.

Dans le cas ci-dessus :

```js run
// charCodeAt ne connait pas la paire de substitution, il donne donc des codes pour les parties uniquement

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, entre 0xd800 et 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, entre 0xdc00 et 0xdfff
```

Vous trouverez plus de moyens de traiter les paires de substitution plus tard dans le chapitre <info:iterable>. Il y a probablement des librairies spéciales pour cela aussi, mais rien de suffisamment célèbre à suggérer ici.

### Marques diacritiques et normalisation

Dans de nombreuses langues, il existe des symboles composés du caractère de base avec une marque au-dessus / au-dessous.

Par exemple, la lettre `a` peut être le caractère de base pour : `àáâäãåā`. Les caractères “composites” les plus courants ont leur propre code dans la table UTF-16. Mais pas tous, car il y a trop de combinaisons possibles.

Pour prendre en charge des compositions arbitraires, UTF-16 nous permet d’utiliser plusieurs caractères Unicode. Le caractère de base et un ou plusieurs "caractères" qui le "décorent".

Par exemple, si nous avons un `S` suivi du caractère spécial "point au-dessus" (code `\u0307`), il est affiché comme `Ṡ`.

```js run
alert( 'S\u0307' ); // Ṡ
```

Si nous avons besoin d'une marque supplémentaire au-dessus de la lettre (ou au-dessous) - pas de problème, ajoutez simplement le code de marque nécessaire.

Par exemple, si nous ajoutons un caractère "point en dessous" (code `\u0323`), alors nous aurons un "S avec un point en haut et en bas" : `Ṩ`.

Par exemple :

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

Cela offre une grande flexibilité, mais aussi un problème intéressant: deux caractères peuvent se ressembler visuellement mais être représentés avec des compositions unicode différentes.

Par exemple :

```js run
alert( 'S\u0307\u0323' ); // Ṩ, S + point dessus + point dessous
alert( 'S\u0323\u0307' ); // Ṩ, S + point dessous + point dessus

alert( 'S\u0307\u0323' == 'S\u0323\u0307' ); // false
```

Pour résoudre ce problème, il existe un algorithme de "normalisation unicode" qui amène chaque chaîne de caractères à une seule forme "normale".

Il est traité par [str.normalize()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

C’est marrant que dans notre situation `normalize()` réunit en réalité une séquence de 3 caractères sur un : `\u1e68` (S avec deux points).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

En réalité, ce n'est pas toujours le cas. La raison étant que le symbole `Ṩ` est “assez commun”, donc les créateurs UTF-16 l’ont inclus dans la table principale et lui ont donné un code.

Si vous souhaitez en savoir plus sur les règles de normalisation et leurs variantes, reportez-vous à l’annexe du standard Unicode : [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), mais dans la plupart des cas, les informations de cette section sont suffisantes.


## Résumé

- Il existe 3 types de quotes. Les Backticks permettent à une chaîne de s'étendre sur plusieurs lignes et d'intégrer des expressions.
- Les chaînes de caracètres en JavaScript sont encodées en UTF-16.
- Nous pouvons utiliser des caractères spéciaux comme `\n` et insérer des lettres par leur unicode en utilisant `\u...`.
- Pour obtenir un caractère, utilisez : `[]`.
- Pour obtenir un substring utilisez : `slice` or `substring`.
- Pour mettre une chaîne de caractères en minuscule ou en majuscule, utilisez : `toLowerCase/toUpperCase`.
- Pour rechercher un substring utilisez : `indexOf`, ou `includes/startsWith/endsWith` pour de simple vérifications.
- [ ] Pour comparer les chaînes de caractères en fonction de la langue, utilisez : `localeCompare`, sinon, ils sont comparés par les codes de caractères.

Il existe plusieurs autres méthodes utiles dans les strings :

- `str.trim()` -- retire les espaces ("trims") du début et de la fin de la chaîne de caractères.
- `str.repeat(n)` -- répète la chaîne de caractères `n` fois.
- … et plus. Voir le [manuel](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) pour plus de détails.

Les strings ont aussi des méthodes pour rechercher / remplacer avec des expressions régulières. Mais ce sujet mérite un chapitre séparé, nous y reviendrons plus tard.
