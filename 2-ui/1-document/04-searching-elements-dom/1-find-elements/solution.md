Il existe plusieurs façons de faire : 
En voici quelques unes : 

```js
// 1. Le tableau avec `id="age-table"`.
let table = document.getElementById('age-table')

// 2. Tous les éléments 'label' dans le tableau
table.getElementsByTagName('label')
// ou
document.querySelectorAll('#age-table label')

// 3. Le premier td dans ce tableau (avec le mot "Age")
table.rows[0].cells[0]
// ou
table.getElementsByTagName('td')[0]
// ou
table.querySelector('td')

// 4. Le formulaire avec le nom "search"
// en supposant qu'il n'y ait qu'un élément avec name="search" dans le document.
let form = document.getElementsByName('search')[0]
// ou spécifiquement un formulaire
document.querySelector('form[name="search"]')

// 5. Le premier input dans ce formulaire
form.getElementsByTagName('input')[0]
// ou
form.querySelector('input')

// 6. Le dernier input dans ce formulaire
let inputs = form.querySelectorAll('input') // trouve tous les inputs
inputs[inputs.length-1] // prend le dernier
```
