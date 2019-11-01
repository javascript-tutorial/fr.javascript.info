importance: 5

---

# Changement de "prototype"

Dans le code ci-dessous, nous créons `new Rabbit`, puis essayons de modifier son prototype.

Au début, nous avons ce code:

```js run
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

alert( rabbit.eats ); // true
```


<<<<<<< HEAD
1. Nous avons ajouté une chaîne supplémentaire (accentué), que montre `alert` maintenant?
=======
1. We added one more string (emphasized). What will `alert` show now?
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype = {};
    */!*

    alert( rabbit.eats ); // ?
    ```

2. ...Et si le code est comme ça (une ligne remplacé)?

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype.eats = false;
    */!*

    alert( rabbit.eats ); // ?
    ```

<<<<<<< HEAD
3. Comme ceci (une ligne remplacé)?
=======
3. And like this (replaced one line)?
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete rabbit.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```

4. La dernière variante:

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete Rabbit.prototype.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```
