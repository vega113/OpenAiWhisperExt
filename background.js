chrome.runtime.onInstalled.addListener(() => {
    console.log('OpenAI Whisper Extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'callWhisperAPI') {
        const apiKey = request.apiKey; // Get API key from request
        const url = 'https://api.openai.com/v1/audio/transcriptions'; // Updated endpoint

        // Create FormData
        const formData = new FormData();
        formData.append('file', dataURItoBlob(request.audioData), 'audio.wav');
        formData.append('model', 'whisper-1');

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log('API Response Data:', data); // Add this line for debugging
                sendResponse({ success: true, data });
            })
            .catch(error => {
                console.error('Error:', error);
                sendResponse({ success: false, error: error.message });
            });

        return true; // Indicates that the response will be sent asynchronously
    }
});

// Helper function to convert dataURI to Blob
function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}