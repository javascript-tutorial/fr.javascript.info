# Propriété opérateurs de lecture et d'écriture

Il existe deux types de propriétés d'objet.

Le premier désigne *les propriétés de données*. Nous savons déjà comment les utiliser. Toutes les propriétés que nous avons utilisées jusqu'à maintenant étaient des propriétés de données.

Le second type de propriétés est quelque chose de nouveau. Ce sont les *propriétés des accesseurs*. Ce sont essentiellement des fonctions qui s'exécutent lors de la lecture d'une valeur ou son écriture, mais elles ressemblent à des propriétés classiques pour un code externe.

## Les opérateurs de lecture et d'écriture

Les propriétés des accesseurs sont représentées par les méthodes "lecture" et "écriture". Dans un objet litéral ils sont notés comme`get` et `set`:

```js
let obj = {
  *!*get propName()*/!* {
    //  opérateur de lecture, code exécuté en accédant à obj.propName
  },

  *!*set propName(value)*/!* {
    // opérateur d'écriture, code exécuté en assignant obj.propName = value
  }
};
```

L'opérateur de lecture fonctionne lors de la lecture de `obj.propName`, l'opérateur d'écriture -- lors de son affectation.

Par exemple, nous avons un objet `user` avec `name` et `surname`:

```js
let user = {
  name: "John",
  surname: "Smith"
};
```

Maintenant nous voulons ajouter une propriété `fullName`, qui serait`"John Smith"`. Bien sûr, nous ne voulons pas copier-coller l'information existante, aussi nous pouvons la créer comme accesseur:

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // John Smith
*/!*
```

De l'extérieur, une propriété d'accesseur ressemble à une propriété classique. C'est l'idée avec les propriétés des accesseurs. Nous n'utilisons pas *call* pour appeler `user.fullName` comme une fonction, nous la lisons *read* normalement: l'accesseur s'exécute en coulisses.

A partir de maintenant, `fullName` a juste un accesseur. Si nous tentons d'affecter `user.fullName=`, cela provoquera une erreur:

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // Error (property has only a getter)
*/!*
```

Corrigeons en ajoutant un opérateur d'écriture pour `user.fullName`:

```js run
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// set fullName est exécuté avec la valeur donnée.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

Le résultat obtenu est une propriété "virtuelle" `fullName`. Elle est lisible et inscriptible.

## Descripteurs de l'accesseur

Les descripteurs pour les propriétés de l'accesseur sont différents de ceux concernant les propriétés de données.

Pour les propriétés de l'accesseur, il n'y a pas de valeur `value` ou inscriptible `writable`, mais à la place il y a les fonctions `get` et `set`.

Ainsi, un descripteur d'accesseur peut avoir:

- **`get`** -- une fonction sans arguments, qui s'exécute quand une propriété est lue,
- **`set`** -- une fonction avec un argument, qui est appelée quand la propriété est écrite,
- **`enumerable`** -- identique aux propriétés de données,
- **`configurable`** -- identique aux propriétés de données.

Par exemple, pour créer un accesseur `fullName` avec `defineProperty`, nous pouvons passer un descripteur avec `get` et `set`:

```js run
let user = {
  name: "John",
  surname: "Smith"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // prénom, nom
```

Veuillez noter qu'une propriété peut être soit un accesseur (a les méthodes `get/set`) soit une propriété de donnée (a une valeur `value`), pas les deux ensemble.

Si nous essayons d'utiliser à la fois `get` et `value` dans le même descripteur, cela produira une erreur:

```js run
*!*
// Error: Invalid property descriptor.
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## Des opérateurs de lecture/écriture plus intelligents

Les opérateurs de lecture/écriture peuvent être utilisés comme des fonctions wrapper (pour appeler une ou d'autres fonctions) à la place de valeurs "réelles" d'une propriété en vue d'augmenter le contrôle des opérations.

Par exemple, si nous voulons interdire les noms trop courts pour `user`, nous pouvons avoir un opérateur d'écriture `name` et garder la valeur dans une propriété séparée `_name`:

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // Le nom est trop court...
```

Ainsi, le nom est stocké dans la propriété `_name`, et l'accès s'effectue via les opérateurs de lecture et d'écriture.

Techniquement, le code externe est capable d'accéder au nom directement en utilisant `user._name`. Mais d'après une convention largement reconnue, les propriétés commençant avec un underscore `"_"` sont internes et ne devraient pas être accessibles hors de l'objet.


## Utilisation pour la compatibilité

Une des utilisations géniales des accesseurs est qu'ils permettent de prendre le contrôle d'une propriété de données "classique" à tout moment en la remplaçant par un opérateur de lecture et d'écriture, et de modifier son comportement.

Imaginez que nous commencions à mettre en oeuvre des objets utilisateurs utilisant les propriétés de données `name` et `age`:

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

...Mais tôt ou tard, les choses peuvent changer. Au lieu de `age` nous pouvons décider de stocker `birthday`, parce que c'est plus précis et commode:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

Maintenant, que faire avec l'ancien code qui utilise encore la propriété `age`?

Nous pouvons essayer de trouver toutes les occurences et les corriger mais cela prend du temps et peut être compliqué si ce code est utilisé par beaucoup d'autres personnes. Et en plus, `age` est une bonne chose à avoir dans `user`, n'est-ce pas?

Gardons-le.

L'ajout d'un opérateur de lecture pour `age` résoud le problème:

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // l'âge est calculé à partir de la date actuelle et de l'anniversaire
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // anniversaire est disponible
alert( john.age );      // ...ainsi que l'âge
```

Maintenant l'ancien code fonctionne aussi et nous avons une chouette propriété supplémentaire.

