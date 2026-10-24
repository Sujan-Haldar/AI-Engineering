/* ==========================================================
   MEDICARE PLUS+ | ADVANCED CLINIC & INVENTORY MANAGEMENT SUITE
   ========================================================== */

// --- STATE MANAGEMENT ---
let state = {
    currentRole: 'patient', // 'patient' or 'staff'
    currentSection: 'home',
    cart: [],
    appointments: [
        {
            id: 'APT-1092',
            doctor: 'Dr. Sarah Jenkins',
            specialty: 'Cardiology',
            type: 'In-Clinic Visit',
            date: '2025-05-12',
            time: '10:00 AM - 10:30 AM',
            patientName: 'Alex Morgan',
            phone: '+1 (555) 234-5678',
            email: 'alex@example.com',
            reason: 'Annual heart checkup & ECG review',
            status: 'Confirmed',
            queueNumber: 3,
            queueStatus: 'In Waiting Room'
        },
        {
            id: 'APT-1093',
            doctor: 'Dr. Michael Chen',
            specialty: 'Neurology',
            type: 'Video Telehealth',
            date: '2025-05-13',
            time: '02:00 PM - 02:30 PM',
            patientName: 'Alex Morgan',
            phone: '+1 (555) 234-5678',
            email: 'alex@example.com',
            reason: 'Migraine consultation & MRI follow-up',
            status: 'Confirmed',
            queueNumber: 1,
            queueStatus: 'Upcoming'
        }
    ],
    doctors: [
        {
            id: 1,
            name: 'Dr. Sarah Jenkins',
            specialty: 'Cardiology',
            degree: 'MD, FACC - Chief Cardiologist',
            experience: '14 Years Experience',
            rating: 4.9,
            reviews: 320,
            location: 'Main Branch - Downtown',
            fee: 150,
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
            availableToday: true,
            nextSlot: 'Today, 03:30 PM'
        },
        {
            id: 2,
            name: 'Dr. Michael Chen',
            specialty: 'Neurology',
            degree: 'DM, Ph.D - Senior Neurologist',
            experience: '12 Years Experience',
            rating: 4.8,
            reviews: 245,
            location: 'Westside Medical Hub',
            fee: 180,
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
            availableToday: true,
            nextSlot: 'Today, 04:15 PM'
        },
        {
            id: 3,
            name: 'Dr. Emily Watson',
            specialty: 'Pediatrics',
            degree: 'MBBS, DCH - Pediatric Specialist',
            experience: '9 Years Experience',
            rating: 4.9,
            reviews: 410,
            location: 'North Valley Clinic',
            fee: 120,
            image: 'https://images.unsplash.com/photo-1594824813593-5b8719213bc5?auto=format&fit=crop&q=80&w=400',
            availableToday: true,
            nextSlot: 'Tomorrow, 10:00 AM'
        },
        {
            id: 4,
            name: 'Dr. James Rodriguez',
            specialty: 'Dermatology',
            degree: 'MD - Consultant Dermatologist',
            experience: '11 Years Experience',
            rating: 4.7,
            reviews: 190,
            location: 'Main Branch - Downtown',
            fee: 130,
            image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
            availableToday: false,
            nextSlot: 'Thu, 11:30 AM'
        },
        {
            id: 5,
            name: 'Dr. Aisha Patel',
            specialty: 'Orthopedics',
            degree: 'MS (Ortho), Joint Replacement Surgeon',
            experience: '15 Years Experience',
            rating: 4.9,
            reviews: 512,
            location: 'Westside Medical Hub',
            fee: 160,
            image: 'https://images.unsplash.com/photo-1594824813593-5b8719213bc5?auto=format&fit=crop&q=80&w=400',
            availableToday: true,
            nextSlot: 'Today, 05:00 PM'
        },
        {
            id: 6,
            name: 'Dr. Robert Taylor',
            specialty: 'General Physician',
            degree: 'MBBS, Family Medicine Specialist',
            experience: '18 Years Experience',
            rating: 4.8,
            reviews: 630,
            location: 'Main Branch - Downtown',
            fee: 90,
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
            availableToday: true,
            nextSlot: 'Today, 02:15 PM'
        }
    ],
    inventory: [
        {
            id: 'MED-01',
            name: 'Amoxicillin 500mg',
            category: 'Antibiotics',
            price: 14.50,
            stock: 180,
            rxRequired: true,
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300'
        },
        {
            id: 'MED-02',
            name: 'Paracetamol 650mg (Panadol)',
            category: 'Pain Relief',
            price: 6.00,
            stock: 450,
            rxRequired: false,
            image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=300'
        },
        {
            id: 'MED-03',
            name: 'Atorvastatin 20mg',
            category: 'Cardiovascular',
            price: 24.00,
            stock: 95,
            rxRequired: true,
            image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=300'
        },
        {
            id: 'MED-04',
            name: 'Vitamin D3 1000 IU',
            category: 'Vitamins',
            price: 18.50,
            stock: 12, // Low stock example
            rxRequired: false,
            image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300'
        },
        {
            id: 'MED-05',
            name: 'Ibuprofen 400mg',
            category: 'Pain Relief',
            price: 8.50,
            stock: 320,
            rxRequired: false,
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300'
        },
        {
            id: 'MED-06',
            name: 'Azithromycin 250mg',
            category: 'Antibiotics',
            price: 22.00,
            stock: 64,
            rxRequired: true,
            image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=300'
        },
        {
            id: 'MED-07',
            name: 'Omeprazole 20mg',
            category: 'Gastrointestinal',
            price: 15.00,
            stock: 8, // Low stock
            rxRequired: true,
            image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=300'
        },
        {
            id: 'MED-08',
            name: 'Multivitamin Complex Elite',
            category: 'Vitamins',
            price: 29.99,
            stock: 210,
            rxRequired: false,
            image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300'
        }
    ],
    prescriptions: [
        {
            id: 'RX-8891',
            doctor: 'Dr. Sarah Jenkins',
            date: '2025-04-28',
            diagnosis: 'Mild Hypertension & Fatigue',
            medicines: ['Atorvastatin 20mg - 1 daily', 'Vitamin D3 1000 IU - 1 daily']
        },
        {
            id: 'RX-8842',
            doctor: 'Dr. Michael Chen',
            date: '2025-03-15',
            diagnosis: 'Tension Headache',
            medicines: ['Ibuprofen 400mg - As needed']
        }
    ],
    departments: [
        { name: 'Cardiology', icon: 'fa-heart-pulse', doctorsCount: 6, desc: 'Advanced heart care, ECG, echocardiogram, and bypass surgery counseling.' },
        { name: 'Neurology', icon: 'fa-brain', doctorsCount: 5, desc: 'Comprehensive treatment for migraines, stroke, epilepsy, and neurological disorders.' },
        { name: 'Pediatrics', icon: 'fa-child-reaching', doctorsCount: 8, desc: 'Dedicated child healthcare, vaccination schedules, and newborn neonatal care.' },
        { name: 'Dermatology', icon: 'fa-hand-dots', doctorsCount: 4, desc: 'Skin care treatments, acne therapy, laser dermatology, and anti-aging.' },
        { name: 'Orthopedics', icon: 'fa-bone', doctorsCount: 7, desc: 'Joint replacement, fracture care, spine surgery, and physical rehabilitation.' },
        { name: 'General Physician', icon: 'fa-user-doctor', doctorsCount: 15, desc: 'Primary care, annual health checkups, diagnostics, and preventative care.' }
    ],
    billing: [
        { id: 'INV-5091', service: 'Cardiology Consultation (Dr. Sarah Jenkins)', date: '2025-04-28', amount: 150.00, status: 'Paid' },
        { id: 'INV-4820', service: 'E-Pharmacy Order #MED-8891', date: '2025-04-29', amount: 42.50, status: 'Paid' },
        { id: 'INV-5122', service: 'Neurology Consultation (Dr. Michael Chen)', date: '2025-05-02', amount: 180.00, status: 'Pending' }
    ]
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderHomeDoctors();
    renderHomeInventory();
    renderDoctorsPage();
    renderBookingDoctorsDropdown();
    renderInventoryGrid();
    renderDepartmentsGrid();
    renderMyAppointments();
    renderMyPrescriptions();
    renderBillingTable();
    renderAdminDashboard();
    updateCartBadge();
    setDefaultDate();
});

