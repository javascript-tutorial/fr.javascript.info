
1. Ajoutons `__proto__`:

    ```js run
    let head = {
      glasses: 1
    };

    let table = {
      pen: 3,
      __proto__: head
    };

    let bed = {
      sheet: 1,
      pillow: 2,
      __proto__: table
    };

    let pockets = {
      money: 2000,
      __proto__: bed
    };

    alert(pockets.pen); // 3
    alert(bed.glasses); // 1
    alert(table.money); // undefined
    ```

2. Dans les moteurs modernes, en termes de performances, il n’ya pas de différence selon que l’on prend une propriété d’un objet ou de son prototype. Ils se souviennent du lieu où la propriété a été trouvée et le réutilisent à la demande suivante.

    Par exemple, pour `pockets.glasses` ils se souviennent où ils ont trouvé `glasses` (dans `head`), et la prochaine fois rechercheront là. Ils sont également assez intelligents pour mettre à jour les caches internes en cas de changement, de sorte que l'optimisation est sécurisée.
