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
