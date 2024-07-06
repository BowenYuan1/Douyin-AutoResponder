importScripts('libs/protobuf.min.js');

var capturedResponse; // Global variable to store the captured response
var extractedData; // Global variable to store the extracted data
const defaultCookie = 'dy_swidth=1920; xgplayer_user_id=460732494284; passport_csrf_token=bfdba60bc3a4269adb78a9f32c15963c; passport_csrf_token_default=bfdba60bc3a4269adb78a9f32c15963c; s_v_web_id=verify_lwcq2536_xTs1ud4v_uFjC_4RzZ_90Hz_PlfiU0rff6eZ; bd_ticket_guard_client_web_domain=2; my_rd=2; d_ticket=1231ea7a558e16bc4a10f1c6d802d48252e21; _bd_ticket_crypt_doamin=2; __security_server_data_status=1; LOGIN_STATUS=1; store-region-src=uid; SEARCH_RESULT_LIST_TYPE=%22single%22; passport_assist_user=CkF9VJhxhfQEr_084ioQKfJCFsO54lHZPKNH9Y2glv6YvC8uR_T0yl5HHM2ApwXi6GpE1ypSQcsxd5EmQIA-EGhbbBpKCjzBEgH16GxLb01u-72fTABfg80RaTto5AVQJ4Re-9AtqrkgnLCt72Le-babHQltMoZEnmjRp5LqMwiGjmUQ1cvSDRiJr9ZUIAEiAQM5woiF; n_mh=9-mIeuD4wZnlYrrOvfzG3MuT6aQmCUtmr8FxV8Kl8xY; sso_uid_tt=77510677452328074fb59469b8f431bf; sso_uid_tt_ss=77510677452328074fb59469b8f431bf; toutiao_sso_user=d268120c2436620c6874f9f1e96d04d8; toutiao_sso_user_ss=d268120c2436620c6874f9f1e96d04d8; sid_ucp_sso_v1=1.0.0-KGYwMDNkNjIxMzNmMjJlMTE0YzkxOTdmNGYzMGMyYjJhNTQ1MzQ2NmYKHwjEiuCNx8yhAxDxwNuyBhjvMSAMML-2nLIGOAZA9AcaAmxxIiBkMjY4MTIwYzI0MzY2MjBjNjg3NGY5ZjFlOTZkMDRkOA; ssid_ucp_sso_v1=1.0.0-KGYwMDNkNjIxMzNmMjJlMTE0YzkxOTdmNGYzMGMyYjJhNTQ1MzQ2NmYKHwjEiuCNx8yhAxDxwNuyBhjvMSAMML-2nLIGOAZA9AcaAmxxIiBkMjY4MTIwYzI0MzY2MjBjNjg3NGY5ZjFlOTZkMDRkOA; uid_tt=385ee8f1a110967d9f5cb425b044ba25; uid_tt_ss=385ee8f1a110967d9f5cb425b044ba25; sid_tt=1a66858f95fcda30a193e35c16857b75; sessionid=1a66858f95fcda30a193e35c16857b75; sessionid_ss=1a66858f95fcda30a193e35c16857b75; _bd_ticket_crypt_cookie=7015d0bc35c82d1e05092dc2c08cd6e0; store-region=cn-bj; xgplayer_device_id=77500687361; ttwid=1%7CNZuNizq1_GtHZGAtUzKlbf-XnQSCmcEQX1BeooiPvMg%7C1718076240%7C8e2a3683e6b0106c2ddb547a08e46152ab34296e030a23d193bc9488c9e54199; dy_sheight=1080; UIFID_TEMP=3c3e9d4a635845249e00419877a3730e2149197a63ddb1d8525033ea2b3354c28cfcd4a6747793c4923c23c0ca936f544dd28417331d4d94f45e5be8ba58d2ebfd0b13897654b82d4d19d3973aa16115; fpk1=U2FsdGVkX1++2FMAYkHm0iO4DbO+Ayooi/cqGMkrVqvIoL+s4yi+COXFs+vW5gA1iRR04mzC5O2td/iRnJW66A==; fpk2=f1f6b29a6cc1f79a0fea05b885aa33d0; UIFID=3c3e9d4a635845249e00419877a3730e2149197a63ddb1d8525033ea2b3354c238ea2acf8bc4d28774f6707ac976e7f217dc6d85d18f36993fcae1e4317ff16fda207e8487a1b3d4d63f708c75bd326245d4dad53b06997d644c1d9aa357486b2dee7f86fe9191da5ac48b16d0b79eff7be118ba0e4355db9396b2df36ba7aca77682a08ce8ea6088144476b02c2a7883f39fae85b2f5d16394dd0eea4d80ea8; sid_guard=1a66858f95fcda30a193e35c16857b75%7C1719170598%7C5184000%7CThu%2C+22-Aug-2024+19%3A23%3A18+GMT; sid_ucp_v1=1.0.0-KGJkYzgzZTVjYzA1ZmZkMTMyZTRkYzE1MzdkODIxNzg5ZTdlMTE4MzAKGwjEiuCNx8yhAxCm7OGzBhjvMSAMOAZA9AdIBBoCbGYiIDFhNjY4NThmOTVmY2RhMzBhMTkzZTM1YzE2ODU3Yjc1; ssid_ucp_v1=1.0.0-KGJkYzgzZTVjYzA1ZmZkMTMyZTRkYzE1MzdkODIxNzg5ZTdlMTE4MzAKGwjEiuCNx8yhAxCm7OGzBhjvMSAMOAZA9AdIBBoCbGYiIDFhNjY4NThmOTVmY2RhMzBhMTkzZTM1YzE2ODU3Yjc1; download_guide=%223%2F20240623%2F1%22; pwa2=%220%7C0%7C3%7C1%22; volume_info=%7B%22isUserMute%22%3Afalse%2C%22isMute%22%3Atrue%2C%22volume%22%3A0.253%7D; publish_badge_show_info=%220%2C0%2C0%2C1719282335431%22; strategyABtestKey=%221719716945.552%22; __ac_nonce=06680d4e500885eb5c36a; __ac_signature=_02B4Z6wo00f01fUiLzwAAIDChSUedWUWWhH1AiuAABvKad; douyin.com; device_web_cpu_core=16; device_web_memory_size=8; architecture=amd64; csrf_session_id=2afd49bde3ec57045e9b810ff8ed4b3c; passport_fe_beating_status=true; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1920%2C%5C%22screen_height%5C%22%3A1080%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A16%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A6.3%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A50%7D%22; xg_device_score=7.873851705001503; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCSjYrWXdKa2pLdFpEazJaTzVwdFJibTZwazRvbGJRNitwZ2ZUcmVoWjM2VjdOaFVnN1VjZ0pTUEdqL25iWXUxZS9Yd0hOR2ZHaWZtcEs4N0lKRjd3UFk9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoxfQ%3D%3D; home_can_add_dy_2_desktop=%221%22; odin_tt=8fcc2ff024ac9cd03919272356d98514b68ebad94bbd6de20692493b3d7416bd6df6f98a094b6ec02d7100a94239c107; stream_player_status_params=%22%7B%5C%22is_auto_play%5C%22%3A0%2C%5C%22is_full_screen%5C%22%3A0%2C%5C%22is_full_webscreen%5C%22%3A0%2C%5C%22is_mute%5C%22%3A1%2C%5C%22is_speed%5C%22%3A1%2C%5C%22is_visible%5C%22%3A0%7D%22; IsDouyinActive=true; WallpaperGuide=%7B%22showTime%22%3A1717570070252%2C%22closeTime%22%3A0%2C%22showCount%22%3A6%2C%22cursor1%22%3A45%2C%22cursor2%22%3A0%2C%22hoverTime%22%3A1716787688661%7D; msToken=pHN6eww11L3abYoChvbbbOHzZoiSJsExcTH3C6e2Ga6jEAJd0GlENCa_XGmTDSLmfOp7qgncMSEHP8mBq5OT5A1IzwZtR7wdjnnk28S_Dj0ig087brxSko-am-4ilTA='; // Default cookie value

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
  chrome.storage.local.get(['keywords', 'cookie'], (result) => {
    const cookie = result.cookie || defaultCookie; // Use saved cookie or default cookie
    if (result.keywords) {
      const keywords = result.keywords.split('\n');
      startCapturing(keywords, cookie);
    } else {
      console.error('Keywords not found in storage');
      chrome.runtime.sendMessage({ action: 'error', message: 'Keywords not found in storage' });
    }
  });
}

