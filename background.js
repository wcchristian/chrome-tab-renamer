chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({tabName: 'Christian\'s tab'}, function() {
    console.log('Chrome Tab Renamer: Setting Tab Name');
  });
});