//declare Function
function kwadraat(cijfer) {
  document.write(cijfer * cijfer);
}
//call function
kwadraat(4);

//meerdere argumenten gebruiken
function oppervlakte(lengte, breedte) {
  document.write(lengte * breedte);
}
oppervlakte(7,23); //161

function groet(voornaam, achternaam) {
  document.write("Hallo! Dag, " + voornaam + " " + achternaam + "!");
}
groet("Joris", "Raymaekers"); //input data-type: string, dus ""

//return keyword
function square(num) {
  return num * num;
}
var result = square(14);
document.write(result); //writes 196