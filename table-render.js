// table-render.js

function renderTable(data) {
    const thead = document.querySelector('#arena-table thead tr');
    const tbody = document.querySelector('#table-body');

    // 1. Dibujar Cabeceras según activeColumns
    thead.innerHTML = activeColumns.map(col => `
        <th onclick="handleSort('${col}')">
            ${col} ${sortCol === col ? (sortDir === 'asc' ? '▲' : '▼') : ''}
        </th>
    `).join('');

    // 2. Dibujar Filas
    tbody.innerHTML = data.map(item => `
        <tr>
            ${activeColumns.map(col => `<td>${item[col] || '-'}</td>`).join('')}
        </tr>
    `).join('');
}

// Lógica de ordenación
function handleSort(column) {
    if (sortCol === column) {
        sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    } else {
        sortCol = column;
        sortDir = 'asc';
    }
    
    const sorted = [...currentData].sort((a, b) => {
        let valA = a[column];
        let valB = b[column];
        return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
    
    renderTable(sorted);
}