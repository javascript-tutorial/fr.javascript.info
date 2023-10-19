
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