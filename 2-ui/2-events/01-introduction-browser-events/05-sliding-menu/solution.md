
# HTML/CSS

Premièrement créons un HTML/CSS.

Un menu est un composant graphique distinct de la page, il est donc préférable de le place dans son propre DOM élément.

Une liste d'éléments de menu peut être présentée sous la forme d'une liste "ul/li".

Voici un exemple de structure :
<!--
First let's create HTML/CSS.

A menu is a standalone graphical component on the page, so it's better to put it into a single DOM element.

A list of menu items can be laid out as a list `ul/li`.

Here's the example structure:-->

```html
<div class="menu">
  <span class="title">Sweeties (click me)!</span>
  <ul>
    <li>Cake</li>
    <li>Donut</li>
    <li>Honey</li>
  </ul>
</div>
```

Nous utilisons `<span>` pour le titre, car `<div>` contient un `display:block` implicite, et il occupera 100 % de la largeur horizontale.

Comme cela :
<!--
We use `<span>` for the title, because `<div>` has an implicit `display:block` on it, and it will occupy 100% of the horizontal width.

Like this:-->

```html autorun height=50
<div style="border: solid red 1px" onclick="alert(1)">Sweeties (click me)!</div>
```

Donc, si nous définissons `onclick` dessus, il captera les clics à droite du texte.

Comme `<span>` a un `display: inline` implicite, il occupe exactement assez de place pour contenir tout le texte :

```html autorun height=50
<span style="border: solid red 1px" onclick="alert(1)">Bonbons (cliquez ici)!</span>
```
<!--
So if we set `onclick` on it, then it will catch clicks to the right of the text.

As `<span>` has an implicit `display: inline`, it occupies exactly enough place to fit all the text:

```html autorun height=50
<span style="border: solid red 1px" onclick="alert(1)">Sweeties (click me)!</span>
```
-->

# Alterner le menu

Basculer le menu devrait changer la flèche et afficher/masquer la liste des menus.

Tous ces changements sont parfaitement gérés par CSS. En JavaScript, nous devrions étiqueter l'état actuel du menu en ajoutant/supprimant la classe `.open`.

Sans cela, le menu sera fermé :
<!--
# Toggling the menu

Toggling the menu should change the arrow and show/hide the menu list.

All these changes are perfectly handled by CSS. In JavaScript we should label the current state of the menu by adding/removing the class `.open`.

Without it, the menu will be closed:-->

```css
.menu ul {
  margin: 0;
  list-style: none;
  padding-left: 20px;
  display: none;
}

.menu .title::before {
  content: '▶ ';
  font-size: 80%;
  color: green;
}
```

...Et avec `.open` la fléche change et la liste s'affiche :
...And with `.open` the arrow changes and the list shows up:

```css
.menu.open .title::before {
  content: '▼ ';
}

.menu.open ul {
  display: block;
}
```
