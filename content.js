chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    console.log(JSON.stringify(msg));
    document.title = msg;
});