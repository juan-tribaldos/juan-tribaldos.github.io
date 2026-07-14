// AI-generated: catalog source for the shop, reading the shop-exclusive Are.na channel via
// the v3 API (https://www.are.na/developers/explore). Product metadata is parsed out of each
// block's description.
//
// Description convention (see docs/convencion-catalogo-arena.md):
//   <free-form story text shown on the product page>
//
//   sizes: 30 × 20 cm = 80, 45 × 30 cm = 120
//   price: 80              (optional flat price if a size has no "= price")
//   edition: abierta       (informational, shown on the product page)
//
// Blocks without any usable size/price are not shown in the shop.

// AI-generated: tiny sessionStorage cache shared by the prints and services catalogs, so
// grid -> product -> back navigation doesn't re-download the channel on every page. Prices
// can therefore lag up to five minutes behind Are.na — the same window documented for Juan
// in docs/convencion-catalogo-arena.md and used by the backend's own catalog cache.
const JTShopCache = (function () {
    const CACHE_TTL_MS = 5 * 60 * 1000;

    function read(key) {
        try {
            const raw = sessionStorage.getItem(key);
            if (raw === null) {
                return null;
            }
            const entry = JSON.parse(raw);
            if (typeof entry.savedAt !== 'number' || (Date.now() - entry.savedAt) > CACHE_TTL_MS) {
                return null;
            }
            return entry.value;
        } catch (error) {
            // Corrupt entry or storage unavailable — treat as a cache miss.
            return null;
        }
    }

    function write(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), value: value }));
        } catch (error) {
            // Private mode / quota exceeded — the cache is best-effort, fetching still works.
        }
    }

    return { read: read, write: write };
})();

const JTCatalog = (function () {
    // MOCK_MODE serves js/catalog.mock.json (same v3 shape) for offline development.
    const MOCK_MODE = false;
    const CHANNEL_SLUG = 'print-shop-twos0uqpmik';
    const API_BASE = 'https://api.are.na/v3';
    const MOCK_URL = 'js/catalog.mock.json';
    const CACHE_KEY = MOCK_MODE ? 'jt-prints-mock' : `jt-prints-${CHANNEL_SLUG}`;
    // Safety cap for the pagination loop: 10 pages x 100 blocks is far beyond the catalog.
    const MAX_PAGES = 10;

    // AI-generated: follows v3 pagination (meta.has_more_pages) so the shop keeps showing
    // every print after the channel grows past 100 blocks.
    async function fetchBlocks() {
        if (MOCK_MODE) {
            const response = await fetch(MOCK_URL);
            if (!response.ok) {
                throw new Error(`Catalog request failed: ${response.status}`);
            }
            const payload = await response.json();
            return payload.data || [];
        }
        const blocks = [];
        let page = 1;
        let hasMore = true;
        while (hasMore && page <= MAX_PAGES) {
            const response = await fetch(`${API_BASE}/channels/${CHANNEL_SLUG}/contents?per=100&page=${page}`);
            if (!response.ok) {
                throw new Error(`Catalog request failed: ${response.status}`);
            }
            const payload = await response.json();
            for (const block of (payload.data || [])) {
                blocks.push(block);
            }
            hasMore = payload.meta ? payload.meta.has_more_pages === true : false;
            page = page + 1;
        }
        return blocks;
    }

    // "30 × 20 cm = 80, 45 × 30 cm = 120" -> [{ label, priceUsd }]
    function parseSizes(rawValue) {
        const sizes = [];
        const entries = rawValue.split(',');
        for (const entry of entries) {
            const parts = entry.split('=');
            const label = parts[0].trim();
            if (label === '') {
                continue;
            }
            let priceUsd = NaN;
            if (parts.length > 1) {
                priceUsd = parseFloat(parts[1].replace('$', '').trim());
            }
            sizes.push({ label: label, priceUsd: priceUsd });
        }
        return sizes;
    }

    function parseProduct(block) {
        // v3 returns description as an object { markdown, html, plain } — not a string like v2.
        let description = '';
        if (block.description) {
            description = block.description.plain || block.description.markdown || '';
        }
        const lines = description.split('\n');
        const storyLines = [];
        let sizes = [];
        let flatPrice = NaN;
        let edition = '';

        for (const line of lines) {
            const trimmed = line.trim();
            const lower = trimmed.toLowerCase();
            if (lower.indexOf('sizes:') === 0) {
                sizes = parseSizes(trimmed.slice('sizes:'.length));
                continue;
            }
            if (lower.indexOf('price:') === 0) {
                flatPrice = parseFloat(trimmed.slice('price:'.length).replace('$', '').trim());
                continue;
            }
            if (lower.indexOf('edition:') === 0) {
                edition = trimmed.slice('edition:'.length).trim();
                continue;
            }
            storyLines.push(line);
        }

        // Sizes listed without their own price fall back to the flat price.
        for (const size of sizes) {
            if (isNaN(size.priceUsd)) {
                size.priceUsd = flatPrice;
            }
        }
        sizes = sizes.filter((size) => !isNaN(size.priceUsd) && size.priceUsd > 0);
        if (sizes.length === 0 && !isNaN(flatPrice) && flatPrice > 0) {
            sizes = [{ label: 'Único', priceUsd: flatPrice }];
        }

        const prices = sizes.map((size) => size.priceUsd);
        const image = block.image || {};
        // AI-generated: grid thumbs use the ~400px "small" variant (~11 KB measured vs
        // ~155 KB for "large"); src_2x keeps retina screens sharp. The product page keeps
        // using "large" via displayUrl. Fallback chain avoids ever pulling the multi-MB
        // original into the grid unless nothing else exists.
        const smallVariant = image.small || {};
        const mediumVariant = image.medium || {};
        const largeVariant = image.large || {};
        return {
            id: String(block.id),
            title: block.title || 'Sin título',
            story: storyLines.join('\n').trim(),
            edition: edition,
            sizes: sizes,
            fromPriceUsd: prices.length > 0 ? Math.min.apply(null, prices) : NaN,
            thumbUrl: smallVariant.src || mediumVariant.src || largeVariant.src || image.src || '',
            thumbUrl2x: smallVariant.src_2x || '',
            thumbWidth: smallVariant.width || 0,
            thumbHeight: smallVariant.height || 0,
            displayUrl: largeVariant.src ? largeVariant.src : (image.src || ''),
            originalUrl: image.src || ''
        };
    }

    async function fetchCatalog() {
        // AI-generated: serve from the short-lived session cache when possible, so the
        // product page and back-navigation don't re-download the whole channel.
        const cached = JTShopCache.read(CACHE_KEY);
        if (cached !== null) {
            return cached;
        }
        const blocks = await fetchBlocks();
        const products = blocks
            .filter((block) => block.type === 'Image')
            .map(parseProduct)
            .filter((product) => product.sizes.length > 0 && product.displayUrl !== '');
        JTShopCache.write(CACHE_KEY, products);
        return products;
    }

    async function fetchProduct(productId) {
        const catalog = await fetchCatalog();
        return catalog.find((product) => product.id === String(productId)) || null;
    }

    return { fetchCatalog: fetchCatalog, fetchProduct: fetchProduct };
})();

