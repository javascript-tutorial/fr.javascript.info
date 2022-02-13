# Lookahead et Lookbehind

Parfois nous avons juste besoin de trouver les motifs précédents ou suivant un autre motif.

Il existe pour cela des syntaxes spéciales, appelées  "lookahead" et "lookbehind", ensemble désignées par "lookaround".

Pour commencer, trouvons le prix  à partir d'une chaîne de caractères comme `sujet:1 dindes coûte 30€`.C'est un nombre suivi par le signe  `sujet:€`

## Lookahead

La syntaxe est: `pattern:X(?=Y)`, cela veut dire "recherche  `pattern:X`, mais renvoie une correspondance seulement si il est suivi de `pattern:Y`". Tous les motifs peuvent être utilisés au lieu de `pattern:X` et `pattern:Y`.

Pour un nombre entier suivi de `sujet:€`, l'expression régulière sera `pattern:\d+(?=€)`:

```js run
let str = "1 dinde coûte 30€";

alert( str.match(/\d+(?=€)/) ); // 30, le nombre 1 est ignoré, vu qu'il n'est pas suivi de €
```

NB: Le lookahead est seulement un test, le contenu de la parenthèse `pattern:(?=...)` n'est pas include dans le resultat `match:30`.

Quand nous recherchons `pattern:X(?=Y)`, le moteur d'expressions régulières trouve `pattern:X` et verifie s'il y a `pattern:Y` immediatemment après. Si ce n'est pas le cas, la correspondqnce possible est ignoré, et la recherche continue.

Des tests plus complexes sont possibles, ex: `pattern:X(?=Y)(?=Z)` signifie:

1. Trouve`pattern:X`.
2. Verifier si `pattern:Y` est immédiatement après `pattern:X` (ignorer sinon).
3. Verifier si  `pattern:Z` se situe aussi immédiatement après `pattern:X` (ignorer sinon)..
4. Si les deux tests sont réussis, alors le motif `pattern:X` correspond, sinon continuer à chercher.

En d'autres mots, ce genre de motif signifie que nous recherchons `pattern:X` suivi de `pattern:Y` et `pattern:Z` en meme temps

C'est possible seulement  si `pattern:Y` et `pattern:Z` ne s'excluent pas mututellement.

Par exemple, `pattern:\d+(?=\s)(?=.*30)` recherche `pattern:\d+` suivi du motif `pattern:(?=\s)`, et il y a `30` quelque part apres lui `pattern:(?=.*30)`:

```js run
let str = "1 dinde coute 30€";

alert( str.match(/\d+(?=\s)(?=.*30)/) ); // 1
```

Dans notre chaîne de caractères cela correspond exactement au nombre `1`.

## Lookahead negatif

Supposons que nous recherchons plutôt une quantité, non un prix, a partir de la même chaîne de caractères.

Pour cela, le loopahead negatif peut etre utilisé.

La syntaxe est: `pattern:X(?!Y)`, cela veut dire `pattern:X`, mais seulement si il n'est pas suivi de  `pattern:Y`".

```js run
let str = "2 turkeys cost 60€";

alert( str.match(/\d+\b(?!€)/g) ); // 2 (le prix ne correspond pas au motif)
```

## Lookbehind

```warn header="Compatibilité des navigateurs pour Lookbehind"
Veuillez noter : Lookbehind n'est pas pris en charge dans les navigateurs non-V8, tels que Safari, Internet Explorer.
```

Lookahead permet d'ajouter une condition sur  "ce qui suit".

Lookbehind est similaire a loopahead, mais il regarde derrière.Ça veut dire qu'il établit une correspondance seulement si il y a quelquechose avant lui,

La syntaxe est:
- Lookbehind positif: `pattern:(?<=Y)X`, correspond à `pattern:X`, mais seulement si il y a `pattern:Y` avant lui.
- Lookbehind negatif: `pattern:(?<=Y)X`, correspond à `pattern:X`, mais seulement si il n'y a pas `pattern:Y` avant lui.

Pqr exemple,changeons le prix en dollars US. Le signe dollar est généralement placé avant le chiffre,donc pour recupérer `$30`  nous utiliserons`pattern:(?<=\$)\d+` -- Une quantité précédé de `subject:$`:

```js run
let str = "1 turkey costs $30";

// le signe dollar est echappé \$
alert( str.match(/(?<=\$)\d+/) ); // 30 (ignore le nombre sans dollar)
```

Et si nous avons besoin d'une quantité -- un nombre  non précédé de `subject:$`, alors nous pouvons utiliser un lookbehind négatif `pattern:(?<!\$)\d+`:

```js run
let str = "2 dndes coûte $60";

alert( str.match(/(?<!\$)\b\d+/g) ); // 2 (le prix ne correspond pas )
```

## Groupes capturants

Généralement, le contenu d'une parenthese de lookaround ne fait partie des resultats.

Par exmple dans le motif `pattern:\d+(?=€)`, le signe `pattern:€` n'est pas capture comme une partie de la corredpondance. C'est naturel: nous recherchons un nombre `pattern:\d+`, tandis que `pattern:(?=€)` iest juste un test qui doit etre suivi de `subject:€`.

Mais dans certains cas, nous voulons capturer l'expression du lookaround aussi, comme une partie de la correspondance.C'est possible.Il suffit juste de le l'entourer d'une parenthese supplementaire. 

Dans l'exemple suivant, le signe de la monnaie est capture, en meme temps aue la quqntite.

```js run
let str = "1 turkey costs 30€";
let regexp = /\d+(?=(€|kr))/; // parentheses supplemetaires autour de  €|kr

alert( str.match(regexp) ); // 30, €
```

Et voila le meme chose pour lookbehind:

```js run
let str = "1 turkey costs $30";
let regexp = /(?<=(\$|£))\d+/;

alert( str.match(regexp) ); // 30, $
```

## Summary

Lookahead et lookbehind (ensemble désignés sous le nom de looparound) sont utiles quand nous voulons identifier quelquechose selon le contexte avant/après lui.

Pour les expressions regulières simple, nous pouvons une chose similaire manuellement: considerer tous les elemets, dans tous les contextes et alors filtrer par contexte en boucle 

Vous vous souvenez que `str.match` (sans le drapeau `pattern:g`) et `str.matchAll` retournent (toujours) les correspondances comme des tableaux avec une propriete `index`, et donc nous connaissons où exactement il est et nous pouvons verifier le contexte

Mais generalement lookaround est plus adapté.

Types de lookaround:

| motif           | type             | correspondances |
|--------------------|------------------|---------|
| `X(?=Y)`   | Lookahead positif | `pattern:X` si il est suivi de `pattern:Y` |
| `X(?!Y)`   | Lookahead négatif | `pattern:X` si il n'est pas suivi de`pattern:Y` |
| `(?<=Y)X` |  Lookbehind positif| `pattern:X` s'il suit `pattern:Y` |
| `(?<!Y)X` | Lookbehind négatif| `pattern:X` s'il ne suit pas `pattern:Y` |
