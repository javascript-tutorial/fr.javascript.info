# Attributs et propriétés

Lorsque le navigateur charge la page, il "lit" (un autre mot: "analyse") le code HTML et en génère des objets DOM. Pour les nœuds éléments, la plupart des attributs HTML standards deviennent automatiquement des propriétés des objets DOM.

Par exemple, si la balise est `<body id="page">`, alors l'objet DOM a `body.id="page"`.

Mais le mapping des propriétés d'attribut ne se fait pas un à un ! Dans ce chapitre, nous ferons attention à séparer ces deux notions, pour voir comment travailler avec elles, quand elles sont identiques et quand elles sont différentes.

## Propriétés DOM

Nous avons déjà vu des propriétés DOM intégrées. Il y en a beaucoup. Mais techniquement, personne ne nous limite et s'il n'y en a pas assez, nous pouvons ajouter les nôtres.

Les nœuds DOM sont des objets JavaScript normaux. Nous pouvons les modifier.

Par exemple, créons une nouvelle propriété dans `document.body` :

```js run
document.body.myData = {
  name: 'Caesar',
  title: 'Imperator'
};

alert(document.body.myData.title); // Imperator
```

Nous pouvons également ajouter une méthode :

```js run
document.body.sayTagName = function() {
  alert(this.tagName);
};

document.body.sayTagName(); // BODY (la valeur de "this" dans la méthode est document.body)
```

Nous pouvons également modifier des prototypes intégrés comme `Element.prototype` et ajouter de nouvelles méthodes à tous les éléments :

```js run
Element.prototype.sayHi = function() {
  alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY
```

Ainsi, les propriétés et méthodes DOM se comportent comme celles des objets JavaScript normaux :

- Ils peuvent avoir n'importe quelle valeur.
- Ils sont sensibles à la casse (écrivez `elem.nodeType`, pas `elem.NoDeTyPe`).

## Attributs HTML

En HTML, les balises peuvent avoir des attributs. Lorsque le navigateur analyse le code HTML pour créer des objets DOM pour les balises, il reconnaît les attributs * standard * et crée des propriétés DOM à partir d'elles.

Ainsi, lorsqu'un élément a `id` ou un autre attribut *standard*, la propriété correspondante est créée. Mais cela ne se produit pas si l'attribut n'est pas standard.

Par exemple :
```html run
<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
*!*
    // l'attribut non standard ne donne pas de propriété
    alert(document.body.something); // undefined
*/!*
  </script>
</body>
```

Veuillez noter qu'un attribut standard pour un élément peut être inconnu pour un autre. Par exemple, `"type"` est standard pour `<input>` ([HTMLInputElement](https://html.spec.whatwg.org/#htmlinputelement)), mais pas pour `<body>` ([HTMLBodyElement](https://html.spec.whatwg.org/#htmlbodyelement)). Les attributs standard sont décrits dans la spécification de la classe d'élément correspondante.

Ici, nous pouvons le voir :
```html run
<body id="body" type="...">
  <input id="input" type="text">
  <script>
    alert(input.type); // text
*!*
    alert(body.type); // undefined: Propriété DOM non créée, car non standard
*/!*
  </script>
</body>
```

Donc, si un attribut n'est pas standard, il n'y aura pas de propriété DOM pour lui. Existe-t-il un moyen d'accéder à ces attributs ?

Bien sûr, tous les attributs sont accessibles en utilisant les méthodes suivantes :

- `elem.hasAttribute(name)` -- vérifie l'existence.
- `elem.getAttribute(name)` -- obtient la valeur.
- `elem.setAttribute(name, value)` -- définit la valeur.
- `elem.removeAttribute(name)` -- supprime l'attribut.

Ces méthodes fonctionnent exactement avec ce qui est écrit en HTML.

On peut aussi lire tous les attributs en utilisant `elem.attributes` : une collection d'objets qui appartiennent à une classe intégrée [Attr](https://dom.spec.whatwg.org/#attr),avec `name` et la propriété `value`.

Voici une démonstration de la lecture d'une propriété non standard :

```html run
<body something="non-standard">
  <script>
*!*
    alert(document.body.getAttribute('something')); // non-standard
*/!*
  </script>
</body>
```

Les attributs HTML ont les fonctionnalités suivantes :

- Leur nom est insensible à la casse (`id` est identique à` ID`).
- Leurs valeurs sont toujours des chaînes de caractères.

Voici une démonstration détaillée de l'utilisation des attributs :

