```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```

Un appel à `debounce` renvoie un wrapper. Lorsqu'il est appelé, il planifie l'appel de la fonction d'origine après `ms` donné et annule le délai d'expiration précédent.

