
# La syntaxe "new Function"

Il existe encore un autre moyen de créer une fonction. C'est rarement utilisé, mais parfois il n'y a pas d'alternative.

## Syntaxe

La syntaxe pour créer une fonction:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

La fonction est créée avec les arguments `arg1...argN` et le `functionBody` donné.

C'est plus facile à comprendre en regardant un exemple. Voici une fonction avec deux arguments:

```js run
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3
```

Et voici une fonction sans arguments, seulement le corps de la fonction:

```js run
let sayHi = new Function('alert("Hello")');

sayHi(); // Hello
```

La différence majeure par rapport aux autres méthodes que nous avons deja vu est que la fonction est créée littéralement à partir d'une chaîne de caractères passée au moment de l'exécution.

Toutes les déclarations précédentes nous demandait, nous les programmeurs, d'écrire le code de la fonction dans le script.

Mais `new Function` nous permet de convertir n'importe qu'elle chaine de caractères en fonction. Par exemple, nous pouvons recevoir une nouvelle fonction d’un serveur puis l’exécuter:

```js
let str = ... receive the code from a server dynamically ...

let func = new Function(str);
func();
```

C'est utilisé dans des cas très spécifiques, comme lorsque nous recevons du code d'un serveur ou pour compiler dynamiquement une fonction à partir d'un modèle dans des applications web complexes.

## Fermeture

Normalement, une fonction se souvient du lieu de sa naissance dans la propriété spéciale `[[Environment]]`. Elle fait référence à l'environnement lexical à partir duquel la fonction a été créée (nous avons couvert cela dans le chapitre <info:closure>).

Mais quand une fonction est créée en utilisant `new Function`, son `[[Environment]]` est configuré pour faire référence non pas à l'environnement lexical actuel, mais à l'environnement global.

Donc, une telle fonction n'a pas accès aux variables externes, mais uniquement aux variables globales.

```js run
function getFunc() {
  let value = "test";

*!*
  let func = new Function('alert(value)');
*/!*

  return func;
}

getFunc()(); // error: value is not defined
```

Comparez-le avec le comportement habituel:

```js run
function getFunc() {
  let value = "test";

*!*
  let func = function() { alert(value); };
*/!*

  return func;
}

getFunc()(); // *!*"test"*/!*, provenant de l'Environnement Lexical de getFunc
```

Cette particularité de `new Function` paraît étrange, mais semble très utile dans la pratique.

Imaginons que nous devions créer une fonction à partir d'une chaîne de caractères. Le code de cette fonction n'est pas connu au moment de l'écriture du script (c'est pourquoi nous n'utilisons pas de fonctions standard), mais sera connu dans le processus d'exécution. Nous pouvons le recevoir du serveur ou d'une autre source.

Notre nouvelle fonction doit interagir avec le script principal.

Et si il pouvait accéder aux variables externes?

Le problème est qu'avant la publication de JavaScript en production, JavaScript est compressé à l'aide d'un *minifier*, un programme spécial qui rétrécit le code en supprimant les commentaires, espaces supplémentaires et, plus particuliarement, renomme les variables locales pour quelles soient plus courtes.

Par exemple, si une fonction a `let userName`, le minifier la remplace par `let a` (ou une autre lettre si celle-ci est deja prise), et le fait partout. C’est généralement une chose sûre à faire, car la variable est locale, rien en dehors de la fonction ne peut y accéder. Et à l'intérieur de la fonction, le minifier remplace chaque mention. Les minifiers sont intelligents, ils analysent la structure du code pour ne rien casser. Ils ne sont pas juste une simple fonction de trouvaille et remplacement.

Donc, si `new Function` avait accès aux variables externes, il serait impossible de trouver le nom d'utilisateur `userName` renommé.

**Si `new Function` avait accès aux variables externes, elle aurait des problèmes avec les minifiers.**

En outre, ce code serait mauvais sur le plan architectural et sujet aux erreurs.

Pour passer quelque chose à une fonction créée par `new Function`, nous devons utiliser ses arguments.

## Résumé

La syntaxe:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

Pour des raisons historiques, les arguments peuvent également être fournis sous forme de liste séparée par des virgules.

Ces trois déclarations signifient la même chose :

```js
new Function('a', 'b', 'return a + b'); // syntax de base
new Function('a,b', 'return a + b'); // séparés par des virgules
new Function('a , b', 'return a + b'); // séparés par des virgules et espacés
```

fonctions créées avec `new Function` ont leur `[[Environment]]` qui fait référence à l’environnement lexical global, et non l’environnement externe. Par conséquent, elles ne peuvent pas utiliser de variables externes. Mais c’est bien, parce que cela nous protège des erreurs. Passer explicitement des paramètres est une méthode bien meilleure sur le plan architectural et ne pose aucun problème avec les minifiers.
