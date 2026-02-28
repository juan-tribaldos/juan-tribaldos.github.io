// nav.js
function loadNavbar() {
    const navHTML = `
    <header class="header-nav">
        <div class="custom-select-container">
            <div class="select-trigger">Juan Tribaldos</div>
            <ul class="select-options">
                <li data-value="index.html">Juan Tribaldos</li>
                <li data-value="about.html">About</li>
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
    </header>`;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
    initNavLogic();
}

function initNavLogic() {
    // Abrir/Cerrar CUALQUIER selector (incluidos Time y Portrait)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('select-trigger')) {
            const options = e.target.nextElementSibling;
            
            // Cerrar otros abiertos
            document.querySelectorAll('.select-options').forEach(opt => {
                if (opt !== options) opt.classList.remove('open');
            });
            
            options.classList.toggle('open');
            e.stopPropagation();
        } else {
            // Cerrar todo si se hace click fuera
            document.querySelectorAll('.select-options').forEach(opt => opt.classList.remove('open'));
        }
    });

    // Lógica de navegación SOLO para elementos con data-value
    document.querySelectorAll('.select-options li[data-value]').forEach(option => {
        option.addEventListener('click', (e) => {
            const val = option.getAttribute('data-value');
            if (val) window.location.href = val;
        });
    });
}

document.addEventListener('DOMContentLoaded', loadNavbar);