```html run
<body>
  <div id="elem" about="Elephant"></div>

  <script>
    alert( elem.getAttribute('About') ); // (1) 'Elephant', lecture

    elem.setAttribute('Test', 123); // (2), écriture

    alert( elem.outerHTML ); // (3), voir si l'attribut est en HTML (oui)

    for (let attr of elem.attributes) { // (4) lister tout
      alert( `${attr.name} = ${attr.value}` );
    }
  </script>
</body>
```

Veuillez noter :

1. `getAttribute('About')` -- la première lettre est en majuscules ici, et en HTML tout est en minuscules. Mais cela n'a pas d'importance: les noms d'attribut ne sont pas sensibles à la casse.
2. Nous pouvons assigner n'importe quoi à un attribut, mais il devient une chaîne. Nous avons donc ici `"123"` comme valeur.
3. Tous les attributs, y compris ceux que nous définissons, sont visibles dans `outerHTML`.
4. La collection `attributes` est itérable et possède tous les attributs de l'élément (standard et non standard) en tant qu'objets avec les propriétés `name` et `value`.

## Synchronisation des attributs de propriété

Lorsqu'un attribut standard change, la propriété correspondante est automatiquement mise à jour et (à quelques exceptions près) vice versa.

Dans l'exemple ci-dessous, `id` est modifié en tant qu'attribut, et nous pouvons également voir la propriété modifiée. Et puis la même chose à l'envers :

```html run
<input>

<script>
  let input = document.querySelector('input');

  // attribute => property
  input.setAttribute('id', 'id');
  alert(input.id); // id (mis à jour)

  // property => attribute
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId (mis à jour)
</script>
```

Mais il y a des exclusions, par exemple `input.value` se synchronise uniquement de l'attribut -> vers la propriété, mais pas dans l'autre sens :

```html run
<input>

<script>
  let input = document.querySelector('input');

  // attribute => property
  input.setAttribute('value', 'text');
  alert(input.value); // text

*!*
  // NOT property => attribute
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text (non mis à jour !)
*/!*
</script>
```

Dans l'exemple ci-dessus :
- La modification de l'attribut `value` met à jour la propriété.
- Mais le changement de propriété n'affecte pas l'attribut.

Cette "fonctionnalité" peut en fait être utile, car les actions de l'utilisateur peuvent entraîner des changements de `value`, puis après cela, si nous voulons récupérer la valeur "d'origine" du HTML, c'est dans l'attribut.

## Les propriétés DOM sont typées

Les propriétés DOM ne sont pas toujours des chaînes de caractères. Par exemple, la propriété `input.checked` (pour les cases à cocher) est un booléen :

```html run
<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // la valeur d'attribut est une chaîne de caractères vide
  alert(input.checked); // la valeur de la propriété est : true
</script>
```

Il y a d'autres exemples. L'attribut `style` est une chaîne de caractères, mais la propriété `style` est un objet :

```html run
<div id="div" style="color:red;font-size:120%">Hello</div>

<script>
  // string
  alert(div.getAttribute('style')); // color:red;font-size:120%

  // object
  alert(div.style); // [object CSSStyleDeclaration]
  alert(div.style.color); // red
</script>
```

Cependant la plupart des propriétés sont des chaînes de caractères.

Très rarement, même si un type de propriété DOM est une chaîne de caractères, il peut différer de l'attribut. Par exemple, la propriété DOM `href` est toujours une URL *complète*, même si l'attribut contient une URL relative ou juste un `#hash`.

Voici un exemple :

```html height=30 run
<a id="a" href="#hello">link</a>
<script>
  // attribute
  alert(a.getAttribute('href')); // #hello

  // property
  alert(a.href ); // full URL in the form http://site.com/page#hello
</script>
```

Si nous avons besoin de la valeur de `href` ou de tout autre attribut exactement comme écrit dans le HTML, nous pouvons utiliser `getAttribute`.


## Attributs non standard, dataset

Lors de l'écriture HTML, nous utilisons beaucoup d'attributs standard. Mais qu'en est-il des modèles non standard et personnalisés ? Voyons d'abord s'ils sont utiles ou non? Pourquoi ?

Parfois, des attributs non standard sont utilisés pour transmettre des données personnalisées de HTML à JavaScript ou pour "marquer" des éléments HTML pour JavaScript.

Comme ceci :

