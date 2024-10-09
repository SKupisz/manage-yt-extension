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

const triggerDownloading = async(onlyAudio: boolean) => {
    try {
        const result = await fetch('http://localhost:8000/download/'+videoAddress, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                videoType: videoType ?? '',
                onlyAudio,
            })
        });
        const json = await result.json();
        console.log(json);
    } catch(error) {
        console.log('error: ', error);
    }
}

const downloadingProcedure = (onlyAudio: boolean) => {
    if(videoAddress !== null){
        chrome.runtime.sendMessage({action: 'getVideoAddress'}, (response) => {
            if(response.address) {
                videoAddress = response.address;
                videoType = response.videoType;
            }
            triggerDownloading(onlyAudio);
        });
    } else {
        triggerDownloading(onlyAudio);
    }
};

document.getElementById('downloadButtonVideo')?.addEventListener('click', () => {
    downloadingProcedure(false);
});

document.getElementById('downloadbuttonAudio')?.addEventListener('click', () => {
    downloadingProcedure(true);
});