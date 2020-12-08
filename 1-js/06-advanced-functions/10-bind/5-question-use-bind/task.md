importance: 5

---

# Corriger une fonction ayant perdu "this"

L'appel de `askPassword()` dans le code ci-dessous devrait vérifier le mot de passe et appeler alors `user.loginOk/loginFail` en fonction de la réponse.

Mais cela lève une erreur. Pourquoi ?

Corriger la ligne surlignée pour que tout fonctionne (les autres lignes ne sont pas à modifier).

```js run
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

*!*
askPassword(user.loginOk, user.loginFail);
*/!*
```
