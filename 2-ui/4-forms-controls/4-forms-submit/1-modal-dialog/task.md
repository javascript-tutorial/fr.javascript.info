importance: 5

---

# Formulaire modal

Créez une fonction `showPrompt(html, callback)` qui montre un formulaire avec le message `html`, un champ de saisie et des boutons `OK/CANCEL`.

- Un utilisateur doit taper quelque chose dans un champ de texte et appuyer sur `key:Enter` ou sur le bouton OK, puis `callback(value)` est appelé avec la valeur saisie.
- Sinon, si l'utilisateur appuie sur `key:Esc` ou CANCEL, alors `callback(null)` est appelé.

Dans les deux cas, cela met fin au processus de saisie et supprime le formulaire.

Conditions:

- Le formulaire doit être au centre de la fenêtre.
- Le formulaire est *modal*.
En d'autres termes, aucune interaction avec le reste de la page n'est possible tant que l'utilisateur ne la ferme pas.
- Lorsque le formulaire est affiché, le focus doit être à l'intérieur de `<input>` pour l'utilisateur.
- Les touches `key:Tab`/`key:Shift+Tab` devraient déplacer le focus entre les champs du formulaire, ne pas lui permettre de partir pour d'autres éléments de la page.

Exemple d'utilisation:

```js
showPrompt("Enter something<br>...smart :)", function(value) {
  alert(value);
});
```

Une démo dans l'iframe:

[iframe src="solution" height=160 border=1]

P.S.
Le document source contient HTML/CSS pour le formulaire avec un positionnement fixe, mais c'est à vous de le rendre modal.
