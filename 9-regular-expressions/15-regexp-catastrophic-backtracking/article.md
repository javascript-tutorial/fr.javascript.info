# La rétroaction catastrophique

Certaines expressions régulières semblent simples, mais peuvent prendre beaucoup de temps à s'exécuter, et même "bloquer" le moteur JavaScript.

Tôt ou tard, la plupart des développeurs sont parfois confrontés à un tel comportement. Le symptôme typique - une expression régulière fonctionne bien parfois, mais pour certaines chaînes, elle "se bloque", consommant 100% du CPU.

Dans ce cas, un navigateur Web suggère de tuer le script et de recharger la page. Pas une bonne chose à coup sûr.

Pour JavaScript côté serveur, une telle expression régulière peut bloquer le processus serveur, c'est encore pire. Nous devrions donc absolument y jeter un œil.

## Exemple

Supposons que nous ayons une chaîne et que nous voudrions vérifier si elle se compose de mots `pattern:\w+` avec un espace optionnel `pattern:\s?` après chacun.

Une façon évidente de construire une expression régulières serait de prendre un mot suivi d'un espace optionnel `pattern:\w+\s?` puis de le répéter avec `*`.

Cela nous amène à l'expression régulières `pattern:^(\w+\s?)*$`, elle spécifie zéro ou plusieurs mots de ce type, qui commencent au début `pattern:^` et se terminent à la fin `pattern:$` de la ligne.

En action :

```js run
let regexp = /^(\w+\s?)*$/;

alert(regexp.test("A good string")); // true
alert(regexp.test("Bad characters: $@#")); // false
```

L'expression régulières semble fonctionner. Le résultat est correct. Bien que, sur certaines chaines, cela prenne beaucoup de temps. Tellement longtemps que le moteur JavaScript "se bloque" avec une consommation CPU de 100%.

Si vous exécutez l'exemple ci-dessous, vous ne verrez probablement rien, car JavaScript "se bloquera". Un navigateur Web cessera de réagir aux événements, l'interface utilisateur cessera de fonctionner (la plupart des navigateurs ne permettent que le défilement). Après un certain temps, il vous proposera de recharger la page. Alors soyez prudent avec ceci:

```js run
let regexp = /^(\w+\s?)*$/;
let str = "An input string that takes a long time or even makes this regexp hang!";

// prendra très longtemps
alert(regexp.test(str));
```

Pour être juste, notons que certains moteurs d'expressions régulières peuvent gérer efficacement une telle recherche, par exemple la version du moteur V8 à partir de 8.8 peut le faire (donc Google Chrome 88 ne se bloque pas ici), tandis que le navigateur Firefox se bloque.

## Exemple simplifié

Quel est le problème? Pourquoi l'expression régulière se bloque-t-elle ?

Pour comprendre cela, simplifions l'exemple : supprimez les espaces `pattern:\s?`. Il devient alors `pattern:^(\w+)*$`.

Et, pour rendre les choses plus évidentes, remplaçons `pattern:\w` par `pattern:\d`. L'expression régulière résultante est toujours bloquée, par exemple :

```js run
let regexp = /^(\d+)*$/;

let str = "012345678901234567890123456789z";

// prendra beaucoup de temps (attention!)
alert(regexp.test(str));
```

Alors, quel est le problème avec l'expression régulière ?

Tout d'abord, on peut remarquer que l'expression régulière `pattern:(\d+)*` est un peu étrange. Le quantificateur `pattern:*` semble superflu. Si nous voulons un nombre, nous pouvons utiliser `pattern:\d+`.

En effet, l'expression régulière est artificielle ; nous l'avons obtenu en simplifiant l'exemple précédent. Mais la raison de sa lenteur est la même. Alors comprenons-le, et alors l'exemple précédent deviendra évident.

