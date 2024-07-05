function injectMicrophonePermissionIframe() {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("hidden", "hidden");
    iframe.setAttribute("id", "permissionsIFrame");
    iframe.setAttribute("allow", "microphone");
    iframe.src = chrome.runtime.getURL("permission/index.html");
    document.body.appendChild(iframe);
}

injectMicrophonePermissionIframe();

const mediaQueryList = window.matchMedia('(max-width: 600px)');

function handleMediaChange(event) {
    if (event.matches) {
        console.log('Media query matches');
    } else {
        console.log('Media query does not match');
    }
}

mediaQueryList.addEventListener('change', handleMediaChange);