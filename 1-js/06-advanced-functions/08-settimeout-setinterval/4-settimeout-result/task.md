importance: 5

---

# Que va afficher setTimeout ?

Dans le code ci-dessous il y a une exécution planifié par `setTimeout`, suivie par un calcul conséquent qui prend plus de 100ms à tourner.

Quand la fonction planifiée va-t-elle s'exécuter ?

1. Après la boucle.
2. Avant la boucle.
3. Au début de la boucle.

Qu'est-ce que `alert` va afficher ?

```js
let i = 0;

setTimeout(() => alert(i), 100); // ?

// on considère que cette fonction met plus de 100ms à s'exécuter
for(let j = 0; j < 100000000; j++) {
  i++;
}
```
