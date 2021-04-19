# Fonctions

Très souvent, nous devons effectuer une action similaire à plusieurs endroits du script.

Par exemple, nous devons afficher un beau message lorsqu'un visiteur se connecte, se déconnecte et peut-être ailleurs.

Les fonctions sont les principales "composantes" du programme. Ils permettent au code d'être appelé plusieurs fois sans répétition.

Nous avons déjà vu des exemples de fonctions intégrées, telles que `alert(message)`, `prompt(message, default)` et `confirm(question)`. Mais nous pouvons aussi créer nos propres fonctions.

## Déclaration de fonction

Pour créer une fonction, nous pouvons utiliser une *déclaration de fonction*.

Cela ressemble à ceci :

```js
function showMessage() {
  alert( 'Hello everyone!' );
}
```

Le mot-clé `function` commence en premier, puis le *nom de la fonction*, puis une liste de *paramètres* entre les parenthèses (séparés par des virgules, vides dans l'exemple ci-dessus) et enfin le code de la fonction, également appelé "le corps de la fonction", entre des accolades.

```js
function name(parameters) {
  ...body...
}
```

Notre nouvelle fonction peut être appelée par son nom : `showMessage()`.

Par exemple :

```js run
function showMessage() {
  alert( 'Hello everyone!' );
}

*!*
showMessage();
showMessage();
*/!*
```

L'appel `showMessage()` exécute le code de la fonction. Ici, nous verrons le message deux fois, parce qu'on l'appelle deux fois.

Cet exemple illustre clairement l’un des principaux objectifs des fonctions: éviter la duplication de code.

Si nous devons un jour modifier le message ou son affichage, il suffit de modifier le code à un endroit: la fonction qui le renvoie.

## Variables locales

Une variable déclarée à l'intérieur d'une fonction n'est visible qu'à l'intérieur de cette fonction.

Par exemple :

```js run
function showMessage() {
*!*
  let message = "Hello, I'm JavaScript!"; // variable locale
*/!*

  alert( message );
}

showMessage(); // Hello, I'm JavaScript!

alert( message ); // <-- Erreur! La variable est locale à la fonction
```

## Variables externes

Une fonction peut également accéder à une variable externe, par exemple :

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hello, John
```

La fonction a un accès complet à la variable externe. Cela peut aussi la modifier.

Par exemple :

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) changé la variable externe

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* avant l'appel de fonction

showMessage();

alert( userName ); // *!*Bob*/!*, la valeur a été modifiée par la fonction
```

La variable externe n’est utilisée que s’il n’y a pas de variable locale.


Si une variable du même nom est déclarée à l'intérieur de la fonction, elle *eclipsera* la variable externe. Par exemple, dans le code ci-dessous, la fonction utilise le nom `userName` local. L'externe est ignoré :

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // déclarer une variable locale
*/!*

  let message = 'Hello, ' + userName; // *!*Bob*/!*
  alert(message);
}

// la fonction créera et utilisera son propre userName
showMessage();

alert( userName ); // *!*John*/!*, inchangé, la fonction n'a pas accédé à la variable externe
```

```smart header="Variables globales"
Les variables déclarées en dehors de toute fonction, telle que `userName` externe dans le code ci-dessus, sont appelées *globales*.

Les variables globales sont visibles depuis n'importe quelle fonction (sauf si elles sont masquées par les variables locales).

C'est une bonne pratique de minimiser l'utilisation de variables globales. Le code moderne a peu ou pas de variable globales. La plupart des variables résident dans leurs fonctions. Parfois, cependant, ils peuvent être utiles pour stocker des données au niveau du projet.
```

## Arguments

Nous pouvons transmettre des données arbitraires à des fonctions à l'aide de paramètres (également appelés *arguments de fonction*).

Dans l'exemple ci-dessous, la fonction a deux paramètres: `from` et `text`.

```js run
function showMessage(*!*from, text*/!*) { // arguments : from, text
  alert(from + ': ' + text);
}

*!*
showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)
*/!*
```

Lorsque la fonction est appelée dans les lignes `(*)` et `(**)`, les valeurs données sont copiées dans les variables locales `from` et `text`. Ensuite, la fonction les utilise.

Voici un autre exemple: nous avons une variable `from` et la transmettons à la fonction. Remarque : la fonction change `from`, mais le changement n'est pas visible à l'extérieur, car une fonction obtient toujours une copie de la valeur :


```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // améliore l'apparence de "from"
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// la valeur de "from" est la même, la fonction a modifié une copie locale
alert( from ); // Ann
```

## Les valeurs par défaut

Si un paramètre n'est pas fourni, sa valeur devient `undefined`.

Par exemple, la fonction `showMessage(from, text)` mentionnée précédemment peut être appelée avec un seul argument :

```js
showMessage("Ann");
```

Ce n’est pas une erreur. Un tel appel produirait `"*Annt*: undefined"`. Il n’y a pas de `text`, donc on suppose que `text === undefined`.

Si nous voulons utiliser un `text` "par défaut" dans ce cas, nous pouvons le spécifier après `=` :

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: aucun texte fourni
```

