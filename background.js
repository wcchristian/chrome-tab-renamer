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

chrome.omnibox.onInputChanged.addListener(omniboxListener);
chrome.runtime.onMessage.addListener(listener);