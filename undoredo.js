// ========================================
// Undo / Redo System
// ========================================

let history = [];
let historyIndex = -1;
const MAX_HISTORY = 200;

function saveToHistory() {
    const currentState = {
        value: notepad.value,
        selectionStart: notepad.selectionStart,
        selectionEnd: notepad.selectionEnd
    };

    // Don't save duplicate consecutive states
    if (history.length > 0) {
        const lastState = history[historyIndex];
        if (lastState &&
            lastState.value === currentState.value &&
            lastState.selectionStart === currentState.selectionStart &&
            lastState.selectionEnd === currentState.selectionEnd) {
            return;
        }
    }

    // Remove any future states (normal undo/redo behavior)
    history = history.slice(0, historyIndex + 1);

    history.push(currentState);
    historyIndex++;

    // Limit history size
    if (history.length > MAX_HISTORY) {
        history.shift();
        historyIndex--;
    }
}

function undoText() {
    if (historyIndex <= 0) {
        showAlert('Nothing to undo.');
        return;
    }

    historyIndex--;
    const state = history[historyIndex];

    notepad.value = state.value;
    notepad.setSelectionRange(state.selectionStart, state.selectionEnd);
    updateStatusBar();
}

function redoText() {
    if (historyIndex >= history.length - 1) {
        showAlert('Nothing to redo.');
        return;
    }

    historyIndex++;
    const state = history[historyIndex];

    notepad.value = state.value;
    notepad.setSelectionRange(state.selectionStart, state.selectionEnd);
    updateStatusBar();
}

// Initialize with starting empty state
function initUndoRedo() {
    history = [];
    historyIndex = -1;
    saveToHistory(); // Save initial empty document
}

// Attach to all text changes
notepad.addEventListener('input', () => {
    saveToHistory();
});

// Make functions globally available
window.undoText = undoText;
window.redoText = redoText;
window.initUndoRedo = initUndoRedo;
