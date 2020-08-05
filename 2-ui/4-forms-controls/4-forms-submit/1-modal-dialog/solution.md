Une fenêtre modale peut être implémentée en utilisant un semi-transparent `<div id="cover-div">` qui couvre toute la fenêtre, comme ça:

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

Parce que le `<div>` couvre tout, il obtient tous les clics, pas la page en dessous.

Nous pouvons également empêcher le défilement de la page en définissant `body.style.overflowY = 'hidden'`.

The form should be not in the `<div>`, but next to it, because we don't want it to have `opacity`.Le formulaire ne doit pas être dans le `<div>`, mais en dessous, car nous ne voulons pas qu'il soit(opaque) `opacity`.
