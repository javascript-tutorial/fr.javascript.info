

1. Soit utiliser une fonction wrapper, une fléchée pour être concis:

    ```js
    askPassword(() => user.login(true), () => user.login(false));
    ```

    Maintenant, elle obtient `user` des variables externes et l'exécute normalement.

2. Ou créez une fonction partielle à partir de `user.login` qui utilise `user` comme contexte et a le bon premier argument:

    ```js
    askPassword(user.login.bind(user, true), user.login.bind(user, false));
    ```
