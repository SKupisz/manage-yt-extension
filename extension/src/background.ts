let currentVideoAddr:string|null = null;
let currentVideoType:string|null = null;

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension running');
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if(message.action === 'videoAddress'){
        currentVideoAddr = message.address;
        currentVideoType = message.videoType;
        chrome.runtime.sendMessage({action: 'videoAddressGotten', address: currentVideoAddr, videoType: currentVideoType});
        sendResponse({});
    }
    else if(message.action === 'getVideoAddress'){
        if(currentVideoAddr === null){
            chrome.runtime.sendMessage({action: 'extractVideoAddress'}, (response) => {
                if(response.address && response.videoType){
                    currentVideoAddr = response.address;
                    currentVideoType = response.videoType;
                }
            });
        }
        sendResponse({address: currentVideoAddr, videoType: currentVideoType});
    } else {
        sendResponse({});
    }
});