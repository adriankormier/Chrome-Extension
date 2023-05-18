// document.getElementById('myButt').addEventListener('click', function() {
//   console.log('button works!')

// });
//////////////////

// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     const tab = tabs[0];
//     chrome.tabs.executeScript(tab.id, { file: 'content.js' }, () => {
//       chrome.tabs.sendMessage(tab.id, { action: 'countWords' }, (response) => {
//         const wordCountElement = document.getElementById('wordCount');
//         wordCountElement.textContent = response.wordCount.toString();
//       });
//     });
//   });


/////////////////////////////

// function extractWords() {
//   const textContent = document.body.innerText;
//   const wordArray = textContent.split(/\s+/);
//   console.log(wordArray);
// }

///////////CHATGPT///////////////

document.getElementById('extract-button').addEventListener('click', () => {
  chrome.runtime.sendMessage({ command: 'extractWords' });
});
