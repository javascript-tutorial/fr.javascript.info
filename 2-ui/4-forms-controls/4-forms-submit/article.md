# Formulaires: l'événement et la méthode "submit"

L'événement `submit` se déclenche lorsque le formulaire est soumis, il est généralement utilisé pour valider le formulaire avant de l'envoyer au serveur ou pour abandonner la soumission et la traiter en JavaScript.

La méthode `form.submit()` permet de lancer l'envoi de formulaire depuis JavaScript. Nous pouvons l'utiliser pour créer et envoyer dynamiquement nos propres formulaires au serveur.

Voyons-les plus en détail.

## Évènement: submit

1. Le premier - cliquer sur `<input type="submit">` ou `<input type="image">`.
2. La seconde - appuyez sur `key:Enter` dans un champ de saisie.

Les deux actions mènent à l'événement `submit` sur le formulaire. Le gestionnaire peut vérifier les données, et s'il y a des erreurs, les afficher et appeler `event.preventDefault()`, alors le formulaire ne sera pas envoyé au serveur.

Dans le formulaire ci-dessous:
1. Allez dans le champ de texte et appuyez sur `key:Enter`.
2. Cliquez sur `<input type ="submit">`.

Les deux actions affichent `alert` et le formulaire n'est envoyé nulle part en raison de `return false`:

```html autorun height=60 no-beautify
<form onsubmit="alert('submit!');return false">
  First: Enter in the input field <input type="text" value="text"><br>
  Second: Click "submit": <input type="submit" value="Submit">
</form>
```

````smart header="Relation entre `submit` et `click`"
Lorsqu'un formulaire est envoyé en utilisant `key:Enter` sur un champ de saisie, un événement `click` se déclenche sur `<input type="submit">`.

C'est plutôt drôle, car il n'y a pas eu de clic du tout.

Voici la démo:
```html autorun height=60
<form onsubmit="return false">
 <input type="text" size="30" value="Focus here and press enter">
 <input type="submit" value="Submit" *!*onclick="alert('click')"*/!*>
</form>
```

````

## Méthode: submit

Pour soumettre manuellement un formulaire au serveur, nous pouvons appeler `form.submit()`.

Ensuite, l'événement `submit` n'est pas généré. On suppose que si le programmeur appelle `form.submit()`, alors le script a déjà effectué tous les traitements associés.

Parfois, cela est utilisé pour créer et envoyer manuellement un formulaire, comme ceci:

```js run
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// le formulaire doit être dans le document pour le soumettre
document.body.append(form);

form.submit();
```
