// ========================================
// Keyboard Shortcuts
// ========================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('#menu ul').forEach(menu => menu.style.display = 'none');
        hideFindReplaceBox();
        return;
    }
    const isMac = navigator.platform.toUpperCase().includes('MAC');
    const modifier = isMac ? e.metaKey : e.ctrlKey;
    if (!modifier) return;
    const key = e.key.toLowerCase();
    switch (key) {
        case 'n':
            if (e.shiftKey) {
                e.preventDefault();
                newText();
            }
            break;
        case 's': e.preventDefault(); saveText(); break;
        case 'o': e.preventDefault(); openText(); break;
        case 'w': e.preventDefault(); closeText(); break;
        case 'a': e.preventDefault(); selectAllText(); break;
        case 'f': e.preventDefault(); showFindReplaceBox(); break;
        case 'x': if (!e.shiftKey && !e.altKey) { e.preventDefault(); cutText(); } break;
        case 'c': e.preventDefault(); copyText(); break;
        case 'v': e.preventDefault(); pasteText(); break;
    }
}, true);
