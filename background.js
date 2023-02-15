if (typeof browser === 'undefined') {
  browser = typeof chrome !== 'undefined' ? chrome : null;
}

let option = {
  hideShortsVideo: true,
  hideShortsResult: true,
  hideShortsFeatured: false,
  hideShortsChannel: true,
  hideShortsHome: true,
  hideShortsFeed: true,
  hideShortsIconHome: true,
  extensionEnable: true
};

browser.storage.sync.get({list:[]},function(data){
  //alert("Ritirato");
  console.log(data.list);

  let temp = data.list;

  if(temp.length == 0){
    browser.storage.sync.set({list:option}, function(){
      //alert("Disattivato nei Video");
    });
  }
});


// Respond to requests
browser.runtime.onMessage.addListener((data, sender) => {
try {
    const {
      getSettings,
      getFieldsets,
    } = data;

    if(getSettings){
      const { frameId, tab } = sender;

      browser.tabs.sendMessage(tab.id, {option});
    }

} catch (error) {
    console.log(`ERROR: ${error}`);
}
});