```html run
<!-- mark the div to show "name" here -->
<div *!*show-info="name"*/!*></div>
<!-- and age here -->
<div *!*show-info="age"*/!*></div>

<script>
  // le code trouve un élément avec la marque et montre ce qui est demandé
  let user = {
    name: "Pete",
    age: 25
  };

  for(let div of document.querySelectorAll('[show-info]')) {
    // insert the corresponding info into the field
    let field = div.getAttribute('show-info');
    div.innerHTML = user[field]; // d'abord Pete dans "name", puis 25 dans "age"
  }
</script>
```

Ils peuvent également être utilisés pour styliser un élément.

Par exemple, ici pour la commande de l'état de l'attribut, `order-state` est utilisé :

```html run
<style>
  /* les styles reposent sur l'attribut personnalisé "order-state" */
  .order[order-state="new"] {
    color: green;
  }

  .order[order-state="pending"] {
    color: blue;
  }

  .order[order-state="canceled"] {
    color: red;
  }
</style>

<div class="order" order-state="new">
  A new order.
</div>

<div class="order" order-state="pending">
  A pending order.
</div>

<div class="order" order-state="canceled">
  A canceled order.
</div>
```

Pourquoi l'utilisation d'un attribut serait-elle préférable à des classes comme `.order-state-new`, `.order-state-pending`, `order-state-canceled` ?

Parce qu'un attribut est plus pratique à gérer. L'état peut être changé aussi facilement que :

```js
// un peu plus simple que de supprimer l'ancienne / ajouter une nouvelle classe
div.setAttribute('order-state', 'canceled');
```

Mais il peut y avoir un problème possible avec les attributs personnalisés. Que se passe-t-il si nous utilisons un attribut non standard selon nos besoins et que plus tard le standard l'introduit et lui fait faire quelque chose ? Le langage HTML est vivant, il grandit et de plus en plus d'attributs semblent répondre aux besoins des développeurs. Il peut y avoir des effets inattendus dans ce cas.

Pour éviter les conflits, il existe les attributs [data-*](https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes).

**Tous les attributs commençant par "data-" sont réservés à l'usage des programmeurs. Ils sont disponibles dans la propriété `dataset`.**

Par exemple, si un `elem` a un attribut nommé `"data-about"`, il est disponible en tant que `elem.dataset.about`.

Comme ceci :

```html run
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
```

Les attributs de plusieurs mots comme `data-order-state` deviennent camel-cased : `dataset.orderState`.

Voici un exemple d'"order state" réécrit :

```html run
<style>
  .order[data-order-state="new"] {
    color: green;
  }

  .order[data-order-state="pending"] {
    color: blue;
  }

  .order[data-order-state="canceled"] {
    color: red;
  }
</style>

<div id="order" class="order" data-order-state="new">
  A new order.
</div>

<script>
  // read
  alert(order.dataset.orderState); // new

  // modify
  order.dataset.orderState = "pending"; // (*)
</script>
```

L'utilisation des attributs `data- *` est un moyen valide et sûr de transmettre des données personnalisées.

Veuillez noter que nous pouvons non seulement lire, mais également modifier les attributs de données. Ensuite, CSS met à jour la vue en conséquence : dans l'exemple ci-dessus, la dernière ligne `(*)` change la couleur en bleu.

## Résumé

- Les attributs - sont ce qui est écrit en HTML.
- Les propriétés - sont ce qui se trouve dans les objets DOM.

Une petite comparaison :

|      | Propriétés                                                                                    | Attributs                            |
|------|-----------------------------------------------------------------------------------------------|--------------------------------------|
| Type | N'importe quelle valeur, les propriétés standards ont des types décrits dans la spécification | Une chaîne de caractères             |
| Nom  | Le nom est sensible à la casse                                                                | Le nom n'est pas sensible à la casse |

Les méthodes de travail avec les attributs sont les suivantes :

- `elem.hasAttribute(name)` -- pour vérifier l'existence.
- `elem.getAttribute(name)` -- pour obtenir la valeur.
- `elem.setAttribute(name, value)` -- pour définir la valeur.
- `elem.removeAttribute(name)` -- pour supprimer l'attribut.
- `elem.attributes` est une collection de tous les attributs.

Pour la plupart des situations, l'utilisation des propriétés DOM est préférable. Nous devons nous référer aux attributs uniquement lorsque les propriétés DOM ne nous conviennent pas, lorsque nous avons besoin exactement d'attributs, par exemple :

- Nous avons besoin d'un attribut non standard. Mais s'il commence par `data-`, alors nous devrions utiliser `dataset`.
- Nous voulons lire la valeur "telle qu'elle est écrite" en HTML. La valeur de la propriété DOM peut être différente, par exemple la propriété `href` est toujours une URL complète, et nous pouvons vouloir obtenir la valeur "originale".
