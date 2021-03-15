importance: 5

---

# Finally ou juste le code?

Comparez les deux fragments de code.

<<<<<<< HEAD
1. Le premier utilise `finally` pour exécuter le code après `try..catch`:
=======
1. The first one uses `finally` to execute the code after `try...catch`:
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

    ```js
    try {
      work work
    } catch (err) {
      handle errors
    } finally {
    *!*
      cleanup the working space
    */!*
    }
    ```
<<<<<<< HEAD
2. Le deuxième fragment met le "cleanup" juste après `try..catch`:
=======
2. The second fragment puts the cleaning right after `try...catch`:
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

    ```js
    try {
      work work
    } catch (err) {
      handle errors
    }

    *!*
    cleanup the working space
    */!*
    ```

Nous avons absolument besoin du nettoyage après le travail, peu importe qu'il y ait une erreur ou non.

Y at-il un avantage ici à utiliser `finally` ou les deux fragments de code sont égaux? Si un tel avantage existe, donnez un exemple lorsque cela compte.
