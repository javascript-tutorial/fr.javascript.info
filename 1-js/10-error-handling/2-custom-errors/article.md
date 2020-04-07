# Les erreurs personnalisées, Étendre Error

Lorsque nous développons quelque chose, nous avons souvent besoin de nos propres classes d'erreur pour refléter des problèmes spécifiques qui peuvent mal tourner dans nos tâches. Pour les erreurs dans les opérations réseau, nous aurons peut-être besoin de `HttpError`, pour les opérations de base de données `DbError`, pour les opérations de recherche `NotFoundError`, etc.

Nos erreurs devraient prendre en charge des propriétés d'erreur de base telles que `message`, `name` et, de préférence, `stack`. Mais elles peuvent aussi avoir d’autres propriétés propres, par exemple Les objets `HttpError` peuvent avoir une propriété `statusCode` avec une valeur telle que `404` ou `403` ou `500`.

JavaScript permet d'utiliser `throw` avec n'importe quel argument. Par conséquent, techniquement, nos classes d'erreur personnalisées n'ont pas besoin d'hériter de `Error`. Mais si nous héritons, il devient alors possible d'utiliser `obj instanceof Error` pour identifier les objets d'erreur. Il vaut donc mieux en hériter.

Au fur et à mesure que l'application grandit, nos propres erreurs forment naturellement une hiérarchie. Par exemple, `HttpTimeoutError` peut hériter de `HttpError`, etc.

## Étendre Error

A titre d'exemple, considérons une fonction `readUser(json)` qui devrait lire JSON avec des données utilisateur.

Voici un exemple de l'apparence d'un `json` valide:
```js
let json = `{ "name": "John", "age": 30 }`;
```

En interne, nous utiliserons `JSON.parse`. S'il reçoit un `json` malformé, il renvoie` SyntaxError`. Mais même si `json` est syntaxiquement correct, cela ne signifie pas que c'est un utilisateur valide, non? Il peut manquer les données nécessaires. Par exemple, il peut ne pas avoir les propriétés `name` et `age` qui sont essentielles pour nos utilisateurs.

Notre fonction `readUser(json)` va non seulement lire JSON, mais aussi vérifier ("valider") les données. S'il n'y a pas de champs obligatoires ou si le format est incorrect, c'est une erreur. Et ce n’est pas une `SyntaxError`, car les données sont syntaxiquement correctes, mais un autre type d’erreur. Nous l'appellerons `ValidationError` et créerons une classe pour cela. Une erreur de ce type devrait également comporter des informations sur le champ fautif.

Notre classe `ValidationError` devrait hériter de la classe `Error` intégrée.

Cette classe est intégrée, voici le code approximatif, pour que nous comprenions ce que nous étendons:

```js
// Le "pseudocode" pour la classe d'erreur intégrée définie par JavaScript lui-même
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (noms différents pour différentes classes d'erreur intégrées)
    this.stack = <call stack>; // non standard, mais la plupart des environnements le supportent
  }
}
```

Maintenant, héritons de `ValidationError` et mettons-le en action:

```js run untrusted
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Whoops!
  alert(err.name); // ValidationError
  alert(err.stack); // une liste des appels imbriqués avec des numéros de ligne pour chaque
}
```

Remarque: à la ligne `(1)`, nous appelons le constructeur parent. JavaScript exige que nous appelions `super` dans le constructeur de l'enfant, donc c'est obligatoire. Le constructeur parent définit la propriété `message`.

Le constructeur parent définit également la propriété `name` sur `"Error"`, donc à la ligne `(2)` nous la réinitialisons à la valeur correcte.

Essayons de l'utiliser dans `readUser(json)`:

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("No field: age");
  }
  if (!user.name) {
    throw new ValidationError("No field: name");
  }

  return user;
}

// un example avec try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No field: name
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // erreur inconnue, propager le (**)
  }
}
```

Le bloc `try..catch` dans le code ci-dessus gère à la fois notre `ValidationError` et le `SyntaxError` intégré de `JSON.parse`.

Veuillez regarder comment nous utilisons `instanceof` pour vérifier le type d'erreur spécifique à la ligne `(*)`.

Nous pourrions aussi regarder `err.name`, comme ceci:

```js
// ...
// au lieu de (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```  

La version `instanceof` est bien meilleure, car dans le futur nous allons étendre `ValidationError`, en créer des sous-types, comme `PropertyRequiredError`. Et `instanceof` check continuera à fonctionner pour les nouvelles classes héritées. Donc, c'est à l'épreuve du futur.

De plus, il est important que si `catch` rencontre une erreur inconnue, il la propage, comme à la ligne `(**)`. Le bloc `catch` ne sait que gérer les erreurs de validation et de syntaxe, d'autres types (dus à une faute de frappe dans le code ou à d'autres inconnus) devraient "tomber".

## Héritage complémentaire

