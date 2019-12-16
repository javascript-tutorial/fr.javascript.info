
# Closure

JavaScript est un langage très fonctionnel. Cela nous donne beaucoup de liberté. Une fonction peut être créée dynamiquement, copiée dans une autre variable ou transmise en tant qu'argument à une autre fonction et appelée ultérieurement à partir d'un endroit totalement différent.

Nous savons qu'une fonction peut accéder aux variables en dehors de celle-ci, cette fonctionnalité est utilisée assez souvent.

Mais que se passe-t-il quand une variable externe change ? Une fonction obtient-elle la valeur la plus récente ou celle qui existait lors de la création de la fonction ?

De plus, que se passe-t-il lorsqu'une fonction se déplace à un autre endroit du code et est appelée à partir de là - a-t-elle accès aux variables externes du nouvel endroit ?

Les différents langages se comportent différemment ici, dans ce chapitre, nous traitons du comportement de JavaScript en particulier.

## Quelques questions

Examinons d’abord deux situations, puis étudions la mécanique interne pièce par pièce pour pouvoir répondre aux questions suivantes et à des questions plus complexes à venir.

1. La fonction `sayHi` utilise une variable externe `name`. Lorsque la fonction est exécutée, quelle valeur va-t-elle utiliser ?

    ```js
    let name = "John";

    function sayHi() {
      alert("Hi, " + name);
    }

    name = "Pete";

    *!*
    sayHi(); // qu'est-ce que ça va afficher : "John" ou "Pete" ?
    */!*
    ```

    De telles situations sont courantes dans les développements côté navigateur et côté serveur. Une fonction peut être planifiée pour s'exécuter plus tard que sa création, par exemple après une action de l'utilisateur ou une requête du réseau.

    Donc, la question est : est-ce que cela prend en compte les dernières modifications ?


2. La fonction `makeWorker` crée une autre fonction et la renvoie. Cette nouvelle fonction peut être appelée ailleurs. Aura-t-elle accès aux variables externes à partir de son lieu de création, ou du lieu d'invocation, ou des deux ?

    ```js
    function makeWorker() {
      let name = "Pete";

      return function() {
        alert(name);
      };
    }

    let name = "John";

    // create a function
    let work = makeWorker();

    // appel
    *!*
    work(); // qu'est-ce que ça va afficher ? "Pete" (nom où elle a été créé) ou "John" (nom où elle a été appelée) ?
    */!*
    ```


## Environnement Lexical

Pour comprendre ce qui se passe, voyons d’abord ce qu’est une "variable".

En JavaScript, chaque fonction en cours d'exécution, le bloc de code `{...}` et le script dans son ensemble ont un objet associé interne (masqué) appelé *Environnement Lexical*.

L'objet Environnement Lexical comprend deux parties :

1. *Environnement Record (Enregistrement d'Environnement)* -- un objet qui stocke toutes les variables locales en tant que propriétés (et d'autres informations telles que la valeur de `this`).
2. Une référence à *l'environnement lexical externe*, celui associé au code externe.

**Une "variable" est simplement une propriété de l'objet interne spécial `Environment Record`. "obtenir ou modifier une variable" signifie "obtenir ou modifier une propriété de cet objet".**

Par exemple, dans ce code simple, il n’existe qu’un seul Environnement Lexical :

![lexical environment](lexical-environment-global.svg)

Appelé aussi Environnement Lexical global, il est associé à l'ensemble du script.

Sur l'image ci-dessus, le rectangle correspond à l'enregistrement de l'environnement (magasin de variables) et la flèche à la référence externe. L'environnement lexical global n'a pas de référence externe, il pointe donc sur `null`.

Et c'est comme ça que ça change quand une variable est définie et assignée :

![lexical environment](lexical-environment-global-2.svg)

Les rectangles de droite nous montrent comment l'environnement lexical global change au cours de l'exécution :

1. Lorsque le script démarre, l'environnement lexical est vide.
2. La déclaration de `let phrase` apparaît. Aucune valeur n’a été affectée, donc `undefined` est stocké.
3. Une valeur est assignée à `phrase`.
4. `phrase` change de valeur.

