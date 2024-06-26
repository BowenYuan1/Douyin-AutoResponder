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
    webid: '7381309804310644236',
    Cookie: " __ac_nonce=0666f7dc9003e88662997; __ac_signature=_02B4Z6wo00f01sxoAqwAAIDBvG8z5qnPjP7MSAYAANWC66; ttwid=1%7CYTpZYh3WdI-onnHeiNOTt5Gnt4R5SHUsR9w3-GrWUUA%7C1718582729%7C4cb97633be8c9a34f87724a9a18796807298a25f9afab8369a61d8e2721b5551; douyin.com; s_v_web_id=verify_lxi7sitr_fZEPpakq_KLdT_41c4_9A4H_uyEzPMrIMKgX; device_web_cpu_core=16; device_web_memory_size=8; architecture=amd64; home_can_add_dy_2_desktop=%220%22; dy_swidth=1920; dy_sheight=1080; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1920%2C%5C%22screen_height%5C%22%3A1080%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A16%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A4.9%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A300%7D%22; strategyABtestKey=%221718582742.832%22; volume_info=%7B%22isUserMute%22%3Afalse%2C%22isMute%22%3Afalse%2C%22volume%22%3A0.5%7D; csrf_session_id=382d5c18475b29359e2e19bcc04ddc60; passport_csrf_token=0cfbd57bf49a9c0d110084a53aa66d35; passport_csrf_token_default=0cfbd57bf49a9c0d110084a53aa66d35; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCS2NxbzFycjV0amRpNWduckxkTEk1UmJkZG1yTklWS25hYlE3Z1JjRUM3RGs2TEdhNE1wWklMUkFGV0VNekt3eGgvaGo2WTF6K044QTg2SjJFMTUzUGc9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoxfQ%3D%3D; bd_ticket_guard_client_web_domain=2; FORCE_LOGIN=%7B%22videoConsumedRemainSeconds%22%3A180%7D; SEARCH_RESULT_LIST_TYPE=%22single%22; xgplayer_user_id=959968574906; msToken=5wYybRGQKav81JwIV2UliFbv8MXZh5DPJa-gFPJzBWZzuous9Moti4tMm72lrg7r9P1yFVzbJUz3nKgLuegRQv3nWjCiPNpj1zCo9X5sCwiPppQzjN5Q; download_guide=%223%2F20240616%2F0%22; stream_player_status_params=%22%7B%5C%22is_auto_play%5C%22%3A0%2C%5C%22is_full_screen%5C%22%3A0%2C%5C%22is_full_webscreen%5C%22%3A0%2C%5C%22is_mute%5C%22%3A0%2C%5C%22is_speed%5C%22%3A1%2C%5C%22is_visible%5C%22%3A0%7D%22; IsDouyinActive=true"
  };

  const queryString = new URLSearchParams(params).toString();
  const targetUrl = `https://www.douyin.com/aweme/v1/web/general/search/single/?${queryString}`;
  const fullUrl = `${proxyUrl}?url=${encodeURIComponent(targetUrl)}&cookie=${encodeURIComponent(" __ac_nonce=0666f7dc9003e88662997; __ac_signature=_02B4Z6wo00f01sxoAqwAAIDBvG8z5qnPjP7MSAYAANWC66; ttwid=1%7CYTpZYh3WdI-onnHeiNOTt5Gnt4R5SHUsR9w3-GrWUUA%7C1718582729%7C4cb97633be8c9a34f87724a9a18796807298a25f9afab8369a61d8e2721b5551; douyin.com; s_v_web_id=verify_lxi7sitr_fZEPpakq_KLdT_41c4_9A4H_uyEzPMrIMKgX; device_web_cpu_core=16; device_web_memory_size=8; architecture=amd64; home_can_add_dy_2_desktop=%220%22; dy_swidth=1920; dy_sheight=1080; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1920%2C%5C%22screen_height%5C%22%3A1080%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A16%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A4.9%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A300%7D%22; strategyABtestKey=%221718582742.832%22; volume_info=%7B%22isUserMute%22%3Afalse%2C%22isMute%22%3Afalse%2C%22volume%22%3A0.5%7D; csrf_session_id=382d5c18475b29359e2e19bcc04ddc60; passport_csrf_token=0cfbd57bf49a9c0d110084a53aa66d35; passport_csrf_token_default=0cfbd57bf49a9c0d110084a53aa66d35; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCS2NxbzFycjV0amRpNWduckxkTEk1UmJkZG1yTklWS25hYlE3Z1JjRUM3RGs2TEdhNE1wWklMUkFGV0VNekt3eGgvaGo2WTF6K044QTg2SjJFMTUzUGc9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoxfQ%3D%3D; bd_ticket_guard_client_web_domain=2; FORCE_LOGIN=%7B%22videoConsumedRemainSeconds%22%3A180%7D; SEARCH_RESULT_LIST_TYPE=%22single%22; xgplayer_user_id=959968574906; msToken=5wYybRGQKav81JwIV2UliFbv8MXZh5DPJa-gFPJzBWZzuous9Moti4tMm72lrg7r9P1yFVzbJUz3nKgLuegRQv3nWjCiPNpj1zCo9X5sCwiPppQzjN5Q; download_guide=%223%2F20240616%2F0%22; stream_player_status_params=%22%7B%5C%22is_auto_play%5C%22%3A0%2C%5C%22is_full_screen%5C%22%3A0%2C%5C%22is_full_webscreen%5C%22%3A0%2C%5C%22is_mute%5C%22%3A0%2C%5C%22is_speed%5C%22%3A1%2C%5C%22is_visible%5C%22%3A0%7D%22; IsDouyinActive=true")}`;
  console.log('Sending GET request to proxy server:', fullUrl);

  try {
    const response = await fetch(fullUrl, {
      method: 'GET'
    });
    const data = await response.json();
    console.log(`GET request successful for keyword "${keyword}":`, data);

    if (data.data && data.data.length > 0) {
      var author;
      var uid;
      const firstItem = data.data[0];
      if (firstItem.type == 4)
      {
        author = firstItem.user_list[0].user_info.nickname;
        uid = firstItem.user_list[0].user_info.uid;  
      }else
      {
        author = firstItem.aweme_info.author.nickname;
        uid = firstItem.aweme_info.author.uid; 
      }
      console.log('Author:', author);
      console.log('UID:', uid);
      var keyword = data.global_doodle_config.keyword;
      extractedData = { author, uid, keyword};
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
