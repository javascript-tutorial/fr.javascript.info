importance: 5

---

# Armée de fonctions

Le code suivant crée un tableau de `shooters`.

Chaque fonction est censée sortir son numéro.
Mais quelque chose ne va pas …

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // créer une fonction shooter
      alert(i); // qui devrait afficher son numéro
    };
    shooters.push(shooter); // and add it to the array
    i++;
  }

  // ...and return the array of shooters
  return shooters;
}

let army = makeArmy();

*!*
// tous les shooters affichent 10 au lieu de leurs numéros 0, 1, 2, 3 ...
army[0](); // 10 du shooter numéro 0
army[1](); // 10 du shooter numéro 1
army[2](); // 10 ...etc.
*/!*
```

Pourquoi tous les shooters affichent-ils la même valeur ?

Corrigez le code pour qu'il fonctionne comme prévu.
