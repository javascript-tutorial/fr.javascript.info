
Examinons exactement ce qui se fait à l'intérieur de `makeArmy`, et la solution deviendra évidente.

1. Elle crée un tableau vide `shooters`:

    ```js
    let shooters = [];
    ```
2. Le remplit avec des fonctions dans la boucle via `shooters.push(function)`.

    Chaque élément est une fonction, le tableau résultant ressemble à ceci :

    ```js no-beautify
    shooters = [
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); }
    ];
    ```

3. Le tableau est renvoyé par la fonction.
   
    Puis, plus tard, l'appel à n'importe quel membre, par ex. `Army[5]()` récupérera l'élément `army[5]` du tableau (qui est une fonction) et l'appellera.
   
    Maintenant, pourquoi toutes ces fonctions affichent-elles la même valeur, `10` ?
   
    C'est parce qu'il n'y a pas de variable locale `i` dans les fonctions de `shooter`. Lorsqu'une telle fonction est appelée, elle prend `i` de son environnement lexical externe.
   
    Alors, quelle sera la valeur de `i` ?
   
    Si nous regardons la source :
   
    ```js
    function makeArmy() {
      ...
      let i = 0;
      while (i < 10) {
        let shooter = function() { // fonction shooter
          alert( i ); // should show its number
        };
        shooters.push(shooter); // ajoute une fonction au tableau
        i++;
      }
      ...
    }
    ```
   
    Nous pouvons voir que toutes les fonctions `shooter` sont créées dans l'environnement lexical de la fonction `makeArmy()`. Mais quand `army[5]()` est appelé, `makeArmy` a déjà terminé son travail, et la valeur finale de `i` est `10` (`while` s'arrête à `i=10`).
   
    En conséquence, toutes les fonctions `shooter` obtiennent la même valeur de l'environnement lexical externe et c'est-à-dire la dernière valeur, `i=10`.
   
    ![](lexenv-makearmy-empty.svg)
   
    Comme vous pouvez le voir ci-dessus, à chaque itération d'un bloc `while {...}`, un nouvel environnement lexical est créé. Donc, pour résoudre ce problème, nous pouvons copier la valeur de `i` dans une variable dans le bloc `while {...}`, comme ceci :
   
    ```js run
    function makeArmy() {
      let shooters = [];
   
      let i = 0;
      while (i < 10) {
        *!*
          let j = i;
        */!*
          let shooter = function() { // fonction shooter
            alert( *!*j*/!* ); // devrait afficher son numéro
          };
        shooters.push(shooter);
        i++;
      }
   
      return shooters;
    }
   
    let army = makeArmy();
   
    // Maintenant, le code fonctionne correctement
    army[0](); // 0
    army[5](); // 5
    ```
   
    Ici, `let j = i` déclare une variable "itération-locale" `j` et y copie `i`. Les primitives sont copiées "par valeur", donc nous obtenons en fait une copie indépendante de `i`, appartenant à l'itération de boucle courante.
   
    Les shooters fonctionnent correctement, car la valeur de `i` vit maintenant un peu plus près. Pas dans l'environnement lexical `makeArmy()`, mais dans l'environnement lexical qui correspond à l'itération de la boucle actuelle :
   
    ![](lexenv-makearmy-while-fixed.svg)
   
    Ce genre de problème pourrait également être évité si nous utilisions `for` au début, comme ceci :
   
    ```js run demo
    function makeArmy() {
   
      let shooters = [];
   
    *!*
      for(let i = 0; i < 10; i++) {
    */!*
        let shooter = function() { // fonction shooter
          alert( i ); // devrait afficher son numéro
        };
        shooters.push(shooter);
      }
   
      return shooters;
    }
   
    let army = makeArmy();
   
    army[0](); // 0
    army[5](); // 5
    ```
   
    C'est essentiellement la même chose, car `for` génère un nouvel environnement lexical à chaque itération avec sa propre variable `i`. Ainsi, le `shooter` généré à chaque itération fait référence à son propre `i`, à partir de cette itération même.
   
    ![](lexenv-makearmy-for-fixed.svg)

    Maintenant que vous avez déployé tant d'efforts pour lire ceci, et que la recette finale est si simple - utilisez simplement `for`, vous vous demandez peut-être - cela en valait-il la peine ?

    Eh bien, si vous pouviez facilement répondre à la question, vous ne liriez pas la solution. Donc, j'espère que cette tâche doit vous avoir aidé à comprendre un peu mieux les choses.

En outre, il existe en effet des cas où l'on préfère `while` à `for`, et d'autres scénarios où de tels problèmes sont réels.

