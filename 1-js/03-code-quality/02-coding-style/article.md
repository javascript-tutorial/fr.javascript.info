# Style de codage

Notre code doit être aussi propre et lisible que possible.

<<<<<<< HEAD
C’est en fait un art de la programmation -- prendre une tâche complexe et la coder de manière correcte et lisible par l’homme.
=======
That is actually the art of programming -- to take a complex task and code it in a way that is both correct and human-readable. A good code style greatly assists in that.  
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Une chose à aider est le bon style de code.

<<<<<<< HEAD
## Syntaxe

Un cheatsheet avec les règles (plus de détails ci-dessous) :
=======
Here is a cheat sheet with some suggested rules (see below for more details):
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

![](code-style.png)
<!--
```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number, greater than 0`);
} else {
  alert( pow(x, n) );
}
```

-->

Discutons maintenant des règles et de leurs raisons en détail.

<<<<<<< HEAD
Rien n'est "gravé dans le marbre" ici. Tout est optionnel et peut être modifié: ce sont des règles de codage, pas des dogmes religieux.
=======
```warn header="There are no \"you must\" rules"
Nothing is set in stone here. These are style preferences, not religious dogmas.
```
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

### Accolades

Dans la plupart des projets JavaScript, les accolades sont écrites sur la même ligne que le mot clé correspondant, et non sur la nouvelle ligne, dans un style dit «égyptien». Il y a aussi un espace avant un crochet d’ouverture.

Comme ceci :

```js
if (condition) {
  // fait ceci
  // ...et cela
  // ...et cela
}
```

<<<<<<< HEAD
Une construction sur une seule ligne est un cas important. Devrions-nous utiliser des crochets ? Si oui, alors où ?
=======
A single-line construct, such as `if (condition) doSomething()`, is an important edge case. Should we use braces at all?
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Voici les variantes annotées pour que vous puissiez juger de leur lisibilité :

<!--
```js no-beautify
if (n < 0) {alert(`Power ${n} is not supported`);}

if (n < 0) alert(`Power ${n} is not supported`);

if (n < 0)
  alert(`Power ${n} is not supported`);

