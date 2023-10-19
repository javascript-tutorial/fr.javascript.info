
# Getters et Setters de propriété

Il y a deux sortes de proriétés d'objet.

Le premier type est *les propriétés de données*. Nous savons déjà comment travaillez avec. Toutes les propriétés que nous avons utilisé jusqu'à maintenant étaient des propriétés de données.

Le second type de propriété est quelque chose de nouveau. C'est un accesseur de propriété. Ce sont essentiellement des fonctions qui exécute une récupération ou une déclaration de valeur, mais qui ressemblent à une propriété normale pour le code extérieur.

## Getters et Setters

Les accesseurs de propriétés sont représentés par des méthodes "getter" et "setter". Dans un objet littéral elles se demarquent par `get` et `set` :

```js
let obj = {
  *!*get propName()*/!* {
    // Getter, le code va récupérer obj.propName
  },

  *!*set propName(value)*/!* {
    // Setter, le code va définir obj.propName = value
  }
};
```

Le getter sert quand `obj.propName` est lu, le setter -- quand c'est assigné.

Par exemple, nous avons un objet `user` avec `name` et `surname` :

```js
let user = {
  name: "John",
  surname: "Smith"
};
```

Maintenant nous voulons ajouter une propriété `fullName`, qui devrait être `"John Smith"`. Bien sûr, nous ne voulons pas copier-coller l'information existante, donc nous pouvons implementer un accesseur :

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

De l'extérieur, un accesseur de propriété ressemble à une propriété normale. C'est l'idée d'un accesseur. Nous n'*appellons* pas `user.fullName` comme une fonction, nous la *lisons* normallement : le getter agit sans le faire savoir.

Pour l'instant, `fullName` n'a qu'un getter. Si nous essayions d'assigner `user.fullName=`, il y aura une erreur :

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // Erreur (la propriété n'a qu'un getter)
*/!*
```

Corrigeons cela en ajoutant un setter pour `user.fullName` :


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

// Le setter est exécuté avec la valeur donnée.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

Comme résultat, nous avons une propriété "virtuelle" `fullName`. Elle est lisible et ecrivable.

## Descripteurs d'accesseur

Les descripteurs d'accesseur de propriété sont différents de ceux pour les propriété de données.

Pour les accesseurs de propriétés, il n'y a pas de `value` ou `writable`, à la place il y a les fonctions `get` et `set`.

Un descripteur d'accesseur peut avoir :

- **`get`** -- une fonction sans arguments, pour la lecture de propriété,
- **`set`** -- une fonction avec un argument, qui est appelée lorsque la propriété change de valeur,
- **`enumerable`** -- identique aux propriétés de données
- **`configurable`** -- identique aux propriétés de données

Par exemple, pour créer un accesseur `fullName` avec `defineProperty`, on peut passer un descripteur avec `get` et `set` :

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

for(let key in user) alert(key); // name, surname
```

Veuillez notez qu'une propriété peut être soit un accesseur (qui a les méthodes `get/set`) ou une propriété de donnes (qui a `value`), pas les deux.

Si nous essayons de fournir les deux `get` and `value` dans le même descripteur, il y aura une erreur :

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

## Des getters/setters plus intelligent

Les Getters/setters peuvent être utilisés comme des enveloppes autour des "réelles" valeurs de propriété pour gagner plus de contrôles sur leurs opérations.

Par exemple, si nous voulons interdire les noms trop court pour `user`, nous pouvons avoir un setter `name` and garder la valeur dans une propriété séparée `_name` :

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

Donc, le nom est stocké dans la propriété `_name`, et l'accés est fait par le getter et le setter.

Techniquement, le code extérieur est capable d'accéder directement à la propriété en utilisant `user._name`. Mais il y une convention très connue selon laquelle les propriétés commençant par un underscore `"_"` sont internes et ne devraient pas être touché depuis l'extérieur des objets.