Que se passe-t-il lors de la recherche de `pattern:^(\d+)*$` dans la ligne `subject:123456789z` (raccourci un peu pour plus de clarté, veuillez noter un caractère non numérique `subject:z` à la fin, c'est important), pourquoi cela prend-il autant de temps ?

Voici ce que fait le moteur d'expression régulière :

1. Tout d'abord, le moteur d'expression régulière essaie de trouver le contenu des parenthèses : le nombre `pattern:\d+`. Le plus `pattern:+` est gourmand par défaut, donc il consomme tous les chiffres :

    ```
    \d+.......
    (123456789)z
    ```

    Une fois tous les chiffres consommés, `pattern:\d+` est considéré comme trouvé (comme `match:123456789`).

    Ensuite, le quantificateur en étoile `pattern:(\d+)*` s'applique. Mais il n'y a plus de chiffres dans le texte, donc l'étoile ne donne rien.

    Le caractère suivant du modèle est la fin de chaîne `pattern:$`. Mais dans le texte, nous avons `subject:z` à la place, donc il n'y a pas de correspondance :

    ```
               X
    \d+........$
    (123456789)z
    ```

2. Comme il n'y a pas de correspondance, le quantificateur gourmand `pattern:+` diminue le nombre de répétitions, recule d'un caractère.

    Maintenant `pattern:\d+` prend tous les chiffres sauf le dernier (`match:12345678`) :
    ```
    \d+.......
    (12345678)9z
    ```
3. Ensuite, le moteur essaie de continuer la recherche à partir de la position suivante (juste après `match:12345678`).

    L'étoile `pattern:(\d+)*` peut être appliquée -- elle donne une autre correspondance de `pattern:\d+`, le nombre `match:9` :

    ```

    \d+.......\d+
    (12345678)(9)z
    ```

    Le moteur essaie à nouveau de faire correspondre `pattern:$`, mais échoue, car il rencontre `subject:z` à la place :

    ```
                 X
    \d+.......\d+
    (12345678)(9)z
    ```

4. Il n'y a pas de correspondance, donc le moteur continuera à revenir en arrière, diminuant le nombre de répétitions. Le backtracking fonctionne généralement comme ceci : le dernier quantificateur gourmand diminue le nombre de répétitions jusqu'à ce qu'il atteigne le minimum. Ensuite, le quantificateur gourmand précédent diminue, et ainsi de suite.

    Toutes les combinaisons possibles sont tentées. Voici leurs exemples.

    Le premier nombre `pattern:\d+` comporte 7 chiffres, puis un nombre de 2 chiffres :

    ```
                 X
    \d+......\d+
    (1234567)(89)z
    ```

    Le premier nombre a 7 chiffres, puis deux nombres de 1 chiffre chacun :

    ```
                   X
    \d+......\d+\d+
    (1234567)(8)(9)z
    ```

    Le premier nombre comporte 6 chiffres, puis un nombre de 3 chiffres :

    ```
                 X
    \d+.......\d+
    (123456)(789)z
    ```

    Le premier numéro comporte 6 chiffres, puis 2 chiffres :

    ```
                   X
    \d+.....\d+ \d+
    (123456)(78)(9)z
    ```

    ...Et ainsi de suite.

Il existe de nombreuses façons de diviser une séquence de chiffres "123456789" en nombres. Pour être précis, il y a <code>2<sup>n</sup>-1</code>, où `n` est la longueur de la séquence.

- Pour `123456789` nous avons `n=9`, cela donne 511 combinaisons.
- Pour une séquence plus longue avec `n=20` il y a environ un million (1048575) combinaisons.
- Pour `n=30` - mille fois plus (1073741823 combinaisons).

Essayer chacun d'eux est exactement la raison pour laquelle la recherche prend si longtemps.

## Retour aux mots et aux chaînes

La même chose se produit dans notre premier exemple, lorsque nous recherchons des mots par `pattern:^(\w+\s?)*$` dans la chaîne `subject:An input that hangs!`.

La raison est qu'un mot peut être représenté par un `pattern:\w+` ou plusieurs :
```
(input)
(inpu)(t)
(inp)(u)(t)
(in)(p)(ut)
...
```

Pour un humain, il est évident qu'il peut n'y avoir aucune correspondance, car la chaîne se termine par un signe d'exclamation `!`, mais l'expression régulière attend un caractère verbal `pattern:\w` ou un espace `pattern:\s` à la fin. Mais le moteur ne le sait pas.

Il essaie toutes les combinaisons de la façon dont l'expression régulière `pattern:(\w+\s?)*` peut "consommer" la chaîne, y compris les variantes avec des espaces `pattern:(\w+\s)*` et sans eux `pattern:(\ w+)*` (parce que les espaces `pattern:\s?` sont facultatifs). Comme il existe de nombreuses combinaisons de ce type (on l'a vu avec des chiffres), la recherche prend beaucoup de temps.

