
Pour récupérer un utilisateur, nous avons besoin de : `fetch('https://api.github.com/users/USERNAME')`.

Si la réponse a le statut `200`, appelons `.json()` pour lire l'objet JS.

<<<<<<< HEAD
Sinon, si un `fetch` échoue, ou si la réponse a un statut différent de 200, nous renvoyons simplement `null` dans le tableau de résutats.
=======
Otherwise, if a `fetch` fails, or the response has non-200 status, we just return `null` in the resulting array.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

Voici donc le code :

```js demo
async function getUsers(names) {
  let jobs = [];

  for(let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      failResponse => {
        return null;
      }
    );
    jobs.push(job);
  }

  let results = await Promise.all(jobs);

  return results;
}
```

Veuillez noter : l'appel `.then` est directement attaché à `fetch`, de sorte que lorsque nous avons la réponse, il n'attend pas d'autres fetches, mais commence à lire `.json()` immédiatement.

Si nous avions utilisé `await Promise.all(names.map(name => fetch(...)))`, et appelé `.json()` sur les résultats, il aurait attendu que tous les fetches répondent. En ajoutant `.json()` directement à chaque `fetch`, nous nous assurons que les fetches individuels commencent à lire les données en JSON sans s'attendre les uns les autres.

C'est un exemple de la façon dont l'API Promise de bas niveau peut toujours être utile même si nous utilisons principalement `async/wait`.
