# Formulaire: évènement et function  submit

l'évènement `submit`  se déclenche lorsque le formulaire est soumis, il est généralement utilisé pour valider le formulaire avant de l'envoyer au serveur ou pour abandonner la soumission et la traiter en JavaScript.

The méthode `form.submit()` permet de lancer l'envoi de formulaire depuis JavaScript. Nous pouvons l'utiliser pour créer et envoyer dynamiquement nos propres formulaires au serveur.

Let's see more details of them Voyons plus de détails sur ces méthodes.

## l'évènement: submit

Il existe deux façons principales de soumettre un formulaire :

1. La première -- cliquer `<input type="submit">` ou `<input type="image">`.
2. La deuxième -- appuyer `key:Enter` sur un champ de saisie.

Les deux actions déclenchent  l'événement `submit` sur le formulaire. Le gestionnaire peut vérifier les données entrées, et s'il y a des erreurs, les afficher et appeler `event.preventDefault()`, pour empêcher les données d'être envoyer au serveur.

Dans le formulaire ci-dessous:
1. Allez dans le champ de texte et appuyez sur la `touche:Enter`.
2. Cliquer sur `<input type="submit">`.

Les deux actions montrent `alert` et le formulaire n'est envoyé nulle part à cause de l'instruction `return false`:

```html autorun height=60 no-beautify
<form onsubmit="alert('submit!');return false">
  1- Entrez dans le champ de saisie <input type="text" value="text"><br>
  2- Cliquer sur "submit": <input type="submit" value="Submit">
</form>
```

````smart header="Relation entre `submit` et `click`"
Lorsqu'un formulaire est envoyé en utilisant la `touche:Enter` sur un champ de saisie, un évènement `click` est déclenché sur `<input type="submit">`.

C'est plutôt drôle, car il n'y a pas eu de clic du tout.

Voici la démo:
```html autorun height=60
<form onsubmit="return false">
 <input type="text" size="30" value="Focus here and press enter">
 <input type="submit" value="Submit" *!*onclick="alert('click')"*/!*>
</form>
```

````

## La function: submit

Pour soumettre manuellement un formulaire au serveur, nous pouvons appeler `form.submit()`.

Ensuite, l'événement `submit` n'est pas généré. On suppose que si le programmeur appelle `form.submit ()`, alors le script a déjà effectué tous les traitements associés.

Parfois, cela est utilisé pour créer et envoyer manuellement un formulaire, comme ceci:

```js run
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

//le formulaire doit être dans le document pour pouvoir être soumis
document.body.append(form);

form.submit();
```
