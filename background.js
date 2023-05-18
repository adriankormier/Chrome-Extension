// chrome.runtime.onInstalled.addListener(() => {
//   chrome.action.setBadgeText({
//     text: "WTF?",
//   });
// });


// function wordExtraction() {
//   let textContent = document.body.innerText;
//   let wordArray = textContent.split(/\s+/);
//   console.log(wordArray)
//   return wordArray;
// }


// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: wordExtraction()
//   }, (results) => {
//     if (chrome.runtime.lastError || !results || !results.length) {
//       console.log('Error injecting script or no results returned.')
//     } else {
//       console.log('Words from page:', results[0].result)
//     }
//   });
// });
/////////////////////////////////////////////////////////
















//////////////////////////////////////////////////////////
// chrome.action.onClicked.addListener(async (tab) => {
//   await chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     files: ['contentScript.js'],
//   });
// });





// function wordExtraction() {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id },
//       function: extractWords,
//     });
//   });
// }

// function extractWords() {
//   let textContent = document.body.innerText;
//   let wordArray = textContent.split(/\s+/);
//   console.log(wordArray);
// }

// chrome.action.onClicked.addListener(wordExtraction);



////////////////CHATGPT/////////////////
// The function to extract words from the webpage.
function getWordsFromPage() {
  let textContent = document.body.innerText;
  let wordArray = textContent.split(/\s+/);
  return wordArray;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === 'extractWords') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.log("No active tabs found.");
        return;
      }
      let tab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getWordsFromPage
      }, (results) => {
        if (chrome.runtime.lastError || !results || !results.length) {
          console.log('Error injecting script or no results returned.');
        } else {
          console.log('Words from page:', results[0].result);
        }
      });
    });
  }
});
