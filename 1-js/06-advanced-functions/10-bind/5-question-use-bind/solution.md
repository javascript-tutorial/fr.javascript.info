
L'erreur arrive car `ask` a les fonctions `loginOk/loginFail` sans l'objet.

Quand elle les appelle, ils supposent naturellement que `this=undefined`.

Lions le contexte :

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
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
*/!*
```

Maintenant, ça fonctionne.

Une solution alternative aurait pu être :
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

Habituellement, ça fonctionne également et semble bon.

Elle est cependant un peu moins fiable dans les situations plus complexes où la variable `user` pourrait changer *après* l'appel de `askPassword`, mais *avant* la réponse du visiteur et l'appel `() => user.loginOk()`.