Maintenant, si le paramètre `text` n'est pas passé, il obtiendra la valeur `"no text given"`.

Ici, `"no text given"` est une chaîne de caractères, mais il peut s'agir d'une expression plus complexe, qui n'est évaluée et affectée que si le paramètre est manquant. Donc, cela est également possible :

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() exécuté uniquement si aucun texte n'est fourni
  // son résultat devient la valeur de text
}
```
```smart header="Évaluation des paramètres par défaut"

En JavaScript, un paramètre par défaut est évalué chaque fois que la fonction est appelée sans le paramètre correspondant.

Dans l'exemple ci-dessus, `anotherFunction()` est appelé à chaque fois que `showMessage()` est appelé sans le paramètre `text`.
```

### Paramètres par défaut alternatifs

Il est parfois judicieux de définir des valeurs par défaut pour les paramètres non pas dans la déclaration de fonction, mais à un stade ultérieur, lors de son exécution.

Pour vérifier un paramètre omis, nous pouvons le comparer avec `undefined` :

```js run
function showMessage(text) {
*!*
  if (text === undefined) {
    text = 'empty message';
  }
*/!*

  alert(text);
}

showMessage(); // empty message
```

...Ou nous pourrions utiliser l'opérateur `||` :

```js
// si le paramètre de texte est omis ou "" est passé, définissez-le sur 'empty'
function showMessage(text) {
  text = text || 'empty';
  ...
}
```

Les moteurs JavaScript modernes prennent en charge [l'opérateur de coalescence des nuls](info:nullish-coalescing-operator) `??`, c'est mieux quand des valeurs fausses, telles que `0`, sont considérées comme régulières :

```js run
// s'il n'y a pas de paramètre "count", afficher "unknown"
function showCount(count) {
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```


## Renvoyer une valeur

Une fonction peut renvoyer une valeur dans le code appelant en tant que résultat.

L'exemple le plus simple serait une fonction qui additionne deux valeurs :

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

La directive `return` peut être n'importe où dans la fonction. Lorsque l'exécution le permet, la fonction s'arrête et la valeur est renvoyée au code appelant (affecté à `result` ci-dessus).

Il peut y avoir plusieurs occurrences de `return` dans une seule fonction. Par exemple :

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Do you have permission from your parents?');
*/!*
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

Il est possible d'utiliser `return` sans valeur. Cela entraîne la sortie immédiate de la fonction.

Par exemple :

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Showing you the movie" ); // (*)
  // ...
}
```

Dans le code ci-dessus, si `checkAge(age)` renvoie `false`, alors `ShowMovie` n’effectuera pas l’`alert`.

````smart header="Une fonction avec un `return` vide ou rien dedans retourne `undefined`"

```js run
function doNothing() { /* vide */ }

alert( doNothing() === undefined ); // true
```

Une `return` vide est également identique à un `return undefined` :

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="N'ajoutez jamais de nouvelle ligne entre `return` et la valeur"
Pour une longue expression dans `return`, il pourrait être tentant de la mettre sur une ligne séparée, comme ceci :

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
Cela ne fonctionne pas, car JavaScript suppose un point-virgule après le `return`. Cela fonctionnera comme :

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

Donc, cela devient effectivement un retour vide.

Si nous voulons que l'expression renvoyée recouvre plusieurs lignes, nous devons la démarrer à la même ligne que `return`. Ou du moins mettre les parenthèses d'ouverture comme suit :

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
Et cela fonctionnera comme prévu.
````

## Nommer une fonction [#function-naming]

Les fonctions sont des actions. Donc, leur nom est généralement un verbe. Il convient de décrire brièvement, mais aussi précisément que possible, le rôle de la fonction. Pour qu'une personne qui lit le code reçoive le bon indice.

C'est une pratique répandue de commencer une fonction avec un préfixe verbal qui décrit vaguement l'action. Il doit exister un accord au sein de l'équipe sur la signification des préfixes.

Par exemple, les fonctions qui commencent par `"show"` affichent généralement quelque chose.

Fonction commençant par…

- `"get…"` -- retourne une valeur,
- `"calc…"` -- calcule quelque chose,
- `"create…"` -- créer quelque chose,
- `"check…"` -- vérifie quelque chose et retourne un booléen, etc.

Exemples de quelques noms :

```js no-beautify
showMessage(..)     // affiche un message
getAge(..)          // renvoie l'âge (l'obtient en quelque sorte)
calcSum(..)         // calcule une somme et renvoie le résultat
createForm(..)      // crée un formulaire (et le retourne généralement)
checkPermission(..) // vérifie une permission, retourne vrai/faux
```

Avec les préfixes en place, un coup d'œil sur un nom de fonction permet de comprendre le type de travail effectué et le type de valeur renvoyé.

```smart header="Une fonction - une action"
Une fonction doit faire exactement ce qui est suggéré par son nom, pas plus.

Deux actions indépendantes méritent généralement deux fonctions, même si elles sont généralement appelées ensemble (dans ce cas, nous pouvons créer une troisième fonction qui appelle ces deux actions).

Quelques exemples de violation de cette règle :

- `getAge` -- serait mauvais si elle affichait une `alert` avec l'âge (devrait seulement obtenir).
- `createForm` -- serait mauvais s’il modifiait le document en y ajoutant un formulaire (il ne devrait que le créer et le renvoyer).
- `checkPermission` -- serait mauvais si affiche le message d'accès accordé/refusé (doit uniquement effectuer la vérification et renvoyer le résultat).

Ces exemples supposent des significations communes de préfixes. Vous et votre équipe êtes libres de vous entendre sur d'autres sens, mais ils ne sont généralement pas très différents. Dans tous les cas, vous devez bien comprendre ce que signifie un préfixe, ce qu'une fonction préfixée peut et ne peut pas faire. Toutes les fonctions ayant le même préfixe doivent obéir aux règles. Et l'équipe devrait partager ces connaissances.
```

```smart header="Noms de fonction ultra-courts"
Les fonctions utilisées *très souvent* portent parfois des noms ultra-courts.

Par exemple le framework [jQuery](http://jquery.com) définit une fonction avec `$`. La librairie [LoDash](http://lodash.com/) a nommé sa fonction principale `_`.

<<<<<<< HEAD
Ce sont des exceptions. En règle générale, les noms de fonctions doivent être concis, mais descriptifs.
=======
These are exceptions. Generally function names should be concise and descriptive.
>>>>>>> 6ab384f2512902d74e4b0ff5a6be60e48ab52e96
```

## Fonctions == Commentaires

Les fonctions doivent être courtes et faire exactement une seule chose. Si cette chose est conséquente, il vaut peut-être la peine de scinder la fonction en quelques fonctions plus petites. Parfois, suivre cette règle peut ne pas être aussi facile, mais c’est définitivement une bonne pratique.

Une fonction distincte est non seulement plus facile à tester et à déboguer -- son existence même est un excellent commentaire!

Par exemple, comparez les deux fonctions `showPrimes(n)` ci-dessous. Chacune extrait les [nombres premiers](https://fr.wikipedia.org/wiki/Nombre_premier) jusqu'à `n`.

La première variante utilise un label :

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // un nombre premier
  }
}
```

La deuxième variante utilise une fonction supplémentaire `isPrime(n)` pour tester la primalité :

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // un nombre premier
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

La deuxième variante est plus facile à comprendre, n’est-ce pas ? Au lieu du bloc de code, nous voyons le nom de l'action (`isPrime`). Parfois, les gens se réfèrent à ce code comme étant *auto-descriptif*.

Des fonctions peuvent donc être créées même si nous n’avons pas l’intention de les réutiliser. Ils structurent le code et le rendent lisible.

## Résumé

Une déclaration de fonction ressemble à ceci :

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- Les valeurs transmises à une fonction en tant que paramètres sont copiées dans ses variables locales.
- Une fonction peut accéder à des variables externes. Mais cela ne fonctionne que de l'intérieur. Le code en dehors de la fonction ne voit pas ses variables locales.
- Une fonction peut renvoyer une valeur. Si ce n'est pas le cas, le résultat est `undefined`.

Pour rendre le code propre et facile à comprendre, il est recommandé d’utiliser principalement des variables et des paramètres locaux dans la fonction, et non des variables externes.

Il est toujours plus facile de comprendre une fonction qui possède des paramètres, fonctionne avec eux et renvoie un résultat, plutôt qu’une fonction qui ne comporte aucun paramètre, mais modifie des variables externes comme un effet secondaire.

Nommage de fonction :

- Un nom doit clairement décrire le rôle de la fonction. Lorsque nous voyons un appel de fonction dans le code, un bon nom nous donne instantanément une compréhension de ce qu’elle fait et de ce qu’elle retourne.
- Une fonction est une action, les noms de fonctions sont donc généralement verbaux.
- Il existe de nombreux préfixes de fonctions bien connus, tels que `create…`, `show…`, `get…`, `check…` et ainsi de suite. Utilisez-les pour indiquer ce que fait une fonction.

Les fonctions sont les principaux éléments constitutifs des scripts. Maintenant que nous avons couvert les bases, nous pouvons donc commencer à les créer et les utiliser. Mais ce n’est que le début du chemin. Nous allons y revenir plusieurs fois, en approfondissant leurs fonctionnalités avancées.
