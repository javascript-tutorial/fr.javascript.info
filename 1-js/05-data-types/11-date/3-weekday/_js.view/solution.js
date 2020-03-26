function getLocalDay(date) {

  let day = date.getDay();

  if (day == 0) { // semaine 0 (dimanche) est 7 en européen
    day = 7;
  }

  return day;
}
