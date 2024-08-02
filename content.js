// content.js

// Function to check if user is on a GitHub repository page
function isRepoPage() {
    return window.location.hostname === 'github.com' && window.location.pathname.startsWith('/repo');
  }
  
  // Function to send a message to the background script to get the token
  function getTokenFromBackground() {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ action: 'getToken' }, (response) => {
        if (chrome.runtime.lastError || !response.token) {
          reject(new Error('Failed to get token'));
        } else {
          resolve(response.token);
        }
      });
    });
  }
  
  // Function to generate README using AI (placeholder function)
  async function generateReadme(token) {
    // This is a placeholder for the actual implementation.
    // Replace this with the real API call to your AI service.
    const repoName = document.querySelector('strong[itemprop="name"]').innerText;
    const repoDescription = document.querySelector('p[itemprop="description"]')?.innerText || '';
  
    // Simulating a README generation
    return `# ${repoName}\n\n${repoDescription}\n\nThis is a generated README.`;
  }
  
  // Function to display a modal with README content
  function showModal(readmeContent) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.border = '1px solid #ccc';
    modal.style.padding = '20px';
    modal.style.zIndex = '1000';
    modal.style.maxWidth = '90vw';
    modal.style.maxHeight = '90vh';
    modal.style.overflow = 'auto';
  
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.onclick = () => document.body.removeChild(modal);
    modal.appendChild(closeButton);
  
    const pre = document.createElement('pre');
    pre.textContent = readmeContent;
    modal.appendChild(pre);
  
    document.body.appendChild(modal);
  }
  
  // Function to handle "Generate README" button click
  async function handleGenerateReadmeClick() {
    try {
      const token = await getTokenFromBackground();
      const readmeContent = await generateReadme(token);
      showModal(readmeContent);
    } catch (error) {
      console.error('Error generating README:', error);
    }
  }
  
  // Create the "Generate README" button
  function createGenerateReadmeButton() {
    const button = document.createElement('button');
    button.textContent = 'Generate README';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.right = '10px';
    button.style.zIndex = '1000';
    button.onclick = handleGenerateReadmeClick;
    document.body.appendChild(button);
  }
  
  // Only add the button if on a GitHub repo page
  if (isRepoPage()) {
    createGenerateReadmeButton();
  }
  