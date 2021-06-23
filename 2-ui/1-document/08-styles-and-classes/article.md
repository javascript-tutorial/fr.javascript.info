# Styles et classes

Avant d'entrer dans les méthodes que JavaScript utilise pour traiter les styles et classes, voici une règle importante. Elle devrait être assez évidente, mais nous devons encore la mentionner.

Il y a, en général, deux façons de styliser un élément:

1. Créer une classe dans CSS et l'ajouter: `<div class="...">`
2. Écrire les propriétés directement dans `style`: `<div style="...">`.

JavaScript peut modifier les classes et les propriétés de `style`.

Nous devons toujours favoriser l'utilisation des classes CSS plutôt que `style`. Ce dernier devrait seulement être utilisé si les classes sont incapables d'effectuer la tâche requise.

Par exemple, `style` est acceptable si nous calculons les coordonnées d'un élément dynamiquement et souhaitons les définir à partir de JavaScript, comme ceci:

```js
let top = /* calculs complexes */;
let left = /* calculs complexes */;

elem.style.left = left; // par ex. '123px', calculé lors de l'exécution
elem.style.top = top; // par ex. '456px'
```

Pour les autres cas, comme rendre le texte rouge, ajouter une icône d'arrière-plan -- décrivez cela dans CSS et ensuite ajoutez la classe (JavaScript peut effectuer ceci). C'est plus flexible et plus facile à gérer.

## className et classList

Changer une classe est l'une des actions les plus utilisées dans les scripts.

Autrefois, il existait une limitation dans JavaScript: un mot réservé comme `"class"` ne pouvait pas être une propriété d'un object. Cette limitation n'existe plus maintenant, mais à l'époque, il était impossible d'avoir une propriété de `"class"`, comme `elem.class`.

Alors pour les classes, une propriété similaire, `"className"`, a été introduite: `elem.className` correspond à l'attribut `"class"`.

Prenons, par example:

```html run
<body class="page d'accueil">
  <script>
    alert(document.body.className); // page d'accueil
  </script>
</body>
```

Si nous attribuons quelque chose à `elem.className`, elle remplace la chaîne entière de classes. Parfois c'est ce que nous avons besoin, mais souvent, nous voulons seulement ajouter ou enlever une classe.

Il y a une autre propriété pour ce besoin: `elem.classList`.

`elem.classList` est un objet spécial avec des méthodes pour `add/remove/toggle` une seule classe.

Prenons, par exemple:

```html run
<body class="page d'accueil">
  <script>
*!*
    // ajouter une classe
    document.body.classList.add('article');
*/!*

    alert(document.body.className); // l'article de la page d'accueil
  </script>
</body>
```

Alors nous pouvons opérer avec la chaîne de toutes les classes en utilisant `className` ou avec les classes individuelles en utilisant `classList`. Ce que nous choisissons dépend de nos besoins.

Méthodes de `classList`:

- `elem.classList.add/remove("class")` -- ajoute ou enlève la classe.
- `elem.classList.toggle("class")` -- ajoute la classe si elle n'existe pas, sinon enlève-la.
- `elem.classList.contains("class")` -- vérifie pour la classe donnée, renvoie `true/false`.

En outre, `classList` est itérable, alors nous pouvons lister toutes les classes avec `for..of`, comme ceci:

```html run
<body class="page d'accueil">
  <script>
    for (let name of document.body.classList) {
      alert(name); // page d'accueil, ensuite page
    }
  </script>
</body>
```

## Style de l'élément

La propriété `elem.style` est un objet qui correspond à ce qui est écrit dans l'attribut `"style"`. Attribuant `elem.style.width="100px"` fonctionne de la même façon qu'un attribut `style` ayant une chaîne `width:100px`.

Pour une propriété ayant plusieurs mots, camelCase est utilisé:

```js no-beautify
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
```

Prenons, par exemple:

```js run
document.body.style.backgroundColor = prompt('background color?', 'green');
```

````smart header="Propriétés prédétérminées"
Les propriétés prédéterminées par le navigateur comme `-moz-border-radius`, `-webkit-border-radius` suivent la même règle: un tiret signifie une majuscule.

