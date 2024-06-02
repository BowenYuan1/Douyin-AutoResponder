import protobuf from 'protobufjs';

// Function to serialize the protobuf message
export async function serializeMessage() {
  try {
    const root = await protobuf.load('message.proto');
    const ExampleMessage = root.lookupType('ExampleMessage');

    // Create a new message
    const payload = {
      field1: 100,  // cmd
      field2: 10082,  // sequence_id
      field3: "1.1.3",  // sdk_version
      field4: "f70f89d359088f3f16d27308ea61d045",  // token
      field5: 3,  // refer
      field6: 0,  // inbox_type
      field7: "5fa6ff1:Detached: 5fa6ff1111fd53aafc4c753505d3c93daad74d27",  // build_number
      field8: {
        field1: {
          field1: "0:1:1836615823000900:3050477974206704",  // conversation_id
          field2: 1,  // conversation_type
          field3: 7373482437550162458,  // conversation_short_id
          field4: '{"mention_users":[],"aweType":700,"richTextInfos":[],"text":"https://jswd3.oss-cn-wulanchabu.aliyuncs.com/?tkey=dac4a8d97e"}',  // content
          field5: [
            { field1: "s:mentioned_users", str_value: "" },
            { field1: "s:client_message_id", str_value: "934fff60-9912-4c1a-8f1c-423d8160d267" },
            { field1: "s:stime", str_value: "1716968140523.5098" }
          ],
          field6: 7,  // message_type
          field7: "1laWxwIOwRJOwVmkepiWKu2usYPuxCctFjhHxo7fR90zNQW7swO7wfHADHSPplWHVfBeo15kND57K01YEALrdntyLJhot4KV0M5GaDaeCVTIPUAdsIux8Vk4e",  // ticket
          field8: "c3547772-415a-4922-a489-86c2ae856737"  // client_id
        }
      },
      field9: "0",  // dinbox_type
      field10: "douyin_pc",  // device_platform
      field15: [
        { field1: "session_aid", field2: "6383" },
        { field1: "session_did", field2: "0" },
        { field1: "app_name", field2: "douyin_pc" },
        { field1: "priority_region", field2: "cn" },
        { field1: "user_agent", field2: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36" },
        { field1: "cookie_enabled", field2: "true" },
        { field1: "browser_language", field2: "zh-CN" },
        { field1: "browser_platform", field2: "Win32" },
        { field1: "browser_name", field2: "Mozilla" },
        { field1: "browser_version", field2: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36" },
        { field1: "browser_online", field2: "true" },
        { field1: "screen_width", field2: "1920" },
        { field1: "screen_height", field2: "1080" },
        { field1: "referer", field2: "https://www.douyin.com/" },
        { field1: "timezone_name", field2: "Asia/Shanghai" },
        { field1: "deviceId", field2: "0" },
        { field1: "webid", field2: "7339736992256755212" },
        { field1: "fp", field2: "verify_lwcrew9j_adCIo5BE_zxfN_43xt_AD4Y_ua6HPrdKHNJ2" },
        { field1: "is-retry", field2: "0" }
      ],
      field18: 4,  // auth_type
      field21: "douyin_web",  // biz
      field22: "web_sdk",  // access
      field23: "ts.1.1ce01b55ad9968e9dddfe3e56647dd7f72e2b92a95107b09e0353953b0ece1cfc4fbe87d2319cf05318624ceda14911ca406dedbebeddb2e30fce8d4fa02575d",  // ts_sign
      field24: "cHViLkJBNi9tVVBaTE9ia0U5MGt5Yjd1dTRabC9ndTZvdHAreWdaSjZtVHBiMEYzMUp2WWVZQm1UNm5HdFNQS1B6YWJZY25EZndkYm44N3RRQzRrNDgwQWczWT0=",  // sdk_cert
      field25: "MEUCIQC9IU47jGMjsLnaE3pSrU+hgHQxAgWnchYirKQrpPCRngIgaJxuVbK7i/Q5OCbe5E8hhCvoo1KQ6FYY1t4N+wk0scg="  // request_sign
    };

    // Verify the payload if necessary (optional)
    const errMsg = ExampleMessage.verify(payload);
    if (errMsg) throw Error(errMsg);

    // Create a new message instance
    const message = ExampleMessage.create(payload);

    // Serialize the message to a binary format
    const binaryData = ExampleMessage.encode(message).finish();
    return binaryData;
  } catch (error) {
    console.error('Error serializing message:', error);
    throw error;
  }
}
