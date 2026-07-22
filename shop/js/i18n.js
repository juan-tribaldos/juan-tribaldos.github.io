// AI-generated: vanilla i18n for the customer-facing shop (Layer 1 — interface only).
// Spanish is the authored source language (voseo, matching the site); English mirrors it
// key by key. Resolution order: explicit choice saved in localStorage wins, otherwise the
// browser language decides (es* -> Spanish, anything else -> English).
//
// Static markup opts in with data-i18n (textContent), data-i18n-html (innerHTML, for the
// few strings that carry a link) and data-i18n-placeholder. Scripts call t(key, params);
// {name} placeholders are replaced via split/join (no regex, per the project standards).
// Switching language persists the choice and reloads the page, so every dynamic renderer
// (grid, product, cart, quote) re-runs in the new language — no half-translated states.
const JTI18n = (function () {
    const STORAGE_KEY = 'jt_shop_lang';

    const DICTIONARY = {
        es: {
            // Shared interface
            'common.services': 'Servicios',
            'common.cart': 'Carrito',
            'common.terms': 'Términos y Condiciones',
            'common.backToShop': 'Volver a la tienda',
            'common.backToShopArrow': '← Volver a la tienda',
            'common.size': 'Tamaño',
            'common.quantity': 'Cantidad',
            'common.price': 'Precio',
            'common.fullName': 'Nombre completo',
            'common.phone': 'Teléfono',
            'common.deliveryAddress': 'Dirección de entrega',
            'common.emailInvalid': 'El email no parece válido.',
            'common.processing': 'Procesando…',
            'common.pay': 'Pagar',
            'common.tilopayNote': 'El pago se procesa de forma segura con Tilopay (tarjetas, SINPE Móvil).',
            // Browse page
            'index.printsLabel': 'Prints — impresión fine art, entrega coordinada personalmente',
            'index.servicesLabel': 'Servicios — sesiones fotográficas con reserva de fecha y hora',
            'index.loading': 'Cargando…',
            'index.noPrints': 'No hay prints disponibles por el momento.',
            'index.noServices': 'No hay servicios disponibles por el momento.',
            'index.catalogError': 'No se pudo cargar el catálogo. Intentá de nuevo más tarde.',
            'index.servicesError': 'No se pudo cargar los servicios. Intentá de nuevo más tarde.',
            'index.fromPrice': 'desde ${price} USD',
            // Product page
            'product.chooseSize': 'Elegí un tamaño',
            'product.addToCart': 'Agregar al carrito',
            'product.deliveryNote': 'Impreso a pedido. Juan coordina la entrega personalmente después de la compra.',
            'product.customToggle': '¿Querés una versión personalizada de este print?',
            'product.customTell': 'Contanos qué tenés en mente',
            'product.customPlaceholder': 'Papel, tamaño, acabado, marco… todo lo que quieras personalizar.',
            'product.sendRequest': 'Enviar solicitud',
            'product.customNote': 'Sin pago por adelantado: Juan revisa tu solicitud y te envía una cotización por email con un link de pago.',
            'product.notFound': 'Print no encontrado. <a href="index.html">Volver a la tienda</a>.',
            'product.loadError': 'No se pudo cargar el print. Intentá de nuevo más tarde.',
            'product.edition': 'Edición: {edition}',
            'product.editionSoldOut': 'Edición de {size} — agotada',
            'product.editionRemaining': 'Edición de {size} — quedan {remaining}',
            'product.soldOut': 'Agotado',
            'product.added': 'Agregado al carrito. <a href="checkout.html">Finalizar compra</a> o seguí mirando.',
            'product.fillAllFields': 'Completá todos los campos para enviar la solicitud.',
            'product.invalidQuantity': 'La cantidad no es válida.',
            'product.sending': 'Enviando…',
            'product.requestFailed': 'No se pudo enviar la solicitud. Intentá de nuevo.',
            'product.requestNetworkError': 'No se pudo enviar la solicitud. Verificá tu conexión.',
            'product.requestReceived': '¡Listo! Recibimos tu solicitud. Juan te va a escribir por email con una cotización.',
            // Service page
            'service.pageTitle': 'Juan Tribaldos — Servicio',
            'service.date': 'Fecha',
            'service.time': 'Hora',
            'service.chooseDate': 'Elegí una fecha',
            'service.chooseTime': 'Elegí una hora',
            'service.book': 'Reservar',
            'service.bookingNote': 'La fecha y hora quedan reservadas al completar el pago. Juan se pondrá en contacto para coordinar los detalles de la sesión.',
            'service.notFound': 'Servicio no encontrado. <a href="index.html">Volver a la tienda</a>.',
            'service.loadError': 'No se pudo cargar el servicio. Intentá de nuevo más tarde.',
            'service.slotUnavailable': '{time} — no disponible',
            'service.dateFull': '{date} — completo',
            'service.area': 'Zona: {area}',
            'service.duration': 'Duración: {hours}h',
            'service.price': 'Precio: ${price} USD',
            'service.alreadyInCart': 'Esa reserva ya está en tu carrito.',
            'service.added': 'Reserva agregada al carrito. <a href="checkout.html">Finalizar compra</a> — el horario queda tomado al pagar.',
            // Checkout page
            'checkout.pageTitle': 'Juan Tribaldos — Carrito',
            'checkout.paymentFailed': 'El pago no se completó. Podés intentarlo de nuevo.',
            'checkout.deliveryDetails': 'Datos de entrega',
            'checkout.sessionDetails': 'Detalles de la sesión',
            'checkout.sessionPlaceholder': 'Contanos un poco sobre tu proyecto. Describí el espacio, la ubicación o el tipo de fotografías que buscás. Esta información nos ayuda a preparar mejor tu sesión.',
            'checkout.termsNote': 'Al pagar aceptás los <a href="terminos.html">Términos y Condiciones</a>.',
            'checkout.emptyCart': 'Tu carrito está vacío. <a href="index.html">Ver prints</a>.',
            'checkout.bookingLabel': 'Reserva: {slot}',
            'checkout.remove': 'Quitar',
            'checkout.fillAllFields': 'Completá todos los campos para continuar.',
            'checkout.sessionDetailsRequired': 'Contanos los detalles de la sesión para que Juan llegue preparado.',
            'checkout.paymentStartError': 'No se pudo iniciar el pago. Verificá tu conexión e intentá de nuevo.',
            // Custom order quote page
            'custom.pageTitle': 'Juan Tribaldos — Cotización',
            'custom.yourQuote': 'Tu cotización',
            'custom.termsNote': 'Al pagar aceptás los <a href="terminos.html">Términos y Condiciones</a> y confirmás tu reserva.',
            'custom.notFound': 'No encontramos esa cotización. <a href="index.html">Volver a la tienda</a>.',
            'custom.noteFromJuan': 'Nota de Juan: {note}',
            'custom.validUntil': 'Válida hasta el {date}.',
            'custom.alreadyPaid': 'Esta cotización ya fue pagada. ¡Gracias por tu compra!',
            'custom.expired': 'Esta cotización venció. Escribile a Juan por WhatsApp si querés retomarla.',
            'custom.pending': 'Juan todavía está preparando tu cotización. Te va a llegar un email cuando esté lista.',
            'custom.unavailable': 'Esta cotización ya no está disponible. <a href="index.html">Volver a la tienda</a>.',
            'custom.loadError': 'No se pudo cargar la cotización. Intentá de nuevo más tarde.',
            'custom.paymentError': 'No se pudo iniciar el pago. Intentá de nuevo.',
            'custom.paymentNetworkError': 'No se pudo iniciar el pago. Verificá tu conexión.',
            // Thank-you page
            'thanks.pageTitle': 'Juan Tribaldos — Gracias',
            'thanks.confirmed': 'Compra confirmada',
            'thanks.order': 'Pedido {order}',
            'thanks.message': '¡Gracias! Tu pedido está confirmado y ya le llegó el aviso a Juan. En breve vas a recibir un email con el detalle de tu compra, y Juan se pondrá en contacto para coordinar la entrega.',
            // Terms page
            'terms.pageTitle': 'Juan Tribaldos — Términos y Condiciones',
            'terms.enNote': '',
            // WhatsApp button
            'whatsapp.aria': 'Chateá con Juan por WhatsApp',
            'whatsapp.print': 'Hola, tengo una pregunta sobre este print: {url}',
            'whatsapp.service': 'Hola, tengo una pregunta sobre este servicio: {url}',
            'whatsapp.checkout': 'Hola, necesito ayuda con mi compra.',
            'whatsapp.orderNumbered': 'Hola, tengo una consulta sobre mi pedido {order}.',
            'whatsapp.order': 'Hola, tengo una consulta sobre mi pedido.',
            'whatsapp.shop': 'Hola, tengo una consulta sobre la tienda.'
        },
        en: {
            // Shared interface
            'common.services': 'Services',
            'common.cart': 'Cart',
            'common.terms': 'Terms & Conditions',
            'common.backToShop': 'Back to the shop',
            'common.backToShopArrow': '← Back to the shop',
            'common.size': 'Size',
            'common.quantity': 'Quantity',
            'common.price': 'Price',
            'common.fullName': 'Full name',
            'common.phone': 'Phone',
            'common.deliveryAddress': 'Delivery address',
            'common.emailInvalid': 'That email doesn’t look valid.',
            'common.processing': 'Processing…',
            'common.pay': 'Pay',
            'common.tilopayNote': 'Payment is processed securely with Tilopay (cards, SINPE Móvil).',
            // Browse page
            'index.printsLabel': 'Prints — fine art printing, delivery personally coordinated',
            'index.servicesLabel': 'Services — photo sessions booked by date and time',
            'index.loading': 'Loading…',
            'index.noPrints': 'No prints available at the moment.',
            'index.noServices': 'No services available at the moment.',
            'index.catalogError': 'The catalog could not be loaded. Please try again later.',
            'index.servicesError': 'The services could not be loaded. Please try again later.',
            'index.fromPrice': 'from ${price} USD',
            // Product page
            'product.chooseSize': 'Choose a size',
            'product.addToCart': 'Add to cart',
            'product.deliveryNote': 'Printed to order. Juan coordinates delivery personally after your purchase.',
            'product.customToggle': 'Want a custom version of this print?',
            'product.customTell': 'Tell us what you have in mind',
            'product.customPlaceholder': 'Paper, size, finish, framing… anything you want to customize.',
            'product.sendRequest': 'Send request',
            'product.customNote': 'No upfront payment: Juan reviews your request and emails you a quote with a payment link.',
            'product.notFound': 'Print not found. <a href="index.html">Back to the shop</a>.',
            'product.loadError': 'The print could not be loaded. Please try again later.',
            'product.edition': 'Edition: {edition}',
            'product.editionSoldOut': 'Edition of {size} — sold out',
            'product.editionRemaining': 'Edition of {size} — {remaining} remaining',
            'product.soldOut': 'Sold out',
            'product.added': 'Added to cart. <a href="checkout.html">Check out</a> or keep browsing.',
            'product.fillAllFields': 'Please fill in all the fields to send your request.',
            'product.invalidQuantity': 'The quantity is not valid.',
            'product.sending': 'Sending…',
            'product.requestFailed': 'The request could not be sent. Please try again.',
            'product.requestNetworkError': 'The request could not be sent. Please check your connection.',
            'product.requestReceived': 'Done! We received your request. Juan will email you a quote.',
            // Service page
            'service.pageTitle': 'Juan Tribaldos — Service',
            'service.date': 'Date',
            'service.time': 'Time',
            'service.chooseDate': 'Choose a date',
            'service.chooseTime': 'Choose a time',
            'service.book': 'Book',
            'service.bookingNote': 'Your date and time are reserved once payment is completed. Juan will get in touch to coordinate the session details.',
            'service.notFound': 'Service not found. <a href="index.html">Back to the shop</a>.',
            'service.loadError': 'The service could not be loaded. Please try again later.',
            'service.slotUnavailable': '{time} — unavailable',
            'service.dateFull': '{date} — fully booked',
            'service.area': 'Area: {area}',
            'service.duration': 'Duration: {hours}h',
            'service.price': 'Price: ${price} USD',
            'service.alreadyInCart': 'That booking is already in your cart.',
            'service.added': 'Booking added to cart. <a href="checkout.html">Check out</a> — the slot is locked in once you pay.',
            // Checkout page
            'checkout.pageTitle': 'Juan Tribaldos — Cart',
            'checkout.paymentFailed': 'The payment did not go through. You can try again.',
            'checkout.deliveryDetails': 'Delivery details',
            'checkout.sessionDetails': 'Session details',
            'checkout.sessionPlaceholder': 'Tell us a bit about your project. Describe the space, the location, or the kind of photographs you are looking for. This helps us prepare your session better.',
            'checkout.termsNote': 'By paying you accept the <a href="terminos.html">Terms & Conditions</a>.',
            'checkout.emptyCart': 'Your cart is empty. <a href="index.html">Browse prints</a>.',
            'checkout.bookingLabel': 'Booking: {slot}',
            'checkout.remove': 'Remove',
            'checkout.fillAllFields': 'Please fill in all the fields to continue.',
            'checkout.sessionDetailsRequired': 'Tell us the session details so Juan arrives prepared.',
            'checkout.paymentStartError': 'The payment could not be started. Please check your connection and try again.',
            // Custom order quote page
            'custom.pageTitle': 'Juan Tribaldos — Quote',
            'custom.yourQuote': 'Your quote',
            'custom.termsNote': 'By paying you accept the <a href="terminos.html">Terms & Conditions</a> and confirm your reservation.',
            'custom.notFound': 'We couldn’t find that quote. <a href="index.html">Back to the shop</a>.',
            'custom.noteFromJuan': 'Note from Juan: {note}',
            'custom.validUntil': 'Valid until {date}.',
            'custom.alreadyPaid': 'This quote has already been paid. Thank you for your purchase!',
            'custom.expired': 'This quote expired. Message Juan on WhatsApp if you’d like to pick it up again.',
            'custom.pending': 'Juan is still preparing your quote. You’ll get an email as soon as it’s ready.',
            'custom.unavailable': 'This quote is no longer available. <a href="index.html">Back to the shop</a>.',
            'custom.loadError': 'The quote could not be loaded. Please try again later.',
            'custom.paymentError': 'The payment could not be started. Please try again.',
            'custom.paymentNetworkError': 'The payment could not be started. Please check your connection.',
            // Thank-you page
            'thanks.pageTitle': 'Juan Tribaldos — Thank You',
            'thanks.confirmed': 'Purchase confirmed',
            'thanks.order': 'Order {order}',
            'thanks.message': 'Thank you! Your order is confirmed and Juan has already been notified. You’ll soon receive an email with your purchase details, and Juan will get in touch to coordinate delivery.',
            // Terms page
            'terms.pageTitle': 'Juan Tribaldos — Terms & Conditions',
            'terms.enNote': 'The terms below are currently available in Spanish only. If you have any questions, write to jatribaldos20@gmail.com.',
            // WhatsApp button
            'whatsapp.aria': 'Chat with Juan on WhatsApp',
            'whatsapp.print': 'Hi, I have a question about this print: {url}',
            'whatsapp.service': 'Hi, I have a question about this service: {url}',
            'whatsapp.checkout': 'Hi, I need help with my purchase.',
            'whatsapp.orderNumbered': 'Hi, I have a question about my order {order}.',
            'whatsapp.order': 'Hi, I have a question about my order.',
            'whatsapp.shop': 'Hi, I have a question about the shop.'
        }
    };

    function detectLanguage() {
        let stored = null;
        try {
            stored = localStorage.getItem(STORAGE_KEY);
        } catch (error) {
            // Storage unavailable (private mode) — fall through to the browser language.
            stored = null;
        }
        if (stored === 'es' || stored === 'en') {
            return stored;
        }
        const browserLanguage = (navigator.language || 'es').toLowerCase();
        return browserLanguage.indexOf('es') === 0 ? 'es' : 'en';
    }

    const currentLanguage = detectLanguage();

    function getLanguage() {
        return currentLanguage;
    }

    function setLanguage(language) {
        if (language !== 'es' && language !== 'en') {
            return;
        }
        if (language === currentLanguage) {
            return;
        }
        try {
            localStorage.setItem(STORAGE_KEY, language);
        } catch (error) {
            // Storage unavailable — the choice just won't survive the reload.
        }
        window.location.reload();
    }

    function translate(key, params) {
        const table = DICTIONARY[currentLanguage] || DICTIONARY.es;
        let value = table[key];
        if (value === undefined) {
            value = DICTIONARY.es[key];
        }
        if (value === undefined) {
            // Unknown key — return it verbatim so the gap is visible during development.
            return key;
        }
        if (params) {
            for (const name in params) {
                value = value.split('{' + name + '}').join(String(params[name]));
            }
        }
        return value;
    }

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            element.textContent = translate(element.getAttribute('data-i18n'));
        });
        document.querySelectorAll('[data-i18n-html]').forEach((element) => {
            element.innerHTML = translate(element.getAttribute('data-i18n-html'));
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
            element.setAttribute('placeholder', translate(element.getAttribute('data-i18n-placeholder')));
        });
    }

    // The pages are authored in Spanish; keep the document language honest for the
    // browser (translation prompts, screen readers) and for CSS gated on html[lang].
    document.documentElement.setAttribute('lang', currentLanguage);

    document.addEventListener('DOMContentLoaded', applyTranslations);

    return {
        t: translate,
        getLanguage: getLanguage,
        setLanguage: setLanguage,
        applyTranslations: applyTranslations
    };
})();

// AI-generated: global shorthand — page scripts and nav.js call t('key') directly.
const t = JTI18n.t;
