# Groupes capturant

Une partie de motif peut être entourée de parenthèses `pattern:(...)`. Cela s'appelle un "groupe capturant".

Ceci a deux effets :

1. Cela permet d'obtenir cette partie de correspondance comme élément du tableau de résultat.
2. Si nous mettons après les parenthèses un quantificateur, celui-ci s'applique à tout l'ensemble entre parenthèses.

## Exemples

Voyons comment fonctionne le parenthésage par des exemples.

### Exemple : gogogo

Sans parenthèses, le motif `pattern:go+` signifie le caractère `subject:g`, suivi par `subject:o` répété une ou plusieurs fois. Par exemple, `match:goooo` ou `match:gooooooooo`.

Avec des parenthèses regroupant les caractères, `pattern:(go)+` signifie alors  `match:go`, `match:gogo`, `match:gogogo` et ainsi de suite.

```js run
alert( 'Gogogo now!'.match(/(go)+/ig) ); // "Gogogo"
```

### Exemple : domaine

Complexifions maintenant un peu les choses -- une expression régulière pour rechercher le domaine d'un site web.

Par exemple :

```
mail.com
users.mail.com
smith.users.mail.com
```

Comme nous pouvons le voir, un domaine est constitué d'une répétition de mots, un point après chaque mot excepté pour le dernier.

En expression régulière cela donne `pattern:(\w+\.)+\w+`:

```js run
let regexp = /(\w+\.)+\w+/g;

alert( "site.com my.site.com".match(regexp) ); // site.com,my.site.com
```

La recherche fonctionne, mais ce motif ne correspondra pas à un domaine comportant un tiret, par ex. `my-site.com`, car le tiret n'appartient pas à la classe `pattern:\w`.

Nous pouvons corriger ça en remplaçant `pattern:\w` par `pattern:[\w-]` pour tous les mots excepté le dernier : `pattern:([\w-]+\.)+\w+`.

### Exemple : email

En se basant sur l'exemple précédent, nous pouvons créer une expression régulière pour les emails.

Le format d'un email est : `nom@domaine`. Le nom peut comporter n'importe quel mot, tirets et points sont permis. En expression régulière cela donne `pattern:[-.\w]+`.

Le motif :

```js run
let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

alert("my@mail.com @ his@site.com.uk".match(regexp)); // my@mail.com, his@site.com.uk
```

Cette regexp loin d'être parfaite, fonctionne dans une majorité de cas et aide à corriger d'éventuelles fautes de frappes. La seule vérification fiable à 100% pour un email est effectuée par l'envoi d'un courrier.

## Les contenus de parenthèses dans la correspondance

Les parenthèses sont numérotées de gauche à droite. Le moteur de recherche mémorise le contenu correspondant à chacune d'entre elles et permet d'y accéder dans le résultat.

La méthode `str.match(regexp)`, si `regexp` n'a pas de marqueur `g`, cherche la première correspondance et la retourne dans un tableau :

1. À l'index `0`: la correspondance complète.
2. À l'index `1`: le contenu des premières parenthèses.
3. À l'index `2`: le contenu des secondes parenthèses.
4. ...etc...

Par exemple, si nous voulons trouver des balises HTML `pattern:<.*?>`, et agir dessus. Cela peut être pratique d'en avoir le contenu (l'intérieur des chevrons), dans des variables distinctes.

Entourons l'intérieur de la balise de parenthèses, comme ceci : `pattern:<(.*?)>`.

Et nous aurons maintenant à la fois la balise entière `match:<h1>` et son contenu `match:h1` dans le tableau de correspondance :

```js run
let str = '<h1>Hello, world!</h1>';

let tag = str.match(/<(.*?)>/);

alert( tag[0] ); // <h1>
alert( tag[1] ); // h1
```

### Groupes imbriqués

Les parenthèses peuvent être imbriquées. Dans ce cas la numérotation se fait aussi de gauche à droite.

Par exemple, en effectuant une recherche dans la balise `subject:<span class="my">` nous pourrions être intéressé par :

1. Son contenu complet : `match:span class="my"`.
2. Son nom : `match:span`.
3. Ses attributs : `match:class="my"`.

Entourons-les de parenthèses : `pattern:<(([a-z]+)\s*([^>]*))>`.

Voici comment les groupes sont numérotés(de gauche à droite, par ordre d'ouverture des parenthèses) :

![](regexp-nested-groups-pattern.svg)

Ce qui donne :

```js run
let str = '<span class="my">';

let regexp = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(regexp);
alert(result[0]); // <span class="my">
alert(result[1]); // span class="my"
alert(result[2]); // span
alert(result[3]); // class="my"
```

L'index zero de `result` contient toujours l'entière correspondance, puis les groupes, numérotés de gauche à droite par ordre d'ouverture des parenthèses.

Le premier groupe est retourné par `result[1]`. Il contient ici tout l'intérieur de la balise.

Puis dans `result[2]` se trouve le groupe de la deuxième parenthèse ouvrante `pattern:([a-z]+)` - le nom de balise, puis dans `result[3]` la suite de la balise : `pattern:([^>]*)`.

Les contenus de chaque groupe dans la chaîne de caractères :

![](regexp-nested-groups-matches.svg)

### Groupes optionnels

Même si un groupe est optionnel et n'existe pas dans la correspondance (par ex. s'il a le quantificateur `pattern:(...)?`), son élément correspondant dans le tableau `result` est présent and vaut `undefined`.