function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('booking-date');
    if (dateInput) dateInput.value = today;
}

// --- NAVIGATION & ROLE SWITCHING ---
function showSection(sectionId) {
    if (sectionId === 'admin' && state.currentRole !== 'staff') {
        showToast('Access Restricted', 'Please switch to Staff / Admin mode from the top bar.', 'error');
        return;
    }

    state.currentSection = sectionId;
    document.querySelectorAll('.page-section').forEach(el => el.classList.add('hidden'));
    
    const target = document.getElementById(`section-${sectionId}`);
    if (target) target.classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update nav active states
    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('text-brand-600', 'bg-brand-50'));
}

function switchRole(role) {
    state.currentRole = role;
    const patientBtn = document.getElementById('switch-patient-btn');
    const staffBtn = document.getElementById('switch-staff-btn');
    const staffAddBtn = document.getElementById('staff-add-med-btn');

    if (role === 'staff') {
        patientBtn.className = 'text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-medium transition';
        staffBtn.className = 'text-xs px-2.5 py-1 rounded bg-amber-600 text-white font-medium transition';
        if (staffAddBtn) staffAddBtn.classList.remove('hidden');
        showToast('Staff Mode Activated', 'Welcome Administrator. You have full clinic control rights.', 'success');
        showSection('admin');
    } else {
        patientBtn.className = 'text-xs px-2.5 py-1 rounded bg-brand-600 text-white font-medium transition';
        staffBtn.className = 'text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-medium transition';
        if (staffAddBtn) staffAddBtn.classList.add('hidden');
        showToast('Patient Portal Activated', 'Viewing as patient user.', 'success');
        showSection('home');
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}


// --- RENDERING FUNCTIONS ---

function renderHomeDoctors() {
    const container = document.getElementById('home-doctors-grid');
    if (!container) return;

    const topDocs = state.doctors.slice(0, 3);
    container.innerHTML = topDocs.map(doc => `
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition flex flex-col justify-between">
            <div>
                <div class="relative mb-4">
                    <img src="${doc.image}" alt="${doc.name}" class="w-full h-52 object-cover rounded-2xl">
                    <span class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1">
                        <i class="fa-solid fa-star text-amber-400"></i> ${doc.rating} (${doc.reviews})
                    </span>
                    <span class="absolute bottom-3 left-3 bg-brand-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                        ${doc.specialty}
                    </span>
                </div>
                <h3 class="font-extrabold text-slate-900 text-lg">${doc.name}</h3>
                <p class="text-xs text-brand-600 font-semibold mb-1">${doc.degree}</p>
                <p class="text-xs text-slate-500 mb-4 flex items-center gap-1.5"><i class="fa-solid fa-location-dot text-slate-400"></i> ${doc.location}</p>
            </div>
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                    <span class="text-[10px] text-slate-400 uppercase font-bold block">Consultation Fee</span>
                    <span class="text-base font-black text-slate-900">$${doc.fee}</span>
                </div>
                <button onclick="quickBookDoctor('${doc.name}', '${doc.specialty}')" class="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition shadow-md shadow-brand-500/20">
                    Book Now
                </button>
            </div>
        </div>
    `).join('');
}

function renderHomeInventory() {
    const container = document.getElementById('home-inventory-preview');
    if (!container) return;

    const previewMeds = state.inventory.slice(0, 4);
    container.innerHTML = previewMeds.map(med => `
        <div class="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-700">
            <div class="flex items-center gap-3">
                <img src="${med.image}" alt="${med.name}" class="w-10 h-10 rounded-lg object-cover">
                <div>
                    <h4 class="font-bold text-white text-sm">${med.name}</h4>
                    <span class="text-[11px] text-slate-400">${med.category}</span>
                </div>
            </div>
            <div class="text-right">
                <div class="text-sm font-black text-brand-400">$${med.price.toFixed(2)}</div>
                <span class="text-[10px] px-2 py-0.5 rounded ${med.stock < 15 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400'}">
                    ${med.stock} in stock
                </span>
            </div>
        </div>
    `).join('');
}

function renderDoctorsPage() {
    const container = document.getElementById('doctors-grid');
    if (!container) return;

    const searchVal = document.getElementById('doctor-search')?.value.toLowerCase() || '';
    const specVal = document.getElementById('doctor-filter-specialty')?.value || '';

    const filtered = state.doctors.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchVal) || doc.specialty.toLowerCase().includes(searchVal);
        const matchesSpec = specVal === '' || doc.specialty === specVal;
        return matchesSearch && matchesSpec;
    });

    const countEl = document.getElementById('doctor-count');
    if (countEl) countEl.innerText = `Showing ${filtered.length} doctors`;

    container.innerHTML = filtered.map(doc => `
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition flex flex-col justify-between">
            <div>
                <div class="relative mb-4">
                    <img src="${doc.image}" alt="${doc.name}" class="w-full h-56 object-cover rounded-2xl">
                    <span class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1">
                        <i class="fa-solid fa-star text-amber-400"></i> ${doc.rating} (${doc.reviews})
                    </span>
                    <span class="absolute bottom-3 left-3 bg-brand-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                        ${doc.specialty}
                    </span>
                </div>
                <h3 class="font-extrabold text-slate-900 text-lg">${doc.name}</h3>
                <p class="text-xs text-brand-600 font-semibold mb-1">${doc.degree}</p>
                <p class="text-xs text-slate-500 mb-2">${doc.experience}</p>
                <p class="text-xs text-slate-500 mb-4 flex items-center gap-1.5"><i class="fa-solid fa-location-dot text-slate-400"></i> ${doc.location}</p>
                <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-600 mb-4 flex items-center justify-between">
                    <span>Next Available:</span>
                    <strong class="text-brand-600">${doc.nextSlot}</strong>
                </div>
            </div>
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                    <span class="text-[10px] text-slate-400 uppercase font-bold block">Consultation</span>
                    <span class="text-lg font-black text-slate-900">$${doc.fee}</span>
                </div>
                <button onclick="quickBookDoctor('${doc.name}', '${doc.specialty}')" class="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition shadow-md shadow-brand-500/20">
                    Book Appointment
                </button>
            </div>
        </div>
    `).join('');
}

