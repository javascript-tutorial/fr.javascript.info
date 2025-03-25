
# HTML/CSS

Tout d'abord, on va créer le HTML/CSS.

Un menu est un composant graphique indépendant sur la page, c'est donc une bonne idée de le mettre dans son propre élément dans le DOM.

Une liste d'options dans un menu peut être affichée comme une liste `ul/li`.

Voici la structure d'exemple:

```html
<div class="menu">
  <span class="title">Gâteaux (cliquez moi)!</span>
  <ul>
    <li>Tarte aux pommes</li>
    <li>Cookies</li>
    <li>Brownies</li>
  </ul>
</div>
```

On utilise `<span>` pour le titre, car `<div>` a la propriété `display:block` implicitement, et il occupera 100% de la largeur horizontale.

Comme ceci:

```html autorun height=50
<div style="border: solid red 1px" onclick="alert(1)">Gâteaux (cliquez moi)!</div>
```

Si on défini `onclick` dessus, il traitera les clics à droite du texte.

Comme `<span>` a la propriété `display: inline` implicitement, il occupe exactement assez de place pour y mettre tout le texte:

```html autorun height=50
<span style="border: solid red 1px" onclick="alert(1)">Gâteaux (cliquez moi)!</span>
```

# Changer l'état du menu

Changer l'état du menu devrait modifier la flèche et montrer/cacher le menu.

Tous ces changements sont parfaitement gérés par CSS. En JavaScript, on devrait indiquer l'état actuel du menu en ajoutant/supprimant la classe CSS `.open`.

Sans ça, le menu sera fermé:

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

...Et avec `.open`, la flèche change et la liste apparaît:

```css
.menu.open .title::before {
  content: '▼ ';
}

.menu.open ul {
  display: block;
}
```
