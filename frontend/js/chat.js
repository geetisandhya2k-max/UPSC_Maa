/* chat.js — AI Maa chat (calls backend, works offline too) */
var Chat = {
  history: [],

  send: async function() {
    var inp = document.getElementById('chatInp');
    if (!inp) return;
    var msg = inp.value.trim();
    if (!msg) return;
    inp.value = '';

    var msgBox = document.getElementById('chatMsgs');
    if (!msgBox) return;

    // Add user message
    var userDiv = document.createElement('div');
    userDiv.className = 'cmsg user';
    userDiv.innerHTML = '<div class="cav uav">🧑</div><div class="cbbl">' + msg + '</div>';
    msgBox.appendChild(userDiv);

    // Add typing indicator
    var tid = 'typing_' + Date.now();
    var typingDiv = document.createElement('div');
    typingDiv.className = 'cmsg maa';
    typingDiv.id = tid;
    typingDiv.innerHTML = '<div class="cav mav">👩</div><div class="cbbl"><div class="tdots"><span></span><span></span><span></span></div></div>';
    msgBox.appendChild(typingDiv);
    msgBox.scrollTop = msgBox.scrollHeight;

    Chat.history.push({ role: 'user', content: msg });

    var reply = null;

    // Try backend API
    try {
      var data = await API.chat(msg, Chat.history.slice(-6));
      if (data && data.reply) reply = data.reply;
    } catch(e) {}

    // Fallback if backend fails
    if (!reply) reply = Chat.fallback(msg);

    // Replace typing with reply
    var el = document.getElementById(tid);
    if (el) {
      el.innerHTML = '<div class="cav mav">👩</div><div class="cbbl">' + reply + '</div>';
    }
    Chat.history.push({ role: 'assistant', content: reply });
    msgBox.scrollTop = msgBox.scrollHeight;
  },

  fallback: function(message) {
    var msg = message.toLowerCase();
    if (msg.includes('syllabus'))      return 'Beta, UPSC syllabus mein 4 GS papers hain! GS1: History+Geography, GS2: Polity+IR, GS3: Economy+Environment+S&T, GS4: Ethics. Pehle NCERT padho! 📚';
    if (msg.includes('book'))          return 'Beta, ye padho: Laxmikanth (Polity), Spectrum (History), Ramesh Singh (Economy), Shankar IAS (Environment), Lexicon (Ethics). NCERTs pehle! 💪';
    if (msg.includes('history'))       return 'Beta, History ke liye Spectrum + NCERTs (6th-12th) padho. Ancient, Medieval, Modern India + Art & Culture — sab cover karo! 🏺';
    if (msg.includes('polity') || msg.includes('constitution')) return 'Beta, Polity ke liye Laxmikanth — teen baar padho! Constitution ka har article samajhna zaroori hai. ⚖️';
    if (msg.includes('geography'))     return 'Beta, Geography ke liye NCERT 11th & 12th pehle. Blank map practice daily karo! 🗺️';
    if (msg.includes('economy'))       return 'Beta, Economy ke liye Ramesh Singh + Economic Survey padho. GDP, inflation, RBI policies — sab samjho! 💰';
    if (msg.includes('environment'))   return 'Beta, Environment ke liye Shankar IAS best hai. International conventions, biodiversity hotspots — PYQ pattern dekho! 🌿';
    if (msg.includes('ethics'))        return 'Beta, Ethics ke liye Lexicon padho. Case studies mein IDEAL method use karo. Goleman ke 5 EI components yaad karo! 🧠';
    if (msg.includes('current'))       return 'Beta, roz The Hindu padho — editorial + national + international. PIB.gov.in bhi daily! 45 min subah + 20 min shaam! 📰';
    if (msg.includes('strategy') || msg.includes('plan')) return 'Beta, strategy: Month 1-3 NCERTs, Month 4-6 standard books, Month 7-9 revision+CA, Month 10-11 mocks, Month 12 rapid revision. Consistent raho! 🎯';
    if (msg.includes('prelim') || msg.includes('csat'))   return 'Beta, Prelims mein 100 MCQs in 120 min = 72 sec per question. CSAT qualifying — 33% chahiye. Practice karo! 📝';
    if (msg.includes('mains') || msg.includes('writing')) return 'Beta, Mains answer writing daily karo! Intro + Body + Conclusion. 150 words = 7-8 min. Diagrams use karo! ✍️';
    if (msg.includes('motivat') || msg.includes('tired') || msg.includes('thak')) return 'Beta, Maa jaanti hai kitna mushkil hai. UPSC ek marathon hai sprint nahi. Ek ek din consistent raho. Maa hamesha saath hai! ❤️';
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste'))   return 'Namaste beta! Maa yahan hai — UPSC ke baare mein kuch bhi poocho! 🤗';
    return 'Beta, yeh achha question hai! Consistency sabse zaroori hai. The Hindu daily padho, NCERTs complete karo, mock tests dete raho. Maa hamesha saath hai! 💛';
  }
};
