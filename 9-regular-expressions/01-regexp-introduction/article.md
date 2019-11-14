# Modèles et marqueurs

<<<<<<< HEAD
Les expressions régulières sont un moyen puissant de rechercher et de remplacer du texte.

En JavaScript, ils sont disponibles en tant que object [RegExp](mdn:js/RegExp) et également intégrés dans les méthodes de chaînes de caractères.
=======
Regular expressions are patterns that provide a powerful way to search and replace in text.

In JavaScript, they are available via the [RegExp](mdn:js/RegExp) object, as well as being integrated in methods of strings.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

## Expressions régulières

Une expression régulière (également "regexp" ou simplement "reg") est constituée d'un *pattern* et de *flags* optionnels.

<<<<<<< HEAD
Il existe deux syntaxes pour créer un objet expression rationnelle.
=======
There are two syntaxes that can be used to create a regular expression object.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

La syntaxe "longue" :

```js
regexp = new RegExp("pattern", "flags");
```

<<<<<<< HEAD
...Et la syntaxe courte, en utilisant des slash `"/"`:
=======
And the "short" one, using slashes `"/"`:
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

```js
regexp = /pattern/; // aucun marqueur
regexp = /pattern/gmi; // avec marqueurs g, m, et i (bientôt abordés)
```

Les slash `pattern:/.../` indique à JavaScript que l'on crée une expression régulière. Il joue le même rôle que les guillemets pour les chaînes de caractères (les "string").

<<<<<<< HEAD
Dans les deux cas `regexp` devient un objet de la classe intégrée `RegExp`.

La différence principale entre ces deux syntaxes réside dans le fait que les slashes `pattern: /.../` ne permettent pas d'insérer des expressions (comme les chaînes avec `$ {...}`). Ils sont complètement statiques.

Les barres obliques sont utilisées lorsque nous connaissons l'expression régulière au moment de l'écriture du code -- et c'est la situation la plus courante. Alors que `new RegExp` est utilisé lorsque nous devons créer une expression rationnelle "à la volée", à partir d'une chaîne générée dynamiquement, par exemple :
=======
In both cases `regexp` becomes an instance of the built-in `RegExp` class.

The main difference between these two syntaxes is that pattern using slashes `/.../` does not allow for expressions to be inserted (like string template literals with `${...}`). They are fully static.

Slashes are used when we know the regular expression at the code writing time -- and that's the most common situation. While `new RegExp`, is more often used when we need to create a regexp "on the fly" from a dynamically generated string. For instance:
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

```js
let tag = prompt("What tag do you want to find?", "h2");

let regexp = new RegExp(`<${tag}>`); // same as /<h2>/ if answered "h2" in the prompt above
```

## Flags

Les expressions régulières peuvent avoir des flags qui affectent la recherche.

Il n'y en a que 6 en JavaScript :

