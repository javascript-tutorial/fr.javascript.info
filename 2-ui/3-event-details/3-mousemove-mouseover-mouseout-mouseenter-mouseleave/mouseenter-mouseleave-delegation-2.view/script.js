// <td> sous la souris actuellement(le cas échéant)
let currentElem = null;

table.onmouseover = function(event) {
  if (currentElem) {
    // Avant d'entrer en contact avec un nouvel élément, la souris doit toujours quitte celui précèdent
    // Si nous ne quittons pas la balise  <td>  pour le moment, alors nous sommes toujours là-dessus, alors nous pouvons ignorer l'évènement
      return;
  }

  let target = event.target.closest('td');
  if (!target || !table.contains(target)) return;

  //  Oui nous somme la dessus <td> maintenant
  currentElem = target;
  target.style.background = 'pink';
};


table.onmouseout = function(event) {
  // Si nous somme en dehors de toute balise de <td> maintenant, alors nous pouvons ignorer l'évènement
  if (!currentElem) return;

  // Nous quittons l'élément --  pour aller où? Peut-être sur un élément enfant?
  let relatedTarget = event.relatedTarget;
  if (relatedTarget) { // possible: relatedTarget = null
    while (relatedTarget) {
      // Remontez la chaine jusqu'au parent et contrôler-- si nous sommes toujours à l'intérieur de  currentElem
      // ainsi donc il s'agit bien d'une transition interne --ignorez le
      if (relatedTarget == currentElem) return;
      relatedTarget = relatedTarget.parentNode;
    }
  }

  // Nous avons quitté l'élément. Vraiment.
  currentElem.style.background = '';
  currentElem = null;
};
