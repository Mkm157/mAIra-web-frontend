/* ============================================================
   mAIra Dashboard — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     0. AUTH GUARD — redirect to login if not signed in
  ---------------------------------------------------------- */
  try {
    if (!sessionStorage.getItem('maira_user')) {
      window.location.replace('login.html');
      return;
    }
  } catch(e) {}

  /* ----------------------------------------------------------
     Helpers
  ---------------------------------------------------------- */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return (ctx || document).querySelectorAll(sel); }

  /* ----------------------------------------------------------
     1. SIDEBAR NAVIGATION — section switching
  ---------------------------------------------------------- */
  var navLinks = qsa('.nav a');
  var sections = qsa('main > section, main > .content, #section-new-chat, #section-history, #section-files, #section-settings');

  // Map nav index → section id
  var sectionIds = ['dashboard', 'new-chat', 'history', 'files', 'settings'];

  function showSection(id) {
    // hide all switchable sections
    qsa('[data-section]').forEach(function (s) {
      s.style.display = 'none';
    });
    var target = document.getElementById('section-' + id);
    if (target) target.style.display = '';
    if (id === 'dashboard') {
      // dashboard sections live in main directly
      qs('.hero').style.display = '';
      qs('.content').style.display = '';
    }
  }

  navLinks.forEach(function (link, i) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      navLinks.forEach(function (l) { l.removeAttribute('aria-current'); });
      link.setAttribute('aria-current', 'page');
      var id = sectionIds[i] || 'dashboard';
      showSection(id);
    });
  });

  /* ----------------------------------------------------------
     2. SUGGESTED CHIPS → fill textarea
  ---------------------------------------------------------- */
  var prompt = document.getElementById('prompt');
  qsa('[data-fill]').forEach(function (b) {
    b.addEventListener('click', function () {
      prompt.value = b.textContent.trim();
      prompt.focus();
      autoResize(prompt);
    });
  });

  /* ----------------------------------------------------------
     3. AUTO-RESIZE TEXTAREA
  ---------------------------------------------------------- */
  function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }
  if (prompt) {
    prompt.addEventListener('input', function () { autoResize(prompt); });
  }

  /* ----------------------------------------------------------
     4. SEND BUTTON — simulate sending a message
  ---------------------------------------------------------- */
  var sendBtn = qs('.send');
  function sendMessage() {
    var text = (prompt.value || '').trim();
    if (!text) { prompt.focus(); return; }
    showToast('Message sent: "' + text.substring(0, 60) + (text.length > 60 ? '…' : '') + '"');
    prompt.value = '';
    autoResize(prompt);
    prompt.focus();
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  // Send on Ctrl/Cmd + Enter
  if (prompt) {
    prompt.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  /* ----------------------------------------------------------
     5. ATTACH FILE BUTTON
  ---------------------------------------------------------- */
  var attachBtn = qs('.tool[data-action="attach"]');
  var fileInput = document.getElementById('file-input');

  if (attachBtn && fileInput) {
    attachBtn.addEventListener('click', function () {
      fileInput.click();
    });
    fileInput.addEventListener('change', function () {
      if (fileInput.files && fileInput.files.length > 0) {
        var names = Array.from(fileInput.files).map(function (f) { return f.name; }).join(', ');
        showToast('📎 Attached: ' + names);
        // show attached badge near composer
        showAttachedFiles(Array.from(fileInput.files));
        fileInput.value = '';
      }
    });
  }

  function showAttachedFiles(files) {
    var existing = qs('.attached-files');
    if (existing) existing.remove();
    var wrap = document.createElement('div');
    wrap.className = 'attached-files';
    files.forEach(function (f) {
      var chip = document.createElement('span');
      chip.className = 'attached-chip';
      chip.innerHTML = '<svg viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8ZM14 3v5h5"/></svg>' + f.name;
      var rm = document.createElement('button');
      rm.setAttribute('aria-label', 'Remove ' + f.name);
      rm.innerHTML = '<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>';
      rm.addEventListener('click', function () { chip.remove(); if (!wrap.children.length) wrap.remove(); });
      chip.appendChild(rm);
      wrap.appendChild(chip);
    });
    var composer = qs('.composer');
    if (composer) composer.insertAdjacentElement('afterend', wrap);
  }

  /* ----------------------------------------------------------
     6. PROMPT LIBRARY MODAL
  ---------------------------------------------------------- */
  var libraryBtn = qs('.tool[data-action="library"]');
  var libraryModal = document.getElementById('modal-library');
  var libraryClose = qs('#modal-library .modal-close');

  var prompts = [
    { label: 'Summarize Q3 financial highlights', cat: 'Finance' },
    { label: 'Profile Python bottlenecks', cat: 'Code' },
    { label: 'Competitive benchmark matrix', cat: 'Research' },
    { label: 'Write a product requirements doc', cat: 'Product' },
    { label: 'Create a go-to-market strategy', cat: 'Strategy' },
    { label: 'Analyze customer churn patterns', cat: 'Analytics' },
    { label: 'Draft a board-level executive summary', cat: 'Finance' },
    { label: 'Identify top 5 UX friction points', cat: 'Product' },
    { label: 'Generate a SQL query for monthly revenue', cat: 'Code' },
    { label: 'Outline a 90-day onboarding plan', cat: 'HR' },
  ];

  if (libraryModal) {
    var grid = qs('#modal-library .prompt-grid');
    prompts.forEach(function (p) {
      var card = document.createElement('button');
      card.className = 'prompt-card';
      card.innerHTML = '<span class="pc-cat">' + p.cat + '</span><span class="pc-label">' + p.label + '</span>';
      card.addEventListener('click', function () {
        prompt.value = p.label;
        autoResize(prompt);
        closeModal(libraryModal);
        prompt.focus();
      });
      grid.appendChild(card);
    });
  }

  if (libraryBtn && libraryModal) {
    libraryBtn.addEventListener('click', function () { openModal(libraryModal); });
  }
  if (libraryClose) {
    libraryClose.addEventListener('click', function () { closeModal(libraryModal); });
  }

  /* ----------------------------------------------------------
     7. VOICE INPUT BUTTON — toggle mic animation
  ---------------------------------------------------------- */
  var voiceBtn = qs('.tool[data-action="voice"]');
  var voiceActive = false;
  if (voiceBtn) {
    voiceBtn.addEventListener('click', function () {
      voiceActive = !voiceActive;
      voiceBtn.classList.toggle('active', voiceActive);
      voiceBtn.setAttribute('aria-pressed', String(voiceActive));
      if (voiceActive) {
        showToast('🎙️ Voice input active — speak now');
        setTimeout(function () {
          if (voiceActive) {
            voiceActive = false;
            voiceBtn.classList.remove('active');
            voiceBtn.setAttribute('aria-pressed', 'false');
            showToast('Voice input stopped');
          }
        }, 6000);
      } else {
        showToast('Voice input stopped');
      }
    });
  }

  /* ----------------------------------------------------------
     8. QUICK ACTION CARDS
  ---------------------------------------------------------- */
  var qaCards = qsa('.qa');
  var qaActions = ['new-chat', 'attach-file', 'ask-question', 'history'];

  qaCards.forEach(function (card, i) {
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', function (e) {
      e.preventDefault();
      var action = qaActions[i];
      if (action === 'new-chat') {
        triggerNewChat();
      } else if (action === 'attach-file') {
        if (fileInput) fileInput.click();
      } else if (action === 'ask-question') {
        prompt.focus();
        prompt.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (action === 'history') {
        // Navigate to history section
        navLinks[2].click();
      }
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });

  /* ----------------------------------------------------------
     9. NEW CHAT (sidebar + quick action)
  ---------------------------------------------------------- */
  function triggerNewChat() {
    // Switch to new-chat section
    navLinks[1].click();
    var ncPrompt = document.getElementById('nc-prompt');
    if (ncPrompt) { ncPrompt.focus(); }
    showToast('✨ New chat workspace ready');
  }

  var ncSendBtn = document.getElementById('nc-send');
  var ncPrompt = document.getElementById('nc-prompt');

  if (ncSendBtn && ncPrompt) {
    function autoResizeNc() { ncPrompt.style.height = 'auto'; ncPrompt.style.height = ncPrompt.scrollHeight + 'px'; }
    ncPrompt.addEventListener('input', autoResizeNc);
    ncSendBtn.addEventListener('click', function () {
      var text = ncPrompt.value.trim();
      if (!text) { ncPrompt.focus(); return; }
      addChatMessage(text);
      ncPrompt.value = '';
      autoResizeNc();
      ncPrompt.focus();
    });
    ncPrompt.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); ncSendBtn.click(); }
    });
  }

  function addChatMessage(text) {
    var thread = document.getElementById('chat-thread');
    if (!thread) return;
    // User message
    var userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.innerHTML = '<div class="chat-bubble">' + escHtml(text) + '</div>';
    thread.appendChild(userMsg);
    thread.scrollTop = thread.scrollHeight;
    // Simulated AI response
    var aiMsg = document.createElement('div');
    aiMsg.className = 'chat-msg ai';
    aiMsg.innerHTML = '<div class="chat-ai-icon"><svg viewBox="0 0 48 32" style="stroke:none;width:20px;height:14px"><defs><linearGradient id="lg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f8eff"/><stop offset="1" stop-color="#9b5cf6"/></linearGradient></defs><path d="M24 3a13 13 0 1 0 0 26 13 13 0 0 0 9-3.6A10 10 0 0 1 24 3Z" fill="url(#lg2)"/></svg></div><div class="chat-bubble typing"><span></span><span></span><span></span></div>';
    thread.appendChild(aiMsg);
    thread.scrollTop = thread.scrollHeight;
    setTimeout(function () {
      var responses = [
        'I\'ve analyzed your request. Here\'s a structured breakdown with key insights and recommended next steps based on your organization\'s context.',
        'Great question! Based on the available data, I can identify several patterns worth highlighting. Let me walk you through the key findings.',
        'I\'ve processed your input. The analysis reveals three core themes that align with your strategic objectives.',
        'Understood. I\'ll synthesize the relevant information and provide you with a comprehensive, citation-backed response.',
      ];
      var reply = responses[Math.floor(Math.random() * responses.length)];
      aiMsg.querySelector('.chat-bubble').className = 'chat-bubble';
      aiMsg.querySelector('.chat-bubble').textContent = reply;
      thread.scrollTop = thread.scrollHeight;
    }, 1500);
  }

  function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ----------------------------------------------------------
     10. CONVERSATION HISTORY actions (bookmark + open)
  ---------------------------------------------------------- */
  qsa('.conv .acts button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var label = btn.getAttribute('aria-label');
      if (label && label.includes('Bookmark')) {
        btn.classList.toggle('bookmarked');
        showToast(btn.classList.contains('bookmarked') ? '🔖 Bookmarked' : 'Bookmark removed');
      } else if (label && label.includes('Open')) {
        navLinks[1].click();
        showToast('Opening conversation…');
      }
    });
  });

  // Click on a conversation row → open in new chat
  qsa('.conv').forEach(function (conv) {
    conv.addEventListener('click', function (e) {
      if (e.target.closest('button')) return;
      navLinks[1].click();
      var title = conv.querySelector('h4');
      if (title && ncPrompt) {
        showToast('Resuming: ' + title.textContent);
      }
    });
    conv.style.cursor = 'pointer';
  });

  /* ----------------------------------------------------------
     11. VIEW ALL (recent conversations link)
  ---------------------------------------------------------- */
  var viewAll = qs('.viewall');
  if (viewAll) {
    viewAll.addEventListener('click', function (e) {
      e.preventDefault();
      navLinks[2].click();
    });
  }

  /* ----------------------------------------------------------
     12. BELL / NOTIFICATIONS
  ---------------------------------------------------------- */
  var bell = qs('.bell');
  var notifPanel = document.getElementById('notif-panel');
  var notifClose = qs('#notif-panel .panel-close');

  if (bell && notifPanel) {
    bell.addEventListener('click', function (e) {
      e.stopPropagation();
      notifPanel.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!notifPanel.contains(e.target) && e.target !== bell) {
        notifPanel.classList.remove('open');
      }
    });
  }
  if (notifClose) {
    notifClose.addEventListener('click', function () { notifPanel.classList.remove('open'); });
  }

  /* ----------------------------------------------------------
     13. MODAL helpers
  ---------------------------------------------------------- */
  function openModal(modal) {
    modal.removeAttribute('hidden');
    modal.classList.add('open');
    document.body.classList.add('modal-open');
    var first = modal.querySelector('button, input, textarea, [tabindex]');
    if (first) first.focus();
  }
  function closeModal(modal) {
    modal.classList.remove('open');
    modal.setAttribute('hidden', '');
    document.body.classList.remove('modal-open');
  }

  // Close modals on backdrop click
  qsa('.modal-backdrop').forEach(function (bd) {
    bd.addEventListener('click', function () {
      var modal = bd.closest('[id^="modal-"]');
      if (modal) closeModal(modal);
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      qsa('.modal.open').forEach(function (m) { closeModal(m); });
    }
  });

  /* ----------------------------------------------------------
     14. FILES SECTION — upload
  ---------------------------------------------------------- */
  var filesUploadBtn = document.getElementById('files-upload-btn');
  var filesInput = document.getElementById('files-section-input');

  if (filesUploadBtn && filesInput) {
    filesUploadBtn.addEventListener('click', function () { filesInput.click(); });
    filesInput.addEventListener('change', function () {
      if (filesInput.files && filesInput.files.length > 0) {
        Array.from(filesInput.files).forEach(function (f) { addFileToList(f); });
        filesInput.value = '';
      }
    });
  }

  function addFileToList(file) {
    var list = qs('#section-files .file-list');
    if (!list) return;
    var empty = qs('#section-files .files-empty');
    if (empty) empty.style.display = 'none';
    var ext = file.name.split('.').pop().toUpperCase();
    var size = file.size > 1024 * 1024
      ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
      : (file.size / 1024).toFixed(0) + ' KB';
    var item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = '<div class="file-icon">' + ext + '</div><div class="file-info"><strong>' + escHtml(file.name) + '</strong><small>' + size + ' • Just now</small></div><button class="icon-btn file-del" aria-label="Delete ' + escHtml(file.name) + '"><svg viewBox="0 0 24 24"><path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/></svg></button>';
    item.querySelector('.file-del').addEventListener('click', function () {
      item.remove();
      if (!list.children.length) { if (empty) empty.style.display = ''; }
    });
    list.appendChild(item);
    showToast('📄 Uploaded: ' + file.name);
  }

  /* ----------------------------------------------------------
     15. SETTINGS — save/reset
  ---------------------------------------------------------- */
  var settingsSave = document.getElementById('settings-save');
  var settingsReset = document.getElementById('settings-reset');
  if (settingsSave) {
    settingsSave.addEventListener('click', function () { showToast('✅ Settings saved'); });
  }
  if (settingsReset) {
    settingsReset.addEventListener('click', function () {
      qsa('#section-settings input[type="range"]').forEach(function (r) { r.value = r.defaultValue; });
      qsa('#section-settings input[type="checkbox"]').forEach(function (c) { c.checked = c.defaultChecked; });
      showToast('Settings reset to defaults');
    });
  }

  /* ----------------------------------------------------------
     16. TOAST NOTIFICATION
  ---------------------------------------------------------- */
  var toastQueue = [];
  var toastVisible = false;

  function showToast(msg) {
    toastQueue.push(msg);
    if (!toastVisible) flushToast();
  }

  function flushToast() {
    if (!toastQueue.length) { toastVisible = false; return; }
    toastVisible = true;
    var msg = toastQueue.shift();
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(flushToast, 300);
    }, 2800);
  }

  /* ----------------------------------------------------------
     17. HISTORY FILTER CHIPS
  ---------------------------------------------------------- */
  var filterChips = qsa('.filter-chip');
  filterChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      filterChips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      var filter = chip.dataset.filter;
      qsa('#history-list .conv').forEach(function (conv) {
        if (filter === 'all' || (conv.dataset.tags || '').includes(filter)) {
          conv.style.display = '';
        } else {
          conv.style.display = 'none';
        }
      });
    });
  });

  /* History search */
  var histSearch = document.getElementById('history-search');
  if (histSearch) {
    histSearch.addEventListener('input', function () {
      var q = histSearch.value.toLowerCase();
      qsa('#history-list .conv').forEach(function (conv) {
        var text = (conv.querySelector('h4') || {}).textContent || '';
        conv.style.display = text.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  /* ----------------------------------------------------------
     18. NC CHIPS → fill nc-prompt
  ---------------------------------------------------------- */
  qsa('[data-nc-fill]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (ncPrompt) {
        ncPrompt.value = b.textContent.trim();
        ncPrompt.focus();
      }
    });
  });

  /* NC attach button */
  var ncAttach = document.getElementById('nc-attach');
  if (ncAttach && fileInput) {
    ncAttach.addEventListener('click', function () { fileInput.click(); });
  }

  /* NC library button (second .tool[data-action="library"]) */
  var allLibraryBtns = qsa('[data-action="library"]');
  allLibraryBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { if (libraryModal) openModal(libraryModal); });
  });

  /* ----------------------------------------------------------
     19. SETTINGS SLIDERS (live value display)
  ---------------------------------------------------------- */
  var tempRange = document.getElementById('temp-range');
  var tempVal = document.getElementById('temp-val');
  if (tempRange && tempVal) {
    tempRange.addEventListener('input', function () { tempVal.textContent = tempRange.value; });
  }
  var ctxRange = document.getElementById('ctx-range');
  var ctxVal = document.getElementById('ctx-val');
  if (ctxRange && ctxVal) {
    ctxRange.addEventListener('input', function () { ctxVal.textContent = ctxRange.value + 'k'; });
  }

  /* ----------------------------------------------------------
     20. FILES EMPTY UPLOAD BUTTON
  ---------------------------------------------------------- */
  var filesEmptyUpload = document.getElementById('files-empty-upload');
  if (filesEmptyUpload && filesInput) {
    filesEmptyUpload.addEventListener('click', function () { filesInput.click(); });
  }

  /* ----------------------------------------------------------
     21. SIGN OUT BUTTON
  ---------------------------------------------------------- */
  var signOutBtn = document.getElementById('sign-out-btn');
  var settingsSignOut = document.getElementById('settings-signout');
  function handleSignOut() {
    showToast('Signing out…');
    setTimeout(function () {
      try { sessionStorage.removeItem('maira_user'); } catch(e) {}
      window.location.href = 'login.html';
    }, 900);
  }
  if (signOutBtn) signOutBtn.addEventListener('click', handleSignOut);
  if (settingsSignOut) settingsSignOut.addEventListener('click', handleSignOut);

  /* ----------------------------------------------------------
     22. INIT — show dashboard by default, hide other sections
  ---------------------------------------------------------- */
  qsa('[data-section]').forEach(function (s) { s.style.display = 'none'; });

  /* Re-bind libraryBtn since we now handle all [data-action="library"] above */
  /* (the original libraryBtn listener is superseded — no-op) */

})();

