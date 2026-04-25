// ========================================
// File Operations - saveText()
// ========================================

async function saveText() {
    const content = notepad.value;

    if (supportsFileSystemAccess) {
        try {
            let handle = currentFileHandle;
            if (!handle) {
                handle = await window.showSaveFilePicker({
                    suggestedName: 'note.txt',
                    types: [{
                        description: 'Text Files',
                        accept: { 'text/plain': ['.txt'] }
                    }]
                });
                currentFileHandle = handle;
            }
            const writable = await handle.createWritable();
            await writable.write(content);
            await writable.close();
            showAlert('File saved successfully ✔');
        } catch (err) {
            // User cancelled or permission denied
        }
        return;
    }

    // Fallback for browsers without File System Access API
    showPrompt('Enter filename', 'note.txt', (filename) => {
        if (!filename) return;
        if (!filename.toLowerCase().endsWith('.txt')) filename += '.txt';
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        
        showAlert(`Saved as "${filename}" ✔`);
    });
}
