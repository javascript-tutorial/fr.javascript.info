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

- La propriété `name` dans la variable `name`.
- La propriété `years` dans la variable `age`.
- La propriété `isAdmin` dans la variable `isAdmin` (false si absent)

Voici un exemple des valeurs après votre affectation :

```js
let user = { name: "John", years: 30 };

// votre code à gauche ::
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
