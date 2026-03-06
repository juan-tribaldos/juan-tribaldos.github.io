// arena-manager.js

async function fetchArenaItems() {
    const url = `https://api.are.na/v2/channels/${ARENA_CONFIG.slug}/contents?per=100`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.contents.map(item => ({
            Title: item.title || 'Untitled',
            Type: item.class, // Image, Text, Link, etc.
            Date: new Date(item.created_at).toLocaleDateString('es-ES'),
            RawDate: item.created_at, // Útil para ordenar cronológicamente
            Class: item.base_class,
            Link: item.attachment ? item.attachment.url : (item.source ? item.source.url : '#'),
            Description: item.description || ''
        }));
    } catch (e) {
        console.error("Error Are.na:", e);
        return [];
    }
}

// Función de búsqueda inteligente
function filterData(term) {
    const t = term.toLowerCase();
    return currentData.filter(i => 
        i.Title.toLowerCase().includes(t) || 
        i.Type.toLowerCase().includes(t)
    );
}

// Retardo para que la búsqueda sea fluida (Debounce)
function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}