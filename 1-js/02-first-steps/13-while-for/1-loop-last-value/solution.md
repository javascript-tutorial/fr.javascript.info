La réponse : `1`.

```js run
let i = 3;

while (i) {
  alert(i--);
}
```

Chaque itération de boucle diminue `i` de `1` (on parle de décrémentation). La vérification `while(i)` arrête la boucle lorsque `i = 0`.

Par conséquent, les étapes de la boucle forment la séquence suivante ("boucle décomposée") :

```js
let i = 3;

alert(i--); // Affiche 3, diminue i à 2

alert(i--) // Affiche 2, diminue i à 1

alert(i--) // Affiche 1, diminue i à 0

// Terminé, la vérification while(i) termine la boucle
```