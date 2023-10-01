
function filterRangeInPlace(arr, a, b) {

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];
	 
	// enleve si en dehors de l'intervalle
    if (val < a || val > b) {
      arr.splice(i, 1);
      i--;
    }
  }

}
