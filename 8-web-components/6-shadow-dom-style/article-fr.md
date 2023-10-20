# Application de style depuis le Shadow DOM

Le Shadow DOM peut inclure des balises `<style>` and `<link rel="stylesheet" href="…">`. Dans le dernier cas, les feuilles de style sont mises en cache (HTTP-Cached), donc elles ne sont pas retéléchargées pour plusieurs composants qui utilisent le même template.

En règle générale, les styles locaux fonctionnent au sein de l'arborescence Shadow, et les styles du document fonctionnent en dehors. Mais il y a quelques exceptions. 