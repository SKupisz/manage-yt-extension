if(window.location.hostname === 'www.youtube.com' && window.location.pathname === '/watch'){
    const query = window.location.search;
    const queryContent = query.split('&');
    if(queryContent.length >= 1){
        const videoAddress = queryContent[0].substring(3); // truncating ?v=
        console.log(videoAddress);
        chrome.runtime.sendMessage({action: 'videoAddress', address: videoAddress});
    }
}