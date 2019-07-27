function makeCounter() {
  let count = 0;

  // ... votre code ...
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

counter.set(10); // définir le nouveau "count"

alert( counter() ); // 10

counter.decrease(); // diminuer de 1 le "count"

alert( counter() ); // 10 (au lieu de 11)
