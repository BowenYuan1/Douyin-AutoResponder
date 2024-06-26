let responses = []; // Array to store multiple responses

document.getElementById('save').addEventListener('click', () => {
  const keywords = document.getElementById('keywords').value;
  chrome.storage.local.set({ keywords: keywords }, () => {
    console.log('Keywords saved:', keywords);
  });

  const keywordsArray = keywords.split('\n').map(keyword => keyword.trim()).filter(keyword => keyword.length > 0);
  const responseContainer = document.getElementById('response-container');
  responseContainer.innerHTML = ''; // Clear existing content
  responseContainer.innerHTML += '<strong>Keywords:</strong> ' + JSON.stringify(keywordsArray, null, 2) + '<hr>';
});

document.getElementById('sendRequest').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'sendGetRequest' });
});

document.getElementById('clearResult').addEventListener('click', clearResult);

function clearResult() {
  responses = [];
  const responseContainer = document.getElementById('response-container');
  responseContainer.innerHTML = '';
  console.log('Results cleared');
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const responseContainer = document.getElementById('response-container');
    if (request.action === 'capturedData') {
      if (request.data) {
        responses.push(request.data);
        updateResponseContainer();
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

      const keywordsArray = result.keywords.split('\n').map(keyword => keyword.trim()).filter(keyword => keyword.length > 0);
      const responseContainer = document.getElementById('response-container');
      responseContainer.innerHTML = ''; // Clear existing content
      responseContainer.innerHTML += '<strong>Keywords:</strong> ' + JSON.stringify(keywordsArray, null, 2) + '<hr>';
    }
  });

  // Request captured data when the popup is opened
  chrome.runtime.sendMessage({ action: 'getCapturedData' }, (response) => {
    if (response && response.data) {
      responses.push(response.data);
      updateResponseContainer();
    } else {
      const responseContainer = document.getElementById('response-container');
      responseContainer.innerText = 'No data captured yet.';
    }
  });
});

function updateResponseContainer() {
  const responseContainer = document.getElementById('response-container');
  responseContainer.innerHTML = ''; // Clear existing content
  responses.forEach((response, index) => {
    const responseText = `
      <div>
        <strong>Keyword ${index + 1}:</strong> ${response.keyword}<br>
        <strong>Author:</strong> ${response.author}<br>
        <strong>UID:</strong> ${response.uid}
      </div>
      <hr>
    `;
    responseContainer.innerHTML += responseText;
  });
}
