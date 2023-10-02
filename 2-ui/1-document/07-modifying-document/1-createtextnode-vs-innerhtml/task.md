importance: 5

---

# createTextNode vs innerHTML vs textContent

Nous avons un élément DOM vide `elem` et une chaîne de caractères `text`.

Lesquelles de ces 3 commandes feront exactement la même chose ?

1.
`elem.append(document.createTextNode(text))`
2.
`elem.innerHTML = text`
3.
`elem.textContent = text`
