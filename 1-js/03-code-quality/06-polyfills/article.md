
# Polyfills and transpilers

Le langage JavaScript évolue régulièrement. De nouvelles propositions pour le langage apparaissent régulièrement, elles sont analysées et, si elles sont jugées utiles, elles sont ajoutées à la liste dans <https://tc39.github.io/ecma262/> et ensuite progressent vers la [specification officielle](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

Les équipes derrière les moteurs JavaScript ont leurs propres idées sur ce qu'il faut d'abord mettre en œuvre. Elles peuvent décider de mettre en œuvre des propositions qui sont en projet et reporter des éléments qui figurent déjà dans les spécifications, car ils sont moins intéressants ou tout simplement plus difficiles à faire.

Il est donc assez courant pour un moteur de ne mettre en œuvre qu'une partie de la norme.

Une bonne page pour voir l’état actuel de la prise en charge des fonctionnalités du langage est <https://kangax.github.io/compat-table/es6/> (c’est énorme, nous avons encore beaucoup à étudier).

As programmers, we'd like to use most recent features. The more good stuff - the better!

<<<<<<< HEAD
Lorsque nous utilisons des fonctionnalités modernes du langage, certains moteurs peuvent ne pas supporter un tel code. Comme indiqué, toutes les fonctionnalités ne sont pas implémentées partout.

C'est là que Babel vient à la rescousse.

[Babel](https://babeljs.io) est un [transpileur](https://fr.wikipedia.org/wiki/Compilateur_source_%C3%A0_source). Il réécrit le code JavaScript moderne dans le standard précédent.

Actuellement, Babel comporte deux parties :

1. Tout d’abord, le programme transpileur, qui réécrit le code. Le développeur l'exécute sur son propre ordinateur. Il réécrit le code dans l'ancien standard. Et ensuite, le code est transmis au site Web pour les utilisateurs. Des systèmes de construction de projet moderne comme [webpack](http://webpack.github.io/) qui permet de fournir des moyens d’exécuter automatiquement un transpileur à chaque changement de code, de sorte que cela devient très facile à intégrer dans le processus de développement.

2. Ensuite, le polyfill.

  Les nouvelles fonctionnalités du langage peuvent inclure de nouvelles fonctions intégrées et de nouvelles constructions de syntaxe. 
  Le transpiler réécrit le code en transformant les nouvelles constructions de syntaxe en anciennes. Mais en ce qui concerne les nouvelles fonctions intégrées, nous devons les implémenter. JavaScript est un langage très dynamique, les scripts peuvent ajouter / modifier n’importe quelle fonction, afin qu’ils se comportent conformément au standard moderne.

  Un script qui met à jour / ajoute de nouvelles fonctions s'appelle "polyfill". Il "comble" le vide et ajoute les implémentations manquantes.

Deux polyfill intéressants sont :
    - [core js](https://github.com/zloirock/core-js) qui prend beaucoup en charge, permet d’inclure uniquement les fonctionnalités nécessaires.
    - [polyfill.io](http://polyfill.io) service qui fournit un script avec des polyfill, en fonction des fonctionnalités et du navigateur de l'utilisateur.

Nous devons donc configurer le transpileur et ajouter le polyfill pour les anciens moteurs afin de prendre en charge les fonctionnalités modernes.

Donc, si nous allons utiliser les fonctionnalités du langage moderne, un transpiler et un polyfill sont nécessaires.

## Exemples dans le tutoriel
=======
From the other hand, how to make out modern code work on older engines that don't understand recent features yet?

There are two tools for that:

1. Transpilers.
2. Polyfills.

Here, in this chapter, our purpose is to get the gist of how they work, and their place in web development.

## Transpilers

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that can parse ("read and understand") modern code, and rewrite it using older syntax constructs, so that the result would be the same.

E.g. JavaScript before year 2020 didn't have the "nullish coalescing operator" `??`. So, if a visitor uses an outdated browser, it may fail to understand the code like `height = height ?? 100`.

A transpiler would analyze our code and rewrite `height ?? 100` into `(height !== undefined && height !== null) ? height : 100`.

```js
// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Now the rewritten code is suitable for older JavaScript engines.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.

<<<<<<< HEAD
````online
La plupart des exemples sont exécutables sur place, comme ceci :
=======
Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there. 
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process.

## Polyfills

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23) = 1`.

<<<<<<< HEAD
Les exemples qui utilisent le JS moderne ne fonctionneront que si votre navigateur le prend en charge.
````

```offline
Pendant que vous lisez la version hors connexion, les exemples ne sont pas exécutables. Dans EPUB, certains peuvent fonctionner.
```

Google Chrome est généralement la version la plus récente des fonctionnalités du langage, il accepte de lancer des démos ultra-sophistiquées sans transpilers, mais les autres navigateurs modernes fonctionnent également très bien.

=======
In some (very outdated) JavaScript engines, there's no `Math.trunc`, so such code will fail.

As we're talking about new functions, not syntax changes, there's no need to transpile anything here. We just need to declare the missing function.

A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

For this particular case, the polyfill for `Math.trunc` is a script that implements it, like this:

```js
if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript is a highly dynamic language, scripts may add/modify any functions, even including built-in ones. 

Two interesting libraries of polyfills are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.


## Summary

In this chapter we'd like to motivate you to study modern and even "bleeding-edge" language features, even if they aren't yet well-supported by JavaScript engines.

Just don't forget to use transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). And they'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](http://webpack.github.io/) with [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://kangax.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

