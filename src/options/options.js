// Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-46757863-5']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// Properties
let contentTable = document.getElementById("content");
let removeAllButton = document.getElementById("removeAllButton");
let refreshButton = document.getElementById("refreshButton");

// Initialize
initializeTable();

// Listeners
refreshButton.onclick = function() {
    _gaq.push(['_trackEvent', 'refreshTable', "options"]);
    window.location.reload();
}

removeAllButton.onclick = removeAllTabs;


// Functions
function initializeTable() {
    chrome.storage.sync.get('tabs', function(elem) {
        for(var tabId in elem.tabs) {
            var rowNode = document.createElement("tr");
            var idData = document.createElement("td");
            var nameData = document.createElement("td");
            var buttonData  = document.createElement("td");
            var idText = document.createTextNode(tabId);
            var nameText = document.createTextNode(elem.tabs[tabId]);

            var trashIcon = document.createElement("span")
            trashIcon.setAttribute("class", "oi oi-trash");

            var removeButton = document.createElement("button");
            removeButton.setAttribute("type", "button");
            removeButton.setAttribute("class", "btn btn-default");
            removeButton.appendChild(trashIcon);
            removeButton.onclick = removeAndRefresh;
            buttonData.appendChild(removeButton);

            // append to table
            idData.appendChild(idText);
            nameData.appendChild(nameText);
            rowNode.appendChild(idData);
            rowNode.append(nameData);
            rowNode.append(buttonData);
            contentTable.appendChild(rowNode);
        }
    });
}

function removeAndRefresh(event) {
    _gaq.push(['_trackEvent', 'removeAndRefresh', "options"]);
    var tabId = event.currentTarget.parentElement.parentElement.children[0].innerText;
  
    chrome.storage.sync.get('tabs', function(elem) {
        let tabs = elem.tabs
        delete tabs[tabId];
        
        chrome.storage.sync.set({tabs: tabs}, function() {
            console.log('Chrome Tab Renamer: The Tab is removed');
            refreshTab(tabId);
            window.location.reload();
        });
    });
  }

  function removeAllTabs(event) {
    _gaq.push(['_trackEvent', 'removeAllTabs', "options"]);
    chrome.storage.sync.get('tabs', function(elem) {

        let tabs = elem.tabs;
        for(var tabId in tabs) {
            refreshTab(tabId);
        }

        chrome.storage.sync.remove('tabs');
        console.log('Chrome Tab Renamer: All Tabs removed');
        window.location.reload();
    });
  }

  function refreshTab(tabId) {
    let code = 'window.location.reload();'
    chrome.tabs.executeScript(Number.parseInt(tabId), {code: code});
  }