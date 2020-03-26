importance: 5

---

# Finally ou juste le code?

Comparez les deux fragments de code.

1. Le premier utilise `finally` pour exécuter le code après `try..catch`:

    ```js
    try {
      work work
    } catch (e) {
      handle errors
    } finally {
    *!*
      cleanup the working space
    */!*
    }
    ```
2. Le deuxième fragment met le "cleanup" juste après `try..catch`:

    ```js
    try {
      work work
    } catch (e) {
      handle errors
    }

    *!*
    cleanup the working space
    */!*
    ```

Nous avons absolument besoin du nettoyage après le travail, peu importe qu'il y ait une erreur ou non.

Y at-il un avantage ici à utiliser `finally` ou les deux fragments de code sont égaux? Si un tel avantage existe, donnez un exemple lorsque cela compte.
