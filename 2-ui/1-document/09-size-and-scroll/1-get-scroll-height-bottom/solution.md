La solution est :

```js
let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;
```

En d'autres termes : (pleine hauteur) moins (partie supérieure déroulée) moins (partie visible) -- c'est exactement la partie inférieure déroulée.
