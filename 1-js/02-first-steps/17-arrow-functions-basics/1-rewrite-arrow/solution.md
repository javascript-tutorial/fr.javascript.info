
```js run
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Do you agree?",
*!*
  () => alert("You agreed."),
  () => alert("You canceled the execution.")
*/!*
);
```

Ça a l'air court et propre, non ?
