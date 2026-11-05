// ========================================
// Editing Operations
// ========================================

function newText() {
    if (notepad.value.trim() === '' && currentFileHandle === null) {
        notepad.value = '';
        currentFileHandle = null;
        updateStatusBar();
        return;
    }
    showConfirm('Create new document? Unsaved changes will be lost.', () => {
        notepad.value = '';
        currentFileHandle = null;
        updateStatusBar();
    });
}
function closeText() {
    showConfirm('Close current document? Unsaved changes will be lost.', () => {
        notepad.value = '';
        currentFileHandle = null;
        updateStatusBar();
    });
}
function exitApp() {
    showConfirm('Exit application? Unsaved changes will be lost.', () => {
        notepad.value = '';
        currentFileHandle = null;
        updateStatusBar();
        showAlert('Document closed. You may now close this tab.');
    });
}
function cutText() {
    const selected = notepad.value.substring(notepad.selectionStart, notepad.selectionEnd);
    navigator.clipboard.writeText(selected);
    notepad.setRangeText('', notepad.selectionStart, notepad.selectionEnd, 'end');
}
function copyText() {
    const selected = notepad.value.substring(notepad.selectionStart, notepad.selectionEnd);
    navigator.clipboard.writeText(selected);
}
async function pasteText() {
    try {
        const text = await navigator.clipboard.readText();
        notepad.setRangeText(text, notepad.selectionStart, notepad.selectionEnd, 'end');
    } catch (err) {
        showAlert('Failed to paste from clipboard.');
    }
}
function selectAllText() {
    notepad.select();
}

function getCaretTop(pos) {
    // Measures the pixel offset of a text position, accounting for wrapped lines
    const cs = getComputedStyle(notepad);
    const mirror = document.createElement('div');
    ['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','wordSpacing',
     'tabSize','paddingTop','paddingRight','paddingBottom','paddingLeft'].forEach(p => mirror.style[p] = cs[p]);
    mirror.style.boxSizing = 'border-box';
    mirror.style.width = notepad.clientWidth + 'px';
    mirror.style.position = 'absolute';
    mirror.style.visibility = 'hidden';
    mirror.style.top = '-9999px';
    mirror.style.whiteSpace = 'pre-wrap';
    mirror.style.overflowWrap = 'break-word';
    mirror.textContent = notepad.value.slice(0, pos);
    const marker = document.createElement('span');
    marker.textContent = '\u200b';
    mirror.appendChild(marker);
    document.body.appendChild(mirror);
    const top = marker.offsetTop;
    document.body.removeChild(mirror);
    return top;
}
function goToLine() {
    const lines = notepad.value.split('\n');
    const total = lines.length;
    showPrompt(`Go to line (1 - ${total}):`, '', (value) => {
        if (value === null) return;
        const n = parseInt(value.trim(), 10);
        if (isNaN(n) || n < 1 || n > total) {
            showAlert(`Enter a line number between 1 and ${total}.`);
            return;
        }
        let pos = 0;
        for (let i = 0; i < n - 1; i++) pos += lines[i].length + 1;
        notepad.focus();
        notepad.setSelectionRange(pos, pos);
        notepad.scrollTop = Math.max(0, getCaretTop(pos) - notepad.clientHeight / 2);
        updateStatusBar();
    });
    document.getElementById('promptInput').focus();
    document.getElementById('promptInput').select();
}
