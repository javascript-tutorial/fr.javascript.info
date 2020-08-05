importance: 5

---

# Modal form

Crér la function `showPrompt(html, callback)`  qui montre un formulaire avec le message `html`, un champ de saisie et des boutons `OK/CANCEL`.

- Un utilisateur doit pouvoir taper quelque chose dans un champ de texte et appuyer sur la `touche:Enter` ou sur le bouton OK, puis un `callback(value)` est appelé avec la valeur saisie.
- Sinon si l'utilisateur appuie sur la  `touche:Esc` ou CANCEL, alors un `callback(null)`  est appeler.

Dans les deux cas, cela met fin au processus de saisie et supprime le formulaire.

Exigences:

- Le formulaire doit être au centre de la fenêtre.
- Le formulaire est un *modal*. En d'autres termes, aucune interaction avec le reste de la page n'est possible tant que l'utilisateur ne la ferme pas.
- Lorsque le formulaire est affiché, le focus doit être à l'intérieur de `<input>` pour l'utilisateur.
- Les touches `touche:Tab`/`touches:Shift+Tab` devrait déplacer le focus entre les champs du formulaire, ne lui permettez pas de partir pour d'autres éléments de la page.

Exemple d'utilisation:

```js
showPrompt("Enter something<br>...smart :)", function(value) {
  alert(value);
});
```

Une démo dans l'iframe:

[iframe src="solution" height=160 border=1]

P.S. Le document source a HTML / CSS pour le formulaire avec un positionnement fixe, mais c'est à vous de le transformer en modal.
