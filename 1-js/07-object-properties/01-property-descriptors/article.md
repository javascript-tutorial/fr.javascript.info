
# Attributs et descripteurs de propriétés

Comme nous le savons, les objets peuvent stocker des propriétés.

Jusqu'à présent, une propriété était pour nous une simple paire "clé-valeur". Mais une propriété d'objet est en réalité une chose plus flexible et plus puissante.

Dans ce chapitre, nous étudierons des options de configuration supplémentaires et, dans le prochain, nous verrons comment les transformer de manière invisible en fonctions de accesseur / mutateur.

## Attributs de propriétés

Les propriétés des objets, outre que **`valeur`**, ont trois attributs spéciaux (appelés drapeaux, ou "flags" en anglais):

- **`writable`** -- si `true`, la valeur peut être changée, sinon c'est en lecture seule.
- **`enumerable`** -- si `true`, alors listé dans les boucles, sinon non listé.
- **`configurable`** -- si `true`, la propriété peut être supprimée et ces attributs peuvent être modifiés, sinon non.

Nous ne les avons pas encore vues, car généralement elles ne se présentent pas. Lorsque nous créons une propriété "de la manière habituelle", ils sont tous `true`. Mais nous pouvons aussi les changer à tout moment.

Voyons d’abord comment obtenir ces "flags".

La methode [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/getOwnPropertyDescriptor) permet d'interroger les informations *complètes* sur une propriété.

La syntaxe est la suivante:
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: L'objet à partir duquel obtenir des informations.

`propertyName`
: Le nom de la propriété.

La valeur renvoyée est un objet dit "descripteur de propriété": il contient la valeur et tous les descripteurs.

Par exemple:

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

Pour changer les attributs, on peut utiliser [Object.defineProperty](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/defineProperty).

La syntaxe est la suivante:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
: L'objet et sa propriété pour appliquer le descripteur.

`descriptor`
: Descripteur de propriété d'objet à appliquer.

Si la propriété existe, `defineProperty` met à jour ses attributs. Sinon, il crée la propriété avec la valeur et les descripteurs donnés. Dans ce cas, si aucun drapeau n'est fourni, il est supposé `false`.

Par exemple, ici, une propriété `name` est créée avec tous les attributs falsy:

```js run
let user = {};

*!*
Object.defineProperty(user, "name", {
value: "John"
});
*/!*

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
"value": "John",
*!*
"writable": false,
"enumerable": false,
"configurable": false
*/!*
}
*/
```

Comparez-le avec `user.name` "normalement créé" ci-dessus: maintenant tous les attributs sont falsy. Si ce n'est pas ce que nous voulons, nous ferions mieux de leur attribuer la valeur `true` dans `descriptor`.

Voyons maintenant les effets des attributs par exemple.

## Lecture seule

Rendons `user.name` en lecture seule (ne peut pas être réaffecté) en modifiant l'indicateur `writeable` :

```js run
let user = {
name: "John"
};

Object.defineProperty(user, "name", {
*!*
writable: false
*/!*
});

*!*
user.name = "Pete"; // Error: Cannot assign to read only property 'name'
*/!*
```

Maintenant, personne ne peut changer le nom de notre utilisateur, à moins qu’ils appliquent leur propre `defineProperty` pour remplacer le nôtre.

```smart header="Les erreurs apparaissent uniquement en mode strict"
En mode non strict, aucune erreur ne se produit lors de l'écriture dans les propriétés en lecture seule, etc. Mais l'opération ne réussira toujours pas. Les actions qui violent les dexcripteurs sont simplement ignorées en mode non strict.
```

Voici le même exemple, mais la propriété est créée à partir de zéro:

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
value: "John",
// pour les nouvelles propriétés, nous devons lister explicitement ce qui est vrai
enumerable: true,
configurable: true
*/!*
});

alert(user.name); // John
user.name = "Pete"; // Error
```

## Non énumérable

Ajoutons maintenant un `toString` personnalisé à `user`.

Normalement, un `toString` intégré pour les objets n'est pas énumérable, il n'apparaît pas dans `for..in`. Mais si nous ajoutons notre propre `toString`, alors, par défaut, il apparaît dans `for..in`, comme ceci:

```js run
let user = {
name: "John",
toString() {
  return this.name;
}
};

// Par défaut, nos deux propriétés sont répertoriées:
for (let key in user) alert(key); // name, toString
```

Si nous n'aimons pas cela, alors nous pouvons définir `enumerable: false`. Ensuite, il n'apparaîtra pas dans la boucle `for..in`, comme dans la boucle intégrée :

```js run
let user = {
name: "John",
toString() {
  return this.name;
}
};

Object.defineProperty(user, "toString", {
*!*
enumerable: false
*/!*
});

