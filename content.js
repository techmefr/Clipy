chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getData') {
        try {
            const titleElement = document.querySelector('h1');
            const title = titleElement ? titleElement.textContent.trim() : document.title;
            const url = window.location.href;
            
            sendResponse({
                title: title,
                url: url
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            sendResponse(null);
        }
    }
    
    return true;
});