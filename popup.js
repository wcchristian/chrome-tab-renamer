let changeNameButton = document.getElementById('changeNameButton')
let tabNameElem = document.getElementById("tabNameInput");
let form = document.getElementById("tabForm");

changeNameButton.onclick = function(element) {
  changeTabName();
};

document.onload(function() {
  form.addEventListener('keyup', function(data) {
    if(data.keyCode === 13) {
      changeTabName();
    }
  })
})

function changeTabName() {
  let title = tabNameElem.value;
  console.log(tabNameElem.value);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'document.title = "'+title+'"'} 
    );
  });
}