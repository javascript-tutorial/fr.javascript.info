// <td> sous la souris actuellement(le cas échéant)
let currentElem = null;

table.onmouseover = function(event) {
<<<<<<< HEAD
  if (currentElem) {
    // Avant d'entrer en contact avec un nouvel élément, la souris doit toujours quitte celui précèdent
    // Si nous ne quittons pas la balise  <td>  pour le moment, alors nous sommes toujours là-dessus, alors nous pouvons ignorer l'évènement
      return;
  }
=======
  // before entering a new element, the mouse always leaves the previous one
  // if currentElem is set, we didn't leave the previous <td>,
  // that's a mouseover inside it, ignore the event
  if (currentElem) return;
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

  let target = event.target.closest('td');

<<<<<<< HEAD
  //  Oui nous somme la dessus <td> maintenant
=======
  // we moved not into a <td> - ignore
  if (!target) return;

  // moved into <td>, but outside of our table (possible in case of nested tables)
  // ignore
  if (!table.contains(target)) return;

  // hooray! we entered a new <td>
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
  currentElem = target;
  target.style.background = 'pink';
};


table.onmouseout = function(event) {
<<<<<<< HEAD
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
=======
  // if we're outside of any <td> now, then ignore the event
  // that's probably a move inside the table, but out of <td>,
  // e.g. from <tr> to another <tr>
  if (!currentElem) return;

  // we're leaving the element – where to? Maybe to a descendant?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // go up the parent chain and check – if we're still inside currentElem
    // then that's an internal transition – ignore it
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // we left the <td>. really.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
  currentElem.style.background = '';
  currentElem = null;
};
