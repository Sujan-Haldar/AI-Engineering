document.addEventListener('DOMContentLoaded', () => {
    const mainDisplay = document.getElementById('mainDisplay');
    const historyPreview = document.getElementById('historyPreview');
    const brandTitle = document.getElementById('brandTitle');
    
    // Mode toggles
    const modeToggle = document.getElementById('modeToggle');
    const scientificKeypad = document.getElementById('scientificKeypad');
    const converterToggle = document.getElementById('converterToggle');
    const calculatorBox = document.getElementById('calculatorBox');
    const converterBox = document.getElementById('converterBox');

    // History toggles
    const historyToggle = document.getElementById('historyToggle');
    const historySidebar = document.getElementById('historySidebar');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');
    const themeToggle = document.getElementById('themeToggle');

    // Converter elements
    const fromValue = document.getElementById('fromValue');
    const fromUnit = document.getElementById('fromUnit');
    const toValue = document.getElementById('toValue');
    const toUnit = document.getElementById('toUnit');
    const swapUnitsBtn = document.getElementById('swapUnitsBtn');
    const quickPills = document.querySelectorAll('.quick-pill');

    let currentInput = '0';
    let expression = '';
    let historyData = JSON.parse(localStorage.getItem('calc_history')) || [];
    let isScientificOpen = false;
    let isConverterOpen = false;
    let isHistoryOpen = false;
    let resetOnNextInput = false;

    // Initialize history view
    renderHistory();

    // Theme Toggle
    const savedTheme = localStorage.getItem('calc_theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('calc_theme', 'light');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('calc_theme', 'dark');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    });

    // Toggle Scientific Mode
    modeToggle.addEventListener('click', () => {
        if (isConverterOpen) {
            closeConverter();
        }
        isScientificOpen = !isScientificOpen;
        scientificKeypad.classList.toggle('active', isScientificOpen);
        modeToggle.classList.toggle('active', isScientificOpen);
    });

    // Toggle Length Converter Mode
    converterToggle.addEventListener('click', () => {
        isConverterOpen = !isConverterOpen;
        if (isConverterOpen) {
            // Close scientific if open
            if (isScientificOpen) {
                isScientificOpen = false;
                scientificKeypad.classList.remove('active');
                modeToggle.classList.remove('active');
            }
            calculatorBox.style.display = 'none';
            converterBox.classList.add('active');
            converterToggle.classList.add('active');
            brandTitle.textContent = 'Length Converter';
            convertLength();
        } else {
            closeConverter();
        }
    });

    function closeConverter() {
        isConverterOpen = false;
        calculatorBox.style.display = 'flex';
        converterBox.classList.remove('active');
        converterToggle.classList.remove('active');
        brandTitle.textContent = 'CalcPro';
    }

    // Toggle History Sidebar
    historyToggle.addEventListener('click', () => {
        isHistoryOpen = !isHistoryOpen;
        historySidebar.classList.toggle('active', isHistoryOpen);
        historyToggle.classList.toggle('active', isHistoryOpen);
    });

    // Length Converter Logic
    // Conversion factors to meters (base unit)
    const lengthUnits = {
        nm: 0.000001,
        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000,
        inch: 0.0254,
        ft: 0.3048,
        yd: 0.9144,
        mi: 1609.344
    };

    function convertLength() {
        const val = parseFloat(fromValue.value);
        if (isNaN(val)) {
            toValue.value = '';
            return;
        }

        const fUnit = fromUnit.value;
        const tUnit = toUnit.value;

        // Convert to meters first, then to target unit
        const valueInMeters = val * lengthUnits[fUnit];
        const result = valueInMeters / lengthUnits[tUnit];

        // Format result nicely
        toValue.value = parseFloat(result.toFixed(6));
    }

    fromValue.addEventListener('input', convertLength);
    fromUnit.addEventListener('change', convertLength);
    toUnit.addEventListener('change', convertLength);

    swapUnitsBtn.addEventListener('click', () => {
        const temp = fromUnit.value;
        fromUnit.value = toUnit.value;
        toUnit.value = temp;

        const tempVal = fromValue.value;
        fromValue.value = toValue.value;
        convertLength();
    });

    quickPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const f = pill.getAttribute('data-from');
            const t = pill.getAttribute('data-to');
            fromUnit.value = f;
            toUnit.value = t;
            convertLength();
        });
    });


    // Calculator Button Click Listeners
    document.querySelectorAll('.keypad .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.getAttribute('data-value');
            const action = btn.getAttribute('data-action');

            if (value !== null) {
                handleNumber(value);
            } else if (action !== null) {
                handleAction(action);
            }

            updateDisplay();
        });
    });

    // Keyboard support for Calculator
    window.addEventListener('keydown', (e) => {
        if (isConverterOpen) return; // Ignore standard calc keys if converter is open

        if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
            handleNumber(e.key);
        } else if (e.key === '+') {
            handleAction('add');
        } else if (e.key === '-') {
            handleAction('subtract');
        } else if (e.key === '*') {
            handleAction('multiply');
        } else if (e.key === '/') {
            e.preventDefault();
            handleAction('divide');
        } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            handleAction('calculate');
        } else if (e.key === 'Backspace') {
            handleAction('delete');
        } else if (e.key === 'Escape') {
            handleAction('clear');
        } else if (e.key === '%') {
            handleAction('percent');
        }
        updateDisplay();
    });

    function handleNumber(num) {
        if (resetOnNextInput) {
            currentInput = '0';
            resetOnNextInput = false;
        }

        if (num === '.') {
            if (currentInput.includes('.')) return;
            if (currentInput === '' || resetOnNextInput) {
                currentInput = '0.';
                return;
            }
        }

        if (currentInput === '0' && num !== '.') {
            currentInput = num;
        } else {
            currentInput += num;
        }
    }

    function handleAction(action) {
        switch (action) {
            case 'clear':
                currentInput = '0';
                expression = '';
                historyPreview.textContent = '';
                resetOnNextInput = false;
                break;

            case 'delete':
                if (resetOnNextInput) return;
                currentInput = currentInput.slice(0, -1);
                if (currentInput === '' || currentInput === '-') {
                    currentInput = '0';
                }
                break;

            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
            case 'power':
                appendOperator(getOperatorSymbol(action));
                break;

            case 'percent':
                try {
                    let val = parseFloat(currentInput);
                    val = val / 100;
                    currentInput = formatResult(val);
                } catch (err) {
                    currentInput = 'Error';
                }
                break;

            case 'calculate':
                calculateResult();
                break;

            // Scientific functions
            case 'sin':
            case 'cos':
            case 'tan':
            case 'log':
            case 'ln':
            case 'sqrt':
            case 'square':
            case 'fact':
                applyScientific(action);
                break;

            case 'pi':
                currentInput = Math.PI.toString();
                resetOnNextInput = true;
                break;

            case 'e':
                currentInput = Math.E.toString();
                resetOnNextInput = true;
                break;

            case 'bracket':
                if (currentInput === '0' || resetOnNextInput) {
                    currentInput = '(';
                    resetOnNextInput = false;
                } else {
                    currentInput += '(';
                }
                break;
        }
    }

    function getOperatorSymbol(action) {
        switch (action) {
            case 'add': return '+';
            case 'subtract': return '-';
            case 'multiply': return '×';
            case 'divide': return '÷';
            case 'power': return '^';
            default: return '';
        }
    }

    function appendOperator(op) {
        if (resetOnNextInput) {
            resetOnNextInput = false;
        }
        expression += currentInput + ' ' + op + ' ';
        historyPreview.textContent = expression;
        currentInput = '0';
    }

    function calculateResult() {
        if (!expression && currentInput === '0') return;

        let fullExpr = expression + currentInput;
        let evalExpr = fullExpr
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/\^/g, '**');

        try {
            if (/[^0-9+\-*/().\s*]/.test(evalExpr)) {
                throw new Error('Invalid Character');
            }

            let result = Function('"use strict";return (' + evalExpr + ')')();
            
            if (!isFinite(result)) {
                throw new Error('Math Error');
            }

            let formattedResult = formatResult(result);

            addToHistory(fullExpr, formattedResult);

            expression = '';
            historyPreview.textContent = fullExpr + ' =';
            currentInput = formattedResult;
            resetOnNextInput = true;
        } catch (err) {
            currentInput = 'Error';
            resetOnNextInput = true;
        }
    }

    function applyScientific(func) {
        let val = parseFloat(currentInput);
        let res = 0;
        let exprName = '';

        try {
            switch (func) {
                case 'sin':
                    res = Math.sin(val * (Math.PI / 180));
                    exprName = `sin(${val}°)`;
                    break;
                case 'cos':
                    res = Math.cos(val * (Math.PI / 180));
                    exprName = `cos(${val}°)`;
                    break;
                case 'tan':
                    res = Math.tan(val * (Math.PI / 180));
                    exprName = `tan(${val}°)`;
                    break;
                case 'log':
                    if (val <= 0) throw new Error();
                    res = Math.log10(val);
                    exprName = `log(${val})`;
                    break;
                case 'ln':
                    if (val <= 0) throw new Error();
                    res = Math.log(val);
                    exprName = `ln(${val})`;
                    break;
                case 'sqrt':
                    if (val < 0) throw new Error();
                    res = Math.sqrt(val);
                    exprName = `√(${val})`;
                    break;
                case 'square':
                    res = Math.pow(val, 2);
                    exprName = `(${val})²`;
                    break;
                case 'fact':
                    if (val < 0 || !Number.isInteger(val)) throw new Error();
                    res = factorial(val);
                    exprName = `${val}!`;
                    break;
            }

            let formatted = formatResult(res);
            addToHistory(exprName, formatted);
            historyPreview.textContent = exprName + ' =';
            currentInput = formatted;
            resetOnNextInput = true;
        } catch (err) {
            currentInput = 'Error';
            resetOnNextInput = true;
        }
    }

    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        if (n > 170) return Infinity;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    function formatResult(num) {
        if (typeof num !== 'number') num = parseFloat(num);
        if (isNaN(num)) return 'Error';
        if (!isFinite(num)) return 'Infinity';

        let str = parseFloat(num.toFixed(10)).toString();
        return str;
    }

    function updateDisplay() {
        mainDisplay.textContent = currentInput;
        if (currentInput.length > 12) {
            mainDisplay.style.fontSize = '1.5rem';
        } else if (currentInput.length > 8) {
            mainDisplay.style.fontSize = '1.8rem';
        } else {
            mainDisplay.style.fontSize = '2.25rem';
        }
    }

    function addToHistory(expr, res) {
        const item = { expr, res, time: new Date().toLocaleTimeString() };
        historyData.unshift(item);
        if (historyData.length > 50) historyData.pop();
        localStorage.setItem('calc_history', JSON.stringify(historyData));
        renderHistory();
    }

    function renderHistory() {
        if (historyData.length === 0) {
            historyList.innerHTML = '<div class="empty-history">No history yet</div>';
            return;
        }

        historyList.innerHTML = '';
        historyData.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <div class="h-expr">${item.expr}</div>
                <div class="h-res">= ${item.res}</div>
            `;
            div.addEventListener('click', () => {
                if (isConverterOpen) closeConverter();
                currentInput = item.res;
                expression = '';
                historyPreview.textContent = item.expr + ' =';
                resetOnNextInput = true;
                updateDisplay();
                if (window.innerWidth <= 768) {
                    historySidebar.classList.remove('active');
                    historyToggle.classList.remove('active');
                    isHistoryOpen = false;
                }
            });
            historyList.appendChild(div);
        });
    }

    clearHistoryBtn.addEventListener('click', () => {
        historyData = [];
        localStorage.removeItem('calc_history');
        renderHistory();
    });
});