Prenons, par exemple:

```js
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```
````

## Réinitialiser la propriété de style

Parfois nous voulons attribuer une propriété de style, et ensuite la retirer.

Par exemple, pour cacher un élément, nous pouvons définir `elem.style.display = "none"`.

Plus tard, nous voulons peut-être enlever `style.display` comme si cette propriété n'était définie. Au lieu de `delete elem.style.display`, nous devons attribuer une chaîne vide à la propriété de style: `elem.style.display = ""`.

```js run
// si nous exécutons cette code, <body> clignotera
document.body.style.display = "none"; // cacher

setTimeout(() => document.body.style.display = "", 1000); // retour à la normale
```

Si nous attribuons `style.display` à une chaîne vide, le navigateur applique les classes CSS et ses styles intégrés normalement, comme s'il n'y avait pas de propriété `style.display`.

````smart header="Réécriture complète avec `style.cssText`"
Normalement, nous utilisons `style.*` pour attribuer des propriétés de style individuelles. Nous ne pouvons pas attribuer le style complet comme `div.style="color: red; width: 100px"`, parce que `div.style` est un object, et il est en lecture seulement.

Pour définir un style complet comme une chaîne, il y a une propriété spéciale `style.cssText`:

```html run
<div id="div">Bouton</div>

<script>
  // nous pouvons attribuer des drapeaux de style spéciaux comme "important" ici
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
</script>
```

Cette propriété est rarement utilisée parce qu'une telle affectation enlève tous les styles pré-existants: au lieu d'être ajoutée, elle les remplace. Peut occasionnellement effacer quelque chose de nécessaire. Par contre, nous pouvons l'utiliser sans risque pour des nouveaux éléments -- nous savons que nous n'éffacerons pas un style pré-existant.

La même chose peut être accomplie en définissant un attribut: `div.setAttribute('style', 'color: red...')`.
````

## Faites attention aux unités

N'oubliez pas d'ajouter des unités de CSS aux valeurs.

Par exemple, nous ne devrions pas attribuer `elem.style.top` à `10`, mais plutôt à `10px`. Sinon ça ne fonctionnera pas:

```html run height=100
<body>
  <script>
  *!*
    // ne fonctionne pas!
    document.body.style.margin = 20;
    alert(document.body.style.margin); // '' (chaîne vide, l'affectation est ignorée)
  */!*

    // maintenant ajoutez l'unité de CSS (px) - et ça fonctionne
    document.body.style.margin = '20px';
    alert(document.body.style.margin); // 20px

    alert(document.body.style.marginTop); // 20px
    alert(document.body.style.marginLeft); // 20px
  </script>
</body>
```

Il est à noter: le navigateur "décortique"  la propriété `style.margin` dans les dernières lignes et déduit `style.marginLeft` et `style.marginTop` à partir de ceci.

## Styles calculés: getComputedStyle

Alors, modifier un style est facile. Mais comment pouvons-nous le *lire*?

Par exemple, nous voulons savoir la taille, les marges et la couleur d'un élément. Comment faire?

**La propriété `style` opère seulement sur la valeur de l'attribut `"style"`, sans aucune cascade CSS.**

Alors nous ne pouvons rien lire des classes CSS en utilisant `elem.style`.

Par exemple, ici, `style` ne reconnaît pas la marge:

```html run height=60 no-beautify
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  Le texte rouge
  <script>
*!*
    alert(document.body.style.color); // vide
    alert(document.body.style.marginTop); // vide
*/!*
  </script>
</body>
```

...Mais, si nous voulons, par exemple, augmenter la marge par `20px`? Nous en voudrions la valeur actuelle.

Il y a une autre méthode pour cela: `getComputedStyle`.

La syntaxe est:

```js
getComputedStyle(element, [pseudo])
```

element
: Élément pour lire la valeur de.

pseudo
: Un pseudo-élément si nécessaire, par exemple `::before`. Une chaîne vide ou aucun argument signifie l'élément lui-même.

