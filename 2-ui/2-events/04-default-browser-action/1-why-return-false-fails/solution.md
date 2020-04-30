Lorsque le navigateur lit l'attribut `on*`, comme `onclick`, il créer le gestionnaire depuis son contenu.

Pour `onclick="handler()"` la fonction sera:

```js
function(event) {
  handler() // le contenu de onclick
}
```

Maintenant nous pouvons voir que la valeur retournée par `handler()` n'est pas utilisée et n'affecte pas le résultat.

La correction est simple:

```html run
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="https://w3.org" onclick="*!*return handler()*/!*">w3.org</a>
```

Nous pouvons aussi utiliser `event.preventDefault()`, comme ceci:

```html run
<script>
*!*
  function handler(event) {
    alert("...");
    event.preventDefault();
  }
*/!*
</script>

<a href="https://w3.org" onclick="*!*handler(event)*/!*">w3.org</a>
```
