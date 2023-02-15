if (typeof browser === 'undefined') {
  browser = typeof chrome !== 'undefined' ? chrome : null;
}
  
// Some global constants.
const HTML = document.documentElement;  
  
const resultsPageRegex = new RegExp('.*://.*youtube\.com/results.*', 'i');
const videoPageRegex = new RegExp('.*://.*youtube\.com/*.*/videos.*', 'i');
const featuredPageRegex = new RegExp('.*://.*youtube\.com/c/s*.*/featured.*', 'i');
const channelPageRegex = new RegExp('.*://.*youtube\.com/c/*.*', 'i');
const homepageRegex =    new RegExp('.*://(www|m)\.youtube\.com/$',  'i');
const shortsRegex =      new RegExp('.*://.*youtube\.com/shorts.*',  'i');
const feedPageRegex =    new RegExp('.*://.*youtube\.com/feed.*',  'i');
const newChannelPageRegex = new RegExp('.*://.*youtube\.com/@*.*', 'i');
  
// Dynamic settings variables
let onVideoPage = videoPageRegex.test(location.href);
let onFeaturedPage = featuredPageRegex.test(location.href);
let onChannelPage = channelPageRegex.test(location.href);
let onResultsPage = resultsPageRegex.test(location.href); 
let onHomePage = homepageRegex.test(location.href);
let onFeedPageRegex = feedPageRegex.test(location.href);
let onNewChannelPageRegex = newChannelPageRegex.test(location.href);

//OPZIONI DA BACKGROUND
let option;
  
//URL
let url = location.href;

//ENABLE
let enable;

// Send a "get settings" message to the background script.
browser.runtime.sendMessage({ getSettings: true });

// Update HTML attributes in real time.
//   receive messages from options.js
browser.runtime.onMessage.addListener((data, sender) => {
  const { settings } = data;

  //RICEZIONE DELLE OPZIONI
  option = data.option;

  runDynamicSettings();

  return true;
});



  
// Dynamic settings (i.e. js instead of css)
document.addEventListener("DOMContentLoaded", event => {
  url = undefined;
  counter = 0;
  theaterClicked = false;
  hyper = false;
  originalPlayback = undefined;
  originalMuted = undefined;
  onResultsPage = resultsPageRegex.test(location.href);


  onVideoPage = videoPageRegex.test(location.href);
  onFeaturedPage = featuredPageRegex.test(location.href);
  onChannelPage = channelPageRegex.test(location.href);
  onHomePage = homepageRegex.test(location.href);
  onFeedPageRegex = feedPageRegex.test(location.href);
  onNewChannelPageRegex = newChannelPageRegex.test(location.href);

  requestRunDynamicSettings()
});
  
  
function runDynamicSettings() {

  // Check if the URL has changed (YouTube is a Single-Page Application)
  if (url !== location.href) {
    url = location.href;
    theaterClicked = false;
    hyper = false;
    originalPlayback = undefined;
    originalMuted = undefined;
    onResultsPage = resultsPageRegex.test(location.href);

    //PROVVISORIO
    onVideoPage = videoPageRegex.test(location.href);
    onFeaturedPage = featuredPageRegex.test(location.href);
    onChannelPage = channelPageRegex.test(location.href);
    onHomePage = homepageRegex.test(location.href);
    onFeedPageRegex = feedPageRegex.test(location.href);


    //PROVA
    onNewChannelPageRegex = newChannelPageRegex.test(location.href);

    handleUrlChange();
  }

 
  //=================================================================================
  try {
    if(option["extensionEnable"] == true || option["extensionEnable"] == false){
      enable = option["extensionEnable"];
    }
  } catch (error) {
    
  }
  //==================================================================================

  if(enable){ 

  if (onResultsPage) {
    const shortResults = Array.from(document.querySelectorAll('a[href^="/shorts/"]:not([marked_as_short])'));
    shortResults.forEach(sr => {
      try {
        if(option["hideShortsResult"]){
          sr.setAttribute('marked_as_short', true);
          const result = sr.closest('ytd-video-renderer');
          result.setAttribute('is_short', true);
          result.style.display = 'none';
        }        
      } catch (error) {
        console.log(error);
      }
    
    })
    

  }

  if (onFeedPageRegex) {
    const shortResults = Array.from(document.querySelectorAll('a[href^="/shorts/"]:not([marked_as_short])'));
    shortResults.forEach(sr => {
      try {
        if(option["hideShortsFeed"]){
          sr.setAttribute('marked_as_short', true);
          const result = sr.closest('ytd-grid-video-renderer');
          result.setAttribute('is_short', true);
          result.style.display = 'none';
        }        
      } catch (error) {
        console.log(error);
      }
    
    })
    

  }

 
  if (onVideoPage) {  
    const shortResults = Array.from(document.querySelectorAll('a[href^="/shorts/"]:not([marked_as_short])'));
    shortResults.forEach(sr => {
      try {
        if(option["hideShortsVideo"]){
          sr.setAttribute('marked_as_short', true);
          const result = sr.closest('ytd-grid-video-renderer');
          result.setAttribute('is_short', true);
          result.style.display = 'none';
        }
      } catch (error) {
        //console.log(error);
      }
      
    })
  }

  if (onFeaturedPage) {
    const result = document.querySelector('ytd-reel-shelf-renderer');
    
    try {
      if(option["hideShortsFeatured"]){
        result.setAttribute('is_short', true);
        result.style.display = 'none';
      }
    } catch (error) {
      console.log(error);
    }
      
  }

  if (onChannelPage) {
    const result = document.querySelector('ytd-reel-shelf-renderer');
    
    try {
      if(option["hideShortsChannel"]){
        result.setAttribute('is_short', true);
        result.style.display = 'none';
      }
    } catch (error) {
      //sonsole.log(error);
    }

  }

  //NEW CHANNEL
  if (onNewChannelPageRegex) {
    const result = document.querySelector('ytd-reel-shelf-renderer');
    
    try {
      if(option["hideShortsChannel"]){
        result.setAttribute('is_short', true);
        result.style.display = 'none';
      }
    } catch (error) {
      //sonsole.log(error);
    }

  }


//HOME
  if (onHomePage) {
    const result = document.querySelector('ytd-rich-section-renderer');
    try {
      if(option["hideShortsHome"]){
        result.setAttribute('is_short', true);
        result.style.display = 'none';
      }

      //Hide shorts icon on hamburger menu 

      if(option["hideShortsIconHome"]){
        const result2 = document.querySelectorAll("ytd-guide-entry-renderer");
        result2[1].style.display = 'none';

        const result3 = document.querySelectorAll("ytd-mini-guide-entry-renderer");
        result3[1].style.display = 'none';

      }


    } catch (error) {
      //sonsole.log(error);
    }

  }

  }

  requestRunDynamicSettings()
}
  
  
function handleUrlChange() {

  const currentUrl = location.href;


  //Inserimento attributi nell'HTML della pagina
  HTML.setAttribute('on_video_page', onVideoPage);
  
  //============================================================
  browser.storage.sync.get({list:[]},function(data){
    
    option = data.list;
  });
  //============================================================
}
  
function requestRunDynamicSettings() {
  setTimeout(() => runDynamicSettings(), 50);
}
  