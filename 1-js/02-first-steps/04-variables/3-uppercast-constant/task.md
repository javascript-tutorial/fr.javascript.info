importance: 4

---

# Constante en majuscule ?

Examinez le code suivant :

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

<<<<<<< HEAD
Ici nous avons une constante date `birthday` et l'`age` est calculé à partir de `birthday` avec l'aide d'un code (il n'est pas prévu pour être court, et parce que les détails n'ont pas d'importance ici).
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

Serait-il juste d'utiliser des majuscules pour `birthday`? Pour `age`? Ou même pour les deux ?

```js
<<<<<<< HEAD
const BIRTHDAY = '18.04.1982'; // créer en majuscule ?

const AGE = someCode(BIRTHDAY); // créer en majuscule ?
=======
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e
```
