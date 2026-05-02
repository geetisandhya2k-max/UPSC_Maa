/* auth.js — Login and Register with server token verification */
var Auth = {
  isRegister: false,
  user: null,

  init: async function() {
    var token = localStorage.getItem(CONFIG.TOKEN_KEY);
    if (!token) {
      Auth.show();
      return false;
    }
    // Verify token is still valid on server
    try {
      var res = await fetch(CONFIG.API_URL + '/auth/me', {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (res.ok) {
        var data = await res.json();
        Auth.user = data.user;
        localStorage.setItem('upscMaaUser', JSON.stringify(data.user));
        if (data.user.hoursPerDay) STATE.hoursPerDay = data.user.hoursPerDay;
        if (data.user.alarms)      STATE.alarms = data.user.alarms;
        if (data.user.firstLaunch) STATE.firstLaunch = data.user.firstLaunch;
        CONFIG.USER_STATE_KEY = CONFIG.STATE_KEY + '_' + (data.user.id || data.user._id);
        loadState();
        App.init();
        return true;
      } else {
        // Token expired or invalid — clear and show login
        localStorage.removeItem(CONFIG.TOKEN_KEY);
        localStorage.removeItem('upscMaaUser');
        Auth.show();
        return false;
      }
    } catch(e) {
      // Network error — still try to load from cached user
      var cached = localStorage.getItem('upscMaaUser');
      if (cached) {
        try {
          Auth.user = JSON.parse(cached);
          App.init();
          return true;
        } catch(e2) {}
      }
      Auth.show();
      return false;
    }
  },

  show: function() {
    document.getElementById('authOv').classList.add('show');
    document.getElementById('authErr').textContent = '';
  },

  hide: function() {
    document.getElementById('authOv').classList.remove('show');
  },

  toggle: function() {
    Auth.isRegister = !Auth.isRegister;
    var btn = document.getElementById('authSubmit');
    var nm  = document.getElementById('authName');
    var sw  = document.querySelector('.auth-switch span');
    btn.textContent  = Auth.isRegister ? 'Register' : 'Login';
    nm.style.display = Auth.isRegister ? 'block' : 'none';
    sw.textContent   = Auth.isRegister ? 'Already registered? Login' : 'New user? Register here';
    document.getElementById('authErr').textContent = '';
  },

  submit: async function() {
    var email = document.getElementById('authEmail').value.trim();
    var pass  = document.getElementById('authPass').value;
    var name  = document.getElementById('authName').value.trim();
    var errEl = document.getElementById('authErr');
    var btn   = document.getElementById('authSubmit');

    errEl.textContent = '';
    if (!email || !pass) { errEl.textContent = 'Email and password required'; return; }
    if (pass.length < 6) { errEl.textContent = 'Password min 6 characters'; return; }
    if (Auth.isRegister && !name) { errEl.textContent = 'Please enter your name'; return; }

    btn.textContent = 'Please wait...';
    btn.disabled = true;

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
      if (!res.ok) data = null;
    } catch(e) {
      data = null;
    }

    btn.disabled = false;
    btn.textContent = Auth.isRegister ? 'Register' : 'Login';

    if (!data || !data.token) {
      errEl.textContent = Auth.isRegister
        ? 'Registration failed. Email may already be registered.'
        : 'Login failed. Check your email and password.';
      return;
    }

    // Success — save token and user
    localStorage.setItem(CONFIG.TOKEN_KEY, data.token);
    localStorage.setItem('upscMaaUser', JSON.stringify(data.user));
    Auth.user = data.user;

    if (data.user.hoursPerDay) STATE.hoursPerDay = data.user.hoursPerDay;
    if (data.user.alarms)      STATE.alarms = data.user.alarms;
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
    Auth.user = null;
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
