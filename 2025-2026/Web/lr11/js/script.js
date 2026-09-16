    /* ---- Helpers ---- */
    function $(id) { return document.getElementById(id); }

    function setError(fieldId, errorId, msg) {
      var field = $(fieldId);
      var err   = $(errorId);
      if (msg) {
        field.classList.add('field--error');
        err.textContent = msg;
      } else {
        field.classList.remove('field--error');
        err.textContent = '';
      }
    }

    /* ---- Password visibility toggle ---- */
    var pwInput  = $('password');
    var pwToggle = $('toggle-password');

    pwToggle.addEventListener('click', function () {
      var isHidden = pwInput.type === 'password';
      pwInput.type = isHidden ? 'text' : 'password';
      pwToggle.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
      pwToggle.classList.toggle('active', isHidden);
    });

    /* ---- Live password hints ---- */
    pwInput.addEventListener('input', function () {
      var val     = pwInput.value;
      var lenOk   = val.length >= 8;
      var symOk   = /[^a-zA-Z0-9]/.test(val);

      updateHint('hint-length', lenOk, val.length > 0);
      updateHint('hint-symbol', symOk, val.length > 0);
    });

    function updateHint(id, ok, active) {
      var el = $(id);
      el.className = 'hint ' + (active ? (ok ? 'hint--ok' : 'hint--fail') : 'hint--neutral');
    }

    /* ---- Country picker ---- */
    var countryBtn  = $('phone-country');
    var dropdown    = $('country-dropdown');
    var selectedFlag = $('selected-flag');
    var codeDisplay  = $('phone-code-display');
    var isOpen = false;

    countryBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      isOpen = !isOpen;
      dropdown.classList.toggle('open', isOpen);
      countryBtn.classList.toggle('open', isOpen);
    });

    document.addEventListener('click', function () {
      isOpen = false;
      dropdown.classList.remove('open');
      countryBtn.classList.remove('open');
    });

    dropdown.addEventListener('click', function (e) {
      e.stopPropagation();
      var option = e.target.closest('.country-option');
      if (!option) return;

      var code = option.dataset.code;
      var flag = option.dataset.flag;

      selectedFlag.setAttribute('href', '#' + flag);
      codeDisplay.textContent = code;

      isOpen = false;
      dropdown.classList.remove('open');
      countryBtn.classList.remove('open');
    });

    /* keyboard support for dropdown options */
    dropdown.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var option = e.target.closest('.country-option');
        if (option) option.click();
      }
    });

    /* ---- Form validation & submit ---- */
    $('signup-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      /* Name */
      var nameVal = $('full-name').value.trim();
      if (!nameVal) {
        setError('field-name', 'error-name', 'Full name is required.');
        valid = false;
      } else if (nameVal.length < 2) {
        setError('field-name', 'error-name', 'Name must be at least 2 characters.');
        valid = false;
      } else {
        setError('field-name', 'error-name', '');
      }

      /* Email */
      var emailVal = $('email').value.trim();
      var emailRe  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        setError('field-email', 'error-email', 'Email address is required.');
        valid = false;
      } else if (!emailRe.test(emailVal)) {
        setError('field-email', 'error-email', 'Please enter a valid email address.');
        valid = false;
      } else {
        setError('field-email', 'error-email', '');
      }

      /* Phone */
      var phoneVal = $('phone').value.trim().replace(/\s/g, '');
      if (!phoneVal) {
        setError('field-phone', 'error-phone', 'Phone number is required.');
        valid = false;
      } else if (!/^\d{6,15}$/.test(phoneVal)) {
        setError('field-phone', 'error-phone', 'Enter a valid phone number (digits only).');
        valid = false;
      } else {
        setError('field-phone', 'error-phone', '');
      }

      /* Password */
      var pwVal   = pwInput.value;
      var lenOk   = pwVal.length >= 8;
      var symOk   = /[^a-zA-Z0-9]/.test(pwVal);
      if (!pwVal) {
        setError('field-password', 'error-password', 'Password is required.');
        valid = false;
      } else if (!lenOk) {
        setError('field-password', 'error-password', 'Password must be at least 8 characters long.');
        valid = false;
      } else if (!symOk) {
        setError('field-password', 'error-password', 'Password must contain at least one symbol (e.g. @, !, #).');
        valid = false;
      } else {
        setError('field-password', 'error-password', '');
      }

      if (valid) {
        /* Show success screen */
        $('main-card').style.display = 'none';
        $('success-screen').style.display = 'flex';
      }
    });

    /* ---- "Back to Sign Up" resets form ---- */
    function showForm(e) {
      e.preventDefault();
      $('signup-form').reset();
      pwInput.type = 'password';
      /* reset hints */
      ['hint-length','hint-symbol'].forEach(function(id){
        $(id).className = 'hint hint--neutral';
      });
      /* reset errors */
      ['field-name','field-email','field-phone','field-password'].forEach(function(f){
        document.getElementById(f).classList.remove('field--error');
      });
      ['error-name','error-email','error-phone','error-password'].forEach(function(id){
        $(id).textContent = '';
      });
      $('success-screen').style.display = 'none';
      $('main-card').style.display     = '';
    }