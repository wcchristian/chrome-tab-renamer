// Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-46757863-5']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// Retrieve Elements
let changeNameButton = document.getElementById('changeNameButton')
let tabNameElem = document.getElementById("tabNameInput");
let form = document.getElementById("tabForm");
let removeButton = document.getElementById("removeButton");
let persistCheckbox = document.getElementById("persistBox");
let shouldPersist = true;

// Listeners
changeNameButton.onclick = function(element) {
  changeTabName();
};

removeButton.onclick = function(element) {
  removeAndRefresh();
}

persistCheckbox.onchange = function(element) {
  shouldPersist = persistCheckbox.checked
}

document.onload = function() {
  form.addEventListener('keyup', function(data) {
    if(data.keyCode === 13) {
      changeTabName();
    }
  })
}

// Functions
function changeTabName() {
  _gaq.push(['_trackEvent', 'changeTabName', "popup"]);
  let title = tabNameElem.value;
  console.log(tabNameElem.value);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.runtime.sendMessage({tabId: tabs[0].id, title: title, shouldPersist: shouldPersist});
  });
}

function removeAndRefresh() {
  _gaq.push(['_trackEvent', 'removeAndRefresh', "popup"]);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let tabId = tabs[0].id;

    chrome.storage.sync.get('tabs', function(elem) {
      let tabs = elem.tabs
      delete tabs[tabId];
      
      chrome.storage.sync.set({tabs: tabs}, function() {
        console.log('Chrome Tab Renamer: The Tab is removed');
          refreshPage(tabId);
      });
    });
  });
}

function refreshPage(tabId) {
  var code = 'window.location.reload();';
  chrome.tabs.executeScript(tabId, {code: code});
}