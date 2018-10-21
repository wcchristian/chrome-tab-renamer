// Listeners
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    document.title = msg;
});