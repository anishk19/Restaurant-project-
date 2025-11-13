document.addEventListener('DOMContentLoaded', () => {
  // --- Element Selections ---
  const clientSide = document.getElementById('client-side');
  const adminSide = document.getElementById('admin-side');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  // Form Selections
  const reservationForm = document.getElementById('reservation-form');
  const contactForm = document.getElementById('contact-form');
  const loginForm = document.getElementById('login-form');
  const adminLoginForm = document.getElementById('admin-login-form');

  // --- Simulated Data ---
  let menuItems = [
    { id: 1, name: 'Grilled Salmon', category: 'main', price: 22.00, description: 'Served with asparagus and a lemon-dill sauce.', image: 'https://placehold.co/100x100/F97316/FFFFFF?text=Salmon' },
    { id: 2, name: 'Ribeye Steak', category: 'main', price: 35.50, description: '12oz prime cut, with mashed potatoes and gravy.', image: 'https://placehold.co/100x100/F97316/FFFFFF?text=Steak' },
    { id: 3, name: 'Pasta Carbonara', category: 'main', price: 19.00, description: 'Classic Roman pasta with pancetta, egg, and cheese.', image: 'https://placehold.co/100x100/F97316/FFFFFF?text=Pasta' },
    { id: 4, name: 'Bruschetta', category: 'appetizer', price: 12.50, description: 'Toasted bread topped with fresh tomatoes, garlic, and basil.', image: 'https://placehold.co/100x100/F97316/FFFFFF?text=Bruschetta' },
    { id: 5, name: 'Tiramisu', category: 'dessert', price: 9.00, description: 'A coffee-flavoured Italian dessert.', image: 'https://placehold.co/100x100/F97316/FFFFFF?text=Tiramisu' },
  ];

  let reservations = [
    { id: 1, name: 'John Doe', date: '2024-10-28', time: '19:30', guests: 4, email: 'john@example.com', status: 'pending' },
    { id: 2, name: 'Jane Smith', date: '2024-10-28', time: '20:00', guests: 2, email: 'jane@example.com', status: 'confirmed' },
  ];

  let testimonials = [
    { name: 'Sarah J.', quote: 'The best culinary experience I\'ve had in years! The atmosphere was cozy and the Grilled Salmon was cooked to perfection. Highly recommend!' },
    { name: 'Mark T.', quote: 'A true gem. From the appetizers to the dessert, every dish was a masterpiece. The staff was incredibly welcoming. We will be back!' },
    { name: 'Emily R.', quote: 'We celebrated our anniversary here and it was magical. The Ribeye Steak was outstanding, and the Tiramisu was the perfect end to a perfect evening.' },
  ];

  // --- Testimonial Slider ---
  const slider = document.getElementById('testimonial-slider');
  const dotsContainer = document.getElementById('testimonial-dots');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  let currentSlide = 0;
  let slideInterval;

  function renderTestimonials() {
    if (!slider) return;
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';

    testimonials.forEach((testimonial, index) => {
      const slide = document.createElement('div');
      slide.className = 'testimonial-slide p-4 text-center';
      slide.innerHTML = `
        <p class="text-xl italic text-gray-700 mb-4">"${testimonial.quote}"</p>
        <p class="font-bold text-orange-600 text-lg">&mdash; ${testimonial.name}</p>
      `;
      slider.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'testimonial-dot w-3 h-3 rounded-full transition-all';
      dot.dataset.index = index;
      dot.classList.add(index === 0 ? 'bg-orange-600' : 'bg-gray-300');
      dotsContainer.appendChild(dot);
    });
  }

  function showSlide(index) {
    if (!slider) return;
    currentSlide = (index + testimonials.length) % testimonials.length;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
      dot.classList.toggle('bg-orange-600', i === currentSlide);
      dot.classList.toggle('bg-gray-300', i !== currentSlide);
    });
  }

  function startSlideShow() {
    stopSlideShow();
    slideInterval = setInterval(() => showSlide(currentSlide + 1), 7000);
  }
  function stopSlideShow() { clearInterval(slideInterval); }

  if (slider) {
    prevBtn.addEventListener('click', () => { showSlide(currentSlide - 1); startSlideShow(); });
    nextBtn.addEventListener('click', () => { showSlide(currentSlide + 1); startSlideShow(); });
    dotsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('testimonial-dot')) {
        showSlide(parseInt(e.target.dataset.index));
        startSlideShow();
      }
    });
    renderTestimonials();
    showSlide(0);
    startSlideShow();
  }

  // --- Dynamic Menu ---
  const menuGrid = document.getElementById('menu-grid');
  const menuFilters = document.getElementById('menu-filters');

  function renderMenu(filter = 'all') {
    if (!menuGrid) return;
    menuGrid.innerHTML = '';

    const filteredItems = filter === 'all' ? menuItems : menuItems.filter(i => i.category === filter);

    if (filteredItems.length === 0) {
      menuGrid.innerHTML = `<p class="text-gray-600 col-span-full text-center">No items found in this category.</p>`;
      return;
    }

    filteredItems.forEach((item, index) => {
      const menuItem = document.createElement('div');
      menuItem.className = 'flex items-start space-x-4 p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 ease-in-out';
      menuItem.setAttribute('data-animate', 'up');
      menuItem.style.transitionDelay = `${index * 100}ms`;
      menuItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-md flex-shrink-0" onerror="this.src='https://placehold.co/100x100/F97316/FFFFFF?text=Dish'">
        <div>
          <div class="flex justify-between items-baseline">
            <h3 class="text-xl font-bold">${item.name}</h3>
            <p class="text-lg font-bold text-orange-600">$${item.price.toFixed(2)}</p>
          </div>
          <p class="text-gray-600 mt-1">${item.description}</p>
        </div>
      `;
      menuGrid.appendChild(menuItem);
      setTimeout(() => menuItem.classList.add('in-view'), 50);
    });
  }

  if (menuFilters) {
    menuFilters.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        menuFilters.querySelectorAll('button').forEach(btn => {
          btn.classList.remove('bg-orange-600', 'text-white');
          btn.classList.add('bg-gray-200', 'text-gray-700');
        });
        e.target.classList.add('bg-orange-600', 'text-white');
        e.target.classList.remove('bg-gray-200', 'text-gray-700');
        renderMenu(e.target.dataset.filter);
      }
    });
  }

  // --- Gallery Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const galleryImages = [];
  let currentImageIndex = 0;

  function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = galleryImages[currentImageIndex];
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
  }
  function closeLightbox() {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
  }
  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex];
  }
  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex];
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('gallery-img')) {
      if (galleryImages.length === 0) {
        document.querySelectorAll('.gallery-img').forEach(img => galleryImages.push(img.src));
      }
      const clickedIndex = galleryImages.indexOf(e.target.src);
      openLightbox(clickedIndex);
    }
  });

  if (lightbox) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNextImage);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('hidden')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'ArrowLeft') showPrevImage();
    });
  }

  // --- Admin CRUD & Dashboard ---
  const adminMenuTableBody = document.getElementById('admin-menu-table-body');
  const adminReservationsTableBody = document.getElementById('admin-reservations-table-body');
  const dashboardReservations = document.getElementById('dashboard-reservations');
  const dashboardMenuItems = document.getElementById('dashboard-menu-items');

  function renderAdminMenuTable() {
    if (!adminMenuTableBody) return;
    adminMenuTableBody.innerHTML = '';
    menuItems.forEach(item => {
      const row = document.createElement('tr');
      row.className = 'border-b border-gray-700 hover:bg-gray-700';
      row.innerHTML = `
        <td class="p-3">${item.name}</td>
        <td class="p-3 capitalize">${item.category}</td>
        <td class="p-3">$${item.price.toFixed(2)}</td>
        <td class="p-3">
          <button class="admin-menu-edit text-sm bg-blue-600 px-3 py-1 rounded" data-id="${item.id}">Edit</button>
          <button class="admin-menu-delete text-sm bg-red-600 px-3 py-1 rounded ml-2" data-id="${item.id}">Delete</button>
        </td>
      `;
      adminMenuTableBody.appendChild(row);
    });
  }

  function renderAdminReservationsTable() {
    if (!adminReservationsTableBody) return;
    adminReservationsTableBody.innerHTML = '';

    const sortedReservations = [...reservations].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedReservations.forEach(res => {
      const row = document.createElement('tr');
      let statusClass = '';
      let statusText = res.status;
      if (res.status === 'confirmed') statusClass = 'text-green-400';
      if (res.status === 'cancelled') statusClass = 'text-red-400 line-through';

      row.className = `border-b border-gray-700 hover:bg-gray-700 ${statusClass}`;
      row.innerHTML = `
        <td class="p-3">${res.name}</td>
        <td class="p-3">${res.date}</td>
        <td class="p-3">${res.time}</td>
        <td class="p-3">${res.guests}</td>
        <td class="p-3 capitalize font-medium">${statusText}</td>
        <td class="p-3">
          ${res.status === 'pending' ? `
            <button class="admin-res-confirm text-sm bg-green-600 px-3 py-1 rounded" data-id="${res.id}">Confirm</button>
            <button class="admin-res-cancel text-sm bg-red-600 px-3 py-1 rounded ml-2" data-id="${res.id}">Cancel</button>
          ` : ''}
        </td>
      `;
      adminReservationsTableBody.appendChild(row);
    });
  }

  function updateDashboard() {
    if (dashboardReservations) {
      dashboardReservations.textContent = reservations.length;
    }
    if (dashboardMenuItems) {
      dashboardMenuItems.textContent = menuItems.length;
    }
  }

  // Admin Menu Modal
  const menuModal = document.getElementById('admin-menu-modal');
  const menuModalClose = document.getElementById('admin-menu-modal-close');
  const menuModalTitle = document.getElementById('admin-menu-modal-title');
  const menuForm = document.getElementById('admin-menu-form');
  const addMenuBtn = document.getElementById('add-menu-item-btn');

  function showMenuModal(item = null) {
    menuForm.reset();
    if (item) {
      menuModalTitle.textContent = 'Edit Menu Item';
      document.getElementById('admin-menu-item-id').value = item.id;
      document.getElementById('admin-menu-name').value = item.name;
      document.getElementById('admin-menu-category').value = item.category;
      document.getElementById('admin-menu-price').value = item.price;
      document.getElementById('admin-menu-desc').value = item.description;
      document.getElementById('admin-menu-image').value = item.image;
    } else {
      menuModalTitle.textContent = 'Add New Item';
      document.getElementById('admin-menu-item-id').value = '';
    }
    menuModal.classList.remove('hidden');
  }
  function hideMenuModal() { menuModal.classList.add('hidden'); }

  if (addMenuBtn) addMenuBtn.addEventListener('click', () => showMenuModal());
  if (menuModalClose) menuModalClose.addEventListener('click', hideMenuModal);

  // Add/Edit Submit
  if (menuForm) {
    menuForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('admin-menu-item-id').value;
      const updatedItem = {
        name: document.getElementById('admin-menu-name').value,
        category: document.getElementById('admin-menu-category').value,
        price: parseFloat(document.getElementById('admin-menu-price').value),
        description: document.getElementById('admin-menu-desc').value,
        image: document.getElementById('admin-menu-image').value || 'https://placehold.co/100x100/F97316/FFFFFF?text=Dish',
      };

      if (id) {
        const index = menuItems.findIndex(item => item.id == id);
        menuItems[index] = { ...menuItems[index], ...updatedItem };
      } else {
        updatedItem.id = Date.now();
        menuItems.push(updatedItem);
      }

      renderAdminMenuTable();
      renderMenu();
      updateDashboard();
      hideMenuModal();
    });
  }

  // Admin Menu Table Actions
  if (adminMenuTableBody) {
    adminMenuTableBody.addEventListener('click', (e) => {
      const target = e.target;
      const id = target.dataset.id;
      if (!id) return;

      if (target.classList.contains('admin-menu-edit')) {
        const item = menuItems.find(item => item.id == id);
        showMenuModal(item);
      }

      if (target.classList.contains('admin-menu-delete')) {
        showConfirmModal('Delete Menu Item?', 'Are you sure you want to delete this item? This cannot be undone.', () => {
          menuItems = menuItems.filter(item => item.id != id);
          renderAdminMenuTable();
          renderMenu();
          updateDashboard();
        });
      }
    });
  }

  // Admin Reservations Actions
  if (adminReservationsTableBody) {
    adminReservationsTableBody.addEventListener('click', (e) => {
      const target = e.target;
      const id = target.dataset.id;
      if (!id) return;

      const reservation = reservations.find(res => res.id == id);
      if (!reservation) return;

      if (target.classList.contains('admin-res-confirm')) reservation.status = 'confirmed';
      if (target.classList.contains('admin-res-cancel')) reservation.status = 'cancelled';

      renderAdminReservationsTable();
    });
  }

  // Confirm Modal
  const confirmModal = document.getElementById('confirm-modal');
  const confirmModalTitle = document.getElementById('confirm-modal-title');
  const confirmModalText = document.getElementById('confirm-modal-text');
  const confirmModalCancel = document.getElementById('confirm-modal-cancel');
  const confirmModalConfirm = document.getElementById('confirm-modal-confirm');
  let confirmCallback = null;

  function showConfirmModal(title, text, onConfirm) {
    confirmModalTitle.textContent = title;
    confirmModalText.textContent = text;
    confirmCallback = onConfirm;
    confirmModal.classList.remove('hidden');
  }
  function hideConfirmModal() {
    confirmModal.classList.add('hidden');
    confirmCallback = null;
  }
  if (confirmModal) {
    confirmModalCancel.addEventListener('click', hideConfirmModal);
    confirmModalConfirm.addEventListener('click', () => {
      if (confirmCallback) confirmCallback();
      hideConfirmModal();
    });
  }

  // --- Navigation / SPA ---
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  const resetClientPages = () => {
    document.querySelectorAll('.page-content').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.remove('active', 'bg-orange-600', 'text-white');
      if (l.href.includes("#login")) l.classList.add('bg-orange-500', 'text-white');
      if (l.closest('footer')) {
        l.classList.add('text-gray-400');
        l.classList.remove('text-white');
      }
    });
  };

  const resetAdminPages = () => {
    document.querySelectorAll('.admin-page-content').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.admin-nav-link').forEach(l => l.classList.remove('active', 'bg-orange-600', 'text-white'));
  };

  const showClientPage = (pageId) => {
    resetClientPages();
    const page = document.getElementById(pageId);
    if (page) page.style.display = 'block';

    document.querySelectorAll(`a[href="#${pageId}"]`).forEach(l => {
      l.classList.add('active', 'text-white');
      if (l.href.includes("#login")) l.classList.add('bg-orange-700'); else l.classList.add('bg-orange-600');
      if (l.closest('footer')) l.classList.remove('text-gray-400');
    });

    if (page) {
      page.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.remove('in-view');
        setTimeout(() => el.classList.add('in-view'), 50);
      });
    }

    if (pageId === 'menu') renderMenu();
    if (pageId === 'testimonials') startSlideShow(); else stopSlideShow();
  };

  const showAdminPage = (pageId) => {
    resetAdminPages();
    const page = document.getElementById(pageId);
    if (page) page.style.display = 'block';
    document.querySelectorAll(`a[href="#${pageId}"]`).forEach(l => l.classList.add('active', 'bg-orange-600', 'text-white'));

    if (pageId === 'admin-dashboard') updateDashboard();
    if (pageId === 'admin-menu') renderAdminMenuTable();
    if (pageId === 'admin-reservations') renderAdminReservationsTable();
  };

  const handleNav = (e, scope) => {
    const link = e.target.closest(scope === 'client' ? '.nav-link' : '.admin-nav-link');
    if (!link || !link.getAttribute('href').startsWith('#')) return;

    e.preventDefault();
    const pageId = link.getAttribute('href').substring(1);

    if (scope === 'client') {
      showClientPage(pageId);
      window.location.hash = pageId;
      if (!mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
    } else {
      showAdminPage(pageId);
      window.location.hash = pageId;
    }
  };

  clientSide.addEventListener('click', (e) => handleNav(e, 'client'));
  adminSide.querySelector('aside').addEventListener('click', (e) => handleNav(e, 'admin'));

  // Role Switching
  document.getElementById('show-admin-login').addEventListener('click', (e) => {
    e.preventDefault();
    clientSide.classList.add('hidden');
    adminSide.classList.remove('hidden');
    showAdminPage('admin-login');
    window.location.hash = 'admin-login';
  });

  document.getElementById('logout-admin').addEventListener('click', (e) => {
    e.preventDefault();
    adminSide.classList.add('hidden');
    clientSide.classList.remove('hidden');
    showClientPage('home');
    window.location.hash = 'home';
  });

  // Hash Routing
  const handleHashChange = () => {
    const hash = window.location.hash.substring(1) || 'home';
    if (hash.startsWith('admin-')) {
      clientSide.classList.add('hidden');
      adminSide.classList.remove('hidden');
      const adminPageToShow = document.getElementById(hash) ? hash : 'admin-login';
      showAdminPage(adminPageToShow);
    } else {
      adminSide.classList.add('hidden');
      clientSide.classList.remove('hidden');
      const clientPageToShow = document.getElementById(hash) ? hash : 'home';
      showClientPage(clientPageToShow);
    }
  };

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();

  // Reservation min date = today
  try {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('reservation-date').setAttribute('min', today);
  } catch (e) {
    console.error("Could not set min date for reservation:", e);
  }

  // Validation helpers
  const showError = (inputId, message) => {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}-error`);
    if (inputElement) inputElement.classList.add('invalid-field');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  };
  const clearError = (inputId) => {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}-error`);
    if (inputElement) inputElement.classList.remove('invalid-field');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  };
  const clearAllErrors = (formElement) => {
    formElement.querySelectorAll('input, textarea').forEach(input => {
      if (input.id) clearError(input.id);
    });
  };
  const showFormMessage = (messageId, type, message) => {
    const el = document.getElementById(messageId);
    if (!el) return;
    el.textContent = message;
    el.style.display = 'block';
    if (type === 'success') {
      el.classList.remove('bg-red-100', 'text-red-700');
      el.classList.add('bg-green-100', 'text-green-700');
    } else {
      el.classList.remove('bg-green-100', 'text-green-700');
      el.classList.add('bg-red-100', 'text-red-700');
    }
  };
  const hideFormMessage = (messageId) => {
    const el = document.getElementById(messageId);
    if (el) el.style.display = 'none';
  };
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  // Reservation Form
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllErrors(reservationForm);
      hideFormMessage('reservation-message');
      let isValid = true;

      const name = document.getElementById('reservation-name').value.trim();
      const email = document.getElementById('reservation-email').value.trim();
      const date = document.getElementById('reservation-date').value;
      const time = document.getElementById('reservation-time').value;
      const guests = document.getElementById('reservation-guests').value;

      if (!name) { showError('reservation-name', 'Full Name is required.'); isValid = false; }
      if (!email) { showError('reservation-email', 'Email is required.'); isValid = false; }
      else if (!isValidEmail(email)) { showError('reservation-email', 'Please enter a valid email address.'); isValid = false; }
      if (!date) { showError('reservation-date', 'Please select a date.'); isValid = false; }
      if (!time) { showError('reservation-time', 'Please select a time.'); isValid = false; }
      if (!guests || parseInt(guests, 10) < 1) { showError('reservation-guests', 'Please enter at least 1 guest.'); isValid = false; }

      if (isValid) {
        const newReservation = {
          id: Date.now(),
          name, email, date, time,
          guests: parseInt(guests, 10),
          status: 'pending'
        };
        reservations.push(newReservation);
        renderAdminReservationsTable();
        updateDashboard();
        showFormMessage('reservation-message', 'success', 'Reservation successful! We look forward to seeing you.');
        reservationForm.reset();
      } else {
        showFormMessage('reservation-message', 'error', 'Please correct the errors above and try again.');
      }
    });
  }

  // Contact Form
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllErrors(contactForm);
      hideFormMessage('contact-message-result');
      let isValid = true;

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name) { showError('contact-name', 'Name is required.'); isValid = false; }
      if (!email) { showError('contact-email', 'Email is required.'); isValid = false; }
      else if (!isValidEmail(email)) { showError('contact-email', 'Please enter a valid email address.'); isValid = false; }
      if (!message) { showError('contact-message', 'Message is required.'); isValid = false; }

      if (isValid) {
        showFormMessage('contact-message-result', 'success', 'Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      } else {
        showFormMessage('contact-message-result', 'error', 'Please fill out all fields correctly.');
      }
    });
  }

  // Client Login
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllErrors(loginForm);
      hideFormMessage('login-message');
      let isValid = true;

      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      if (!email) { showError('login-email', 'Email is required.'); isValid = false; }
      else if (!isValidEmail(email)) { showError('login-email', 'Please enter a valid email.'); isValid = false; }
      if (!password) { showError('login-password', 'Password is required.'); isValid = false; }
      else if (password.length < 6) { showError('login-password', 'Password must be at least 6 characters.'); isValid = false; }

      if (isValid) {
        showFormMessage('login-message', 'success', 'Login successful! Redirecting...');
        loginForm.reset();
        setTimeout(() => {
          showClientPage('home');
          window.location.hash = 'home';
          hideFormMessage('login-message');
        }, 1500);
      } else {
        showFormMessage('login-message', 'error', 'Please correct the errors above.');
      }
    });
  }

  // Admin Login
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllErrors(adminLoginForm);
      hideFormMessage('admin-login-message');
      let isValid = true;

      const email = document.getElementById('admin-email').value.trim();
      const password = document.getElementById('admin-password').value;

      if (!email) { showError('admin-email', 'Email is required.'); isValid = false; }
      else if (!isValidEmail(email)) { showError('admin-email', 'Please enter a valid email.'); isValid = false; }
      if (!password) { showError('admin-password', 'Password is required.'); isValid = false; }

      if (isValid) {
        if (email === 'admin@delicious.com' && password === 'admin123') {
          showFormMessage('admin-login-message', 'success', 'Login successful! Loading dashboard...');
          adminLoginForm.reset();
          setTimeout(() => {
            showAdminPage('admin-dashboard');
            window.location.hash = 'admin-dashboard';
            hideFormMessage('admin-login-message');
          }, 1000);
        } else {
          showFormMessage('admin-login-message', 'error', 'Invalid email or password.');
        }
      } else {
        showFormMessage('admin-login-message', 'error', 'Please correct the errors above.');
      }
    });
  }

  // Intersection Observer for Scroll Animations
  try {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    };
    const animationObserver = new IntersectionObserver(observerCallback, observerOptions);
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => animationObserver.observe(el));
  } catch (e) {
    console.error('Intersection Observer not supported or failed:', e);
    document.querySelectorAll('[data-animate]').forEach(el => el.classList.add('in-view'));
  }
});
