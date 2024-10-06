let currentVideoAddr:string|null = null;

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension running');
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    console.log(message);
    if(message.action === 'videoAddress'){
        currentVideoAddr = message.address;
        console.log(message.address);
        sendResponse({});
    }
    else if(message.action === 'getVideoAddress'){
        sendResponse({address: currentVideoAddr});
    } else {
        sendResponse({});
    }
});