// AI-generated: localStorage cart for the shop. One entry per (product, size) pair.
// Every element with id "jt-cart-count" is kept in sync so the nav badge always matches.
const JTCart = (function () {
    const STORAGE_KEY = 'jt_shop_cart';

    function readItems() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw === null) {
                return [];
            }
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) {
                return [];
            }
            // Drop malformed entries so one bad write can never break the checkout page.
            return parsed.filter((item) =>
                item &&
                typeof item.productId === 'string' &&
                typeof item.sizeLabel === 'string' &&
                typeof item.unitPriceUsd === 'number' && item.unitPriceUsd > 0 &&
                typeof item.quantity === 'number' && item.quantity > 0
            );
        } catch (error) {
            return [];
        }
    }

    function writeItems(items) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        refreshBadge();
    }

    function findIndex(items, productId, sizeLabel) {
        for (let index = 0; index < items.length; index++) {
            if (items[index].productId === productId && items[index].sizeLabel === sizeLabel) {
                return index;
            }
        }
        return -1;
    }

    function addItem(product, sizeLabel, unitPriceUsd, quantity) {
        const items = readItems();
        const index = findIndex(items, product.id, sizeLabel);
        if (index >= 0) {
            items[index].quantity += quantity;
        } else {
            items.push({
                productId: product.id,
                title: product.title,
                sizeLabel: sizeLabel,
                unitPriceUsd: unitPriceUsd,
                quantity: quantity,
                imageUrl: product.thumbUrl
            });
        }
        writeItems(items);
    }

    // AI-generated: services are exclusive slots — quantity is always 1 and the same slot
    // cannot be added twice. The slot label doubles as the sizeLabel identity.
    function addServiceItem(service, bookingDate, bookingTime, slotLabel) {
        const items = readItems();
        const index = findIndex(items, service.id, slotLabel);
        if (index >= 0) {
            return false;
        }
        items.push({
            productId: service.id,
            title: service.title,
            sizeLabel: slotLabel,
            unitPriceUsd: service.priceUsd,
            quantity: 1,
            imageUrl: service.thumbUrl,
            type: 'service',
            bookingDate: bookingDate,
            bookingTime: bookingTime
        });
        writeItems(items);
        return true;
    }

    function setQuantity(productId, sizeLabel, quantity) {
        const items = readItems();
        const index = findIndex(items, productId, sizeLabel);
        if (index < 0) {
            return;
        }
        if (quantity <= 0) {
            items.splice(index, 1);
        } else {
            items[index].quantity = quantity;
        }
        writeItems(items);
    }

    function removeItem(productId, sizeLabel) {
        setQuantity(productId, sizeLabel, 0);
    }

    function clear() {
        writeItems([]);
    }

    function getItems() {
        return readItems();
    }

    function getCount() {
        let count = 0;
        const items = readItems();
        for (const item of items) {
            count += item.quantity;
        }
        return count;
    }

    function getTotal() {
        let total = 0;
        const items = readItems();
        for (const item of items) {
            total += item.unitPriceUsd * item.quantity;
        }
        return total;
    }

    function refreshBadge() {
        const count = getCount();
        document.querySelectorAll('#jt-cart-count').forEach((element) => {
            element.textContent = String(count);
        });
    }

    document.addEventListener('DOMContentLoaded', refreshBadge);

    return {
        addItem: addItem,
        addServiceItem: addServiceItem,
        setQuantity: setQuantity,
        removeItem: removeItem,
        clear: clear,
        getItems: getItems,
        getCount: getCount,
        getTotal: getTotal,
        refreshBadge: refreshBadge
    };
})();
