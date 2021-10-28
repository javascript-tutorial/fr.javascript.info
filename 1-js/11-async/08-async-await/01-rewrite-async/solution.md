
Les notes sont en dessous du code:

```js run
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

Notes:

1. La fonction `loadJson` devient `async`.
2. Tous les `.then` intérieurs sont remplacés par `await`..
3. Nous pouvons `return response.json()` au lieu de l'attendre, comme ceci:

    ```js
    if (response.status == 200) {
      return response.json(); // (3)
    }
    ```

    Ensuite, le code externe devra "attendre" la résolution de cette promesse. Dans notre cas, cela n'a pas d'importance.
4. L'erreur émise par `loadJson` est gérée par `.catch`. Nous ne pouvons pas utiliser `await loadJson(...)` ici, car nous ne sommes pas dans une fonction `async`..
