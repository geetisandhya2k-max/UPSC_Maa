/* chat.js — AI Maa chat */
const Chat = {
  history: [],

  async send() {
    const inp  = document.getElementById('chatInp');
    const msg  = inp.value.trim();
    if (!msg) return;
    inp.value = '';

    const msgs = document.getElementById('chatMsgs');
    msgs.innerHTML += `<div class="cmsg user"><div class="cav uav">🧑</div><div class="cbbl">${msg}</div></div>`;
    const tid = 't' + Date.now();
    msgs.innerHTML += `<div class="cmsg maa" id="${tid}"><div class="cav mav">👩</div><div class="cbbl"><div class="tdots"><span></span><span></span><span></span></div></div></div>`;
    msgs.scrollTop = msgs.scrollHeight;

    this.history.push({ role: 'user', content: msg });

    const data = await API.chat(msg, this.history.slice(-10));
    const reply = data?.reply || 'Beta, network slow hai. Phir try karo! 💛';

    document.getElementById(tid).innerHTML =
      `<div class="cav mav">👩</div><div class="cbbl">${reply}</div>`;
    this.history.push({ role: 'assistant', content: reply });
    msgs.scrollTop = msgs.scrollHeight;
  }
};
