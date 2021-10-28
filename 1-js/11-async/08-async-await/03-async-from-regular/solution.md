
C'est le cas quand il est utile de savoir comment ça marche à l'intérieur.

Il suffit de traiter l'appel `async` comme une promesse et d'y attacher `.then`:
```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // affiche 10 après 1 seconde
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
