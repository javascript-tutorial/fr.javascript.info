
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

1. Tout d’abord, le programme transpileur, qui réécrit le code. Le développeur l'exécute sur son propre ordinateur. Il réécrit le code dans l'ancienne norme. Et ensuite, le code est transmis au site Web pour les utilisateurs. Des systèmes de construction de projet moderne comme [webpack](http://webpack.github.io/) ou [brunch](http://brunch.io/) permettent de fournir des moyens d’exécuter automatiquement un transpileur à chaque changement de code, de sorte que cela n’entraîne aucune perte de temps de notre part.

2. Ensuite, le polyfill.

    Le transpileur réécrit le code afin que les fonctionnalités de syntaxe soient couvertes. Mais pour les nouvelles fonctions, nous devons écrire un script spécial qui les implémente. JavaScript est un langage très dynamique, les scripts peuvent non seulement ajouter de nouvelles fonctions, mais également modifier celles qui sont intégrées, de sorte qu’ils se comportent conformément au standard moderne.

    Il existe un terme "polyfill" pour les scripts qui "fill in" (comblent le vide) et ajoutent les implémentations manquantes.

    Deux polyfill intéressants sont :
    - [babel polyfill](https://babeljs.io/docs/usage/polyfill/) qui supporte beaucoup, mais c'est gros.
    - [polyfill.io](http://polyfill.io) est un service qui permet de charger / construire des polyfills à la demande, en fonction des fonctionnalités dont nous avons besoin.

Nous devons donc configurer le transpileur et ajouter le polyfill pour les anciens moteurs afin de prendre en charge les fonctionnalités modernes.

Si nous nous orientons vers les moteurs modernes et n’utilisons pas de fonctionnalités autres que celles prises en charge partout, nous n’avons pas besoin de Babel.

## Exemples dans le tutoriel


````online
La plupart des exemples sont exécutables sur place, comme ceci :

```js run
alert('Press the "Play" button in the upper-right corner to run');
```

Les exemples qui utilisent le JS moderne ne fonctionneront que si votre navigateur le prend en charge.
````

```offline
Pendant que vous lisez la version hors connexion, les exemples ne sont pas exécutables. Mais ils fonctionnent habituellement :)
```

[Chrome Canary](https://www.google.com/chrome/browser/canary.html) est bon pour tous les exemples, mais d’autres navigateurs modernes sont également très bien.

Notez que lors de la production, nous pouvons utiliser Babel pour traduire le code pour l'adapter aux navigateurs moins récents. Il n'y aura donc pas de limitation, le code s'exécutera partout.
