# Methodes des Expressions Rationnelles et des chaînes de caractères

Dans cet article, nous aborderons différentes méthodes qui fonctionnent en profondeur avec des expressions rationnelles (regexps).


## str.match(regexp)

La méthode `str.match(regexp)` trouve les correspondances de l'expression rationnelle `regexp` dans la chaîne de texte `str`.


Elle dispose de 3 options :

1. si l'expression rationnelle n'à pas de marqueur `pattern:g`, alors seul la première correspondance est renvoyée sous la forme d'un tableau avec le groupe capturé et ses propriétés : index (indice de la correspondance), et input (chaîne d'entrée équivalent à str):

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/);

    alert( result[0] );     // JavaScript (correspondance exacte)
    alert( result[1] );     // Script (premier groupe capturant)
    alert( result.length ); // 2

    // Additional information:
    alert( result.index );  // 7 (indice de la chaîne de caractère où à été trouvée la correspondance)
    alert( result.input );  // I love JavaScript (chaîne sur laquelle a été effectuée la recherche)
    ```

2. Si la `regexp` dispose d'un marqueur `pattern:g`, alors elle retourne un tableau de toutes les correspondances de texte, sans capturer les groupes ou les autres propriétés.    
    
    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/g);

    alert( result[0] ); // JavaScript
    alert( result.length ); // 1
    ```

3. S'il n'y a pas de correspondance, qu'il y ait un marqueur `pattern:g` ou non, `null` est renvoyé.

    C'est une nuance importante. Si il n'y a pas de correspondance, nous ne récupérons pas de tableau vide, mais `null`. Il n'est pas rare de faire une erreur en oubliant ce détail, e.g.:

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/HTML/);

    alert(result); // null
    alert(result.length); // Error: Cannot read property 'length' of null
    ```

    Si nous voulons que le résultat soit un tableau, nous pouvons écrire de cette façon:

    ```js
    let result = str.match(regexp) || [];
    ```

## str.matchAll(regexp)

[recent browser="new"]

La méthode `str.matchAll(regexp)` est une variante "améliorée" de `str.match`. 

Elle est principalement utilisée pour rechercher toutes les correspondances au sein de chaque groupe.

Il y a 3 différences avec `match`:

<<<<<<< HEAD
1. Elle retourne un objet iterable avec les correspondances au lieu d'un tableau. Nous pouvons le transformer en un tableau en utilisant la méthode `Array.from`.
2. Toutes les correspondances sont retournées dans un tableau incluant les groupes capturants (sous le même format que `str.match` sans le marqueur `pattern:g`).
3. Si aucun résultat, `null` n'est pas renvoyé, mais un objet itérable vide. 
=======
1. It returns an iterable object with matches instead of an array. We can make a regular array from it using `Array.from`.
2. Every match is returned as an array with capturing groups (the same format as `str.match` without flag `pattern:g`).
3. If there are no results, it returns an empty iterable object instead of `null`.
>>>>>>> 8558fa8f5cfb16ef62aa537d323e34d9bef6b4de

Exemple d'utilisation:

```js run
let str = '<h1>Hello, world!</h1>';
let regexp = /<(.*?)>/g;

let matchAll = str.matchAll(regexp);

alert(matchAll); // [object RegExp String Iterator], pas un tableau, mais un itérateur

matchAll = Array.from(matchAll); // maintenant un tableau

let firstMatch = matchAll[0];
alert( firstMatch[0] );  // <h1>
alert( firstMatch[1] );  // h1
alert( firstMatch.index );  // 0
alert( firstMatch.input );  // <h1>Hello, world!</h1>
```

Si nous utilisons `for..of` pour boucler sur les résultats de `matchAll`, alors il n'est pas nécessaire d'utiliser `Array.from`.

## str.split(regexp|substr, limit)

Divise la chaîne de caractères en utilisant la regexp (ou une sous-chaîne de caractères) comme délimiteur.

Nous pouvons utiliser `split` avec une chaîne de caractères comme ceci :

```js run
alert('12-34-56'.split('-')) // array of ['12', '34', '56']
```

Mais nous pouvons aussi diviser une chaîne de texte en utilisant une expression rationnelle:

```js run
alert('12, 34, 56'.split(/,\s*/)) // array of ['12', '34', '56']
```

## str.search(regexp)

La méthode `str.search(regexp)` renvoie l'indice du premier motif correspondant, ou `-1` si aucune correspondance n'est trouvée: 

```js run
let str = "A drop of ink may make a million think";

alert( str.search( /ink/i ) ); // 10 (indice du premier motif correspondant)
```

**Limitation importante: `search` renvoie uniquement la première correspondance.**

Si nous avons besoin de l'indice ou de plus de correspondances, nous devrions utiliser d'autres méthodes, comme les trouver tous avec `str.matchAll(regexp)`. 

## str.replace(str|regexp, str|func)

Il s'agit d'une méthode générique pour chercher et remplacer une chaîne de caractères, l'une des plus utiles. Le couteau suisse pour chercher et remplacer. 

Nous pouvons l'utiliser sans regexps, pour chercher et remplacer une sous-chaîne de caractères:

```js run
// replace a dash by a colon
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

