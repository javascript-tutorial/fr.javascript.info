# Style Shadow DOM

Le Shadow DOM peut inclure les balises `<style>` et `<link rel="stylesheet" href="…">`. Dans le second cas, les feuilles de styles sont mises en cache (HTTP), elles ne seront donc pas re-téléchargées pour plusieurs componsants qui utilisent les mêmes ressources.

En règle général, les styles locaux fonctionnent uniquement au sein de l'arborescence shadow, les styles du document fonctionnent en dehors, mais il existe quelques exceptions.