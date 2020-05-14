# Rétro référence dans le paterne : \N et \k<name>

Nous pouvons utiliser le contenu des groupes de capture `pattern:(...)` non seulement dans le résultat ou dans la chaîne de caractères de remplacement, mais également dans le paterne en lui-même.

## Rétro référence par un nombre : \N

Un groupe peut être référencé dans le paterne par `pattern:\N`, où `N` est le numéro du groupe.

Pour rendre son utilité claire, considérons la tâche ci-dessous.

Nous devons trouver des chaînes citées : soit par des apostrophes `subject:'...'`, soit par des guillemets `subject:"..."` -- les deux variantes devraient correspondre.

Comment les trouver ?

Nous pouvons mettre les deux types entre crochets : `pattern:['"](.*?)['"]`, mais ce paterne pourrait correspondre avec des mélanges comme `match:"...'` ou `match:'..."`. Cela mènerait à des correspondances incorrectes lorsqu'une citation apparaît dans une autre, comme dans le texte `subject:"She's the one!"`:

```js run
let str = `He said: "She's the one!".`;

let regexp = /['"](.*?)['"]/g;

// Le résultat n'est pas celui que nous aimerions avoir
alert( str.match(regexp) ); // "She'
```

Comme nous pouvons le voir, le paterne trouve des guillemets ouvrant `match:"`, puis le texte est récupéré jusqu'au `match:'`, ce qui termine la correspondance.

Pour faire en sorte que le paterne vérifie que le caractère terminant la citation est précisément le même que celui qui l'ouvre, nous pouvons l'envelopper dans un groupe de capture et le rétro référencier : `pattern:(['"])(.*?)\1`.

Voilà le code correct :

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(['"])(.*?)\1/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```

Maintenant, ça fonctionne ! Le moteur trouve le premier caractère de citation `pattern:(['"])` et mémorise son contenu. C'est le premier groupe de capture.

Plus loin dans le paterne, `pattern:\1` signifie "cherche le même texte que dans le premier groupe de capture", le même caractère de citation dans notre cas.

Similairement, `pattern:\2` voudrait référencier le 2nd groupe, `pattern:\3` - le 3e groupe, et ainsi de suite.

```smart
Si nous utilisons `?:` dans le groupe, alors nous ne pouvons pas le référencer. Les groupes exclus de la capture `(?:...)` ne sont pas mémorisés par le moteur.
```

```warn header="Ne mélangez pas : dans le paterne, `pattern:\1`, dans le replacement : `pattern:$1`"
Dans la chaîne de remplacement, on utilise un signe dollar : `pattern:$1`, alors que dans un paterne - un antislash `pattern:\1`.
```

## Rétro référence par le nom: `\k<name>`

Si une expression régulière a beaucoup de groupes, il est pratique de leur attribuer un nom.

Pour référencer un groupe nommé, on peut utiliser `pattern:\k<имя>`.

Dans l'exemple ci-dessous, le groupe du caractère de citation s'appelle `pattern:?<quote>`, donc la rétro référence est `pattern:\k<quote>`:

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(?<quote>['"])(.*?)\k<quote>/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```
