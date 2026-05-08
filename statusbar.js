// ========================================
// Status Bar Updates
// ========================================

const resolutionEl = document.getElementById('resolution');

function updateLineColumn() {
    const pos = notepad.selectionStart;
    const textBefore = notepad.value.slice(0, pos);
    const lines = textBefore.split('\n');
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    lineCol.textContent = `Ln ${line}, Col ${col}`;
}

function updateCharCount() {
    charCount.textContent = `Chars: ${notepad.value.length}`;
}

function updateZoomStatus() {
    let zoom = 100;
    if (window.visualViewport && window.visualViewport.scale !== 1) {
        zoom = Math.round(window.visualViewport.scale * 100);
    } else {
        if (basePixelRatio === null) {
            basePixelRatio = window.devicePixelRatio;
        }
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (isSafari) {
            const ratio = document.documentElement.clientWidth / document.documentElement.offsetWidth;
            zoom = Math.round(ratio * 100);
        } else if (basePixelRatio) {
            zoom = Math.round((window.devicePixelRatio / basePixelRatio) * 100);
        }
    }
    zoomLevel.textContent = `Zoom: ${zoom}%`;
}

function updateResolution() {
    const resolutionEl = document.getElementById('resolution');
    const w = window.innerWidth;
    const h = window.innerHeight;
    const orientation = w > h ? 'landscape' : 'portrait';
    resolutionEl.textContent = `${w} × ${h} (${orientation})`;
}

function updateStatusBar() {
    updateLineColumn();
    updateCharCount();
    updateResolution();        // ← Now also updates resolution
    updateZoomStatus();  
}

function detectOSBrowser() {
    const ua = navigator.userAgent;
    let os = 'Unknown OS';
    let browser = 'Unknown Browser';
    if (ua.includes('Win')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'MacOS';
    else if (ua.includes('Linux')) os = 'Linux';
    if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Safari')) browser = 'Safari';
    osBrowser.textContent = `${os} – ${browser}`;
}

// Expose everything needed globally
window.updateStatusBar = updateStatusBar;
window.updateLineColumn = updateLineColumn;
window.updateCharCount = updateCharCount;
window.updateZoomStatus = updateZoomStatus;
window.updateResolution = updateResolution;
