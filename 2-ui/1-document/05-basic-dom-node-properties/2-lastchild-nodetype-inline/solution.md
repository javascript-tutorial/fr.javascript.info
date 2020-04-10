Il y a un piège ici.

Au moment de l'exécution de `<script>`, le dernier nœud DOM est exactement `<script>`, car le navigateur n'a pas encore traité le reste de la page.

Le résultat est donc `1` (nœud élément).

```html run height=60
<html>

<body>
  <script>
    alert(document.body.lastChild.nodeType);
  </script>
</body>

</html>
```
