let mediaRecorder;
let audioChunks = [];

document.getElementById('recordBtn').addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            audioChunks = [];

            mediaRecorder.addEventListener('dataavailable', event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const reader = new FileReader();

                reader.onload = function(event) {
                    const audioData = event.target.result;

                    // Show spinner
                    document.getElementById('spinner').hidden = false;

                    chrome.storage.sync.get('apiKey', (data) => {
                        if (data.apiKey) {
                            chrome.runtime.sendMessage({
                                action: 'callWhisperAPI',
                                audioData: audioData,
                                apiKey: data.apiKey
                            }, response => {
                                // Hide spinner
                                document.getElementById('spinner').hidden = true;

                                if (response.success) {
                                    console.log('API Response:', response.data);
                                    if (response.data && response.data.text) {
                                        document.getElementById('transcriptionResult').value = response.data.text;
                                        document.getElementById('copyBtn').disabled = false;
                                    } else {
                                        document.getElementById('transcriptionResult').value = 'Error: Transcription not found in the response';
                                    }
                                } else {
                                    document.getElementById('transcriptionResult').value = `Error: ${response.error}`;
                                }
                            });
                        } else {
                            alert('Please set your API Key in the options page.');
                            document.getElementById('spinner').hidden = true;
                        }
                    });
                };

                reader.readAsDataURL(audioBlob);
            });

            document.getElementById('recordBtn').disabled = true;
            document.getElementById('stopBtn').disabled = false;
        })
        .catch(error => {
            console.error('Error accessing microphone:', error);
            let errorMessage = 'Error accessing microphone. Please check your browser settings.';
            if (error.name === 'NotAllowedError') {
                errorMessage = 'Microphone access was denied. Please allow microphone access.';
            } else if (error.name === 'NotFoundError') {
                errorMessage = 'No microphone was found. Please connect a microphone.';
            } else if (error.name === 'NotReadableError') {
                errorMessage = 'Microphone is already in use by another application.';
            }
            alert(errorMessage);
        });
});

document.getElementById('stopBtn').addEventListener('click', () => {
    if (mediaRecorder) {
        mediaRecorder.stop();
    }
    document.getElementById('recordBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
});

document.getElementById('copyBtn').addEventListener('click', () => {
    const transcriptionResult = document.getElementById('transcriptionResult').value;
    navigator.clipboard.writeText(transcriptionResult)
        .then(() => {
            alert('Text copied to clipboard');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
});