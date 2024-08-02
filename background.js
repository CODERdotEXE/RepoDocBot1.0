// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log('Background script installed');
  });
  
  // Handle messages from popup.js
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'signin') {
      const authUrl = `https://github.com/login/oauth/authorize?client_id=Ov23lisRtmgtKH9wnSCQ&redirect_uri=https://localhost/callback&scope=repo,user`;
      chrome.identity.launchWebAuthFlow(
        {
          url: authUrl,
          interactive: true
        },
        function(redirectUrl) {
          if (chrome.runtime.lastError || !redirectUrl) {
            console.error(chrome.runtime.lastError);
            return;
          }
          const url = new URL(redirectUrl);
          const code = url.searchParams.get('code');
          if (code) {
            fetch('https://github.com/login/oauth/access_token', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: new URLSearchParams({
                client_id: 'Ov23lisRtmgtKH9wnSCQ',
                client_secret: 'YOUR_CLIENT_SECRET',
                code: code
              }).toString()
            })
            .then(response => response.json())
            .then(data => {
              if (data.access_token) {
                chrome.storage.local.set({ accessToken: data.access_token }, () => {
                  console.log('Access token saved');
                });
              } else {
                console.error('Failed to get access token.');
              }
            })
            .catch(error => console.error(error));
          }
        }
      );
    } else if (message.action === 'getToken') {
      chrome.storage.local.get('accessToken', (result) => {
        sendResponse({ token: result.accessToken });
      });
      return true; // Will respond asynchronously.
    }
  });
  