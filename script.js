// Global variables
let currentUser = null;
let services = [];
let users = [];
let conversations = [];
let currentConversation = null;
let bookings = [];

// Sample data
const sampleServices = [
    {
        id: 1,
        name: "Čišćenje kuće",
        description: "Profesionalno čišćenje kuće i stanova",
        icon: "fas fa-broom",
        price: "500 RSD/sat",
        rating: 4.9,
        reviews: 23,
        provider: {
            name: "Ana Marić",
            avatar: "https://via.placeholder.com/60x60/4F46E5/FFFFFF?text=AM",
            location: "Beograd"
        }
    },
    {
        id: 2,
        name: "Peglanje",
        description: "Peglanje odeće i posteljine",
        icon: "fas fa-tshirt",
        price: "300 RSD/sat",
        rating: 4.8,
        reviews: 15,
        provider: {
            name: "Milica Petrović",
            avatar: "https://via.placeholder.com/60x60/10B981/FFFFFF?text=MP",
            location: "Novi Sad"
        }
    },
    {
        id: 3,
        name: "Čuvanje dece",
        description: "Čuvanje dece svih uzrasta",
        icon: "fas fa-baby",
        price: "400 RSD/sat",
        rating: 4.9,
        reviews: 31,
        provider: {
            name: "Jovana Nikolić",
            avatar: "https://via.placeholder.com/60x60/F59E0B/FFFFFF?text=JN",
            location: "Beograd"
        }
    },
    {
        id: 4,
        name: "Čuvanje ljubimaca",
        description: "Čuvanje pasa i mačaka",
        icon: "fas fa-paw",
        price: "350 RSD/sat",
        rating: 4.7,
        reviews: 18,
        provider: {
            name: "Marko Jovanović",
            avatar: "https://via.placeholder.com/60x60/EF4444/FFFFFF?text=MJ",
            location: "Niš"
        }
    },
    {
        id: 5,
        name: "Sečenje drva",
        description: "Sečenje i priprema drva za ogrev",
        icon: "fas fa-tree",
        price: "600 RSD/sat",
        rating: 4.8,
        reviews: 12,
        provider: {
            name: "Stefan Đorđević",
            avatar: "https://via.placeholder.com/60x60/8B5CF6/FFFFFF?text=SĐ",
            location: "Kragujevac"
        }
    },
    {
        id: 6,
        name: "Kuvanje",
        description: "Priprema obroka i kuvanje",
        icon: "fas fa-utensils",
        price: "450 RSD/sat",
        rating: 4.9,
        reviews: 25,
        provider: {
            name: "Sofija Radović",
            avatar: "https://via.placeholder.com/60x60/EC4899/FFFFFF?text=SR",
            location: "Beograd"
        }
    }
];

const sampleUsers = [
    {
        id: 1,
        name: "Ana Marić",
        email: "ana@example.com",
        password: "123456",
        type: "provider",
        avatar: "https://via.placeholder.com/120x120/4F46E5/FFFFFF?text=AM",
        location: "Beograd",
        phone: "+381 11 123 4567",
        providerRating: 4.9,
        providerReviews: 23,
        clientRating: 4.8,
        clientReviews: 5,
        services: ["Čišćenje kuće", "Peglanje"],
        description: "Profesionalno čišćenje kuće i stanova. 5 godina iskustva. Dostupna svakim danom.",
        joined: "2023-01-15"
    },
    {
        id: 2,
        name: "Marko Petrović",
        email: "marko@example.com",
        password: "123456",
        type: "client",
        avatar: "https://via.placeholder.com/120x120/10B981/FFFFFF?text=MP",
        location: "Novi Sad",
        phone: "+381 21 987 6543",
        clientRating: 4.9,
        clientReviews: 12,
        joined: "2023-02-20"
    }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadServices();
    setupEventListeners();
});