Toutefois, il y a un piège.

**Quand le premier argument de `replace` est une chaîne de caractères, elle ne remplace que la première occurence.**

Vous pouvez constater dans l'exemple ci-dessous que seul le premier `"-"` est remplacé par `":"`. 

Pour trouver tous les traits d'unions, nous devons utiliser non pas le caractère `"-"`, mais une expression rationnelle `pattern:/-/g`, avec obligatoirement le marqueur `pattern:g`;   

```js run
// remplace tous les tirets par deux-points 
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```


Le second argument est une chaîne de caractères de remplacement. Nous pouvons utiliser des caractères spéciaux dedans :


| Symbols | Action in the replacement string |
|--------|--------|
|`$&`|insère la chaine de caractère en correspondance|
|<code>$&#096;</code>|Insère la partie de la chaîne de caractère qui précède la sous-chaîne en correspondance|
|`$'`|insère la partie de la chaîne de caractère qui suit la sous-chaîne en correspondance|
|`$n`|si `n` est un nombre à 1 ou 2 chiffres, insère la n-ième chaîne de sous-correspondance entre parenthèses, pour plus de détails voir [](info:regexp-groups)|
|`$<name>`|insère la chaîne de caractère du `name` correspondant à celui entre parenthèse, pour plus de détails voir [](info:regexp-groups)|
|`$$`|insère un caractère `$` |

Par exemple:

```js run
let str = "John Smith";

// inverser le prénom et nom de famille
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

**Si le contexte nécessite un remplacement "intelligent", le second argument peut être une fonction.**

Elle sera appelée pour chaque correspondance, et la valeur de retour sera insérée comme remplacement.

La fonction est appelée avec des arguments `func(match, p1, p2, ..., pn, offset, input, groups)`:

1. `match` -- La chaîne de caractère en correspondance,
2. `p1, p2, ..., pn` -- contenu des groupes capturants (s'il y en a),
3. `offset` -- indice de la sous-chaîne correspondante,
4. `input` -- la chaîne de texte initiale,
5. `groups` -- un objet contenant les groupes nommés.

Si la regexp ne comporte pas de parenthèses, alors la fonction ne contient que 3 arguments: `func(str, offset, input)`.

Par exemple, pour convertir les chaînes de caractères correspondantes en majuscule: 

```js run
let str = "html and css";

let result = str.replace(/html|css/gi, str => str.toUpperCase());

alert(result); // HTML and CSS
```

Remplace chaque résultat en utilisant son indice dans la chaîne de caractères:

```js run
alert("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // 0-3-6
```

Dans l'exemple ci-dessous, il y a 2 groupes entre parenthèses. La fonction de remplacement est alors appelée avec 5 arguments: le premier est la correspondance complète, puis chacun des groupes entre parenthèses et enfin (non présent dans l'exemple) l'indice de la correspondance et la chaîne de caractères initiale:

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (match, name, surname) => `${surname}, ${name}`);

alert(result); // Smith, John
```

Si il y a de nombreux groupes entre parenthèses, il peut être pratique d'utiliser les paramètres du reste pour y accéder:

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`);

alert(result); // Smith, John
```

Ou, si nous utilisons des groupes nommés, alors l'objet `groups` est toujours placé en dernier, et nous pouvons l'obtenir de cette façon: 

```js run
let str = "John Smith";

let result = str.replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
  let groups = match.pop();

  return `${groups.surname}, ${groups.name}`;
});

alert(result); // Smith, John
```

Les fonctions représentent le pouvoir ultime pour effectuer un remplacement. Elles recupèrent toutes les informations des correspondances, ont accès aux variables externes et sont capable de tout faire.

## str.replaceAll(str|regexp, str|func)

This method is essentially the same as `str.replace`, with two major differences:

1. If the first argument is a string, it replaces *all occurences* of the string, while `replace` replaces only the *first occurence*.
2. If the first argument is a regular expression without the `g` flag, there'll be an error. With `g` flag, it works the same as `replace`.

The main use case for `replaceAll` is replacing all occurences of a string.

Like this:

```js run
// replace all dashes by a colon
alert('12-34-56'.replaceAll("-", ":")) // 12:34:56
```


## regexp.exec(str)

<<<<<<< HEAD
La méthode `regexp.exec(str)` renvoie une correspondance for `regexp` dans la chaîne de caractères `str`. À l'inverse de la méthode précédente, elle est appelée sur une expression rationnelle et non une châine de caractères.
=======
The `regexp.exec(str)` method returns a match for `regexp` in the string `str`.  Unlike previous methods, it's called on a regexp, not on a string.
>>>>>>> 8558fa8f5cfb16ef62aa537d323e34d9bef6b4de

Elle se comporte différement selon que la regexp dispose d'un marqueur `pattern:g` ou non.

Si `pattern:g` n'est pas présent, alors `regexp.exec(str)` renvoie la première correspondance tel que le ferait `str.match(regexp)`. Ce comportement n'apporte rien de nouveau.  

Mais si `pattern:g` est utilisé, alors:
- Un appel à `regexp.exec(str)` renvoie la première correspondance et sauvegarde l'indice situé juste après, accessible via la propriété `regexp.lastIndex`.
- l'appel suivant à la fonction commence la recherche depuis l'indice contenu dans `regexp.lastIndex`. La correspondance suivante est renvoyé et l'indice positionné après est sauvegardé dans `regexp.lastIndex`.
- ...Et ainsi de suite.
- Si aucune correspondance n'est trouvée, `regexp.exec`renvoie `null` et `regexp.lastIndex` est réinitialisé à `0`.

Donc, un appel répété à cette fonction renvoie toutes les correspondances l'une après l'autre, utilisant la propriété `regexp.lastIndex` pour se souvenir de l'indice courant à partir duquel la recherche est effectuée.

Avant que la méthode `str.matchAll` ait été ajoutée à Javascript, des appels à `regexp.exec` étaient utilisés dans une boucle afin d'obtenir toutes les correspondances:  

```js run
let str = 'More about JavaScript at https://javascript.info';
let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at position ${result.index}` );
  // Found JavaScript at position 11, puis
  // Found javascript at position 33
}
```

Cela fonctionne également très bien, bien que sur les navigateurs les plus récents `str.matchAll` est généralement plus pratique. 

**Nous pouvons utiliser `regexp.exec` pour rechercher à partir d'un indice donné en réglant manuellement la valeur de `lastIndex`.**

Par exemple:

```js run
let str = 'Hello, world!';