Par exemple, considérons l'expression régulière `pattern:a(z)?(c)?`. Cela cherche un `"a"` suivi d'un éventuel `"z"` suivi d'un éventuel `"c"`.

Si nous lançons une recherche sur la seule lettre `subject:a`, alors le résultat donne:

```js run
let match = 'a'.match(/a(z)?(c)?/);

alert( match.length ); // 3
alert( match[0] ); // a (correspondance complète)
alert( match[1] ); // undefined
alert( match[2] ); // undefined
```

Le tableau a une longueur de `3`, mais tous les groupes sont vides.

Et voici une correspondance plus complexe avec la chaîne `subject:ac`:

```js run
let match = 'ac'.match(/a(z)?(c)?/)

alert( match.length ); // 3
alert( match[0] ); // ac (correspondance complète)
alert( match[1] ); // undefined, car il n'y a rien pour (z)?
alert( match[2] ); // c
```

La longueur du tableau fixe : `3`. Mais il n'y a rien pour le groupe `pattern:(z)?`, donc le résultat est `["ac", undefined, "c"]`.

## Rechercher toutes les correspondances avec des groupes : matchAll

```warn header="`matchAll` est une méthode récente, et peut nécessiter un polyfill"
La méthode `matchAll` n'est pas supportée par d'anciens navigateurs.

Un polyfill peut être requis, comme <https://github.com/ljharb/String.prototype.matchAll>.
```

Lorsque nous recherchons toutes les correspondances (flag `pattern:g`), la méthode `match` ne retourne pas le contenu des groupes.

Par exemple, trouvons toutes les balises dans une chaîne de caractères:

```js run
let str = '<h1> <h2>';

let tags = str.match(/<(.*?)>/g);

alert( tags ); // <h1>,<h2>
```

Le résultat est un tableau de correspondance, mais sans les détails de chacune d'entre elles. Mais en pratique nous avons souvent besoin des contenus des groupes capturant dans le résultat.

Pour les obtenir, nous devons rechercher avec la méthode `str.matchAll(regexp)`.

Elle a été ajoutée au langage JavaScript longtemps après `match`, comme étant sa "version nouvelle et améliorée".

Tout comme `match`, elle cherche des correspondances, mais avec 3 différences :

1. Elle ne retourne pas de tableau, mais un itérateur.
2. Si le marqueur `pattern:g` est present, elle retourne toutes les correspondances dans des tableaux avec les groupes.
3. S'il n'y a pas de correspondance, elle ne retourne pas `null`, mais un itérateur vide.

Par exemple :

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

// results - n'est pas un tableau, mais un itérateur
alert(results); // [object RegExp String Iterator]

alert(results[0]); // undefined (*)

results = Array.from(results); // convertissons-le en tableau

alert(results[0]); // <h1>,h1 (1st tag)
alert(results[1]); // <h2>,h2 (2nd tag)
```

<<<<<<< HEAD
Comme nous pouvons le voir, la première différence est très importante, comme le montre la ligne `(*)`. Nous ne pouvons pas trouver la correspondance dans `results[0]`, car il ne se comporte pas comme un tableau. Nous pouvons le convertir en véritable `Array` avec `Array.from`. Il y a plus de détails sur les objets itérables dans l'article <info:iterable>.

Il n'y a pas besoin de `Array.from` si nous bouclons sur le résultat :
=======
As we can see, the first difference is very important, as demonstrated in the line `(*)`. We can't get the match as `results[0]`, because that object is a pseudoarray. We can turn it into a real `Array` using `Array.from`. There are more details about pseudoarrays and iterables in the article <info:iterable>.

There's no need for `Array.from` if we're looping over results:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

for(let result of results) {
  alert(result);
  // premier alert: <h1>,h1
  // second: <h2>,h2
}
```

...Ou bien en déstructurant :

```js
let [tag1, tag2] = '<h1> <h2>'.matchAll(/<(.*?)>/gi);
```

Chaque correspondance, retournée par `matchAll`, a le même format que celui d'un `match` sans marqueur `pattern:g`: c'est un tableau avec les propriétés additionnelles `index` (index de la correspondance dans la chaîne) et `input` (chaîne source) :

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

let [tag1, tag2] = results;

