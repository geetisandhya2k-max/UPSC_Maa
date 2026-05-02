/* auth.js — Login and Register */
var Auth = {
  isRegister: false,
  user: null,

  init: async function() {
    var token = localStorage.getItem(CONFIG.TOKEN_KEY);
    if (!token) {
      Auth.show();
      return false;
    }

    // Verify token with server (3 second timeout - don't block UI)
    try {
      var controller = new AbortController();
      var timeoutId  = setTimeout(function() { controller.abort(); }, 3000);

      var res = await fetch(CONFIG.API_URL + '/auth/me', {
        headers: { 'Authorization': 'Bearer ' + token },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        var data = await res.json();
        Auth.user = data.user;
        localStorage.setItem('upscMaaUser', JSON.stringify(data.user));
        if (data.user.hoursPerDay) STATE.hoursPerDay = data.user.hoursPerDay;
        if (data.user.alarms)      STATE.alarms      = data.user.alarms;
        if (data.user.firstLaunch) STATE.firstLaunch = data.user.firstLaunch;
        CONFIG.USER_STATE_KEY = CONFIG.STATE_KEY + '_' + (data.user.id || data.user._id);
        loadState();
        App.init();
        return true;
      } else {
        localStorage.removeItem(CONFIG.TOKEN_KEY);
        localStorage.removeItem('upscMaaUser');
        Auth.show();
        return false;
      }
    } catch(e) {
      localStorage.removeItem(CONFIG.TOKEN_KEY);
      localStorage.removeItem('upscMaaUser');
      Auth.show();
      return false;
    }
  },

  show: function() {
    var ov = document.getElementById('authOv');
    if (ov) ov.classList.add('show');
    var err = document.getElementById('authErr');
    if (err) err.textContent = '';
  },

  hide: function() {
    var ov = document.getElementById('authOv');
    if (ov) ov.classList.remove('show');
  },

  toggle: function() {
    Auth.isRegister = !Auth.isRegister;
    var btn = document.getElementById('authSubmit');
    var nm  = document.getElementById('authName');
    var sw  = document.querySelector('.auth-switch span');
    if (btn) btn.textContent  = Auth.isRegister ? 'Register' : 'Login';
    if (nm)  nm.style.display = Auth.isRegister ? 'block' : 'none';
    if (sw)  sw.textContent   = Auth.isRegister ? 'Already registered? Login' : 'New user? Register here';
    var err = document.getElementById('authErr');
    if (err) err.textContent = '';
  },

  submit: async function() {
    var email = document.getElementById('authEmail').value.trim();
    var pass  = document.getElementById('authPass').value;
    var name  = document.getElementById('authName').value.trim();
    var errEl = document.getElementById('authErr');
    var btn   = document.getElementById('authSubmit');

    errEl.textContent = '';
    if (!email || !pass) { errEl.textContent = 'Email and password required'; return; }
    if (pass.length < 6) { errEl.textContent = 'Password must be at least 6 characters'; return; }
    if (Auth.isRegister && !name) { errEl.textContent = 'Please enter your name'; return; }

    btn.textContent = 'Please wait...';
    btn.disabled    = true;

    var data = null;
    try {
      var endpoint = Auth.isRegister ? '/auth/register' : '/auth/login';
      var body     = Auth.isRegister
        ? { name: name, email: email, password: pass, hoursPerDay: STATE.hoursPerDay }
        : { email: email, password: pass };

      var res = await fetch(CONFIG.API_URL + endpoint, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body)
      });
      data = await res.json();
      if (!res.ok) { errEl.textContent = data.error || 'Request failed'; data = null; }
    } catch(e) {
      errEl.textContent = 'Network error. Please try again.';
      data = null;
    }

    btn.disabled    = false;
    btn.textContent = Auth.isRegister ? 'Register' : 'Login';

    if (!data || !data.token) return;

    localStorage.setItem(CONFIG.TOKEN_KEY, data.token);
    localStorage.setItem('upscMaaUser', JSON.stringify(data.user));
    Auth.user = data.user;

    if (data.user.hoursPerDay) STATE.hoursPerDay = data.user.hoursPerDay;
    if (data.user.alarms)      STATE.alarms      = data.user.alarms;
    if (data.user.firstLaunch) STATE.firstLaunch = data.user.firstLaunch;
    CONFIG.USER_STATE_KEY = CONFIG.STATE_KEY + '_' + (data.user.id || data.user._id);
    loadState();
    saveState();
    Auth.hide();
    App.init();
  },

  updateUser: function(fields) {
    if (!Auth.user) return;
    Object.keys(fields).forEach(function(k) { Auth.user[k] = fields[k]; });
    localStorage.setItem('upscMaaUser', JSON.stringify(Auth.user));
  },

  logout: function() {
    localStorage.removeItem(CONFIG.TOKEN_KEY);
    localStorage.removeItem('upscMaaUser');
    Auth.user       = null;
    Auth.isRegister = false;
    var btn = document.getElementById('authSubmit');
    if (btn) btn.textContent = 'Login';
    var nm = document.getElementById('authName');
    if (nm) nm.style.display = 'none';
    var sw = document.querySelector('.auth-switch span');
    if (sw) sw.textContent = 'New user? Register here';
    Auth.show();
  }
};
