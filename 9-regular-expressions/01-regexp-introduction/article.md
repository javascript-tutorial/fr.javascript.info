# Modèles et marqueurs

Les expressions régulières sont un moyen puissant de rechercher et de remplacer du texte.

En JavaScript, ils sont disponibles en tant que object [RegExp](mdn:js/RegExp) et également intégrés dans les méthodes de chaînes de caractères.

## Expressions régulières

Une expression régulière (également "regexp" ou simplement "reg") est constituée d'un *pattern* et de *flags* optionnels.

Il existe deux syntaxes pour créer un objet expression régulière.

La syntaxe "longue" :

```js
regexp = new RegExp("pattern", "flags");
```

Et la syntaxe courte, en utilisant des slash `"/"` :

```js
regexp = /pattern/; // aucun marqueur
regexp = /pattern/gmi; // avec marqueurs g, m, et i (bientôt abordés)
```

Les slash `pattern:/.../` indique à JavaScript que l'on crée une expression régulière. Il joue le même rôle que les guillemets pour les chaînes de caractères (les "string").

Dans les deux cas `regexp` devient un objet de la classe intégrée `RegExp`.

La différence principale entre ces deux syntaxes réside dans le fait que les pattern utilisants des slashes `/.../` ne permettent pas d'insérer des expressions (comme les modèles littéraux de chaîne de caractères `$ {...}`). Ils sont complètement statiques.

Les slashes sont utilisés lorsque nous connaissons l'expression régulière au moment de l'écriture du code -- et c'est la situation la plus courante. Alors que `new RegExp` est plus utilisé lorsque nous devons créer une expression régulière "à la volée" à partir d'une chaîne de caractères générée dynamiquement, par exemple :

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
: Avec cet indicateur, la recherche liste toutes les correspondances, sans lui - seulement la première.

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

Comme cela a été dit précédemment, les expressions régulières sont intégrées aux méthodes de chaîne de caractères.

La méthode `str.match(regexp)` trouve tous les résultats de `regexp` dans la chaîne de caractères `str`.

Il dispose de 3 modes de travail :

1. If the regular expression has flag `pattern:g`, it returns an array of all matches:
    ```js run
    let str = "We will, we will rock you";

    alert(str.match(/we/gi)); // We,we (un tableau de 2 sous-chaînes de caractères correspondant)
    ```
    Veuillez noter que les deux `match:We` et `match:we` sont trouvés, parce que le flag `pattern:i` rend l'expression régulière insensible à la casse.

2. Si aucun indicateur de ce type n'existe, il retourne uniquement la première correspondance sous la forme d'un tableau, avec la correspondance complète à l'index `0` et quelques détails supplémentaires dans les propriétés :
    ```js run
    let str = "We will, we will rock you";

    let result = str.match(/we/i); // without flag g

    alert(result[0]);     // We (1st match)
    alert(result.length); // 1

    // Details:
    alert(result.index);  // 0 (position of the match)
    alert(result.input);  // We will, we will rock you (source string)
    ```
    Le tableau peut avoir d’autres index, en plus de `0` si une partie de l’expression régulière est entre parenthèses. Nous couvrirons cela dans le chapitre <info:regexp-groups>.

3. Et, enfin, s'il n'y a pas de correspondance, `null` est renvoyé (peu importe qu'il y ait un flag `pattern:g` ou pas).

    C'est une nuance très importante. S'il n'y a pas de correspondance, nous n'obtenons pas un tableau vide, mais `null`. Oublier cela peut entraîner des erreurs, par exemple :

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Impossible de lire la propriété 'length' de null
      alert("Error in the line above");
    }
    ```

    Si nous souhaitons que le résultat soit toujours un tableau, nous pouvons l'écrire comme ceci :

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("No matches"); // maintenant ça fonctionne
    }
    ```

## Remplacer : str.replace

La méthode `str.replace(regexp, replacement)` remplace les correspondances en utilisant `regexp` dans la chaîne de caractères `str` avec `replacement` (tous les résultats s'il y a un flag `pattern:g`, sinon seulement le premier).

Par exemple :

```js run
// no flag g
alert("We will, we will".replace(/we/i, "I")); // I will, we will

// with flag g
alert("We will, we will".replace(/we/ig, "I")); // I will, I will
```

Le deuxième argument est la chaîne de caractères `replacement`. Nous pouvons utiliser des combinaisons de caractères spéciaux pour insérer des fragments de la correspondance :

| Symboles             | Action dans la chaîne de caractères de remplacement string                                                                                           |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$&`                 | insère toute la correspondance match                                                                                                                 |
| <code>$&#096;</code> | insère une partie de la chaîne de caractères avant la correspondance                                                                                 |
| `$'`                 | insère une partie de la chaîne de caractères après la correspondance                                                                                 |
| `$n`                 | si `n` est un nombre à un ou deux chiffres, alors il insère le contenu des nièmes parenthèses, plus à ce sujet dans le chapitre <info:regexp-groups> |
| `$<name>`            | insère le contenu des parenthèses avec le `name` donné, plus à ce sujet dans le chapitre <info:regexp-groups>                                        |
| `$$`                 | insère le caractère `$`                                                                                                                              |

Un exemple avec `pattern:$&` :

```js run
alert("I love HTML".replace(/HTML/, "$& and JavaScript")); // I love HTML and JavaScript
```

## Tester : regexp.test

La méthode `regexp.test(str)` recherche au moins une correspondance ; si elle est trouvée, retourne `true`, sinon` false`.

```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;

alert(regexp.test(str)); // true
```

Plus loin dans ce chapitre, nous étudierons davantage d’expressions régulières, parcourerons de nombreux autres exemples et rencontrerons d’autres méthodes.

Full information about the methods is given in the article <info:regexp-methods>.

## Résumé

- Une expression régulière consiste en un modèle et des indicateurs facultatifs : `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Sans les flags et symboles spéciaux que nous étudierons plus tard, la recherche par une expression régulière est identique à une recherche par sous-chaîne de caractères.
- La méthode `str.match(regexp)` cherche des correspondances : toutes si il y a un flag `pattern:g`, sinon seulement le premier.
- La méthode `str.replace(regexp, replacement)` remplace les correspondance en utilisant `regexp` avec `replacement` : toutes s'il y a  un flag `pattern:g`, sinon seulement la première.
- La méthode `regexp.test(str)` retourne `true` s'il y a au moins une correspondance, sinon `false`.
