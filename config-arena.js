// config-arena.js

const ARENA_CONFIG = {
    // 1. Tus canales de Are.na
    channels: [
        'interiores_casa-ikaros', 
        'archivo_residencia-salita-2025', 
        'exploraciones_materia-prima'
    ],

    // 2. Definición de todas las columnas posibles
    allColumns: ['Title', 'Type', 'Date', 'Class', 'Link'],

    // 3. Columnas que se muestran la primera vez que alguien entra
    defaultColumns: ['Title', 'Type', 'Date', 'Link'],

    // 4. Clave para guardar las preferencias en el navegador del usuario
    storageKey: 'jt_archive_prefs'
};

// Variables de estado global
let currentData = []; 
let activeColumns = loadPrefs();
let sortCol = 'Date';
let sortDir = 'desc';

// Cargar preferencias del localStorage (memoria del navegador)
function loadPrefs() {
    const saved = localStorage.getItem(ARENA_CONFIG.storageKey);
    return saved ? JSON.parse(saved) : [...ARENA_CONFIG.defaultColumns];
}

// Guardar preferencias
function savePrefs() {
    localStorage.setItem(ARENA_CONFIG.storageKey, JSON.stringify(activeColumns));
}