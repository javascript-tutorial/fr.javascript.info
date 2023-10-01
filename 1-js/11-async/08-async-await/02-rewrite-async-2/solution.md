
Il n'y a pas d'astuces ici. Remplacez simplement `.catch` par `try..catch` dans `demoGithubUser` et ajoutez `async/await` là où c'est nécessaire:

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// demander un nom d'utilisateur jusqu'à ce que github renvoie un utilisateur valide
async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("Enter a name?", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // pas d'erreur, sortie de la boucle
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // la boucle continue après l'alerte
        alert("No such user, please reenter.");
      } else {
        // erreur inconnue, rejeter
        throw err;
      }
    }     
  }

  alert(`Full name: ${user.name}.`);
  return user;
}

demoGithubUser();
```
