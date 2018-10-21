// Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-46757863-5']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// Listeners
chrome.omnibox.onInputChanged.addListener(omniboxListener);
chrome.omnibox.onInputEntered.addListener(omniboxTrackingListener);
chrome.runtime.onMessage.addListener(listener);
chrome.tabs.onUpdated.addListener(updatedListener);
chrome.tabs.onRemoved.addListener(tabClosedListener);
chrome.windows.onRemoved.addListener(windowClosedListener);

chrome.runtime.onInstalled.addListener(function() {
  loadContentScript();
});

chrome.runtime.onStartup.addListener(chromeStartListener);

// Functions
function listener(message) {
  console.log("Chrome Tab Renamer: Saving Popup Name");
  if(message.shouldPersist) {
    persistTab(message.tabId, message.title);
  }
  chrome.tabs.sendMessage(message.tabId, message.title);
}

function omniboxListener(title) {
  console.log("Chrome Tab Renamer: Saving Omnibox Name");
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
  console.log("Chrome Tab Renamer: Persisting Name");
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
    if(elem.tabs) {
      if(elem.tabs.hasOwnProperty(tabId)) {
        chrome.tabs.sendMessage(tabId, elem.tabs[tabId]);
      }
    }
  });
}

function tabClosedListener(tabId, removeInfo) {
  removeTab(tabId);
}

function windowClosedListener(windowId) {
  chrome.storage.sync.remove("tabs");
}

function chromeStartListener() {
  chrome.storage.sync.remove("tabs");
}

function removeTab(tabId) {
  _gaq.push(['_trackEvent', 'removeTabOnClose', "browser"]);

  chrome.storage.sync.get('tabs', function(elem) {
    if(elem.tabs) {
      let tabs = elem.tabs
      delete tabs[tabId];
      
      chrome.storage.sync.set({tabs: tabs}, function() {
          console.log('Chrome Tab Renamer: The Tab is removed by close');
      });
    }
  });
}

function loadContentScript() {
  chrome.tabs.query({}, function(tabs) {
    debugger;
    console.log(JSON.stringify(tabs));
    tabs.forEach(tab => {
      debugger;
      if(tab.url.startsWith("http://") || tab.url.startsWith("https://")) {
        chrome.tabs.executeScript(tab.id, {file: './content/content.js'});
      }
    })
  })
}