function startCapturing(keywords, cookie) {
  chrome.webRequest.onCompleted.addListener(
    async (details) => {
      if (details.url.includes('aweme/v1/web/general/search/single')) {
        console.log('Intercepted URL:', details.url);
        try {
          const response = await fetch(details.url, {
            headers: new Headers({ 'Cookie': cookie })
          });
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

  sendGetRequestsWithDelay(keywords, cookie, 0);
}

function sendGetRequestsWithDelay(keywords, cookie, index) {
  if (index < keywords.length) {
    setTimeout(() => {
      sendGetRequest(keywords[index], cookie);
      sendGetRequestsWithDelay(keywords, cookie, index + 1);
    }, 1000);
  }
}

async function sendGetRequest(keyword, cookie) {
  const proxyUrl = 'http://localhost:3000/proxy'; // URL of your proxy server
  const params = {
    device_platform: 'webapp',
    aid: '6383',
    channel: 'channel_pc_web',
    search_channel: 'aweme_general',
    enable_history: '1',
    keyword: encodeURIComponent(keyword.trim()),
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
  const fullUrl = `${proxyUrl}?url=${encodeURIComponent(targetUrl)}&cookie=${encodeURIComponent(cookie)}`;

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
      if (firstItem.type == 4) {
        author = firstItem.user_list[0].user_info.nickname;
        uid = firstItem.user_list[0].user_info.uid;  
      } else {
        author = firstItem.aweme_info.author.nickname;
        uid = firstItem.aweme_info.author.uid; 
      }
      console.log('Author:', author);
      console.log('UID:', uid);
      var keyword = data.global_doodle_config.keyword;
      extractedData = { author, uid, keyword };
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
