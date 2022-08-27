importance: 5

---

# Quel gestionnaire s'exécute ?

Il y a un bouton dans la variable. Il n'y a pas de gestionnaires dessus.

Quels gestionnaires s'exécutent en cas de clic après le code suivant ? Quelles alertes s'affichent ?

<!--
# Which handlers run?

There's a button in the variable. There are no handlers on it.

Which handlers run on click after the following code? Which alerts show up?-->

```js no-beautify
button.addEventListener("click", () => alert("1"));

button.removeEventListener("click", () => alert("1"));

button.onclick = () => alert(2);
```
