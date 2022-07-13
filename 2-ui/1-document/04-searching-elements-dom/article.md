# Recherches: getElement*, querySelector*

Les outils de navigation du DOM sont très pratiques quand les éléments sont proches les uns des autres. Mais s'ils ne le sont pas ? Comment atteindre un élément arbitraire de la page ?

Il existe d'autres méthodes de recherche pour cela. 

## document.getElementById ou juste id

Si un élément a l'attribut `id`, on peut atteindre cet élément en utilisant la méthode `document.getElementById(id)`, peu importe où elle se trouve.

Par exemple :

```html run
<div id="elem">
  <div id="elem-content">Elément</div>
</div>

<script>
  // récupération de l'élément :
*!*
  let elem = document.getElementById('elem');
*/!*

  // on met son arrière-plan rouge :
  elem.style.background = 'red';
</script>
```
Il y a aussi une variable globale nommée selon l'`id` qui référence l'élément :

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Elément</div>
</div>

<script>
  // elem est une référence à l'élément du DOM ayant l'id "elem"
  elem.style.background = 'red';

  // id="elem-content" contient un tiret, donc ça ne peut pas être un nom de variable
  // ...mais on peut y accéder en utilisant les crochets : window['elem-content']
</script>
```

...A moins qu'on déclare une variable Javascript avec le même nom, auquel cas celle-ci obtient la priorité :

```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5; // maintenant elem vaut 5, ce n'est plus une référence à <div id="elem">

  alert(elem); // 5
</script>
```

```warn header="Ne pas utiliser les variables globales nommées selon l'id pour accéder aux éléments !"
Ce comportement est décrit [dans la spécification](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem), donc c'est standard. C'est principalement gardé pour des histoires de compatibilité.

Le navigateur essaie de nous aider en mélangeant les noms de JS et du DOM. C'est bien pour des scripts simples, intégré dans du HTML, mais en genéral ce n'est pas bon. Il peut y avoir des conflits de noms. Aussi, quand quelqu'un lira le code JS sans avoir le HTML à côté, ce ne sera pas évident pour lui d'où vient la variable.

Dans ce tutoriel, on utilise `id` pour directement référencer un élément rapidement, quand il sera évident d'où il vient.

Dans la vraie vie, `document.getElementById` est la méthode à avantager.
```

```smart header="L' `id` doit être unique"
L'`id` doit être unique. Il ne peut y avoir qu'un élément dans le document avec un `id` donné.

S'il y a de multiples éléments avec le même `id`, alors le comportement de la méthode qui l'utilise est imprévisible, par exemple `document.getElementById` pourra renvoyer n'importe lequel de ces éléments aléatoirement. Donc suivez la règle et gardez l'`id` unique.
```

```warn header="Seulement `document.getElementById`, pas `anyElem.getElementById`"
La méthode `getElementById` ne peut être appelée que sur l'objet `document` . Elle va chercher l'`id` dans le document entier.
```

## querySelectorAll [#querySelectorAll]

De loin, la méthode la plus polyvalente, `elem.querySelectorAll(css)` renvoie tous les éléments à l'intérieur de `elem` correspondant au sélecteur CSS donné en paramètre

Ici, on recherche tous les éléments `<li>` qui sont les derniers enfants :

```html run
<ul>
  <li>Le</li>
  <li>test</li>
</ul>
<ul>
  <li>a</li>
  <li>réussi</li>
</ul>
<script>
*!*
  let elements = document.querySelectorAll('ul > li:last-child');
*/!*

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "réussi"
  }
</script>
```

Cette méthode est très puissante, car tous les sélecteurs CSS peuvent être utilisés.

```smart header="On peut aussi utiliser des pseudo-classes"

Les pseudo-classes dans le sélecteur CSS comme `:hover` et `:active` sont aussi acceptés. Par exemple, `document.querySelectorAll(':hover')` renverra l'ensemble des éléments dont le curseur est au-dessus en ce moment (dans l'ordre d'imbrication : du plus extérieur `<html>` au plus imbriqué).
```

## querySelector [#querySelector]

Un appel à `elem.querySelector(css)` renverra le premier élément d'un sélecteur CSS donné.

En d'autres termes, le résultat sera le même que `elem.querySelectorAll(css)[0]`, mais celui-ci cherchera *tous* les éléments et en choisira un seul, alors que `elem.querySelector` n'en cherchera qu'un. C'est donc plus rapide, et plus court à écrire.

## matches

Les méthodes précédentes recherchaient dans le DOM.

La commande [elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) ne recherche rien, elle vérifie simplement que `elem` correspond au sélecteur CSS donné. Elle renvoie `true` ou `false`.

Cette méthode devient utile quand on itère sur des éléments (comme dans un array par exemple) et qu'on veut filtrer ceux qui nous intéressent.

Par exemple :

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // on peut mettre n'importe quel ensemble à la place de document.body.children
  for (let elem of document.body.children) {
*!*
    if (elem.matches('a[href$="zip"]')) {
*/!*
      alert("le lien de l'archive : " + elem.href );
    }
  }
</script>
```

