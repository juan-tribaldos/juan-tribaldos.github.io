// AI-generated: checkout page logic — renders the cart, validates the buyer form, and starts
// the payment by POSTing to the backend, which answers with the Tilopay redirect URL.
(function () {
    // AI-generated: local pages talk to the local backend, the live site talks to prod —
    // a localhost session can never create real orders by accident.
    const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:8080'
        : 'https://api.juantribaldos.com';

    function formatUsd(value) {
        // Rounds away float artifacts (e.g. 3 × 120.99) before display.
        return `$${Math.round(value * 100) / 100} USD`;
    }

    // Escapes cart text before it lands in markup or data-* attributes — titles and size
    // labels originate in Are.na and can contain quotes.
    function escapeHtml(value) {
        return String(value)
            .split('&').join('&amp;')
            .split('<').join('&lt;')
            .split('>').join('&gt;')
            .split('"').join('&quot;');
    }

    function renderCart() {
        const container = document.getElementById('cart-contents');
        const form = document.getElementById('checkout-form');
        const items = JTCart.getItems();

        if (items.length === 0) {
            container.innerHTML =
                '<div class="empty-cart">' + t('checkout.emptyCart') + '</div>';
            form.style.display = 'none';
            return;
        }

        let rows = '';
        for (const item of items) {
            const safeProduct = escapeHtml(item.productId);
            const safeSize = escapeHtml(item.sizeLabel);
            const isService = item.type === 'service';
            // Services are exclusive slots: fixed quantity of one, no steppers.
            const quantityCell = isService
                ? `<div class="quantity-value quantity-fixed">1</div>`
                : `<div class="quantity-row">
                            <button type="button" class="quantity-button" data-action="minus"
                                data-product="${safeProduct}" data-size="${safeSize}">−</button>
                            <div class="quantity-value">${item.quantity}</div>
                            <button type="button" class="quantity-button" data-action="plus"
                                data-product="${safeProduct}" data-size="${safeSize}">+</button>
                        </div>`;
            const detailLabel = isService ? t('checkout.bookingLabel', { slot: safeSize }) : safeSize;
            rows += `
                <tr>
                    <td><img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.title)}"></td>
                    <td>${escapeHtml(item.title)}</td>
                    <td>${detailLabel}</td>
                    <td>${quantityCell}</td>
                    <td>${formatUsd(item.unitPriceUsd * item.quantity)}</td>
                    <td>
                        <button type="button" class="cart-remove" title="${t('checkout.remove')}" data-action="remove"
                            data-product="${safeProduct}" data-size="${safeSize}">×</button>
                    </td>
                </tr>`;
        }

        container.innerHTML = `
            <table class="cart-table">
                <thead>
                    <tr>
                        <th></th><th>Print</th><th>${t('common.size')}</th><th>${t('common.quantity')}</th><th>${t('common.price')}</th><th></th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
            <div class="cart-total-row">Total: ${formatUsd(JTCart.getTotal())}</div>`;

        container.querySelectorAll('button[data-action]').forEach((button) => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-product');
                const sizeLabel = button.getAttribute('data-size');
                const action = button.getAttribute('data-action');
                const items = JTCart.getItems();
                const current = items.find((item) =>
                    item.productId === productId && item.sizeLabel === sizeLabel);
                if (!current) {
                    return;
                }
                if (action === 'minus') {
                    JTCart.setQuantity(productId, sizeLabel, current.quantity - 1);
                } else if (action === 'plus') {
                    JTCart.setQuantity(productId, sizeLabel, current.quantity + 1);
                } else if (action === 'remove') {
                    JTCart.removeItem(productId, sizeLabel);
                }
                renderCart();
            });
        });

        form.style.display = '';

        // AI-generated: the session-details box only applies to bookings — show it when the
        // cart contains a service, hide it again if the buyer removes the service.
        const sessionField = document.getElementById('session-details-field');
        sessionField.style.display = cartHasService() ? '' : 'none';
    }

    function cartHasService() {
        return JTCart.getItems().some((item) => item.type === 'service');
    }

    function validateForm() {
        const name = document.getElementById('buyer-name').value.trim();
        const email = document.getElementById('buyer-email').value.trim();
        const phone = document.getElementById('buyer-phone').value.trim();
        const address = document.getElementById('delivery-address').value.trim();
        const sessionDetails = document.getElementById('session-details').value.trim();

        if (name === '' || email === '' || phone === '' || address === '') {
            return t('checkout.fillAllFields');
        }
        if (email.indexOf('@') < 1 || email.indexOf('.') < 0) {
            return t('common.emailInvalid');
        }
        if (cartHasService() && sessionDetails === '') {
            return t('checkout.sessionDetailsRequired');
        }
        return '';
    }

    async function submitCheckout(event) {
        event.preventDefault();

        const errorBox = document.getElementById('form-error');
        const payButton = document.getElementById('pay-button');
        errorBox.textContent = '';

        const validationError = validateForm();
        if (validationError !== '') {
            errorBox.textContent = validationError;
            return;
        }

        const items = JTCart.getItems();
        if (items.length === 0) {
            renderCart();
            return;
        }

        const payload = {
            buyerName: document.getElementById('buyer-name').value.trim(),
            buyerEmail: document.getElementById('buyer-email').value.trim(),
            buyerPhone: document.getElementById('buyer-phone').value.trim(),
            deliveryAddress: document.getElementById('delivery-address').value.trim(),
            // Sent empty for prints-only carts even if the hidden box kept leftover text.
            sessionDetails: cartHasService() ? document.getElementById('session-details').value.trim() : '',
            items: items.map((item) => ({
                arenaBlockId: item.productId,
                title: item.title,
                size: item.sizeLabel,
                quantity: item.quantity,
                type: item.type || 'print',
                bookingDate: item.bookingDate || '',
                bookingTime: item.bookingTime || ''
            }))
        };

        utrack('checkout_started', { itemCount: JTCart.getCount(), total: JTCart.getTotal() });

        payButton.disabled = true;
        payButton.textContent = t('common.processing');

        try {
            const response = await fetch(`${API_BASE}/api/checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                // The backend answers 400 with a buyer-safe errorMessage (stale cart, slot
                // taken, etc.) — surface it instead of the generic connectivity message.
                let backendMessage = '';
                try {
                    const failure = await response.json();
                    backendMessage = failure.errorMessage || '';
                } catch (parseError) {
                    backendMessage = '';
                }
                if (backendMessage !== '') {
                    payButton.disabled = false;
                    payButton.textContent = t('common.pay');
                    errorBox.textContent = backendMessage;
                    return;
                }
                throw new Error(`Checkout failed: ${response.status}`);
            }
            const result = await response.json();
            window.location.href = result.redirectUrl;
        } catch (error) {
            payButton.disabled = false;
            payButton.textContent = t('common.pay');
            errorBox.textContent = t('checkout.paymentStartError');
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('failed') === '1') {
            document.getElementById('payment-failed').style.display = '';
        }
        renderCart();
        document.getElementById('checkout-form').addEventListener('submit', submitCheckout);
    });
})();
