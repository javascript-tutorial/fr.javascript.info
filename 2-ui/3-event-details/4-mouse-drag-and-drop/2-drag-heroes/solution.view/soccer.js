let isDragging = false;

document.addEventListener('mousedown', function(event) {

  let dragElement = event.target.closest('.draggable');

  if (!dragElement) return;

  event.preventDefault();

  dragElement.ondragstart = function() {
      return false;
  };

  let coords, shiftX, shiftY;

  startDrag(dragElement, event.clientX, event.clientY);

  function onMouseUp(event) {
    finishDrag();
  };

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  // commencer a l'evenement  deplacer:
  //  se rappeler du changement initial
  //   depalcerla position:fixed de  l' element  et un element enfant directe de l'element body
  function startDrag(element, clientX, clientY) {
    if(isDragging) {
      return;
    }

    isDragging = true;

    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    element.style.position = 'fixed';

    moveAt(clientX, clientY);
  };

  // changer a absolue les coordonnees en  bas, pour fixer l'element dans le document
  function finishDrag() {
    if(!isDragging) {
      return;
    }

    isDragging = false;

    dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
    dragElement.style.position = 'absolute';

    document.removeEventListener('mousemove', onMouseMove);
    dragElement.removeEventListener('mouseup', onMouseUp);
  }

  function moveAt(clientX, clientY) {
    // nouvelles coordonnees relatives a la fenetre
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    // controler si les nouvelles coordonneses sont au dessous sous du bord inferieur de la fenetre
    let newBottom = newY + dragElement.offsetHeight; // new bottom

    // au dessous de la fenetre? on fait defiler la page
    if (newBottom > document.documentElement.clientHeight) {
      // fin de coordonne relativement a la fenetre du document
      let docBottom = document.documentElement.getBoundingClientRect().bottom;

      // fait defiler le document vers le bas par 10px contient un probleme
      // cela peut defiler au dela de la fin du document
      // Math.min(combien reste t il vers la fin du document, 10)
      let scrollY = Math.min(docBottom - newBottom, 10);

      // les calsculs sont imprecises, il peut subsiter des erreurs d'arrondis pouvant mener a un defilement vers le haut
      // cela ne devrait pas exister, on resouds cela ici
      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, scrollY);

      // un deplacement rapide de la souris  peut mettre le curseur au dela des limites du document
      // Si cela survient-
      // limite le nouveau Y (new Y) au maximum possible ( tout just au bas dudocument)
      newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
    }

    // Controler si les nouvelles coordonnees sont au dessus des limites superieures de la fenetre ( logique similaire)
    if (newY < 0) {
      // defile vers le haut
      let scrollY = Math.min(-newY, 10);
      if (scrollY < 0) scrollY = 0; // controler les erreurs de precisions

      window.scrollBy(0, -scrollY);
      //un deplacement rapide de la souris  peut mettre le curseur au dela du debut du document
      newY = Math.max(newY, 0); // newY ne doit pas etre moins de 0
    }

    // limite le nouveau X  (new X) dans les limites de la fenetre
    // il n'y a pas de defilement donc c'est simple
    if (newX < 0) newX = 0;
    if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + 'px';
    dragElement.style.top = newY + 'px';
  }

});
