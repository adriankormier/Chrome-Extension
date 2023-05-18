// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === 'countWords') {
//       chrome.tabs.executeScript(sender.tab.id, { code: 'document.body.innerText' }, (result) => {
//         const text = result[0];
//         const wordCount = text.split(/\s+/).length;
//         sendResponse({ wordCount });
//       });
//     }
//     return true;
//   });
