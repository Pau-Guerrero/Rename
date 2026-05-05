/**
 * RENAMEGX - Internationalization (i18n)
 * Optimized for performance
 */

const LANGUAGES = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
];

const translations = {
    es: {
        badge: "Versión 2.1", hero_title_1: "Renombra imágenes", hero_highlight: "de forma masiva",
        hero_desc: "Herramienta potente para renombrar múltiples imágenes al instante.",
        stat_local: "Local / Seguro", stat_formats: "Formatos", stat_zip_value: "ZIP", stat_zip_label: "Listo en 1 clic",
        dropzone_title: "Arrastra una carpeta aquí", dropzone_desc: "O haz clic para seleccionar la carpeta",
        btn_select_folder: "Seleccionar carpeta", options_title: "Opciones de renombrado",
        mode_advanced: "Avanzado", mode_numeric: "Numérico Simple",
        label_prefix: "Prefijo", label_suffix: "Sufijo", label_start_num: "Número inicial",
        label_padding: "Dígitos", label_numeric_start: "Número inicial", label_extension: "Extensión",
        label_add_date: "Añadir fecha", label_lowercase: "Minúsculas", label_keep_ext: "Conservar extensión",
        preview_label: "Vista previa:", images_found: "Imágenes encontradas", btn_rename: "Renombrar",
        progress_processing: "Procesando...", history_title: "Historial de cambios",
        history_empty: "No hay cambios registrados aún", undo_tooltip: "Deshacer (Ctrl+Z)",
        redo_tooltip: "Rehacer (Ctrl+Y)", footer_product: "Producto", footer_resources: "Recursos",
        footer_legal: "Legal", footer_features: "Características", footer_formats: "Formatos soportados",
        footer_guide: "Guía de uso", footer_docs: "Documentación", footer_api: "API Reference",
        footer_faq: "FAQ", footer_privacy: "Privacidad", footer_terms: "Términos", footer_contact: "Contacto",
        footer_copyright: "© 2025 RenameGX.", footer_github: "GitHub", footer_discord: "Discord",
        footer_desc: "Herramienta gratuita para renombrar imágenes de forma masiva.",
        toast_images_loaded: "imágenes cargadas", toast_renamed_success: "imágenes renombradas exitosamente",
        toast_renamed_partial: "exitosas, errores", toast_undo_success: "Deshecho:",
        toast_redo_success: "Rehecho:", toast_zip_success: "ZIP descargado correctamente",
        toast_zip_error: "Error al generar el ZIP", toast_undo_error: "Error al deshacer",
        toast_redo_error: "Error al rehacer", toast_no_images: "No se encontraron imágenes",
        toast_folder_error: "Error al seleccionar carpeta", toast_browser_error: "Usa Chrome o Edge",
        images_count: "{count} imágenes", progress_percent: "%"
    },
    en: {
        badge: "Version 2.1", hero_title_1: "Rename images", hero_highlight: "in bulk",
        hero_desc: "Powerful tool to rename multiple images instantly.",
        stat_local: "Local / Secure", stat_formats: "Formats", stat_zip_value: "ZIP", stat_zip_label: "Ready in 1 click",
        dropzone_title: "Drop a folder here", dropzone_desc: "Or click to select the folder",
        btn_select_folder: "Select folder", options_title: "Rename options",
        mode_advanced: "Advanced", mode_numeric: "Simple Numeric",
        label_prefix: "Prefix", label_suffix: "Suffix", label_start_num: "Start number",
        label_padding: "Digits", label_numeric_start: "Start number", label_extension: "Extension",
        label_add_date: "Add date", label_lowercase: "Lowercase", label_keep_ext: "Keep extension",
        preview_label: "Preview:", images_found: "Images found", btn_rename: "Rename",
        progress_processing: "Processing...", history_title: "Change history",
        history_empty: "No changes recorded yet", undo_tooltip: "Undo (Ctrl+Z)", redo_tooltip: "Redo (Ctrl+Y)",
        footer_product: "Product", footer_resources: "Resources", footer_legal: "Legal",
        footer_copyright: "© 2025 RenameGX.", footer_github: "GitHub", footer_discord: "Discord",
        footer_desc: "Free tool to batch rename images locally.",
        toast_images_loaded: "images loaded", toast_renamed_success: "images renamed successfully",
        toast_renamed_partial: "OK, errors", toast_zip_success: "ZIP downloaded successfully",
        toast_zip_error: "Error generating ZIP", toast_no_images: "No images found",
        toast_folder_error: "Error selecting folder", toast_browser_error: "Use Chrome or Edge",
        images_count: "{count} images", progress_percent: "%"
    },
    fr: {
        badge: "Version 2.1", hero_title_1: "Renommer des images", hero_highlight: "en masse",
        hero_desc: "Outil puissant pour renommer plusieurs images instantanément.",
        stat_local: "Local / Sécurisé", stat_formats: "Formats", stat_zip_value: "ZIP", stat_zip_label: "Prêt en 1 clic",
        dropzone_title: "Déposez un dossier ici", dropzone_desc: "Ou cliquez pour sélectionner le dossier",
        btn_select_folder: "Sélectionner dossier", options_title: "Options de renommage",
        mode_advanced: "Avancé", mode_numeric: "Numérique simple",
        history_title: "Historique des modifications", history_empty: "Aucune modification enregistrée",
        footer_product: "Produit", footer_resources: "Ressources", footer_legal: "Légal",
        footer_copyright: "© 2025 RenameGX.", toast_images_loaded: "images chargées",
        toast_renamed_success: "images renommées avec succès", toast_no_images: "Aucune image trouvée",
        images_count: "{count} images", progress_percent: "%"
    },
    de: {
        badge: "Version 2.1", hero_title_1: "Bilder umbenennen", hero_highlight: "massenhaft",
        hero_desc: "Leistungsstarkes Tool zur massenhaften Umbenennung von Bildern.",
        stat_local: "Lokal / Sicher", stat_formats: "Formate", stat_zip_value: "ZIP", stat_zip_label: "In 1 Klick bereit",
        dropzone_title: "Ordner hier ablegen", dropzone_desc: "Oder klicken um den Ordner auszuwählen",
        btn_select_folder: "Ordner auswählen", options_title: "Umbenennungs-Optionen",
        mode_advanced: "Erweitert", mode_numeric: "Einfach numerisch",
        history_title: "Änderungsverlauf", history_empty: "Noch keine Änderungen aufgezeichnet",
        footer_product: "Produkt", footer_resources: "Ressourcen", footer_legal: "Rechtliches",
        footer_copyright: "© 2025 RenameGX.", toast_images_loaded: "Bilder geladen",
        toast_renamed_success: "Bilder erfolgreich umbenannt", toast_no_images: "Keine Bilder gefunden",
        images_count: "{count} Bilder", progress_percent: "%"
    },
    pt: {
        badge: "Versão 2.1", hero_title_1: "Renomear imagens", hero_highlight: "em massa",
        hero_desc: "Ferramenta poderosa para renomear múltiplas imagens instantaneamente.",
        stat_local: "Local / Seguro", stat_formats: "Formatos", stat_zip_value: "ZIP", stat_zip_label: "Pronto em 1 clique",
        dropzone_title: "Arraste uma pasta aqui", dropzone_desc: "Ou clique para selecionar a pasta",
        btn_select_folder: "Selecionar pasta", options_title: "Opções de renomeação",
        mode_advanced: "Avançado", mode_numeric: "Numérico Simples",
        history_title: "Histórico de alterações", history_empty: "Nenhuma alteração registrada ainda",
        footer_product: "Produto", footer_resources: "Recursos", footer_legal: "Legal",
        footer_copyright: "© 2025 RenameGX.", toast_images_loaded: "imagens carregadas",
        toast_renamed_success: "imagens renomeadas com sucesso", toast_no_images: "Nenhuma imagem encontrada",
        images_count: "{count} imagens", progress_percent: "%"
    },
    it: {
        badge: "Versione 2.1", hero_title_1: "Rinomina immagini", hero_highlight: "in blocco",
        hero_desc: "Strumento potente per rinominare più immagini istantaneamente.",
        stat_locale: "Locale / Sicuro", stat_formats: "Formati", stat_zip_value: "ZIP", stat_zip_label: "Pronto in 1 click",
        dropzone_title: "Trascina una cartella qui", dropzone_desc: "O clicca per selezionare la cartella",
        btn_select_folder: "Seleziona cartella", options_title: "Opzioni di rinomina",
        mode_advanced: "Avanzato", mode_numeric: "Numerico Semplice",
        history_title: "Cronologia modifiche", history_empty: "Nessuna modifica registrata ancora",
        footer_prodotto: "Prodotto", footer_risorse: "Risorse", footer_legale: "Legale",
        footer_copyright: "© 2025 RenameGX.", toast_images_loaded: "immagini caricate",
        toast_renamed_success: "immagini rinominate con successo", toast_no_images: "Nessuna immagine trovata",
        images_count: "{count} immagini", progress_percent: "%"
    },
    ja: {
        badge: "バージョン 2.1", hero_title_1: "画像を一括リネーム", hero_highlight: "一括で",
        hero_desc: "複数の画像を瞬時にリネームする強力なツール。",
        stat_local: "ローカル / 安全", stat_formats: "フォーマット", stat_zip_value: "ZIP", stat_zip_label: "ワンクリックで準備完了",
        dropzone_title: "ここにフォルダをドロップ", dropzone_desc: "またはクリックしてフォルダを選択",
        btn_select_folder: "フォルダを選択", options_title: "リネームオプション",
        mode_advanced: "詳細", mode_numeric: "シンプル数字",
        history_title: "変更履歴", history_empty: "まだ変更は記録されていません",
        footer_product: "製品", footer_resources: "リソース", footer_legal: "法的情報",
        footer_copyright: "© 2025 RenameGX.", toast_images_loaded: "枚の画像が読み込まれました",
        toast_renamed_success: "枚の画像のリネームが正常に完了しました", toast_no_images: "画像が見つかりませんでした",
        images_count: "{count}枚の画像", progress_percent: "%"
    }
};

