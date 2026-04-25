// ========================================
// Insert Operations
// ========================================

function insertDateTime() {
    const now = new Date();
    const formatted = now.toLocaleString();
    notepad.setRangeText(formatted, notepad.selectionStart, notepad.selectionEnd, 'end');
    notepad.focus();
    updateStatusBar();
}

function insertSymbol(sym) {
    notepad.setRangeText(sym, notepad.selectionStart, notepad.selectionEnd, 'end');
    notepad.focus();
    updateStatusBar();
}

function showSymbolPicker() {
    const groups = [
        {
            label: 'Common Symbols',
            symbols: ['/', '\\', '|', '?', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', "'", '"', ',', '.', '<', '>', '/', '\\', '|', '`', '~']
        },
        {
            label: 'Currency',
            symbols: ['$', '€', '£', '¥', '¢', '₩', '₹', '₽', '₿', '₺', '₴', '₦', '₫', '₡', '₱', '฿', '₲', '₵', '₸', '₼', '₾', '﷼', '؋']
        },
        {
            label: 'Punctuation & Typography',
            symbols: ['—', '–', '…', '«', '»', '‹', '›', '"', '"', "'", "'", '‚', '„', '•', '·', '†', '‡', '‰', '‱', '※', '‼', '⁉', '¶', '§', '©', '®', '™', '°', '′', '″', '‾']
        },
        {
            label: 'Maths',
            symbols: ['±', '×', '÷', '≠', '≈', '≡', '≤', '≥', '∞', '√', '∑', '∏', '∂', '∫', '∆', '∇', 'π', 'µ', '∈', '∉', '∩', '∪', '⊂', '⊃', '⊆', '⊇', '¬', '∧', '∨', '∀', '∃', 'ℕ', 'ℤ', 'ℚ', 'ℝ', 'ℂ', '¼', '½', '¾', '⅓', '⅔', '⅛', '⅜', '⅝', '⅞']
        },
        {
            label: 'Arrows',
            symbols: ['←', '→', '↑', '↓', '↔', '↕', '⇐', '⇒', '⇑', '⇓', '⇔', '⇕', '↖', '↗', '↘', '↙', '↺', '↻', '➔', '➜', '➞', '➤', '➥', '➦', '➧', '➨', '➩', '➪', '↩', '↪', '⤴', '⤵']
        },
        {
            label: 'Geometric Shapes',
            symbols: ['■', '□', '▪', '▫', '▲', '△', '▼', '▽', '◆', '◇', '●', '○', '◉', '◎', '◐', '◑', '◒', '◓', '★', '☆', '⬛', '⬜', '⬟', '⬠', '⬡', '⯃', '⯄', '⬤', '⭕']
        },
        {
            label: 'Miscellaneous',
            symbols: ['✓', '✔', '✕', '✗', '✘', '✦', '✧', '✨', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '✰', '✱', '✲', '✳', '✴', '✵', '✶', '✷', '✸', '✹', '✺', '✻', '✼', '✽', '✾', '✿', '❀', '❁', '❂', '❃', '❄', '❅', '❆', '❇', '❈', '❉', '❊', '❋']
        },
        {
            label: 'Emoticons & Dingbats',
            symbols: ['☺', '☻', '☹', '♠', '♣', '♥', '♦', '♤', '♧', '♡', '♢', '♩', '♪', '♫', '♬', '☀', '☁', '☂', '☃', '☄', '⚡', '❄', '🔥', '⭐', '☎', '✉', '✏', '✒', '✂', '⌛', '⌚', '⚙', '⚓', '⚔', '⚜', '⚠', '⚽', '⚾', '⛵', '✈', '⛺', '⚑', '⛱']
        },
        {
            label: 'Latin Extended',
            symbols: ['À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'Þ', 'ß', 'à', 'á', 'â', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'þ', 'ÿ']
        },
        {
            label: 'Greek',
            symbols: ['Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω', 'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω']
        }
    ];

    let html = '<div id="symbolPickerContent" style="max-height:400px;overflow-y:auto;">';

    for (const group of groups) {
        html += `<div style="margin-bottom:14px;">
            <div style="font-size:11px;font-weight:bold;color:#888;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">${group.label}</div>
            <div style="display:flex;flex-wrap:wrap;gap:4px;">`;
        for (const sym of group.symbols) {
            const escaped = sym.replace(/'/g, "\\'");
            html += `<button
                onclick="insertSymbol('${escaped}');closeModal('symbolModal')"
                title="${sym}"
                style="
                    width:32px;height:32px;
                    font-size:16px;
                    line-height:1;
                    cursor:pointer;
                    border:1px solid #ccc;
                    border-radius:3px;
                    background:#fff;
                    display:flex;align-items:center;justify-content:center;
                    padding:0;
                    transition:background 0.1s;
                "
                onmouseover="this.style.background='#f0f0f0'"
                onmouseout="this.style.background='#fff'"
            >${sym}</button>`;
        }
        html += `</div></div>`;
    }

    html += '</div>';

    document.getElementById('symbolPickerBody').innerHTML = html;
    document.getElementById('symbolModal').style.display = 'flex';
}