let regexp = /\w+/g; // sans le marqueur "g", la propriété lastIndex est ignorée
regexp.lastIndex = 5; // commence la recherche à partir de la 5ème position (à partir de la virgule)  

alert( regexp.exec(str) ); // world
```

Si la regexp utilise le marqueur `pattern:y`, alors la recherche s'effectuera à l'indice précis de `regexp.lastIndex`, pas plus loin. 

Remplaçons le marqueur `pattern:g` par `pattern:y` dans l'exemple précédent. Aucune correspondance n'est trouvée, car il n'y a aucun mot à l'indice `5`:

```js run
let str = 'Hello, world!';

let regexp = /\w+/y;
regexp.lastIndex = 5; // cherche exactement à l'indice 5

alert( regexp.exec(str) ); // null
```

C'est pratique dans une situation où nous cherchons uniquement à lire quelque chose au sein d'un texte avec une regexp à un indice spécifique, en occultant le reste. 

## regexp.test(str)

La méthode `regexp.test(str)` vérifie qu'une correspondance existe et renvoie `true/false` selon le cas.

Par exemple:

```js run
let str = "I love JavaScript";

// Ces deux tests réalisent exactement la même chose
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

Un exemple avec un retour négatif:

```js run
let str = "Bla-bla-bla";

alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

Si la regexp à le marqueur `pattern:g`, alors `regexp.test` verifiera la propriété `regexp.lastIndex` et mettra à jours cette propriété, tout comme `regexp.exec`.    

On peut donc l'utiliser pour effectuer une recherche à partir d'un indice donnée:

```js run
let regexp = /love/gi;

let str = "I love JavaScript";

// commence la recherche à partir de l'indice 10:
regexp.lastIndex = 10;
alert( regexp.test(str) ); // false (pas de correspondance)
```

````warn header="Une même expression rationnelle testée de manière répétée sur différentes sources peut échouer"
Appliquer la même expression rationnelle globale sur différentes entrées peut conduire à de mauvais résultats, car l'appel à `regexp.test` modifie la propriété `regexp.lastIndex`, par conséquent la recherche sur une autre chaîne de caractères risque d'être lancer à partir d'un autre indice que `0`.

Par exemple, nous appelons ici `regexp.test` à deux reprises sur la même chaîne de texte, and le second appel échoue: 

```js run
let regexp = /javascript/g;  // (création d'une nouvelle regexp: regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (maintenant regexp.lastIndex=10)
alert( regexp.test("javascript") ); // false
```

C'est exactement parce que `regexp.lastIndex` n'est pas `0` lors du second test.  

Afin de contourner cela, nous pouvons réinitialiser `regexp.lastIndex = 0` avant chaque recherche. Ou, au lieu d'appeler la méthode sur une regexp, nous pouvons utiliser les méthodes de l'objet String `str.match/search/...`, qui n'utilisent pas `lastIndex`. 
````
