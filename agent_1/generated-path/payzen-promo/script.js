/* ==========================================
   PayZen Interactive Prototype JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('light-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Interactive Simulator Logic
    const productSelect = document.getElementById('productSelect');
    const currencyPills = document.querySelectorAll('.currency-pills .pill');
    const methodCards = document.querySelectorAll('.method-card');
    const biometricToggle = document.getElementById('biometricToggle');
    
    const summaryProductName = document.getElementById('summaryProductName');
    const summaryProductPrice = document.getElementById('summaryProductPrice');
    const payButtonAmount = document.getElementById('payButtonAmount');
    const installmentsAmount = document.getElementById('installmentsAmount');

    const payForms = {
        card: document.getElementById('view-card'),
        apple: document.getElementById('view-apple'),
        crypto: document.getElementById('view-crypto'),
        klarna: document.getElementById('view-klarna')
    };

    const payNowBtn = document.getElementById('payNowBtn');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const receiptAmount = document.getElementById('receiptAmount');
    const txIdCode = document.getElementById('txIdCode');

    let currentPrice = 49.00;
    let currentSymbol = '$';

    // Update Pricing & Product
    function updatePricingDisplay() {
        const selectedOption = productSelect.options[productSelect.selectedIndex];
        currentPrice = parseFloat(selectedOption.value);
        const productName = selectedOption.getAttribute('data-name');

        summaryProductName.textContent = productName;
        
        let formattedPrice = `${currentSymbol}${currentPrice.toFixed(2)}`;
        if(currentSymbol === '⚡') {
            formattedPrice = `${currentPrice} USDC`;
        }

        summaryProductPrice.textContent = formattedPrice;
        payButtonAmount.textContent = formattedPrice;

        const klarnaVal = (currentPrice / 4).toFixed(2);
        installmentsAmount.textContent = `${currentSymbol}${klarnaVal}`;
    }

    productSelect.addEventListener('change', updatePricingDisplay);

    // Currency Pills
    currencyPills.forEach(pill => {
        pill.addEventListener('click', () => {
            currencyPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentSymbol = pill.getAttribute('data-sym');
            updatePricingDisplay();
        });
    });

    // Payment Methods Switcher
    methodCards.forEach(card => {
        card.addEventListener('click', () => {
            methodCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            const method = card.getAttribute('data-method');
            Object.values(payForms).forEach(form => form.style.display = 'none');
            if (payForms[method]) {
                payForms[method].style.display = 'block';
            }
        });
    });

    // Pay Now Trigger
    payNowBtn.addEventListener('click', () => {
        payNowBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing Securely...`;
        payNowBtn.disabled = true;

        setTimeout(() => {
            payNowBtn.innerHTML = `<span>Pay <span id="payButtonAmount">${summaryProductPrice.textContent}</span></span><i class="fa-solid fa-shield-check"></i>`;
            payNowBtn.disabled = false;

            receiptAmount.textContent = summaryProductPrice.textContent;
            txIdCode.textContent = `#PZ-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
            successModal.classList.add('active');
        }, 1200);
    });

    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Waitlist Form Handler
    const waitlistForm = document.getElementById('waitlistForm');
    const waitlistEmail = document.getElementById('waitlistEmail');
    const waitlistSuccess = document.getElementById('waitlistSuccess');

    waitlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (waitlistEmail.value.trim() !== '') {
            waitlistForm.style.display = 'none';
            waitlistSuccess.style.display = 'flex';
        }
    });
});
