
if (navigator.userAgentData) {
  navigator.userAgentData.getHighEntropyValues(['platformVersion']).then(ua => {
    const version = ua.platformVersion.split('.')[0]; // Only major version
    if (parseFloat(version) < 5.1) {
       alert(`Android version is too low. Please upgrade your mobile. ${version}`);
       document.innerHTML=`
      UNSUPPORTED BROWSER. :(
      `
    }
  });
} else {
  // Fallback for older browsers using userAgent string
  const ua = navigator.userAgent || '';
  const match = ua.match(/Android\s([0-9\.]+)/);
  if (match) {
    const version = parseFloat(match[1]);
    if (version < 5.1) {
      alert(`Android version is too low. Please upgrade your mobile. ${version}`);
      document.innerHTML=`
      UNSUPPORTED BROWSER. :(
      `
      
      
      
    }
  }
}



function isDevToolsOpen() {
  const threshold = 160;
  const start = performance.now();

  debugger; // This adds delay if DevTools is open

  const elapsed = performance.now() - start;
  return elapsed > threshold;
}

function removeScriptOnDevTools() {
  if (isDevToolsOpen()) {
    const targetScript = document.querySelector('script[data-protect]');
    if (targetScript) {
      targetScript.remove();
      alert("Unauthorized action blocked.");
      document.body.remove()
    } else {
      document.body.remove()
    }
  }
}

// Repeat check every 1 second
setInterval(removeScriptOnDevTools, 1000);



