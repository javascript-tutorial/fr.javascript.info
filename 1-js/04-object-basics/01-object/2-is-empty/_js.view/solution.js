function isEmpty(obj) {
  for (let key in obj) {
    // Si la boucle a commencé, il y a une propriété
    return false;
  }
  return true;
}