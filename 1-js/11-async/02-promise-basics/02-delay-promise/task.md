# Délai avec une promesse

La fonction intégrée `setTimeout` utilise des rappels. Elle crée une alternative basée sur une promesse.

La fonction `delay(ms)` devrait retourner une promesse. Cette promesse devrait se résoudre après «ms» millisecondes, afin que nous puissions y ajouter `.then`, comme ceci:

```js
function delay(ms) {
  // votre code
}

delay(3000).then(() => alert('runs after 3 seconds'));
```
