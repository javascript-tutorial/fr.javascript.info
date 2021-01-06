# Ensembles et intervalles [...]

Plusieurs caractères ou classes de caractères, entourés de crochets `[…]` signifie "chercher un caractère parmi ceux-là".

## Ensembles

Par exemple, `pattern:[eao]` signifie un caractère qui est soit `'a'`, `'e'`, ou `'o'`.

Ceci est appelé un *ensemble*. Les ensembles peuvent être combinés avec d'autres caractères dans une expression rationnelle :

```js run
// trouve [t ou m], puis "op"
alert( "Mop top".match(/[tm]op/gi) ); // "Mop", "top"
```

Bien qu'il y ait plusieurs caractères dans un ensemble, vous remarquez que l'on ne cherche la correspondance que d'un seul de ces caractères.

L'exemple suivant ne donne donc aucun résultat :

```js run
// trouve "V", puis [o ou i], puis "la"
alert( "Voila".match(/V[oi]la/) ); // null, pas de correspondance
```

Le modèle recherche :

- `pattern:V`,
- puis *une* des lettres `pattern:[oi]`,
- enfin `pattern:la`.

Ce qui correspondrait à `match:Vola` ou `match:Vila`.

## Intervalles

Les crochets peuvent aussi contenir de *intervalles de caractères*.

Par exemple, `pattern:[a-z]` est un caractère pouvant aller de `a` à `z`, et `pattern:[0-5]` est un nombre pouvant valoir de `0` jusqu'à `5`.

Dans l'exemple ci-dessous nous recherchons un `"x"` suivi par deux chiffres ou lettres de `A` à `F`:

```js run
alert( "Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF
```

Ici `pattern:[0-9A-F]` comporte deux intervalles : il recherche un caractère qui est soit chiffre entre `0` et `9` compris ou bien une lettre entre `A` et `F` compris.

Si nous voulons y inclure les lettres minuscules, nous pouvons ajouter l'intervalle `a-f`: `pattern:[0-9A-Fa-f]`. Ou bien ajouter le marqueur `pattern:i`.

Nous pouvons aussi utiliser les classes de caractères entre `[…]`.

Par exemple, si nous voulons chercher un caractère alphanumérique, un trait de soulignement `pattern:\w` ou un tiret `pattern:-`, alors l'ensemble s'écrit `pattern:[\w-]`.

Il est aussi possible de combiner plusieurs classes, e.g. `pattern:[\s\d]` signifie "un caractère d'espacement ou un chiffre".

```smart header="Les classes de caractères sont en fait des racourcis pour des intervalles de caractères particuliers"
Par exemple:

- **\d** -- équivaut à `pattern:[0-9]`,
- **\w** -- équivaut à `pattern:[a-zA-Z0-9_]`,
- **\s** -- équivaut à `pattern:[\t\n\v\f\r ]`, plus quelques autres rares caractères unicodes d'espacement.
```

### Exemple : \w multi-langue

Comme la classe de caractères `pattern:\w` est un raccourcis pour `pattern:[a-zA-Z0-9_]`, il ne peut pas trouver les idéogrammes chinois, ni les lettres cyrilliques, etc.

Nous pouvons écrire un modèle plus universel, qui cherche le caractère d'un mot quelle que soit la langue. On obtient facilement grâce aux propriétés Unicode : `pattern:[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]`.

Déchiffrons cela. De la même manière que `pattern:\w`, nous construisons notre propre ensemble qui contient les caractères qui portent les propriétés Unicode :

- `Alphabetic` (`Alpha`) - pour les lettres,
- `Mark` (`M`) - pour les accents,
- `Decimal_Number` (`Nd`) - pour les nombres,
- `Connector_Punctuation` (`Pc`) - pour le trait de soulignement `'_'` et autres caractères similaires,
- `Join_Control` (`Join_C`) - deux codes spéciaux `200c` et `200d`, utilisés comme liaisons, e.g. en arabe.

Exemple d'usage :

```js run
let regexp = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

let str = `Hi 你好 12`;

// trouve toutes les lettres et chiffres:
alert( str.match(regexp) ); // H,i,你,好,1,2
```

Bien sûr, nous pouvons modifier cet ensemble : ajouter ou retirer des propriétés Unicode. Plus de détail sur ces propriétés Unicode dans l'article <info:regexp-unicode>.