Le résultat est un objet avec des styles, comme `elem.style`, mais maintenant par rapport à toutes les classes CSS.

Prenons, par exemple:

```html run height=100
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
    let computedStyle = getComputedStyle(document.body);

    // maintenant nous pouvons en lire la marge et la couleur

    alert( computedStyle.marginTop ); // 5px
    alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>

</body>
```

```smart header="Valeurs calculées et résolues"
Il y a deux concepts dans [CSS](https://drafts.csswg.org/cssom/#resolved-values):

1. Une valeur de style "calculée" est le résultat d'une cascade CSS, après que tous les règles et héritage CSS sont appliqués. Elle peut ressembler comme `height:1em` ou `font-size:125%`.
2. Une valeur de style "résolue" est celle qui est finalement appliquée à l'élément. Les valeurs comme `1em` ou `125%` sont relatives. Le navigateur prend la valeur calculée et fait que toutes les unités sont fixes et absolues; par exemple: `height:20px` ou `font-size:16px`. Pour les propriétés géométriques, les valeurs résolues peuvent avoir une virgule flottante, comme `width:50.5px`.

Il y a longtemps, `getComputedStyle` a été créé pour extraire les valeurs calculées, mais il s'est avéré que les valeurs résolues étaient beaucoup plus pratiques, alors la norme a changé.

Maintenant, `getComputedStyle` renvoie la valeur résolue de la propriété, habituellement en `px` pour géométrie.
```

````warn header="`getComputedStyle` exige le nom complet de la propriété"
Nous devons toujours demander pour la propriété exacte requise, comme `paddingLeft` ou `marginTop` ou `borderTopWidth`. Sinon, recevoir le bon résultat n'est pas garanti.

Par exemple, s'il y a les propriétés `paddingLeft/paddingTop`, qu'est-ce que nous recevrons de `getComputedStyle(elem).padding`? Rien, ou peut-être une valeur générée des écarts de remplissage connus? Il n'y a pas de règle standard ici.

Il y a des autres incohérences. À titre d'exemple, certains navigateurs (Chrome) indique `10px` dans le document ci-dessous, et certains (Firefox) -- n'en indique pas:

```html run
<style>
  body {
    margin: 10px;
  }
</style>
<script>
  let style = getComputedStyle(document.body);
  alert(style.margin); // chaîne vide dans Firefox
</script>
```
````

```smart header="Styles appliqués aux liens `:visited` sont cachés!"
Les liens visités peuvent être coloriés en utilisant la pseudo-classe CSS `:visited`.

Cependant, `getComputedStyle` ne donne pas accès à cette couleur, parce qu'autrement une page arbitraire pourrait savoir si l'utilisateur aurait visité un lien en créant un lien sur la page et vérifier les styles.

JavaScript ne pourrait pas voir les styles appliqués par `:visited`. De plus, il y a une limitation avec CSS qui interdit l'application de styles qui changent la géométrie dans `:visited`. C'est pour garantir qu'il n'y a aucun moyen pour une page malfaisante de tester si un lien a été visité, qui porterait atteinte à la vie privée.
```

## Récapitulation

Pour gérer les classes, il y a deux propriétés DOM:

- `className` -- la valeur de chaîne, utile pour gérer l'ensemble complet des classes.
- `classList` -- l'object avec les méthodes `add/remove/toggle/contains`, utile pour les classes individuelles.

Pour changer les styles:

- La propriété `style` est un objet avec les styles en camelCase. Lire et y écrire a le même sens que de modifier les propriétés individuelles dans l'attribut `"style"`. Pour savoir comment appliquer `important` et autres trucs rares -- il y a une liste de méthodes à [MDN](mdn:api/CSSStyleDeclaration).

- La propriété `style.cssText` correspond à l'attribut entier de `"style"`, la chaîne complète des styles.

Pour lire les styles résolus (par rapport à toutes les classes, après que tout le CSS est appliqué et que les valeurs finales sont calculées):

- `getComputedStyle(elem, [pseudo])` renvoie un objet de style avec eux. Lecture seulement.
