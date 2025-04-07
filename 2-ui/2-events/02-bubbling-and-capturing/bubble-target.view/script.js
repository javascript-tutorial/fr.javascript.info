
form.onclick = function(event) {
  event.target.style.backgroundColor = 'yellow';

  // Le navigateur a besoin d'un peu de temps pour peindre en jaune
  setTimeout(() => {
    alert("target = " + event.target.tagName + ", this=" + this.tagName);
    event.target.style.backgroundColor = ''
  }, 0);
};
