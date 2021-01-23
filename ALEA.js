function init() { // sera appeler au début (chargement de la page)

  RndText();
  RndText2();
    setInterval(function () {LAFONCTIONENQUESTION();},3500)
      setInterval(function() { RndText(); }, 10000);
        setInterval(function() { RndText2(); }, 10000)
}

function LAFONCTIONENQUESTION() {
    var imageAChanger = document.getElementById("imgAleatoire");
    var num = (Math.random()*8)+1;
    num = Math.floor(num);
    imageAChanger.setAttribute("src","ALA1/" + num + ".jpg");

    var imageAChanger = document.getElementById("imgAleatoire2");
    var num = (Math.random()*8)+1;
    num = Math.floor(num);
    imageAChanger.setAttribute("src","ALA2/" + num + ".jpg");

    var imageAChanger = document.getElementById("imgAleatoire3");
    var num = (Math.random()*8)+1;
    num = Math.floor(num);
    imageAChanger.setAttribute("src","ALA3/" + num + ".jpg");


}
function RndText() {
  var textarray = [
   "Sur Mars, il existe un volcan presque 3 fois plus haut que l'Himalaya. Avec ses 22.5 Km de haut, le mont Olympe est tellement imposant qu'il s'étend encore plus loin que l'horizon.",
   "Un cousin des méduses vivant en eau douce, l'hydre, est le seul animal qui ne peut pas mourrir naturellement.",
   "Manger une pomme de terre revient à manger une tige du plant de patate. Ce n'est pas une racine.",
   "La femelle requin du Groenland devient mature à l'âge avancé de 150 ans.",
   "L'eurylaime est le seul oiseau capable de chanter... avec ses ailes !",
   "L'animal le plus rapide du monde n'est pas le guépard, mais la fourmi Dracula. Elle ferme ses mandibules 5000 fois plus rapidement qu'un clignement d'oeil.",
   "La crevette-mante a une frappe tellement puissante qu'elle peut faire bouillir l'eau à proximité de ses pattes.",
   "Le moustique est l'animal tuant le plus d'humains. L'equivalent de 750 000 vies chaque année.",
   "La chouette possède deux fois plus de vertèbres dans son cou que la girafe : 14 vertèbres contre 7. Ceci lui permet de tourner la tête à 270°.",
   "L'endroit le plus profond sur Terre se situe dans les fosses Mariannes, à presque 11 000 m sous la surface. A cette profondeur la pression est si importante que cela revient à supporter le poids d'une voiture sur le bout d'un doigt.",
   "Le tardigrade, aussi appelé Ourson d'eau, est capable de survivre pendant 10 jours dans le vide de l'espace. L'homme y meurt en 90 secondes.",
   "Le poisson monacoa, Monacoa niger, produit de la lumière par l'anus.",
   "Un être humain sur deux est atteint de la toxoplasmose. Cette maladie est notamment connue pour modifier le comportement des souris qu'elle infecte. Ces dernières perdent alors la notion du danger, et ne prennent plus la fuite face à un prédateur.",
   "Chaque défaite rend la crinière des lions plus claire. C'est pourquoi les lionnes préfèrent les mâles aux crinières sombres."    // No comma after last entry
  ];
  var rannum= Math.floor(Math.random()*textarray.length);


  document.getElementById('ShowText').innerHTML=textarray[rannum];

}

function RndText2() {
  var textarray = [
   "Sur Mars, il existe un volcan presque 3 fois plus haut que l'Himalaya. Avec ses 22.5 Km de haut, le mont Olympe est tellement imposant qu'il s'étend encore plus loin que l'horizon.",
   "Un cousin des méduses vivant en eau douce, l'hydre, est le seul animal qui ne peut pas mourrir naturellement.",
   "Manger une pomme de terre revient à manger une tige du plant de patate. Ce n'est pas une racine.",
   "La femelle requin du Groenland devient mature à l'âge avancé de 150 ans.",
   "L'eurylaime est le seul oiseau capable de chanter... avec ses ailes !",
   "L'animal le plus rapide du monde n'est pas le guépard, mais la fourmi Dracula. Elle ferme ses mandibules 5000 fois plus rapidement qu'un clignement d'oeil.",
   "La crevette-mante a une frappe tellement puissante qu'elle peut faire bouillir l'eau à proximité de ses pattes.",
   "Le moustique est l'animal tuant le plus d'humains. L'equivalent de 750 000 vies chaque année.",
   "La chouette possède deux fois plus de vertèbres dans son cou que la girafe : 14 vertèbres contre 7. Ceci lui permet de tourner la tête à 270°.",
   "L'endroit le plus profond sur Terre se situe dans les fosses Mariannes, à presque 11 000 m sous la surface. A cette profondeur la pression est si importante que cela revient à supporter le poids d'une voiture sur le bout d'un doigt.",
   "Le tardigrade, aussi appelé Ourson d'eau, est capable de survivre pendant 10 jours dans le vide de l'espace. L'homme y meurt en 90 secondes.",
   "Le poisson monacoa, Monacoa niger, produit de la lumière par l'anus.",
   "Un être humain sur deux est atteint de la toxoplasmose. Cette maladie est notamment connue pour modifier le comportement des souris qu'elle infecte. Ces dernières perdent alors la notion du danger, et ne prennent plus la fuite face à un prédateur.",
   "Chaque défaite rend la crinière des lions plus claire. C'est pourquoi les lionnes préfèrent les mâles aux crinières sombres."    // No comma after last entry
  ];
  var rannum= Math.floor(Math.random()*textarray.length);


  document.getElementById('ShowText2').innerHTML=textarray[rannum];

}


function DOUBLEINVISBLE(){
CALLINVI();
scrollWin();
}

function scrollWin() {
  window.scrollTo({
 top: 1,
 left: 0,
 behavior: 'smooth'
});
}

function CALLINVI(){
  if(document.getElementById('invisible').style.display == 'none'){
    document.getElementById('invisible').style.display = 'block';
    }
    else {
    document.getElementById('invisible').style.display = 'none';
  }
}
