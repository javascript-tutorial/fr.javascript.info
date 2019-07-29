importance: 5

---

# Réécrire le "switch" dans un "if"

Écrivez le code en utilisant `if..else` qui correspondrait au `switch` suivant :

```js
switch (browser) {
  case 'Edge':
    alert( "У вас браузер Edge!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    alert( 'Мы поддерживаем и эти браузеры' );
    break;

  default:
    alert( 'Надеемся, что эта страница выглядит хорошо!' );
}
```
