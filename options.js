
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


        
        document.getElementById("hideShortsVideo").checked = op["hideShortsVideo"];
        document.getElementById("hideShortsResult").checked = op["hideShortsResult"];
        document.getElementById("hideShortsChannel").checked = op["hideShortsChannel"];
        document.getElementById("hideShortsHome").checked = op["hideShortsHome"];
        document.getElementById("hideShortsFeed").checked = op["hideShortsFeed"];
        /*document.getElementById("extensionEnable").checked = op["extensionEnable"];*/
        document.getElementById("hideShortsIconHome").checked = op["hideShortsIconHome"]; 
        
        //changeEnable();
        
    });
}





function saveData(){

    //VISITA DI TUTTI I TOGGLE
    let shortVideo = document.getElementById("hideShortsVideo");
    let shortResult = document.getElementById("hideShortsResult");
    let shortChannel = document.getElementById("hideShortsChannel");
    let shortHome = document.getElementById("hideShortsHome");
    let shortFeed = document.getElementById("hideShortsFeed");
   /* let enable = document.getElementById("extensionEnable"); */

    //PROVA
    let shortsIconHome = document.getElementById("hideShortsIconHome"); 

    //MODIFICA DI OP
    op["hideShortsVideo"] = shortVideo.checked;
    op["hideShortsResult"] = shortResult.checked;
    op["hideShortsChannel"] = shortChannel.checked;
    op["hideShortsHome"] = shortHome.checked;
    op["hideShortsFeed"] = shortFeed.checked;
    /*op["extensionEnable"] = enable.checked;*/

    //PROVA
    op["hideShortsIconHome"] = shortsIconHome.checked;


    chrome.storage.sync.set({list:op}, function(){
        //alert("Disattivato nei Video");
    });
}


//Load Data After section change
window.addEventListener('DOMContentLoaded',getData);
let v = document.getElementById('i');
v.addEventListener('click',getData);

//UpdateData
document.getElementById("hideShortsVideo").addEventListener('change',saveData);
document.getElementById("hideShortsResult").addEventListener('change',saveData);
document.getElementById("hideShortsChannel").addEventListener('change',saveData);
document.getElementById("hideShortsHome").addEventListener('change',saveData);
document.getElementById("hideShortsFeed").addEventListener('change',saveData);
document.getElementById("hideShortsIconHome").addEventListener('change',saveData);
/*document.getElementById("extensionEnable").addEventListener('change',saveData);*/


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