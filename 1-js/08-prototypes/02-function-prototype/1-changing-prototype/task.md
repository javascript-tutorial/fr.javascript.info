importance: 5

---

# Changement de "prototype"

Dans le code ci-dessous, nous créons `new Rabbit`, puis essayons de modifier son prototype.

Au début, nous avons ce code :

```js run
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

alert(rabbit.eats); // true
```

1.
Nous avons ajouté une chaîne de caractères supplémentaire (surlignée), qu'affiche `alert` maintenant ?

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype = {};
    */!*

    alert(rabbit.eats); // ?
    ```

2.
...Et si le code est comme ça (une ligne remplacée) ?

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype.eats = false;
    */!*

    alert(rabbit.eats); // ?
    ```

3.
Et comme ceci (une ligne remplacée) ?

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete rabbit.eats;
    */!*

    alert(rabbit.eats); // ?
    ```

4.
La dernière variante :

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete Rabbit.prototype.eats;
    */!*

    alert(rabbit.eats); // ?
    ```
