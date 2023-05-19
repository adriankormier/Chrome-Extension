//add a 'click' event listener to the extract button that sends a message to the content.js file that we want to extract the words from the page
document.getElementById('extract-button').addEventListener('click', () => {
  chrome.runtime.sendMessage({ command: 'extractWords' });
});