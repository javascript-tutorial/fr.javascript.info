importance: 4

---

# Constante en majuscule ?

Examinez le code suivant :

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

Ici, nous avons une constante `birthday` pour la date de naissance, ainsi que la constante `age`.

L'`age` est calculé à partir de `birthday` en utilisant `someCode()`, ce qui signifie un appel de fonction que nous n'avons pas encore expliqué (nous le ferons bientôt !), mais les détails n'ont pas d'importance ici, le fait est que l'`age` est calculé d'une manière ou d'une autre en fonction de la date de naissance `birthday`.

Serait-il juste d'utiliser des majuscules pour `birthday`? Pour `age`? Ou même pour les deux ?

```js
const BIRTHDAY = '18.04.1982'; // Mettre l'anniversaire en majuscule ?

const AGE = someCode(BIRTHDAY); // Mettre l'âge en majuscule ?
```