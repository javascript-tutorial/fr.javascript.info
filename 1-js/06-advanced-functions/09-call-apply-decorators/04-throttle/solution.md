```js demo
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

Un appel à `throttle(func, ms)` retourne `wrapper`.

<<<<<<< HEAD
1. Lors du premier appel, le `wrapper` exécute simplement `func` et définit l'état de refroidissement (`isThrottled = true`).
2. Dans cet état, tous les appels sont mémorisés dans `savedArgs/savedThis`. Veuillez noter que le contexte et les arguments sont d'égale importance et doivent être mémorisés. Nous avons besoin d'eux simultanément pour reproduire l'appel.
3. ...Ensuite, après le passage de `ms` millisecondes,`setTimeout` se déclenche. L'état de refroidissement est supprimé (`isThrottled = false`). Et si nous avions ignoré les appels, alors `wrapper` est exécuté avec les derniers arguments et contextes mémorisés.
=======
1. During the first call, the `wrapper` just runs `func` and sets the cooldown state (`isThrottled = true`).
2. In this state all calls are memorized in `savedArgs/savedThis`. Please note that both the context and the arguments are equally important and should be memorized. We need them simultaneously to reproduce the call.
3. After `ms` milliseconds pass, `setTimeout` triggers. The cooldown state is removed (`isThrottled = false`) and, if we had ignored calls, `wrapper` is executed with the last memorized arguments and context.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

La 3ème étape n’exécute pas `func`, mais `wrapper`, car nous devons non seulement exécuter `func`, mais encore une fois entrer dans l’état de refroidissement et configurer le délai d’expiration pour le réinitialiser.
