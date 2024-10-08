let videoAddress:string|null = null;
let videoType:string|null = null;

document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({action: 'getVideoAddress'}, (response) => {
        if(response.address) {
            videoAddress = response.address;
            videoType = response.videoType;
        }
    });
    chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
        if(message.action === 'videoAddressGotten'){
            videoAddress = message.address;
            videoType = message.videoType;
        }
        sendResponse({});
    });
});

document.getElementById('downloadButton')?.addEventListener('click', () => {
    const triggerDownloading = async() => {
        try {
            const result = await fetch('http://localhost:8000/download/'+videoAddress, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    videoType: videoType ?? '',
                })
            });
            const json = await result.json();
            console.log(json);
        } catch(error) {
            console.log('error: ', error);
        }
    }
    if(videoAddress !== null){
        chrome.runtime.sendMessage({action: 'getVideoAddress'}, (response) => {
            if(response.address) {
                videoAddress = response.address;
                videoType = response.videoType;
            }
            triggerDownloading();
        });
    } else {
        triggerDownloading();
    }
});