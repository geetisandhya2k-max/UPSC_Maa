/* api.js — All backend API calls with silent fallback */
var API = {
  _req: async function(method, path, body) {
    try {
      const token = localStorage.getItem(CONFIG.TOKEN_KEY);
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = 'Bearer ' + token;
      const res = await fetch(CONFIG.API_URL + path, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(8000)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'API error');
      return data;
    } catch(e) {
      console.warn('API ' + method + ' ' + path + ':', e.message);
      return null;
    }
  },

  get:  function(path)       { return API._req('GET',    path); },
  post: function(path, body) { return API._req('POST',   path, body); },
  put:  function(path, body) { return API._req('PUT',    path, body); },
  del:  function(path)       { return API._req('DELETE', path); },

  login:       function(email, pass)           { return API.post('/auth/login',    { email: email, password: pass }); },
  register:    function(name, email, pass, h)  { return API.post('/auth/register', { name: name, email: email, password: pass, hoursPerDay: h }); },
  me:          function()                      { return API.get('/auth/me'); },
  today:       function()                      { return API.get('/progress/today'); },
  taskDone:    function(body)                  { return API.post('/progress/task-done', body); },
  syncTimer:   function(sec, dow)              { return API.post('/progress/timer', { seconds: sec, dayOfWeek: dow }); },
  updateHours: function(h)                     { return API.put('/users/hours', { hoursPerDay: h }); },
  updateProfile: function(data)                { return API.put('/users/profile', data); },
  submitQuiz:  function(body)                  { return API.post('/quiz/submit', body); },
  saveNote:    function(body)                  { return API.post('/notes', body); },
  dashboard:   function()                      { return API.get('/stats/dashboard'); },
  chat:        function(message, history)      { return API.post('/chat/message', { message: message, conversationHistory: history }); },
  vapidKey:    function()                      { return API.get('/notifications/vapid-key'); },
};
