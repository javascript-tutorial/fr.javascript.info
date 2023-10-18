
# Un délai avec une promesse

La fonction de base `setTimeout` utilise des fonctions de retour. Créez une alternative avec une promesse.

La fonction `delay(ms)` doit retourner une promesse. Cette promesse doit s'acquitter après `ms` milliseconds, pour que l'on puisse ajouter `.then` à celle-ci, comme cela :

```js
function delay(ms) {
  // votre code
}

delay(3000).then(() => alert('runs after 3 seconds'));
```
