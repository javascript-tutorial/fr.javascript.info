Une fenêtre modale peut être implémentée en utilisant un `<div id="cover-div">` semi-transparent qui couvre toute la fenêtre, comme ceci:

```css
#cover-div {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0.3;
}
```

Parce que la `<div>` couvre tout, il obtient tous les clics, pas la page en dessous.

Nous pouvons également empêcher le défilement de la page en définissant `body.style.overflowY ='hidden'`.

Le formulaire ne doit pas être dans`<div>`, mais à côté, car nous ne voulons pas qu'il ait `opacity`.
