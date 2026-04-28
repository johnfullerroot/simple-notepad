// ========================================
// Tools
// ========================================

function uppercaseText() {
    const start = notepad.selectionStart;
    const end = notepad.selectionEnd;
    if (start === end) {
        notepad.value = notepad.value.toUpperCase();
    } else {
        const selected = notepad.value.substring(start, end);
        notepad.setRangeText(selected.toUpperCase(), start, end, 'end');
    }
    updateStatusBar();
}
function lowercaseText() {
    const start = notepad.selectionStart;
    const end = notepad.selectionEnd;
    if (start === end) {
        notepad.value = notepad.value.toLowerCase();
    } else {
        const selected = notepad.value.substring(start, end);
        notepad.setRangeText(selected.toLowerCase(), start, end, 'end');
    }
    updateStatusBar();
}
function removeSymbols() {
    notepad.value = notepad.value.replace(/[^a-zA-Z0-9 \t\n\r]/g, '');
    updateStatusBar();
}
function removeTabulation() {
    notepad.value = notepad.value.replace(/\t/g, '');
    updateStatusBar();
}
function removeNumbers() {
    notepad.value = notepad.value.replace(/[0-9]/g, '');
    updateStatusBar();
}
function removeSpaces() {
    notepad.value = notepad.value.replace(/ /g, '');
    updateStatusBar();
}
function showStats() {
    const text = notepad.value;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const charCount = text.length;
    const paragraphCount = text.trim() === '' ? 0 : text.trim().split(/\n\s*\n+/).length;
    const symbolCount = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
    const numberCount = (text.match(/[0-9]/g) || []).length;
    const now = new Date();
    const dateTime = now.toLocaleString();
 
    // Detect charset (basic heuristic)
    let charset = 'ASCII';
    for (let i = 0; i < text.length; i++) {
        if (text.charCodeAt(i) > 127) { charset = 'UTF-8 (non-ASCII characters present)'; break; }
    }
 
    document.getElementById('statsModal').style.display = 'flex';
    document.getElementById('statsContent').innerHTML = `
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <tr><td style="padding:5px 8px;color:#555;">Word count</td><td style="padding:5px 8px;font-weight:bold;">${wordCount}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:5px 8px;color:#555;">Character count</td><td style="padding:5px 8px;font-weight:bold;">${charCount}</td></tr>
            <tr><td style="padding:5px 8px;color:#555;">Paragraph count</td><td style="padding:5px 8px;font-weight:bold;">${paragraphCount}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:5px 8px;color:#555;">Charset</td><td style="padding:5px 8px;font-weight:bold;">${charset}</td></tr>
            <tr><td style="padding:5px 8px;color:#555;">Symbol count</td><td style="padding:5px 8px;font-weight:bold;">${symbolCount}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:5px 8px;color:#555;">Number count</td><td style="padding:5px 8px;font-weight:bold;">${numberCount}</td></tr>
            <tr><td style="padding:5px 8px;color:#555;">Date and time</td><td style="padding:5px 8px;font-weight:bold;">${dateTime}</td></tr>
        </table>
    `;
}
