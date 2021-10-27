
# Réécriture avec async/await

Réécrire cet exemple de code du chapitre <info:promise-chaining> en utilisant `async/await` au lieu de `.then/catch`:

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404
```
