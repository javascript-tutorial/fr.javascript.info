# Unicode: indicateur "u" et classe \p{...}

JavaScript utilise [l'encodage Unicode](https://fr.wikipedia.org/wiki/Unicode) pour les chaînes de cractères. La plupart des caractères sont codés sur 2 octets, mais cela permet de représenter au plus 65536 caractères.

Cette plage n'est pas assez grande pour encoder tous les caractères possibles, c'est pourquoi certains caractères rares sont encodés sur 4 octets, par exemple comme `𝒳` (X mathématique) ou `😄` (un sourire), certains hiéroglyphes et ainsi de suite.

Voici les valeurs unicode de certains caractères :

| Caractère | Unicode | Nombre d'octets en unicode |
|-----------|---------|----------|
| a | `0x0061` | 2 |
| ≈ | `0x2248` | 2 |
| 𝒳 | `0x1d4b3` | 4 |
| 𝒴 | `0x1d4b4` | 4 |
| 😄 | `0x1f604` | 4 |

Ainsi, les caractères comme `a` et `≈` occupent 2 octets, tandis que les codes pour `𝒳`, `𝒴` et `😄` sont plus longs, ils ont 4 octets.

Il y a longtemps, lorsque le langage JavaScript a été créé, l'encodage Unicode était plus simple : il n'y avait pas de caractères à 4 octets. Ainsi, certaines fonctionnalités du langage les gèrent toujours de manière incorrecte.

Par exemple, la propriété `length` pense qu'il y a deux caractères :

```js run
alert('😄'.length); // 2
alert('𝒳'.length); // 2
```

... Mais nous pouvons voir qu'il n'y en a qu'un, n'est-ce pas? Le fait est que la propriété `length` traite 4 octets comme deux caractères de 2 octets. C'est incorrect, car ils doivent être considérés uniquement ensemble (aussi appelé "paire de substitution", vous pouvez en lire plus dans l'article <info:string>).

Par défaut, les expressions régulières traitent également les "caractères longs" de 4 octets comme une paire de caractères de 2 octets. Et, comme cela arrive avec les chaînes, cela peut conduire à des résultats étranges. Nous verrons cela un peu plus tard, dans l'article <info:regexp-character-sets-and-ranges>.

Contrairement aux chaînes de caractères, les expressions régulières ont l'indicateur `pattern:u` qui résout ces problèmes. Avec un tel indicateur, une expression rationnelle gère correctement les caractères de 4 octets. Et ainsi la recherche de propriétés Unicode devient également disponible, nous y reviendrons ensuite.

## Propriétés Unicode \p{...}

```warn header =" Non pris en charge par Firefox et Edge "
Bien qu'elles fassent partie de la norme depuis 2018, les propriétés unicode ne sont pas prises en charge dans Firefox ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1361876)) et Edge ([bug](https://github.com/Microsoft/ChakraCore/issues/2969)).

Il existe une bibliothèque logicielle [XRegExp](http://xregexp.com) qui fournit des expressions régulières "étendues" avec prise en charge multi-navigateur pour les propriétés unicode.
```

Chaque caractère dans Unicode a beaucoup de propriétés. Ils décrivent à quelle "catégorie" le caractère appartient, et contiennent diverses informations à son sujet.

