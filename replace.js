// ========================================
// Find & Replace
// ========================================

function showFindReplaceBox() {
    findReplaceBox.style.display = 'block';
    document.getElementById('findText').focus();
    document.getElementById('findText').select();
}

function hideFindReplaceBox() {
    findReplaceBox.style.display = 'none';
}

function findNext() {
    const query = document.getElementById('findText').value.trim();
    if (!query) {
        showAlert('Enter text to find.');
        return;
    }
    const text = notepad.value;
    let start = notepad.selectionEnd;
    if (lastFindIndex > start) start = lastFindIndex;
    const index = text.indexOf(query, start);
    if (index === -1) {
        showAlert('No more occurrences found.');
        lastFindIndex = 0;
        return;
    }
    notepad.focus();
    notepad.setSelectionRange(index, index + query.length);
    lastFindIndex = index + query.length;
}

function replaceCurrent() {
    const findVal = document.getElementById('findText').value.trim();
    const replaceVal = document.getElementById('replaceText').value;
    if (!findVal) {
        showAlert('Enter text to find.');
        return;
    }
    const selected = notepad.value.substring(notepad.selectionStart, notepad.selectionEnd);
    if (selected === findVal) {
        notepad.setRangeText(replaceVal, notepad.selectionStart, notepad.selectionEnd, 'end');
        lastFindIndex = notepad.selectionStart;
    }
    findNext();
}

function replaceAll() {
    const findVal = document.getElementById('findText').value.trim();
    const replaceVal = document.getElementById('replaceText').value;
    if (!findVal) {
        showAlert('Enter text to find.');
        return;
    }
    const escaped = findVal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'g');
    const newText = notepad.value.replace(regex, replaceVal);
    if (newText === notepad.value) {
        showAlert('No occurrences found to replace.');
        return;
    }
    notepad.value = newText;
    updateStatusBar();
    lastFindIndex = 0;
    showAlert('All occurrences replaced.');
}
