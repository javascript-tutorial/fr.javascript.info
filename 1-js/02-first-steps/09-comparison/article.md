# Comparaisons

Il y a de nombreux opérateurs de comparaison que nous connaissons des mathématiques :

- Plus grand/petit que : <code>a &gt; b</code>, <code>a &lt; b</code>.
- Plus grand/petit ou égal à : <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Égalité : `a == b` (veuillez noter le signe de la double égalité `==` signifie un test d’égalité. Un seul symbole `a = b` signifierait une affectation).
- Pas égal : en mathématique la notation est <code>&ne;</code>, mais en JavaScript elle est écrite comme une assignation avec un signe d’exclamation : <code>a != b</code>.

Dans cet article, nous en apprendrons plus sur les différents types de comparaisons, sur la façon dont JavaScript les effectue, y compris sur les particularités importantes.

À la fin, vous trouverez une bonne recette pour éviter les problèmes liés aux "bizarreries JavaScript".

## Booléen est le résultat

Tout comme les autres opérateurs, une comparaison renvoie une valeur de type booléenne.

- `true` -- signifie "vrai".
- `false` -- signifie "faux".

Par exemple :

```js run
alert(2 > 1);  // true (vrai)
alert(2 == 1); // false (faux)
alert(2 != 1); // true (vrai)
```

Un résultat de comparaison peut être affecté à une variable, comme toute valeur :

```js run
let result = 5 > 4; // Attribue le résultat de la comparaison
alert(result); // true
```

## Comparaison de chaînes de caractères

Pour voir quelle chaîne de caractères est plus grande que l'autre, on utilise l'ordre dit "dictionnaire" ou "lexicographique".

En d'autres termes, les chaînes de caractères sont comparées lettre par lettre.

Par exemple :

```js run
alert('Z' > 'A'); // true
alert('Glow' > 'Glee'); // true
alert('Bee' > 'Be'); // true
alert('9' > '10'); // true
```

L'algorithme pour comparer deux chaînes de caractères est simple :

1. Compare les premiers caractères des deux chaînes de caractères.
2. Si le premier est supérieur (ou inférieur), la première chaîne de caractères est supérieure (ou inférieure) à la seconde. Nous en avons fini.
3. Sinon, si les premiers caractères sont égaux, comparez les deuxièmes caractères de la même manière.
4. Répéter jusqu'à la fin d'une des chaîne de caractères comparées.
5. Si les deux chaînes de caractères se sont terminées simultanément, alors elles sont égales. Sinon, la chaîne la plus longue est plus grande.

Dans l'exemple ci-dessus, la comparaison `'Z' > 'A'` renvoie le résultat à la première étape.

La deuxième comparaison `'Glow'` et `'Glee'` nécessite plus d'étapes car les chaînes de caractères sont comparées caractère par caractère :

1. `G` est identique à `G`.
2. `l` est identique à `l`.
3. `o` est plus grand que `e`. On stop ici. La première chaîne de caractères est plus grande.

```smart header="Pas vraiment un dictionnaire, mais plutôt l'ordre Unicode"
L'algorithme de comparaison ci-dessus est à peu près équivalent à celui utilisé dans les dictionnaires ou les annuaires téléphoniques. Mais ce n’est pas exactement la même chose.

Par exemple, cette notion est importante à comprendre. Une lettre majuscule `"A"` n'est pas égale à la lettre minuscule `"a"`. Lequel est le plus grand ? En fait, le minuscule `"a"` l'est. Pourquoi ? Parce que le caractère minuscule a un index plus grand dans la table de codage interne (Unicode). Nous reviendrons sur les détails spécifiques et leurs conséquences dans le chapitre <info:string>.
```

## Comparaison de différents types

Lorsque les valeurs comparées appartiennent à différents types, elles sont converties en nombres.

Par exemple :

```js run
alert('2' > 1); // true, la chaîne '2' devient un numéro 2
alert('01' == 1); // true, chaîne '01' devient un numéro 1
```

Pour les valeurs booléennes, `true` devient `1` et `false` devient `0`.

Par exemple :

```js run
alert(true == 1); // true
alert(false == 0); // true
```

````smart header="Une conséquence amusante"
Il est possible que dans le même temps :

- Deux valeurs sont égales.
- L'un d'eux est `vrai` comme booléen et l'autre est `faux` comme booléen.

Par exemple :

```js run
let a = 0;
alert(Boolean(a)); // false

let b = "0";
alert(Boolean(b)); // true

alert(a == b); // true!
```

Du point de vue de JavaScript, c'est tout à fait normal. Un contrôle d'égalité convertit en utilisant la conversion numérique (par conséquent, `"0"` devient `0`), tandis que la `conversion booléenne` utilise un autre ensemble de règles.
````

## Égalité stricte

Une vérification d'égalité régulière `==` a un problème. Elle ne peut pas faire la différence entre `0` et `false` :

```js run
alert(0 == false); // true
```

