importScripts('libs/protobuf.min.js');

var capturedResponse; // Global variable to store the captured response
var extractedData; // Global variable to store the extracted data
const defaultCookie = 'live_use_vvc=%22false%22; bd_ticket_guard_client_web_domain=2; xgplayer_user_id=890978299990; store-region-src=uid; _bd_ticket_crypt_doamin=2; __security_server_data_status=1; n_mh=9-mIeuD4wZnlYrrOvfzG3MuT6aQmCUtmr8FxV8Kl8xY; LOGIN_STATUS=1; SEARCH_RESULT_LIST_TYPE=%22single%22; xgplayer_device_id=99561869265; __live_version__=%221.1.1.9068%22; ttwid=1%7Cjc1DXelNa52s1ZFFfqdNbnUWAnEeSj5VvqBNMhOf-Uk%7C1715156861%7C88dc2c888d1d0e587867e8206d94985b9ca12cc5cc06849aee4a10b6c7680d23; s_v_web_id=verify_lw8kqptl_3KlEW0Ni_uCio_4i4u_BM2u_GU0105nZiBA2; UIFID_TEMP=f670781d5233033367a4d99498efe9bd14a45e82156a15d1881178acac831acf185c233d88e3f12fb489e6501005b67003a999030ae15a8a03c8423c4e2ea8aa27c1ce22402f6cb25a807c65013fba9a; douyin.com; device_web_cpu_core=8; device_web_memory_size=8; architecture=amd64; dy_swidth=1920; dy_sheight=1080; csrf_session_id=77b36e76ba263de4f032325d12550678; volume_info=%7B%22isUserMute%22%3Afalse%2C%22isMute%22%3Atrue%2C%22volume%22%3A0.6%7D; FOLLOW_NUMBER_YELLOW_POINT_INFO=%22MS4wLjABAAAAqTHoNTWKQMnnb7B3WjDdw8bxcc5oFLeQF7QvIb9CHMCiB-UGeOx4IMLMk5x25QRm%2F1719417600000%2F0%2F1719365512011%2F0%22; passport_csrf_token=9484ed2e6c7a168ae4780a765e3fdb22; passport_csrf_token_default=9484ed2e6c7a168ae4780a765e3fdb22; store-region=cn-bj; publish_badge_show_info=%220%2C0%2C0%2C1719365512756%22; fpk1=U2FsdGVkX1+swJvGwUh8KQlMcXSigbkOHQxSuesONtk3jRhHI0+3oLbFAqfxjj3lx8ekDTpRRVHYtI0StEzpmg==; fpk2=9c1ce27f08b16479d2e17743062b28ed; UIFID=f670781d5233033367a4d99498efe9bd14a45e82156a15d1881178acac831acf185c233d88e3f12fb489e6501005b6701610bb09738f7a6d2ae7d21f861d4b034a57c0a25ce5a6a7e54a1bbf3441dd0353f4fad3234d218e2f9d5c7d909a0f25044d611ea347b6fe2c33228b0137800202f67bc7d5696936a760713ec07561540cc058e35beefe4505e51d9988025e3985c7ee2e19233ef855166699a9954b7c; download_guide=%223%2F20240627%2F1%22; my_rd=2; FORCE_LOGIN=%7B%22videoConsumedRemainSeconds%22%3A180%7D; passport_assist_user=CkHJOcMCWau-5Kn8lNV2383-YX7rKM6cvB7xLTibLJFaGtfALGcRbtwQcLx5JYUpmZN3IwGzmkSr9djwsHsAhvbPLhpKCjzYHrWlczl7Z_llhl5rdkAzUI3Rrz1jFkwOGPOLMONEaoTeTB1MlERfVjGncRkgZMMxlYxPcOA72mCxNTsQgJHVDRiJr9ZUIAEiAQNJtoI_; sso_uid_tt=8c0b1c8da869bc304f41a1b5da91234f; sso_uid_tt_ss=8c0b1c8da869bc304f41a1b5da91234f; toutiao_sso_user=8790f33bfac1eab19ef8a0c01898e05c; toutiao_sso_user_ss=8790f33bfac1eab19ef8a0c01898e05c; sid_ucp_sso_v1=1.0.0-KDhkZDdlMzI0YWQwMmY4ZTFlMTFlMDczMzk0MjAxNWExYzI3NjA0OGYKIQjEiuCNx8yhAxDrgfSzBhjvMSAMML-2nLIGOAZA9AdIBhoCbHEiIDg3OTBmMzNiZmFjMWVhYjE5ZWY4YTBjMDE4OThlMDVj; ssid_ucp_sso_v1=1.0.0-KDhkZDdlMzI0YWQwMmY4ZTFlMTFlMDczMzk0MjAxNWExYzI3NjA0OGYKIQjEiuCNx8yhAxDrgfSzBhjvMSAMML-2nLIGOAZA9AdIBhoCbHEiIDg3OTBmMzNiZmFjMWVhYjE5ZWY4YTBjMDE4OThlMDVj; passport_auth_status=832e6971247a9e9887a58b0add39e220%2C03f08ef80be68d9e1242e5a770e6230c; passport_auth_status_ss=832e6971247a9e9887a58b0add39e220%2C03f08ef80be68d9e1242e5a770e6230c; uid_tt=5101bb4e1aa5c0ab569ccc8453a7d378; uid_tt_ss=5101bb4e1aa5c0ab569ccc8453a7d378; sid_tt=0732a8297d66e61a91d11e1917862638; sessionid=0732a8297d66e61a91d11e1917862638; sessionid_ss=0732a8297d66e61a91d11e1917862638; _bd_ticket_crypt_cookie=de3924333238e29d4307d1041627f2ee; sid_guard=0732a8297d66e61a91d11e1917862638%7C1719468272%7C5183998%7CMon%2C+26-Aug-2024+06%3A04%3A30+GMT; sid_ucp_v1=1.0.0-KDAyNWJkZjU0MDkyOWM3N2FlNDUyMzZlYjc4ZjBkMmMwMWJlODI1NWYKGwjEiuCNx8yhAxDwgfSzBhjvMSAMOAZA9AdIBBoCbGYiIDA3MzJhODI5N2Q2NmU2MWE5MWQxMWUxOTE3ODYyNjM4; ssid_ucp_v1=1.0.0-KDAyNWJkZjU0MDkyOWM3N2FlNDUyMzZlYjc4ZjBkMmMwMWJlODI1NWYKGwjEiuCNx8yhAxDwgfSzBhjvMSAMOAZA9AdIBBoCbGYiIDA3MzJhODI5N2Q2NmU2MWE5MWQxMWUxOTE3ODYyNjM4; pwa2=%220%7C0%7C3%7C1%22; strategyABtestKey=%221719537697.667%22; __ac_nonce=0667e103200d27bfd3394; __ac_signature=_02B4Z6wo00f0108hJgwAAIDCRQf9pZSiYptPASKAALXBMV4Glt1xVKu8v936iFHL9oYcwwPaV9bYk1s5-AX4fmD6lSKlii7MINWH8D8xWVg0NMeTPkhVXjBT8vW4DE8a-pJ5zbBjXTatCms335; x-web-secsdk-uid=c323e0d8-8e5a-4be2-8f6b-619db905c3a3; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1920%2C%5C%22screen_height%5C%22%3A1080%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A8%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A10%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A150%7D%22; passport_fe_beating_status=true; xg_device_score=7.644878326806086; WallpaperGuide=%7B%22showTime%22%3A1719367444844%2C%22closeTime%22%3A0%2C%22showCount%22%3A1%2C%22cursor1%22%3A33%2C%22cursor2%22%3A0%2C%22hoverTime%22%3A1719380679453%7D; stream_player_status_params=%22%7B%5C%22is_auto_play%5C%22%3A0%2C%5C%22is_full_screen%5C%22%3A0%2C%5C%22is_full_webscreen%5C%22%3A0%2C%5C%22is_mute%5C%22%3A1%2C%5C%22is_speed%5C%22%3A1%2C%5C%22is_visible%5C%22%3A0%7D%22; IsDouyinActive=true; home_can_add_dy_2_desktop=%221%22; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCTVhaWCt1VGw0ZHR2aVFDR3duNTB6M05EdTVwYldnby9RVG5zcGVkWHljenhXR1pEMFdLZGZOUUtDaFB6YlM4aUNjMm8yYkpxMlB3NGdqWHA3M2trMGs9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoxfQ%3D%3D; odin_tt=d4c16a6a223eb5058f43623eb6247a0730a6b5acd4cedacce7afd9efb15374df62f7addfde10e0ee522593f9c3c34361; msToken=cKYwKmuVTX7nEVqLse3nzeauD55-aVeGqpjLb0OV-yb9ukZW6KiRathsWooZzj80ZUmmmnHEf_poTtmL6hAA2FuhIDQsGA6hTb5WXuky4PWEuxWu84jJeOr77Dh1'; // Default cookie value

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

  keywords.forEach(keyword => {
    sendGetRequest(keyword, cookie);
  });
}

async function sendGetRequest(keyword, cookie) {
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
