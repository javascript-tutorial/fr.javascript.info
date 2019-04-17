
```js run demo
function readNumber() {
  let num;

  do {
    num = prompt("Entrez un nombre s'il vous plaît", 0);
  } while ( !isFinite(num) );

  if (num === null || num === '') return null;
  
  return +num;
}

alert(`Read: ${readNumber()}`);
```

La solution est un peu plus complexe qu'elle n'y paraît car nous devons gérer des lignes `null` / vides.

Nous répétons donc la demande jusqu'à ce qu'il s'agisse d'un "nombre régulier". Les lignes `null` (cancel) et vide répondent également à cette condition car, sous forme numérique, elles valent `0`.

Après que nous nous sommes arrêtés, nous devons traiter spécialement les lignes `null` et vides (retourner `null`), car les convertit en nombre renverrait `0`.

