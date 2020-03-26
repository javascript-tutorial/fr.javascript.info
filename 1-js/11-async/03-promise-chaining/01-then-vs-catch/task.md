# Promesse: then contre catch

Ces fragments de code sont-ils égaux? En d'autres termes, se comportent-ils de la même manière en toutes circonstances, pour toutes les fonctions gestionnaires?

```js
promise.then(f1).catch(f2);
```

Contre:

```js
promise.then(f1, f2);
```
