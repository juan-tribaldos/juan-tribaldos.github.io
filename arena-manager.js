async function fetchArenaItems() {
    try {
        const requests = ARENA_CONFIG.channels.map(slug => 
            fetch(`https://api.are.na/v2/channels/${slug}/contents?per=100`).then(res => res.json())
        );
        const results = await Promise.all(requests);
        return results.flatMap(data => data.contents || []).map(item => ({
            Title: item.title || 'Untitled',
            Type: item.class,
            Date: item.created_at ? new Date(item.created_at).toLocaleDateString('es-ES') : '-',
            RawDate: item.created_at,
            Class: item.base_class,
            Link: item.source ? item.source.url : (item.attachment ? item.attachment.url : `https://www.are.na/block/${item.id}`)
        }));
    } catch (e) {
        console.error("Error Are.na:", e);
        return [];
    }
}

function filterData(term) {
    const t = term.toLowerCase();
    return currentData.filter(i => 
        (i.Title && i.Title.toLowerCase().includes(t)) || 
        (i.Type && i.Type.toLowerCase().includes(t))
    );
}

function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}