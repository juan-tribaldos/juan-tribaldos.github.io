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
            <div class="select-trigger">Commissions</div>
            <ul class="select-options">
                <li data-value="atipus.html">Atipus</li>
                <li data-value="casa-aromo.html">Aromo</li>
                <li data-value="casa-bahia.html">Bahia</li>
                <li data-value="casa-catalinas.html">Catalinas</li>
                <li data-value="surf-cottage.html">Surf Cottage</li>                
            </ul>
        </div> 
        <div class="custom-select-container">
            <div class="select-trigger">Explorations</div>
            <ul class="select-options">
                <li data-value="notas-al-margen.html">Notas al Margen</li>
                <li data-value="liminal.html">Liminal</li>
            </ul>
        </div>
        <div class="custom-select-container">
            <div class="select-trigger">Research / Archive</div>
            <ul class="select-options">
                <li data-value="tabla.html">Tabla</li>
                <li data-value="residencia-salita-2025.html">Residencia Salita Temporal 2025</li>
                <li data-value="tabla02.html">Tabla (test)</li>
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