La classe `ValidationError` est très générique. Beaucoup de choses peuvent mal se passer. La propriété peut être absente ou dans un format incorrect (comme une valeur de chaîne pour `age`). Faisons une classe plus concrète `PropertyRequiredError`, exactement pour les propriétés absentes. Il contiendra des informations supplémentaires sur la propriété qui manque.

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// example avec try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No property: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // erreur inconnue, propager le
  }
}
```

La nouvelle classe `PropertyRequiredError` est facile à utiliser: il suffit de passer le nom de la propriété: `new PropertyRequiredError(property)`. Le `message` est généré par le constructeur.

Veuillez noter que `this.name` dans le constructeur `PropertyRequiredError` est à nouveau attribué manuellement. Cela peut devenir un peu fastidieux -- d'assigner `this.name = <class name>` dans chaque classe d'erreur personnalisée. Nous pouvons l'éviter en créant notre propre classe "d'erreur de base" qui assigne `this.name = this.constructor.name`. Et puis hériter de toutes nos erreurs personnalisées.

Appelons cela `MyError`.

Voici le code avec `MyError` et d'autres classes d'erreur personnalisées, simplifié:

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

// name is correct
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

Maintenant, les erreurs personnalisées sont beaucoup plus courtes, en particulier `ValidationError`, car nous nous sommes débarrassés de la ligne `"this.name = ..."` dans le constructeur.

## Le wrapping des exceptions

Le but de la fonction `readUser` dans le code ci-dessus est "de lire les données de l'utilisateur". Il peut y avoir différents types d’erreurs dans le processus. À l'heure actuelle, nous avons `SyntaxError` et `ValidationError`, mais à l'avenir, la fonction `readUser` pourrait croître et générer probablement d'autres types d'erreurs.

<<<<<<< HEAD
Le code qui appelle `readUser` devrait gérer ces erreurs. Actuellement, il utilise plusieurs `if` dans le bloc `catch`, qui vérifient la classe, gèrent les erreurs connues et réexaminent les inconnues. Mais si la fonction `readUser` génère plusieurs types d’erreurs - nous devrions nous demander: voulons-nous vraiment vérifier tous les types d’erreur un par un dans chaque code qui appelle `readUser`?

Souvent, la réponse est "Non": le code externe veut être "au-dessus de tout cela". Il veut avoir une sorte "d'erreur de lecture de données". Pourquoi exactement cela est arrivé est souvent sans importance (le message d'erreur le décrit). Ou encore mieux s'il existe un moyen d'obtenir des détails d'erreur, mais uniquement si nous en avons le besoin.

Faisons donc une nouvelle classe `ReadError` pour représenter de telles erreurs. Si une erreur se produit dans `readUser`, nous la détectons et générons `ReadError`. Nous conserverons également la référence à l'erreur d'origine dans sa propriété `cause`. Ensuite, le code externe devra seulement vérifier `ReadError`.
=======
The code which calls `readUser` should handle these errors. Right now it uses multiple `if`s in the `catch` block, that check the class and handle known errors and rethrow the unknown ones.

The scheme is like this:

```js
try {
  ...
  readUser()  // the potential error source
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // handle validation errors
  } else if (err instanceof SyntaxError) {
    // handle syntax errors
  } else {
    throw err; // unknown error, rethrow it
  }
}
```

In the code above we can see two types of errors, but there can be more.

If the `readUser` function generates several kinds of errors, then we should ask ourselves: do we really want to check for all error types one-by-one every time?

Often the answer is "No": we'd like to be "one level above all that". We just want to know if there was a "data reading error" -- why exactly it happened is often irrelevant (the error message describes it). Or, even better, we'd like to have a way to get the error details, but only if we need to.

The technique that we describe here is called "wrapping exceptions".

1. We'll make a new class `ReadError` to represent a generic "data reading" error.
2. The function `readUser` will catch data reading errors that occur inside it, such as `ValidationError` and `SyntaxError`, and generate a `ReadError` instead.
3. The `ReadError` object will keep the reference to the original error in its `cause` property.

Then the code that calls `readUser` will only have to check for `ReadError`, not for every kind of data reading errors. And if it needs more details of an error, it can check its `cause` property.
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622

Voici le code qui définit `ReadError` et illustre son utilisation dans `readUser` et `try..catch`:

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

Dans le code ci-dessus, `readUser` fonctionne exactement comme décrit ci-dessus - corrige les erreurs de syntaxe et de validation et "throw" les erreurs `ReadError` (les erreurs inconnues sont propagées comme d'habitude).

Donc, le code externe vérifie `instanceof ReadError` et c'est tout. Pas besoin de lister tous les types d'erreur possibles.

<<<<<<< HEAD
Cette approche, "wrapping exceptions" en anglais, nous permet de prendre les "exceptions de bas niveau" et les "wrapper" dans `ReadError`, qui est plus abstrait et plus pratique à utiliser pour le code appelant. Cette approche est largement utilisée dans la programmation orientée objet.
=======
The approach is called "wrapping exceptions", because we take "low level" exceptions and "wrap" them into `ReadError` that is more abstract. It is widely used in object-oriented programming.
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622

## Résumé

- Nous pouvons hériter de `Error` et d'autres classes d'erreurs intégrées normalement. Nous devons juste nous occuper de la propriété `name` et ne pas oublier d'appeler `super`.
- Nous pouvons utiliser `instanceof` pour vérifier des erreurs particulières. Cela fonctionne aussi avec l'héritage. Mais parfois, nous avons un objet d'erreur provenant d'une bibliothèque tierce et il n'y a pas de moyen facile d'obtenir la classe. Dans ce cas, la propriété `name` peut être utilisée pour de telles vérifications.
- Le wrapping des exceptions est une technique répandue : une fonction gère les exceptions de bas niveau et crée des erreurs de niveau supérieur au lieu de diverses erreurs de bas niveau. Les exceptions de bas niveau deviennent parfois des propriétés de cet objet comme `err.cause` dans les exemples ci-dessus, mais ce n'est pas strictement requis.
