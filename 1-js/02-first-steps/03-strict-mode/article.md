# Le mode moderne, "use strict"

JavaScript a longtemps évolué sans problèmes de compatibilité. De nouvelles fonctionnalités ont été ajoutées au langage, mais les anciennes fonctionnalités n’ont pas été modifiées.

Cela a l'avantage de ne jamais casser le code existant. Mais l'inconvénient était que toute erreur ou décision imparfaite prise par les créateurs de JavaScript restait bloquée dans lea langage pour toujours.

Il en avait été ainsi jusqu'en 2009 lorsque ECMAScript 5 (ES5) est apparu. Il a ajouté de nouvelles fonctionnalités au langage et modifié certaines des fonctionnalités existantes. Pour conserver l'ancien code, la plupart des modifications sont désactivées par défaut. Vous devez les activer explicitement avec une directive spéciale : `"use strict"`.

## "use strict"

La directive ressemble à une chaînede caractères : `"use strict"` or `'use strict'`. Lorsqu'il se trouve en haut du script, l'ensemble du script fonctionne de manière "moderne".

Par exemple

```js
"use strict";

// ce code fonctionne de manière moderne
...
```

<<<<<<< HEAD
Nous allons apprendre les fonctions (un moyen de regrouper les commandes) bientôt. A l'avenir, notons que "use strict" peut être placé au début du corps de la fonction au lieu de l'intégralité du script. Faire cela active le mode strict dans cette fonction uniquement. Mais d'habitude, les gens l'utilisent pour tout le script.

=======
Quite soon we're going to learn functions (a way to group commands), so let's note in advance that `"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. But usually people use it for the whole script.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

````warn header="Assurez-vous que \"use strict\" est tout en haut"
Assurez-vous que `"use strict"` est en haut du script, sinon le mode strict peut ne pas être activé.

Il n'y a pas de mode strict ici :

```js no-strict
alert("some code");
// "use strict" ci-dessous est ignoré, il doit être en haut

"use strict";

// le mode strict n'est pas activé
```

Seuls les commentaires peuvent apparaître avant `"use strict"`.
````

```warn header="Il n'y a aucun moyen d'annuler `use strict`"
Il n'y a pas de directive `"no use strict"` ou similaire, qui réactiverait l'ancien comportement.

Une fois que nous entrons dans le mode strict, il n’y a plus de retour possible.
```
## Console du Navigateur

Pour l’avenir, lorsque vous utilisez une console de navigation pour tester des fonctionnalités, veuillez noter qu’elle n’utilise pas `use strict` par défaut.

<<<<<<< HEAD
Parfois, lorsque `use strict` fait une différence, vous obtenez des résultats incorrects.

Vous pouvez essayer d'appuyer sur `key:Shift+Enter` pour saisir plusieurs lignes et mettre `use strict` en haut comme cela :
=======
When you use a [developer console](info:devtools) to run code, please note that it doesn't `use strict` by default.

Sometimes, when `use strict` makes a difference, you'll get incorrect results.

So, how to actually `use strict` in the console?

First, you can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
'use strict'; <Shift+Enter for a newline>
//  ...votre code
<Enter to run>
```

Cela fonctionne dans la plupart des navigateurs, à savoir Firefox et Chrome.

<<<<<<< HEAD
Si ce n’est pas le cas, le moyen le plus fiable d’assurer `use strict` serait d'entrer le code dans la console comme ceci :
=======
If it doesn't, e.g. in an old browser, there's an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
(function() {
  'use strict';

<<<<<<< HEAD
  // ...votre code...
})()
```

## Toujours utiliser "use strict"

Les différences entre le mode `"strict"` et le mode par "défaut" doivent encore être couvertes.

Dans les chapitres suivants, au fur et à mesure que nous apprendrons les fonctionnalités du langage, nous noterons les différences du mode strict. Heureusement, il n'y en a pas beaucoup. Et ils rendent notre vie meilleure.

À ce stade, il suffit de savoir en général :

1. La directive `"use strict"` fait passer le moteur en mode "moderne", modifiant le comportement de certaines fonctionnalités intégrées. Nous les verrons en détails pendant que nous étudions.
2. Le mode strict est activé par `"use strict"` en haut du fichier. Il existe également plusieurs fonctionnalités de langage telles que "classes" et "modules" qui permettent un mode strict automatiquement.
3. Le mode strict est pris en charge par tous les navigateurs modernes.
4. Il est toujours recommandé de lancer les scripts avec `"use strict"`. Tous les exemples de ce tutoriel le supposent, sauf si (très rarement) c'est spécifié autrement.
=======
  // ...your code here...
})()
```

## Should we "use strict"?

The question may sound obvious, but it's not so.

One could recommend to start scripts with `"use strict"`... But you know what's cool?

Modern JavaScript supports "classes" and "modules" - advanced language structures (we'll surely get to them), that enable `use strict` automatically. So we don't need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we've got to know about `use strict` in general.

In the next chapters, as we learn language features, we'll see the differences between the strict and old modes. Luckily, there aren't many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
