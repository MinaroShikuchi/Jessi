// background.js

let color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log("Default background color set to %cgreen", `color: ${color}`);

  setTimeout(() => {});
});

chrome.webRequest.onBeforeRequest.addListener(
  (details, test) => {
    // Process the XHR response.
    console.log(details, test);
  },
  { urls: ["https://www.instagram.com/web/save/*"] }
);

