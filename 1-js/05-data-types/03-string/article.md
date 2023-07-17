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

Les guillemets simples et doubles sont essentiellement les mêmes. Les backticks nous permettent toutefois d’incorporer n’importe quelle expression dans la chaîne de caractères, en l'enveloppant dans `${…}` :

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

alert(guestList); // une liste d'invités sur plusieurs lignes
```

Ça a l'air naturel, non? Mais les guillemets simples ou doubles ne fonctionnent pas de cette façon.

Si nous les utilisons et essayons d'utiliser plusieurs lignes, il y aura une erreur :

```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";
```

Les guillemets simples et doubles proviennent d'anciens temps de la création linguistique lorsque la nécessité de chaînes multilignes n'était pas prise en compte. Les backticks sont apparus beaucoup plus tard et sont donc plus polyvalents.

Les backticks nous permettent également de spécifier un "modèle de fonction" avant le premier backtick. La syntaxe est la suivante : <code>func&#96;string&#96;</code>. La fonction `func` est appelée automatiquement, elle reçoit la chaîne de caractères et les expressions incorporées et peut les traiter. Cette fonctionnalité est appelée "tagged templates", elle est rarement vue, mais vous pouvez en savoir plus à ce sujet dans la doc MDN : [Template literals](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).

## Caractères spéciaux

Il est encore possible de créer des chaînes de caractères multilignes avec des guillemets simples et doubles en utilisant un "caractère de nouvelle ligne", écrit comme ceci `\n`, qui spécifie un saut de ligne :

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // une liste d'invités multiligne, pareil qu'au dessus
```

Comme exemple plus simple, ces deux lignes sont égales, juste écrites différemment :

```js run
let str1 = "Hello\nWorld"; // deux lignes utilisant un "symbole de nouvelle ligne"

// deux lignes utilisant une nouvelle ligne normale et des backticks
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

Il existe d'autres caractères "spéciaux" moins courants.

Voici la liste complète :

| Caractère                                          | Description                                                                                                                                                                                      |
|----------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `\n`                                               | Nouvelle ligne                                                                                                                                                                                   |
| `\r`                                               | Dans les fichiers texte Windows, une combinaison de deux caractères `\r\n` représente une nouvelle pause, tandis que sur un système d'exploitation non Windows, il s'agit simplement de `\n`. C'est pour des raisons historiques, la plupart des logiciels Windows comprennent également `\n`. |
| `\'`, `\"`                                         | Quotes                                                                                                                                                                                           |
| `\\`                                               | Backslash                                                                                                                                                                                        |
| `\t`                                               | Tab                                                                                                                                                                                              |
| `\b`, `\f`, `\v`                                   | Backspace, Form Feed, Vertical Tab -- conservés pour compatibilité, non utilisés de nos jours.                                                                                                   |

Comme vous pouvez le voir, tous les caractères spéciaux commencent par un backslash (barre oblique inversée) `\`. On l'appelle aussi "caractère d'échappement".

Parce que c'est si spécial, si nous devons afficher une véritable barre oblique inverse `\` dans la chaîne, nous devons la doubler :

```js run
alert( `The backslash: \\` ); // The backslash: \
```

Les guillemets dits "échappés" `\'`, `\"`, <code>\\`</code> sont utilisés pour insérer un guillemet dans la même chaîne entre guillemets.

Par exemple :

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Comme vous pouvez le constater, nous devons précéder le simple quote intérieure du backslash `\'`, sinon, cela indiquerait la fin de la chaîne de caractères.

Bien sûr, il ne faut échapper que les guillemets identiques à ceux qui les entourent. Donc, comme solution plus élégante, nous pourrions passer aux guillemets doubles ou aux backticks :

```js run
alert( "I'm the Walrus!" ); // I'm the Walrus!
```

Outre ces caractères spéciaux, il existe également une notation spéciale pour les codes Unicode `\u…`, elle est rarement utilisée et est couverte dans le chapitre facultatif sur [Unicode](info:unicode).

