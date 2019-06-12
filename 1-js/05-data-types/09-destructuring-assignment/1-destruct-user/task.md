importance: 5

---

# L'affectation par décomposition

Nous avons un objet :

```js
let user = {
  name: "John",
  years: 30
};
```

Écrivez l'affectation par décomposition qui se lit comme suit :

- Propriété `name` dans la variable `name`.
- Propriété `years` dans la variable `age`.
- Proprété `isAdmin` dans la variable `isAdmin` (false si absent)

Les valeurs après l'affectation doivent être :

```js
let user = { name: "John", years: 30 };

// votre code à gauche ::
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
