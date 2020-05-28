importance: 5

---

# Réécrire le "switch" dans un "if"

Écrivez le code en utilisant `if..else` qui correspondrait au `switch` suivant :

```js
switch (browser) {
  case 'Edge':
    alert( "You've got the Edge!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    alert( 'Okay we support these browsers too' );
    break;

  default:
    alert( 'We hope that this page looks ok!' );
}
```

