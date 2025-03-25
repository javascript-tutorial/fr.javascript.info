importance: 5

---

# Quel gestionnaire est exécuté?

Il y a un bouton dans la variable `button`. Il n'a aucun gestionnaire d'événement sur le bouton.

Quels gestionnaires vont s'exécuter lors d'un clic? Quelles alertes vont s'afficher?

```js no-beautify
button.addEventListener("click", () => alert("1"));

button.removeEventListener("click", () => alert("1"));

button.onclick = () => alert(2);
```