function filterDoctors() {
    renderDoctorsPage();
}

function renderBookingDoctorsDropdown() {
    const select = document.getElementById('booking-doctor');
    if (!select) return;

    select.innerHTML = `<option value="">-- Choose Doctor --</option>` + state.doctors.map(doc => `
        <option value="${doc.name} (${doc.specialty})">${doc.name} - ${doc.specialty} ($${doc.fee})</option>
    `).join('');
}

function quickBookDoctor(doctorName, specialty) {
    showSection('booking');
    const select = document.getElementById('booking-doctor');
    if (select) {
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text.includes(doctorName)) {
                select.selectedIndex = i;
                break;
            }
        }
    }
    showToast('Doctor Selected', `Ready to book appointment with ${doctorName}`, 'success');
}

function handleHeroSearch() {
    const spec = document.getElementById('hero-specialty').value;
    showSection('doctors');
    const filterSelect = document.getElementById('doctor-filter-specialty');
    if (filterSelect) {
        filterSelect.value = spec;
        filterDoctors();
    }
}

function renderInventoryGrid() {
    const container = document.getElementById('inventory-grid');
    if (!container) return;

    const searchVal = document.getElementById('pharmacy-search')?.value.toLowerCase() || '';
    const activeCategory = window.currentPharmacyCategory || 'All';

    const filtered = state.inventory.filter(med => {
        const matchesSearch = med.name.toLowerCase().includes(searchVal) || med.category.toLowerCase().includes(searchVal);
        const matchesCat = activeCategory === 'All' || med.category === activeCategory;
        return matchesSearch && matchesCat;
    });

    container.innerHTML = filtered.map(med => `
        <div class="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 hover:shadow-xl transition flex flex-col justify-between">
            <div>
                <div class="relative mb-4">
                    <img src="${med.image}" alt="${med.name}" class="w-full h-40 object-cover rounded-2xl">
                    <span class="absolute top-3 right-3 ${med.rxRequired ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'} text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ${med.rxRequired ? 'Rx Required' : 'OTC'}
                    </span>
                    <span class="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                        ${med.category}
                    </span>
                </div>
                <h3 class="font-extrabold text-slate-900 text-base mb-1">${med.name}</h3>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-lg font-black text-brand-600">$${med.price.toFixed(2)}</span>
                    <span class="text-xs font-semibold ${med.stock < 15 ? 'text-amber-600 bg-amber-50 px-2 py-0.5 rounded' : 'text-slate-500'}">
                        Stock: ${med.stock} units
                    </span>
                </div>
            </div>
            <button onclick="addToCart('${med.id}')" class="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md shadow-brand-500/20">
                <i class="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    `).join('');
}

