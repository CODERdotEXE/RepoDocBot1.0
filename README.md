
# RepoDocBot1.0

RepoDocBot1.0 is a Chrome extension and web application designed to assist users in generating and customizing README.md files for their GitHub repositories using AI.

## Overview

This project includes:
- **Chrome Extension**: An extension that integrates with GitHub to generate and modify README.md files based on user input.
- **Python Backend**: A backend service built with Flask that communicates with the OpenAI API to generate and modify README.md files.

## Features

### Chrome Extension
- **Sign In**: Allows users to sign in with their GitHub account.
- **Generate README**: Analyzes the GitHub repository and generates a README.md file using AI.
- **Preview and Modify README**: Displays the generated README.md file and allows users to make modifications through a chat interface.
- **Copy README**: Provides an option to copy the generated README.md content.

### Python Backend
- **Generate README Endpoint**: Endpoint for generating a README.md file based on repository details.
- **Modify README Endpoint**: Endpoint for modifying an existing README.md file based on user input.

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Flask
- OpenAI API Key

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/RepoDocBot1.0.git
   cd RepoDocBot1.0
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend-py
   pip install -r requirements.txt
   ```

3. **Set up OpenAI API Key:**

   - Obtain your API key from [OpenAI](https://platform.openai.com/account/api-keys).
   - Set the API key in an environment variable:

     ```bash
     export OPENAI_API_KEY='your_openai_api_key'
     ```

4. **Run the backend server:**

   ```bash
   python app.py
   ```

5. **Load the Chrome Extension:**

   - Open Chrome and go to `chrome://extensions/`.
   - Enable "Developer mode".
   - Click "Load unpacked" and select the extension folder.

### Usage

1. **Sign In:**
   - Click the extension icon and sign in with your GitHub account.

2. **Generate README:**
   - Open a GitHub repository page.
   - Click the extension icon and click "Generate README".

3. **Preview and Modify README:**
   - Review the generated README.md content.
   - Use the chat interface to request modifications.

4. **Copy README:**
   - Click the "Copy README" button to copy the generated README.md content to your clipboard.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please contact [sarnabhhaldar2@gmail.com](mailto:sarnabhhaldar2@gmail.com).
