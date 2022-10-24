# Ensembles et intervalles [...]

Plusieurs caractères ou classes de caractères, entourés de crochets `[…]` signifient "chercher un caractère parmi ceux-là".

## Ensembles

Par exemple, `pattern:[eao]` signifie un caractère qui est soit `'a'`, `'e'`, ou `'o'`.

On appelle cela un *ensemble*. Les ensembles peuvent être combinés avec d'autres caractères dans une même expression régulière :

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

L'expression régulière recherche :

- `pattern:V`,
- puis *une* des lettres `pattern:[oi]`,
- enfin `pattern:la`.

Ce qui correspondrait à `match:Vola` ou `match:Vila`.

## Intervalles

Les crochets peuvent aussi contenir des *intervalles de caractères*.

Par exemple, `pattern:[a-z]` est un caractère pouvant aller de `a` à `z`, et `pattern:[0-5]` est un chiffre allant de `0` à `5`.

Dans l'exemple ci-dessous nous recherchons un `"x"` suivi par deux chiffres ou lettres de `A` à `F`:

```js run
alert( "Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF
```

Ici `pattern:[0-9A-F]` comporte deux intervalles : il recherche un caractère qui est soit chiffre entre `0` et `9` compris ou bien une lettre entre `A` et `F` comprise.

Si nous voulons y inclure les lettres minuscules, nous pouvons ajouter l'intervalle `a-f`: `pattern:[0-9A-Fa-f]`. Ou bien ajouter le marqueur `pattern:i`.

Nous pouvons aussi utiliser les classes de caractères entre `[…]`.

Par exemple, si nous voulons chercher un caractère alphanumérique, un trait de soulignement `pattern:\w` ou un tiret `pattern:-`, alors l'ensemble s'écrit `pattern:[\w-]`.

Il est aussi possible de combiner plusieurs classes, p. ex. `pattern:[\s\d]` signifie "un caractère d'espacement ou un chiffre".

```smart header="Les classes de caractères sont en fait des racourcis pour des intervalles de caractères particuliers"
Par exemple:

- **\d** -- équivaut à `pattern:[0-9]`,
- **\w** -- équivaut à `pattern:[a-zA-Z0-9_]`,
- **\s** -- équivaut à `pattern:[\t\n\v\f\r ]`, plus quelques autres rares caractères unicodes d'espacement.
```

### Exemple : \w multi-langue

Comme la classe de caractères `pattern:\w` est un raccourci pour `pattern:[a-zA-Z0-9_]`, il ne peut pas trouver les idéogrammes chinois, ni les lettres cyrilliques, etc.

Nous pouvons écrire un motif plus universel, pour rechercher le caractère d'un mot quelle que soit la langue. Grâce aux propriétés Unicode, on obtient facilement : `pattern:[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]`.

Déchiffrons cela. Tout comme `pattern:\w`, nous construisons notre propre ensemble qui contient les caractères qui portent les propriétés Unicode :

- `Alphabetic` (`Alpha`) - pour les lettres,
- `Mark` (`M`) - pour les accents,
- `Decimal_Number` (`Nd`) - pour les nombres,
- `Connector_Punctuation` (`Pc`) - pour le trait de soulignement `'_'` et autres caractères similaires,
- `Join_Control` (`Join_C`) - deux codes spéciaux `200c` et `200d`, utilisés comme liaisons, p. ex. en arabe.

Exemple d'usage :

```js run
let regexp = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

let str = `Hi 你好 12`;

// trouve toutes les lettres et chiffres:
alert( str.match(regexp) ); // H,i,你,好,1,2
```

Cet ensemble est bien sûr encore modifiable : on peut y ajouter ou retirer des propriétés Unicode. Plus de détail sur ces propriétés Unicode dans l'article <info:regexp-unicode>.

