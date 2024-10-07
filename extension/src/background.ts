let currentVideoAddr:string|null = null;

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension running');
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if(message.action === 'videoAddress'){
        currentVideoAddr = message.address;
        console.log(message.address);
        chrome.runtime.sendMessage({action: 'videoAddressGotten', address: currentVideoAddr})
        sendResponse({});
    }
    else if(message.action === 'getVideoAddress'){
        sendResponse({address: currentVideoAddr});
    } else {
        sendResponse({});
    }
});