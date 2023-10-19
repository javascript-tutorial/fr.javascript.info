# Les erreurs personnalisées, extension de Error

Lorsque nous développons quelque chose, nous avons souvent besoin de nos propres classes d'erreur pour refléter des problèmes spécifiques qui peuvent mal tourner dans nos tâches. Pour les erreurs dans les opérations réseau, nous aurons peut-être besoin de `HttpError`, pour les opérations de base de données `DbError`, pour les opérations de recherche `NotFoundError`, etc.

Nos erreurs devraient prendre en charge des propriétés d'erreur de base telles que `message`, `name` et, de préférence, `stack`. Mais elles peuvent aussi avoir d’autres propriétés propres, par exemple les objets `HttpError` peuvent avoir une propriété `statusCode` avec une valeur telle que `404` ou `403` ou `500`.

JavaScript permet d'utiliser `throw` avec n'importe quel argument. Par conséquent, techniquement, nos classes d'erreur personnalisées n'ont pas besoin d'hériter de `Error`. Mais si nous héritons, il devient alors possible d'utiliser `obj instanceof Error` pour identifier les objets d'erreur. Il vaut donc mieux en hériter.

Au fur et à mesure que l'application grandit, nos propres erreurs forment naturellement une hiérarchie. Par exemple, `HttpTimeoutError` peut hériter de `HttpError`, etc.

## Étendre Error

A titre d'exemple, considérons une fonction `readUser(json)` qui devrait lire JSON avec des données utilisateur.

Voici un exemple de l'apparence d'un `json` valide :

```js
let json = `{ "name": "John", "age": 30 }`;
```

En interne, nous utiliserons `JSON.parse`. S'il reçoit un `json` malformé, il renvoie `SyntaxError`. Mais même si `json` est syntaxiquement correct, cela ne signifie pas que c'est un utilisateur valide, non ? Il peut manquer les données nécessaires. Par exemple, il peut ne pas avoir les propriétés `name` et `age` qui sont essentielles pour nos utilisateurs.

Notre fonction `readUser(json)` va non seulement lire JSON, mais aussi vérifier ("valider") les données. S'il n'y a pas de champs obligatoires ou si le format est incorrect, c'est une erreur. Et ce n’est pas une `SyntaxError`, car les données sont syntaxiquement correctes, mais un autre type d’erreur. Nous l'appellerons `ValidationError` et créerons une classe pour cela. Une erreur de ce type devrait également comporter des informations sur le champ fautif.

Notre classe `ValidationError` devrait hériter de la classe `Error`.

La class `Error` est une classe intégrée, voici le code approximatif pour que nous comprenions ce que nous étendons :

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

Maintenant, héritons de `ValidationError` et mettons-le en action :

```js run
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
  alert(err.stack); // une liste des appels imbriqués avec le numéro de ligne pour chacun d'entre eux
}
```

Remarque : à la ligne `(1)`, nous appelons le constructeur parent. JavaScript exige que nous appelions `super` dans le constructeur de l'enfant, donc c'est obligatoire. Le constructeur parent définit la propriété `message`.

Le constructeur parent définit également la propriété `name` sur `"Error"`, donc à la ligne `(2)` nous la réinitialisons à la valeur correcte.

Essayons de l'utiliser dans `readUser(json)` :

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
    throw err; // erreur inconnue, on la propage (**)
  }
}
```

Le bloc `try..catch` dans le code ci-dessus gère à la fois notre `ValidationError` et le `SyntaxError` intégré de `JSON.parse`.

Veuillez regarder comment nous utilisons `instanceof` pour vérifier le type d'erreur spécifique à la ligne `(*)`.

Nous pourrions aussi regarder `err.name`, comme ceci :

```js
// ...
// au lieu de (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```

La version `instanceof` est bien meilleure, car dans le futur nous allons étendre `ValidationError`, en créer des sous-types, comme `PropertyRequiredError`. Et `instanceof` continuera à fonctionner pour les nouvelles classes héritées. Donc, c'est à l'épreuve du futur.

