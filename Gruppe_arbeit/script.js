/* Script Shop Seite */

/*--------------------------------------- Script Shop Seite ------------------------------*/

/*script code für Tab Menu*/
const tabs = document.querySelectorAll('.tab_btn'); /*List of all tab button*/
const all_content = document.querySelectorAll('.content');/*All content of a tab*/

tabs.forEach((tab, index) => {
  tab.addEventListener('click', (e) => {
    tabs.forEach(tab => { tab.classList.remove('active') });
    tab.classList.add('active');

    var line = document.querySelector('.line');
    line.style.width = e.target.offsetWidth + "px";
    line.style.left = e.target.offsetLeft + "px";

    all_content.forEach(content => { content.classList.remove('active') });
    all_content[index].classList.add('active');
  })

})


function fetchImages() {
  fetch('data.json')      /*read a json file*/
    .then(response => response.json())
      .then(data => {
        let topImages = data.filter(image => image.part === 'top');   /*filter in json file for a top artikel*/
        let shortImages = data.filter(image => image.part === 'short');
        let socketImages = data.filter(image => image.part === 'socket');

        displayImages(topImages, 'image-container1');
        displayImages(shortImages, 'image-container2');
        displayImages(socketImages, 'image-container3');
    })
    .catch(error => console.error('Fehler beim Abrufen von Bildern:', error));
}

// show all matches images on a container
function displayImages(images, containerId) {
  let imageContainer = document.getElementById(containerId);

  if(imageContainer){
    images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image.url;
      imgElement.alt = image.color;
  
      const priceElement = document.createElement('div');
      priceElement.classList.add('price');
      priceElement.textContent = `${image.price}$`;
  
      let addToCartIcon = document.createElement('button');
      addToCartIcon.classList.add('pick-btn');
      addToCartIcon.textContent ='Pick';
      addToCartIcon.addEventListener('click', () => {
        addToCart(image);
      });
      let addInfos = document.createElement('div');
      addInfos.classList.add('infos-content');
      addInfos.textContent =`${image.description}`;
      const heartIcon = document.createElement('i');
  
      heartIcon.classList.add('fas', 'fa-heart', 'heart-icon');
        addToFavorites(heartIcon);
  
        //ein div für price und Warenkorb
        const priceAndCart = document.createElement('div');
        priceAndCart.classList.add('price-and-cart');
        priceAndCart.appendChild(priceElement);
      priceAndCart.appendChild(addToCartIcon);
      
      //ein div für sterne bezüglich der Evaluirung des Produkts
      let startContainer = document.createElement('div');
      startContainer.classList.add('startContainer');
      let start1 = document.createElement('i');
      let start2 = document.createElement('i');
      let start3 = document.createElement('i');
      let start4 = document.createElement('i');
      let start5 = document.createElement('i');
      let bewert = document.createElement('div');
      bewert.classList.add('bewertCount');
      bewert.textContent = '(1.452k)';
      
     
      start2.classList.add('fa-solid', 'fa-star');
      start3.classList.add('fa-solid', 'fa-star');
      start4.classList.add('fa-solid', 'fa-star');
      start1.classList.add('fa-solid', 'fa-star');
      start5.classList.add('fa-solid', 'fa-star-half');
      startContainer.appendChild(start1);
      startContainer.appendChild(start2);
      startContainer.appendChild(start3);
      startContainer.appendChild(start4);
      startContainer.appendChild(start5);
      startContainer.appendChild(bewert);
  
      
  
       //ein div für imageund pise sowie infso
      let imageundInfo = document.createElement('div');
      imageundInfo.classList.add('produkt-content-short');
  
      
  
      const imageItem = document.createElement('div');
      imageItem.appendChild(heartIcon);
      imageItem.classList.add('image-item');
      imageItem.appendChild(imgElement);
  
      imageundInfo.appendChild(imageItem);
      imageundInfo.appendChild(addInfos);
      imageundInfo.appendChild(priceAndCart);
      imageundInfo.appendChild(startContainer);
      
      imageContainer.appendChild(imageundInfo);
    });
  }
}



