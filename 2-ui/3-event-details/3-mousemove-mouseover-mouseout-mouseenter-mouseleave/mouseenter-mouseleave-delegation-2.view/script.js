// <td> sous la souris actuellement(le cas échéant)
let currentElem = null;

table.onmouseover = function(event) {
  // avant d'entrer dans un nouvel élément, la souris quitte toujours le précédent
  // Si currentElem est défini, nous n'avons pas quitté le précédent <td>,
  // c'est un mouseover à l'intérieur, ignore l'événement
  if (currentElem) return;

  let target = event.target.closest("td");

  // nous ne sommes pas passés dans un <td> - ignorer
  if (!target) return;

  // déplacé dans <td>, mais en dehors de notre tableau (possible en cas de tableaux imbriquées)
  // ignorer
  if (!table.contains(target)) return;

  // hourra! nous sommes entrés dans un nouveau <td>
  currentElem = target;
  onEnter(currentElem);
};

table.onmouseout = function(event) {
  // si nous sommes en dehors de tout <td> maintenant, alors ignorez l'événement
  // c'est probablement un mouvement à l'intérieur du tableau, mais en dehors des <td>,
  // par exemple. d'un <tr> à un autre <tr>
  if (!currentElem) return;

  // nous quittons l'élément - où aller ? Peut-être à un descendant ?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // monte dans la chaîne parente et vérifie - si nous sommes toujours dans currentElem
    // alors c'est une transition interne - l'ignorer
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // nous avons quitté le <td>. vraiment.
  onLeave(currentElem);
  currentElem = null;
};

// any functions to handle entering/leaving an element
function onEnter(elem) {
  elem.style.background = "pink";

  // show that in textarea
  text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
  text.scrollTop = 1e6;
}

function onLeave(elem) {
  elem.style.background = "";

  // show that in textarea
  text.value += `out <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = 1e6;
}
