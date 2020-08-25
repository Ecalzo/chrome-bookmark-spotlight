chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.userSearch && request.userSearch.length) {
      chrome.bookmarks.search(request.userSearch, results => {
        sendResponse(results);
      });
    } else if (request.url) {
      chrome.tabs.query({url: request.url}, e => {
        if (e.length) {
          chrome.tabs.update(e[0].id, {active: true});
          sendResponse(e);
        } else {
          sendResponse([]);
        }
      });
    } else {
      sendResponse([]);
    }
    // the trick was to return true from the addListener function, mind blown
    return true
  }
);