Tout a l'air simple pour l'instant, non ?

Pour résumer :

- Une variable est une propriété d'un objet interne spécial, associée au bloc / fonction / script en cours d'exécution.
- Travailler avec des variables, c'est travailler avec les propriétés de cet objet.

### Fonction Declaration

Jusqu'à présent, nous n'avons observé que des variables. Maintenant, entrons dans les Fonctions Declaration.

**Contrairement aux variables `let`, elles sont entièrement initialisées non pas lorsque l'exécution les atteint, mais plus tôt, lorsqu'un environnement lexical est créé.**

Pour les fonctions de niveau supérieur, cela signifie le moment où le script est lancé.

C'est pourquoi nous pouvons appeler une fonction déclaration avant qu'elle ne soit définie.

Le code ci-dessous montre que l'environnement lexical n'est pas vide depuis le début. Il a `say`, parce que c'est une fonction déclaration. Et plus tard, il obtient `phrase`, déclaré avec` let` :

![lexical environment](lexical-environment-global-3.svg)


### Environnement lexical intérieur et extérieur

Voyons maintenant ce qu’il se passe quand une fonction accède à une variable externe.

Pendant l'appel, `say()` utilise la variable externe `phrase`. Regardons les détails de ce qui se passe.

Lorsqu'une fonction est exécutée, un nouvel environnement lexical est créé automatiquement pour stocker les variables locales et les paramètres de l'appel.

Par exemple, pour `say("John")`, cela ressemble à ceci (l'exécution est à la ligne, marquée d'une flèche) :

<!--
    ```js
    let phrase = "Hello";

    function say(name) {
     alert( `${phrase}, ${name}` );
    }

    say("John"); // Hello, John
    ```-->

![lexical environment](lexical-environment-simple.svg)