//Fonction to add image in a cart

function addToCart(image) {
  // pick and build in shop-page
  if (image.part === 'top') {
    choosedTop = {            /*declare on line 258*/
      url: image.url,
      desc: image.description,
      preis: image.price,
    };
    allChoose();
    
  }
  if (image.part === 'short') {
    choosedShort = {
      url: image.url,
      desc: image.description,
      preis: image.price,
    };
    allChoose();
    
  }
  if (image.part === 'socket') {
    choosedSocket = {
      url: image.url,
      desc: image.description,
      preis: image.price,
    };
    allChoose();
    
  }
    
  }

// favorite icon count
function addToFavorites(heartIcon) {
  let heartCounter = document.querySelector('.heart-count');
  let isClicked = true;

  heartIcon.addEventListener('click', () => {
    heartIcon.classList.toggle('clicked');
    if(heartCounter){
      let clickCount = parseInt(heartCounter.innerHTML)
    if (isClicked) {
      // heartCounter.setAttribute('data-count', clickCount + 1);
      heartCounter.innerHTML = clickCount+1;

    } else {
      // heartCounter.setAttribute('data-count', clickCount - 1);
      heartCounter.innerHTML = clickCount - 1;
    }
    isClicked = !isClicked;
    heartCounter.classList.add('on');
    }

  });
}

// execute of the function to show all matches informations and images
fetchImages()


// verify if all parts for the build were choosed
function allChoose() {
  afficherMessageFlottant("Hinzugefügt");
  if (choosedTop && choosedShort && choosedSocket) {
    // prüft, ob alle Kits-Teile vom User schon ausgewählt sind
    choosedElemente = [choosedTop, choosedShort, choosedSocket]; //Danach sind die ausgewählte Teilen in die Liste gespeichert, damit man es in Warenkorb nutzen kann
    //alert('gewählte in Warenkorb hinlegen');
    const popError = document.getElementById('popupPerror')
    const messageError = popError.querySelector('.Message')
    let a = document.createElement('a')
    a.href="#popupPerror"
    messageError.innerHTML = "Weiter Zum Warenkorb"
    a.click()
    
    const korbDiv = document.querySelector(".korb");
    const korbZahl = korbDiv.querySelector(".circle");
    allWarenkrbElem.push(choosedElemente)
    let zahl = parseInt(korbZahl.innerHTML);
    korbZahl.innerHTML = String(zahl + 1);

    choosedTop = ""
    choosedShort = ""
    choosedSocket = ""
    choosedElemente = [];
  }
}

// Fonction to show a flottant message
function afficherMessageFlottant(retunrMessage) {
 // create a element of  flottant message
  var messageFlottant = document.createElement('div');
  messageFlottant.classList.add('message-flottant');

  // create a icon-element
  var icone = document.createElement('i');
  icone.classList.add('fas', 'fa-check');

  // create a text-element
  var texte = document.createElement('span');
  texte.textContent = String(retunrMessage);

  // Add icon and text-element of floating message
  messageFlottant.appendChild(icone);
  messageFlottant.appendChild(texte);

  // Add element of floating message to the body-page
  document.body.appendChild(messageFlottant);

  // setting a timer to gradually make a floating message invisible
  var opacite = .7;
  var timer = setInterval(function() {
    opacite -= 0.1;
    messageFlottant.style.opacity = opacite;
    if (opacite <= 0) {
      clearInterval(timer);
      messageFlottant.remove();
    }
  }, 100);
}
/*-----------------------------------------Script Shop ende -------------------------------*/





// update automatically a year with javascript
const year = document.querySelector(".date");
if(year){
  year.innerHTML = new Date().getFullYear();
}

// Javascript Teil unserer Aufgabe
let saw = 0;              /*variable to see if one div-question was already clicked*/
let choosedTop = "";
let choosedShort = "";
let choosedSocket = "";
let choosedElemente = [];   //List of the choosed parts

let allWarenkrbElem = [];   //List of all Kits to show on the cart