function initializeApp() {
    // Load data from localStorage
    const savedServices = localStorage.getItem('helper-services');
    const savedUsers = localStorage.getItem('helper-users');
    const savedUser = localStorage.getItem('helper-current-user');
    const savedBookings = localStorage.getItem('helper-bookings');
    const savedConversations = localStorage.getItem('helper-conversations');
    
    services = savedServices ? JSON.parse(savedServices) : sampleServices;
    users = savedUsers ? JSON.parse(savedUsers) : sampleUsers;
    currentUser = savedUser ? JSON.parse(savedUser) : null;
    bookings = savedBookings ? JSON.parse(savedBookings) : [];
    
    // Initialize sample conversations if none exist
    if (!savedConversations) {
        const sampleConversations = [
            {
                id: 'conv-1',
                user1Id: 1,
                user1Name: 'Ana Marić',
                user2Id: 2,
                user2Name: 'Marko Petrović',
                messages: [
                    {
                        id: 1,
                        senderId: 1,
                        senderName: 'Ana Marić',
                        text: 'Zdravo! Vidim da tražite usluge čišćenja. Kada biste želeli da dođem?',
                        timestamp: new Date(Date.now() - 7200000).toISOString()
                    },
                    {
                        id: 2,
                        senderId: 2,
                        senderName: 'Marko Petrović',
                        text: 'Zdravo! Možete li doći sutra u 10h?',
                        timestamp: new Date(Date.now() - 7080000).toISOString()
                    },
                    {
                        id: 3,
                        senderId: 1,
                        senderName: 'Ana Marić',
                        text: 'Naravno! Sutra u 10h je u redu. Koliko je prostorija?',
                        timestamp: new Date(Date.now() - 7020000).toISOString()
                    },
                    {
                        id: 4,
                        senderId: 2,
                        senderName: 'Marko Petrović',
                        text: '3 sobe, kuhinja i kupatilo. Cena?',
                        timestamp: new Date(Date.now() - 6960000).toISOString()
                    },
                    {
                        id: 5,
                        senderId: 1,
                        senderName: 'Ana Marić',
                        text: '500 RSD po satu, trebalo bi oko 4 sata. Ukupno 2000 RSD.',
                        timestamp: new Date(Date.now() - 6900000).toISOString()
                    },
                    {
                        id: 6,
                        senderId: 2,
                        senderName: 'Marko Petrović',
                        text: 'Odlično! Vidimo se sutra u 10h. Hvala!',
                        timestamp: new Date(Date.now() - 6840000).toISOString()
                    }
                ]
            },
            {
                id: 'conv-2',
                user1Id: 3,
                user1Name: 'Jovana Nikolić',
                user2Id: 4,
                user2Name: 'Stefan Đorđević',
                messages: [
                    {
                        id: 1,
                        senderId: 3,
                        senderName: 'Jovana Nikolić',
                        text: 'Kada biste mogli da dođete da sečete drva?',
                        timestamp: new Date(Date.now() - 18000000).toISOString()
                    },
                    {
                        id: 2,
                        senderId: 4,
                        senderName: 'Stefan Đorđević',
                        text: 'Mogu sutra popodne oko 15h. Da li vam odgovara?',
                        timestamp: new Date(Date.now() - 17700000).toISOString()
                    },
                    {
                        id: 3,
                        senderId: 3,
                        senderName: 'Jovana Nikolić',
                        text: 'Perfektno! Vidimo se sutra.',
                        timestamp: new Date(Date.now() - 17400000).toISOString()
                    }
                ]
            }
        ];
        localStorage.setItem('helper-conversations', JSON.stringify(sampleConversations));
    }
    
    // Update UI based on login status
    updateNavigation();
}

function loadServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = '';
    
    services.forEach(service => {
        const serviceCard = createServiceCard(service);
        servicesGrid.appendChild(serviceCard);
    });
}

function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
        <div class="service-icon">
            <i class="${service.icon}"></i>
        </div>
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <div class="service-stats">
            <div class="service-price">${service.price}</div>
            <div class="service-rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <span>${service.rating} (${service.reviews})</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        showServiceDetails(service);
    });
    
    return card;
}

function showServiceDetails(service) {
    // Navigate to category page
    const categoryMap = {
        'Čišćenje kuće': 'cleaning',
        'Peglanje': 'ironing',
        'Čuvanje dece': 'babysitting',
        'Čuvanje ljubimaca': 'petcare',
        'Sečenje drva': 'woodcutting',
        'Kuvanje': 'cooking'
    };
    
    const category = categoryMap[service.name] || 'cleaning';
    window.location.href = `category.html?category=${category}`;
}

