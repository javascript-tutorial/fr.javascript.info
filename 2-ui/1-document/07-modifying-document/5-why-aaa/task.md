importance: 1

---

# Pourquoi "aaa" reste-t-il ?

Dans l'exemple ci-dessous, l'appel `table.remove()` supprime le tableau du document.

mais si vous l'exécutez, vous pouvez voir que le texte `"aaa"` est toujours visible.

Pourquoi cela se produit-il ?

```html height=100 run
<table id="table">
  aaa
  <tr>
    <td>Test</td>
  </tr>
</table>

<script>
  alert(table); // la table, comme il se doit

  table.remove();
<<<<<<< HEAD
  // pourquoi y a-t-il encore aaa dans le document ?
=======
  // why there's still "aaa" in the document?
>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322
</script>
```