// operationen um die MenuListe anzuzeigen und zu closeMenu, beim kleinen Dimensionen
const sidemenu = document.getElementById("sideMenu");

function openMenu() {
  sidemenu.style.right = "0";
}

function closeMenu() {
  sidemenu.style.right = "-200px";
}

// script to frage
const chevrons = document.getElementsByClassName("icon-chevron"); //all icon chevron in each Div

const configDiv = document.querySelector(".config");
const divAnswerConfig = document.querySelector(".textvon");
let answeConfig = []

if(divAnswerConfig){
   answeConfig = divAnswerConfig.getElementsByTagName("p");
}

const bestSelDiv = document.querySelector(".best");
const divImageBest = document.querySelector(".BestSeller");

const materialDiv = document.querySelector(".Material");
const divImageMaterial = document.querySelector(".Materiallen");

if(configDiv){
  configDiv.addEventListener("click", () => {
    pulldownFrage(divAnswerConfig, configDiv);
  });
}

if(bestSelDiv){
  bestSelDiv.addEventListener("click", () => {
    pulldownFrage(divImageBest, bestSelDiv);
  });
}

if(materialDiv){
  materialDiv.addEventListener("click", () => {
    pulldownFrage(divImageMaterial, materialDiv);
  });
}

// function to drop-down the question auf der Home
function pulldownFrage(place, parent) {
  place.style.height = "0px";
  let chevron;

  if (istChild(place, answeConfig[0]))
    answeConfig[0].style.visibility = "hidden";

  for (elem of chevrons) {
    if (istChild(parent, elem)) chevron = elem;
  }

  chevron.style.transform = "rotate(0deg)";

  if (saw % 2 == 0) {
    place.style.height = "150px";

    if (istChild(place, answeConfig[0]))
      answeConfig[0].style.visibility = "visible";

    chevron.style.transform = "rotate(180deg)";
  }
  saw += 1;
}

// function to know if a element is a child of another
function istChild(parent, child) {
  let node = child.parentNode; //der direkte Parent von dem Child in Paramtern ist gespeichert

  while (node != null) {
    //solange es ein Parent existiert
    if (node == parent) return true; //Falls der im Paramter "parent" Value gleich den richtigen Parent von dem "child", dann "parent" und "child" haben einen Zusammenhang

    node = node.parentNode; //sonst überprüfen wir auf den nächsten Parent
  }
  return false;
}

function removeAllChild(section) {
  // remove all  existed child
  rChild = section.lastElementChild; // das letzte Kind von dem "Section" in parameter ist in die Variable gespeichert

  while (rChild) {
    // solange es ein Kind existiert
    section.removeChild(rChild); //löschen wir das genaue Kind
    rChild = section.lastElementChild; // danach nehmen wir das gegenwärtige letzte Kind
  }
}

// remove a border-style an all element of the section in parameter
function removeStyleAllChild(sectionElems){
  for(elem of sectionElems){
    elem.style = "border:none;border-radius:0px"
  }

}
let anzWahlItem =0


// verify if all parts were choosed in pick an build on home-page
function allChoosed() {
  if (choosedTop && choosedShort && choosedSocket) {
    // prüft, ob alle Kits-Teile vom User schon ausgewählt sind
    choosedElemente = [choosedTop, choosedShort, choosedSocket]; //Danach sind die ausgewählte Teilen in die Liste gespeichert, damit man es in Warenkorb nutzen kann

    anzWahlItem++

    if(buttonBuy){
      buttonBuy.classList.remove("disabled"); // Kann man in diesem Fall jetzt, das Button sehen, um seinen Kauf abzuschließen
    }
  }
}

// read a JSON file to have a information of Kits elements
const kits = document.getElementsByTagName("figure");
const navColors = document.querySelector(".colors");


const seeElem = document.querySelector(".seeElems");

const kitsTop = document.querySelector("#ktop");
const kitsShort = document.querySelector("#kshort");
const kitsSockets = document.querySelector("#kscokets");