*!*
// Maintenant notre toString disparaît:
*/!*
for (let key in user) alert(key); // name
```

Les propriétés non énumérables sont également exclues de `Object.keys`:

```js
alert(Object.keys(user)); // name
```

## Non configurable

Le descripteur non configurable (`configurable: false`) est parfois prédéfini pour les objets et propriétés intégrés.

Une propriété non configurable ne peut pas être supprimée.

Par exemple, `Math.PI` est en lecture seule, non énumérable et non configurable :

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
"value": 3.141592653589793,
"writable": false,
"enumerable": false,
"configurable": false
}
*/
```
Ainsi, un programmeur est incapable de changer la valeur de `Math.PI` ou de le remplacer.

```js run
Math.PI = 3; // Error

// supprimer Math.PI ne fonctionnera pas non plus
```

Rendre une propriété non configurable est une route à sens unique. Nous ne pouvons pas la rétablir avec  `defineProperty`. 

Pour être précis, la non-configurabilité impose plusieurs restrictions à `defineProperty` :
1. Impossible de changer le flag `configurable`.
2. Impossible de changer le drapeau `enumerable`.
3. Impossible de changer `writable: false` à `true` (l'inverse fonctionne).
4. Impossible de changer `get/set` pour une propriété d'accesseur (mais peut les affecter en cas d'absence).

Ici, nous faisons de `user.name` une constante "scellée pour toujours":

```js run
let user = { };

Object.defineProperty(user, "name", {
value: "John",
writable: false,
configurable: false
});

*!*
// ont ne pourra pas changer user.name ou ses descripteurs
// tout cela ne marchera pas:
//   user.name = "Pete"
//   delete user.name
//   defineProperty(user, "name", { value: "Pete" })
Object.defineProperty(user, "name", {writable: true}); // Error
*/!*
```

```smart header="\"Non-configurable\" doesn't mean \"non-writable\""
Notable exception: a value of non-configurable, but writable property can be changed.

The idea of `configurable: false` is to prevent changes to property flags and its deletion, not changes to its value.
```

## Object.defineProperties

Il y a une méthode [Object.defineProperties(obj, descriptors)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/defineProperties) qui permet de définir plusieurs propriétés à la fois.

La syntaxe est la suivante:

```js
Object.defineProperties(obj, {
prop1: descriptor1,
prop2: descriptor2
// ...
});
```

Par exemple:

```js
Object.defineProperties(user, {
name: { value: "John", writable: false },
surname: { value: "Smith", writable: false },
// ...
});
```

Nous pouvons donc définir plusieurs propriétés à la fois.

## Object.getOwnPropertyDescriptors

Pour obtenir tous les descripteurs de propriété à la fois, nous pouvons utiliser la méthode [Object.getOwnPropertyDescriptors(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/getOwnPropertyDescriptors).

Avec `Object.defineProperties`, elle peut être utilisé comme moyen de cloner un objet conscient des attributs:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

Normalement, lorsque nous clonons un objet, nous utilisons une affectation pour copier les propriétés, comme ceci:

```js
for (let key in user) {
clone[key] = user[key]
}
```

...Mais cela ne copie pas les attributs. Donc, si nous voulons un "meilleur" clone, alors `Object.defineProperties` est préféré.

Une autre différence est que `for..in` ignore les propriétés symboliques, mais que `Object.getOwnPropertyDescriptors` renvoie *tous* les descripteurs de propriété, y compris les descripteurs symboliques.

## Sceller un objet globalement

Les descripteurs de propriété fonctionnent au niveau des propriétés individuelles.

Il existe également des méthodes qui limitent l'accès à l'objet *entier*:

[Object.preventExtensions(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/preventExtensions)
: Interdit l'ajout de nouvelles propriétés à l'objet.

[Object.seal(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/seal)
: Interdit l'ajout/la suppression de propriétés. Définit `configurable: false` pour toutes les propriétés existantes.

[Object.freeze(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/freeze)
: Interdit l'ajout/la suppression/la modification de propriétés. Définit `configurable: false, writeable: false` pour toutes les propriétés existantes.

Et aussi il y a des tests pour eux:

[Object.isExtensible(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/isExtensible)
: Retourne `false` si l'ajout de propriétés est interdit, sinon `true`.

[Object.isSealed(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/isSealed)
: Renvoie `true` si l'ajout/la suppression de propriétés est interdite et que toutes les propriétés existantes ont `configurable: false`.

[Object.isFrozen(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/isFrozen)
: Retourne `true` si l'ajout/la suppression/la modification de propriétés est interdite et si toutes les propriétés actuelles sont `configurable: false, writable: false`.

Ces méthodes sont rarement utilisées dans la pratique.
