# Test automatisé avec mocha

<<<<<<< HEAD
Les tests automatisés seront utilisés dans d'autres tâches.

Cela fait partie du "minimum éducatif" d’un développeur.
=======
Automated testing will be used in further tasks, and it's also widely used in real projects.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## Pourquoi avons-nous besoin de tests ?

Lorsque nous écrivons une fonction, nous pouvons généralement imaginer ce qu’elle doit faire : quels paramètres donnent quels résultats.

Au cours du développement, nous pouvons vérifier la fonction en l'exécutant et en comparant le résultat obtenu. Par exemple, nous pouvons le faire dans la console.

Si quelque chose ne va pas -- alors nous corrigeons le code, exécutons à nouveau, vérifions le résultat -- et ainsi de suite jusqu'à ce que cela fonctionne.

Mais de telles "ré-exécutions" manuelles sont imparfaites.

**Lors du test manuel d’un code, il est facile de rater quelque chose.**

Par exemple, nous créons une fonction `f`. On écrit du code, on teste : `f(1)` fonctionne, mais `f(2)` ne fonctionne pas. Nous corrigeons le code et maintenant `f(2)` fonctionne. Cela semble complet ? Mais nous avons oublié de re-tester `f(1).` Cela peut conduire à une erreur.

C’est très typique. Lorsque nous développons quelque chose, nous gardons à l’esprit beaucoup de cas d’utilisation possibles. Mais il est difficile de s’attendre à ce qu’un programmeur les vérifie manuellement après chaque modification. Il devient donc facile de réparer une chose et d'en casser une autre.

<<<<<<< HEAD
**Le test automatisé signifie que les tests sont écrits séparément, en plus du code. Ils peuvent être exécutés facilement et vérifier tous les principaux cas d'utilisation.**
=======
**Automated testing means that tests are written separately, in addition to the code. They can be executed automatically and check all the main use cases.**
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## Behavior Driven Development (BDD)

