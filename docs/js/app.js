/**
 * RENAMEGX - Main Application Logic (Optimized)
 */

let directoryHandle = null;
let imageFiles = [];
let imagesGrid = null;
let currentMode = 'advanced';

const IMAGE_EXTENSIONS = ['jpg','jpeg','png','gif','webp','bmp','svg','avif','ico'];
const elements = {};

function cacheElements() {
    elements.themeToggle = document.getElementById('themeToggle');
    elements.dropZone = document.getElementById('dropZone');
    elements.selectFolderBtn = document.getElementById('selectFolderBtn');
    elements.folderInfoBar = document.getElementById('folderInfoBar');
    elements.folderPathDisplay = document.getElementById('folderPathDisplay');
    elements.imageCountBadge = document.getElementById('imageCountBadge');
    elements.optionsPanel = document.getElementById('optionsPanel');
    elements.imagesSection = document.getElementById('imagesSection');
    imagesGrid = document.getElementById('imagesGrid');
    elements.renameAllBtn = document.getElementById('renameAllBtn');
    elements.undoBtn = document.getElementById('undoBtn');
    elements.redoBtn = document.getElementById('redoBtn');
    elements.downloadZipBtn = document.getElementById('downloadZipBtn');
    elements.toast = document.getElementById('toast');
    elements.toastMessage = document.getElementById('toastMessage');
    elements.toastIcon = document.getElementById('toastIcon');
    elements.formatPreview = document.getElementById('formatPreview');
    elements.previewBox = document.getElementById('previewBox');
    elements.progressContainer = document.getElementById('progressContainer');
    elements.progressFill = document.getElementById('progressFill');
    elements.progressText = document.getElementById('progressText');
    elements.modeAdvanced = document.getElementById('modeAdvanced');
    elements.modeNumeric = document.getElementById('modeNumeric');
    elements.advancedOptions = document.getElementById('advancedOptions');
    elements.numericOptions = document.getElementById('numericOptions');
    elements.prefixInput = document.getElementById('prefixInput');
    elements.suffixInput = document.getElementById('suffixInput');
    elements.startNumInput = document.getElementById('startNumInput');
    elements.paddingInput = document.getElementById('paddingInput');
    elements.numericStart = document.getElementById('numericStart');
    elements.extInput = document.getElementById('extInput');
    elements.addDateToggle = document.getElementById('addDateToggle');
    elements.lowercaseToggle = document.getElementById('lowercaseToggle');
    elements.keepExtToggle = document.getElementById('keepExtToggle');
    elements.historyPanel = document.getElementById('historyPanel');
    elements.historyHeader = document.getElementById('historyHeader');
    elements.historyList = document.getElementById('historyList');
}

const historyManager = {
    undoStack: [], redoStack: [], log: [],
    pushOperation(op) { this.undoStack.push(op); this.redoStack = []; this.log.unshift(op); this.updateUI(); },
    canUndo() { return this.undoStack.length > 0; },
    canRedo() { return this.redoStack.length > 0; },
    async undo() {
        if (!this.canUndo()) return;
        const op = this.undoStack.pop();
        try {
            await op.handle.move(op.originalName);
            const f = imageFiles.find(x => x.name === op.newName);
            if (f) { f.name = op.originalName; try { f.handle = await directoryHandle.getFileHandle(op.originalName); } catch(e) {} }
            op.status = 'undo';
            this.redoStack.push(op);
            renderImageGrid(); updateUndoRedoButtons();
            showToast(`${window.i18n.t('toast_undo_success')} ${op.newName} → ${op.originalName}`, 'success');
        } catch (err) { console.error('Undo error:', err); showToast(window.i18n.t('toast_undo_error'), 'error'); this.undoStack.push(op); }
    },
    async redo() {
        if (!this.canRedo()) return;
        const op = this.redoStack.pop();
        try {
            await op.handle.move(op.newName);
            const f = imageFiles.find(x => x.name === op.originalName);
            if (f) { f.name = op.newName; try { f.handle = await directoryHandle.getFileHandle(op.newName); } catch(e) {} }
            op.status = 'success';
            this.undoStack.push(op);
            renderImageGrid(); updateUndoRedoButtons();
            showToast(`${window.i18n.t('toast_redo_success')} ${op.originalName} → ${op.newName}`, 'success');
        } catch (err) { console.error('Redo error:', err); showToast(window.i18n.t('toast_redo_error'), 'error'); this.redoStack.push(op); }
    },
    clear() { this.undoStack = []; this.redoStack = []; this.log = []; this.updateUI(); },
    updateUI() {
        const c = document.getElementById('historyCount');
        if (c) c.textContent = this.log.length;
        updateUndoRedoButtons(); renderHistoryLog();
    }
};

