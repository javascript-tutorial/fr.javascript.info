Vous pouvez noter ce qui suit :

```js no-beautify
function pow(x,n)  // <- Pas d'espace entre les arguments
{  // <- Accolade sur une ligne séparée
  let result=1;   // <- Pas d'espaces des deux côtés de =
  for(let i=0;i<n;i++) {result*=x;}   // <- Pas d'espaces
  // Le contenu de {...} devrait être sur une nouvelle ligne
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- Techniquement possible,
// Mais mieux vaut en faire 2 lignes, il n'y a également pas d'espaces et de ;
if (n<=0)  // <- Pas d'espaces à l'intérieur (n <= 0), et devrait être une ligne supplémentaire au-dessus
{   // <- Accolade sur une ligne séparée
  // Ci-dessous - une longue ligne, peut être utile de la scinder en 2 lignes
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else // <- Pourrait être écris sur une seule ligne comme "} else {"
{
  alert(pow(x,n))  // Pas d'espaces et ; manquant
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
  alert(pow(x, n));
}
```