## Longueur de chaîne de caractères

La propriété `length` indique la longueur de la chaîne de caractères :

```js run
alert( `My\n`.length ); // 3
```

Notez que `\n` est un seul caractère "spécial", la longueur est donc bien `3`.

```warn header="`length` est une propriété"
Les personnes ayant des connaissances dans d'autres langages peuvent parfois commettre des erreurs en l'appelant `str.length()` au lieu de `str.length`. Cela ne fonctionne pas.

Veuillez noter que `str.length` est une propriété numérique et non une fonction. Il n'est pas nécessaire d'ajouter des parenthèses après. Pas `.length()`, mais `.length`.
```

## Accéder aux caractères

Pour obtenir un caractère à la position `pos`, utilisez des crochets `[pos]` ou appelez la méthode [str.at(pos)](mdn:js/String/at). Le premier caractère commence à la position zéro :

```js run
let str = `Hello`;

// le premier caractère
alert( str[0] ); // H
alert( str.at(0) ); // H

// le dernier caractère
alert( str[str.length - 1] ); // o
alert( str.at(-1) ); // o
```

Comme vous pouvez le voir, la méthode `.at(pos)` a l'avantage de permettre une position négative. Si `pos` est négatif, alors il est compté à partir de la fin de la chaîne de caractères.

Donc `.at(-1)` signifie le dernier caractère, et `.at(-2)` est celui qui le précède, etc.

Les crochets renvoient toujours `undefined` pour les index négatifs, par exemple :

```js run
let str = `Hello`;

alert( str[-2] ); // undefined
alert( str.at(-2) ); // l
```

Nous pouvons également parcourir les caractères en utilisant un `for..of` :

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char devient "H", ensuite "e", ensuite "l", etc.)
}
```

## Les chaînes de caractères sont immuables

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

str = 'h' + str[1];  // remplace la haine de caractères

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

```js run
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## Rechercher un substring (partie de la chaîne de caractères)

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

### includes, startsWith, endsWith

La méthode plus moderne [str.includes(substr, pos)](mdn:js/String/includes) retourne `true`/`false` en fonction de si `str` contient `substr`.

C’est le bon choix si nous devons tester la présence, mais n’avons pas besoin de sa position :

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

Le deuxième argument optionnel de `str.includes` est la position de départ de la recherche :

```js run
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, à partir de la position 3, il n'y a pas de "id"
```

Les méthodes [str.startsWith](mdn:js/String/startsWith) et [str.endsWith](mdn:js/String/endsWith) font exactement ce qu'elle disent :

```js run
alert( "*!*Wid*/!*get".startsWith("Wid") ); // true, "Widget" démarre avec "Wid"
alert( "Wid*!*get*/!*".endsWith("get") ); // true, "Widget" fini avec "get"
```

