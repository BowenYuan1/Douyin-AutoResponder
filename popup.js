document.getElementById('save').addEventListener('click', () => {
  const keywords = document.getElementById('keywords').value;
  chrome.storage.local.set({ keywords: keywords }, () => {
    console.log('Keywords saved:', keywords);
  });
});

document.getElementById('sendRequest').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'sendGetRequest' });
});

document.getElementById('saveResultsBtn').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'saveResults' });
});

document.addEventListener('DOMContentLoaded', function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const responseContainer = document.getElementById('response-container');
    if (request.action === 'capturedData') {
      if (request.data) {
        responseContainer.innerText = JSON.stringify(request.data, null, 2);
      } else {
        responseContainer.innerText = 'No data found.';
      }
    } else if (request.action === 'error') {
      responseContainer.innerText = `Error: ${request.message}`;
    }
  });

  // Load saved keywords on popup open
  chrome.storage.local.get('keywords', (result) => {
    if (result.keywords) {
      document.getElementById('keywords').value = result.keywords;
    }
  });
  
  // Request captured data when the popup is opened
  chrome.runtime.sendMessage({ action: 'getCapturedData' }, (response) => {
    if (response && response.data) {
      const responseContainer = document.getElementById('response-container');
      responseContainer.innerText = JSON.stringify(response.data, null, 2);
    } else {
      responseContainer.innerText = 'No data captured yet.';
    }
  });
});