if (n < 0) {
  alert(`Power ${n} is not supported`);
}
```
-->
![](figure-bracket-style.png)

<<<<<<< HEAD
En résumé :
- Pour un code vraiment court, une ligne est acceptable: comme `if (cond) return null`.
- Mais une ligne distincte pour chaque affirmation entre parenthèses est généralement préférable.

### Longueur de la ligne

La longueur maximale de la ligne doit être limitée. Personne n'aime suivre les yeux sur une longue ligne horizontale. C’est mieux de la scinder.
=======
### Line Length

No one likes to read a long horizontal line of code. It's best practice to split them.

For example:
```js
// backtick quotes ` allow to split the string into multiple lines
let str = `
  Ecma International's TC39 is a group of JavaScript developers,
  implementers, academics, and more, collaborating with the community
  to maintain and evolve the definition of JavaScript.
`;
```

And, for `if` statements:

```js
if (
  id === 123 &&
  moonPhase === 'Waning Gibbous' &&
  zodiacSign === 'Libra'
) {
  letTheSorceryBegin();
}
```
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

La longueur de ligne maximale est convenue au niveau de l'équipe. C’est généralement 80 ou 120 caractères.

### Indentations

Il existe deux types d'indentations :

- **Un retrait horizontal : 2(4) espaces.**

    Une indentation horizontale est faite en utilisant 2 ou 4 espaces ou le symbole "Tab". Lequel choisir est une vieille guerre sainte. Les espaces sont plus communs de nos jours.

    Un des avantages des espaces sur les tabulations est qu’elles permettent des configurations de retrait plus flexibles que le symbole "Tabulation".

    Par exemple, nous pouvons aligner les arguments avec le crochet d’ouverture, comme ceci :

    ```js no-beautify
    show(parameters,
         aligned, // 5 espaces à gauche
         one,
         after,
         another
      ) {
      // ...
    }
    ```

- **Un retrait vertical: lignes vides pour fractionner le code en blocs logiques.**

    Même une seule fonction peut souvent être divisée en blocs logiques. Dans l'exemple ci-dessous, l'initialisation des variables, la boucle principale et le retour du résultat sont fractionnés verticalement :

    ```js
    function pow(x, n) {
      let result = 1;
      //              <--
      for (let i = 0; i < n; i++) {
        result *= x;
      }
      //              <--
      return result;
    }
    ```

    Insérez une nouvelle ligne où cela aide à rendre le code plus lisible. Il ne devrait pas y avoir plus de neuf lignes de code sans indentation verticale.

### Un point-virgule

Un point-virgule doit être présent après chaque déclaration. Même si cela pourrait éventuellement être ignoré.

<<<<<<< HEAD
Il y a des langages où le point-virgule est vraiment optionnel. Il est donc rarement utilisé. Mais dans JavaScript, il y a peu de cas où un saut de ligne n'est parfois pas interprété comme un point-virgule. Cela laisse place à des erreurs de programmation.

À mesure que vous devenez plus mature en tant que programmeur, vous pouvez choisir un style sans point-virgule, comme [StandardJS](https://standardjs.com/), mais c’est seulement lorsque vous connaissez bien JavaScript et que vous comprenez les pièges possibles.
=======
There are languages where a semicolon is truly optional and it is rarely used. In JavaScript, though, there are cases where a line break is not interpreted as a semicolon, leaving the code vulnerable to errors. See more about that in the chapter <info:structure#semicolon>.

If you're an experienced JavaScript programmer, you may choose a no-semicolon code style like [StandardJS](https://standardjs.com/). Otherwise, it's best to use semicolons to avoid possible pitfalls. The majority of developers put semicolons.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

### Niveaux d'imbrications

Il ne devrait pas y avoir trop de niveaux d'imbrication.

<<<<<<< HEAD
C’est parfois une bonne idée d’utiliser la directive ["continue"](info:while-for#continue) dans la boucle pour éviter l'imbrication supplémentaire `if(..) { ... }` :
=======
For example, in the loop, it's sometimes a good idea to use the ["continue"](info:while-for#continue) directive to avoid extra nesting.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Au lieu de :

```js
for (let i = 0; i < 10; i++) {
  if (cond) {
    ... // <- un autre niveau d'imbrication
  }
}
```

Nous pouvons écrire :

```js
for (let i = 0; i < 10; i++) {
  if (!cond) *!*continue*/!*;
  ...  // <- pas de niveau d'imbrication supplémentaire
}
```

Une chose similaire peut être faite avec `if/else` et `return`.

Par exemple, les deux constructions ci-dessous sont identiques.

Le premier :

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
  } else {
    let result = 1;

    for (let i = 0; i < n; i++) {
      result *= x;
    }

    return result;
  }  
}
```

Et ceci :

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
    return;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

<<<<<<< HEAD
… Mais le second est plus lisible, car le "cas marginal" de `n < 0` est traité tôt, et nous avons ensuite le flux de code "principal", sans imbrication supplémentaire.
=======
The second one is more readable because the "special case" of `n < 0` is handled early on. Once the check is done we can move on to the "main" code flow without the need for additional nesting.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## Placement de Fonction

Si vous écrivez plusieurs fonctions "helper" (auxiliaires) et le code pour les utiliser, il existe trois façons de les placer.

<<<<<<< HEAD
1. Fonctions au dessus du code qui les utilise :
=======
1. Declare the functions *above* the code that uses them:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

    ```js
    // *!*fonctions declarations*/!*
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }

    // *!*le code qui les utilise*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();
    ```
2. Le code d'abord, puis les fonctions

    ```js
    // *!*le code qui utilise les fonctions*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();

    // --- *!*fonctions helper*/!* ---

    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }
    ```
3. Mixte : une fonction est décrite là où elle a été utilisée pour la première fois.

La plupart du temps, la deuxième variante est préférée.

<<<<<<< HEAD
C’est parce qu’en lisant un code, nous voulons d’abord savoir "ce qu’il fait". Si le code commence en premier, alors il fournit cette information. Et puis peut-être n’aurons-nous pas besoin de lire les fonctions du tout, surtout si leur nom correspond à ce qu’elles font.
=======
That's because when reading code, we first want to know *what it does*. If the code goes first, then it becomes clear from the start. Then, maybe we won't need to read the functions at all, especially if their names are descriptive of what they actually do.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## Guides de style

Un guide de style contient des règles générales sur "comment écrire": les quotes à utiliser, le nombre d'espaces à mettre en retrait, l'emplacement des sauts de ligne, etc. Beaucoup de petites choses.

Au total, lorsque tous les membres d'une équipe utilisent le même guide de style, le code est uniforme. Peu importe qui l’a écrit, c’est toujours le même style.

