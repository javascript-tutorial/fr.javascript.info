
# Polyfills et transposeurs

Le langage JavaScript évolue régulièrement. De nouvelles propositions pour le langage apparaissent régulièrement, elles sont analysées et, si elles sont jugées utiles, elles sont ajoutées à la liste dans <https://tc39.github.io/ecma262/> et ensuite progressent vers le [cahier des charge officiel](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

Les équipes derrière les moteurs JavaScript ont leurs propres idées sur ce qu'il faut d'abord mettre en œuvre. Elles peuvent décider de réaliser des propositions qui sont en projet et reporter des éléments qui figurent déjà dans les spécifications, car ils sont moins intéressants ou tout simplement plus difficiles à faire.

Il est donc assez courant pour un moteur de ne mettre en œuvre qu'une partie de la norme.

Une bonne page pour voir l’état actuel de la prise en charge des fonctionnalités du langage est <https://kangax.github.io/compat-table/es6/> (c’est énorme, nous avons encore beaucoup à étudier).

En tant que programmers, nous souhaiterions utiliser les fonctionalités les plus récentes. we'd like to use most recent features. Plus il y a de bonnes choses, mieux c'est !

D'un autre côté, comment faire pour qu'un code moderne fonctionne avec les plus vieux moteurs qui ne supportent pas encore ces fonctionnalités récentes ?

Il existe deux outils pour ça :

1. Les transposeurs.
2. Les polyfills.

Ici dans ce chapitre, notre but est de comprendre l'essentiel de leur fonctionnement et leur place dans le développement web.

## Les transposeurs

Un [transposeur](https://en.wikipedia.org/wiki/Source-to-source_compiler) est une partie spéciale d'un logiciel qui peut analyser ("lire et comprendre") un code moderne et le réécrire en utilisant des constructions syntaxiques plus anciennes afin que le résultat soit le même.

Par exemple, JavaScript avant l'année 2020 ne possédait pas "l'opérateur de coalescence nul" `??`. Ainsi, si un visiteur utilise un navigateur obsolète, il peut échouer dans la compréhension du code `height = height ?? 100`.

Un transposeur devrait analyser notre code et réécrire `height ?? 100` en `(height !== undefined && height !== null) ? height : 100`.

```js
// avant de lancer le transposeur
height = height ?? 100;

// après avoir lancé le transposeur
height = (height !== undefined && height !== null) ? height : 100;
```

Maintenant, le code réécrit est compatible avec les moteurs anciens de JavaScript.

Habituellement, un développeur lance un transposeur sur son ordinateur et déploie le code transposé sur le serveur.

Pour donner un nom, [Babel](https://babeljs.io) est l'un des plus éminents prominents actuellement. 

Les systèmes modernes de construction de projets, tels que [webpack](http://webpack.github.io/), permettent d'exécuter automatiquement le transposeur à chaque modification du code, ce qui le rend très facile à intégrer dans le processus de développement.

## Polyfills

Les nouvelles fonctionnalités de langage devraient inclure non seulement la syntaxe des constructeurs et des opérateurs mais aussi les fonctions intégrées.

Par example, `Math.trunc(n)` est une fonction qui "coupe" la partie décimale d'un nombre, par exemple `Math.trunc(1.23) = 1`.

Dans certains (très obsolètes) moteurs de JavaScript, `Math.trunc` n'existe pas, ce qui entraîne un échec du code.

Comme nous parlons de nouvelles fonctions, il n'y a aucune modification syntaxique et donc aucune transposition à faire. Il faut juste déclarer la fonction manquante.

Un script qui met à jour/ajoute de nouvelles fonctions est appelé "polyfill". Cela "remplit"le vide et ajoute les fonctionnalités manquantes.

Dans ce cas particulier, le polyfill pour `Math.trunc` est un script qui la met en œuvre de la manière suivante :

```js
if (!Math.trunc) { // s'il n'y a pas une fonction de ce type
  // on la met en œuvre
  Math.trunc = function(number) {
    // Math.ceil et Math.floor existent même pour les anciens moteurs JavaScript
    // elles seront vues plus tard dans ce tutoriel
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript est une langage très dynamique, les scripts peuvent ajouter/modifier n'importe quelle function, même celles intégrées par défaut.

Deux bibliothèques de polyfills intéressantes sont :
- [core js](https://github.com/zloirock/core-js) qui supporte un nombre important de nouvelles fonctionnalités, et qui permet de n'inclure que celles nécessaires.
- [polyfill.io](http://polyfill.io) qui est un service qui fournit un script de polyfills selon les caractéristiques et le navigateur de l'utilisateur.


## Résumé

Dans ce chapitre, nous avons souhaité vous motiver à étudier les caractéristiques modernes et "encore fraiches" du langage, même si elles ne sont pas encore bien supportées par les moteurs de JavaScript.

N'oubliez pas d'utiliser un transposeur (si vous utilisez la syntaxe moderne ou les opérateurs) et les polyfills (pour ajouter des fonctions qui pourraient manquer). Et ils vous assurerons que le code fonctionnera.

Par exemple, plus tard quand vous serez familier avec JavaScript, vous pourrez mettre en place un système de construction de code basé sur [webpack](http://webpack.github.io/) avec le plugin [babel-loader](https://github.com/babel/babel-loader).

De bonnes resources qui montrent l'état actuel du support des différentes fonctionnalités :
- <https://kangax.github.io/compat-table/es6/> - pour du JavaScript pur.
- <https://caniuse.com/> - pour des fonctions supportées par les navigateurs.

P.S. Google Chrome est généralement le plus à jour en ce qui concerne les caractéristiques du langage, essayez le en cas d'échec d'une démo de ce tutoriel. La plupart des tutoriels de démonstration devraient fonctioner cependant avec n'importe quel navigateur moderne.
