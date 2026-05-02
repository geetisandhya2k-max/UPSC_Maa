/* chat.js — AI Maa chat with smart fallback (works without backend) */
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

    // Add user bubble
    var userDiv = document.createElement('div');
    userDiv.className = 'cmsg user';
    userDiv.innerHTML = '<div class="cav uav">🧑</div><div class="cbbl">' + msg + '</div>';
    msgBox.appendChild(userDiv);
    msgBox.scrollTop = msgBox.scrollHeight;

    // Add typing bubble
    var maaDiv = document.createElement('div');
    maaDiv.className = 'cmsg maa';
    maaDiv.innerHTML = '<div class="cav mav">👩</div><div class="cbbl"><div class="tdots"><span></span><span></span><span></span></div></div>';
    msgBox.appendChild(maaDiv);
    msgBox.scrollTop = msgBox.scrollHeight;

    Chat.history.push({ role: 'user', content: msg });

    // Get reply - try backend, fallback to local
    var reply = null;
    try {
      var token = localStorage.getItem(CONFIG.TOKEN_KEY);
      if (token) {
        var res = await fetch(CONFIG.API_URL + '/chat/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
          body: JSON.stringify({ message: msg, conversationHistory: Chat.history.slice(-6) })
        });
        if (res.ok) {
          var data = await res.json();
          if (data && data.reply) reply = data.reply;
        }
      }
    } catch(e) { reply = null; }

    // Always fallback to local if backend fails
    if (!reply) reply = Chat.fallback(msg);

    // Update typing bubble with reply
    var bbl = maaDiv.querySelector('.cbbl');
    if (bbl) bbl.innerHTML = reply;
    Chat.history.push({ role: 'assistant', content: reply });
    msgBox.scrollTop = msgBox.scrollHeight;
  },

  fallback: function(message) {
    var msg = message.toLowerCase();
    if (msg.includes('syllabus'))
      return 'Beta, UPSC syllabus mein 4 GS papers hain! GS1: History+Geography, GS2: Polity+IR, GS3: Economy+Environment+S&T, GS4: Ethics. Pehle NCERT padho! 📚';
    if (msg.includes('book'))
      return 'Beta, ye padho: Laxmikanth (Polity), Spectrum (History), Ramesh Singh (Economy), Shankar IAS (Environment), Lexicon (Ethics). NCERTs pehle! 💪';
    if (msg.includes('history'))
      return 'Beta, History ke liye Spectrum + NCERTs (6th-12th) padho. Ancient, Medieval, Modern India + Art & Culture cover karo! 🏺';
    if (msg.includes('polity') || msg.includes('constitution'))
      return 'Beta, Polity ke liye Laxmikanth — teen baar padho! Constitution ka har article samajhna zaroori hai. Chal shuru karo! ⚖️';
    if (msg.includes('geography'))
      return 'Beta, Geography ke liye NCERT 11th & 12th. Blank map practice daily karo — 3-4 marks milenge Prelims mein! 🗺️';
    if (msg.includes('economy'))
      return 'Beta, Economy ke liye Ramesh Singh + Economic Survey padho. GDP, inflation, RBI — sab links samjho! 💰';
    if (msg.includes('environment'))
      return 'Beta, Environment ke liye Shankar IAS best hai. Conventions, biodiversity hotspots — PYQ pattern zaroor dekho! 🌿';
    if (msg.includes('ethics'))
      return 'Beta, Ethics ke liye Lexicon padho. IDEAL method for case studies. Goleman ke 5 EI components yaad karo! 🧠';
    if (msg.includes('current'))
      return 'Beta, roz The Hindu padho — editorial + national + international. PIB.gov.in bhi daily! 45 min subah + 20 min shaam! 📰';
    if (msg.includes('strategy') || msg.includes('plan'))
      return 'Beta, strategy: Month 1-3 NCERTs, 4-6 standard books, 7-9 revision+CA, 10-11 mocks, 12 rapid revision. Consistent raho! 🎯';
    if (msg.includes('prelim') || msg.includes('csat'))
      return 'Beta, Prelims mein 100 MCQs in 120 min = 72 sec per question. CSAT qualifying — 33% chahiye. Practice karo! 📝';
    if (msg.includes('mains') || msg.includes('writing'))
      return 'Beta, Mains answer writing daily karo! Intro + Body + Conclusion. 150 words = 7-8 min. Diagrams use karo! ✍️';
    if (msg.includes('motivat') || msg.includes('tired') || msg.includes('thak'))
      return 'Beta, Maa jaanti hai kitna mushkil hai. UPSC ek marathon hai sprint nahi. Consistent raho — Maa hamesha saath hai! ❤️';
    if (msg.includes('time') || msg.includes('hours') || msg.includes('schedule'))
      return 'Beta, 6-8 hours daily best hai. Subah: NCERT/books. Dopahar: CA. Shaam: revision+writing. Raat: flashcards. Consistency > intensity! ⏰';
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste'))
      return 'Namaste beta! Maa yahan hai — UPSC ke baare mein kuch bhi poocho. Syllabus, books, strategy, motivation — sab! 🤗';
    if (msg.includes('rank') || msg.includes('topper'))
      return 'Beta, rank 1 ka secret: consistent study + smart strategy + answer writing + current affairs. Koi shortcut nahi. Mehnat karo! 🏆';
    return 'Beta, yeh achha question hai! Consistency sabse zaroori hai. The Hindu daily padho, NCERTs complete karo, mock tests dete raho. Maa hamesha saath hai! 💛';
  }
};
