# Erreur dans setTimeout

Qu'en pensez-vous ? Est-ce que le `.catch` va se déclencher ? Expliquez votre réponse.

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