Que faire?

Doit-on activer le mode paresseux ?

Malheureusement, cela n'aidera pas : si nous remplaçons `pattern:\w+` par `pattern:\w+?`, l'expression régulière sera toujours bloquée. L'ordre des combinaisons changera, mais pas leur nombre total.

Certains moteurs d'expressions régulières ont des tests délicats et des automatisations finies qui permettent d'éviter de passer par toutes les combinaisons ou de le rendre beaucoup plus rapide, mais la plupart des moteurs ne le font pas, et cela n'aide pas toujours.

## Comment corriger ?

Il existe deux approches principales pour résoudre le problème.

La première consiste à réduire le nombre de combinaisons possibles.

Rendons l'espace non facultatif en réécrivant l'expression régulière sous la forme `pattern:^(\w+\s)*\w*$` - nous chercherons n'importe quel nombre de mots suivis d'un espace `pattern:(\w+\ s)*`, puis (optionnellement) un dernier mot `pattern:\w*`.

Cette expression régulière est équivalente à la précédente (correspond à la même chose) et fonctionne bien :

```js run
let regexp = /^(\w+\s)*\w*$/;
let str = "An input string that takes a long time or even makes this regex hang!";

alert(regexp.test(str)); // false
```

Pourquoi le problème a-t-il disparu ?

C'est parce que maintenant l'espace est obligatoire.

L'expression régulière précédente, si nous omettons l'espace, devient `pattern:(\w+)*`, conduisant à de nombreuses combinaisons de `\w+` dans un seul mot

Ainsi, `subject:input` pourrait correspondre à deux répétitions de `pattern:\w+`, comme ceci :

```
\w+  \w+
(inp)(ut)
```

Le nouveau modèle est différent : `pattern:(\w+\s)*` spécifie des répétitions de mots suivies d'un espace ! La chaîne `subject:input` ne peut pas correspondre à deux répétitions de `pattern:\w+\s`, car l'espace est obligatoire.

Le temps nécessaire pour essayer beaucoup (en fait la plupart) de combinaisons est maintenant économisé.

## Empêcher la rétroaction

Cependant, il n'est pas toujours pratique de réécrire une expression régulière. Dans l'exemple ci-dessus, c'était facile, mais ce n'est pas toujours évident de savoir comment le faire.

De plus, une expression régulière réécrite est généralement plus complexe, et ce n'est pas bon. Les expressions régulières sont suffisamment complexes sans efforts supplémentaires.

Heureusement, il existe une approche alternative. On peut interdire la rétroaction pour le quantificateur.

La racine du problème est que le moteur d'expressions régulières essaie de nombreuses combinaisons qui sont manifestement fausses pour un humain.

Par exemple. dans l'expression régulière `pattern:(\d+)*$` il est évident pour un humain que `pattern:+` ne devrait pas revenir en arrière. Si nous remplaçons un `pattern:\d+` par deux `pattern:\d+\d+` séparés, rien ne change :

```
\d+........
(123456789)!

\d+...\d+....
(1234)(56789)!
```

Et dans l'exemple original `pattern:^(\w+\s?)*$` nous voudrions peut-être interdire la rétroaction dans `pattern:\w+`. C'est-à-dire : `pattern:\w+` doit correspondre à un mot entier, avec la longueur maximale possible. Il n'est pas nécessaire de réduire le nombre de répétitions dans `pattern:\w+` ou de le diviser en deux mots `pattern:\w+\w+` et ainsi de suite.

Les moteurs d'expressions régulières modernes prennent en charge les quantificateurs possessifs pour cela. Les quantificateurs réguliers deviennent possessifs si nous ajoutons `pattern:+` après eux. Autrement dit, nous utilisons `pattern:\d++` au lieu de `pattern:\d+` pour empêcher la rétroaction de `pattern:+`.

Les quantificateurs possessifs sont en fait plus simples que les quantificateurs "réguliers". Ils correspondent au plus grand nombre possible, sans aucune rétroaction. Le processus de recherche sans la rétroaction est plus simple.

Il existe également des "groupes de capture atomique" - un moyen de désactiver le retour en arrière à l'intérieur des parenthèses.

