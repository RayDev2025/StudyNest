// =============================================
//  STUDYNEST — script.js
//  Handles: Modal, Mobile Nav, Scroll Reveal,
//           Form Validation, Smooth Scroll
// =============================================


// --- MODAL FUNCTIONS ---

function openModal(tab) {
  const modal = document.getElementById('authModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  switchTab(tab);
}

function closeModal() {
  const modal = document.getElementById('authModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('authModal')) {
    closeModal();
  }
}

function switchTab(tab) {
  const isLogin = tab === 'login';

  document.getElementById('loginTab').classList.toggle('active', isLogin);
  document.getElementById('registerTab').classList.toggle('active', !isLogin);
  document.getElementById('loginPanel').classList.toggle('active', isLogin);
  document.getElementById('registerPanel').classList.toggle('active', !isLogin);

  document.getElementById('modalTitle').textContent = isLogin
    ? 'Welcome back'
    : 'Join StudyNest';

  document.getElementById('modalSubtitle').textContent = isLogin
    ? 'Log in to your account to continue'
    : 'Create your free account today';

  // Clear all messages when switching tabs
  ['loginError', 'loginSuccess', 'registerError', 'registerSuccess'].forEach(function(id) {
    document.getElementById(id).style.display = 'none';
  });
}


// --- FORM VALIDATION ---

function showMessage(id, text) {
  var el = document.getElementById(id);
  el.textContent = text;
  el.style.display = 'block';
}

function handleLogin() {
  var email = document.getElementById('loginEmail').value.trim();
  var pass  = document.getElementById('loginPassword').value;

  document.getElementById('loginError').style.display   = 'none';
  document.getElementById('loginSuccess').style.display = 'none';

  if (!email || !pass) {
    showMessage('loginError', 'Please fill in all fields.');
    return;
  }

  var emailPattern = /\S+@\S+\.\S+/;
  if (!emailPattern.test(email)) {
    showMessage('loginError', 'Please enter a valid email address.');
    return;
  }

  if (pass.length < 6) {
    showMessage('loginError', 'Password must be at least 6 characters.');
    return;
  }

  showMessage('loginSuccess', '✓ Logged in successfully! Welcome to StudyNest.');
  setTimeout(closeModal, 2000);
}

function handleRegister() {
  var name    = document.getElementById('regName').value.trim();
  var email   = document.getElementById('regEmail').value.trim();
  var pass    = document.getElementById('regPassword').value;
  var confirm = document.getElementById('regConfirm').value;

  document.getElementById('registerError').style.display   = 'none';
  document.getElementById('registerSuccess').style.display = 'none';

  if (!name || !email || !pass || !confirm) {
    showMessage('registerError', 'Please fill in all fields.');
    return;
  }

  var emailPattern = /\S+@\S+\.\S+/;
  if (!emailPattern.test(email)) {
    showMessage('registerError', 'Please enter a valid email address.');
    return;
  }

  if (pass.length < 6) {
    showMessage('registerError', 'Password must be at least 6 characters.');
    return;
  }

  if (pass !== confirm) {
    showMessage('registerError', 'Passwords do not match. Please try again.');
    return;
  }

  showMessage('registerSuccess', '✓ Account created for ' + name + '! Welcome to StudyNest.');
  setTimeout(closeModal, 2200);
}


// --- MOBILE NAV ---

function toggleMobileNav() {
  var nav = document.getElementById('mobileNav');
  nav.classList.toggle('open');
}


// --- SCROLL REVEAL ---

var revealElements = document.querySelectorAll('.reveal');

var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(function(el) {
  revealObserver.observe(el);
});


// --- SMOOTH SCROLL ---

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var href = anchor.getAttribute('href');
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// --- CLOSE MODAL ON ESCAPE KEY ---

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});


// --- NAVBAR SCROLL EFFECT ---

window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');
  if (window.scrollY > 40) {
    navbar.style.borderBottomColor = 'rgba(255, 215, 0, 0.25)';
  } else {
    navbar.style.borderBottomColor = 'rgba(255, 215, 0, 0.15)';
  }
});