// AI-generated: services (bookings) catalog — same v3 fetch pattern as prints, its own channel.
// Description convention (see docs/convencion-catalogo-arena.md):
//   price: 250 / area: ... / dates: 2026-08-01 a 2026-08-31 / times: 09:00, 13:00 / duration: 4h
// Blocks missing a valid price, dates, times, or duration are not shown (fail closed).
const JTServiceCatalog = (function () {
    // MOCK_MODE serves js/services.mock.json (offline fallback; real channel wired 2026-07-09).
    const MOCK_MODE = false;
    const SERVICES_CHANNEL_SLUG = 'photography-services';
    const API_BASE = 'https://api.are.na/v3';
    const MOCK_URL = 'js/services.mock.json';
    const CACHE_KEY = MOCK_MODE ? 'jt-services-mock' : `jt-services-${SERVICES_CHANNEL_SLUG}`;
    // Safety cap for the pagination loop — same rationale as the prints catalog.
    const MAX_PAGES = 10;

    // AI-generated: paginated like the prints catalog (v3 meta.has_more_pages).
    async function fetchBlocks() {
        if (MOCK_MODE) {
            const response = await fetch(MOCK_URL);
            if (!response.ok) {
                throw new Error(`Services request failed: ${response.status}`);
            }
            const payload = await response.json();
            return payload.data || [];
        }
        const blocks = [];
        let page = 1;
        let hasMore = true;
        while (hasMore && page <= MAX_PAGES) {
            const response = await fetch(`${API_BASE}/channels/${SERVICES_CHANNEL_SLUG}/contents?per=100&page=${page}`);
            if (!response.ok) {
                throw new Error(`Services request failed: ${response.status}`);
            }
            const payload = await response.json();
            for (const block of (payload.data || [])) {
                blocks.push(block);
            }
            hasMore = payload.meta ? payload.meta.has_more_pages === true : false;
            page = page + 1;
        }
        return blocks;
    }

    // Split-based validation, no regex — same style as the prints parser above.
    function isDigits(value) {
        if (value.length === 0) {
            return false;
        }
        for (const character of value) {
            if (character < '0' || character > '9') {
                return false;
            }
        }
        return true;
    }

    function isIsoDate(value) {
        const parts = value.split('-');
        return parts.length === 3 &&
            parts[0].length === 4 && parts[1].length === 2 && parts[2].length === 2 &&
            isDigits(parts[0]) && isDigits(parts[1]) && isDigits(parts[2]);
    }

    function isTimeLabel(value) {
        const parts = value.split(':');
        return parts.length === 2 &&
            parts[0].length === 2 && parts[1].length === 2 &&
            isDigits(parts[0]) && isDigits(parts[1]);
    }

    function parseDates(rawValue, service) {
        const parts = rawValue.split(' a ');
        if (parts.length !== 2) {
            return false;
        }
        const start = parts[0].trim();
        const end = parts[1].trim();
        if (!isIsoDate(start) || !isIsoDate(end)) {
            return false;
        }
        if (end < start) {
            return false;
        }
        service.dateStart = start;
        service.dateEnd = end;
        return true;
    }

    function parseTimes(rawValue) {
        const times = [];
        const entries = rawValue.split(',');
        for (const entry of entries) {
            const candidate = entry.trim();
            if (isTimeLabel(candidate) && !times.includes(candidate)) {
                times.push(candidate);
            }
        }
        times.sort();
        return times;
    }

    function parseDuration(rawValue) {
        let cleaned = rawValue.trim();
        if (cleaned.toLowerCase().endsWith('h')) {
            cleaned = cleaned.slice(0, -1).trim();
        }
        const parsed = parseFloat(cleaned);
        return isNaN(parsed) ? 0 : parsed;
    }

    function parseService(block) {
        let description = '';
        if (block.description) {
            description = block.description.plain || block.description.markdown || '';
        }

        const image = block.image || {};
        // AI-generated: same grid-thumb variant strategy as the prints parser.
        const smallVariant = image.small || {};
        const mediumVariant = image.medium || {};
        const largeVariant = image.large || {};
        const service = {
            id: String(block.id),
            title: block.title || 'Sin título',
            story: '',
            priceUsd: 0,
            area: '',
            dateStart: '',
            dateEnd: '',
            startTimes: [],
            durationHours: 0,
            thumbUrl: smallVariant.src || mediumVariant.src || largeVariant.src || image.src || '',
            thumbUrl2x: smallVariant.src_2x || '',
            thumbWidth: smallVariant.width || 0,
            thumbHeight: smallVariant.height || 0,
            displayUrl: largeVariant.src ? largeVariant.src : (image.src || '')
        };

        const storyLines = [];
        let hasDates = false;
        const lines = description.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            const lower = trimmed.toLowerCase();
            if (lower.indexOf('price:') === 0) {
                service.priceUsd = parseFloat(trimmed.slice('price:'.length).replace('$', '').trim());
                continue;
            }
            if (lower.indexOf('area:') === 0) {
                service.area = trimmed.slice('area:'.length).trim();
                continue;
            }
            if (lower.indexOf('dates:') === 0) {
                hasDates = parseDates(trimmed.slice('dates:'.length), service);
                continue;
            }
            if (lower.indexOf('times:') === 0) {
                service.startTimes = parseTimes(trimmed.slice('times:'.length));
                continue;
            }
            if (lower.indexOf('duration:') === 0) {
                service.durationHours = parseDuration(trimmed.slice('duration:'.length));
                continue;
            }
            storyLines.push(line);
        }

        service.story = storyLines.join('\n').trim();

        // Fail closed: every field of the availability contract must be valid.
        if (isNaN(service.priceUsd) || service.priceUsd <= 0 ||
            !hasDates || service.startTimes.length === 0 ||
            service.durationHours <= 0 || service.durationHours > 24 ||
            service.displayUrl === '') {
            return null;
        }

        return service;
    }

    async function fetchServices() {
        // AI-generated: same short-lived session cache strategy as the prints catalog.
        // Availability is NOT cached — service.html always asks the backend live.
        const cached = JTShopCache.read(CACHE_KEY);
        if (cached !== null) {
            return cached;
        }
        const blocks = await fetchBlocks();
        const services = [];
        for (const block of blocks) {
            if (block.type !== 'Image') {
                continue;
            }
            const service = parseService(block);
            if (service !== null) {
                services.push(service);
            }
        }
        JTShopCache.write(CACHE_KEY, services);
        return services;
    }

    async function fetchService(serviceId) {
        const services = await fetchServices();
        return services.find((service) => service.id === String(serviceId)) || null;
    }

    return { fetchServices: fetchServices, fetchService: fetchService };
})();