const buttonBuy = document.querySelector(".buyElBtn");
let colorsToChoose = []

let kitChoosed = "";
let colorChoosed = "";

for (kit of kits) {
  for (child of kit.childNodes) {
    child.addEventListener("click", (e) => {
      kitChoosed = e.target.id;
      chooseKit(kitChoosed, "red");
      removestyleDeco(colorsToChoose)
    });
  }
}

if(navColors){
  colorsToChoose = navColors.getElementsByTagName("li");

  for (color of colorsToChoose) {
   
    color.addEventListener("click", (f) => {
      removeAllChild(seeElem);
      
      removestyleDeco(colorsToChoose)
      f.target.style = "text-decoration :underline"
      colorChoosed = f.target.id;
      chooseKit(kitChoosed, colorChoosed);
    });
  }
}

function removestyleDeco (ElemTouse){
  for(elem of ElemTouse){
    elem.style = "text-decoration :none"
  }
  
}



function chooseKit(kitToChoose, color) {
  fetch("data.json", { method: "GET" })
    .then((resolve) => resolve.json())
    .then((data) => {
      let theElemList = []
      data.forEach((element) => {
        if (element["part"] == kitToChoose && element["color"] == color) {
          let elemDiv = document.createElement("div");    /*create a div-container(elemDiv) of the image*/
          elemDiv.classList.add("imageOfElem");
          let elemImg = document.createElement("img");
          elemImg.src = element["url"];
          elemImg.alt = element["description"];
          elemImg.title = element["price"];
          elemDiv.appendChild(elemImg);
          seeElem.appendChild(elemDiv);
          theElemList.push(elemImg)

          elemImg.addEventListener("click", (e) => {
            removeStyleAllChild(theElemList) /*remove a style on all element into the section on parameter*/
            e.target.style = "border:2px solid green; border-radius:15px" /*add a style on a clicked element*/
            if (kitToChoose == "top") {
              kitsTop.src = e.target.src;
              kitsTop.style.visibility = "visible";
              choosedTop = {
                url: e.target.src,
                desc: e.target.alt,
                preis: e.target.title,
              };
              allChoosed();
            } else if (kitToChoose == "short") {
              kitsShort.src = e.target.src;
              kitsShort.style.visibility = "visible";
              choosedShort = {
                url: e.target.src,
                desc: e.target.alt,
                preis: e.target.title,
              };
              allChoosed();
            } else if (kitToChoose == "socket") {
              kitsSockets.src = e.target.src;
              kitsSockets.style.visibility = "visible";
              choosedSocket = {
                url: e.target.src,
                desc: e.target.alt,
                preis: e.target.title,
              };
              allChoosed();
            }
          });
        }
      });
    })
    .catch((error) => alert(error.message));
}

// popup dür error
const popError = document.getElementById("popupPerror");
const messageError = document.querySelector(".Message");
let korbZahl = ""

// add choosed Kits in the korb
const korbDiv = document.querySelector(".korb");
if(korbDiv){
korbZahl = korbDiv.querySelector(".circle");
}
// close a popUp fenster an reset a field for picture free
const popUp = document.querySelector(".cross");

if(buttonBuy){
  buttonBuy.addEventListener("click", (e) => {
    // Wenn der Button nicht enabled ist , Fehler ausgeben
    if (e.target.className == "buyElBtn disabled") {
      let a = document.createElement("a");
      a.href = "#popupPerror";
      messageError.innerHTML =
        "Sie müssen bitte alle Teilen auswählen, bevor kaufen zu können.\n Es fehlt Ihnen noch ein paar Teilen auszuwählen";
      a.click();
      return;
    }
    allWarenkrbElem.push(choosedElemente);
    let zahl = parseInt(korbZahl.innerText);
    korbZahl.innerHTML = String(zahl + 1);
    popUp.click();
    afficherMessageFlottant("Outfit hinzugefügt");
  
    choosedTop = "";
    choosedShort = "";
    choosedSocket = "";
    choosedElemente = []
    buttonBuy.classList.add("disabled");
  });
}