<<<<<<< HEAD
```warn header="Les propriétés Unicode ne sont pas supportées par IE"
Les propriétés Unicode `pattern:p{…}` ne sont pas implémentées dans IE. Si nous en avons vraiment besoin, nous pouvons utiliser la librairie [XRegExp](http://xregexp.com/).
=======
```warn header="Unicode properties aren't supported in IE"
Unicode properties `pattern:p{…}` are not implemented in IE. If we really need them, we can use library [XRegExp](https://xregexp.com/).
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

Ou simplement utiliser des intervalles de caractères dans la langue qui nous intéresse, p. ex.  `pattern:[а-я]` pour les lettres cyrilliques.
```

## Intervalles d'exclusion

En plus des intervalles classiques, il existe des intervalles d'exclusion de la forme `pattern:[^…]`.

Ils se distinguent par un premier accent circonflexe `^` et correspond à n'importe quel caractère *à l'exception de ceux contenus dans ces crochets*.

Par exemple :

- `pattern:[^aeyo]` -- n'importe quel caractère sauf  `'a'`, `'e'`, `'y'` ou `'o'`.
- `pattern:[^0-9]` -- n'importe quel caractère à l'exception des chiffres, équivalent à `pattern:\D`.
- `pattern:[^\s]` -- tout caractère qui n'est pas un espacement, équivalent à `\S`.

L'exemple ci-dessous cherche n'importe quel caractère n'étant pas une lettre, un chiffre ou un espace :

```js run
alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @ et .
```

## L'échappement entre […]

Habituellement, lorsque nous cherchons précisément un caractère spécial, nous devons l'échapper `pattern:\.`. Et si nous cherchons un backslash, nous utilisons `pattern:\\`, etc.

À l'intérieur de crochets nous pouvons utiliser une grande majorité des caractères spéciaux sans échappement :

- Les symbols `pattern:. + ( )` ne sont jamais échappés.
- Un tiret `pattern:-` n'est pas échappé en début ou fin d'ensemble (là où il ne peut pas définir d'intervalle).
- Un accent circonflexe `pattern:^` est échappé uniquement s'il débute l'ensemble (sinon il signifie l'exclusion).
- Le crochet fermant `pattern:]` est toujours échappé (si nous le cherchons précisément).

En d'autres termes, tous les caractères spéciaux ne sont pas échappés, sauf s'ils ont un sens particulier pour un ensemble.

Un point `.` à l'intérieur de crochets signifie juste un point. Le motif `pattern:[.,]` recherche un caractère : soit un point soit une virgule.

Dans l'exemple ci-dessous l'expression régulière `pattern:[-().^+]` cherche un des caractères `-().^+`:

```js run
// Pas besoin d'échapper
let regexp = /[-().^+]/g;

alert( "1 + 2 - 3".match(regexp) ); // trouve +, -
```

... Si vous décidez de les échapper, "au cas où", il n'y aura de toute façon aucun d'impact :

```js run
// Tout échappé
let regexp = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(regexp) ); // fonctionne aussi: +, -
```

## Intervalles et marqueur "u"

S'il y a une paire de seizets d'indirection([surrogate pair](https://fr.wikipedia.org/wiki/Table_des_caract%C3%A8res_Unicode_(D000-DFFF))) dans l'ensemble, le marqueur `pattern:u` est requis pour qu'elle soit interprétée correctement.

Par exemple, cherchons `pattern:[𝒳𝒴]` dans la chaîne `subject:𝒳`:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // affiche un caractère étrange qui ressemble à [?]
// (la recherche n'a pas fonctionné correctement, seule une moitié du caractère est retournée)
```

Le résultat n'est pas celui attendu, car par défaut une expression régulière ne reconnait pas une telle paire.

Le moteur d'expression régulière pense que `[𝒳𝒴]` -- ne sont pas deux mais quatre caractères :
1. la moitié gauche de `𝒳` `(1)`,
2. la moitié droite de `𝒳` `(2)`,
3. la moitié gauche de `𝒴` `(3)`,
4. la moitié droite de `𝒴` `(4)`.

On peut voir le code de ces caractères ainsi :

```js run
for(let i=0; i<'𝒳𝒴'.length; i++) {
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
```

Donc, le premier exemple trouve et affiche la première moitié de `𝒳`.

Mais si nous ajoutons le marqueur `pattern:u`, on aura alors le comportement attendu :

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

On retrouve un mécanisme similaire dans les intervalles, comme `[𝒳-𝒴]`.

Si nous oublions le marqueur `pattern:u`, il y aura une erreur :

```js run
'𝒳'.match(/[𝒳-𝒴]/); // Error: Invalid regular expression
```

En effet sans le marqueur `pattern:u` une paire de seizets est perçue comme deux caractères distincts, donc `[𝒳-𝒴]` est interprété en `[<55349><56499>-<55349><56500>]` (chacune des paires est remplacée par ses codes). Il est maintenant évident que l'intervalle `56499-55349` n'est pas valide : le premier code `56499` est plus grand que le dernier `55349`. Ce qui explique l'erreur précédente.

Avec le marqueur `pattern:u` le motif est interprété correctement :

```js run
// Cherche un caractère entre 𝒳 et 𝒵 compris
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```
