let op = {
    hideShortsVideo: true,
    hideShortsResult: true,
    hideShortsFeatured: false,
    hideShortsChannel: true,
    hideShortsHome: true,
    hideShortsFeed: true
};
//CI VUOLE UNA FUNZIONE PER LEGGERE LO STORAGE ALL'AVVIO  
function retriveData(){
    //INSERIMENTO INFORMAIZONI
    
    chrome.storage.sync.get({list:[]},function(data){
        op = data.list;
        document.getElementById("hideShortsVideo").checked = op["hideShortsVideo"];
        document.getElementById("hideShortsResult").checked = op["hideShortsResult"];
        document.getElementById("hideShortsChannel").checked = op["hideShortsChannel"];
        document.getElementById("hideShortsHome").checked = op["hideShortsHome"];
        document.getElementById("hideShortsFeed").checked = op["hideShortsFeed"];
    });

}


function updateData(){

    //VISITA DI TUTTI I TOGGLE
    let shortVideo = document.getElementById("hideShortsVideo");
    let shortResult = document.getElementById("hideShortsResult");
    let shortChannel = document.getElementById("hideShortsChannel");
    let shortHome = document.getElementById("hideShortsHome");
    let shortFeed = document.getElementById("hideShortsFeed");

    //MODIFICA DI OP
    op["hideShortsVideo"] = shortVideo.checked;
    op["hideShortsResult"] = shortResult.checked;
    op["hideShortsChannel"] = shortChannel.checked;
    op["hideShortsHome"] = shortHome.checked;
    op["hideShortsFeed"] = shortFeed.checked;

    chrome.storage.sync.set({list:op}, function(){
        //alert("Disattivato nei Video");
    });

    chrome.tabs.reload();
}

document.getElementById("hideShortsVideo").addEventListener('change',updateData);
document.getElementById("hideShortsResult").addEventListener('change',updateData);
document.getElementById("hideShortsChannel").addEventListener('change',updateData);
document.getElementById("hideShortsHome").addEventListener('change',updateData);
document.getElementById("hideShortsFeed").addEventListener('change',updateData);



//Apertura del popup
window.addEventListener('DOMContentLoaded',retriveData);