function initTheme() { applyTheme(localStorage.getItem('renamgx-theme') || 'dark'); }

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('renamgx-theme', theme);
    if (elements.themeToggle) {
        const s = elements.themeToggle.querySelector('.icon-sun'), m = elements.themeToggle.querySelector('.icon-moon');
        if (theme === 'light') { if(s)s.classList.add('hidden'); if(m)m.classList.remove('hidden'); }
        else { if(s)s.classList.remove('hidden'); if(m)m.classList.add('hidden'); }
    }
}

function showToast(msg, type = 'success') {
    if (!elements.toast || !elements.toastMessage) return;
    elements.toastMessage.textContent = msg;
    elements.toast.classList.remove('success', 'error');
    elements.toast.classList.add(type, 'show');
    if (elements.toastIcon) {
        elements.toastIcon.innerHTML = type === 'error'
            ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/></svg>'
            : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
    }
    setTimeout(() => { if(elements.toast) elements.toast.classList.remove('show'); }, 3500);
}

function checkBrowserSupport() {
    if (!('showDirectoryPicker' in window)) {
        showToast(window.i18n.t('toast_browser_error'), 'error');
        if (elements.selectFolderBtn) elements.selectFolderBtn.disabled = true;
        if (elements.dropZone) { elements.dropZone.style.pointerEvents = 'none'; elements.dropZone.style.opacity = '0.5'; }
    }
}

async function selectFolder() {
    try { const h = await window.showDirectoryPicker({ mode: 'readwrite' }); await loadDirectory(h); }
    catch (err) { if (err.name !== 'AbortError') showToast(window.i18n.t('toast_folder_error'), 'error'); }
}

async function loadDirectory(dirHandle) {
    directoryHandle = dirHandle; imageFiles = []; historyManager.clear();
    await scanDirectory(dirHandle);
    if (imageFiles.length === 0) { showToast(window.i18n.t('toast_no_images'), 'error'); return; }
    imageFiles.sort((a, b) => a.originalName.localeCompare(b.originalName, undefined, { numeric: true, sensitivity: 'base' }));
    updateUIState(); renderImageGrid();
    showToast(`${imageFiles.length} ${window.i18n.t('toast_images_loaded')}`);
}

async function scanDirectory(dh) {
    for await (const entry of dh.values()) {
        if (entry.kind === 'file') {
            const ext = entry.name.split('.').pop().toLowerCase();
            if (IMAGE_EXTENSIONS.includes(ext)) {
                try { const f = await entry.getFile(); imageFiles.push({ originalName: entry.name, name: entry.name, file: f, url: URL.createObjectURL(f), handle: entry }); } catch (e) {}
            }
        } else if (entry.kind === 'directory') await scanDirectory(entry);
    }
}

function updateUIState() {
    if (elements.folderInfoBar) elements.folderInfoBar.classList.remove('hidden');
    if (elements.optionsPanel) elements.optionsPanel.classList.remove('hidden');
    if (elements.imagesSection) elements.imagesSection.classList.remove('hidden');
    if (elements.historyPanel) elements.historyPanel.classList.remove('hidden');
    if (elements.folderPathDisplay && directoryHandle) elements.folderPathDisplay.textContent = directoryHandle.name;
    if (elements.imageCountBadge) elements.imageCountBadge.textContent = window.i18n.t('images_count', { count: imageFiles.length });
    if (elements.renameAllBtn) elements.renameAllBtn.disabled = false;
    updateFormatPreview();
}

