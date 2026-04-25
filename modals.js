// ========================================
// Modal Dialogs
// ========================================

function showAbout() {
    showAlert(`
        <strong>Simple Notepad</strong><br><br>
        A lightweight, platform independent, browser-based plain text editor.<br><br>
        Supports modern File System Access API where available.<br><br>
        Keyboard shortcuts: Ctrl+Shift+N, Ctrl+S, Ctrl+F, etc.
    `);
}
function showConfirm(message, onYes, onNo = null) {
    document.getElementById('confirmMessage').textContent = message;
    document.getElementById('confirmModal').style.display = 'flex';
    confirmCallback = { yes: onYes, no: onNo };
}
function confirmYes() {
    closeModal('confirmModal');
    if (confirmCallback?.yes) confirmCallback.yes();
}
function confirmNo() {
    closeModal('confirmModal');
    if (confirmCallback?.no) confirmCallback.no();
}
function showAlert(message) {
    document.getElementById('alertMessage').innerHTML = message;
    document.getElementById('alertModal').style.display = 'flex';
}
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}
function showPrompt(message, defaultValue = '', callback) {
    document.getElementById('promptMessage').textContent = message;
    document.getElementById('promptInput').value = defaultValue;
    document.getElementById('promptModal').style.display = 'flex';
    promptCallback = callback;
}
function promptOk() {
    closeModal('promptModal');
    if (promptCallback) promptCallback(document.getElementById('promptInput').value);
}
function promptCancel() {
    closeModal('promptModal');
    if (promptCallback) promptCallback(null);
}