Utilisons une technique nommée [Behavior Driven Development](https://fr.wikipedia.org/wiki/Behavior-driven_development) ou, en bref, BDD. Cette approche est utilisée parmi de nombreux projets. BDD ne se limite pas aux tests. C’est bien plus.

**BDD, c'est trois choses en une : les tests ET la documentation ET les exemples.**

<<<<<<< HEAD
Assez de mots. Voyons un exemple.
=======
Let's see the example.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## Développement de "pow": la spec

Imaginons que nous voulions créer une fonction `pow(x, n)` qui élève `x` à la puissance d'un entier `n`. Nous supposons que `n≥0`.

Cette tâche n’est qu’un exemple : il existe l’opérateur `**` en JavaScript qui peut le faire, mais nous nous concentrons ici sur le flux de développement pouvant également s’appliquer à des tâches plus complexes.

Avant de créer le code de `pow`, nous pouvons imaginer ce que la fonction devrait faire et la décrire.

Cette description s'appelle une *spécification* ou, en bref, une **spec**. Elle ressemble à ceci :

```js
describe("pow", function() {

  it("raises to n-th power", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

Une spécification a trois blocs de construction principaux que vous pouvez voir ci-dessus :

`describe("title", function() { ... })`
: Quelle fonctionnalité nous décrivons. Utilisations pour grouper les "workers" - le bloc `it`. Dans notre cas, nous décrivons la fonction `pow`.

<<<<<<< HEAD
`it("title", function() { ... })`
: Dans le titre de `it`, nous décrivons d'une *manière lisible par l'homme* le cas particulier d'utilisation, et le deuxième argument est une fonction qui le teste.
=======
`it("use case description", function() { ... })`
: In the title of `it` we *in a human-readable way* describe the particular use case, and the second argument is a function that tests it.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

`assert.equal(value1, value2)`
: Le code à l'intérieur du bloc `it`, si l'implémentation est correcte, doit s'exécuter sans erreur.

    Les fonctions `assert.*` sont utilisées pour vérifier si `pow` fonctionne comme prévu. Ici, nous utilisons l’un d’eux - `assert.equal`, qui compare les arguments et génère une erreur s’ils ne sont pas égaux. Ici, il vérifie que le résultat de `pow(2, 3)` est égal à `8`.

    Nous verrons plus loin d'autres types de comparaisons et de contrôles.

## Le flux de développement

Le flux de développement ressemble généralement à ceci :

<<<<<<< HEAD
1. Une spécification initiale est écrite, avec des tests pour les fonctionnalités les plus élémentaires.
2. Une implémentation initiale est créée.
3. Pour vérifier si cela fonctionne, nous exécutons le framework de test [Mocha](http://mochajs.org/) (plus de détails bientôt) qui exécute la spécification. Les erreurs sont affichées. Nous apportons des corrections jusqu'à ce que tout fonctionne.
4. Nous avons maintenant une implémentation initiale de travail avec des tests.
5. Nous ajoutons d'autres cas d'utilisation à la spécification, probablement pas encore pris en charge par les implémentations. Les tests commencent à échouer.
6. Passez à l'étape 3, mettez à jour l'implémentation jusqu'à ce que les tests ne génèrent aucune erreur.
7. Répétez les étapes 3 à 6 jusqu'à ce que la fonctionnalité soit prête.
=======
1. An initial spec is written, with tests for the most basic functionality.
2. An initial implementation is created.
3. To check whether it works, we run the testing framework [Mocha](http://mochajs.org/) (more details soon) that runs the spec. While the functionality is not complete, errors are displayed. We make corrections until everything works.
4. Now we have a working initial implementation with tests.
5. We add more use cases to the spec, probably not yet supported by the implementations. Tests start to fail.
6. Go to 3, update the implementation till tests give no errors.
7. Repeat steps 3-6 till the functionality is ready.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Donc, le développement est itératif. Nous écrivons la spécification, la mettons en œuvre, nous nous assurons que les tests réussissent, puis rédigeons d'autres tests, nous nous assurons qu'ils fonctionnent, etc. À la fin, nous avons une implémentation qui fonctionne et des tests.

<<<<<<< HEAD
Dans notre cas, la première étape est terminée : nous avons une spécification initiale pour `pow`. Faisons donc une implémentation. Mais avant cela, faisons une analyse "zéro" de la spécification, juste pour voir que les tests fonctionnent (ils échoueront tous).
=======
Let's see this development flow in our practical case.

The first step is complete: we have an initial spec for `pow`. Now, before making the implementaton, let's use few JavaScript libraries to run the tests, just to see that they are working (they will all fail).
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## La spec en action

Dans ce tutoriel, nous utiliserons les bibliothèques JavaScript suivantes pour les tests :

- [Mocha](http://mochajs.org/) -- le framework central : il fournit des fonctions de test communes, y compris `describe`, et `it` ainsi que la fonction principale qui exécute les tests.
- [Chai](http://chaijs.com) -- la bibliothèque avec de nombreuses affirmations. Elle permet d’utiliser beaucoup d’affirmations différentes, pour le moment nous n’avons besoin que de `assert.equal`.
- [Sinon](http://sinonjs.org/) -- une bibliothèque pour espionner des fonctions, émuler des fonctions intégrées et plus encore, nous en aurons besoin beaucoup plus tard.

Ces bibliothèques conviennent aux tests sur le navigateur et sur le serveur. Ici, nous allons considérer la variante du navigateur.

La page HTML complète avec ces frameworks et `pow` spec :

```html src="index.html"
```

La page peut être divisée en quatre parties :

1. Le `<head>` -- ajouter des bibliothèques et des styles tiers pour les tests.
2. Le `<script>` avec la fonction à tester, dans notre cas - avec le code pour `pow`.
3. Les tests - dans notre cas, un script externe `test.js` qui a `describe("pow", ...)` d'en haut.
4. L'élément HTML `<div id="mocha">` sera utilisé par Mocha pour afficher les résultats.
5. Les tests sont lancés par la commande `mocha.run()`.

Le résultat :

[iframe height=250 src="pow-1" border=1 edit]

À partir de là, le test échoue, il y a une erreur. C’est logique: nous avons un code de fonction vide dans `pow`, donc `pow(2,3)` renvoie `undefined` au lieu de `8`.

<<<<<<< HEAD
Pour l’avenir, notons qu’il existe des testeurs avancés, tels que [karma](https://karma-runner.github.io/) et d'autres. Par conséquent, la configuration de nombreux tests n’est généralement pas un problème.
=======
For the future, let's note that there are more high-level test-runners, like [karma](https://karma-runner.github.io/) and others, that make it easy to autorun many different tests.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## Implementation initiale

Faisons une simple implémentation de `pow`, pour que les tests réussissent :

```js
function pow(x, n) {
  return 8; // :) we cheat!
}
```

Wow, maintenant ça marche !

[iframe height=250 src="pow-min" border=1 edit]

## Améliorer les spécifications

Ce que nous avons fait est définitivement une triche. La fonction ne fonctionne pas: une tentative de calcul de `pow(3,4)` donnerait un résultat incorrect, mais les tests réussissent.

… Mais la situation est assez typique, cela se produit dans la pratique. Les tests réussissent, mais la fonction ne fonctionne pas correctement. Notre spec est imparfaite. Nous devons ajouter d'autres cas d'utilisation.

<<<<<<< HEAD
Ajoutons encore un test pour voir si `pow(3, 4) = 81`.
=======
Let's add one more test to check that `pow(3, 4) = 81`.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Nous pouvons sélectionner l'une des deux manières d'organiser le test ici :

1. La première variante - ajoute une autre `assert` dans le même `it` :

    ```js
    describe("pow", function() {

      it("raises to n-th power", function() {
        assert.equal(pow(2, 3), 8);
    *!*
        assert.equal(pow(3, 4), 81);
    */!*
      });

    });
    ```
2. La seconde -- faire deux tests :

    ```js
    describe("pow", function() {

      it("2 raised to power 3 is 8", function() {
        assert.equal(pow(2, 3), 8);
      });

      it("3 raised to power 3 is 27", function() {
        assert.equal(pow(3, 3), 27);
      });

    });
    ```

La principale différence est que, lorsque `assert` déclenche une erreur, le bloc `it` se termine immédiatement. Ainsi, dans la première variante, si le premier `assert` échoue, nous ne verrons jamais le résultat du deuxième `assert`.

Faire des tests séparés est utile pour obtenir plus d’informations sur ce qui se passe, la deuxième variante est donc meilleure.

Cela dit, il y a encore une règle à suivre.

**Un test vérifie une chose.**

Si nous examinons le test et y voyons deux contrôles indépendants, il est préférable de le scinder en deux plus simples.

Continuons donc avec la deuxième variante.

Le résultat :

[iframe height=250 src="pow-2" edit border="1"]

Comme on pouvait s'y attendre, le deuxième test a échoué. Bien sûr, notre fonction retourne toujours `8`, alors que l'`assert` en attend `27`.

## Améliorer l'implémentation

Écrivons quelque chose de plus réel pour que les tests réussissent :

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Pour être sûr que la fonction fonctionne bien, testons-la pour plus de valeurs. Au lieu d’écrire manuellement les blocs, nous pouvons les générer dans `for` :

```js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} in the power 3 is ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

