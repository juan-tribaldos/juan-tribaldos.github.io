// AI-generated: shop copy of the site's nav.js. Same structure and behavior, with two changes:
// data-values are ../-prefixed (shop pages live under /shop/), and a Shop dropdown with a live
// cart counter is appended. At handoff, the site's own nav.js gets a one-line Shop entry so the
// rest of the site links here too.
function loadNavbar() {
    const navHTML = `
    <header class="header-nav">
        <div class="custom-select-container">
            <div class="select-trigger">Juan Tribaldos</div>
            <ul class="select-options">
                <li data-value="../index.html">Home</li>
                <li data-value="../about.html">About</li>
                <li data-value="../guestbook.html">Guestbook</li>
                <li data-value="terminos.html">Términos y Condiciones</li>
            </ul>
        </div>
        <div class="custom-select-container">
            <div class="select-trigger">Commissions</div>
            <ul class="select-options">
                <li data-value="../casa-harmony.html">Harmony</li>
                <li data-value="../casa-aromo.html">Aromo</li>
                <li data-value="../casa-bahia.html">Bahia</li>
                <li data-value="../casa-catalinas.html">Catalinas</li>
                <li data-value="../surf-cottage.html">Surf Cottage</li>
                <li data-value="../atipus.html">Atipus</li>
            </ul>
        </div>
        <div class="custom-select-container">
            <div class="select-trigger">Explorations</div>
            <ul class="select-options">
                <li data-value="../notas-al-margen.html">Notas al Márgen</li>
                <li data-value="../liminal.html">Liminal</li>
            </ul>
        </div>
        <div class="custom-select-container">
            <div class="select-trigger">Research/Archive</div>
            <ul class="select-options">
                <li class="menu-label">Interviews</li>
                <li data-value="../entrevista-carlo-daque.html">Carlo Daque: momentos y grises</li>
                <li data-value="../entrevista-fiorella-resenterra.html">Fiorella Resenterra: Una curaduría personal</li>
                <li data-value="../entrevista-maria-de-la-paz.html">María de la Paz Alice: Que brillen el paisaje y las personas</li>
                <li class="menu-label">Projects</li>
                <li data-value="../salita-2025.html">Salita Temporal 2025</li>
                <li data-value="../archivo.html">Archive</li>
            </ul>
        </div>
        <div class="custom-select-container">
            <div class="select-trigger">Shop</div>
            <ul class="select-options">
                <li data-value="index.html">Prints</li>
                <li data-value="index.html?category=services">Servicios</li>
                <li data-value="checkout.html">Carrito (<span id="jt-cart-count">0</span>)</li>
            </ul>
        </div>
    </header>`;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // AI-generated: shared footer — injected like the nav so every shop page carries the
    // terms link from one place.
    const footerHTML = `
    <footer class="shop-footer">
        <a href="terminos.html">Términos y Condiciones</a>
        <span>© ${new Date().getFullYear()} Juan Tribaldos</span>
    </footer>`;
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    initNavLogic();
    if (typeof JTCart !== 'undefined') {
        JTCart.refreshBadge();
    }
}

function initNavLogic() {
    // Abrir/Cerrar CUALQUIER selector — same document-wide toggle the site uses, so the
    // size dropdown on the product page works with no extra code.
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('select-trigger')) {
            const options = e.target.nextElementSibling;

            document.querySelectorAll('.select-options').forEach(opt => {
                if (opt !== options) opt.classList.remove('open');
            });

            options.classList.toggle('open');
            e.stopPropagation();
        } else {
            document.querySelectorAll('.select-options').forEach(opt => opt.classList.remove('open'));
        }
    });

    // Navegación SOLO para los li del header (los dropdowns de producto manejan su propio click).
    document.querySelectorAll('.header-nav .select-options li[data-value]').forEach(option => {
        option.addEventListener('click', (e) => {
            const val = option.getAttribute('data-value');
            if (val) window.location.href = val;
        });
    });
}

document.addEventListener('DOMContentLoaded', loadNavbar);
