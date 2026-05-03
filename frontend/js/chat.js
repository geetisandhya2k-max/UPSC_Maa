/* chat.js — AI Maa chat. Uses backend if available, local fallback always works */
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

    // Add Maa typing bubble
    var maaDiv = document.createElement('div');
    maaDiv.className = 'cmsg maa';
    maaDiv.innerHTML = '<div class="cav mav">👩</div><div class="cbbl"><div class="tdots"><span></span><span></span><span></span></div></div>';
    msgBox.appendChild(maaDiv);
    msgBox.scrollTop = msgBox.scrollHeight;

    Chat.history.push({ role: 'user', content: msg });

    // Always use local fallback immediately for mobile reliability
    // Also try backend in parallel (updates if backend responds)
    var reply = Chat.fallback(msg);

    // Try backend API (2 second timeout for mobile)
    try {
      var token = localStorage.getItem(CONFIG.TOKEN_KEY);
      if (token) {
        var controller = new AbortController();
        var tid = setTimeout(function() { controller.abort(); }, 2000);
        var res = await fetch(CONFIG.API_URL + '/chat/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            message: msg,
            conversationHistory: Chat.history.slice(-4)
          }),
          signal: controller.signal
        });
        clearTimeout(tid);
        if (res.ok) {
          var data = await res.json();
          if (data && data.reply) reply = data.reply;
        }
      }
    } catch(e) {
      // Use local fallback - already set above
    }

    // Update bubble with reply
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
      return 'Beta, Polity ke liye Laxmikanth — teen baar padho! Constitution ka har article samajhna zaroori hai. ⚖️';
    if (msg.includes('geography'))
      return 'Beta, Geography ke liye NCERT 11th & 12th. Blank map practice daily karo — 3-4 marks milenge Prelims mein! 🗺️';
    if (msg.includes('economy'))
      return 'Beta, Economy ke liye Ramesh Singh + Economic Survey padho. GDP, inflation, RBI — sab samjho! 💰';
    if (msg.includes('environment'))
      return 'Beta, Environment ke liye Shankar IAS best hai. Conventions, biodiversity hotspots — PYQ pattern dekho! 🌿';
    if (msg.includes('ethics'))
      return 'Beta, Ethics ke liye Lexicon padho. IDEAL method for case studies. Goleman ke 5 EI components yaad karo! 🧠';
    if (msg.includes('current'))
      return 'Beta, roz The Hindu padho — editorial + national + international. PIB.gov.in bhi daily! 📰';
    if (msg.includes('strategy') || msg.includes('plan'))
      return 'Beta, strategy: Month 1-3 NCERTs, 4-6 standard books, 7-9 revision+CA, 10-11 mocks, 12 rapid revision. Consistent raho! 🎯';
    if (msg.includes('prelim') || msg.includes('csat'))
      return 'Beta, Prelims mein 100 MCQs in 120 min = 72 sec per question. CSAT qualifying — 33% chahiye. Practice karo! 📝';
    if (msg.includes('mains') || msg.includes('writing'))
      return 'Beta, Mains answer writing daily karo! Intro + Body + Conclusion. 150 words = 7-8 min. ✍️';
    if (msg.includes('motivat') || msg.includes('tired') || msg.includes('thak'))
      return 'Beta, Maa jaanti hai kitna mushkil hai. UPSC ek marathon hai. Consistent raho — Maa hamesha saath hai! ❤️';
    if (msg.includes('time') || msg.includes('schedule'))
      return 'Beta, 6-8 hours daily best hai. Subah: NCERT. Dopahar: CA. Shaam: revision. Raat: flashcards. Consistency > intensity! ⏰';
    if (msg.includes('rank') || msg.includes('topper'))
      return 'Beta, rank ka secret: consistent study + smart strategy + answer writing + current affairs. Mehnat karo! 🏆';
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste') || msg.includes('hii'))
      return 'Namaste beta! Maa yahan hai — UPSC ke baare mein kuch bhi poocho! Syllabus, books, strategy, motivation — sab! 🤗';
    if (msg.includes('timer') || msg.includes('study'))
      return 'Beta, aaj kitna padha? Timer start karo — Home tab mein. Roz kam se kam target hours study karo. Maa dekh rahi hai! 👀';
    if (msg.includes('task') || msg.includes('complete'))
      return 'Beta, aaj ke tasks complete karo — Home tab mein dekho. Ek ek task mark karo as done. Streak badhega! 🔥';
    return 'Beta, yeh achha sawaal hai! Consistent raho, The Hindu daily padho, NCERTs complete karo. Maa hamesha saath hai! 💛';
  }
};
