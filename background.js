// The function to extract words from the webpage.
function getWordsFromPage() {
  // grab all innerText from the body element
  let textContent = document.body.innerText;
  let wordArray = textContent.split(/\s+/);
  console.log('textContent:' , textContent)
  // iterate through array of words and filter out any words that contain numbers or symbols
  let filteredText = wordArray.filter(word => {
    // return only words that pass the regular expression (start at the beginning of word and check until the end. any words that contain numbers or symbols return falsy)
    return word.match(/^\b[a-zA-Z]+\b$/,"");
  });
  // return filteredText; <--- This just returns all words found on the page
  ////////////////////////////////////////////////////////////////
  // this function returns the largest word found within the page
  /*let biggestWord = filteredText.reduce((acc, curr) => {
    if (curr.length > acc.length) acc = curr;
    return acc;
  }, [])
  console.log('biggest word = ', biggestWord)
  // console.log('filtered text:', filteredText)
  
  return biggestWord;*/
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  // this function returns any palindromes found within the page //
  const palindromes = (array) => {
    let reverse = '';
    const output = [];
    array.forEach(el => {
      // console.log(reverse);
      reverse = el.split("").reverse().join("");
      if (el === reverse && el.length >= 3) output.push(el)
    })
    if (!output) {
      return 'No palindromes found!'
    } else {
      return output;
    }
  }
  return palindromes(filteredText);
 
}

//add event listener that listens for message from popup.js telling it to extract words from the page
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === 'extractWords') {
    //query the tabs of the current active window to create an array of tabs
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      //if tabs length is 0, no active tabs are found and message is logged to console
      if (tabs.length === 0) {
        console.log("No active tabs found.");
        return;
      }
      // tab is set to tabs array's first element
      let tab = tabs[0];
      // execute script that targets current tab and runs the getWordsFromPage function
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getWordsFromPage
      }, (results) => {
        // if an error occurs, or no results are returned, console log the error
        if (chrome.runtime.lastError || !results || !results.length || !results[0]) {
          console.log('Error injecting script or no results returned.');
        } else {
          // upon successfully grabbing all the words from the page, do something with them?
          console.log('Palindromes found:', results[0].result);
          console.log(results)
        }
      });
    });
  }
});