function filterInventory() {
    renderInventoryGrid();
}

function filterCategory(cat) {
    window.currentPharmacyCategory = cat;
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.className = btn.textContent.trim() === cat || (cat === 'All' && btn.textContent.trim() === 'All Items')
            ? 'category-btn px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 text-white transition whitespace-nowrap'
            : 'category-btn px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition whitespace-nowrap';
    });
    renderInventoryGrid();
}

function renderDepartmentsGrid() {
    const container = document.getElementById('departments-grid');
    if (!container) return;

    container.innerHTML = state.departments.map(dept => `
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:border-brand-500 hover:shadow-xl transition group">
            <div class="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center text-2xl mb-4 group-hover:bg-brand-600 group-hover:text-white transition">
                <i class="fa-solid ${dept.icon}"></i>
            </div>
            <h3 class="font-extrabold text-slate-900 text-lg mb-1">${dept.name}</h3>
            <p class="text-xs font-semibold text-brand-600 mb-3">${dept.doctorsCount} Expert Specialists Available</p>
            <p class="text-xs text-slate-500 mb-6 leading-relaxed">${dept.desc}</p>
            <button onclick="quickBookDoctor('', '${dept.name}')" class="w-full bg-slate-100 hover:bg-brand-600 hover:text-white text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition">
                Consult ${dept.name}
            </button>
        </div>
    `).join('');
}

