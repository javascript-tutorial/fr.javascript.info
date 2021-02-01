
# Polyfills and transpilers

Le langage JavaScript évolue régulièrement. De nouvelles propositions pour le langage apparaissent régulièrement, elles sont analysées et, si elles sont jugées utiles, elles sont ajoutées à la liste dans <https://tc39.github.io/ecma262/> et ensuite progressent vers la [specification officielle](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

Les équipes derrière les moteurs JavaScript ont leurs propres idées sur ce qu'il faut d'abord mettre en œuvre. Elles peuvent décider de mettre en œuvre des propositions qui sont en projet et reporter des éléments qui figurent déjà dans les spécifications, car ils sont moins intéressants ou tout simplement plus difficiles à faire.

Il est donc assez courant pour un moteur de ne mettre en œuvre qu'une partie de la norme.

Une bonne page pour voir l’état actuel de la prise en charge des fonctionnalités du langage est <https://kangax.github.io/compat-table/es6/> (c’est énorme, nous avons encore beaucoup à étudier).

As programmers, we'd like to use most recent features. The more good stuff - the better!

<<<<<<< HEAD
D'un autre côté, comment faire fonctionner le code moderne sur des moteurs plus anciens qui ne comprennent pas encore les fonctionnalités récentes ?
=======
On the other hand, how to make our modern code work on older engines that don't understand recent features yet?
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

Il existe deux outils pour cela :

1. Les transpilers.
2. Les polyfills.

Ici, dans ce chapitre, notre objectif est de comprendre l'essentiel de leur fonctionnement et de leur place dans le développement Web.

## Les transpilers

Un [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) est un logiciel spécial qui peut analyser ("lire et comprendre") le code moderne et le réécrire en utilisant des constructions de syntaxe plus anciennes, de sorte que le résultat soit le même.

Par exemple, JavaScript avant l'année 2020 n'avait pas "l'opérateur de coalescence des nuls" `??`. Ainsi, si un visiteur utilise un navigateur obsolète, il peut ne pas comprendre le code tel que `height = height ?? 100`.

Un transpiler analyserait notre code et réécrirait `height ?? 100` en `(height !== undefined && height !== null) ? height : 100`.

```js
// avant d'exécuter le transpiler
height = height ?? 100;

// après avoir exécuté le transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Désormais, le code réécrit convient aux anciens moteurs JavaScript.

Habituellement, un développeur exécute le transpiler sur son propre ordinateur, puis déploie le code transpilé sur le serveur.

En parlant de noms, [Babel](https://babeljs.io) est l'un des transpileurs les plus connus.

Les systèmes de construction de projets modernes, tels que [webpack](http://webpack.github.io/), fournissent des moyens pour exécuter un transpiler automatiquement à chaque changement de code, il est donc très facile à intégrer dans le processus de développement.

## Les polyfills

Les nouvelles fonctionnalités du langage peuvent inclure non seulement des constructions de syntaxe et des opérateurs, mais également des fonctions intégrées.

Par exemple, `Math.trunc(n)` est une fonction qui "coupe" la partie décimale d'un nombre, par exemple `Math.trunc(1.23) = 1`.

Dans certains moteurs JavaScript (très obsolètes), il n'y a pas de `Math.trunc`, donc un tel code échouera.

Comme nous parlons de nouvelles fonctions, pas de changements de syntaxe, il n'est pas nécessaire de transpiler quoi que ce soit ici. Nous avons juste besoin de déclarer la fonction manquante.

Un script qui met à jour/ajoute de nouvelles fonctions est appelé "polyfill". Il "comble" le vide et ajoute les implémentations manquantes.

Pour ce cas particulier, le polyfill pour `Math.trunc` est un script qui l'implémente, comme ceci :

```js
if (!Math.trunc) { // si une telle fonction n'existe pas
  // l'implémenter
  Math.trunc = function(number) {
    // Math.ceil et Math.floor existe même dans les anciens moteurs JavaScript
    // ils sont traités plus tard dans le tutoriel
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript est un langage très dynamique, les scripts peuvent ajouter/modifier toutes les fonctions, y compris celles intégrées.

Deux librairies intéressantes de polyfills sont :
- [core js](https://github.com/zloirock/core-js) qui prend en charge beaucoup, permet d'inclure uniquement les fonctionnalités nécessaires.
- [polyfill.io](http://polyfill.io) est un service qui fournit un script avec des polyfills, en fonction des fonctionnalités et du navigateur de l'utilisateur.


## Résumé

Dans ce chapitre, nous aimerions vous motiver à étudier les fonctionnalités du langage modernes et même "de pointe", même si elles ne sont pas encore bien prises en charge par les moteurs JavaScript.

N'oubliez pas d'utiliser un transpiler (si vous utilisez une syntaxe ou des opérateurs modernes) et des polyfills (pour ajouter des fonctions qui peuvent manquer). Et ils veilleront à ce que le code fonctionne.

Par exemple, plus tard, lorsque vous serez familiarisé avec JavaScript, vous pourrez configurer un système de création de code basé sur [webpack](http://webpack.github.io/) avec le plugin [babel-loader](https://github.com/babel/babel-loader).

De bonnes ressources qui montrent l'état actuel de la prise en charge de diverses fonctionnalités :
- <https://kangax.github.io/compat-table/es6/> - pour du pur JavaScript.
- <https://caniuse.com/> - pour les fonctions liées au navigateur.

P.S. Google Chrome est généralement le plus à jour avec les fonctionnalités du langage, essayez-le si une démonstration d'un tutoriel échoue. La plupart des démos de didacticiels fonctionnent avec n'importe quel navigateur moderne.

