
# L'élément Template

<<<<<<< HEAD
L'élément intégré `<template>` sert de stockage pour les modèles de balisage HTML. Le navigateur ignore son contenu et vérifie uniquement la validité de la syntaxe, mais nous pouvons y accéder et l'utiliser dans JavaScript, pour créer d'autres éléments.
=======
A built-in `<template>` element serves as a storage for HTML markup templates. The browser ignores its contents, only checks for syntax validity, but we can access and use it in JavaScript, to create other elements.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

En théorie, nous pourrions créer n'importe quel élément invisible quelque part dans le code HTML à des fins de stockage de balises HTML. Quelle est la particularité de `<template>` ?

Tout d'abord, son contenu peut être n'importe quel HTML valide, même s'il nécessite normalement une balise d'entourage appropriée.

Par exemple, nous pouvons y placer une ligne de tableau `<tr>` :

```html
<template>
  <tr>
    <td>Contents</td>
  </tr>
</template>
```

Habituellement, si nous essayons de mettre `<tr>` à l'intérieur, disons, d'un `<div>`, le navigateur détecte la structure DOM invalide et la "corrige", en ajoutant `<table>` autour. Ce n'est pas ce que nous voulons. D'un autre côté, `<template>` conserve exactement ce que nous y plaçons.

Nous pouvons également placer des styles et des scripts dans `<template>` :

```html
<template>
  <style>
    p { font-weight: bold; }
  </style>
  <script>
    alert("Hello");
  </script>
</template>
```

Le navigateur considère que le contenu `<template>` est "hors du document" : les styles ne sont pas appliqués, les scripts ne sont pas exécutés, `<video autoplay>` n'est pas lancée, etc.

Le contenu devient actif (les styles s'appliquent, les scripts s'exécutent, etc.) lorsque nous l'insérons dans le document.

## Insertion d'un modèle

Le contenu du modèle est disponible dans sa propriété `content` comme un [DocumentFragment](info:modifying-document#document-fragment) -- un type spécial de noeud DOM.

Nous pouvons le traiter comme n'importe quel autre noeud DOM, à l'exception d'une propriété spéciale : lorsque nous l'insérons quelque part, ses enfants sont insérés à la place.

Par exemple :

```html run
<template id="tmpl">
  <script>
    alert("Hello");
  </script>
  <div class="message">Hello, world!</div>
</template>

<script>
  let elem = document.createElement('div');

*!*
  // Cloner le contenu du modèle pour le réutiliser plusieurs fois
  elem.append(tmpl.content.cloneNode(true));
*/!*

  document.body.append(elem);
  // Maintenant le script de <template> s'exécute
</script>
```

Réécrivons un exemple de Shadow DOM du chapitre précédent en utilisant `<template>` :

```html run untrusted autorun="no-epub" height=60
<template id="tmpl">
  <style> p { font-weight: bold; } </style>
  <p id="message"></p>
</template>

<div id="elem">Click me</div>

<script>
  elem.onclick = function() {
    elem.attachShadow({mode: 'open'});

*!*
    elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)
*/!*

    elem.shadowRoot.getElementById('message').innerHTML = "Hello from the shadows!";
  };
</script>
```

Dans la ligne `(*)`, lorsque nous clonons et insérons `tmpl.content`, comme son `DocumentFragment`, ses enfants (`<style>`, `<p>`) sont insérés à la place.

Ils forment le shadow DOM :

```html
<div id="elem">
  #shadow-root
    <style> p { font-weight: bold; } </style>
    <p id="message"></p>
</div>
```

## Résumé

Pour résumer :

- Le contenu de `<template>` peut être n'importe quel HTML syntaxiquement correct.
- Le contenu de `<template>` est considéré comme "hors du document", donc il n'affecte rien.
- Nous pouvons accéder à `template.content` depuis JavaScript, le cloner pour le réutiliser dans un nouveau composant.

La balise `<template>` est assez unique, car :

- Le navigateur vérifie la syntaxe HTML à l'intérieur de celle-ci (par opposition à l'utilisation d'une chaîne de modèle à l'intérieur d'un script).
- ...Mais il permet toujours l'utilisation de n'importe quelle balise HTML de niveau supérieur, même celles qui n'ont pas de sens sans les wrappers appropriées (par exemple, `<tr>`).
- Le contenu devient interactif : les scripts s'exécutent, la vidéo se joue en autoplay, etc.

L'élément `<template>` ne comporte aucun mécanisme d'itération, de liaison de données ou de substitution de variables, mais nous pouvons les mettre en œuvre par-dessus.