function switchMode(mode) {
    currentMode = mode;
    if (mode === 'advanced') {
        if (elements.modeAdvanced) elements.modeAdvanced.classList.add('active');
        if (elements.modeNumeric) elements.modeNumeric.classList.remove('active');
        if (elements.advancedOptions) elements.advancedOptions.classList.remove('hidden');
        if (elements.numericOptions) elements.numericOptions.classList.add('hidden');
        [elements.prefixInput, elements.suffixInput, elements.startNumInput, elements.paddingInput].forEach(i => { if(i){i.disabled=false;i.classList.remove('inactive-mode');}});
        [elements.numericStart, elements.extInput].forEach(i => { if(i){i.disabled=true;i.classList.add('inactive-mode');}});
    } else {
        if (elements.modeAdvanced) elements.modeAdvanced.classList.remove('active');
        if (elements.modeNumeric) elements.modeNumeric.classList.add('active');
        if (elements.advancedOptions) elements.advancedOptions.classList.add('hidden');
        if (elements.numericOptions) elements.numericOptions.classList.remove('hidden');
        [elements.prefixInput, elements.suffixInput, elements.startNumInput, elements.paddingInput].forEach(i => { if(i){i.disabled=true;i.classList.add('inactive-mode');}});
        [elements.numericStart, elements.extInput].forEach(i => { if(i){i.disabled=false;i.classList.remove('inactive-mode');}});
    }
    updateFormatPreview(); if (imageFiles.length > 0) renderImageGrid();
}

function generateNewName(orig, idx) { return currentMode === 'numeric' ? generateNumericName(orig, idx) : generateAdvancedName(orig, idx); }

function generateNumericName(orig, idx) {
    const n = parseInt(elements.numericStart?.value) || 1, e = elements.extInput?.value?.trim() || '', k = elements.keepExtToggle?.checked ?? true;
    let ext = e ? (e.startsWith('.') ? e : '.' + e) : (k ? '.' + orig.split('.').pop().toLowerCase() : '');
    return `${n + idx}${ext}`;
}

function generateAdvancedName(orig, idx) {
    const p = elements.prefixInput?.value || '', s = elements.suffixInput?.value || '', st = parseInt(elements.startNumInput?.value) || 1,
        pad = Math.max(1, Math.min(10, parseInt(elements.paddingInput?.value) || 3)), ad = elements.addDateToggle?.checked ?? false,
        lc = elements.lowercaseToggle?.checked ?? true, ke = elements.keepExtToggle?.checked ?? true;
    let ext = ke ? '.' + orig.split('.').pop().toLowerCase() : '';
    let ds = ''; if (ad) { const now = new Date(); ds = `_${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`; }
    const num = String(st + idx).padStart(pad, '0'), nm = `${p}${ds}${num}${s}${ext}`;
    return lc ? nm.toLowerCase() : nm;
}

let previewTimeout = null;

function updateFormatPreview() {
    if (!elements.formatPreview || !elements.previewBox) return;
    let val;
    if (imageFiles.length > 0) val = generateNewName(imageFiles[0].originalName, 0);
    else if (currentMode === 'numeric') { const s = elements.numericStart?.value||'1', e = elements.extInput?.value||'.jpg'; val = `${s}${e.startsWith('.')?'':'.'}${e}`; }
    else { const p = elements.prefixInput?.value||'imagen_', pad = parseInt(elements.paddingInput?.value)||3, he = elements.keepExtToggle?.checked!==false; val = `${p}${String(1).padStart(pad,'0')}${he?'.jpg':''}`; }
    if (elements.formatPreview.textContent !== val) {
        elements.formatPreview.classList.add('updating'); elements.previewBox.classList.add('has-changes');
        elements.formatPreview.textContent = val;
        clearTimeout(previewTimeout);
        previewTimeout = setTimeout(() => { if(elements.formatPreview) elements.formatPreview.classList.remove('updating'); if(elements.previewBox) elements.previewBox.classList.remove('has-changes'); }, 300);
    }
}

