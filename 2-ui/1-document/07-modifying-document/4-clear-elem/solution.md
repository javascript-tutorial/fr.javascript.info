
Voyons d'abord comment ne *pas* le faire :

```js
function clear(elem) {
  for (let i=0; i < elem.childNodes.length; i++) {
      elem.childNodes[i].remove();
  }
}
```

Cela ne fonctionnera pas, car l'appel à `remove()` décale la collection `elem.childNodes`, donc les éléments commencent à partir de l'index `0` à chaque fois. Mais `i` augmente et certains éléments seront ignorés.

La boucle `for..of` fait de même.

La bonne variante pourrait être :

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

Et il existe également un moyen plus simple de faire de même :

```js
function clear(elem) {
  elem.innerHTML = '';
}
```
