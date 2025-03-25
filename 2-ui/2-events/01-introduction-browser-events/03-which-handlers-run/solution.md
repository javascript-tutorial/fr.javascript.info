La réponse: `1` et `2`.

Le premier gestionnaire se déclenche, car il n'est pas supprimé par `removeEventListener`. Pour le supprimer, il faut passer en paramètre exactement la fonction qui a servi à le créer. Dans ce code, c'est une nouvelle fonction qui est passée en paramètre, qui est identique mais pas la même.

Pour supprimer un gestionnaire d'un élement, il faut stocker quelque part une référence au gestionnaire, comme ceci:

```js
function handler() {
  alert(1);
}

button.addEventListener("click", handler);
button.removeEventListener("click", handler);
```

Le gestionnaire `button.onclick` fonctionne indépendamment et en plus de `addEventListener`.