function renderImageGrid() {
    if (!imagesGrid) return;
    imagesGrid.innerHTML = '';
    imageFiles.forEach((img, idx) => {
        const card = document.createElement('article');
        card.className = 'image-card'; card.style.animationDelay = `${Math.min(idx*0.04, 0.5)}s`; card.setAttribute('role', 'listitem');
        const newName = generateNewName(img.originalName, idx);
        card.innerHTML = `<img src="${img.url}" alt="${escapeHtml(img.name)}" class="image-preview" loading="lazy"><div class="image-info"><p class="filename-old">${escapeHtml(img.name)}</p><p class="filename-new">${escapeHtml(newName)}</p></div>`;
        imagesGrid.appendChild(card);
    });
}

function escapeHtml(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

function renderHistoryLog() {
    if (!elements.historyList) return;
    if (historyManager.log.length === 0) { elements.historyList.innerHTML = `<div class="history-empty">${window.i18n.t('history_empty')}</div>`; return; }
    elements.historyList.innerHTML = '';
    historyManager.log.slice(0, 50).forEach(op => {
        const item = document.createElement('div'); item.className = 'history-item';
        const sc = op.status==='error'?'error':op.status==='undo'?'undo':'success';
        item.innerHTML = `<div class="history-status ${sc}"></div><div class="history-names"><span class="history-from">${escapeHtml(op.originalName)}</span><span class="history-to">${escapeHtml(op.newName)}</span></div><span class="history-time">${op.timestamp?op.timestamp.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}):''}</span>`;
        elements.historyList.appendChild(item);
    });
}

function formatTime(d) { return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

function updateUndoRedoButtons() { if(elements.undoBtn) elements.undoBtn.disabled=!historyManager.canUndo(); if(elements.redoBtn) elements.redoBtn.disabled=!historyManager.canRedo(); }

async function renameAllImages() {
    if (!directoryHandle || !imageFiles.length) return;
    if(elements.renameAllBtn) elements.renameAllBtn.disabled=true;
    if(elements.undoBtn) elements.undoBtn.disabled=true;
    if(elements.redoBtn) elements.redoBtn.disabled=true;
    if(elements.downloadZipBtn) elements.downloadZipBtn.disabled=true;
    if(elements.progressContainer) elements.progressContainer.classList.add('visible');
    let ok=0, err=0;
    for(let i=0;i<imageFiles.length;i++){
        const img=imageFiles[i], newName=generateNewName(img.originalName,i),
            op={id:Date.now()+i, timestamp:new Date(), originalName:img.name, newName, status:'pending', handle:img.handle};
        try{
            await img.handle.move(newName); op.status='success'; img.name=newName;
            try{ img.handle=await directoryHandle.getFileHandle(newName); }catch(e){}
            ok++; historyManager.pushOperation(op);
        }catch(e){
            console.error(`Rename error ${img.name}:`, e); op.status='error'; err++; historyManager.pushOperation(op);
        }
        const prog=Math.round(((i+1)/imageFiles.length)*100);
        if(elements.progressFill) elements.progressFill.style.width=`${prog}%`;
        if(elements.progressText) elements.progressText.textContent=`${prog}${window.i18n.t('progress_percent')}`;
        renderImageGrid();
    }
    setTimeout(()=>{
        if(elements.progressContainer) elements.progressContainer.classList.remove('visible');
        if(elements.progressFill) elements.progressFill.style.width='0%';
        if(elements.renameAllBtn) elements.renameAllBtn.disabled=false;
        if(elements.downloadZipBtn) elements.downloadZipBtn.disabled=false;
        updateUndoRedoButtons();
        if(err===0) showToast(`${ok} ${window.i18n.t('toast_renamed_success')}`);
        else showToast(`${ok} ${window.i18n.t('toast_renamed_partial')} ${err}`, 'error');
    }, 500);
}

async function downloadAsZip(){
    if(!imageFiles.length) return;
    if(typeof JSZip==='undefined'){ showToast(window.i18n.t('toast_zip_error'),'error'); return; }
    const btn=elements.downloadZipBtn;
    if(btn){ btn.disabled=true; btn.innerHTML='<svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0"/><path d="M12 7v5l3 3"/></svg>'; }
    try{
        const zip=new JSZip();
        for(let i=0;i<imageFiles.length;i++){
            const img=imageFiles[i], nm=generateNewName(img.originalName,i);
            try{ const f=await img.handle.getFile(); zip.file(nm,new Blob([await f.arrayBuffer()],{type:f.type})); }
            catch(e){ if(img.file) zip.file(nm,img.file); }
        }
        const content=await zip.generateAsync({type:'blob'}), url=URL.createObjectURL(content),
            a=document.createElement('a'); a.href=url; a.download=`renamegx_${new Date().toISOString().slice(0,10)}.zip`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(()=>URL.revokeObjectURL(url),1000);
        showToast(window.i18n.t('toast_zip_success'));
    }catch(e){ console.error('ZIP error:',e); showToast(window.i18n.t('toast_zip_error'),'error'); }
    finally{ if(btn){ btn.disabled=false; btn.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>ZIP'; }}
}

function setupEventListeners(){
    if(elements.themeToggle) elements.themeToggle.addEventListener('click',()=>{ const c=document.documentElement.getAttribute('data-theme'); applyTheme(c==='dark'?'light':'dark'); });
    if(elements.dropZone){
        elements.dropZone.addEventListener('click',e=>{ if(!e.target.closest('button')) selectFolder(); });
        elements.dropZone.addEventListener('dragover',e=>{ e.preventDefault(); elements.dropZone.classList.add('drag-over'); });
        elements.dropZone.addEventListener('dragleave',e=>{ e.preventDefault(); elements.dropZone.classList.remove('drag-over'); });
        elements.dropZone.addEventListener('drop',e=>{ e.preventDefault(); elements.dropZone.classList.remove('drag-over'); selectFolder(); });
    }
    if(elements.selectFolderBtn) elements.selectFolderBtn.addEventListener('click',e=>{ e.stopPropagation(); selectFolder(); });
    if(elements.modeAdvanced) elements.modeAdvanced.addEventListener('click',()=>switchMode('advanced'));
    if(elements.modeNumeric) elements.modeNumeric.addEventListener('click',()=>switchMode('numeric'));
    [elements.prefixInput,elements.suffixInput,elements.startNumInput,elements.paddingInput,elements.numericStart,elements.extInput,elements.addDateToggle,elements.lowercaseToggle,elements.keepExtToggle].forEach(inp=>{
        if(inp){ inp.addEventListener('input',updateFormatPreview); inp.addEventListener('change',updateFormatPreview); }
    });
    if(elements.undoBtn) elements.undoBtn.addEventListener('click',()=>historyManager.undo());
    if(elements.redoBtn) elements.redoBtn.addEventListener('click',()=>historyManager.redo());
    if(elements.renameAllBtn) elements.renameAllBtn.addEventListener('click',renameAllImages);
    if(elements.downloadZipBtn) elements.downloadZipBtn.addEventListener('click',downloadAsZip);
    document.addEventListener('keydown',e=>{
        if((e.ctrlKey||e.metaKey)&&e.key==='z'&&!e.shiftKey&&imageFiles.length>0){ e.preventDefault(); historyManager.undo(); }
        if((e.ctrlKey||e.metaKey)&&(e.key==='y'||(e.key==='z'&&e.shiftKey))){ e.preventDefault(); historyManager.redo(); }
    });
    if(elements.historyHeader&&elements.historyList){
        elements.historyHeader.addEventListener('click',()=>{ elements.historyList.classList.toggle('open'); const t=elements.historyHeader.querySelector('.history-toggle'); if(t) t.classList.toggle('open'); });
    }
    const lb=document.getElementById('langBtn'), ld=document.getElementById('langDropdown');
    if(lb&&ld){
        lb.addEventListener('click',e=>{ e.stopPropagation(); ld.classList.contains('open')?window.i18n.closeLangDropdown():(ld.classList.add('open'),lb.setAttribute('aria-expanded','true')); });
        document.addEventListener('click',e=>{ if(!e.target.closest('#langSelector')) window.i18n.closeLangDropdown(); });
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    cacheElements(); initTheme(); checkBrowserSupport(); setupEventListeners();
});