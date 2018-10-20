// Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-46757863-5']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// Functions
function listener(message) {
  console.log(JSON.stringify(message));
  persistTab(message.tabId, message.title);
  chrome.tabs.sendMessage(message.tabId, message.title);
}

function omniboxListener(title) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    var tab = tabs[0];

    persistTab(tab.id, title);
    chrome.tabs.sendMessage(tab.id, title);
  });
}

function omniboxTrackingListener(title) {
  _gaq.push(['_trackEvent', 'changeTabName', 'omniboxEnter']);
}

function persistTab(tabId, title) {
  chrome.storage.sync.get('tabs', function(elem) {
    let tabs = elem.tabs
    if(!tabs) {
        tabs = {};
    }

    tabs[tabId] = title;
    
    chrome.storage.sync.set({tabs: tabs}, function() {
      console.log('Chrome Tab Renamer: The Tab is stored');
    });
  });
}

function updatedListener(tabId) {
  chrome.storage.sync.get('tabs', function(elem) {
    if(elem.tabs.hasOwnProperty(tabId)) {
      chrome.tabs.sendMessage(tabId, elem.tabs[tabId]);
    }
  });
}

// Listeners
chrome.omnibox.onInputChanged.addListener(omniboxListener);
chrome.omnibox.onInputEntered.addListener(omniboxTrackingListener);
chrome.runtime.onMessage.addListener(listener);
chrome.tabs.onUpdated.addListener(updatedListener);

chrome.runtime.onInstalled.addListener(function() {
  alert("Please reload each tab or restart your browser after installation of Chrome Tab Renamer");
});