`pattern:i`
: Avec cet indicateur, la recherche est insensible à la casse: pas de différence entre `A` et` a` (voir l'exemple ci-dessous).

`pattern:g`
<<<<<<< HEAD
: Avec cet indicateur, la recherche liste toutes les correspondances, sans lui - seulement la première.
=======
: With this flag the search looks for all matches, without it -- only the first match is returned.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

`pattern:m`
: Mode multiligne (couvert dans le chapitre <info:regexp-multiline-mode>).

`pattern:s`
: Active le mode "dotall", qui permet à un `pattern : .` de correspondre au caractère de nouvelle ligne `\n` (traité dans le chapitre <info:regexp-character-classes>).

`pattern:u`
: Active le support complet Unicode. Le flag permet le traitement correct des paires de substitution. Plus à ce sujet dans le chapitre <info:regexp-unicode>.

`pattern:y`
: mode "Sticky" : chercher à la position exacte dans le texte (couvert dans le chapitre <info:regexp-sticky>)

```smart header="Couleurs"
À partir de maintenant le code couleur sera :

- regexp -- `pattern:red`
- chaîne de caractère (là où l'on recherchera) -- `subject:blue`
- résultat -- `match:green`
```

## Rechercher : str.match

<<<<<<< HEAD
Comme il a été dit précédemment, les expressions régulières sont intégrées aux méthodes de chaîne de caractères.
=======
As mentioned previously, regular expressions are integrated with string methods.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

La méthode `str.match(regexp)` trouve tous les résultats de `regexp` dans la chaîne de caractères `str`.

Il dispose de 3 modes de travail :

1. If the regular expression has flag `pattern:g`, it returns an array of all matches:
    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we (un tableau de 2 sous-chaînes de caractères correspondant)
    ```
    Veuillez noter que les deux `match:We` et `match:we` sont trouvés, parce que le flag `pattern:i` rend l'expression régulière insensible à la casse.

2. Si aucun indicateur de ce type n'existe, il retourne uniquement la première correspondance sous la forme d'un tableau, avec la correspondance complète à l'index `0` et quelques détails supplémentaires dans les propriétés :
    ```js run
    let str = "We will, we will rock you";

    let result = str.match(/we/i); // without flag g

    alert( result[0] );     // We (1st match)
    alert( result.length ); // 1

    // Details:
    alert( result.index );  // 0 (position of the match)
    alert( result.input );  // We will, we will rock you (source string)
    ```
    Le tableau peut avoir d’autres index, en plus de `0` si une partie de l’expression régulière est entre parenthèses. Nous couvrirons cela dans le chapitre <info:regexp-groups>.

3. Et, enfin, s'il n'y a pas de correspondance, `null` est renvoyé (peu importe qu'il y ait un flag `pattern:g` ou pas).

<<<<<<< HEAD
    C'est une nuance très importante. S'il n'y a pas de correspondance, nous n'obtenons pas un tableau vide, mais `null`. Oublier cela peut entraîner des erreurs, par exemple :
=======
    This a very important nuance. If there are no matches, we don't receive an empty array, but instead receive `null`. Forgetting about that may lead to errors, e.g.:
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Impossible de lire la propriété 'length' de null
      alert("Error in the line above");
    }
    ```

<<<<<<< HEAD
    Si nous souhaitons que le résultat soit toujours un tableau, nous pouvons l'écrire comme ceci :
=======
    If we'd like the result to always be an array, we can write it this way:
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("No matches"); // maintenant ça fonctionne
    }
    ```

## Remplacer : str.replace

<<<<<<< HEAD
La méthode `str.replace(regexp, replacement)` remplace les correspondances avec `regexp` dans la chaîne de caractères `str` avec `replacement` (tous les résultats s'il y a un flag `pattern:g`, sinon seulement le premier).
=======
The method `str.replace(regexp, replacement)` replaces matches found using `regexp` in string `str` with `replacement` (all matches if there's flag `pattern:g`, otherwise, only the first one).
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

Par exemple :

```js run
// no flag g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// with flag g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

Le deuxième argument est la chaîne de caractères `replacement`. Nous pouvons utiliser des combinaisons de caractères spéciaux pour insérer des fragments de la correspondance :

| Symboles             | Action dans la chaîne de caractères de remplacement string                                                                                                  |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `$&`                 | insère toute la correspondance match                                                                                                                        |
| <code>$&#096;</code> | insère une partie de la chaîne de caractères avant la correspondance                                                                                        |
| `$'`                 | insère une partie de la chaîne de caractères après la correspondance                                                                                        |
| `$n`                 | si `n` est un nombre à un ou deux chiffres, alors il insère le contenu des nièmes parenthèses, plus à ce sujet dans le chapitre <info:regexp-groups> |
| `$<name>`            | insère le contenu des parenthèses avec le `name` donné, plus à ce sujet dans le chapitre <info:regexp-groups>                                               |
| `$$`                 | insère le caractère `$`                                                                                                                                     |

Un exemple avec `pattern:$&` :

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

## Tester : regexp.test

La méthode `regexp.test(str)` recherche au moins une correspondance ; si elle est trouvée, retourne `true`, sinon` false`.

```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;

alert( regexp.test(str) ); // true
```

<<<<<<< HEAD
Plus loin dans ce chapitre, nous étudierons davantage d’expressions régulières, trouverons de nombreux autres exemples et rencontrerons d’autres méthodes.
=======
Later in this chapter we'll study more regular expressions, walk through more examples, and also meet other methods.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

Full information about the methods is given in the article <info:regexp-methods>.

## Résumé

<<<<<<< HEAD
- Une expression régulière consiste en un modèle et des indicateurs facultatifs : `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Sans les flags et symboles spéciaux que nous étudierons plus tard, la recherche par une expression régulière est identique à une recherche par sous-chaîne de caractères.
- La méthode `str.match(regexp)` cherche des correspondances : toutes si il y a un flag `pattern:g`, sinon seulement le premier.
- La méthode `str.replace(regexp, replacement)` remplace les correspondance avec `regexp` par `replacement` : toutes s'il y a  un flag `pattern:g`, sinon seulement le premier.
- La méthode `regexp.test(str)` retourne `true` s'il y a au moins une correspondance, sinon `false`.
=======
- A regular expression consists of a pattern and optional flags: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Without flags and special symbols  (that we'll study later), the search by a regexp is the same as a substring search.
- The method `str.match(regexp)` looks for matches: all of them if there's `pattern:g` flag, otherwise, only the first one.
- The method `str.replace(regexp, replacement)` replaces matches found using `regexp` with `replacement`: all of them if there's `pattern:g` flag, otherwise only the first one.
- The method `regexp.test(str)` returns `true` if there's at least one match, otherwise, it returns `false`.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd
