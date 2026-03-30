
Vous pouvez noter ce qui suit :

```js no-beautify
<<<<<<< HEAD
function pow(x,n)  // <- pas d'espace entre les arguments
{  // <- accolade sur une ligne séparée
  let result=1;   // <- pas d'espaces des deux côtés de =
  for(let i=0;i<n;i++) {result*=x;}   // <- pas d'espaces
  // le contenu de {...} devrait être sur une nouvelle ligne
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- techniquement possible,
// mais mieux vaut en faire 2 lignes, il n'y a également pas d'espaces et de ;
if (n<=0)  // <- pas d'espaces à l'intérieur (n <= 0), et devrait être une ligne supplémentaire au-dessus
{   // <- accolade sur une ligne séparée
  // ci-dessous - une longue ligne, peut être utile de la scinder en 2 lignes
=======
function pow(x,n)  // <- no space between arguments
{  // <- curly brace on a separate line
  let result=1;   // <- no spaces before or after =
  for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
  // the contents of { ... } should be on a new line
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
// but better make it 2 lines, also there's no spaces and missing ;
if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
{   // <- curly brace on a separate line
  // below - long lines can be split into multiple lines for improved readability
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else // <- pourrait l'écrire sur une seule ligne comme "} else {"
{
  alert(pow(x,n))  // pas d'espaces et ; manquant
}
```

La variante réparée :

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n <= 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number greater than zero`);
} else {
  alert( pow(x, n) );
}
```
