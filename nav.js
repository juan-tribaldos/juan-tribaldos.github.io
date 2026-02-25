// nav.js
function loadNavbar() {
    const navHTML = `
    <header class="header-nav">
        <div class="custom-select-container">
            <div class="select-trigger">Juan Tribaldos</div>
            <ul class="select-options">
                <li data-value="index.html">Juan Tribaldos</li>
                <li data-value="about.html">About</li>
                <li data-value="contact.html">Contact</li>
                <li data-value="guestbook.html">Guestbook</li>
            </ul>
        </div>

        <div class="custom-select-container">
            <div class="select-trigger">Interiores</div>
            <ul class="select-options">
                <li data-value="laurel-dd.html">Laurel DD</li>
                <li data-value="casa-aromo.html">Casa Aromo</li>
                <li data-value="casa-ikaros.html">Casa Ikaros</li>
                <li data-value="casa-naia.html">Casa Naia</li>
                <li data-value="casa-rosada.html">Casa Rosada</li>
                <li data-value="casa-tula.html">Casa Tula</li>
                <li data-value="perozah.html">Perozah</li>
            </ul>
        </div>

        <div class="custom-select-container">
            <div class="select-trigger">Exploraciones</div>
            <ul class="select-options">
                <li data-value="pleroma.html">Pléroma</li>
                <li data-value="liminal.html">Liminal</li>
                <li data-value="materia-prima.html">Materia Prima</li>
            </ul>
        </div>

        <div class="custom-select-container">
            <div class="select-trigger">Archivo</div>
            <ul class="select-options">
                <li data-value="art.html">Art</li>
                <li data-value="residencia-salita-2025.html">Residencia Salita Temporal 2025</li>
            </ul>
        </div>
    </header>
    `;

    // Insertar el HTML al principio del body
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Activar la lógica de los dropdowns que ya tenías
    initNavLogic();
}

function initNavLogic() {
    document.querySelectorAll('.select-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const options = trigger.nextElementSibling;
            document.querySelectorAll('.select-options').forEach(opt => {
                if (opt !== options) opt.classList.remove('open');
            });
            options.classList.toggle('open');
            e.stopPropagation();
        });
    });

    document.querySelectorAll('.select-options li').forEach(option => {
        option.addEventListener('click', () => {
            const val = option.getAttribute('data-value');
            if (val) window.location.href = val;
        });
    });

    window.addEventListener('click', () => {
        document.querySelectorAll('.select-options').forEach(opt => opt.classList.remove('open'));
    });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadNavbar);