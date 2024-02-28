console.log('this is from content js');
chrome.runtime.onMessage.addListener(async function (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void,
) {
  if (message.type == 'from-popup') {
    console.log('this is call from popup');
    sendResponse('this is message from content to popup');
  } else if (message.type == 'from-service-worker') {
    console.log('this is call from service worker');
    sendResponse('this is message from content to service worker');
  }
});
