chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});


chrome.action.onClicked.addListener((tab) => {
    console.log("Action icon clicked");
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: getCookiesFromPage
    });
  });
  
  var verify;
  function getCookiesFromPage() {
    var cookiesArray = document.cookie ? document.cookie.split("; ") : [];
    var sixthcookie = cookiesArray[5];
    var cookieParts = sixthcookie.split("=");
    verify = cookieParts[1];
    //chrome.runtime.sendMessage({ action: 'cookies', data: cookieParts[1]});
  }
  
  /*chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'cookies') {
      console.log('Cookies from content script:', message.data);
      // Do something with the cookies
    }
  });*/

async function sendBinaryPayload() {
try {
    const binaryData = await serializeMessage();

    fetch('https://imapi.douyin.com/v1/message/send?verifyFp=' + verify + '&fp' + verify, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-protobuf',
    },
    body: binaryData
    })
    .then(response => response.json())
    .then(data => {
    console.log('Message sent successfully:', data);
    })
    .catch(error => {
    console.error('Error sending message:', error);
    });
    } catch (error) {
    console.error('Error serializing message:', error);
    }
}
