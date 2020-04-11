Réponse : **1 et 3**.

Les deux commandes ont pour résultat d'ajouter le `texte` "en tant que texte" dans `elem`.

Voici un exemple :

```html run height=80
<div id="elem1"></div>
<div id="elem2"></div>
<div id="elem3"></div>
<script>
  let text = '<b>text</b>';

  elem1.append(document.createTextNode(text));
  elem2.innerHTML = text;
  elem3.textContent = text;
</script>
```