Le résultat :

[iframe height=250 src="pow-3" edit border="1"]

## Description imbriquée

Nous allons ajouter encore plus de tests. Mais avant cela, notons que la fonction helper `makeTest` et `for` doivent être regroupées. Nous n’aurons pas besoin de faire `makeTest` dans d’autres tests, c’est nécessaire seulement pour `for` : leur tâche commune est de vérifier dans quelle mesure `pow` augmente dans la puissance donnée.

Le regroupement est fait avec un `describe` imbriqué :

```js
describe("pow", function() {

*!*
  describe("raises x to power 3", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... plus de tests à suivre ici, les deux describe et it peuvent être ajoutés
});
```

La description imbriquée définit un nouveau "sous-groupe" de tests. Dans la sortie, nous pouvons voir l'indentation intitulée :

[iframe height=250 src="pow-4" edit border="1"]

À l’avenir, nous pourrons ajouter plus d'`it` et `describe` au niveau supérieur avec leurs propres fonctions helper, ils ne verront pas `makeTest`.

````smart header="`before/after` et `beforeEach/afterEach`"
Nous pouvons configurer les fonctions `before/after` qui s'exécutent avant/après l'exécution des tests, ainsi que les fonctions `beforeEach/afterEach` qui s'exécutent avant/après chaque `it`.

Par exemple :

```js no-beautify
describe("test", function() {

  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));

  beforeEach(() => alert("Before a test – enter a test"));
  afterEach(() => alert("After a test – exit a test"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
```

La séquence en cours sera :

```
Test commencé - avant tous les tests (avant)
Avant un test - entrer un test (beforeEach)
1
Après un test - quitter un test (afterEach)
Avant un test - entrer un test (beforeEach)
2
Après un test - quitter un test (afterEach)
Test terminé - après tous les tests (after)
```

[edit src="beforeafter" title="Ouvrez l'exemple dans la sandbox."]

<<<<<<< HEAD
Habituellement, `beforeEach/afterEach` (`before/each`) sont utilisés pour effectuer l'initialisation, remettre les compteurs à zéro ou faire autre chose entre les tests (ou groupes de tests).
=======
Usually, `beforeEach/afterEach` and `before/after` are used to perform initialization, zero out counters or do something else between the tests (or test groups).
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
````

## Étendre les spécifications

La fonctionnalité de base de `pow` est complète. La première itération du développement est terminée. Quand nous aurons fini de célébrer et de boire du champagne, continuons et améliorons-le.

Comme il a été dit, la fonction `pow(x, n)` est censée fonctionner avec des valeurs entières positives `n`.

Pour indiquer une erreur mathématique, les fonctions JavaScript renvoient généralement `NaN`. Faisons de même pour les valeurs invalides de `n`.

