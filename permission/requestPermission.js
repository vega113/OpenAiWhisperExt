export async function getUserPermission() {
    return new Promise((resolve, reject) => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                console.log("Microphone access granted");
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
                resolve();
            })
            .catch((error) => {
                console.error("Error requesting microphone permission", error);
                reject(error);
            });
    });
}

getUserPermission();