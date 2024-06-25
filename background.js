importScripts('libs/protobuf.min.js');

var capturedResponse; // Global variable to store the captured response
var extractedData; // Global variable to store the extracted data

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.action.onClicked.addListener((tab) => {
  console.log("Action icon clicked");
  startCapturingFromStorage();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'sendGetRequest') {
    startCapturingFromStorage();
  } else if (message.action === 'getCapturedData') {
    sendResponse({ data: extractedData });
  }
});

function startCapturingFromStorage() {
  chrome.storage.local.get('keywords', (result) => {
    if (result.keywords) {
      const keywords = result.keywords.split('\n');
      startCapturing(keywords);
    } else {
      console.error('No keywords found in storage');
      chrome.runtime.sendMessage({ action: 'error', message: 'No keywords found in storage' });
    }
  });
}

function startCapturing(keywords) {
  chrome.webRequest.onCompleted.addListener(
    async (details) => {
      if (details.url.includes('aweme/v1/web/general/search/single')) {
        console.log('Intercepted URL:', details.url);
        try {
          const response = await fetch(details.url);
          const data = await response.json();
          console.log('Captured response body:', data);
          capturedResponse = data;

          if (data.data && data.data.length > 0) {
            const firstItem = data.data[0].aweme_info ? data.data[0] : data.data[1];
            extractedData = {
              author: firstItem.aweme_info.author.nickname,
              uid: firstItem.aweme_info.author.uid
            };
            console.log('Extracted data:', extractedData);
          } else {
            console.error('No data found in the response');
            extractedData = null;
          }

          chrome.runtime.sendMessage({ action: 'capturedData', data: extractedData });
        } catch (error) {
          console.error('Error fetching captured response:', error);
          chrome.runtime.sendMessage({ action: 'error', message: 'Error fetching captured response' });
        }
      }
    },
    { urls: ["<all_urls>"] }
  );

  keywords.forEach(keyword => {
    sendGetRequest(keyword);
  });
}

async function sendGetRequest(keyword) {
  const proxyUrl = 'http://localhost:3000/proxy'; // URL of your proxy server
  const params = {
    device_platform: 'webapp',
    aid: '6383',
    channel: 'channel_pc_web',
    search_channel: 'aweme_general',
    enable_history: '1',
    keyword: keyword.trim(),
    search_source: 'normal_search',
    query_correct_type: '1',
    is_filter_search: '0',
    from_group_id: '',
    offset: '0',
    count: '10',
    need_filter_settings: '1',
    list_type: 'single',
    update_version_code: '170400',
    pc_client_type: '1',
    version_code: '190600',
    version_name: '19.6.0',
    cookie_enabled: 'true',
    screen_width: '1920',
    screen_height: '1080',
    browser_language: 'en-US',
    browser_platform: 'Win32',
    browser_name: 'Chrome',
    browser_version: '126.0.0.0',
    browser_online: 'true',
    engine_name: 'Blink',
    engine_version: '126.0.0.0',
    os_name: 'Windows',
    os_version: '10',
    cpu_core_num: '16',
    device_memory: '8',
    platform: 'PC',
    downlink: '1',
    effective_type: '3g',
    round_trip_time: '250',
    webid: '7381309804310644236'
  };

  const queryString = new URLSearchParams(params).toString();
  const targetUrl = `https://www.douyin.com/aweme/v1/web/general/search/single/?${queryString}`;
  const fullUrl = `${proxyUrl}?url=${encodeURIComponent(targetUrl)}`;

  console.log('Sending GET request to proxy server:', fullUrl);

  try {
    const response = await fetch(fullUrl, {
      method: 'GET'
    });
    const data = await response.json();
    console.log(`GET request successful for keyword "${keyword}":`, data);

    if (data.data && data.data.length > 0) {
      const firstItem = data.data[0].aweme_info ? data.data[0] : data.data[1];
      const author = firstItem.aweme_info.author.nickname;
      const uid = firstItem.aweme_info.author.uid;
      console.log('Author:', author);
      console.log('UID:', uid);
      extractedData = { author, uid };
      chrome.runtime.sendMessage({ action: 'capturedData', data: extractedData });
    } else {
      console.error('No data found in the response');
      chrome.runtime.sendMessage({ action: 'error', message: 'No data found in the response' });
    }
  } catch (error) {
    console.error(`Error with GET request for keyword "${keyword}":`, error);
    chrome.runtime.sendMessage({ action: 'error', message: `Error with GET request for keyword "${keyword}"` });
  }
}
