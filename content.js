const scriptEl = document.createElement("script");
scriptEl.src = chrome.runtime.getURL("script.js");
scriptEl.onload = function() {
  this.remove();
};

(document.head || document.documentElement).appendChild(scriptEl);
