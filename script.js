/* ============================================================
   HIMALAYAN HORIZONS — Main JavaScript
   Handles: Slider, Lightbox, Contact Form Validation, Nav
   ============================================================ */

/* ==== 1. IMAGE SLIDER ==== */
(function () {
  var slides = document.querySelectorAll('.slide');
  var dots   = document.querySelectorAll('.dot');
  if (!slides.length) return;         // only run on index.html

  var current = 0;
  var timer;

  function show(n) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function startAuto() {
    timer = setInterval(function () { show(current + 1); }, 5000);
  }
  function resetAuto() { clearInterval(timer); startAuto(); }

  /* dot clicks */
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { show(i); resetAuto(); });
  });

  /* arrow clicks */
  var prev = document.querySelector('.arrow.prev');
  var next = document.querySelector('.arrow.next');
  if (prev) prev.addEventListener('click', function () { show(current - 1); resetAuto(); });
  if (next) next.addEventListener('click', function () { show(current + 1); resetAuto(); });

  /* init */
  slides[0].classList.add('active');
  if (dots[0]) dots[0].classList.add('active');
  startAuto();
}());


/* ==== 2. LIGHTBOX (Gallery) ==== */
(function () {
  var lb      = document.getElementById('lightbox');
  var lbImg   = document.getElementById('lb-img');
  var lbCap   = document.getElementById('lb-caption');
  var lbClose = document.getElementById('lb-close');
  if (!lb) return;                    // only run on gallery.html

  document.querySelectorAll('.g-thumb').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      lbImg.src = this.getAttribute('data-full');
      lbImg.alt = this.getAttribute('data-caption') || 'Gallery image';
      if (lbCap) lbCap.textContent = this.getAttribute('data-caption') || '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  if (lbClose) lbClose.addEventListener('click', close);
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
}());


/* ==== 3. CONTACT FORM VALIDATION ==== */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;                  // only run on contact.html

  var successBox = document.getElementById('form-ok');

  /* show / hide field error */
  function setErr(input, msg) {
    var errEl = input.parentElement.querySelector('.err-msg');
    if (msg) {
      input.classList.add('err');
      if (errEl) { errEl.textContent = msg; errEl.classList.add('show'); }
    } else {
      input.classList.remove('err');
      if (errEl) errEl.classList.remove('show');
    }
  }

  /* validate one field — returns true if OK */
  function validate(inp) {
    var v = inp.value.trim();
    var n = inp.name;

    /* required check */
    if (inp.required && !v) {
      setErr(inp, 'This field is required.'); return false;
    }
    /* email format */
    if (n === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setErr(inp, 'Please enter a valid email address.'); return false;
    }
    /* phone — digits, spaces, + - ( ) */
    if (n === 'phone' && v && !/^[\d\s+\-()]{7,16}$/.test(v)) {
      setErr(inp, 'Please enter a valid phone number (7–16 digits).'); return false;
    }
    /* name min length */
    if (n === 'name' && v && v.length < 2) {
      setErr(inp, 'Name must be at least 2 characters.'); return false;
    }
    /* message min length */
    if (n === 'message' && v && v.length < 10) {
      setErr(inp, 'Message should be at least 10 characters.'); return false;
    }
    setErr(inp, ''); return true;
  }

  /* live feedback */
  form.querySelectorAll('input, select, textarea').forEach(function (inp) {
    inp.addEventListener('blur', function () { validate(this); });
    inp.addEventListener('input', function () {
      if (this.classList.contains('err')) validate(this);
    });
  });

  /* submit */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;

    form.querySelectorAll('input, select, textarea').forEach(function (inp) {
      if (!validate(inp)) ok = false;
    });

    if (ok) {
      var btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      /* simulate network delay */
      setTimeout(function () {
        form.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
        if (successBox) {
          successBox.classList.add('show');
          setTimeout(function () { successBox.classList.remove('show'); }, 5000);
        }
      }, 1200);
    }
  });
}());


/* ==== 4. HIGHLIGHT ACTIVE NAV LINK ==== */
(function () {
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#main-nav a').forEach(function (link) {
    if (link.getAttribute('href') === page) link.classList.add('active');
  });
}());