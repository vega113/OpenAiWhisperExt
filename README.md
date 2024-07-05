# OpenAI Whisper Extension

## Overview
The OpenAI Whisper Extension is a Chrome extension that allows users to record audio, transcribe it using the OpenAI Whisper API, and copy the transcribed text.

## Features
- Record audio via microphone.
- Transcribe audio using OpenAI Whisper API.
- Copy the transcribed text to the clipboard.
- Save and manage API key via extension options page.

## Installation
1. Clone the repository or download the source code.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the extension directory.

## Usage
1. Click on the extension icon to open the popup.
2. Enter your OpenAI API key in the options page.
    - Click the extension icon > "Options".
    - Enter your API key and click "Save API Key".
3. In the popup, click "Record" to start recording audio.
4. Click "Stop" to stop recording and transcribe the audio.
5. Copy the transcribed text using the "Copy" button.

## Development
### Files
- `manifest.json`: Extension manifest file.
- `popup.html`: HTML for the popup UI.
- `popup.js`: JavaScript for handling popup interactions.
- `options.html`: HTML for the options page.
- `options.js`: JavaScript for handling options page interactions.
- `background.js`: Background script for handling API requests.

### Scripts
- `options.js`: Manages saving and loading the API key.
- `popup.js`: Manages recording, stopping, and sending audio data to the background script.
- `background.js`: Handles communication with the OpenAI Whisper API.

### Styles
- `styles.css`: Basic styling for the extension.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.