importance: 5

---

# Décorateur spy

Créez un décorateur `spy(func)` qui devrait renvoyer un wrapper qui enregistre tous les appels à la fonction dans sa propriété `calls`.

Chaque appel est enregistré sous la forme d'un tableau d'arguments.

Par exemple:

```js
function work(a, b) {
  alert(a + b); // work est une fonction ou une méthode arbitraire
}

*!*
work = spy(work);
*/!*

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert('call:' + args.join()); // "call:1,2", "call:4,5"
}
```

P.S.
Ce décorateur est parfois utile pour les tests unitaires.
Sa forme avancée est `sinon.spy` dans la bibliothèque [Sinon.JS](http://sinonjs.org/).