function setupEventListeners() {
    // Navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Modal controls
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => {
            loginModal.style.display = 'block';
        });
    }
    
    if (registerBtn && registerModal) {
        registerBtn.addEventListener('click', () => {
            registerModal.style.display = 'block';
        });
    }
    
    if (showRegister && registerModal && loginModal) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'none';
            registerModal.style.display = 'block';
        });
    }
    
    if (showLogin && loginModal && registerModal) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerModal.style.display = 'none';
            loginModal.style.display = 'block';
        });
    }
    
    // Close modals
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Forms
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Hero search
    const heroSearch = document.getElementById('hero-search');
    if (heroSearch) {
        heroSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(heroSearch.value);
            }
        });
    }
    
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('helper-current-user', JSON.stringify(user));
        updateNavigation();
        closeModal('login-modal');
        showAlert('Uspešno ste se prijavili!', 'success');
    } else {
        showAlert('Pogrešni podaci za prijavu!', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = e.target.querySelector('input[placeholder="Ime i prezime"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    const confirmPassword = e.target.querySelector('input[placeholder="Potvrdi lozinku"]').value;
    const userType = e.target.querySelector('input[name="user-type"]:checked').value;
    
    if (password !== confirmPassword) {
        showAlert('Lozinke se ne poklapaju!', 'error');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        showAlert('Korisnik sa ovim email-om već postoji!', 'error');
        return;
    }
    
    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        password: password,
        type: userType,
        avatar: `https://via.placeholder.com/120x120/4F46E5/FFFFFF?text=${name.charAt(0)}`,
        location: "Beograd",
        phone: "",
        joined: new Date().toISOString().split('T')[0]
    };
    
    if (userType === 'provider') {
        newUser.providerRating = 0;
        newUser.providerReviews = 0;
        newUser.clientRating = 0;
        newUser.clientReviews = 0;
        newUser.services = [];
        newUser.description = "";
    } else {
        newUser.clientRating = 0;
        newUser.clientReviews = 0;
    }
    
    users.push(newUser);
    currentUser = newUser;
    
    localStorage.setItem('helper-users', JSON.stringify(users));
    localStorage.setItem('helper-current-user', JSON.stringify(currentUser));
    
    // Send email notification
    sendRegistrationEmail(newUser);
    
    updateNavigation();
    closeModal('register-modal');
    
    // Redirect to profile setup if provider
    if (userType === 'provider') {
        showAlert('Uspešno ste se registrovali! Sada podesite svoj profil.', 'success');
        setTimeout(() => {
            window.location.href = 'profile-setup.html';
        }, 1500);
    } else {
        showAlert('Uspešno ste se registrovali!', 'success');
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const name = e.target.querySelector('input[placeholder="Vaše ime"]').value;
    const email = e.target.querySelector('input[placeholder="Vaš email"]').value;
    const message = e.target.querySelector('textarea[placeholder="Vaša poruka"]').value;
    
    // Send email notification
    sendContactEmail(name, email, message);
    
    showAlert('Poruka je uspešno poslata!', 'success');
    e.target.reset();
}

function updateNavigation() {
    const navButtons = document.querySelector('.nav-buttons');
    if (!navButtons) return;
    
    if (currentUser) {
        navButtons.innerHTML = `
            <div class="user-menu">
                ${currentUser.type === 'provider' ? '<span class="provider-badge"><i class="fas fa-briefcase"></i> Pružam usluge</span>' : ''}
                <img src="${currentUser.avatar}" alt="${currentUser.name}" class="user-avatar">
                <span style="font-weight: 500; color: #374151;">${currentUser.name}</span>
                <div class="dropdown">
                    <button class="dropdown-btn" id="dropdown-toggle"><i class="fas fa-chevron-down"></i></button>
                    <div class="dropdown-content" id="dropdown-menu">
                        <a href="#" onclick="showProfile()"><i class="fas fa-user"></i> Moj profil</a>
                        <a href="bookings.html"><i class="fas fa-calendar-check"></i> Moje rezervacije</a>
                        <a href="#" onclick="showMessages()"><i class="fas fa-envelope"></i> Poruke</a>
                        ${currentUser.type === 'provider' ? '<a href="profile-setup.html"><i class="fas fa-cog"></i> Podesi profil</a>' : ''}
                        <a href="#" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Odjavi se</a>
                    </div>
                </div>
            </div>
        `;
        
        // Add click event to toggle dropdown
        setTimeout(() => {
            const dropdownToggle = document.getElementById('dropdown-toggle');
            const dropdownMenu = document.getElementById('dropdown-menu');
            
            if (dropdownToggle && dropdownMenu) {
                dropdownToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    dropdownMenu.classList.toggle('show');
                });
                
                // Close dropdown when clicking outside
                document.addEventListener('click', function(e) {
                    if (!e.target.closest('.dropdown')) {
                        dropdownMenu.classList.remove('show');
                    }
                });
            }
        }, 100);
    } else {
        navButtons.innerHTML = `
            <button class="btn btn-outline" id="login-btn">Prijavi se</button>
            <button class="btn btn-primary" id="register-btn">Registruj se</button>
        `;
        
        // Re-attach event listeners
        const loginBtn = document.getElementById('login-btn');
        const registerBtn = document.getElementById('register-btn');
        
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                document.getElementById('login-modal').style.display = 'block';
            });
        }
        
        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                document.getElementById('register-modal').style.display = 'block';
            });
        }
    }
}

