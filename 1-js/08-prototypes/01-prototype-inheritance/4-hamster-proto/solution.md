Examinons attentivement ce qui se passe dans l'appel `speedy.eat("apple")`.

1. La méthode `speedy.eat` se trouve dans le prototype (`=hamster`), puis exécutée avec `this=speedy` (l'objet avant le point).

2. Ensuite, `this.stomach.push()` doit trouver la propriété `stomach` et appeler `push` dessus. Il cherche `stomach` dans `this` (`=speedy`), mais rien n'est trouvé.

3. Ensuite, il suit la chaîne de prototypes et trouve `stomach` dans `hamster`.

4. Ensuite, il appelle `push` dessus, en ajoutant la nourriture dans *stomach du prototype*.

Tous les hamsters partagent donc un seul estomac!

Tant pour `lazy.stomach.push(...)` et `speedy.stomach.push()`, la propriété `stomach` se trouve dans le prototype (comme il est pas dans l'objet lui-même), alors les nouvelles données sont poussé dedans.

Veuillez noter qu'une telle chose ne se produit pas dans le cas d'une simple affectation `this.stomach=`:

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // assigner à this.stomach au lieu de this.stomach.push
    this.stomach = [food];
*/!*
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Speedy a trouvé la nourriture
speedy.eat("apple");
alert( speedy.stomach ); // apple

// L'estomac de Lazy est vide
alert( lazy.stomach ); // <rien>
```

Maintenant, tout fonctionne bien, car `this.stomach=` n'effectue pas de recherche de `stomach`. La valeur est écrite directement dans l'objet `this`.

Nous pouvons également éviter le problème en nous assurant que chaque hamster a son propre stomach :

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

let lazy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

// Speedy a trouvé la nourriture
speedy.eat("apple");
alert( speedy.stomach ); // apple

// L'estomac de Lazy est vide
alert( lazy.stomach ); // <rien>
```

En tant que solution commune, toutes les propriétés qui décrivent l'état d'un objet particulier, comme `stomach` ci-dessus, devraient être écrits dans cet objet. Cela empêche de tels problèmes.
