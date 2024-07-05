document.addEventListener('DOMContentLoaded', () => {
    const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
    const apiKeyInput = document.getElementById('apiKey');
    const status = document.getElementById('status');

    if (saveApiKeyBtn && apiKeyInput && status) {
        saveApiKeyBtn.addEventListener('click', () => {
            const apiKey = apiKeyInput.value;
            chrome.storage.sync.set({ apiKey: apiKey }, () => {
                status.textContent = 'API Key saved';
                setTimeout(() => {
                    status.textContent = '';
                }, 2000);
            });
        });

        // Load saved API key when options page is opened
        chrome.storage.sync.get('apiKey', (data) => {
            if (data.apiKey) {
                apiKeyInput.value = data.apiKey;
            }
        });
    } else {
        console.error('One or more elements are missing from the options page.');
    }
});