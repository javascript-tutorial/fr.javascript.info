# Les références d'objet et leur copie

Une des différences fondamentale des objets avec les primitives est que ceux-ci sont stockés et copiés "par référence", en opposition des valeurs primitives : strings, numbers, booleans, etc. -- qui sont toujours copiés comme "valeur entière".

On comprendra plus facilement en regardant "sous le capot" ce qui se passe lorsque nous copions une valeure.

Commençons avec une primitive, comme une chaîne de caractères.

Ici nous assignons une copie de `message` dans `phrase` :

```js
let message = "Hello!";
let phrase = message;
```

Il en résulte deux variables indépendantes, chacune stockant la chaîne de caractères `"Hello!"`.

![](variable-copy-value.svg)

Un résultat plutôt évident n'est-ce pas ?

Les objets ne fonctionnent pas comme cela.

**Une variable assignée à un objet ne stocke pas l'objet lui-même, mais son "adresse en mémoire", en d'autres termes "une référence" à celui-ci.**

Prenons un exemple d'une telle variable :

```js
let user = {
  name: "John"
};
```

Et ici comment elle est stockée en mémoire :

![](variable-contains-reference.svg)

L'objet est stocké quelque part dans la mémoire (du coté droit de l'image), tandis que la variable `user` (du coté gauche) a une référence à celui-ci.

On peut imaginer la variable d'objet, ici `user`, comme une feuille de papier avec l'adresse de l'objet écrit dessus.

Lorque l'on réalise une action avec l'objet, par exemple récupérer la propriété `user.name`, le moteur de JavaScript regarde à l'adresse et réalise l'opération sur l'objet actuel.

Et voilà pourquoi cela est important.

**Lorsqu'une variable d'objet est copiée -- la référence est copiée, l'objet lui-même n'est pas dupliqué.**

Par exemple:

```js no-beautify
let user = { name: "John" };

let admin = user; // copie la référence
```

Maintenant nous avons deux variables, chacune avec la référence vers le même objet :

![](variable-copy-reference.svg)

Comme vous pouvez le voir, il n'y a toujours qu'un seul objet, mais maintenant avec deux variables qui le référence.

On peut utiliser n'importe quelle variable pour accéder à l'objet et modifier son contenu :

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // changé par la référence "admin"
*/!*

alert(*!*user.name*/!*); // 'Pete', les changements sont visibles sur la référence "user"
```

C'est comme si nous avions une armoire avec deux clés et que nous en utilisions une (`admin`) pour y entrer et y apporter des modifications. Ensuite, si nous utilisons plus tard une autre clé (`user`), nous ouvrons toujours la même armoire et pouvons accéder au contenu modifié.

## Comparaison par référence

Deux objets sont égaux seulement s'ils sont le même objet.

Par exemple, ici `a` et `b` référencent le même objet, aussi sont-ils similaires :

```js run
let a = {};
let b = a; // copie la référence

alert( a == b ); // true, les deux variables référencent le même objet
alert( a === b ); // true
```

Et ici deux objets indépendants ne sont pas égaux, même s'ils se ressemblent (les deux sont vides) :

```js run
let a = {};
let b = {}; // 2 objets indépendants

alert( a == b ); // false
```

Pour des comparaisons comme `obj1 > obj2` ou des comparaisons avec une primitive `obj == 5`, les objets sont convertis en primitives. Nous étudierons comment les conversions d'objets fonctionnent très bientôt, mais pour dire la vérité, de telles comparaisons sont rarement nécessaires, en général elles sont le résultat d'une erreur de programmation.

````smart header="Les objets const peuvent être modifiés"
Un effet secondaire important du stockage des objets en tant que références est qu'un objet déclaré comme `const` *peut* être modifié.

Par exemgle :

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

Il peut sembler que la ligne `(*)` causerait une erreur, mais ce n'est pas le cas. La valeur de `user` est constante, elle doit toujours référencer le même objet, mais les propriétés de cet objet sont libres de changer.

En d'autres termes, `const user` donne une erreur uniquement si nous essayons de définir `user=...` dans son ensemble.

Cela dit, si nous avons vraiment besoin de créer des propriétés d'objet constantes, c'est également possible, mais en utilisant des méthodes totalement différentes. Nous le mentionnerons dans le chapitre <info:property-descriptors>.
````

## Clonage et fusion, Object.assign [#cloning-and-merging-object-assign]

Copier une variable object créé une référence en plus vers le même objet.

Mais que se passe-t-il si nous devons dupliquer un objet ?

Nous pouvons créer un nouvel objet et reproduire la structure de l'existant, en itérant sur ses propriétés et en les copiant au niveau primitif.

Comme cela :

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // le nouvel object vide

// on copie toutes les propritétés de user
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// maintenant clone est un objet complétement indépendant avec le même contenu
clone.name = "Pete"; // On change les données de celui-ci

alert( user.name ); // c'est toujour John dans l'objet copié
```