function renderMyAppointments() {
    const container = document.getElementById('my-appointments-list');
    const countEl = document.getElementById('count-my-appts');
    if (!container) return;

    if (countEl) countEl.innerText = state.appointments.length;

    if (state.appointments.length === 0) {
        container.innerHTML = `<div class="bg-white p-8 rounded-2xl text-center border border-slate-200 text-slate-400 text-sm">No active appointments found. Book your first visit today!</div>`;
        return;
    }

    container.innerHTML = state.appointments.map(apt => `
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div class="space-y-1">
                <div class="flex items-center gap-2">
                    <span class="bg-brand-100 text-brand-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">${apt.id}</span>
                    <span class="text-xs text-slate-400">${apt.type}</span>
                </div>
                <h3 class="font-bold text-slate-900 text-lg">${apt.doctor} (${apt.specialty})</h3>
                <p class="text-xs text-slate-500"><i class="fa-regular fa-calendar text-brand-600 mr-1"></i> ${apt.date} | <i class="fa-regular fa-clock text-brand-600 ml-2 mr-1"></i> ${apt.time}</p>
                <p class="text-xs text-slate-600 bg-slate-50 p-2 rounded-xl mt-2 border border-slate-100"><strong>Reason:</strong> ${apt.reason}</p>
            </div>
            <div class="flex flex-col items-end gap-2">
                <div class="flex items-center gap-2">
                    <span class="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-bold">
                        <i class="fa-solid fa-person-walking-arrow-right mr-1"></i> Queue #${apt.queueNumber}: ${apt.queueStatus}
                    </span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <button onclick="cancelAppointment('${apt.id}')" class="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition">Cancel</button>
                    <button onclick="showToast('Video Call', 'Connecting to secure telehealth video room with ' + '${apt.doctor}', 'success')" class="bg-brand-600 hover:bg-brand-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm">Join Video Call</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderMyPrescriptions() {
    const container = document.getElementById('my-prescriptions-grid');
    if (!container) return;

    container.innerHTML = state.prescriptions.map(rx => `
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
            <div class="flex justify-between items-start">
                <div>
                    <span class="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">${rx.id}</span>
                    <h3 class="font-bold text-slate-900 text-base mt-1">${rx.doctor}</h3>
                    <p class="text-xs text-slate-400">Issued on: ${rx.date}</p>
                </div>
                <button onclick="orderPrescriptionMeds('${rx.id}')" class="bg-brand-50 text-brand-600 hover:bg-brand-600 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition">
                    Order Refill <i class="fa-solid fa-arrow-right ml-1"></i>
                </button>
            </div>
            <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <strong class="text-slate-700 block mb-1">Diagnosis:</strong>
                <p class="text-slate-600">${rx.diagnosis}</p>
            </div>
            <div>
                <strong class="text-xs text-slate-700 uppercase block mb-2">Prescribed Medications:</strong>
                <ul class="space-y-1.5 text-xs text-slate-600">
                    ${rx.medicines.map(m => `<li class="flex items-center gap-2"><i class="fa-solid fa-pills text-brand-600"></i> ${m}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

function renderBillingTable() {
    const container = document.getElementById('billing-table-body');
    if (!container) return;

    container.innerHTML = state.billing.map(b => `
        <tr class="hover:bg-slate-50/50">
            <td class="p-4 font-bold text-slate-900">${b.id}</td>
            <td class="p-4 text-slate-700">${b.service}</td>
            <td class="p-4 text-slate-500">${b.date}</td>
            <td class="p-4 font-black text-slate-900">$${b.amount.toFixed(2)}</td>
            <td class="p-4">
                <span class="px-2.5 py-1 rounded-full text-xs font-bold ${b.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                    ${b.status}
                </span>
            </td>
            <td class="p-4 text-right">
                ${b.status === 'Pending' ? `<button onclick="payInvoice('${b.id}')" class="bg-brand-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-brand-700">Pay Now</button>` : `<button onclick="showToast('Invoice', 'Downloading PDF receipt for ' + '${b.id}', 'success')" class="text-slate-500 hover:text-slate-800 text-xs font-semibold"><i class="fa-solid fa-download mr-1"></i> PDF</button>`}
            </td>
        </tr>
    `).join('');
}

function renderAdminDashboard() {
    const apptsTable = document.getElementById('admin-appointments-table');
    const statAppts = document.getElementById('admin-stat-appts');
    const statMeds = document.getElementById('admin-stat-meds');
    const statLowStock = document.getElementById('admin-stat-lowstock');

    if (statAppts) statAppts.innerText = state.appointments.length;
    if (statMeds) statMeds.innerText = state.inventory.length;

    const lowStockCount = state.inventory.filter(m => m.stock < 15).length;
    if (statLowStock) statLowStock.innerText = lowStockCount;

    if (!apptsTable) return;

    apptsTable.innerHTML = state.appointments.map(apt => `
        <tr class="hover:bg-slate-50/50">
            <td class="p-4 font-bold text-slate-900">${apt.patientName}<br><span class="text-[11px] font-normal text-slate-400">${apt.phone}</span></td>
            <td class="p-4 text-slate-700">${apt.doctor}</td>
            <td class="p-4"><span class="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-lg">${apt.type}</span></td>
            <td class="p-4 text-slate-500">${apt.date}<br>${apt.time}</td>
            <td class="p-4">
                <select onchange="updateQueueStatus('${apt.id}', this.value)" class="text-xs bg-brand-50 border border-brand-200 text-brand-800 font-semibold px-2.5 py-1.5 rounded-lg focus:outline-none cursor-pointer">
                    <option value="In Waiting Room" ${apt.queueStatus === 'In Waiting Room' ? 'selected' : ''}>In Waiting Room</option>
                    <option value="With Doctor" ${apt.queueStatus === 'With Doctor' ? 'selected' : ''}>With Doctor</option>
                    <option value="Consultation Completed" ${apt.queueStatus === 'Consultation Completed' ? 'selected' : ''}>Completed</option>
                    <option value="Upcoming" ${apt.queueStatus === 'Upcoming' ? 'selected' : ''}>Upcoming</option>
                </select>
            </td>
            <td class="p-4 text-right">
                <button onclick="cancelAppointment('${apt.id}'); renderAdminDashboard();" class="text-red-600 hover:bg-red-50 p-2 rounded-lg text-xs font-semibold"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}


// --- ACTIONS & INTERACTIVITY ---

function submitAppointment(event) {
    event.preventDefault();
    const doc = document.getElementById('booking-doctor').value;
    const type = document.getElementById('booking-type').value;
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const name = document.getElementById('patient-name').value;
    const phone = document.getElementById('patient-phone').value;
    const email = document.getElementById('patient-email').value;
    const reason = document.getElementById('patient-reason').value || 'General consultation';

    const newApt = {
        id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
        doctor: doc.split('(')[0].trim(),
        specialty: doc.includes('(') ? doc.split('(')[1].replace(')', '') : 'General',
        type,
        date,
        time,
        patientName: name,
        phone,
        email,
        reason,
        status: 'Confirmed',
        queueNumber: state.appointments.length + 1,
        queueStatus: 'Upcoming'
    };

    state.appointments.unshift(newApt);
    renderMyAppointments();
    renderAdminDashboard();
    showToast('Appointment Confirmed!', `Booking ID ${newApt.id} scheduled successfully.`, 'success');
    showSection('records');
    document.getElementById('appointment-form').reset();
    setDefaultDate();
}

function cancelAppointment(aptId) {
    state.appointments = state.appointments.filter(a => a.id !== aptId);
    renderMyAppointments();
    renderAdminDashboard();
    showToast('Appointment Cancelled', `Booking ${aptId} has been cancelled.`, 'error');
}

function updateQueueStatus(aptId, newStatus) {
    const apt = state.appointments.find(a => a.id === aptId);
    if (apt) {
        apt.queueStatus = newStatus;
        showToast('Queue Updated', `Appointment ${aptId} is now: ${newStatus}`, 'success');
        renderAdminDashboard();
    }
}

// CART & PHARMACY
function addToCart(medId) {
    const med = state.inventory.find(m => m.id === medId);
    if (!med) return;

    const existing = state.cart.find(item => item.id === medId);
    if (existing) {
        existing.qty += 1;
    } else {
        state.cart.push({ ...med, qty: 1 });
    }
    updateCartBadge();
    showToast('Added to Cart', `${med.name} added to your E-Pharmacy cart.`, 'success');
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
    if (badge) badge.innerText = totalQty;
}

function openCartModal() {
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    if (state.cart.length === 0) {
        container.innerHTML = `<p class="text-slate-400 text-center py-6 text-sm">Your pharmacy cart is currently empty.</p>`;
        subtotalEl.innerText = '$0.00';
        totalEl.innerText = '$0.00';
    } else {
        container.innerHTML = state.cart.map(item => `
            <div class="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div class="flex items-center gap-3">
                    <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-xl object-cover">
                    <div>
                        <h4 class="font-bold text-slate-900 text-sm">${item.name}</h4>
                        <span class="text-xs text-brand-600 font-semibold">$${item.price.toFixed(2)} each</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-lg border border-slate-200">Qty: ${item.qty}</span>
                    <button onclick="removeFromCart('${item.id}')" class="text-red-500 hover:text-red-700 p-1"><i class="fa-solid fa-trash text-xs"></i></button>
                </div>
            </div>
        `).join('');

        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
        totalEl.innerText = `$${subtotal.toFixed(2)}`;
    }

    document.getElementById('modal-cart').classList.remove('hidden');
}

function closeCartModal() {
    document.getElementById('modal-cart').classList.add('hidden');
}

function removeFromCart(medId) {
    state.cart = state.cart.filter(item => item.id !== medId);
    updateCartBadge();
    openCartModal();
}

function checkoutCart() {
    if (state.cart.length === 0) return;
    const total = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    // Add to billing
    state.billing.unshift({
        id: 'INV-' + Math.floor(1000 + Math.random() * 9000),
        service: `E-Pharmacy Order (${state.cart.length} items)`,
        date: new Date().toISOString().split('T')[0],
        amount: total,
        status: 'Paid'
    });

    state.cart = [];
    updateCartBadge();
    closeCartModal();
    renderBillingTable();
    showToast('Order Successful!', 'Your medicine order has been placed for express delivery.', 'success');
}

function payInvoice(invId) {
    const inv = state.billing.find(b => b.id === invId);
    if (inv) {
        inv.status = 'Paid';
        renderBillingTable();
        showToast('Payment Successful', `Invoice ${invId} has been successfully paid.`, 'success');
    }
}

function orderPrescriptionMeds(rxId) {
    showToast('Prescription Refill', `Refill order for ${rxId} added to E-Pharmacy cart.`, 'success');
    addToCart('MED-01');
    showSection('pharmacy');
}

// ADD MEDICINE MODAL
function openAddMedicineModal() {
    document.getElementById('modal-add-med').classList.remove('hidden');
}

function closeAddMedicineModal() {
    document.getElementById('modal-add-med').classList.add('hidden');
}

function submitNewMedicine(event) {
    event.preventDefault();
    const name = document.getElementById('new-med-name').value;
    const category = document.getElementById('new-med-cat').value;
    const price = parseFloat(document.getElementById('new-med-price').value);
    const stock = parseInt(document.getElementById('new-med-stock').value);
    const rxRequired = document.getElementById('new-med-rx').value === 'true';
    const image = document.getElementById('new-med-img').value || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300';

    const newMed = {
        id: 'MED-' + Math.floor(10 + Math.random() * 90),
        name,
        category,
        price,
        stock,
        rxRequired,
        image
    };

    state.inventory.unshift(newMed);
    renderInventoryGrid();
    renderHomeInventory();
    renderAdminDashboard();
    closeAddMedicineModal();
    document.getElementById('add-medicine-form').reset();
    showToast('Medicine Added', `${name} successfully added to inventory.`, 'success');
}

// AI SYMPTOM CHECKER
function openSymptomChecker() {
    document.getElementById('modal-symptom').classList.remove('hidden');
}

function closeSymptomChecker() {
    document.getElementById('modal-symptom').classList.add('hidden');
    document.getElementById('ai-result-box').classList.add('hidden');
    document.getElementById('symptom-input').value = '';
}

function runAiAnalysis() {
    const input = document.getElementById('symptom-input').value.trim();
    if (!input) {
        showToast('Input Required', 'Please enter your symptoms.', 'error');
        return;
    }

    const resultBox = document.getElementById('ai-result-box');
    const resultText = document.getElementById('ai-result-text');
    const bookBtn = document.getElementById('ai-book-btn');

    resultBox.classList.remove('hidden');
    resultText.innerHTML = 'Analyzing symptoms with AI clinical engine...';

    setTimeout(() => {
        let specialty = 'General Physician';
        let advice = 'Based on your symptoms, we recommend consulting our General Physician for primary diagnostics and vitals check.';

        const lower = input.toLowerCase();
        if (lower.includes('chest') || lower.includes('heart') || lower.includes('palpitation') || lower.includes('breath')) {
            specialty = 'Cardiology';
            advice = 'Your symptoms indicate potential cardiovascular involvement. Immediate consultation with our Chief Cardiologist is advised.';
        } else if (lower.includes('headache') || lower.includes('dizziness') || lower.includes('migraine') || lower.includes('numb')) {
            specialty = 'Neurology';
            advice = 'Symptoms point toward neurological evaluation. Recommended specialist: Dr. Michael Chen (Neurologist).';
        } else if (lower.includes('skin') || lower.includes('rash') || lower.includes('itch')) {
            specialty = 'Dermatology';
            advice = 'Skin manifestation detected. Recommended specialist: Dr. James Rodriguez (Dermatologist).';
        } else if (lower.includes('bone') || lower.includes('joint') || lower.includes('knee') || lower.includes('pain')) {
            specialty = 'Orthopedics';
            advice = 'Musculoskeletal concern noted. Recommended specialist: Dr. Aisha Patel (Orthopedic Surgeon).';
        }

        resultText.innerHTML = `<strong>Recommended Department: <span class="text-brand-900">${specialty}</span></strong><br>${advice}`;
        bookBtn.setAttribute('onclick', `closeSymptomChecker(); quickBookDoctor('', '${specialty}');`);
    }, 1000);
}

// TOAST NOTIFICATIONS
function showToast(title, message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    toastTitle.innerText = title;
    toastMessage.innerText = message;

    if (type === 'success') {
        toastIcon.className = 'fa-solid fa-circle-check text-brand-400 text-lg';
    } else {
        toastIcon.className = 'fa-solid fa-triangle-exclamation text-amber-400 text-lg';
    }

    toast.classList.remove('translate-y-32', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-32', 'opacity-0');
    }, 3500);
}