## closest

*Ancestors* of an element are: parent, the parent of parent, its parent and so on. The ancestors together form the chain of parents from the element to the top.

The method `elem.closest(css)` looks for the nearest ancestor that matches the CSS-selector. The `elem` itself is also included in the search.

In other words, the method `closest` goes up from the element and checks each of parents. If it matches the selector, then the search stops, and the ancestor is returned.

For instance:

```html run
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 2</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null (because h1 is not an ancestor)
</script>
```

## getElementsBy*

There are also other methods to look for nodes by a tag, class, etc.

Today, they are mostly history, as `querySelector` is more powerful and shorter to write.

So here we cover them mainly for completeness, while you can still find them in the old scripts.

- `elem.getElementsByTagName(tag)` looks for elements with the given tag and returns the collection of them. The `tag` parameter can also be a star `"*"` for "any tags".
- `elem.getElementsByClassName(className)` returns elements that have the given CSS class.
- `document.getElementsByName(name)` returns elements with the given `name` attribute, document-wide. Very rarely used.

For instance:
```js
// get all divs in the document
let divs = document.getElementsByTagName('div');
```

Let's find all `input` tags inside the table:

```html run height=50
<table id="table">
  <tr>
    <td>Your age:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> less than 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> from 18 to 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> more than 60
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="Don't forget the `\"s\"` letter!"
Novice developers sometimes forget the letter `"s"`. That is, they try to call `getElementByTagName` instead of <code>getElement<b>s</b>ByTagName</code>.

The `"s"` letter is absent in `getElementById`, because it returns a single element. But `getElementsByTagName` returns a collection of elements, so there's `"s"` inside.
```

````warn header="It returns a collection, not an element!"
Another widespread novice mistake is to write:

```js
// doesn't work
document.getElementsByTagName('input').value = 5;
```

That won't work, because it takes a *collection* of inputs and assigns the value to it rather than to elements inside it.

We should either iterate over the collection or get an element by its index, and then assign, like this:

```js
// should work (if there's an input)
document.getElementsByTagName('input')[0].value = 5;
```
````

Looking for `.article` elements:

```html run height=50
<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // find by name attribute
  let form = document.getElementsByName('my-form')[0];

  // find by class inside the form
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, found two elements with class "article"
</script>
```

## Live collections

All methods `"getElementsBy*"` return a *live* collection. Such collections always reflect the current state of the document and "auto-update" when it changes.

In the example below, there are two scripts.

1. The first one creates a reference to the collection of `<div>`. As of now, its length is `1`.
2. The second scripts runs after the browser meets one more `<div>`, so its length is `2`.

```html run
<div>First div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 2
*/!*
</script>
```

In contrast, `querySelectorAll` returns a *static* collection. It's like a fixed array of elements.

If we use it instead, then both scripts output `1`:


```html run
<div>First div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 1
*/!*
</script>
```

Now we can easily see the difference. The static collection did not increase after the appearance of a new `div` in the document.

## Summary

There are 6 main methods to search for nodes in DOM:

<table>
<thead>
<tr>
<td>Method</td>
<td>Searches by...</td>
<td>Can call on an element?</td>
<td>Live?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>tag or <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>class</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>

By far the most used are `querySelector` and `querySelectorAll`, but `getElement(s)By*` can be sporadically helpful or found in the old scripts.

Besides that:

- There is `elem.matches(css)` to check if `elem` matches the given CSS selector.
- There is `elem.closest(css)` to look for the nearest ancestor that matches the given CSS-selector. The `elem` itself is also checked.

And let's mention one more method here to check for the child-parent relationship, as it's sometimes useful:
-  `elemA.contains(elemB)` returns true if `elemB` is inside `elemA` (a descendant of `elemA`) or when `elemA==elemB`.