On peut aussi utiliser la méthode [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) pour cela.


La syntaxe est :

```js
Object.assign(dest, ...sources)
```

- Le premier argument `dest` est l'objet cible
- Les autres arguments sont une liste d'objets source.

Il copie les propriétés de tous les objets sources dans la cible `dest`, puis les renvoie comme résultat.

Par exemple, nous avons l'objet `user`, ajoutons-lui quelques autorisations :

```js run
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copie toutes les propriétés de permissions1 et 2 dans user
Object.assign(user, permissions1, permissions2);
*/!*

// now user = { name: "John", canView: true, canEdit: true }
alert(user.name); // John
alert(user.canView); // true
alert(user.canEdit); // true
```

Si la propriété copiée existe déja, elle est écrasée.

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // on a user = { name: "Pete" }
```

Nous pouvons également utiliser `Object.assign` pour effectuer un simple clonage d'objet :

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*

alert(clone.name); // John
alert(clone.age); // 30
```

Ici cela copie toutes les propriétés de `user` dans l'objet vide et le retourne.

Il existe également d'autres méthodes de clonage d'un objet, par ex. en utilisant la [syntaxe spread](info:rest-parameters-spread) `clone = {...user}`, abordé plus loin dans le tutoriel.

## Clonage imbriqué

Jusqu'à maintenant on suppose que toutes les propriétés de `user` sont des primitives. Mais les propriétés peuvent être des références vers d'autres objets. Comment gérer ces cas-là ?

Comme ceci :
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Ce n'est plus suffisant de copier `clone.sizes = user.sizes`, car `user.sizes` est un objet, il sera copié par référence. Donc `clone` et `user` partageront le même objet `sizes` :


```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, c'est le même objet

// user et clone partage l'objet sizes
user.sizes.width = 60;    // changer une propriété d'un endroit
alert(clone.sizes.width); // 60, obtenir le résultat de l'autre
```

Pour résoudre ce problème et faire en sorte que `user` et `clone` soient des objets véritablement séparés, nous devrions utiliser une boucle de clonage qui examine chaque valeur de `user[key]` et, s'il s'agit d'un objet, répliquer également sa structure. C'est ce qu'on appelle un « clonage profond » ou « clonage structuré ». Il existe une méthode [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) qui implémente le clonage en profondeur.


### structuredClone

L'appel `structuredClone(object)` clone l'`object` avec toutes les propriétés imbriquées.

Voici comment nous pouvons l'utiliser dans notre exemple :

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

*!*
let clone = structuredClone(user);
*/!*

alert( user.sizes === clone.sizes ); // false, c'est un objet différent

// user et clone n'ont plus aucun lien entre eux
user.sizes.width = 60;    // changer une propriété d'un endroit
alert(clone.sizes.width); // 50, sans lien
```

La méthode `structuredClone` peut cloner la plupart des types de données, tels que des objets, des tableaux, des valeurs primitives.

Il prend également en charge les références circulaires, lorsqu'une propriété d'objet fait référence à l'objet lui-même (directement ou via une chaîne ou des références).

Par exemple :

```js run
let user = {};
// créons une référence circulaire :
// user.me fait référence à l'utilisateur lui-même
user.me = user;

let clone = structuredClone(user);
alert(clone.me === clone); // true
```

Comme vous pouvez le voir, `clone.me` fait référence au `clone`, pas à `user` ! Ainsi, la référence circulaire a également été clonée correctement.

Cependant, il existe des cas où `structuredClone` échoue.

Par exemple, lorsqu'un objet a une propriété de fonction :

```js run
// error
structuredClone({
  f: function() {}
});
```

Les propriétés de fonction ne sont pas prises en charge.

Pour gérer des cas aussi complexes, nous devrons peut-être utiliser une combinaison de méthodes de clonage, écrire du code personnalisé ou, pour ne pas réinventer la roue, prendre une implémentation existante, par exemple [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) de la bibliothèque JavaScript [lodash](https://lodash.com).

## Résumé

Les objets sont assignés et copiés par référence. En d'autres termes, une variable ne stocke pas la "valeur de l'objet" mais la "référence" (l'adresse en mémoire) de la valeur. Donc copier cette variable, ou la passer en argument d'une fonction, copie la référence, pas l'objet lui-même.

Toutes les opérations faites par une copie de la référence (comme ajouter/supprimer une propriété) sont faites sur le même objet.

Pour faire une "copie réelle" (un clone), nous pouvons utiliser `Object.assign` pour la soi-disant "copie superficielle" (les objets imbriqués sont copiés par référence) ou une fonction de "clonage en profondeur" `structuredClone` ou utiliser une implementation personnalisée de clonage, telle que [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
