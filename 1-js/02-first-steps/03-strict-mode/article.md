# Le mode moderne, "use strict"

JavaScript a longtemps évolué sans problèmes de compatibilité. De nouvelles fonctionnalités ont été ajoutées au langage, mais les anciennes fonctionnalités n’ont pas été modifiées.

Cela a l'avantage de ne jamais casser le code existant. Mais l'inconvénient était que toute erreur ou décision imparfaite prise par les créateurs de JavaScript restait bloquée dans le langage pour toujours.

Il en avait été ainsi jusqu'en 2009 lorsque ECMAScript 5 (ES5) est apparu. Il a ajouté de nouvelles fonctionnalités au langage et modifié certaines des fonctionnalités existantes. Pour conserver l'ancien code, la plupart des modifications sont désactivées par défaut. Vous devez les activer explicitement avec une directive spéciale : `"use strict"`.

## "use strict"

La directive ressemble à une chaîne de caractères : `"use strict"` ou `'use strict'`. Lorsqu'il se trouve en haut du script, l'ensemble du script fonctionne de manière "moderne".

Par exemple

```js
"use strict";

// ce code fonctionne de manière moderne
...
```

Nous allons bientôt apprendre les fonctions (un moyen de regrouper les commandes). À l'avenir, notons que `"use strict"` peut être placé au début du corps de la fonction. Faire cela active le mode strict dans cette fonction uniquement. Mais d'habitude, les gens l'utilisent pour tout le script.


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

Lorsque vous utilisez une [console de développement](info:devtools) pour exécuter du code, veuillez noter qu'elle n'utilise pas `use strict` par défaut.

Parfois, lorsque `use strict` fait une différence, vous obtenez des résultats incorrects.

Alors, comment utiliser `use strict` dans la console ?

D'abord, vous pouvez essayer d'appuyer sur `key:Shift+Enter` pour saisir plusieurs lignes et mettre `use strict` en haut comme cela :

```js
'use strict'; <Shift+Enter for a newline>
//  ...votre code
<Enter to run>
```

Cela fonctionne dans la plupart des navigateurs, à savoir Firefox et Chrome.

Si ce n’est pas le cas, comme par exemple dans un ancien navigateur, le moyen le plus fiable d’assurer `use strict` serait d'encapsuler le code dans la console comme ceci :

```js
(function() {
  'use strict';

  // ... votre code ici ...
})()
```

## Devrions-nous activer "use strict" ?

La question peut sembler évidente, mais ce n'est pas le cas.

On pourrait recommander de démarrer les scripts avec `"use strict"` ... Mais vous savez ce qui est cool ?

Le JavaScript moderne prend en charge les "classes" et les "modules" -- des structures de langage avancées (nous y arriverons sûrement), qui activent automatiquement `use strict`. Nous n'avons donc pas besoin d'ajouter la directive `"use strict"` si nous les utilisons.

**Donc, pour l'instant `"use strict";` est un invité bienvenu en haut de vos scripts. Plus tard, lorsque votre code est entièrement dans des classes et des modules, vous pouvez l'omettre.**

A partir de maintenant, nous devons connaître `use strict` en général.

Dans les chapitres suivants, au fur et à mesure que nous apprendrons les fonctionnalités du langage, nous verrons les différences entre les modes strict et anciens modes. Heureusement, il n'y en a pas beaucoup et ils améliorent en fait nos vies.

Tous les exemples de ce tutoriel supposent le mode strict, sauf indication contraire (très rarement).
