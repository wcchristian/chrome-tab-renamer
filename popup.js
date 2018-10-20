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

// Event Functions
changeNameButton.onclick = function(element) {
  changeTabName();
};

document.onload = function() {
  form.addEventListener('keyup', function(data) {
    if(data.keyCode === 13) {
      changeTabName();
    }
  })
}

function changeTabName() {
  _gaq.push(['_trackEvent', 'changeTabName', "popup"]);
  let title = tabNameElem.value;
  console.log(tabNameElem.value);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.runtime.sendMessage({tabId: tabs[0].id, title: title});
  });
}