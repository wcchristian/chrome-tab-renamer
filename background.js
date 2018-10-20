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
  chrome.tabs.sendMessage(message.tabId, message.title);
}

function omniboxListener(title) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    var tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, title);
  });
}

function omniboxTrackingListener(title) {
  _gaq.push(['_trackEvent', 'changeTabName', 'omniboxEnter']);
}

// Listeners
chrome.omnibox.onInputChanged.addListener(omniboxListener);
chrome.omnibox.onInputEntered.addListener(omniboxTrackingListener);
chrome.runtime.onMessage.addListener(listener);

chrome.runtime.onInstalled.addListener(function() {
  alert("Please reload each tab or restart your browser after installation of Chrome Tab Renamer");
});