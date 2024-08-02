// popup.js

document.addEventListener('DOMContentLoaded', function() {
    const signinButton = document.getElementById('signin-btn');
    const generateButton = document.getElementById('generate-readme');
    const readmeCodeTextarea = document.getElementById('readme-code');
    const previewDiv = document.getElementById('preview');
    const copyButton = document.getElementById('copy-btn');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-btn');
    const mainContent = document.getElementById('main-content');
  
    // Handle sign-in button click
    signinButton.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'signin' }, (response) => {
        console.log('Sign-in initiated');
        // Hide sign-in button and show main content
        signinButton.style.display = 'none';
        mainContent.style.display = 'block';
      });
    });
  
    // Handle generate README button click
    generateButton.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'getToken' }, async (response) => {
        const token = response.token;
  
        try {
          // Call AI service to generate README
          const readmeContent = await generateReadmeFromAI();
          displayReadme(readmeContent);
        } catch (error) {
          console.error('Error generating README:', error);
        }
      });
    });
  
    // Handle copy button click
    copyButton.addEventListener('click', () => {
      readmeCodeTextarea.select();
      document.execCommand('copy');
    });
  
    // Handle chat input for AI modifications
    sendButton.addEventListener('click', () => {
      const query = chatInput.value.trim();
      if (query) {
        chrome.runtime.sendMessage({ action: 'getToken' }, async (response) => {
          const token = response.token;
  
          try {
            // Call AI service to update README based on user input
            const updatedReadmeContent = await modifyReadmeFromAI(query);
            displayReadme(updatedReadmeContent);
          } catch (error) {
            console.error('Error modifying README:', error);
          }
        });
      }
    });
  
    // Function to call AI service for README generation
    async function generateReadmeFromAI() {
      // Replace with your local server URL and endpoint
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          repoName: 'Your Repo Name', // Fetch repo name dynamically if needed
          description: 'Repo Description' // Fetch repo description dynamically if needed
        })
      });
      const data = await response.json();
      return data.readmeContent;
    }
  
    // Function to call AI service for modifying README
    async function modifyReadmeFromAI(query) {
      // Replace with your local server URL and endpoint
      const response = await fetch('http://localhost:5000/modify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentReadme: readmeCodeTextarea.value,
          modificationQuery: query
        })
      });
      const data = await response.json();
      return data.updatedReadmeContent;
    }
  
    // Function to display README content
    function displayReadme(content) {
      readmeCodeTextarea.value = content;
      previewDiv.innerHTML = `<pre>${content}</pre>`;
      mainContent.style.display = 'block';
    }
  
    // Initialize popup state
    chrome.runtime.sendMessage({ action: 'getToken' }, (response) => {
      if (response.token) {
        signinButton.style.display = 'none';
        mainContent.style.display = 'block';
      } else {
        signinButton.style.display = 'block';
        mainContent.style.display = 'none';
      }
    });
  });
