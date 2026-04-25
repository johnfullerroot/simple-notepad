// ========================================
// File Operations - openText()
// ========================================

        async function openText() {
            if (supportsFileSystemAccess) {
                try {
                    const [handle] = await window.showOpenFilePicker({
                        types: [{
                            description: 'Text Files',
                            accept: { 'text/plain': ['.txt'] }
                        }],
                        multiple: false
                    });
                    currentFileHandle = handle;
                    const file = await handle.getFile();
                    notepad.value = await file.text();
                    updateStatusBar();
                } catch (err) {
                    // User cancelled
                }
                return;
            }
            fileInput.click();
        }
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
                notepad.value = reader.result;
                updateStatusBar();
            };
            reader.readAsText(file);
            fileInput.value = '';
        });
