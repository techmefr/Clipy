document.addEventListener('DOMContentLoaded', function() {
    const mainSection = document.getElementById('main-section');
    const configSection = document.getElementById('config-section');
    
    loadConfig();
    
    document.getElementById('copy-btn').addEventListener('click', copyToDiscord);
    document.getElementById('config-btn').addEventListener('click', showConfig);
    document.getElementById('save-btn').addEventListener('click', saveConfig);
    document.getElementById('back-btn').addEventListener('click', showMain);
    
    async function copyToDiscord() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            const response = await chrome.tabs.sendMessage(tab.id, { action: 'getData' });
            
            if (!response) {
                showMessage('Erreur : impossible de récupérer les données de la page', 'error');
                return;
            }
            
            const config = await chrome.storage.sync.get(['removeWords', 'addWords', 'discordUrl']);
            
            let filteredTitle = filterTitle(response.title, config.removeWords || '');
            
            const addWords = (config.addWords || '').split(',').map(w => w.trim()).filter(w => w);
            
            const message = [
                filteredTitle,
                response.url,
                ...addWords
            ].join('\n');
            
            await navigator.clipboard.writeText(message);
            
            if (config.discordUrl) {
                chrome.tabs.create({ url: config.discordUrl });
            }
            
            showMessage('Message copié ! 📋', 'success');
            
        } catch (error) {
            console.error('Erreur:', error);
            showMessage('Erreur lors de la copie', 'error');
        }
    }
    
    function filterTitle(title, removeWords) {
        if (!removeWords) return title;
        
        const wordsToRemove = removeWords.split(',').map(w => w.trim()).filter(w => w);
        let filtered = title;
        
        wordsToRemove.forEach(word => {
            const regex = new RegExp(escapeRegex(word), 'gi');
            filtered = filtered.replace(regex, '');
        });
        
        return filtered.replace(/\s+/g, ' ').trim();
    }
    
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    function showConfig() {
        mainSection.style.display = 'none';
        configSection.style.display = 'block';
    }
    
    function showMain() {
        configSection.style.display = 'none';
        mainSection.style.display = 'block';
    }
    
    async function loadConfig() {
        const config = await chrome.storage.sync.get(['removeWords', 'addWords', 'discordUrl']);
        
        document.getElementById('remove-words').value = config.removeWords || '';
        document.getElementById('add-words').value = config.addWords || '';
        document.getElementById('discord-url').value = config.discordUrl || '';
    }
    
    async function saveConfig() {
        const removeWords = document.getElementById('remove-words').value;
        const addWords = document.getElementById('add-words').value;
        const discordUrl = document.getElementById('discord-url').value;
        
        await chrome.storage.sync.set({
            removeWords,
            addWords,
            discordUrl
        });
        
        showMessage('Configuration sauvegardée !', 'success');
        setTimeout(showMain, 1500);
    }
    
    function showMessage(text, type) {
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = `message ${type === 'success' ? 'success' : 'error'}`;
        message.textContent = text;
        
        if (type === 'error') {
            message.style.background = '#dc3545';
        }
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 3000);
    }
});