let currentLang = 'es';

function t(key, params = {}) {
    const lang = currentLang || 'es';
    let text = (translations[lang] && translations[lang][key]) || (translations['es'] && translations['es'][key]) || key;
    Object.keys(params).forEach(p => text = text.replace(`{${p}}`, params[p]));
    return text;
}

function detectLanguage() {
    const bl = (navigator.language || navigator.userLanguage || 'es').slice(0, 2).toLowerCase();
    return translations[bl] ? bl : ['en', 'es'].find(l => translations[l]) || 'es';
}

function updateElement(id, key, isAttr = false) {
    const el = document.getElementById(id);
    if (!el) return;
    const v = t(key);
    if (isAttr) el.setAttribute('title', v);
    else if (el.tagName === 'H1') el.innerHTML = `${t('hero_title_1')}<br><span class="highlight">${t('hero_highlight')}</span>`;
    else el.textContent = v;
}

function applyLanguage(langCode) {
    if (!translations[langCode]) { console.warn(`Lang "${langCode}" not supported`); langCode = 'es'; }
    currentLang = langCode;
    localStorage.setItem('renamgx-lang', langCode);
    document.documentElement.lang = langCode;
    
    updateElement('badgeText', 'badge');
    updateElement('hero-title', 'hero_title_1');
    updateElement('heroDescription', 'hero_desc');
    updateElement('statLocal', 'stat_local');
    updateElement('statFormats', 'stat_formats');
    updateElement('statZipValue', 'stat_zip_value');
    updateElement('statZipLabel', 'stat_zip_label');
    updateElement('dropzone-title', 'dropzone_title');
    updateElement('dropzone-desc', 'dropzone_desc');
    updateElement('btnSelectFolder', 'btn_select_folder');
    updateElement('optionsTitle', 'options_title');
    updateElement('modeAdvanced', 'mode_advanced');
    updateElement('modeNumeric', 'mode_numeric');
    updateElement('labelPrefix', 'label_prefix');
    updateElement('labelSuffix', 'label_suffix');
    updateElement('labelStartNum', 'label_start_num');
    updateElement('labelPadding', 'label_padding');
    updateElement('labelNumericStart', 'label_numeric_start');
    updateElement('labelExtension', 'label_extension');
    updateElement('labelAddDate', 'label_add_date');
    updateElement('labelLowercase', 'label_lowercase');
    updateElement('labelKeepExt', 'label_keep_ext');
    updateElement('previewLabel', 'preview_label');
    updateElement('imagesFoundText', 'images_found');
    updateElement('btnRenameText', 'btn_rename');
    updateElement('progressLabel', 'progress_processing');
    
    const ht = document.getElementById('historyTitleContainer');
    if (ht) { const s = ht.querySelector('span'); if (s) s.textContent = t('history_title'); }
    updateElement('historyEmpty', 'history_empty');
    updateElement('undoBtn', 'undo_tooltip', true);
    updateElement('redoBtn', 'redo_tooltip', true);
    updateElement('footerProduct', 'footer_product');
    updateElement('footerResources', 'footer_resources');
    updateElement('footerLegal', 'footer_legal');
    updateElement('footerDesc', 'footer_desc');
    updateElement('footerCopyright', 'footer_copyright');
    updateElement('footerGithub', 'footer_github');
    updateElement('footerDiscord', 'footer_discord');
    
    const ld = LANGUAGES.find(l => l.code === currentLang);
    const fe = document.getElementById('currentLangFlag');
    if (ld && fe) fe.textContent = ld.flag;
    
    if (typeof imageFiles !== 'undefined' && imageFiles?.length > 0) {
        const b = document.getElementById('imageCountBadge');
        if (b) b.textContent = t('images_count', { count: imageFiles.length });
    }
}

