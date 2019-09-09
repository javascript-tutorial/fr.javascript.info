# Modèles et marqueurs

Les expressions régulières sont un moyen puissant de rechercher et de remplacer du texte.

<<<<<<< HEAD
En JavaScript, ils sont disponibles en tant qu'objet `RegExp` et sont également intégrés aux méthodes de chaînes de caractères.
=======
In JavaScript, they are available as [RegExp](mdn:js/RegExp) object, and also integrated in methods of strings.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

## Expressions régulières

Une expression régulière (également "regexp" ou simplement "reg") est constituée d'un *pattern* et de *flags* optionnels.

Il existe deux syntaxes pour créer un objet expression rationnelle.

La syntaxe "longue" :

```js
regexp = new RegExp("pattern", "flags");
```

...Et la syntaxe courte, en utilisant des slash `"/"`:

```js
regexp = /pattern/; // aucun marqueur
regexp = /pattern/gmi; // avec marqueurs g, m, et i (bientôt abordés)
```

<<<<<<< HEAD
Les slash `"/"` indique à JavaScript que l'on crée une expression rationnelle. Il joue le même rôle que les guillemets pour les chaînes de caractères (les "string").
=======
Slashes `pattern:/.../` tell JavaScript that we are creating a regular expression. They play the same role as quotes for strings.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

In both cases `regexp` becomes an object of the built-in `RegExp` class.

<<<<<<< HEAD
Pour rechercher dans une chaîne de caractères, on oeut utiliser la méthode [search](mdn:js/String/search).

Un exemple :

```js run
let str = "I love JavaScript!"; // on va rechercher ici
=======
The main difference between these two syntaxes is that slashes `pattern:/.../` do not allow to insert expressions (like strings with `${...}`). They are fully static.

Slashes are used when we know the regular expression at the code writing time -- and that's the most common situation. While `new RegExp` is used when we need to create a regexp "on the fly", from a dynamically generated string, for instance:

```js
let tag = prompt("What tag do you want to find?", "h2");
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

let regexp = new RegExp(`<${tag}>`); // same as /<h2>/ if answered "h2" in the prompt above
```

<<<<<<< HEAD
La méthode `str.search` cherche le modèle `pattern:/love/` et renvoie la position à l'intérieur de la chaîne de caractères. Comme on peut l'imaginer, `pattern:/love/` est le modèle le plus simple qui soit. Il ne fait que de la simple recherche de sous-chaîne.

Le code au-dessus fait la m^me chose que celui-ci:

```js run
let str = "I love JavaScript!"; // on va rechercher ici
=======
## Flags

Regular expressions may have flags that affect the search.

There are only 6 of them in JavaScript:
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

`pattern:i`
: With this flag the search is case-insensitive: no difference between `A` and `a` (see the example below).

<<<<<<< HEAD
Ainsi, chercher le modèle `pattern:/love/` revient à chercher la chaîne `"love"`.

Mais ce n'est que le début. Bientôt nous créerons des expressions rationnelles plus complexes avec de bien plus grandes possibilités de recherche.
=======
`pattern:g`
: With this flag the search looks for all matches, without it -- only the first one.

`pattern:m`
: Multiline mode (covered in the chapter <info:regexp-multiline-mode>).

`pattern:s`
: Enables "dotall" mode, that allows a dot `pattern:.` to match newline character `\n` (covered in the chapter <info:regexp-character-classes>).

`pattern:u`
: Enables full unicode support. The flag enables correct processing of surrogate pairs. More about that in the chapter <info:regexp-unicode>.

`pattern:y`
: "Sticky" mode: searching at the exact position in the text  (covered in the chapter <info:regexp-sticky>)
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

```smart header="Couleurs"
À partir de maintenant le code couleur sera :

- regexp -- `pattern:red`
- chaîne de caractère (là où l'on recherchera) -- `subject:blue`
- résultat -- `match:green`
```

## Searching: str.match

<<<<<<< HEAD
````smart header="Quand utiliser `new RegExp`?"
Normalement on utilise la syntaxe courte `/.../`. Mais l'insertion de variables`${...}` n'est pas supportée.

D'un autre côté, `new RegExp` nous permet de construire un modèle dynamiquement à partir d'une chaîne, et il est donc plus flexible.

Voici un exemple d'une expression rationnelle dynamiquement générée:
=======
As it was said previously, regular expressions are integrated with string methods.

The method `str.match(regexp)` finds all matches of `regexp` in the string `str`.

It has 3 working modes:
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

1. If the regular expression has flag `pattern:g`, it returns an array of all matches:
    ```js run
    let str = "We will, we will rock you";

<<<<<<< HEAD
// trouve <h2> par défaut
alert( "<h1> <h2> <h3>".search(regexp));
```
````
=======
    alert( str.match(/we/gi) ); // We,we (an array of 2 substrings that match)
    ```
    Please note that both `match:We` and `match:we` are found, because flag `pattern:i` makes the regular expression case-insensitive.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

2. If there's no such flag it returns only the first match in the form of an array, with the full match at index `0` and some additional details in properties:
    ```js run
    let str = "We will, we will rock you";