Ajoutons d’abord le comportement à la spec(!) :

```js
describe("pow", function() {

  // ...

  it("for negative n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("for non-integer n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, 1.5));    
*/!*
  });

});
```

Le résultat avec de nouveaux tests :

[iframe height=530 src="pow-nan" edit border="1"]

Les tests récemment ajoutés échouent car notre implémentation ne les prend pas en charge. C’est comme cela que BDD est fait : d’abord nous écrivons des tests qui échouent, puis nous réalisons une implémentation pour eux.

```smart header="Autres affirmations"

Veuillez noter l'affirmation `assert.isNaN` : elle vérifie `NaN`.

Il y a aussi d'autres affirmations dans Chai, par exemple :

- `assert.equal(value1, value2)` -- vérifie l'égalité `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- vérifie la stricte égalité `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- contrôles inverses à ceux ci-dessus.
- `assert.isTrue(value)` -- vérifie que `value === true`
- `assert.isFalse(value)` -- vérifie que `value === false`
- … la liste complète est dans la [doc](http://chaijs.com/api/assert/)
```

Donc, nous devrions ajouter quelques lignes à `pow`:

```js
function pow(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Maintenant ça fonctionne, tous les tests réussissent :

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Ouvrez le dernier exemple complet dans la sandbox."]

## Résumé

Dans BDD, la spécification commence, suivie de l'implémentation. À la fin, nous avons à la fois la spécification et le code.

La spécification peut être utilisée de trois manières :

1. **Tests** garantir que le code fonctionne correctement.
2. **Docs** -- les titres de `describe` et `it` indiquent ce que fait la fonction.
3. **Examples** -- les tests sont en fait d'exemples de travail montrant comment une fonction peut être utilisée.

Avec la spécification, nous pouvons sans risque améliorer, modifier, même réécrire la fonction à partir de zéro et nous assurer qu'elle fonctionne toujours correctement.

C’est particulièrement important dans les grands projets quand une fonction est utilisée dans de nombreux endroits. Lorsque nous changeons une telle fonction, il n’ya aucun moyen de vérifier manuellement si chaque endroit qui l’utilise fonctionne toujours correctement.

Sans tests, les gens ont deux moyens :

<<<<<<< HEAD
1. Effectuer le changement, peu importe quoi. Ensuite nos utilisateurs rencontrent des bugs et les signalent. Si nous pouvons nous le permettre.
2. Ou bien les gens ont peur de modifier de telles fonctions si la punition des erreurs est sévère. Ensuite, le code devient vieux, envahi par les toiles d’araignées, personne ne veut y entrer, et ce n’est pas bon.

**Le code automatiquement testé est à l'opposé de cela !**

Si le projet est conduit par des essais, le problème ne se pose pas. Nous pouvons exécuter des tests et voir de nombreuses vérifications effectuées en quelques secondes.
=======
1. To perform the change, no matter what. And then our users meet bugs, as we probably fail to check something manually.
2. Or, if the punishment for errors is harsh, as there are no tests, people become afraid to modify such functions, and then the code becomes outdated, no one wants to get into it. Not good for development.

**Automatic testing helps to avoid these problems!**

If the project is covered with tests, there's just no such problem. After any changes, we can run tests and see a lot of checks made in a matter of seconds.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

**En outre, un code bien testé a une meilleure architecture.**

<<<<<<< HEAD
Naturellement, c’est parce qu’il est plus facile à modifier et améliorer. Mais pas que ça.
=======
Naturally, that's because auto-tested code is easier to modify and improve. But there's also another reason.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Pour écrire des tests, le code doit être organisé de manière à ce que chaque fonction ait une tâche clairement décrite, des entrées et des sorties bien définies. Cela signifie une bonne architecture dès le début.

Dans la vraie vie, ce n’est parfois pas si facile. Parfois, il est difficile d’écrire une spécification avant le code réel, parce que son comportement n’est pas encore clair. Mais en général, les tests d’écriture rendent le développement plus rapide et plus stable.

<<<<<<< HEAD
## Et maintenant ?

Plus tard dans le tutoriel, vous rencontrerez de nombreuses tâches avec des tests. Vous verrez donc des exemples plus pratiques.
=======
Later in the tutorial you will meet many tasks with tests baked-in. So you'll see more practical examples.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

La rédaction de tests nécessite une bonne connaissance de JavaScript. Mais nous commençons tout juste à l’apprendre. Donc, pour l'instant vous n’êtes pas obligé d’écrire des tests, mais vous devriez déjà pouvoir les lire, même s’ils sont un peu plus complexes que dans ce chapitre.
