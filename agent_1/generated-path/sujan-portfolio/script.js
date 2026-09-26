// Theme Toggle functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check user's saved preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    htmlElement.classList.remove('dark');
} else {
    htmlElement.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Set Current Year in Footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Interactive Claim Adjudication Rules Simulator
const runAdjudicationBtn = document.getElementById('runAdjudicationBtn');
const claimScenario = document.getElementById('claimScenario');
const claimAmountInput = document.getElementById('claimAmount');
const icdCodeInput = document.getElementById('icdCode');
const consoleOutput = document.getElementById('consoleOutput');
const engineStatus = document.getElementById('engineStatus');

// Update fields when scenario changes
claimScenario.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === 'valid') {
        claimAmountInput.value = '$4,500.00';
        icdCodeInput.value = 'Z47.1 (Orthopedic)';
    } else if (val === 'icd_fail') {
        claimAmountInput.value = '$12,250.00';
        icdCodeInput.value = 'E11.9 (Diabetes - Limit Exceeded)';
    } else if (val === 'auth_fail') {
        claimAmountInput.value = '$18,500.00';
        icdCodeInput.value = 'M54.5 (Spine Surgery - No Pre-Auth)';
    } else if (val === 'benefit_fail') {
        claimAmountInput.value = '$2,100.00';
        icdCodeInput.value = 'T14.9 (Cosmetic - Not Covered)';
    }
});

runAdjudicationBtn.addEventListener('click', () => {
    const scenario = claimScenario.value;
    consoleOutput.innerHTML = '';
    engineStatus.textContent = 'RUNNING...';
    engineStatus.className = 'text-yellow-400 font-bold';

    let logs = [
        `[INFO] Initializing Adjudication Engine v4.2...`,
        `[INFO] Parsing Claim Data & Member Policy ID...`,
        `[RULES] Executing Benefit & Cover Check... [OK]`,
        `[RULES] Checking Category Classification... [OK]`
    ];

    setTimeout(() => {
        if (scenario === 'valid') {
            logs.push(
                `[RULES] Validating ICD-10 limit (${icdCodeInput.value})... [PASSED]`,
                `[RULES] Checking Pre-Authorization Status... [VERIFIED]`,
                `[DECISION] Claim successfully adjudicated. STATUS: APPROVED.`
            );
            renderLogs(logs, 'APPROVED', 'text-emerald-400');
        } else if (scenario === 'icd_fail') {
            logs.push(
                `[RULES] Validating ICD-10 limit (${icdCodeInput.value})... [FAILED: Max annual limit reached]`,
                `[RULES] Checking Pre-Authorization Status... [SKIPPED]`,
                `[DECISION] Claim rejected due to ICD-10 limit breach. STATUS: REJECTED.`
            );
            renderLogs(logs, 'REJECTED (ICD LIMIT)', 'text-red-400');
        } else if (scenario === 'auth_fail') {
            logs.push(
                `[RULES] Validating ICD-10 limit (${icdCodeInput.value})... [PASSED]`,
                `[RULES] Checking Pre-Authorization Status... [FAILED: Pre-auth reference not found]`,
                `[DECISION] Claim held/rejected due to missing pre-authorization. STATUS: REJECTED.`
            );
            renderLogs(logs, 'REJECTED (NO PRE-AUTH)', 'text-red-400');
        } else if (scenario === 'benefit_fail') {
            logs.push(
                `[RULES] Executing Benefit & Cover Check... [FAILED: Service excluded from member plan]`,
                `[DECISION] Claim rejected due to policy exclusion. STATUS: REJECTED.`
            );
            renderLogs(logs, 'REJECTED (NOT COVERED)', 'text-red-400');
        }
    }, 600);
});

function renderLogs(logs, statusText, statusClass) {
    consoleOutput.innerHTML = '';
    logs.forEach((log, index) => {
        setTimeout(() => {
            const p = document.createElement('p');
            p.textContent = log;
            if (log.includes('PASSED') || log.includes('[OK]')) {
                p.className = 'text-emerald-400';
            } else if (log.includes('FAILED') || log.includes('REJECTED')) {
                p.className = 'text-red-400';
            } else if (log.includes('APPROVED')) {
                p.className = 'text-emerald-400 font-bold';
            } else {
                p.className = 'text-slate-300';
            }
            consoleOutput.appendChild(p);
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }, index * 200);
    });

    setTimeout(() => {
        engineStatus.textContent = statusText;
        engineStatus.className = statusClass + ' font-bold';
    }, logs.length * 200);
}

// Contact Form submission simulation
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Sending...';

    setTimeout(() => {
        btn.hidden = true;
        contactForm.reset();
        formSuccess.classList.remove('hidden');
    }, 1000);
});
