importance: 5

---

# Ajouter toString au dictionnaire

Il existe un objet `dictionary`, créé en tant que `Object.create(null)`, pour stocker toutes les paires `clé`/`valeur`.

Ajoutez la méthode `dictionary.toString()`, qui devrait renvoyer une liste de clés délimitée par des virgules. Votre `toString` ne devrait pas apparaître dans la boucle `for..in` sur l'objet.

Voici comment cela devrait fonctionner :

```js
let dictionary = Object.create(null);

*!*
// votre code pour ajouter la méthode dictionary.toString
*/!*

// add some data
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ est une clé de propriété régulière ici

// seulement apple et __proto__ sont dans la boucle
for(let key in dictionary) {
  alert(key); // "apple", puis "__proto__"
}

// votre toString en action
alert(dictionary); // "apple,__proto__"
```
