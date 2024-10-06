let videoAddress:string|null = null;

document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({action: 'getVideoAddress'}, (response) => {
        if(response.address) {
            videoAddress = response.address;
            console.log('address loaded');
        }
    });
});

document.getElementById('downloadButton')?.addEventListener('click', () => {
    console.log(videoAddress);
});