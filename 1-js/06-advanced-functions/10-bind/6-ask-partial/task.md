importance: 5

---

# Application de fonction partielle pour login

La tâche est une variante un peu plus complexe de <info:task/question-use-bind>. 

L'objet `user` a été modifié. Maintenant, au lieu de deux fonctions `loginOk/loginFail`, il a une seule fonction `user.login(true/false)`.

Que faire passer à `askPassword` dans le code ci-dessous, de sorte qu'il appelle `user.login(true)` comme `ok` et `user.login(false)` comme `fail` ?

```js
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

*!*
askPassword(?, ?); // ?
*/!*
```

Vos modifications doivent uniquement modifier le fragment surligné.

