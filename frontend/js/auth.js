/* auth.js — Handles login/register against live backend API */
var Auth = {
  isRegister: false,
  user: null,

  init: function() {
    var token = localStorage.getItem(CONFIG.TOKEN_KEY);
    if (!token) { this.show(); return false; }
    // Try to restore user from localStorage
    try {
      var u = localStorage.getItem('upscMaaUser');
      if (u) this.user = JSON.parse(u);
    } catch(e) {}
    return true;
  },

  show: function() {
    document.getElementById('authOv').classList.add('show');
    document.getElementById('authErr').textContent = '';
  },

  hide: function() {
    document.getElementById('authOv').classList.remove('show');
  },

  toggle: function() {
    this.isRegister = !this.isRegister;
    var btn  = document.getElementById('authSubmit');
    var name = document.getElementById('authName');
    var sw   = document.querySelector('.auth-switch span');
    btn.textContent        = this.isRegister ? 'Register' : 'Login';
    name.style.display     = this.isRegister ? 'block' : 'none';
    sw.textContent         = this.isRegister ? 'Already registered? Login' : 'New user? Register here';
    document.getElementById('authErr').textContent = '';
  },

  submit: async function() {
    var email  = document.getElementById('authEmail').value.trim();
    var pass   = document.getElementById('authPass').value;
    var name   = document.getElementById('authName').value.trim();
    var errEl  = document.getElementById('authErr');
    var btn    = document.getElementById('authSubmit');

    errEl.textContent = '';
    if (!email || !pass) { errEl.textContent = '⚠️ Email and password required'; return; }
    if (pass.length < 6) { errEl.textContent = '⚠️ Password must be at least 6 characters'; return; }
    if (this.isRegister && !name) { errEl.textContent = '⚠️ Please enter your name'; return; }

    btn.textContent = 'Please wait...';
    btn.disabled = true;

    var data;
    try {
      if (this.isRegister) {
        data = await API.register(name, email, pass, STATE.hoursPerDay);
      } else {
        data = await API.login(email, pass);
      }
    } catch(e) {
      data = null;
    }

    btn.disabled = false;
    btn.textContent = this.isRegister ? 'Register' : 'Login';

    if (!data || !data.token) {
      if (this.isRegister) {
        errEl.textContent = '❌ Registration failed. Email may already be registered.';
      } else {
        errEl.textContent = '❌ Login failed. Check your email and password.';
      }
      return;
    }

    // Success
    localStorage.setItem(CONFIG.TOKEN_KEY, data.token);
    localStorage.setItem('upscMaaUser', JSON.stringify(data.user));
    this.user = data.user;

    if (data.user.hoursPerDay) STATE.hoursPerDay = data.user.hoursPerDay;
    if (data.user.alarms)      STATE.alarms = data.user.alarms;
    if (data.user.firstLaunch) STATE.firstLaunch = data.user.firstLaunch;

    // Per-user state key
    CONFIG.USER_STATE_KEY = CONFIG.STATE_KEY + '_' + data.user.id;
    loadState();
    saveState();

    this.hide();
    App.init();
  },

  updateUser: function(fields) {
    if (!this.user) return;
    Object.keys(fields).forEach(function(k) { Auth.user[k] = fields[k]; });
    localStorage.setItem('upscMaaUser', JSON.stringify(this.user));
  },

  logout: function() {
    localStorage.removeItem(CONFIG.TOKEN_KEY);
    localStorage.removeItem('upscMaaUser');
    this.user = null;
    this.isRegister = false;
    var btn = document.getElementById('authSubmit');
    if (btn) btn.textContent = 'Login';
    var name = document.getElementById('authName');
    if (name) name.style.display = 'none';
    var sw = document.querySelector('.auth-switch span');
    if (sw) sw.textContent = 'New user? Register here';
    this.show();
  }
};
