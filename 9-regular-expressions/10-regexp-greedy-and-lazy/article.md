# Quantificateur glouton ou paresseux

Les quantificateurs, à première vue, très simples, peuvent parfois être retors.

Pour réussir à trouver des motifs plus complexes que `pattern:/\d+/`, nous devons voir plus en détail comment se déroule une recherche.

Prenons comme exemple la tâche suivante.

Nous avons un texte dans lequel nous devons remplacer tous les guillemets droits (doubles) `"..."` par des guillemets français : `«...»`, souvent préférés comme typographie dans de nombreux pays.

Par exemple : `"Hello, world"` devrait se transformer en `«Hello, world»`. Il existe d'autre guillemets, comme `„Witam, świat!”` (polonais) ou `「你好，世界」` (chinois), mais pour notre exemple choisissons `«...»`.

La première chose à faire est de trouver ces guillemets droits, et nous pourrons ensuite les remplacer.

Une expression régulière comme `pattern:/".+"/g` (des guillemets, puis quelque chose, puis d'autres guillemets) semble être une bonne approche, mais pas exactement !

Essayons ça:

```js run
let regexp = /".+"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // "witch" and her "broom"
```

... Nous pouvons voir que ça ne marche pas exactement comme prévu !

Au lieu de trouver deux correspondances `match:"witch"` et `match:"broom"`, il n'en trouve qu'une : `match:"witch" and her "broom"`.

Qui peut être vu comme "La cupidité est à la racine de tous les ennuis".

## Recherche gloutonne

Pour trouver une correspondance, le moteur d'expression régulière utilise l'algorithme suivant :

- Pour chacune des positions de la chaîne de caractère
    - Essaye de trouver le motif à cette position.
    - S'il n'y a pas de correspondance, va à la prochaine position.

Cette description succincte ne vous éclaire peut être pas plus sur la raison de l'échec de la recherche précédente, alors voyons plus en détail comment se déroule la recherche du motif `pattern:".+"`.

1. le premier caractère du motif sont des guillemets droits `pattern:"`.

    le moteur d'expressions régulières essaye de les trouver à la position zéro de la chaîne originale `subject:a "witch" and her "broom" is one`, mais comme il y a un `subject:a` à cette place, il n'y a pas de correspondance possible.

    Puis il avance : va aux positions suivantes dans la chaîne source et essaye d'y trouver le premier caractère du motif, il échoue une nouvelle fois, avant de trouver les guillemets en troisième position :

    ![](witch_greedy1.svg)

2. Les premiers guillemets trouvé, le moteur essaye de trouver la correspondance pour la suite du motif. Il essaye de voir si le reste de la chaîne suit le motif `pattern:.+"`.

    Dans notre cas le caractère suivant dans le motif est `pattern:.` (un point). Il signifie "tout caractère, nouvelle ligne exceptée", la lettre suivante de la chaîne `match:'w'` marche :

    ![](witch_greedy2.svg)

3. Le point est alors répété avec le quantificateur `pattern:.+`. le moteur d'expression régulière ajoute à la correspondance, les caractères les uns à la suite des autres.

    ... Jusqu'à quand ? Tout caractère correspond au point, il ne s'arrête qu'une fois arrivé à la fin de chaîne :

    ![](witch_greedy3.svg)

4. La répétition du motif `pattern:.+` maintenant finie, il essaye de trouver le caractère suivant. Ce sont des guillemets droits `pattern:"`. Mais problème : arrivé en bout de chaîne, il n'y a plus de caractère !

    Le moteur d'expressions régulières comprend qu'il a pris trop de `pattern:.+` et commence à revenir sur ses pas.

    En d'autres termes, il réduit la correspondance avec le quantificateur d'un caractère :

    ![](witch_greedy4.svg)

    Il considère maintenant que `pattern:.+` finit un caractère avant la fin de chaîne et essaye de la trouver la fin du motif à partir de cette position.

    Et s'il y avait des guillemets ici, alors la recherche serait fini, mais le dernier caractère est `subject:'e'`, il n'y a donc toujours pas de correspondance.

5. ... Le moteur d'expression régulière diminue encore le nombre de répétitions de `pattern:.+` d'un autre caractère :

    ![](witch_greedy5.svg)

    les guillemets `pattern:'"'` ne correspondent pas à `subject:'n'`.

6. Le moteur continue sa marche arrière : il réduit le nombre de répétitions de `pattern:'.'` jusqu'à trouver une correspondance pour la suite du motif (dans notre cas `pattern:'"'`) :

    ![](witch_greedy6.svg)

7. La correspondance avec motif est complète.

8. La première correspondance est donc `match:"witch" and her "broom"`. Si l'expression régulière porte le marqueur `pattern:g`, alors la recherche continuera à partir de la fin de la première correspondance. Comme il n'y a plus de guillemets dans la suite de la chaîne `subject:is one`, il n'y pas d'autres correspondance.

Ce n'est peut-être pas ce que nous attendions, mais c'est ainsi que cela fonctionne.

**En mode glouton (mode par défaut) un caractère suivi d'un quantificateur est répété autant de fois que possible.**

Le moteur d'expression régulière ajoute autant de caractères que possible pour le motif `pattern:.+`, puis réduit la correspondance caractère par caractère, si la suite du motif ne trouve pas de correspondance.

Nous avons besoin d'autre chose pour mener à bien notre tâche. Et le mode paresseux va pouvoir nous aider.

## Lazy mode

The lazy mode of quantifiers is an opposite to the greedy mode. It means: "repeat minimal number of times".

We can enable it by putting a question mark `pattern:'?'` after the quantifier, so that it becomes  `pattern:*?` or `pattern:+?` or even `pattern:??` for `pattern:'?'`.

To make things clear: usually a question mark `pattern:?` is a quantifier by itself (zero or one), but if added *after another quantifier (or even itself)* it gets another meaning -- it switches the matching mode from greedy to lazy.

The regexp `pattern:/".+?"/g` works as intended: it finds `match:"witch"` and `match:"broom"`:

```js run
let regexp = /".+?"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // "witch", "broom"
```

To clearly understand the change, let's trace the search step by step.

1. The first step is the same: it finds the pattern start `pattern:'"'` at the 3rd position:

    ![](witch_greedy1.svg)

2. The next step is also similar: the engine finds a match for the dot `pattern:'.'`:

    ![](witch_greedy2.svg)

3. And now the search goes differently. Because we have a lazy mode for `pattern:+?`, the engine doesn't try to match a dot one more time, but stops and tries to match the rest of the pattern  `pattern:'"'` right now:

    ![](witch_lazy3.svg)

    If there were a quote there, then the search would end, but there's `'i'`, so there's no match.
4. Then the regular expression engine increases the number of repetitions for the dot and tries one more time:

    ![](witch_lazy4.svg)

    Failure again. Then the number of repetitions is increased again and again...
5. ...Till the match for the rest of the pattern is found:

    ![](witch_lazy5.svg)

6. The next search starts from the end of the current match and yield one more result:

    ![](witch_lazy6.svg)

In this example we saw how the lazy mode works for `pattern:+?`. Quantifiers `pattern:*?` and `pattern:??` work the similar way -- the regexp engine increases the number of repetitions only if the rest of the pattern can't match on the given position.

**Laziness is only enabled for the quantifier with `?`.**

Other quantifiers remain greedy.

For instance:

```js run
alert( "123 456".match(/\d+ \d+?/) ); // 123 4
```

1. The pattern `pattern:\d+` tries to match as many digits as it can (greedy mode), so it finds  `match:123` and stops, because the next character is a space `pattern:' '`.
2. Then there's a space in the pattern, it matches.
3. Then there's `pattern:\d+?`. The quantifier is in lazy mode, so it finds one digit `match:4` and tries to check if the rest of the pattern matches from there.

    ...But there's nothing in the pattern after `pattern:\d+?`.

    The lazy mode doesn't repeat anything without a need. The pattern finished, so we're done. We have a match `match:123 4`.

```smart header="Optimizations"
Modern regular expression engines can optimize internal algorithms to work faster. So they may work a bit differently from the described algorithm.

But to understand how regular expressions work and to build regular expressions, we don't need to know about that. They are only used internally to optimize things.

Complex regular expressions are hard to optimize, so the search may work exactly as described as well.
```

## Alternative approach

With regexps, there's often more than one way to do the same thing.

In our case we can find quoted strings without lazy mode using the regexp `pattern:"[^"]+"`:

```js run
let regexp = /"[^"]+"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // "witch", "broom"
```

The regexp `pattern:"[^"]+"` gives correct results, because it looks for a quote `pattern:'"'` followed by one or more non-quotes `pattern:[^"]`, and then the closing quote.

When the regexp engine looks for `pattern:[^"]+` it stops the repetitions when it meets the closing quote, and we're done.

Please note, that this logic does not replace lazy quantifiers!

It is just different. There are times when we need one or another.

**Let's see an example where lazy quantifiers fail and this variant works right.**

For instance, we want to find links of the form `<a href="..." class="doc">`, with any `href`.

Which regular expression to use?

The first idea might be: `pattern:/<a href=".*" class="doc">/g`.

Let's check it:
```js run
let str = '...<a href="link" class="doc">...';
let regexp = /<a href=".*" class="doc">/g;

// Works!
alert( str.match(regexp) ); // <a href="link" class="doc">
```

It worked. But let's see what happens if there are many links in the text?

```js run
let str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let regexp = /<a href=".*" class="doc">/g;

// Whoops! Two links in one match!
alert( str.match(regexp) ); // <a href="link1" class="doc">... <a href="link2" class="doc">
```

Now the result is wrong for the same reason as our "witches" example. The quantifier `pattern:.*` took too many characters.

The match looks like this:

```html
<a href="....................................." class="doc">
<a href="link1" class="doc">... <a href="link2" class="doc">
```

Let's modify the pattern by making the quantifier `pattern:.*?` lazy:

```js run
let str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let regexp = /<a href=".*?" class="doc">/g;

// Works!
alert( str.match(regexp) ); // <a href="link1" class="doc">, <a href="link2" class="doc">
```

Now it seems to work, there are two matches:

```html
<a href="....." class="doc">    <a href="....." class="doc">
<a href="link1" class="doc">... <a href="link2" class="doc">
```

...But let's test it on one more text input:

```js run
let str = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
let regexp = /<a href=".*?" class="doc">/g;

// Wrong match!
alert( str.match(regexp) ); // <a href="link1" class="wrong">... <p style="" class="doc">
```

Now it fails. The match includes not just a link, but also a lot of text after it, including `<p...>`.

Why?

That's what's going on:

1. First the regexp finds a link start `match:<a href="`.
2. Then it looks for `pattern:.*?`: takes one character (lazily!), check if there's a match for `pattern:" class="doc">` (none).
3. Then takes another character into `pattern:.*?`, and so on... until it finally reaches `match:" class="doc">`.

But the problem is: that's already beyond the link `<a...>`, in another tag `<p>`. Not what we want.

Here's the picture of the match aligned with the text:

```html
<a href="..................................." class="doc">
<a href="link1" class="wrong">... <p style="" class="doc">
```

So, we need the pattern to look for `<a href="...something..." class="doc">`, but both greedy and lazy variants have problems.

The correct variant can be: `pattern:href="[^"]*"`. It will take all characters inside the `href` attribute till the nearest quote, just what we need.

A working example:

```js run
let str1 = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
let str2 = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let regexp = /<a href="[^"]*" class="doc">/g;

// Works!
alert( str1.match(regexp) ); // null, no matches, that's correct
alert( str2.match(regexp) ); // <a href="link1" class="doc">, <a href="link2" class="doc">
```

## Summary

Quantifiers have two modes of work:

Greedy
: By default the regular expression engine tries to repeat the quantified character as many times as possible. For instance, `pattern:\d+` consumes all possible digits. When it becomes impossible to consume more (no more digits or string end), then it continues to match the rest of the pattern. If there's no match then it decreases the number of repetitions (backtracks) and tries again.

Lazy
: Enabled by the question mark `pattern:?` after the quantifier. The regexp engine tries to match the rest of the pattern before each repetition of the quantified character.

As we've seen, the lazy mode is not a "panacea" from the greedy search. An alternative is a "fine-tuned" greedy search, with exclusions, as in the pattern `pattern:"[^"]+"`.
