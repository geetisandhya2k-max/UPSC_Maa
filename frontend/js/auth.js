/* auth.js — Login, Register, Logout */
const Auth = {
  isRegister: false,
  user: null,

  init() {
    const token = localStorage.getItem(CONFIG.TOKEN_KEY);
    if (!token) { this.show(); return false; }
    return true;
  },

  show() {
    document.getElementById('authOv').classList.add('show');
  },

  hide() {
    document.getElementById('authOv').classList.remove('show');
  },

  toggle() {
    this.isRegister = !this.isRegister;
    const btn   = document.getElementById('authSubmit');
    const name  = document.getElementById('authName');
    const sw    = document.querySelector('.auth-switch span');
    btn.textContent  = this.isRegister ? 'Register' : 'Login';
    name.style.display = this.isRegister ? 'block' : 'none';
    sw.textContent   = this.isRegister ? 'Already registered? Login' : 'New user? Register here';
    document.getElementById('authErr').textContent = '';
  },

  async submit() {
    const email = document.getElementById('authEmail').value.trim();
    const pass  = document.getElementById('authPass').value;
    const name  = document.getElementById('authName').value.trim();
    const err   = document.getElementById('authErr');

    if (!email || !pass) { err.textContent = 'Email and password required'; return; }
    document.getElementById('authSubmit').textContent = '...Loading';

    let data;
    if (this.isRegister) {
      if (!name) { err.textContent = 'Name required for registration'; document.getElementById('authSubmit').textContent = 'Register'; return; }
      data = await API.register(name, email, pass, STATE.hoursPerDay);
    } else {
      data = await API.login(email, pass);
    }

    if (!data) {
      err.textContent = 'Login failed. Check email/password.';
      document.getElementById('authSubmit').textContent = this.isRegister ? 'Register' : 'Login';
      return;
    }

    localStorage.setItem(CONFIG.TOKEN_KEY, data.token);
    this.user = data.user;

    // Sync user settings to state
    if (data.user.hoursPerDay) STATE.hoursPerDay = data.user.hoursPerDay;
    if (data.user.alarms)      STATE.alarms = data.user.alarms;
    if (data.user.firstLaunch) STATE.firstLaunch = data.user.firstLaunch;
    saveState();

    this.hide();
    App.init();
  },

  logout() {
    localStorage.removeItem(CONFIG.TOKEN_KEY);
    this.user = null;
    this.show();
  }
};