<<<<<<< HEAD
Certes, une équipe peut réfléchir à un guide de style. Mais dorénavant, il n’est plus nécessaire de le faire. Il existe de nombreux guides de style éprouvés et faciles à adopter.
=======
Of course, a team can always write their own style guide, but usually there's no need to. There are many existing guides to choose from.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Par exemple :

- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
- (il y en a plus)

<<<<<<< HEAD
Si vous êtes un développeur novice, vous pouvez commencer par le cheatsheet ci-dessus dans le chapitre, puis consulter les guides de style pour découvrir les principes communs et éventuellement en choisir un.
=======
If you're a novice developer, start with the cheat sheet at the beginning of this chapter. Then you can browse other style guides to pick up more ideas and decide which one you like best.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## Linters automatisés

<<<<<<< HEAD
Il existe des outils permettant de vérifier le style de code automatiquement. Ils s'appellent des "linters".

Ce qui est génial avec eux, c'est que la vérification du style trouve également des bugs, comme une faute de frappe dans une variable ou un nom de fonction.

Il est donc recommandé d’en installer un, même si vous ne voulez pas vous en tenir à un «style de code». Ils aident à trouver des fautes de frappe - et cela suffit déjà.
=======
Linters are tools that can automatically check the style of your code and make improving suggestions.

The great thing about them is that style-checking can also find some bugs, like typos in variable or function names. Because of this feature, using a linter is recommended even if you don't want to stick to one particular "code style".

Here are some well-known linting tools:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Les outils les plus connus sont :

- [JSLint](http://www.jslint.com/) -- l'un des premiers linters.
- [JSHint](http://www.jshint.com/) -- plus de paramètres que JSLint.
- [ESLint](http://eslint.org/) -- probablement le plus récent.

Tous peuvent faire le travail. L'auteur utilise [ESLint](http://eslint.org/).

La plupart des linters sont intégrés aux éditeurs: il suffit d'activer le plug-in dans l'éditeur et de configurer le style.

Par exemple, pour ESLint, vous devez procéder comme suit :

1. Installer [Node.js](https://nodejs.org/).
2. Installer ESLint avec la commande `npm install -g eslint` (npm est un gestionnaire de paquets JavaScript).
3. Créez un fichier de configuration nommé `.eslintrc` dans la racine de votre projet JavaScript (dans le dossier contenant tous vos fichiers).
4. Installez / activez le plug-in pour votre éditeur qui s'intègre à ESLint. La majorité des éditeurs en ont un.

Voici un exemple de `.eslintrc`:

```js
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,
    "indent": ["warning", 2]
  }
}
```

Ici, la directive `"extends"` indique que nous nous basons sur l'ensemble de paramètres "eslint:recommended", puis nous spécifions les nôtres.

Il est aussi possible de télécharger des ensembles de règles de style à partir du Web et de les étendre. Voir <http://eslint.org/docs/user-guide/getting-started> pour plus de détails sur l'installation.

L'utilisation d'un linter a un effet secondaire formidable: les linters prennent les fautes de frappe. Par exemple, quand on accède à une variable non définie, un linter la détecte et (s'il est intégrée à un éditeur) la met en évidence. Dans la plupart des cas, il s’agit d’un mauvais type. Nous pouvons donc régler le problème tout de suite.

Pour cette raison, même si vous n’êtes pas préoccupé par les styles, il est vivement recommandé d’utiliser un linter.

De plus, certains IDE prennent en charge le linting nativement, ce qui peut également être bien, mais pas aussi ajustables que ESLint.

## Résumé

<<<<<<< HEAD
Toutes les règles de syntaxe de ce chapitre et les guides de style visent à améliorer la lisibilité, elles sont donc toutes discutables.

Lorsque nous réfléchissons à "comment écrire mieux ?", Le seul critère est "qu'est-ce qui rend le code plus lisible et plus facile à comprendre ? qu'est-ce qui aide à éviter les erreurs ?". C’est l’essentiel à garder à l’esprit lors du choix du style ou de la question de savoir lequel est le meilleur.
=======
All syntax rules described in this chapter (and in the style guides referenced) aim to increase the readability of your code. All of them are debatable.

When we think about writing "better" code, the questions we should ask ourselves are: "What makes the code more readable and easier to understand?" and "What can help us avoid errors?" These are the main things to keep in mind when choosing and debating code styles.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Lisez les guides de style pour connaître les dernières idées à ce sujet et suivez celles que vous trouvez les meilleures.
