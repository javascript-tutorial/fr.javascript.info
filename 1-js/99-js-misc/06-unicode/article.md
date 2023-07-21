
# Unicode et fonctionnement des chaînes de caractères

```warn header="Connaissances avancées"
Cette section approfondit les "String Internals", le fonctionnement interne des chaines de caractère. Des connaissances sur ces sujets vous seront utiles lorsque vous travaillerez avec les émojis, les caractères mathématiques ou les caractères hiéroglyphiques ou autres symboles rares.
```

Comme vous le savez, les chaines de caractères JavaScript sont basées sur le Unicode [Unicode](https://fr.wikipedia.org/wiki/Unicode): chaque caractère est représenté par une séquence d'octets de 1 à 4 octet.

JavaScript permet d'injecter un caractère dans une chaîne en spécifiant son code hexadécimal sous une de ces trois formes: 

- `\xXX`

    `XX` doit être deux chiffres hexadécimaux ayant une valeur entre `00` et `FF`, alors `\xXX` est le caractère dont le code Unicode est `XX`.

    Parce que la notation `\xXX` ne supporte que deux chiffres hexadécimaux, elle peut être utilisée pour les 256 caractères Unicodes.

    Les 256 premiers caractères incluent l'alphabet latin, les caractères les plus basiques de syntaxe, et d'autres. Par exemple, `"\x7A"` correspond à `"z"` (Unicode `U+007A`).

    ```js run
    alert( "\x7A" ); // z
    alert( "\xA9" ); // ©, le symbole de Copyright
    ```

- `\uXXXX`
    `XXXX` doit obligatoirement être 4 chiffres hexadécimaux ayant une valeur entre `0000` et `FFFF`, alors `\uXXXX` est le caractère pour lequel le code Unicode est `XXXX`.

    Les caractères avec des codes Unicode supérieurs à `U+FFFF` peuvent également être représenté avec cette notation, mais dans ce cas, nous devons utiliser ce que l'on appelle une paire de substitution (nous reparlerons des paires de substitutions plus tard dans ce chapitre).

    ```js run
    alert( "\u00A9" ); // ©, le même que \xA9, en utilisant la notation hexadécimale à 4 chiffres.
    alert( "\u044F" ); // я, la lettre de l'alphabet cyrillique
    alert( "\u2191" ); // ↑, symbole de flèche vers le haut
    ```

- `\u{X…XXXXXX}`

    `X…XXXXXX` doit être une valeur hexadécimale de 1 à 6 octet entre `0` et `10FFFF` (le plus haut code défini par Unicode). Cette notation nous permet de représenter facilement tous les caractères Unicode existants.

    ```js run
    alert( "\u{20331}" ); // 佫, un caractère chinois rare (Unicode long)
    alert( "\u{1F60D}" ); // 😍, Le symbole d'un visage souriant (un autre Unicode long)
    ```

## Les paires de substitution

Tous les caractères fréquemment utilisés ont des codes de 2 octets (4 chiffres hexadécimaux). Les lettres dans les langages européens les plus courants, les nombres et les ensembles idéographiques unifiés de base (CJK -- provenant des systèmes d'écriture chinois, japonais et coréen),  ont une représentation en 2 octets.

A l'origine, le JavaScript est basé sur l'encodage UTF-16 qui ne permet que 2 octets par caractère. Mais 2 octets ne permettent que 65536 combinaisons ce qui n'est pas suffisant pour tous les symboles possibles de l'Unicode.

Les symboles rares qui nécessitent plus de 2 octets sont encodés à l'aide d'une paire de caractères de 2 octets appelée "paire de substitution".

Comme effet secondaire, la longueur de tels symboles est `2`:

```js run
alert( '𝒳'.length ); // 2, Le script mathématique avec un X majuscule
alert( '😂'.length ); // 2, un visage qui pleure de rire
alert( '𩷶'.length ); // 2, un caractère chinois rare
```

C'est parce que les paires de substitution n'existaient pas aumoment de la création de JavaScript, et ne sont donc pas correctement traitées par le langage !

Nous avons en réalité un seul symbole dans chacune des paires ci-dessus, mais la propriété `length` affiche une longueur de `2`.

Obtenir un symbole peut également être délicat, car la plupart des fonctionnalités du langage traitent les paires de substitution comme deux caractères.

Par exemple, nous pouvons ici voir deux caractères impairs dans la sortie:

```js run
alert( '𝒳'[0] ); // affiche des symboles étranges...
alert( '𝒳'[1] ); // ...des parties de la paire de substitution
```

Les parties de la paire de substitution n'ont pas de sens l'une sans l'autre. Les alertes dans l'exemple ci-dessus affichent ainsi des caractères indésirables.

Techniquement, les paires de substitution sont également détectables par leurs codes: Si un caractère possède le code dans l'intervalle `0xd800..0xdbff`, alors il sera dans la première partie de la paire de substitution. Le caractère suivant (la seconde partie) doit avoir un code dans l'intervalle `0xdc00..0xdfff`. Ces intervalles sont exclusivement réservés pour les paires de substitution d'après les standards.

Les méthodes [String.fromCodePoint](https://developer.mozilla.org/fr-FR/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) et [str.codePointAt](https://developer.mozilla.org/fr-FR/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) ont été ajoutés à JavaScript afin de gérer les paires de substitution.

Ils sont essentiellement les mêmes que [String.fromCharCode](mdn:js/String/fromCharCode) et [str.charCodeAt](mdn:js/String/charCodeAt), mais ils traitent les paires de substitution correctement.

On peut voir la différence ici:

```js run
// charCodeAt n'est pas conscient de la paire de substitution, donc il donne les codes pour la 1ère partie de 𝒳:

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt est conscient de la paire de substitution
alert( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, lit les deux parties de la paire de substitution
```

Ceci dit, si nous prenons la position 1 (ce qui est plutôt incorrect ici), alors ils retournent tous les deux uniquement la 2ème partie de la paire:

```js run
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
alert( '𝒳'.codePointAt(1).toString(16) ); // dcb3
// seconde moitié de la paire sans signification
```

Vous trouverez plusieurs moyens de gérer les paires de substitution plus tard dans ce chapitre <info:iterable>. Il existe probablement des librairies spécialement conçues pour cela également, mais aucune n'est suffisamment connue pour vous la suggérer ici.

````warn header="A retenir: Diviser une chaîne de caractère sur un point arbitraire est dangereux"
Nous ne pouvons pas simplement séparer une chaine de caractère sur un point arbitraire, par exemple, prenez `str.slice(0, 4)` et attendez-vous à ce que ce soit une chaîne de caractère valide, par exemple :

```js run
alert( 'Salut 😂'.slice(0, 4) ); //  Salut [?]
```

Ici, nous pouvons voir un caractère indésirable ( la première moitié de la paire de substitution du sourire) en sortie.

Soyez simplement conscient de cela si vous avez l'intention de travailler de manière fiable avec des paires de substitution. Cela peut ne pas être un gros problème, mais vous devriez au moins comprendre ce qu'il se passe.
````

## Marques diacritiques et normalisation

Dans de nombreux langages, des symboles sont composés d'un caractère de base avec une marque au dessus ou en dessous.

Par exemple, la lettre `a` peut être la base de ces caractères: `àáâäãåā`.

Les caractères "composites" les plus communs ont leur propre code dans la table Unicode. Mais tous n'en ont pas en raison du trop grand nombre de possibilité de combinaison.

Pour supporter les compositions arbitraires, le standard Unicode nous permet d'utiliser plusieurs caractères Unicode: le caractère de base suivi d'un ou plusieurs caractères de marques qui le "décorent".

Par exemple, si nous avons `S` suivi par le caractère spécial "point au-dessus" (code `\u0307`), il est affiché comme Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

Si nous avons besoin d'une marque supplémentaire au-dessus de la lettre (ou en dessous d'elle) -- pas de problème, il suffit simplement d'ajouter le caractère de marque nécessaire.

Par exemple, si nous ajoutons un caractère "point en dessous" (code `\u0323`), nous aurons "S avec des points au-dessus et en dessous": `Ṩ`.

Par exemple:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

Cela offre une grande flexibilité, mais aussi un problème intéressant: deux caractères peuvent visuellement se ressembler, mais être représenté par différentes compositions Unicode.

Par exemple:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + point au-dessus + point en dessous
let s2 = 'S\u0323\u0307'; // Ṩ, S + point en dessous + point au-dessus

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // faux bien que les caractères semblent identiques (?!)
```

Pour résoudre ce problème, il existe une "normalisation Unicode", un algorithme qui convertit chaque chaîne vers sa forme "normale".

Cet algorithme est implémenté par [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

Il est intéressant de noter que dans notre situation `normalize()` rassemble en réalité une séquence de 3 caractères en un seul: `\u1e68` (S avec deux points).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

En réalité, ce n'est pas toujours le cas. Cela est dû au fait que le symbole `Ṩ` est "assez commun", donc les créateurs de l'Unicode l'ont inclus dans la table principale et lui ont attribué un code.

Si vous souhaitez en apprendre plus sur les règles de normalisation et ses variantes -- elles sont décrites dans l'appendix du standard Unicode: [Unicode Normalization Forms](https://www.unicode.org/reports/tr15/), mais pour la plupart des besoins pratiques, les informations de cette section sont suffisantes.