## Obtenir un substring (sous-chaîne de caractères)

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
    alert( str.slice(2) ); // 'ringify', à partir de la 2e position jusqu'à la fin
    ```

    Des valeurs négatives pour `start`/`end` sont également possibles. Elles veulent dire que la position est comptée à partir de la fin de la chaîne de caractères :

    ```js run
    let str = "strin*!*gif*/!*y";

    // commence à la 4ème position à partir de la droite, se termine au 1er à partir de la droite
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])`
: Renvoie la partie de la chaîne de caractères *entre* `start` et `end` (`end` non inclus).

    C'est presque la même chose que `slice`, mais cela permet à `start` d'être supérieur à `end` (dans ce cas, il échange simplement les valeurs `start` et `end`).

    Par exemple :

    ```js run
    let str = "st*!*ring*/!*ify";

    // ce sont les mêmes pour substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...mais pas pour slice :
    alert( str.slice(2, 6) ); // "ring" (le même résultat)
    alert( str.slice(6, 2) ); // "" (une chaîne de caractères vide)

    ```

    Les arguments négatifs ne sont pas supportés (contrairement à slice), ils sont traités comme `0`.

`str.substr(start [, length])`
: Renvoie la partie de la chaîne de caractères à partir de `start`, avec le `length` (longueur) donné.

    Contrairement aux méthodes précédentes, celle-ci nous permet de spécifier la longueur `length` au lieu de la position finale :

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // 'ring', à partir de la 2ème position on obtient 4 caractères
    ```

    Le premier argument peut être négatif, pour compter à partir de la fin :

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // 'gi', à partir de la 4ème position on obtient 2 caractères
    ```

Cette méthode réside dans l'[Annexe B](https://tc39.es/ecma262/#sec-string.prototype.substr) de la spécification du langage. Cela signifie que seuls les moteurs JavaScript hébergés par un navigateur doivent le prendre en charge et qu'il n'est pas recommandé de l'utiliser. En pratique, il est supporté partout.

Récapitulons ces méthodes pour éviter toute confusion :

| méthodes                | séléction ...                           | valeurs negatives                    |
|-------------------------|-----------------------------------------|--------------------------------------|
| `slice(start, end)`     | de `start` à `end` (n'inclue pas `end`) | permet les négatifs                  |
| `substring(start, end)` | entre `start` et `end`                  | les valeurs négatives signifient `0` |
| `substr(start, length)` | de `start` obtient `length` caractères  | permet un `start` negatif            |

```smart header="Lequel choisir ?"
Tous peuvent faire le travail. Formellement, `substr` présente un inconvénient mineur : il n’est pas décrit dans la spécification JavaScript principale, mais dans l’Annexe B, qui couvre les fonctionnalités réservées au navigateur qui existent principalement pour des raisons historiques. Ainsi, les environnements autres que les navigateurs peuvent ne pas le prendre en charge. Mais dans la pratique, cela fonctionne partout.

Parmi les deux autres variantes, `slice` est un peu plus flexible, il permet des arguments négatifs et une écriture plus courte.

Donc, pour une utilisation pratique, il suffit de ne retenir que "slice".
```

## Comparer les strings

Comme nous le savons du chapitre <info:comparison>, les strings sont comparées caractère par caractère dans l'ordre alphabétique.

Bien que, il y a quelques bizarreries.

1. Une lettre minuscule est toujours plus grande qu'une majuscule :

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Les lettres avec des signes diacritiques sont "hors d'usage" :

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    Cela peut conduire à des résultats étranges si nous trions ces noms de pays. Habituellement, les gens s'attendent à trouver `Zealand` après `Österreich` dans la liste.

Pour comprendre ce qui se passe, nous devons être conscients que les chaînes de caractères en JavaScript sont encodées en utilisant [UTF-16](https://en.wikipedia.org/wiki/UTF-16). C'est-à-dire que chaque caractère a un code numérique correspondant.

Il existe des méthodes spéciales qui permettent d'obtenir le caractère pour le code et inversement :

`str.codePointAt(pos)`
: Renvoie un nombre décimal représentant le code du caractère à la position `pos` :

    ```js run
    // différentes lettres majuscules ont des codes différents
    alert( "Z".codePointAt(0) ); // 90
    alert( "z".codePointAt(0) ); // 122
    alert( "z".codePointAt(0).toString(16) ); // 7a (si nous avons besoin d'une valeur hexadécimale)
    ```

`String.fromCodePoint(code)`
: Crée un caractère par son `code` chiffre

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    alert( String.fromCodePoint(0x5a) ); // Z (nous pouvons également utiliser une valeur hexadécimale comme argument)
    ```

Voyons maintenant les caractères avec les codes `65..220` (l’alphabet latin et un peu plus) en créant une chaîne de caractères de ceux-ci :

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// Output:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Vous voyez ? Les caractères majuscules sont les premiers, puis quelques spéciaux, puis les minuscules, et `Ö` vers la fin de la sortie.

Maintenant, cela devient évident pourquoi `a > Z`.

