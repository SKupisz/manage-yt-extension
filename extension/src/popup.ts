let videoAddress:string|null = null;

document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({action: 'getVideoAddress'}, (response) => {
        console.log(response);
        if(response.address) {
            videoAddress = response.address;
        }
    });
    chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
        console.log('here');
        if(message.action === 'videoAddressGotten'){
            videoAddress = message.address;
        }
        sendResponse({});
    });
});

document.getElementById('downloadButton')?.addEventListener('click', () => {
    console.log(videoAddress);
    const triggerDownloading = async() => {
        try {
            const result = await fetch('http://localhost:8000/download/'+videoAddress, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });
            const json = await result.json();
            console.log(json);
        } catch(error) {
            console.log('error: ', error);
        }
    }
    if(videoAddress !== null){
        triggerDownloading();
    }
});