alert( tag1[0] ); // <h1>
alert( tag1[1] ); // h1
alert( tag1.index ); // 0
alert( tag1.input ); // <h1> <h2>
```

```smart header="Pourquoi le résultat d'un `matchAll` est un itérateur et pas un tableau ?"
Pourquoi la méthode est-elle conçue comme cela ? La raison est simple - pour l'optimisation.

L'appel à `matchAll` n'effectue pas la recherche. À la place, il retourne un itérateur, sans résultats préalables. La recherche est lancée à chaque fois que nous l'itérons, par ex. dans une boucle.

Ne seront donc trouvés qu'autant de résultats que besoin, pas plus.

Par ex. s'il y a 100 correspondances potentielles dans un texte, mais dans une boucle `for..of` nous en trouvons 5, et décidons alors que c'est suffisant en faisant un `break`. Le moteur de recherche ne perdra pas son temps à rechercher les 95 autres correspondances.
```

## Groupes nommés

Il est difficile de se souvenir de groupes par leur numéro. Bien que faisable pour des motifs simples, cela devient ardu dans des motifs plus complexes. Il existe une meilleure option : nommer les parenthèses.

Cela se fait en mettant `pattern:?<name>` immédiatement après la parenthèse ouvrante.

Par exemple, recherchons une date au format "year-month-day":

```js run
*!*
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
*/!*
let str = "2019-04-30";

let groups = str.match(dateRegexp).groups;

alert(groups.year); // 2019
alert(groups.month); // 04
alert(groups.day); // 30
```

Comme vous pouvez le voir, les groupes figurent dans la propriété `.groups` de la correspondance.

Pour chercher toutes les dates, nous pouvons ajouter le marqueur `pattern:g`.

Nous aurons aussi besoin de `matchAll` pour obtenir des correspondances complètes, avec les groupes :

```js run
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30 2020-01-01";

let results = str.matchAll(dateRegexp);

for(let result of results) {
  let {year, month, day} = result.groups;

  alert(`${day}.${month}.${year}`);
  // premier alert: 30.10.2019
  // second: 01.01.2020
}
```

## Groupes capturant dans un remplacement

La méthode `str.replace(regexp, replacement)` qui remplace dans `str` toutes les correspondances de `regexp`, nous permet d'utiliser le contenu des parenthèses dans la chaîne de `replacement`. Nous utiliserons alors `pattern:$n`, où `pattern:n` correspond au numéro de groupe.

Par exemple,

```js run
let str = "John Bull";
let regexp = /(\w+) (\w+)/;

alert( str.replace(regexp, '$2, $1') ); // Bull, John
```

Pour les parenthèses nommées la référence au groupe se fera avec `pattern:$<name>`.

Par exemple, reformatons les dates depuis le format "year-month-day" vers "day.month.year":

```js run
let regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30, 2020-01-01";

alert( str.replace(regexp, '$<day>.$<month>.$<year>') );
// 30.10.2019, 01.01.2020
```

## Groupe non capturant avec ?:

Nous avons parfois besoin de parenthèses pour appliquer correctement un quantificateur, sans avoir besoin de leurs contenu dans les résultats.

Un groupe peut être exclu des résultats en ajoutant `pattern:?:` au début.

Par exemple, si nous voulons trouver `pattern:(go)+`, sans avoir les contenus des parenthèses (`go`) comme élément du tableau de correspondance, nous pouvons écrire : `pattern:(?:go)+`.

Dans l'exemple suivant nous obtenons seulement `match:John` comme élément supplémentaire de la correspondance.:

```js run
let str = "Gogogo John!";

*!*
// ?: exclu 'go' d'une capture
let regexp = /(?:go)+ (\w+)/i;
*/!*

let result = str.match(regexp);

alert( result[0] ); // Gogogo John (correspondance entière)
alert( result[1] ); // John
alert( result.length ); // 2 (pas d'autres éléments dans le tableau)
```

## Résumé

Les parenthèses regroupent ensemble une partie de l'expression régulière, de telle sorte qu'un quantificateur s'applique à toute cette partie.

Les groupes de parenthèses sont numérotés de gauche à droite et peuvent éventuellement être nommés avec  `(?<name>...)`.

Le contenu correspondant à un groupe, peut être obtenu dans les résultats :

- La méthode `str.match` retourne les groupes capturant uniquement en l'absence du marqueur `pattern:g`.
- La méthode `str.matchAll` retourne toujours les groupes capturant.

Si les parenthèses n'ont pas de nom, alors leur contenu est dans le tableau de correspondances indexé par leur ordre d'ouverture. Les parenthèses nommées sont disponibles aussi par la propriété `groups`.

Nous pouvons aussi utiliser les contenus des parenthèses dans la chaîne de remplacement de `str.replace`: par leur numéro `$n` ou leur nom `$<name>`.

Un groupe peut être exclu de la numérotation en ajoutant `pattern:?:` à son début. C'est utile pour appliquer un quantificateur à groupe entier, sans avoir besoin de cet élément dans les résultats. Nous ne pourrons pas non plus y faire référence dans une chaîne de remplacement.
