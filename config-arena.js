const ARENA_CONFIG = {
    channels: ['aromo', 'zapotal', 'catalinas'], // Añade o quita aquí
    allColumns: ['Title', 'Type', 'Date', 'Class', 'Link'],
    defaultColumns: ['Title', 'Type', 'Date', 'Link'],
    storageKey: 'jt_archive_prefs'
};

let currentData = []; 
let activeColumns = JSON.parse(localStorage.getItem(ARENA_CONFIG.storageKey)) || [...ARENA_CONFIG.defaultColumns];
let sortCol = 'Date';
let sortDir = 'desc';

function savePrefs() {
    localStorage.setItem(ARENA_CONFIG.storageKey, JSON.stringify(activeColumns));
}