```warn header="Les propriétés Unicode ne sont pas supportées par IE"
Les propriétés Unicode `pattern:p{…}` ne sont pas implémentées dans IE. Si nous en avons vraiment besoin, nous pouvons utiliser la librairie [XRegExp](http://xregexp.com/).

Ou simplement utiliser des intervalles de caractères dans la langue qui nous intéresse, e.g.  `pattern:[а-я]` pour les lettres cyrilliques.
```

## Intervalles d'exclusion

En plus des intervalles classiques, existent les intervalles d'exclusion qui ressemblent à `pattern:[^…]`.

Ils se distinguent par un premier accent circonflexe `^` et correspond à n'importe quel caractère *à l'exception des caractères qui le suivent*.

Par exemple:

- `pattern:[^aeyo]` -- n'importe quel caractère sauf  `'a'`, `'e'`, `'y'` ou `'o'`.
- `pattern:[^0-9]` -- n'importe quel caractère à l'exception des chiffres, équivalent à `pattern:\D`.
- `pattern:[^\s]` -- n'importe quel caractère qui n'est pas un espacement, équivalent à `\S`.

L'exemple ci-dessous cherche n'importe quel caractère n'étant pas une lettre, un chiffre ou un espace :

```js run
alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @ et .
```

## L'échappement entre […]

Habituellement, lorsque nous cherchons précisément un caractère spécial, nous devons l'échapper `pattern:\.`. Et si nous cherchons un backslash, nous utilisons `pattern:\\`, et ainsi de suite.

À l'intérieur de crochets nous pouvons utiliser une grande majorité des caractères spéciaux sans échappement :

- Les symbols `pattern:. + ( )` ne sont jamais échappés.
- Un tiret `pattern:-` n'est pas échappé en début ou fin d'ensemble (là où il ne peut pas définir d'intervalle).
- Un accent circonflexe `pattern:^` est échappé uniquement s'il débute l'ensemble (sinon il signifie l'exclusion).
- Le crochet fermant `pattern:]` est toujours échappé (si nous le cherchons précisément).

En d'autres termes, tous les caractères spéciaux ne sont pas échappés, sauf s'ils ont un sens particulier pour un ensemble.

Un point `.` à l'intérieur de crochets signifie juste un point. Le modèle `pattern:[.,]` recherche un caractère : soit un point soit une virgule.

Dans l'exemple ci-dessous l'expression rationnelle `pattern:[-().^+]` cherche un des caractères `-().^+`:

```js run
// Pas besoin d'échapper
let regexp = /[-().^+]/g;

alert( "1 + 2 - 3".match(regexp) ); // trouve +, -
```

... Si vous décidez par contre de les échapper "au cas où", il n'y aura pas d'impact :

```js run
// Tout échappé
let regexp = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(regexp) ); // fonctionne aussi: +, -
```

## Ranges and flag "u"

If there are surrogate pairs in the set, flag `pattern:u` is required for them to work correctly.

For instance, let's look for `pattern:[𝒳𝒴]` in the string `subject:𝒳`:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // shows a strange character, like [?]
// (the search was performed incorrectly, half-character returned)
```

The result is incorrect, because by default regular expressions "don't know" about surrogate pairs.

The regular expression engine thinks that `[𝒳𝒴]` -- are not two, but four characters:
1. left half of `𝒳` `(1)`,
2. right half of `𝒳` `(2)`,
3. left half of `𝒴` `(3)`,
4. right half of `𝒴` `(4)`.

We can see their codes like this:

```js run
for(let i=0; i<'𝒳𝒴'.length; i++) {
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
```

So, the example above finds and shows the left half of `𝒳`.

If we add flag `pattern:u`, then the behavior will be correct:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

The similar situation occurs when looking for a range, such as `[𝒳-𝒴]`.

If we forget to add flag `pattern:u`, there will be an error:

```js run
'𝒳'.match(/[𝒳-𝒴]/); // Error: Invalid regular expression
```

The reason is that without flag `pattern:u` surrogate pairs are perceived as two characters, so `[𝒳-𝒴]` is interpreted as `[<55349><56499>-<55349><56500>]` (every surrogate pair is replaced with its codes). Now it's easy to see that the range `56499-55349` is invalid: its starting code `56499` is greater than the end `55349`. That's the formal reason for the error.

With the flag `pattern:u` the pattern works correctly:

```js run
// look for characters from 𝒳 to 𝒵
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```