Par exemple, si un caractère a la propriété `Letter` (Lettre), cela signifie que le caractère appartient à un alphabet (de n'importe quelle langue). Et la propriété `Number` (Nombre) signifie que c'est un chiffre : peut-être l'arabe ou le chinois, et ainsi de suite.

Nous pouvons rechercher des caractères avec une propriété, écrite sous la forme `pattern:\p{…}`. Pour utiliser `pattern:\p{…}`, une expression régulière doit avoir l'indicateur `pattern:u`.

Par exemple, `\p{Letter}` désigne une lettre dans n'importe quelle langue. Nous pouvons également utiliser `\p{L}`, car `L` est un alias de `Letter` (Lettre). Il existe des alias plus courts pour presque toutes les propriétés.

Dans l'exemple ci-dessous, on trouvera trois types de lettres : Anglais, Géorgien et Coréen.

```js run
let str = "A ბ ㄱ";

alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
alert( str.match(/\p{L}/g) ); // null (aucune correspondance, puisqu'il n'y a pas l'indicateur "u")
```

Voici les principales catégories de caractères et leurs sous-catégories :

- Lettre `L` :
  - minuscules `Ll`,
  - modificateur `Lm`,
  - titre `Lt`,
  - majuscule `Lu`,
  - autres `Lo`.
- Nombre `N` :
  - chiffre décimal `Nd`,
  - numéro de lettre `Nl`,
  - autre `No`.
- Ponctuation `P` :
  - connecteur `Pc`,
  - tiret `Pd`,
  - citation initiale `Pi`,
  - citation finale `Pf`,
  - ponctuation ouvrante `Ps`,
  - ponctuation fermante `Pe`,
  - autre `Po`.
- Marqueur `M` (accents, etc.) :
  - espacement combinant `Mc`,
  - contenant `Me`,
  - sans espacement `Mn`.
- Symbole `S` :
  - devise `Sc`,
  - modificateur `Sk`,
  - mathématique `Sm`,
  - autre `So`.
- Séparateur `Z` :
  - ligne `Zl`,
  - paragraphe `Zp`,
  - espace `Zs`.
- Autre `C` :
  - contrôle `Cc`,
  - format `Cf`,
<<<<<<< HEAD
  - non affecté `Cn`,
  - usage privé `Co`,
  - substitut `Cs`.
=======
  - not assigned `Cn`,
  - private use `Co`,
  - surrogate `Cs`.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439


Ainsi, par exemple si nous avons besoin de lettres en minuscules, nous pouvons écrire `pattern:\p{Ll}`, de signes de ponctuation : `pattern:\p{P}` et ainsi de suite.

Il existe également d'autres catégories dérivées, comme :
- `Alphabetic` (Alphabétique)(`Alpha`), qui comprend les lettres `L`, plus les numéros de lettre `Nl` (par exemple Ⅻ - un caractère pour le chiffre romain 12), plus quelques autres symboles `Other_Alphabetic` (Autre alphabétiques)(`OAlpha`).
- `Hex_Digit` comprend des chiffres hexadécimaux : `0-9`, `a-f`.
- ...Et ainsi de suite.

Unicode prend en charge de nombreuses propriétés différentes, leur liste complète nécessiterait beaucoup d'espace, voici donc les références :

- Liste de toutes les propriétés par caractère : <https://unicode.org/cldr/utility/character.jsp>.
- Liste de tous les caractères par propriété : <https://unicode.org/cldr/utility/list-unicodeset.jsp>.
- Alias ​​courts pour les propriétés : <https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt>.
- Une base complète de caractères Unicode au format texte, avec toutes les propriétés, se trouve ici: <https://www.unicode.org/Public/UCD/latest/ucd/>.

### Exemple : nombres hexadécimaux

Par exemple, recherchons des nombres hexadécimaux, écrits sous la forme `xFF`, où `F` est un chiffre hexadécimal (0..1 ou A..F).

Un chiffre hexadécimal peut être désigné par `pattern:\p{Hex_Digit}` :

```js run
let regexp = /x\p{Hex_Digit}\p{Hex_Digit}/u;

alert("number: xAF".match(regexp)); // xAF
```

### Exemple : Hiéroglyphes Chinois

Cherchons des hiéroglyphes Chinois.

<<<<<<< HEAD
Il y a une propriété unicode `Script` (un système d'écriture), qui peut avoir une valeur : `Cyrillic` (Cyrillique), `Greek` (Grec),`Arabic` (Arabe), `Han` (Chinois) et ainsi de suite, [voici la liste complète]("https://en.wikipedia.org/wiki/Script_(Unicode)").
=======
There's a unicode property `Script` (a writing system), that may have a value: `Cyrillic`, `Greek`, `Arabic`, `Han` (Chinese) and so on, [here's the full list](https://en.wikipedia.org/wiki/Script_(Unicode)).
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Pour rechercher des caractères dans un système d'écriture donné, nous devons utiliser `pattern:Script=<value>`, par exemple pour les lettres cyrilliques : `pattern:\p{sc=Cyrillic}`, pour les hiéroglyphes chinois : `pattern:\p{sc=Han}`, et ainsi de suite :

```js run
let regexp = /\p{sc=Han}/gu; // renvoie des hiéroglyphes Chinois

let str = `Hello Привет 你好 123_456`;

alert( str.match(regexp) ); // 你,好
```

### Exemple: devise

Les caractères qui désignent une devise, tels que `$`, `€`, `¥`, ont la propriété unicode `pattern:\p{Currency_Symbol}`, l'alias court : `pattern:\p{Sc}`.

Utilisons-le pour rechercher des prix au format "devise, suivi d'un chiffre" :

```js run
let regexp = /\p{Sc}\d/gu;

let  str = `Prices: $2, €1, ¥9`;

alert( str.match(regexp) ); // $2,€1,¥9
```

Plus loin, dans l'article <info:regexp-quantifiers>, nous verrons comment rechercher des nombres contenant de nombreux chiffres.

## Résumé

L'indicateur `pattern:u` permet la prise en charge d'Unicode dans les expressions régulières.

Cela signifie deux choses :

1. Les caractères de 4 octets sont traités correctement : comme un seul caractère, pas comme deux caractères de 2 octets.
2. Les propriétés Unicode peuvent être utilisées dans la recherche : `\p{…}`.

Avec les propriétés Unicode, nous pouvons rechercher des mots dans des langues données, des caractères spéciaux (guillemets, devises) et ainsi de suite.