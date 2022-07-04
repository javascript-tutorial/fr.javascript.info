
La méthode peut prendre toutes les clés énumérables en utilisant `Object.keys` et afficher leur liste.

Pour rendre `toString` non-énumérable, définissons-le à l'aide d'un descripteur de propriété. La syntaxe de `Object.create` nous permet de fournir un objet avec des descripteurs de propriété comme second argument.

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // définir la propriété toString
    value() { // la valeur est une fonction
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple et __proto__ sont dans la boucle
for(let key in dictionary) {
  alert(key); // "apple", puis "__proto__"
}  

// liste de propriétés séparées par des virgules par toString
alert(dictionary); // "apple,__proto__"
```

Lorsque nous créons une propriété à l'aide d'un descripteur, ses indicateurs sont `false` par défaut. Donc, dans le code ci-dessus, `dictionary.toString` est non énumérable.

<<<<<<< HEAD
Voir le chapitre [](info:property-descriptors) pour revoir.
=======
See the chapter [](info:property-descriptors) for review.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f
