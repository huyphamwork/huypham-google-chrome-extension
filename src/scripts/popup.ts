import '../style.scss';
console.log('this is popup console');
let currentTabId: number;
async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
(async () => {
  document.getElementById('start')?.addEventListener('click', async function (e) {
    console.log('click start');
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      const currentTab = await getCurrentTab();
      if (currentTab && currentTab.id) {
        currentTabId = currentTab.id;
        chrome.tabs.sendMessage(currentTabId, { tabId: currentTabId, type: 'from-popup' }, function (response) {
          console.log('CONTENT RESPONSE:', response);
        });
        chrome.runtime.sendMessage({ tabId: currentTabId, type: 'from-popup' }, function (response) {
          console.log('SERVICE WORKER RESPONSE:', response);
        });
      }
    });
  });
})();
