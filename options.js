
let op = {
    hideShortsVideo: true,
    hideShortsResult: true,
    hideShortsFeatured: false,
    hideShortsChannel: true,
    hideShortsHome: true,
    hideShortsFeed: true,
    hideShortsIconHome: true,
    extensionEnable: true
};


function getData(){
    chrome.storage.sync.get({list:[]},function(data){
        op = data.list;


        //INSERIMENTO INFORMAZIONI ALL'INTERNO DELLA PAGINA IMPOSTAZIONI


        /*
        document.getElementById("hideShortsVideo").checked = op["hideShortsVideo"];
        document.getElementById("hideShortsResult").checked = op["hideShortsResult"];
        document.getElementById("hideShortsChannel").checked = op["hideShortsChannel"];
        document.getElementById("hideShortsHome").checked = op["hideShortsHome"];
        document.getElementById("hideShortsFeed").checked = op["hideShortsFeed"];
        document.getElementById("extensionEnable").checked = op["extensionEnable"];
        document.getElementById("hideShortsIconHome").checked = op["hideShortsIconHome"]; 
        */
        changeEnable();
        
    });
}

function saveData(){

    //PRENDERE I DATI DALLA PAGINA IMPOSTAZIONI


    chrome.storage.sync.set({list:op}, function(){
        //alert("Disattivato nei Video");
    });
}




const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("div a");
    
navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
    event.preventDefault();
    const target = event.target.getAttribute("href");
    sections.forEach((section) => {
        section.classList.remove("active");
        if (`#${section.id}` === target) {
        section.classList.add("active");
        }
    });
    });
});