function buildLanguageDropdown() {
    const d = document.getElementById('langDropdown');
    if (!d) return;
    d.innerHTML = '';
    LANGUAGES.forEach(l => {
        const o = document.createElement('div');
        o.className = `lang-option ${l.code === currentLang ? 'active' : ''}`;
        o.setAttribute('role', 'menuitem');
        o.setAttribute('data-lang', l.code);
        o.innerHTML = `<span class="lang-flag">${l.flag}</span><span>${l.name}</span>`;
        o.addEventListener('click', () => selectLanguage(l.code));
        d.appendChild(o);
    });
}

function selectLanguage(code) {
    if (!translations[code]) return;
    currentLang = code;
    localStorage.setItem('renamgx-lang', code);
    document.documentElement.lang = code;
    applyLanguage(code);
    closeLangDropdown();
}

function closeLangDropdown() {
    const d = document.getElementById('langDropdown');
    const b = document.getElementById('langBtn');
    if (d) d.classList.remove('open');
    if (b) b.setAttribute('aria-expanded', 'false');
}

function initLanguage() {
    const saved = localStorage.getItem('renamgx-lang') || detectLanguage();
    document.documentElement.lang = saved;
    applyLanguage(saved);
    buildLanguageDropdown();
}

window.i18n = { t, getCurrentLang: () => currentLang, LANGUAGES, selectLanguage, applyLanguage, buildLanguageDropdown, closeLangDropdown, initLanguage };
document.addEventListener('DOMContentLoaded', initLanguage);