Les caractères sont comparés par leur code numérique. Le plus grand code signifie que le caractère est plus grand. Le code pour `a` (97) est supérieur au code pour `Z` (90).

- Toutes les lettres minuscules vont après les lettres majuscules car leurs codes sont plus grands.
- Certaines lettres comme `Ö` se distinguent de l'alphabet principal. Ici, le code est supérieur à tout ce qui va de `a` à `z`.

### Les comparaisons correctes [#comparaisons-correctes]

L'algorithme "approprié" pour effectuer des comparaisons de chaînes est plus complexe qu'il n'y paraît, car les alphabets diffèrent d'une langue à l'autre.

Le navigateur doit donc connaître la langue à comparer.

Heureusement, les navigateurs modernes prennent en charge la norme d'internationalisation [ECMA-402](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/).

Elle fournit une méthode spéciale pour comparer des chaînes de caractères dans différentes langues, en respectant leurs règles.

L'appel [str.localeCompare(str2)](mdn:js/String/localeCompare) renvoie un entier indiquant si `str` est inférieur, égal ou supérieur à `str2` selon les règles du langage :

- Renvoie un nombre négatif si `str` est inférieur à `str2`
- Renvoie un nombre positif si `str` est supérieur à `str2`
- Renvoie `0` s'ils sont équivalents.

Par exemple :

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

Cette méthode a en fait deux arguments supplémentaires spécifiés dans [la documentation](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/localeCompare), ce qui lui permet de spécifier la langue (par défaut, pris dans l'environnement, l'ordre des lettres dépend de la langue) et de définir des règles supplémentaires telles que la sensibilité à la casse ou doit-on traiter `"a"` et `"á"` de la même manière, etc.

## Résumé

<<<<<<< HEAD
- Il existe 3 types de quotes : simples (`'`), doubles (`"`) et les backticks (`` ` ``). Les backticks permettent à une chaîne de s'étendre sur plusieurs lignes et d'intégrer des expressions `${…}`.
- Nous pouvons utiliser des caractères spéciaux, comme un saut de ligne `\n`.
- Pour obtenir un caractère d'une string, utilisez `[]` ou la méthode `at`.
- Pour obtenir un substring, utilisez les méthodes `slice` ou `substring`.
- Pour mettre une chaîne de caractères en minuscule ou en majuscule, utilisez les méthodes `toLowerCase` ou `toUpperCase`.
- Pour rechercher un substring, utilisez `indexOf`, ou `includes` / `startsWith` / `endsWith` pour de simple vérifications.
- Pour comparer les chaînes de caractères en fonction de la langue, utilisez la méthode `localeCompare`, si non ils sont comparés par les codes de caractères.
=======
- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions `${…}`.
- We can use special characters, such as a line break `\n`.
- To get a character, use: `[]` or `at` method.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.
>>>>>>> 733ff697c6c1101c130e2996f7eca860b2aa7ab9

Il existe plusieurs autres méthodes utiles dans les strings :

- `str.trim()` -- retire les espaces ("trims") du début et de la fin de la chaîne de caractères.
- `str.repeat(n)` -- répète la chaîne de caractères `n` fois.
- … et plus. Voir le [manuel](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) pour plus de détails.

Les strings ont aussi des méthodes pour rechercher / remplacer avec des expressions régulières. Mais c’est un sujet important, il est donc expliqué dans une autre section de ce tutoriel <info:regular-expressions>.

<<<<<<< HEAD
De plus, à partir de maintenant, il est important de savoir que les chaînes de caractères sont basées sur l'encodage Unicode, et donc il y a des problèmes avec les comparaisons. Il y a plus d'informations sur Unicode dans le chapitre <info:unicode>.
=======
Also, as of now it's important to know that strings are based on Unicode encoding, and hence there're issues with comparisons. There's more about Unicode in the chapter <info:unicode>.
>>>>>>> 733ff697c6c1101c130e2996f7eca860b2aa7ab9
