/* chat.js — AI Maa chat */
var Chat = {
  history: [],

  send: async function() {
    var inp = document.getElementById('chatInp');
    var msg = inp.value.trim();
    if (!msg) return;
    inp.value = '';

    var msgBox = document.getElementById('chatMsgs');
    msgBox.innerHTML += '<div class="cmsg user"><div class="cav uav">🧑</div><div class="cbbl">'+msg+'</div></div>';
    var tid = 't' + Date.now();
    msgBox.innerHTML += '<div class="cmsg maa" id="'+tid+'"><div class="cav mav">👩</div>' +
      '<div class="cbbl"><div class="tdots"><span></span><span></span><span></span></div></div></div>';
    msgBox.scrollTop = msgBox.scrollHeight;

    Chat.history.push({ role: 'user', content: msg });
    var recent = Chat.history.slice(-10);

    var data  = await API.chat(msg, recent);
    var reply = (data && data.reply) ? data.reply : 'Beta, network slow hai. Phir try karo! 💛';

    var el = document.getElementById(tid);
    if (el) el.innerHTML = '<div class="cav mav">👩</div><div class="cbbl">'+reply+'</div>';
    Chat.history.push({ role: 'assistant', content: reply });
    msgBox.scrollTop = msgBox.scrollHeight;
  }
};
