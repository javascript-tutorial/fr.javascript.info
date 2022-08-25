La réponse : `1`et `2`.

Le premier gestionnaire se déclenche, car il n'est pas supprimé par `removeEventListener`.  Pour supprimer le gestionnaire, nous devons transmettre exactement la fonction qui a été assignée. Et dans le code, une nouvelle fonction est passée, qui a la même apparence, mais qui est quand même une autre fonction.

Pour supprimer un objet fonction, nous devons stocker une référence à celui-ci, comme ceci :

<!--
The answer: `1` and `2`.

The first handler triggers, because it's not removed by `removeEventListener`. To remove the handler we need to pass exactly the function that was assigned. And in the code a new function is passed, that looks the same, but is still another function.

To remove a function object, we need to store a reference to it, like this:
-->

```js
function handler() {
  alert(1);
}

button.addEventListener("click", handler);
button.removeEventListener("click", handler);
```

Le gestionnaire `button.onclick` fonctionne indépendamment et en plus de `addEventListener`.
<!--The handler `button.onclick` works independently and in addition to `addEventListener`.-->

