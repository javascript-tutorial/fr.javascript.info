
# Échappement, caractères spéciaux

Comme nous l'avons vu, la barre oblique inversée (ou backslash) `pattern:\` est utilisée pour désigner une classe de caractères, p.
ex.
`pattern:\d`.
C'est donc un caractère spécial dans les expressions régulières (comme dans les chaînes de caractères classiques).

Il existe également d'autres caractères spéciaux qui ont une signification particulière dans une expression régulières, tels que `pattern:[ ] { } () \ ^ $ .
| ? * +`.
Ils sont utilisés pour faire des recherches plus puissantes.

Inutile de mémoriser maintenant cette liste -- nous verrons chacun d'entre eux en détail, et vous les connaîtrez bientôt tous par cœur automatiquement.

## Échappement

Admettons que nous voulons chercher un point.
Pas n'importe quel caractère, mais juste un point.

Pour utiliser un caractère spécial en tant que caractère normal, on le précède d'un backslash : `pattern:\.`.

On appelle aussi cela "échapper un caractère".

Par exemple :
```js run
alert("Chapter 5.1".match(/\d\.\d/)); // 5.1 (trouvé!)
alert("Chapter 511".match(/\d\.\d/)); // null (cherche un vrai point \.)
```

Les parenthèses sont aussi des caractères spéciaux, donc pour en rechercher une, nous devons utiliser `pattern:\(`.
L'exemple ci-dessous recherche une chaîne de caractères `"g()"`:

```js run
alert("function g()".match(/g\(\)/)); // "g()"
```

Si nous recherchons un backslash `\`, comme c'est un caractère spécial aussi bien pour une expression régulière que pour une chaîne de caractère classique, nous devons donc le doubler.

```js run
alert("1\\2".match(/\\/)); // '\'
```

## La barre oblique ou slash

Un slash `'/'` n'est pas un caractère spécial, mais en javascript, il est utilisé pour ouvrir et fermer l'expression régulière : `pattern:/...pattern.../`, nous devons donc aussi l'échapper.

Voici à quoi ressemble une recherche d'un slash `'/'` :

```js run
alert("/".match(/\//)); // '/'
```

Par contre si nous n'utilisons pas l'écriture `pattern:/.../`, mais créons l'expression régulière avec `new RegExp`, alors nous n'avons plus besoin de l'échapper :

```js run
alert("/".match(new RegExp("/"))); // trouve /
```

## new RegExp

Si nous construisons une expression régulière avec `new RegExp`, nous n'avons pas besoin d'échapper les `/`, mais nous aurons besoin d'autres échappements.

Par exemple, considérons :

```js run
let regexp = new RegExp("\d\.\d");

alert("Chapter 5.1".match(regexp)); // null
```

C'est une recherche pourtant similaire à un exemple précédent, qui fonctionnait avec `pattern:/\d\.\d/`, mais pas ici avec `new RegExp("\d\.\d")`.
Pourquoi ?

Les backslashes sont en fait "consommés" par la chaîne de caractères.
On peut se souvenir, que les chaîne de caractères ont leurs propres caractères spéciaux, comme `\n`, et le backslash est aussi utilisé pour l'échappement.

Voici comment "\d\.\d" est perçu :

```js run
alert("\d\.\d"); // d.d
```

Les guillemets "consomment" les backslashes et les interprètent pour la chaîne de caractère, par exemple :

- `\n` -- devient le caractère de nouvelle ligne,
- `\u1234` -- devient le caractère unicode de ce code,
- ...
Et lorsqu'il n'y a pas de sens particulier : comme `pattern:\d` ou `\z`, alors le backslash est simplement retiré.

Donc `new RegExp` reçoit une chaîne de caractères sans backslash.
C'est pour ça que la recherche ne fonctionnait pas !

Pour résoudre ça, nous devons doubler les backslashes, parce que la chaine de caractères transforme les `\\` en `\`:

```js run
*!*
let regStr = "\\d\\.\\d";
*/!*
alert(regStr); // \d\.\d (correct maitenant)

let regexp = new RegExp(regStr);

alert("Chapter 5.1".match(regexp)); // 5.1
```

## Résumé

- Pour rechercher exactement un caractère spécial `pattern:[ \ ^ $ .
| ? * + ()`, nous devons le précéder d'un backslash `\` ("nous l'échappons").
- Nous devons aussi échapper un `/` si nous sommes dans une expression régulière `pattern:/.../` (mais pas en utilisant `new RegExp`).
- Lorsque l'on passe une chaîne de caractères à `new RegExp`, nous devons doubler les backslashes `\\`, car la chaîne en consomme un.
