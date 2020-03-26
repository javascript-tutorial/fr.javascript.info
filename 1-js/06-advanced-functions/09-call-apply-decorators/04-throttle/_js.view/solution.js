function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      // mémo derniers arguments à appeler après le temps de recharge
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    // sinon aller en état de recharge
    func.apply(this, arguments);

    isThrottled = true;

    // prévoir de réinitialiser isThrottled après le délai
    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        // s'il y a eu des appels, savedThis/savedArgs auront le dernier
        // appel récursif exécute la fonction et redéfinit le temps de recharge
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}