
# Polyfills

Le langage JavaScript évolue régulièrement. De nouvelles propositions pour le langage apparaissent régulièrement, elles sont analysées et, si elles sont jugées utiles, elles sont ajoutées à la liste dans <https://tc39.github.io/ecma262/> et ensuite progressent vers la [specification officielle](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

Les équipes derrière les moteurs JavaScript ont leurs propres idées sur ce qu'il faut d'abord mettre en œuvre. Elles peuvent décider de mettre en œuvre des propositions qui sont en projet et reporter des éléments qui figurent déjà dans les spécifications, car ils sont moins intéressants ou tout simplement plus difficiles à faire.

Il est donc assez courant pour un moteur de ne mettre en œuvre qu'une partie de la norme.

Une bonne page pour voir l’état actuel de la prise en charge des fonctionnalités du langage est <https://kangax.github.io/compat-table/es6/> (c’est énorme, nous avons encore beaucoup à étudier).

## Babel

Lorsque nous utilisons des fonctionnalités modernes du langage, certains moteurs peuvent ne pas supporter un tel code. Comme indiqué, toutes les fonctionnalités ne sont pas implémentées partout.

C'est là que Babel vient à la rescousse.

[Babel](https://babeljs.io) est un [transpileur](https://fr.wikipedia.org/wiki/Compilateur_source_%C3%A0_source). Il réécrit le code JavaScript moderne dans le standard précédent.

Actuellement, Babel comporte deux parties :

1. Tout d’abord, le programme transpileur, qui réécrit le code. Le développeur l'exécute sur son propre ordinateur. Il réécrit le code dans l'ancien standard. Et ensuite, le code est transmis au site Web pour les utilisateurs. Des systèmes de construction de projet moderne comme [webpack](http://webpack.github.io/) qui permet de fournir des moyens d’exécuter automatiquement un transpileur à chaque changement de code, de sorte que cela devient très facile à intégrer dans le processus de développement.

2. Ensuite, le polyfill.

Les nouvelles fonctionnalités du langage peuvent inclure de nouvelles fonctions intégrées et de nouvelles constructions de syntaxe. Le transpiler réécrit le code en transformant les nouvelles constructions de syntaxe en anciennes. Mais en ce qui concerne les nouvelles fonctions intégrées, nous devons les implémenter. JavaScript est un langage très dynamique, les scripts peuvent ajouter / modifier n’importe quelle fonction, afin qu’ils se comportent conformément au standard moderne.

  Un script qui met à jour / ajoute de nouvelles fonctions s'appelle "polyfill". Il "comble" le vide et ajoute les implémentations manquantes.

Deux polyfill intéressants sont :
    - [core js](https://github.com/zloirock/core-js) qui prend beaucoup en charge, permet d’inclure uniquement les fonctionnalités nécessaires.
    - [polyfill.io](http://polyfill.io) service qui fournit un script avec des polyfill, en fonction des fonctionnalités et du navigateur de l'utilisateur.

Nous devons donc configurer le transpileur et ajouter le polyfill pour les anciens moteurs afin de prendre en charge les fonctionnalités modernes.

Donc, si nous allons utiliser les fonctionnalités du langage moderne, un transpiler et un polyfill sont nécessaires.

## Exemples dans le tutoriel


````online
La plupart des exemples sont exécutables sur place, comme ceci :

```js run
alert('Press the "Play" button in the upper-right corner to run');
```

Les exemples qui utilisent le JS moderne ne fonctionneront que si votre navigateur le prend en charge.
````

```offline
Pendant que vous lisez la version hors connexion, les exemples ne sont pas exécutables. Dans EPUB, certains peuvent fonctionner.
```

Google Chrome est généralement la version la plus récente des fonctionnalités du langage, il accepte de lancer des démos ultra-sophistiquées sans transpilers, mais les autres navigateurs modernes fonctionnent également très bien.