...Mais la mauvaise nouvelle est que, malheureusement, en JavaScript, ils ne sont pas pris en charge.

Nous pouvons les émuler en utilisant une les "assertions avant" (lookahead).

### Lookahead à la rescousse !

Nous en sommes donc arrivés à de véritables sujets avancés. Nous voudrions qu'un quantificateur, tel que `pattern:+` ne fasse pas marche arrière, car parfois la rétroaction n'a aucun sens.

Le modèle pour prendre autant de répétitions de `pattern:\w` que possible sans rétroaction est : `pattern:(?=(\w+))\1`. Bien sûr, nous pourrions prendre un autre modèle au lieu de `pattern:\w`.

Cela peut sembler étrange, mais c'est en fait une transformation très simple.

Décryptons-le :

- Lookahead `pattern:?=` recherche le plus long mot `pattern:\w+` commençant à la position actuelle.
- Le contenu des parenthèses avec `pattern:?=...` n'est pas mémorisé par le moteur, alors placez `pattern:\w+` entre parenthèses. Ensuite, le moteur mémorisera leur contenu
- ...Et permettez-nous de le référencer dans le modèle en tant que `pattern:\1`.

C'est-à-dire : nous regardons en avant - et s'il y a un mot `pattern:\w+`, alors faites-le correspondre à `pattern:\1`.

Pourquoi? C'est parce que le lookahead trouve un mot `pattern:\w+` dans son ensemble et nous le capturons dans le modèle avec `pattern:\1`. Nous avons donc essentiellement implémenté un quantificateur possessif plus `pattern:+`. Il ne capture que le mot entier `pattern:\w+`, pas une partie de celui-ci.

Par exemple, dans le mot `subject:JavaScript`, il peut non seulement correspondre à `match:Java`, mais omettre `match:Script` pour correspondre au reste du modèle.

Voici la comparaison de deux modèles :

```js run
alert("JavaScript".match(/\w+Script/)); // JavaScript
alert("JavaScript".match(/(?=(\w+))\1Script/)); // null
```

1. Dans la première variante, `pattern:\w+` capture d'abord le mot entier `subject:JavaScript` mais ensuite `pattern:+` revient en arrière caractère par caractère, pour essayer de faire correspondre le reste du modèle, jusqu'à ce qu'il réussisse finalement (lorsque `pattern:\w+` correspond à `match:Java`).
2. Dans la deuxième variante, `pattern:(?=(\w+))` regarde devant et trouve le mot `subject:JavaScript`, qui est inclus dans le pattern dans son ensemble par `pattern:\1`, il reste donc aucun moyen de trouver `subject:Script` après.

Nous pouvons mettre une expression régulière plus complexe dans `pattern:(?=(\w+))\1` au lieu de `pattern:\w`, lorsque nous devons interdire la rétroaction pour `pattern:+` après.

```smart
Il y a plus d'informations sur la relation entre les quantificateurs possessifs et lookahead dans les articles [Regex: Emulate Atomic Grouping (and Possessive Quantifiers) with LookAhead](https://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead) et [Mimicking Atomic Groups](https://blog.stevenlevithan.com/archives/mimic-atomic-groups).
```

Réécrivons le premier exemple en utilisant lookahead pour éviter la rétroaction :

```js run
let regexp = /^((?=(\w+))\2\s?)*$/;

alert(regexp.test("A good string")); // true

let str = "An input string that takes a long time or even makes this regex hang!";

alert(regexp.test(str)); // false, fonctionne et rapidement!
```

Ici, `pattern:\2` est utilisé à la place de `pattern:\1`, car il y a des parenthèses externes supplémentaires. Pour éviter de se tromper avec les chiffres, nous pouvons donner un nom aux parenthèses, par ex. `pattern:(?<word>\w+)`.

```js run
// les parenthèses sont nommées ?<word>, référencées comme \k<word>
let regexp = /^((?=(?<word>\w+))\k<word>\s?)*$/;

let str = "An input string that takes a long time or even makes this regex hang!";

alert(regexp.test(str)); // false

alert(regexp.test("A correct string")); // true
```

Le problème décrit dans cet article est appelé "rétroaction catastrophique".

Nous avons couvert deux façons de le résoudre:
- Réécrivez l'expression régulière pour réduire le nombre de combinaisons possibles.
- Empêcher la rétroaction.