La même chose avec une chaîne de caractères vide :

```js run
alert('' == false); // true
```

C’est parce que les opérandes de différents types sont convertis en un nombre par l’opérateur d’égalité `==`. Une chaîne de caractères vide, tout comme `false`, devient un zéro.

Que faire si nous voulons différencier `0` de `faux` ?

**Un opérateur d'égalité stricte `===` vérifie l'égalité sans conversion de type.**

En d'autres termes, si `a` et `b` sont de types différents, alors `a === b` renvoie immédiatement `false` sans tenter de les convertir.

Essayons :

```js run
alert(0 === false); // false, parce que les types sont différents
```

Il existe également un opérateur de "non-égalité stricte" `!==`, par analogie à la non-égalité `!=`.

L’opérateur de vérification de l’égalité stricte est un peu plus long à écrire, mais rend évident ce qui se passe et laisse moins d’espace pour les erreurs.

## Comparaison avec null et undefined

Il existe un comportement non intuitif lorsque `null` ou `undefined` sont comparés à d’autres valeurs.

Pour un contrôle d'égalité strict `===`
: Ces valeurs sont différentes car chacune d’entre elles appartient à un type distinct.

    ```js run
    alert(null === undefined); // false
    ```

Pour un contrôle d'égalité non strict `==`
: Il y a une règle spéciale. Ces deux là forment "un beau couple" : ils sont égaux (au sens de `==`), mais pas à d'autres valeurs.

    ```js run
    alert(null == undefined); // true
    ```

Pour les maths et autres comparaisons `<`, `>`, `<=`, `>=`
: Les valeurs `null`/`undefined` sont converties en un nombre : `null` devient `0`, alors qu'`undefined` devient `NaN`.

Voyons maintenant des choses amusantes qui se produisent lorsque nous appliquons ces règles. Et, ce qui est plus important, comment ne pas tomber dans un piège avec ces caractéristiques.

### L'étrange résultat : null vs 0

Comparons `null` avec un zéro :

```js run
alert(null > 0);  // (1) false
alert(null == 0); // (2) false
alert(null >= 0); // (3) *!*true*/!*
```

Ouais, mathématiquement c'est étrange. Le dernier résultat indique que "`null` est supérieur ou égal à zéro". Alors que l'une des comparaisons au dessus devrait être correcte, mais les deux sont fausses.

La raison est qu'une vérification d'égalité (`==`) et les comparaisons (`<`, `>`, `<=`, `>=`) fonctionnent différemment. Les comparaisons convertissent `null` en un nombre, donc le traitent comme `0`. C'est pourquoi (3) `null >= 0` est vrai et (1) `null > 0` est faux.

D’un autre côté, la vérification de l’égalité `==` pour `undefined` et `null` est définie de telle sorte que, sans aucune conversion, ils sont égaux et ne correspondent à rien d’autre. C'est pourquoi (2) `null == 0` est faux.

### Un undefined incomparable

La valeur `undefined` ne doit pas du tout participer aux comparaisons :

```js run
alert(undefined > 0);  // false (1)
alert(undefined < 0);  // false (2)
alert(undefined == 0); // false (3)
```

Pourquoi est-ce qu'il n'aime pas le zéro ? Toujours faux!

Nous avons ces résultats parce que :

- Les comparaisons `(1)` et `(2)` renvoient `false` car `undefined` est converti en `NaN` et `NaN` est une valeur numérique spéciale qui renvoie `false` pour toutes les comparaisons.
- Le contrôle d'égalité `(3)` renvoie `false`, car `undefined` est uniquement égal à `null` et à aucune autre valeur.

### Éviter les problèmes

Pourquoi avons-nous observé ces exemples? Devrions-nous nous souvenir de ces particularités tout le temps ? Eh bien pas vraiment. En fait, ces notions délicates deviennent progressivement familières au fil du temps, mais il existe un moyen solide d’éviter tout problème avec elles.

Il suffit de traiter toute comparaison avec `null`/`undefined` (à l'exception de la stricte égalité `===`) avec un soin exceptionnel.

N'utilisez pas de comparaisons `=>`, `>`, `<`, `<=` avec une variable qui peut être `null`/`undefined`, sauf si vous êtes vraiment sûr de ce que vous faites. Si une variable peut avoir de telles valeurs, vérifiez-les séparément.

## Résumé

- Les opérateurs de comparaison renvoient une valeur logique.
- Les chaînes de caractères sont comparées lettre par lettre dans l'ordre "dictionnaire".
- Lorsque des valeurs de différents types sont comparées, elles sont converties en nombres (à l'exclusion d'un contrôle d'égalité strict).
- Les valeurs `null` et `undefined` sont égales (`==`) et ne correspondent à aucune autre valeur.
- Soyez prudent lorsque vous utilisez des comparaisons telles que `>` ou `<` avec des variables pouvant parfois être `null`/`undefined`. Faire une vérification séparée pour `null`/`undefined` est une bonne idée.
