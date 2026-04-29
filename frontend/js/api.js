/* api.js — All backend API calls */
const API = {
  _token: () => localStorage.getItem(CONFIG.TOKEN_KEY),

  _headers() {
    const h = { 'Content-Type': 'application/json' };
    const t = this._token();
    if (t) h['Authorization'] = `Bearer ${t}`;
    return h;
  },

  async _req(method, path, body) {
    try {
      const res = await fetch(`${CONFIG.API_URL}${path}`, {
        method,
        headers: this._headers(),
        body: body ? JSON.stringify(body) : undefined
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'API error');
      return data;
    } catch(err) {
      console.warn(`API ${method} ${path}:`, err.message);
      return null;
    }
  },

  get:    (path)        => API._req('GET',    path),
  post:   (path, body)  => API._req('POST',   path, body),
  put:    (path, body)  => API._req('PUT',    path, body),
  delete: (path)        => API._req('DELETE', path),

  // Auth
  login:    (email, pass)       => API.post('/auth/login',    { email, password: pass }),
  register: (name, email, pass, h) => API.post('/auth/register', { name, email, password: pass, hoursPerDay: h }),
  me:       ()                  => API.get('/auth/me'),

  // Progress
  today:      ()          => API.get('/progress/today'),
  taskDone:   (body)      => API.post('/progress/task-done', body),
  syncTimer:  (sec, dow)  => API.post('/progress/timer', { seconds: sec, dayOfWeek: dow }),

  // Hours
  updateHours: (h) => API.put('/users/hours', { hoursPerDay: h }),

  // Quiz
  submitQuiz: (body) => API.post('/quiz/submit', body),
  quizStats:  ()     => API.get('/quiz/stats'),

  // Notes
  saveNote:   (body)  => API.post('/notes', body),
  getNotes:   ()      => API.get('/notes'),

  // Stats
  dashboard:  () => API.get('/stats/dashboard'),

  // Chat
  chat:       (message, history) => API.post('/chat/message', { message, conversationHistory: history }),

  // Push
  savePush:   (sub) => API.put('/users/push-subscription', { subscription: sub }),
  vapidKey:   ()    => API.get('/notifications/vapid-key'),
};