Ainsi, pendant l'appel de la fonction, nous avons deux environnements lexicaux : l'environnement interne (pour l'appel de fonction) et l'environnement externe (global) :

- L'environnement lexical interne correspond à l'exécution en cours de `say`.

    Il a une propriété unique: `name`, l'argument de la fonction. Nous avons appelé `say("John")`, donc la valeur de `name` est `John`.
- L'environnement lexical externe est l'environnement lexical global.

    Il a la variable `phrase` et la fonction elle-même.

L'environnement lexical interne a une référence à l'environnement "externe".

**Lorsque le code veut accéder à une variable -- l'environnement lexical interne est recherché en premier, puis l'environnement externe, puis l'environnement externe et ainsi de suite jusqu'à l'environnement global.**

Si une variable n’est trouvée nulle part, c’est une erreur en mode strict. Sans `use strict`, une assignation à une variable inexistante, comme `user = "John"` crée une nouvelle variable globale `user`. C’est pour des soucis de compatibilité.

Voyons comment se déroule la recherche dans notre exemple :

- Lorsque le `alert` à l'intérieur de `say` veut accéder à `name`, il le trouve immédiatement dans l'environnement lexical de la fonction.
- Lorsqu'il souhaite accéder à `phrase`, il n'y a pas de `phrase` localement, il suit donc la référence à l'environnement lexical englobant et la trouve à cet emplacement.

![lexical environment lookup](lexical-environment-simple-lookup.svg)

Nous pouvons maintenant répondre à la première question du début de ce chapitre.

**Une fonction récupère les variables externes telles qu'elles sont maintenant, elle utilise les valeurs les plus récentes**

Les anciennes valeurs de variables ne sont enregistrées nulle part. Lorsqu'une fonction souhaite une variable, elle prend la valeur actuelle de son propre environnement lexical ou de l'environnement externe.

Donc, la réponse à la première question est `Pete` :

```js run
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete"; // (*)

*!*
sayHi(); // Pete
*/!*
```


Le flux d'exécution du code ci-dessus :

1. L’environnement lexical global a `name: "John"`.
2. A la ligne `(*)` la variable globale est changé. Maintenant elle a `name: "Pete"`.
3. Lorsque la fonction `sayHi()` est exécutée elle prend `name` de l'extérieur, l’environnement lexical global, où sa valeur est déjà `"Pete"`.


```smart header="Un appel -- un environnement lexical"
Veuillez noter qu'un nouvel Environnement Lexical de fonction est créée à chaque exécution d'une fonction.

Et si une fonction est appelée plusieurs fois, chaque appel aura son propre environnement lexical, avec des variables locales et des paramètres spécifiques à cette exécution.
```

```smart header="L'environnement lexical est un objet de spécification"
"L'Environnement Lexical" est un objet de spécification : il n'existe que "théoriquement" dans le [language specification](https://tc39.es/ecma262/#sec-lexical-environments) pour décrire comment fonctionnent les choses. Nous ne pouvons pas obtenir cet objet dans notre code et le manipuler directement. Les moteurs JavaScript peuvent également l'optimiser, ignorer les variables non utilisées pour économiser de la mémoire et effectuer d'autres astuces internes, tant que le comportement visible reste tel que décrit.
```


## Fonctions imbriquées

Une fonction est appelée "imbriquée" lorsqu'elle est créée dans une autre fonction.

Il est facilement possible de faire cela avec JavaScript.

Nous pouvons l'utiliser pour organiser notre code, comme ceci :

```js
function sayHiBye(firstName, lastName) {

  // helper nested function to use below
  function getFullName() {
    return firstName + " " + lastName;
  }

  alert( "Hello, " + getFullName() );
  alert( "Bye, " + getFullName() );

}
```

Ici, la fonction *imbriquée* `getFullName()` est faite pour plus de commodité. Elle peut accéder aux variables externes et peut donc renvoyer le nom complet. Les fonctions imbriquées sont assez courantes dans JavaScript.

Plus intéressant encore, une fonction imbriquée peut être renvoyée : soit en tant que propriété d’un nouvel objet (si la fonction externe crée un objet avec des méthodes), soit en tant que résultat seul. Elle peut ensuite être utilisée ailleurs. Peu importe où, elle a toujours accès aux mêmes variables externes.

Par exemple, ici la fonction imbriquée est assignée au nouvel objet par le [constructeur de fonction](info:constructor-new):

```js run
// le constructeur de fonction retourne un nouvel objet
function User(name) {

  // la méthode de l'objet est créée en tant que fonction imbriquée
  this.sayHi = function() {
    alert(name);
  };
}

let user = new User("John");
user.sayHi(); // le code de la méthode "sayHi" a accès au "name" extérieur
```

Et ici, nous venons de créer et de renvoyer une fonction "counting" :

```js run
function makeCounter() {
  let count = 0;

  return function() {
    return count++; // a accès au "count" extérieur
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```

Continuons avec l'exemple `makeCounter`. Il crée la fonction "count" qui renvoie le nombre suivant à chaque appel. Bien qu’elles soient simples, des variantes légèrement modifiées de ce code ont des utilisations pratiques, par exemple  en tant que [pseudorandom number generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator), et plus.

Comment fonctionne le compteur en interne ?

Lorsque la fonction interne est exécutée, la variable dans `count ++` est recherchée de l'intérieur. Pour l'exemple ci-dessus, l'ordre sera :

![](lexical-search-order.svg)

1. Les locaux de la fonction imbriquée …
2. Les variables de la fonction externe …
3. Et ainsi de suite jusqu'à atteindre les variables globales.

Dans cet exemple, `count` se trouve à l'étape `2`. Lorsqu'une variable externe est modifiée, elle est modifiée à l'endroit où elle est trouvée. Donc `count ++` trouve la variable externe et l'augmente dans l'environnement lexical auquel elle appartient. Comme si nous avions `let count = 1`.

Voici deux questions à considérer :

1. Pouvons-nous en quelque sorte réinitialiser le compteur `count` à partir du code qui n'appartient pas à `makeCounter` ? Par exemple. après les appels `alert` dans l'exemple ci-dessus.
2. Si nous appelons `makeCounter()` plusieurs fois, cela retourne de nombreuses fonctions `counter`. Sont-ils indépendants ou partagent-ils le même `count` ?

Essayez d'y répondre avant de continuer à lire.

...

Terminé ?

Ok, passons en revue les réponses.

1. Il n'y a aucun moyen : `count` est une variable de fonction locale, nous ne pouvons y accéder de l'extérieur.
2. Pour chaque appel à `makeCounter()`, un nouveau Environnement Lexical de fonction est créé, avec son propre `count`. Les fonctions `counter` résultantes sont donc indépendantes.

Voici la démo :

```js run
function makeCounter() {
  let count = 0;
  return function() {
    return count++;
  };
}

let counter1 = makeCounter();
let counter2 = makeCounter();

alert( counter1() ); // 0
alert( counter1() ); // 1

alert( counter2() ); // 0 (independent)
```


Espérons que la situation avec les variables externes est claire maintenant. Dans la plupart des situations, une telle compréhension suffit. Il y a peu de détails dans la spécification que nous avons omis par souci de brièveté. Donc, dans la section suivante, nous couvrirons plus de détails.

## Les environnements en détail

Voici ce qui se passe dans l'exemple `makeCounter` pas à pas. Suivez-le pour vous assurer de comprendre comment cela fonctionne en détail.

Veuillez noter que la propriété additionnelle `[[Environment]]` est couverte ici. Nous ne l'avions pas mentionné avant pour la simplicité.

1. lorsque le script vient de commencer, il n’existe qu’un environnement lexical global :

    ![](lexenv-nested-makecounter-1.svg)

    a ce moment précis, il n'y a qu'une fonction `makecounter`, car c'est une fonction déclaration. elle n'a pas encore été exécutée.

    **toutes les fonctions "à la naissance" reçoivent une propriété cachée `[[environment]]` avec une référence à l'environnement lexical de leur création.**

    nous n'en avons pas encore parlé. c'est ainsi que la fonction sait où elle a été créée.

    ici, `makecounter` est créé dans l'environnement lexical global, donc `[[environment]]` en garde une référence.

    en d'autres termes, une fonction est "imprimée" avec une référence à l'environnement lexical où elle est née. et `[[environment]]` est la propriété cachée de la fonction qui a cette référence.

2. le code s'exécute, la nouvelle variable globale `counter` est déclarée et obtient le résultat de l'appel de `makecounter() `. voici un instantané du moment où l'exécution est sur la première ligne de `makecounter()` :

    ![](lexenv-nested-makecounter-2.svg)

    au moment de l'appel de `makecounter()`, l'environnement lexical est créé pour contenir ses variables et ses arguments.

    comme tous les environnements lexicaux, il stocke deux choses :
    1. un enregistrement d'environnement avec des variables locales. dans notre cas, `count` est la seule variable locale (qui apparaît lorsque la ligne avec `let count` est exécutée).

    2. la référence lexicale externe, qui est définie sur la valeur de `[[environment]]` de la fonction. ici `[[environnement]]` de `makecounter` fait référence à l'environnement lexical global.

    nous avons donc maintenant deux environnements lexicaux: le premier est global, le second est pour l’appel `makecounter` actuel, avec la référence externe à global.

3. lors de l'exécution de `makecounter()`, une petite fonction imbriquée est créée.

    peu importe que la fonction soit créée à l'aide de la fonction déclaration ou de la fonction expression. toutes les fonctions obtiennent la propriété `[[environment]]` qui fait référence à l'environnement lexical dans lequel elles ont été créées. donc, notre nouvelle fonction imbriquée l'obtient également.

    pour notre nouvelle fonction imbriquée, la valeur de `[[environment]]` est l'environnement lexical actuel de `makecounter()` (où elle est née) :

    ![](lexenv-nested-makecounter-3.svg)

    veuillez noter qu'à cette étape, la fonction interne a été créée, mais pas encore appelée. le code à l'intérieur `return count ++;` n'est pas en cours d'exécution.

4. au fur et à mesure de l'exécution, l'appel à `makecounter()` se termine et le résultat (la fonction imbriquée minuscule) est affecté à la variable globale `counter` :

    ![](lexenv-nested-makecounter-4.svg)

    cette fonction n'a qu'une seule ligne: `return count++`, qui sera exécutée lors de son exécution.

5. lorsque `counter()` est appelé, un nouvel environnement lexical est créé pour l'appel. il est vide, parce que `counter` n'a pas de variable locale par lui-même. mais le `[[environnement]]` de `counter` est utilisé comme référence `externe` pour lui, ce qui donne accès aux variables de l'ancien appel `makecounter()` où il a été créé :

    ![](lexenv-nested-makecounter-5.svg)

    désormais, lorsque l'appel recherche la variable `count`, il commence par rechercher son propre environnement lexical (vide), puis l'environnement lexical de l'appel` makecounter() `extérieur, où il le trouve.

    veuillez noter comment fonctionne la gestion de la mémoire ici. bien que l'appel de `makecounter()` se soit terminé quelques temps auparavant, son environnement lexical a été conservé en mémoire, car il existe une fonction imbriquée avec `[[environment]]` le référençant.

    généralement, un objet environnement lexical existe tant qu'il existe une fonction qui peut l'utiliser. il est effacé uniquement lorsqu'il n'y en a plus.

    l'appel à `counter()` renvoie non seulement la valeur de `count`, mais l'augmente également. notez que la modification est faite "en place". la valeur de `count` est modifiée exactement dans l'environnement où elle a été trouvée.

    ![](lexenv-nested-makecounter-6.svg)

7. les prochains appels de `counter()` font de même.

la réponse à la deuxième question du début du chapitre devrait maintenant être évidente.

la fonction `work()` dans le code ci-dessous obtient `name` à partir de l'emplacement de son origine via la référence d'environnement lexical externe :

![](lexenv-nested-work.svg)

donc, le résultat est `"pete"` ici.

mais s'il n'y avait pas de `let name` dans `makeworker() `, alors la recherche irait à l'extérieur et prendrait la variable globale comme nous pouvons le voir à partir de la chaîne ci-dessus. dans ce cas, ce serait `"john"`.

```smart header="closures"
il existe un terme général de programmation "closure", que les développeurs devraient généralement connaître.

une [closure](https://fr.wikipedia.org/wiki/fermeture_(informatique)) est une fonction qui mémorise ses variables externes et peut y accéder. dans certains langages, ce n'est pas possible ou une fonction doit être écrite de manière spéciale pour que cela se produise. mais comme expliqué ci-dessus, en javascript, toutes les fonctions sont naturellement des fermetures (il n’existe qu’une seule exclusion, à couvrir dans le chapitre <info:new-function>).

autrement dit, elles se souviennent automatiquement de l'endroit où elles ont été créées à l'aide d'une propriété `[[environment]]` masquée, et toutes peuvent accéder aux variables externes.

lors d’un entretien d'embauche, les développeurs front-end reçoivent souvent une question du genre "qu’est-ce qu’une closure ?", une réponse valable serait une définition de la closure et une explication selon laquelle toutes les fonctions en javascript sont des closures, et peut-être quelques mots supplémentaires sur les détails techniques : propriété `[[environment]]` et comment fonctionnent les environnements lexicaux.
```

## blocs de code et boucles, iife

les exemples ci-dessus se sont concentrés sur les fonctions. mais un environnement lexical existe pour tout bloc de code `{...}`.

un environnement lexical est créé lors de l’exécution d’un bloc de code et contient des variables locales au bloc. voici quelques exemples.

### if

dans l'exemple ci-dessous, la variable `user` n'existe que dans le bloc` if` :

<!--
    ```js run
    let phrase = "hello";

    if (true) {
        let user = "john";

        alert(`${phrase}, ${user}`); // hello, john
    }

    alert(user); // error, ne peut pas voir une telle variable !
    ```
  -->

![](lexenv-if.svg)

lorsque l'exécution entre dans le bloc `if`, le nouvel environnement lexical "if-only" est créé.

il a la référence à la partie externe, donc `phrase` peut être trouvée. mais toutes les variables et fonctions expressions, déclarées à l'intérieur de `if`, résident dans cet environnement lexical et ne peuvent pas être vues de l'extérieur.

par exemple, après la fin de `if`, l'`alert` ci-dessous ne verra pas `user`, d'où l'erreur.

### for, while

pour une boucle, chaque itération a un environnement lexical séparé. si une variable est déclarée dans `for(let ...)`, alors c'est aussi dedans :

```js run
for (let i = 0; i < 10; i++) {
  // chaque boucle a son propre environnement lexical
  // {i: value}
}

alert(i); // error, no such variable
```

veuillez noter que `let i` est visuellement en dehors de `{...}`. la construction `for` est spéciale ici : chaque itération de la boucle a son propre environnement lexical contenant le `i` actuel.

de la même manière que `if`, après la boucle, `i` n'est pas visible.

### blocs de code

nous pouvons également utiliser un bloc de code "nu" `{…}` pour isoler des variables dans une "portée locale".

par exemple, dans un navigateur web, tous les scripts (sauf avec `type="module"`) partagent la même zone globale. donc, si nous créons une variable globale dans un script, elle devient disponible pour les autres. mais cela devient une source de conflits si deux scripts utilisent le même nom de variable et s’écrasent.

cela peut arriver si le nom de la variable est un mot répandu et que les auteurs de script ne se connaissent pas.

si nous voulons éviter cela, nous pouvons utiliser un bloc de code pour isoler tout ou partie du script :

```js run
{
  // travailer avec des variables locales qui ne doivent pas être vues à l'extérieur

  let message = "hello";

  alert(message); // hello
}

alert(message); // error: message is not defined
```

le code en dehors du bloc (ou à l'intérieur d'un autre script) ne voit pas les variables à l'intérieur du bloc, car le bloc a son propre environnement lexical.

### iife

dans le passé, il n’existait pas d’environnement lexical au niveau des blocs en javascript.

les programmeurs ont donc dû inventer quelque chose. et ce qu'ils ont fait s'appelle "immediately-invoked function expressions" (fonction expression immédiatement invoquées, en abrégé iife).

ce n'est pas une chose que nous devrions utiliser de nos jours, mais vous pouvez les trouver dans d'anciens scripts, il est donc préférable de les comprendre.

une iife ressemble à ceci :

```js run
(function() {

  let message = "hello";

  alert(message); // hello

})();
```

ici, une fonction expression est créée et appelée immédiatement. donc, le code s'exécute tout de suite et a ses propres variables privées.

la fonction expression est entourée de parenthèses `(function {...})`, parce que lorsque javascript rencontre `"function"` dans le flux de code principal, il est compris comme le début d'une fonction déclaration. mais une fonction déclaration doit avoir un nom, donc ce type de code donnera une erreur :

```js run
// essayons de déclarer et d'appeler immédiatement une fonction
function() { // <-- error: unexpected token (

  let message = "hello";

  alert(message); // hello

}();
```

même si nous disons : "d'accord, ajoutons un nom", cela ne fonctionnera pas, car javascript ne permet pas d'appeler immédiatement les fonctions déclarations :

```js run
// erreur de syntaxe à cause des parenthèses ci-dessous
function go() {

}(); // <-- ne peut pas appeler la déclaration de fonction immédiatement
```

ainsi, les parenthèses autour de la fonction sont une astuce pour montrer à javascript que la fonction est créée dans le contexte d’une autre expression et qu’il s’agit donc d’une fonction expression : elle n’a pas besoin de nom et peut être appelée immédiatement.

il existe d'autres moyens que les parenthèses pour indiquer à javascript qu'il s'agit d'une fonction expression :

```js run
// façons de créer des iife

(function() {
  alert("parentheses around the function");
}*!*)*/!*();

(function() {
  alert("parentheses around the whole thing");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("bitwise not operator starts the expression");
}();

*!*+*/!*function() {
  alert("unary plus starts the expression");
}();
```

dans tous les cas ci-dessus, nous déclarons une fonction expression et l'exécutons immédiatement. notons encore : de nos jours, il n'y a aucune raison d'écrire un tel code.

## garbage collection

généralement, un environnement lexical est nettoyé et supprimé après l'exécution de la fonction. par exemple :

```js
function f() {
  let value1 = 123;
  let value2 = 456;
}

f();
```

ici, les deux valeurs sont techniquement les propriétés de l'environnement lexical. mais après la fin de `f()`, l'environnement lexical devient inaccessible, il est donc supprimé de la mémoire.

... mais s'il y a une fonction imbriquée qui est toujours accessible après la fin de `f`, alors elle a la propriété `[[environment]]` qui fait référence à l'environnement lexical externe, elle est donc aussi accessible et vivante :

```js
function f() {
  let value = 123;

  function g() { alert(value); }

*!*
  return g;
*/!*
}

let func = f(); // func obtient une référence à g
// donc il reste ainsi que la mémoire et son environnement lexical externe reste aussi
```

veuillez noter que si `f()` est appelé plusieurs fois et que les fonctions résultantes sont sauvegardées, tous les objets d'environnement lexicaux correspondants seront également conservés en mémoire. tous les 3 dans le code ci-dessous :

```js
function f() {
  let value = math.random();

  return function() { alert(value); };
}

// 3 fonctions dans un tableau, chacune d'entre elles étant liée à l'environnement lexical
// à partir de l'exécution de f() correspondante
let arr = [f(), f(), f()];
```

un objet environnement lexical meurt lorsqu'il devient inaccessible (comme tout autre objet). en d'autres termes, il n'existe que s'il existe au moins une fonction imbriquée qui le référence.

dans le code ci-dessous, lorsque `g` devient inaccessible, l'environnement lexical englobant (et par conséquent `value`) est nettoyé de la mémoire.

```js
function f() {
  let value = 123;

  function g() { alert(value); }

  return g;
}

let func = f(); // pendant que func a une référence à g, il reste en mémoire

func = null; // ... et maintenant la mémoire est nettoyée
```

### Optimisations réelles

Comme nous l'avons vu, en théorie, lorsqu'une fonction est vivante, toutes les variables externes sont également conservées.

Mais dans la pratique, les moteurs JavaScript tentent d'optimiser cela. Ils analysent l'utilisation des variables et s'il est évident d'après le code qu'une variable externe n'est pas utilisée -- elle est supprimée.

**Un effet secondaire important de V8 (Chrome, Opera) est qu’une telle variable ne sera plus disponible lors du débogage.**

Essayez d'exécuter l'exemple ci-dessous sous Chrome avec les outils de développement ouverts.

Quand il se met en pause, dans la console, tapez `alert(value)`.

```js run
function f() {
  let value = Math.random();

  function g() {
    debugger; // dans la console : tapez alert(value); No such variable!
  }

  return g;
}

let g = f();
g();
```

Comme vous avez pu le constater, cette variable n'existe pas! En théorie, elle devrait être accessible, mais le moteur l'a optimisé.

Cela peut conduire à des problèmes de débogage amusants (voire fastidieux). L'un d'eux -- nous pouvons voir une variable externe portant le même nom au lieu de celle attendue :

```js run global
let value = "Surprise!";

function f() {
  let value = "the closest value";

  function g() {
    debugger; // dans la console : tapez alert(value); Surprise!
  }

  return g;
}

let g = f();
g();
```

```warn header="À plus!"
Cette fonctionnalité de V8 est bonne à savoir. Si vous déboguez avec Chrome/Opera, vous le rencontrerez tôt ou tard.

Ce n'est pas un bug dans le débogueur, mais plutôt une fonctionnalité spéciale de V8. Peut-être que cela changera un jour.
Vous pouvez toujours le vérifier en exécutant les exemples de cette page.
```
