const extractVideoId = ():string|null => {
    if(window.location.hostname !== 'www.youtube.com') return null;
    
    if(window.location.pathname === '/watch'){
        const query = window.location.search;
        const queryContent = query.split('&');
        if(queryContent.length >= 1){
            const videoAddress = queryContent[0].substring(3); // truncating ?v=
            return videoAddress;
        } else return null;
    }
    else if(window.location.pathname.includes('/shorts')) {
        const videoId = window.location.pathname.split('/shorts/')[1];
        return videoId;
    }
    
    return null;
}

const getVideoType = ():string => window.location.pathname === '/watch' ? 'video' : 'short';

let videoId = extractVideoId();
let watchedVideoType = getVideoType();
if(videoId !== null){
    chrome.runtime.sendMessage({action: 'videoAddress', address: videoId, videoType: watchedVideoType});
}

document.addEventListener('DOMContentLoaded', () => {
    videoId = extractVideoId();
    watchedVideoType = getVideoType();
    if(videoId !== null){
        chrome.runtime.sendMessage({action: 'videoAddress', address: videoId, videoType: watchedVideoType});
    }
})

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if(message.action === 'extractVideoAddress'){
        const videoId = extractVideoId();
        sendResponse({address: videoId, videoType: watchedVideoType});
    }
});