function showProfile() {
    if (!currentUser) return;
    
    const profilePage = createProfilePage();
    document.body.innerHTML = profilePage;
    setupProfileEventListeners();
}

function createProfilePage() {
    return `
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <i class="fas fa-hands-helping"></i>
                    <span>Helper</span>
                </div>
                <div class="nav-menu">
                    <a href="#" onclick="goHome()" class="nav-link">Početna</a>
                    <a href="#" onclick="showMessages()" class="nav-link">Poruke</a>
                    <div class="nav-buttons">
                        <div class="user-menu">
                            <img src="${currentUser.avatar}" alt="${currentUser.name}" class="user-avatar" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;">
                            <span>${currentUser.name}</span>
                            <div class="dropdown">
                                <button class="dropdown-btn"><i class="fas fa-chevron-down"></i></button>
                                <div class="dropdown-content">
                                    <a href="#" onclick="showProfile()">Moj profil</a>
                                    <a href="#" onclick="showMessages()">Poruke</a>
                                    ${currentUser.type === 'provider' ? '<a href="#" onclick="showMyServices()">Moje usluge</a>' : ''}
                                    <a href="#" onclick="logout()">Odjavi se</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <div class="profile-header">
            <div class="container">
                <div class="profile-info">
                    <img src="${currentUser.avatar}" alt="${currentUser.name}" class="profile-avatar">
                    <div class="profile-details">
                        <h1>${currentUser.name}</h1>
                        <p>${currentUser.type === 'provider' ? 'Pruža usluge' : 'Traži usluge'}</p>
                        <div class="profile-rating">
                            ${currentUser.type === 'provider' && currentUser.rating ? `
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <span>${currentUser.rating} (${currentUser.reviews} recenzija)</span>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="profile-tabs">
            <div class="container">
                <div class="tab-buttons">
                    <button class="tab-button active" onclick="switchTab('about')">O meni</button>
                    ${currentUser.type === 'provider' ? '<button class="tab-button" onclick="switchTab(\'services\')">Moje usluge</button>' : ''}
                    <button class="tab-button" onclick="switchTab('reviews')">Recenzije</button>
                    <button class="tab-button" onclick="switchTab('settings')">Podešavanja</button>
                </div>
            </div>
        </div>

        <div class="tab-content active" id="about-tab">
            <div class="container">
                <div class="about-section">
                    <h2>O meni</h2>
                    <p class="description-text">${currentUser.description || 'Nema opisa.'}</p>
                    
                    <div class="profile-info-grid">
                        <div class="info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <strong>Lokacija</strong>
                                <p>${currentUser.location}</p>
                            </div>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-calendar"></i>
                            <div>
                                <strong>Član od</strong>
                                <p>${new Date(currentUser.joined).toLocaleDateString('sr-RS')}</p>
                            </div>
                        </div>
                        ${currentUser.email ? `
                        <div class="info-item">
                            <i class="fas fa-envelope"></i>
                            <div>
                                <strong>Email</strong>
                                <p>${currentUser.email}</p>
                            </div>
                        </div>
                        ` : ''}
                    </div>

                    ${currentUser.type === 'provider' && currentUser.services && currentUser.services.length > 0 ? `
                    <div class="services-section">
                        <h3><i class="fas fa-briefcase"></i> Usluge koje pružam</h3>
                        <div class="services-list-grid">
                            ${currentUser.services.map(service => {
                                const [name, price] = service.split(' - ');
                                return `
                                    <div class="service-card">
                                        <div class="service-icon">
                                            <i class="fas fa-check-circle"></i>
                                        </div>
                                        <div class="service-details">
                                            <h4>${name}</h4>
                                            <p class="service-price">${price}</p>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>

        ${currentUser.type === 'provider' ? `
        <div class="tab-content" id="services-tab">
            <div class="container">
                <h2>Moje usluge</h2>
                <div class="services-grid" id="my-services-grid">
                    <!-- Services will be loaded here -->
                </div>
            </div>
        </div>
        ` : ''}

        <div class="tab-content" id="reviews-tab">
            <div class="container">
                <h2>Recenzije</h2>
                <div class="reviews-list">
                    <!-- Reviews will be loaded here -->
                </div>
            </div>
        </div>

        <div class="tab-content" id="settings-tab">
            <div class="container">
                <h2>Podešavanja</h2>
                <form class="settings-form">
                    <div class="form-group">
                        <label>Ime i prezime</label>
                        <input type="text" value="${currentUser.name}">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" value="${currentUser.email}">
                    </div>
                    <div class="form-group">
                        <label>Telefon</label>
                        <input type="tel" value="${currentUser.phone}">
                    </div>
                    <div class="form-group">
                        <label>Lokacija</label>
                        <input type="text" value="${currentUser.location}">
                    </div>
                    ${currentUser.type === 'provider' ? `
                    <div class="form-group">
                        <label>Opis</label>
                        <textarea rows="4">${currentUser.description || ''}</textarea>
                    </div>
                    ` : ''}
                    <button type="submit" class="btn btn-primary">Sačuvaj izmene</button>
                </form>
            </div>
        </div>
    `;
}

function setupProfileEventListeners() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Settings form
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showAlert('Podešavanja su sačuvana!', 'success');
        });
    }
}

function switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
}

function showMessages() {
    const messagesPage = createMessagesPage();
    document.body.innerHTML = messagesPage;
    setupMessagesEventListeners();
}

function createMessagesPage() {
    return `
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <i class="fas fa-hands-helping"></i>
                    <span>Helper</span>
                </div>
                <div class="nav-menu">
                    <a href="#" onclick="goHome()" class="nav-link">Početna</a>
                    <a href="#" onclick="showProfile()" class="nav-link">Moj profil</a>
                    <div class="nav-buttons">
                        <div class="user-menu">
                            <img src="${currentUser.avatar}" alt="${currentUser.name}" class="user-avatar" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;">
                            <span>${currentUser.name}</span>
                            <div class="dropdown">
                                <button class="dropdown-btn"><i class="fas fa-chevron-down"></i></button>
                                <div class="dropdown-content">
                                    <a href="#" onclick="showProfile()">Moj profil</a>
                                    <a href="#" onclick="showMessages()">Poruke</a>
                                    ${currentUser.type === 'provider' ? '<a href="#" onclick="showMyServices()">Moje usluge</a>' : ''}
                                    <a href="#" onclick="logout()">Odjavi se</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <div class="message-container">
            <div class="conversations-list">
                <div class="conversation-item active">
                    <div class="conversation-header">
                        <img src="https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=AM" alt="Ana Marić" class="conversation-avatar">
                        <div class="conversation-name">Ana Marić</div>
                        <div class="conversation-time">2h</div>
                    </div>
                    <div class="conversation-preview">Hvala vam na odličnoj usluzi!</div>
                </div>
                <div class="conversation-item">
                    <div class="conversation-header">
                        <img src="https://via.placeholder.com/40x40/10B981/FFFFFF?text=MP" alt="Marko Petrović" class="conversation-avatar">
                        <div class="conversation-name">Marko Petrović</div>
                        <div class="conversation-time">1d</div>
                    </div>
                    <div class="conversation-preview">Kada biste mogli da dođete?</div>
                </div>
            </div>
            
            <div class="chat-container">
                <div class="chat-header">
                    <img src="https://via.placeholder.com/50x50/4F46E5/FFFFFF?text=AM" alt="Ana Marić" class="chat-avatar">
                    <div class="chat-info">
                        <h3>Ana Marić</h3>
                        <p>Čišćenje kuće</p>
                    </div>
                </div>
                
                <div class="chat-messages">
                    <div class="message received">
                        <div>Zdravo! Vidim da tražite usluge čišćenja. Kada biste želeli da dođem?</div>
                        <div class="message-time">14:30</div>
                    </div>
                    <div class="message sent">
                        <div>Zdravo! Možete li doći sutra u 10h?</div>
                        <div class="message-time">14:32</div>
                    </div>
                    <div class="message received">
                        <div>Naravno! Sutra u 10h je u redu. Koliko je prostorija?</div>
                        <div class="message-time">14:33</div>
                    </div>
                    <div class="message sent">
                        <div>3 sobe, kuhinja i kupatilo. Cena?</div>
                        <div class="message-time">14:35</div>
                    </div>
                    <div class="message received">
                        <div>500 RSD po satu, trebalo bi oko 4 sata. Ukupno 2000 RSD.</div>
                        <div class="message-time">14:36</div>
                    </div>
                    <div class="message sent">
                        <div>Odlično! Vidimo se sutra u 10h. Hvala!</div>
                        <div class="message-time">14:37</div>
                    </div>
                </div>
                
                <div class="chat-input">
                    <input type="text" placeholder="Napišite poruku...">
                    <button><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    `;
}

function setupMessagesEventListeners() {
    // Conversation switching
    const conversationItems = document.querySelectorAll('.conversation-item');
    conversationItems.forEach(item => {
        item.addEventListener('click', () => {
            conversationItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Send message
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');
    
    if (chatInput && sendButton) {
        const sendMessage = () => {
            const message = chatInput.value.trim();
            if (message) {
                addMessage(message, 'sent');
                chatInput.value = '';
            }
        };
        
        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function addMessage(text, type) {
    const chatMessages = document.querySelector('.chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const now = new Date();
    const time = now.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div>${text}</div>
        <div class="message-time">${time}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showMyServices() {
    if (currentUser.type !== 'provider') return;
    
    const servicesPage = createServicesPage();
    document.body.innerHTML = servicesPage;
    setupServicesEventListeners();
}

function createServicesPage() {
    return `
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <i class="fas fa-hands-helping"></i>
                    <span>Helper</span>
                </div>
                <div class="nav-menu">
                    <a href="#" onclick="goHome()" class="nav-link">Početna</a>
                    <a href="#" onclick="showProfile()" class="nav-link">Moj profil</a>
                    <a href="#" onclick="showMessages()" class="nav-link">Poruke</a>
                    <div class="nav-buttons">
                        <div class="user-menu">
                            <img src="${currentUser.avatar}" alt="${currentUser.name}" class="user-avatar" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;">
                            <span>${currentUser.name}</span>
                            <div class="dropdown">
                                <button class="dropdown-btn"><i class="fas fa-chevron-down"></i></button>
                                <div class="dropdown-content">
                                    <a href="#" onclick="showProfile()">Moj profil</a>
                                    <a href="#" onclick="showMessages()">Poruke</a>
                                    <a href="#" onclick="showMyServices()">Moje usluge</a>
                                    <a href="#" onclick="logout()">Odjavi se</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <div class="container" style="padding-top: 100px;">
            <div class="page-header">
                <h1>Moje usluge</h1>
                <button class="btn btn-primary" onclick="showAddServiceModal()">
                    <i class="fas fa-plus"></i> Dodaj uslugu
                </button>
            </div>
            
            <div class="services-grid" id="my-services-grid">
                <!-- Services will be loaded here -->
            </div>
        </div>

        <!-- Add Service Modal -->
        <div id="add-service-modal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('add-service-modal')">&times;</span>
                <h2>Dodaj novu uslugu</h2>
                <form id="add-service-form">
                    <div class="form-group">
                        <label>Naziv usluge</label>
                        <input type="text" placeholder="npr. Čišćenje kuće" required>
                    </div>
                    <div class="form-group">
                        <label>Opis</label>
                        <textarea placeholder="Opis usluge..." rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Cena po satu</label>
                        <input type="number" placeholder="500" required>
                    </div>
                    <div class="form-group">
                        <label>Kategorija</label>
                        <select required>
                            <option value="">Izaberite kategoriju</option>
                            <option value="cleaning">Čišćenje</option>
                            <option value="cooking">Kuvanje</option>
                            <option value="babysitting">Čuvanje dece</option>
                            <option value="petcare">Čuvanje ljubimaca</option>
                            <option value="other">Ostalo</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Dodaj uslugu</button>
                </form>
            </div>
        </div>
    `;
}

function setupServicesEventListeners() {
    // Add service form
    const addServiceForm = document.getElementById('add-service-form');
    if (addServiceForm) {
        addServiceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showAlert('Usluga je uspešno dodana!', 'success');
            closeModal('add-service-modal');
        });
    }
}

function showAddServiceModal() {
    document.getElementById('add-service-modal').style.display = 'block';
}

function performSearch(query) {
    if (!query.trim()) return;
    
    // Navigate to search page with query
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

function goHome() {
    location.reload();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('helper-current-user');
    location.reload();
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showAlert(message, type) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Add to page
    document.body.appendChild(alert);
    
    // Remove after 3 seconds
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('sr-RS');
}

function formatTime(timeString) {
    return new Date(timeString).toLocaleTimeString('sr-RS', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

// Email notification functions
function sendRegistrationEmail(user) {
    const userTypeText = user.type === 'provider' ? 'Pruža usluge' : 'Traži usluge';
    const now = new Date();
    const date = now.toLocaleDateString('sr-RS');
    const time = now.toLocaleTimeString('sr-RS');
    
    const subject = `Nova registracija - ${user.name}`;
    const body = `
NOVA REGISTRACIJA NA HELPER PLATFORMI
=====================================

👤 Ime i prezime: ${user.name}
📧 Email: ${user.email}
🏷️ Tip korisnika: ${userTypeText}
📅 Datum registracije: ${date}
⏰ Vreme: ${time}
📍 Lokacija: ${user.location}

=====================================
Helper - Platforma za kućne usluge
📞 +381 11 123 4567
📍 Knez Mihailova 1, Beograd
    `.trim();
    
    const mailtoLink = `mailto:nemanjanikitovic1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
}

function sendBookingEmail(booking) {
    const subject = `Nova rezervacija - ${booking.providerName}`;
    const body = `
NOVA REZERVACIJA
=====================================

👤 Klijent: ${booking.clientName}
📧 Email klijenta: ${booking.clientEmail}
🔧 Pružalac usluge: ${booking.providerName}
📅 Datum: ${booking.date}
⏰ Vreme: ${booking.time}
⏱️ Trajanje: ${booking.duration} sati
💰 Ukupna cena: ${booking.totalPrice} RSD

${booking.notes ? `📝 Napomena:\n${booking.notes}` : ''}

=====================================
Helper - Platforma za kućne usluge
📞 +381 11 123 4567
📍 Knez Mihailova 1, Beograd
    `.trim();
    
    const mailtoLink = `mailto:nemanjanikitovic1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
}

function sendContactEmail(name, email, message) {
    const now = new Date();
    const date = now.toLocaleDateString('sr-RS');
    
    const subject = `Kontakt forma - ${name}`;
    const body = `
NOVA PORUKA SA KONTAKT FORME
=====================================

👤 Ime: ${name}
📧 Email: ${email}
📅 Datum: ${date}

📝 Poruka:
${message}

=====================================
Helper - Platforma za kućne usluge
📞 +381 11 123 4567
📍 Knez Mihailova 1, Beograd
    `.trim();
    
    const mailtoLink = `mailto:nemanjanikitovic1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
}
