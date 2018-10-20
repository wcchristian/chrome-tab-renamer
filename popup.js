let changeNameButton = document.getElementById('changeNameButton')
let titleElem = document.getElementById("title");

chrome.storage.sync.get('tabName', function(data) {
  titleElem.innerText = data.tabName;
});

changeNameButton.onclick = function(element) {
  let title = titleElem.innerText;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'document.title = "'+title+'"'} 
    );
  });
};