
Nous pouvons voir à quelle classe il appartient en le sortant, comme :

```js run
alert(document); // [object HTMLDocument]
```

Ou :

```js run
alert(document.constructor.name); // HTMLDocument
```

Ainsi, `document` est une instance de la classe `HTMLDocument`.

Quelle est sa place dans la hiérarchie ?

Oui, nous pourrions parcourir les spécifications, mais il serait plus rapide de le déterminer manuellement.

Parcourons la chaîne du prototype via `__proto__`.

Comme nous le savons, les méthodes d'une classe sont dans le `prototype` du constructeur. Par exemple, `HTMLDocument.prototype` a des méthodes pour les documents.

De plus, il y a une référence à la fonction constructeur à l'intérieur du `prototype` :

```js run
alert(HTMLDocument.prototype.constructor === HTMLDocument); // true
```

Pour obtenir le nom de la classe sous forme de chaîne de caractères, nous pouvons utiliser `constructor.name`. Faisons-le pour toute la chaîne du prototype de `document`, jusqu'à la classe` Node`:

```js run
alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node
```

Voilà la hiérarchie.

Nous pourrions également examiner l'objet en utilisant `console.dir(document)` et voir ces noms en ouvrant `__proto__`. La console les prend du constructeur en interne.