if(popUp){
  const closeChevron = popUp.getElementsByTagName("i");
  closeChevron[0].addEventListener("click", () => {
    removeAllChild(seeElem);
  });
} 



const warenKorbIcon = document.querySelector(".warenkorb");
const warenkorbDiv = document.querySelector(".WarenkorbList");

const allSection = document.getElementsByTagName("section");

const elementOfWarenkorb = document.querySelector(".elemWarenkorb");

if(warenKorbIcon){
  warenKorbIcon.addEventListener("click", () => {
    warenKorbIcon.href = "#"
    if (parseInt(korbZahl.innerText) === 0) {
      warenKorbIcon.href = "#popupPerror";
      messageError.innerHTML = "Sie haben noch keine Bestellung in Warenkorb";
  
      console.log('premier lu')
    }
    else{
      warenkorbDiv.style.left = "34%";
  
      removeAllChild(elementOfWarenkorb)
    
      for (let i = 0; i < allWarenkrbElem.length; i++) {
        const outFit = allWarenkrbElem[i];
        let haut, bas, chaussete;
        haut = outFit[0];
        bas = outFit[1];
        chaussete = outFit[2];
    
        const deleteIcon = document.createElement('i')
        deleteIcon.classList.add('fa','fa-trash','delete-btn')
        deleteIcon.setAttribute('id',outFit[3])
    
        deleteIcon.addEventListener('click',()=>{
          removeCartItem(produkt, i);
        })
    
        const produkt = document.createElement("div");
        produkt.classList.add("Produkt");
        const images = document.createElement("div");
        images.classList.add("allImages");
        const shirtImg = document.createElement("img");
        shirtImg.classList.add("produktTop");
        shirtImg.src = haut.url;
    
        const shortImg = document.createElement("img");
        shortImg.classList.add("produktShort");
        shortImg.src = bas.url;
    
        const socketImg = document.createElement("img");
        socketImg.classList.add("produktSocket");
        socketImg.src = chaussete.url;
    
        const descriptionP = document.createElement("div");
        descriptionP.classList.add("descriptionProdukt");
        const title = document.createElement("h1");
        title.innerHTML = haut.desc + bas.desc + chaussete.desc;
    
        const grosse = document.createElement("p");
        grosse.innerHTML = "Größe : L";
    
        const prix = document.createElement("p");
        prix.innerHTML =
          "Preis: " + String(parseInt(haut.preis) + parseInt(bas.preis) + parseInt(chaussete.preis)) +"$";
    
        produkt.appendChild(images);
        images.appendChild(shirtImg);
        images.appendChild(shortImg);
        images.appendChild(socketImg);
    
        produkt.appendChild(descriptionP);
        descriptionP.appendChild(title);
        descriptionP.appendChild(grosse);
        descriptionP.appendChild(prix);
        produkt.appendChild(deleteIcon)
        elementOfWarenkorb.appendChild(produkt);
  
        console.log('deuxieme lu')
      }
    }
  });
}

for (elem of allSection) {
  elem.addEventListener("click", () => {
    warenkorbDiv.style.left = "100%";
  });
}

function removeCartItem(ProduktCart, index){
  allWarenkrbElem.splice(index, 1); // Element aus der Liste entfernen
   ProduktCart.remove(); // Produkt div entfernen
   let zahl = parseInt(korbZahl.innerHTML);
   korbZahl.innerHTML = String(zahl - 1);
 
   if (parseInt(korbZahl.innerHTML) == 0) {    //schließen der Warenkorb wenn es leer ist
     warenkorbDiv.style.left = "100%";
   }
 }

 
//  script of anmeldungsPage

let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

if(signinBtn || signupBtn){
  signinBtn.onclick = function(){
    nameField.style.maxHeight = "0";
    nameField.style.border = "0";
    title.innerHTML="Cool!! Du bist wieder da😊";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
}

signupBtn.onclick = function(){
    nameField.style.maxHeight = "65px";
    nameField.style.border = "solid green";
    title.innerHTML=" Ich bin neu hier";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
}
}