<<<<<<< HEAD
## Les marqueurs

Les expressions rationnelles peuvent avoir des marqueurs qui modifieront la recherche.

Il y en seulement 6 dans JavaScript:

`i`
: Avec ce marqueur la recherche est insensible à la casse: aucune différence entre `A` et `a` (voir exemple ci-dessousw).

`g`
: Avec ce marqueur, la recherche trouve toutes les occurrences du modèle, sans -- uniquement la première occurence (on en verra les usages dans le prochain chapitre).

`m`
: Mode multiligne (couvert dans le chapitre <info:regexp-multiline-mode>).

`s`
: Mode "Dotall", permet l'utilisation de `.` pour correspondre aux nouvelles lignes (couvert dans le chapitre <info:regexp-character-classes>).

`u`
: Active le support complet d'Unicode. Le marqueur permet une procédure correcte des paires de substitution. PLus d'informations dans le chapitre <info:regexp-unicode>.

`y`
: Mode "collant" (couvert dans le chapitre <info:regexp-sticky>)

Tout cela sera couvert plus loin dans le tuoriel.

POur l'instant, le marqueur le plus simple est le `i`, comme dans l'exemple:
=======
    let result = str.match(/we/i); // without flag g

    alert( result[0] );     // We (1st match)
    alert( result.length ); // 1

    // Details:
    alert( result.index );  // 0 (position of the match)
    alert( result.input );  // We will, we will rock you (source string)
    ```
    The array may have other indexes, besides `0` if a part of the regular expression is enclosed in parentheses. We'll cover that in the chapter  <info:regexp-groups>.

3. And, finally, if there are no matches, `null` is returned (doesn't matter if there's flag `pattern:g` or not).

    That's a very important nuance. If there are no matches, we get not an empty array, but `null`. Forgetting about that may lead to errors, e.g.:

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Cannot read property 'length' of null
      alert("Error in the line above");
    }
    ```

    If we'd like the result to be always an array, we can write it this way:

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("No matches"); // now it works
    }
    ```

## Replacing: str.replace

The method `str.replace(regexp, replacement)` replaces matches with `regexp` in string `str` with `replacement` (all matches, if there's flag `pattern:g`, otherwise only the first one).

For instance:
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

```js run
// no flag g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// with flag g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

The second argument is the `replacement` string. We can use special character combinations in it to insert fragments of the match:

<<<<<<< HEAD
alert( str.search(/LOVE/i) ); // 2 (il a trouvé le modèle en minusules)

alert( str.search(/LOVE/) ); // -1 (aucune correspondence sans le marqueur `i`)
```

Ainsi donc, le marqueur `i` rends déjà les expressions rationnelles plus puissantes qu'une simple recherche de sous-chaîne. Mais il reste beaucoup à découvrir. Nous couvrirons les autres marqueurs et les autres fonctionnalités dans les prohains chapitres.
=======
| Symbols | Action in the replacement string |
|--------|--------|
|`$&`|inserts the whole match|
|<code>$&#096;</code>|inserts a part of the string before the match|
|`$'`|inserts a part of the string after the match|
|`$n`|if `n` is a 1-2 digit number, then it inserts the contents of n-th parentheses, more about it in the chapter <info:regexp-groups>|
|`$<name>`|inserts the contents of the parentheses with the given `name`, more about it in the chapter <info:regexp-groups>|
|`$$`|inserts character `$` |

An example with `pattern:$&`:

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

## Testing: regexp.test

The method `regexp.test(str)` looks for at least one match, if found, returns `true`, otherwise `false`.

```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;

alert( regexp.test(str) ); // true
```

Further in this chapter we'll study more regular expressions, come across many other examples and also meet other methods.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

Full information about the methods is given in the article <info:regexp-methods>.

## Résumé

<<<<<<< HEAD
- UNe expression rationnelle consite en un modèle, et des marqueurs optionnels: `g`, `i`, `m`, `u`, `s`, `y`.
- Sans marqueurs ni caractères spéciaux, que nous verrons plus tard, la rechechre regexp revient à une simple recherche de sous-chîne de caractères.
- La méthode `str.search(regexp)` renvoie la position à laquelle une correspondence est trouvée ou `-1` s'il n'y en a aucune. Dans le prochain chapitre nous verrons d'autres méthodes.
=======
- A regular expression consists of a pattern and optional flags: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Without flags and special symbols that we'll study later, the search by a regexp is the same as a substring search.
- The method `str.match(regexp)` looks for matches: all of them if there's `pattern:g` flag, otherwise only the first one.
- The method `str.replace(regexp, replacement)` replaces matches with `regexp` by `replacement`: all of them if there's `pattern:g` flag, otherwise only the first one.
- The method `regexp.test(str)` returns `true` if there's at least one match, otherwise `false`.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1
