
`setTimeout` ne peut s'exécuter qu'une fois le bloc de code courant terminé.

Le `i` sera donc le dernier : `100000000`.

```js run
let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// on considère que cette fonction met plus de 100ms à s'exécuter
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
