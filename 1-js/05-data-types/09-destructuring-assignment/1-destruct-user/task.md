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

<<<<<<< HEAD
- Propriété `name` dans la variable `name`.
- Propriété `years` dans la variable `age`.
- Proprété `isAdmin` dans la variable `isAdmin` (false si absent)

Les valeurs après l'affectation doivent être :
=======
- `name` property into the variable `name`.
- `years` property into the variable `age`.
- `isAdmin` property into the variable `isAdmin` (false, if no such property)

Here's an example of the values after your assignment:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```js
let user = { name: "John", years: 30 };

// votre code à gauche ::
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