Il est également important que si `catch` rencontre une erreur inconnue, il la renvoie à la ligne `(**)`. Le bloc `catch` ne sait gérer que les erreurs de validation et de syntaxe, les autres types (causés par une faute de frappe dans le code ou d'autres raisons inconnues) devraient êtres propagés.

## Héritage complémentaire

La classe `ValidationError` est très générique. Beaucoup de choses peuvent mal se passer. La propriété peut être absente ou dans un format incorrect (comme une valeur de chaîne de caractères pour `age` au lieu d’un nombre). Faisons une classe plus concrète `PropertyRequiredError`, exactement pour les propriétés absentes. Elle contiendra des informations supplémentaires sur la propriété qui manque.

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
    throw err; // erreur inconnue, on la propage
  }
}
```

La nouvelle classe `PropertyRequiredError` est facile à utiliser : il suffit de passer le nom de la propriété : `new PropertyRequiredError(property)`. Le `message` est généré par le constructeur.

Veuillez noter que `this.name` dans le constructeur `PropertyRequiredError` est à nouveau attribué manuellement. Cela peut devenir un peu fastidieux -- d'assigner `this.name = <class name>` dans chaque classe d'erreur personnalisée. Nous pouvons l'éviter en créant notre propre classe "d'erreur de base" qui assigne `this.name = this.constructor.name`. Puis nous en ferons hériter toutes nos classes d'erreur personnalisées.

Appelons cela `MyError`.

Voici le code avec `MyError` et d'autres classes d'erreur personnalisées, simplifié :

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

// le nom est correcte
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

Maintenant, les erreurs personnalisées sont beaucoup plus courtes, en particulier `ValidationError`, car nous nous sommes débarrassés de la ligne `"this.name = ..."` dans le constructeur.

## Le wrapping des exceptions

Le but de la fonction `readUser` dans le code ci-dessus est "de lire les données de l'utilisateur". Il peut y avoir différents types d’erreurs dans le processus. À l'heure actuelle, nous avons `SyntaxError` et `ValidationError`, mais à l'avenir, la fonction `readUser` pourrait croître et générer probablement d'autres types d'erreurs.

Le code qui appelle `readUser` devrait gérer ces erreurs. À l'heure actuelle, il utilise plusieurs if dans le bloc `catch`, qui vérifient la classe et gèrent les erreurs connues et rejettent les inconnues.

Le schéma est le suivant :

```js
try {
  ...
  readUser()  // la source d'erreur potentielle
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // handle validation errors
  } else if (err instanceof SyntaxError) {
    // handle syntax errors
  } else {
    throw err; // erreur inconnue, la relancer
  }
}
```

Dans le code ci-dessus, nous pouvons voir deux types d'erreurs, mais il peut y en avoir plus.

Si la fonction `readUser` génère plusieurs types d'erreurs, alors nous devrions nous demander : voulons-nous vraiment vérifier tous les types d'erreur un par un à chaque fois ?

Souvent, la réponse est "non", nous aimerions être "un niveau au-dessus de tout cela". Nous voulons simplement savoir s'il y a eu une "erreur de lecture des données" -- pourquoi exactement cela s'est produit est souvent hors de propos (le message d'erreur le décrit). Ou, encore mieux, nous aimerions avoir un moyen d'obtenir les détails de l'erreur, mais seulement si nous en avons besoin.

La technique que nous décrivons ici est appelée "encapsulation d'exceptions".

1. Nous allons créer une nouvelle classe `ReadError` pour représenter une erreur générique de "lecture des données".
2. La fonction `readUser` interceptera les erreurs de lecture de données qui se produisent à l'intérieur, telles que `ValidationError` et `SyntaxError`, et générera à la place une `ReadError`.
3. L'objet `ReadError` conservera la référence à l'erreur d'origine dans sa propriété `cause`.

Ensuite, le code qui appelle `readUser` n'aura qu'à vérifier `ReadError`, pas pour tous les types d'erreurs de lecture de données. Et s'il a besoin de plus de détails sur une erreur, il peut vérifier sa propriété `cause`.

Voici le code qui définit `ReadError` et illustre son utilisation dans `readUser` et `try..catch` :

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

Dans le code ci-dessus, `readUser` fonctionne exactement comme décrit - il intercepte les erreurs de syntaxe et de validation et propage des erreurs `ReadError` (les erreurs inconnues sont propagées comme d'habitude).

Donc, le code externe vérifie `instanceof ReadError` et c'est tout. Pas besoin de lister tous les types d'erreur possibles.

L'approche est appelée "encapsulation d'exceptions", car nous prenons les exceptions "de bas niveau" et les "encapsulons" dans `ReadError` qui est plus abstrait. Il est largement utilisé dans la programmation orientée objet.

## Résumé

- Nous pouvons hériter de `Error` et d'autres classes d'erreurs intégrées normalement. Nous devons juste nous occuper de la propriété `name` et ne pas oublier d'appeler `super`.
- Nous pouvons utiliser `instanceof` pour vérifier des erreurs particulières. Cela fonctionne aussi avec l'héritage. Mais parfois, nous avons un objet d'erreur provenant d'une bibliothèque tierce et il n'y a pas de moyen facile d'obtenir la classe. Dans ce cas, la propriété `name` peut être utilisée pour de telles vérifications.
- Le wrapping des exceptions est une technique répandue : une fonction gère les exceptions de bas niveau et crée des erreurs de niveau supérieur au lieu de diverses erreurs de bas niveau. Les exceptions de bas niveau deviennent parfois des propriétés de cet objet comme `err.cause` dans les exemples ci-dessus, mais ce n'est pas strictement requis.
