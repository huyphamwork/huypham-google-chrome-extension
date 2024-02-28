console.log('this is service worker');
chrome.runtime.onMessage.addListener(async function (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void,
) {
  if (message.type == 'from-popup') {
    console.log('this is call from popup');
    sendResponse('this is message from service worker to popup');
    chrome.tabs.sendMessage(
      message.tabId,
      { tabId: message.tabId, type: 'from-service-worker' },
      async function (response: any) {
        console.log('CONTENT RESPONSE:', response);
      },
    );
  }
});
