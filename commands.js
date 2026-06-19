/* MANPAGES.EXE — commands.js */

const OS_META = {
  universal:  { label: '★ Universel',   color: '#999999' },
  debian:     { label: 'Debian/Ubuntu', color: '#D70A53' },
  alpine:     { label: 'Alpine Linux',  color: '#0D597F' },
  arch:       { label: 'Arch Linux',    color: '#1793D1' },
  rhel:       { label: 'RHEL/Fedora',   color: '#EE0000' },
  freebsd:    { label: 'FreeBSD',       color: '#AB2B28' },
  macos:      { label: 'macOS',         color: '#A8A8A8' },
  windows:    { label: 'Windows',       color: '#0078D4' },
  'windows-server': { label: 'Windows Server', color: '#2f6fb3' },
  powershell: { label: 'PowerShell',    color: '#5391FE' },
  docker:     { label: 'Docker',        color: '#2496ED' },
  ansible:    { label: 'Ansible',       color: '#EE0000' },
  git:        { label: 'Git',           color: '#F05032' },
  kubectl:    { label: 'Kubernetes',    color: '#326CE5' },
};

let activeOS  = 'all';
let activeCat = 'all';
let query     = '';

function init() {
  // Compteurs dynamiques par OS
  var osCounts = {};
  COMMANDS.forEach(function(c) { osCounts[c.os] = (osCounts[c.os] || 0) + 1; });
  Object.keys(osCounts).forEach(function(os) {
    var el = document.getElementById('count-' + os);
    if (el) el.textContent = osCounts[os];
  });
  var allEl = document.getElementById('count-all');
  if (allEl) allEl.textContent = COMMANDS.length;

  renderGrid(COMMANDS);
  updateCount(COMMANDS.length);

  document.getElementById('searchInput').addEventListener('input', function() {
    query = this.value.toLowerCase().trim();
    filter();
  });

  function bindOsFilter(containerId) {
    var el = document.getElementById(containerId);
    if (!el) return;
    el.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-os]');
      if (!btn) return;
      // Désactive tous les os-pill dans les deux listes
      document.querySelectorAll('[data-os]').forEach(function(p) { p.classList.remove('active'); });
      btn.classList.add('active');
      activeOS = btn.dataset.os;
      filter();
    });
  }
  bindOsFilter('osFilters');
  bindOsFilter('toolFilters');

  document.getElementById('catFilters').addEventListener('click', function(e) {
    var btn = e.target.closest('[data-cat]');
    if (!btn) return;
    document.querySelectorAll('[data-cat]').forEach(function(p) { p.classList.remove('active'); });
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    filter();
  });
}

function filter() {
  var results = COMMANDS.filter(function(c) {
    if (activeOS  !== 'all' && c.os !== activeOS)       return false;
    if (activeCat !== 'all' && c.category !== activeCat) return false;
    if (query) {
      var hay = [c.name, c.description, c.syntax]
        .concat((c.examples || []).map(function(e) { return e.cmd + ' ' + e.desc; }))
        .concat(c.flags || [])
        .join(' ').toLowerCase();
      if (hay.indexOf(query) === -1) return false;
    }
    return true;
  });
  renderGrid(results);
  updateCount(results.length);
}

function updateCount(n) {
  var el = document.getElementById('sidebarCount');
  if (el) el.textContent = n;
  var rc = document.getElementById('resultCount');
  if (rc) rc.textContent = n + '/' + COMMANDS.length;
}

function renderGrid(commands) {
  var grid  = document.getElementById('commandGrid');
  var empty = document.getElementById('emptyState');
  grid.innerHTML = '';

  if (!commands.length) {
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';

  var tpl = document.getElementById('cardTemplate');

  commands.forEach(function(cmd) {
    var meta  = OS_META[cmd.os] || { label: cmd.os, color: '#c9a84c' };
    var clone = tpl.content.cloneNode(true);
    var card  = clone.querySelector('.cmd-card');

    card.style.setProperty('--os-color', meta.color);

    clone.querySelector('.cmd-name').textContent    = cmd.name;
    clone.querySelector('.cmd-desc').textContent    = cmd.description;
    clone.querySelector('.cmd-syntax').textContent  = cmd.syntax;

    var osBadge = clone.querySelector('.os-badge');
    osBadge.textContent = meta.label;
    osBadge.style.color = meta.color;
    osBadge.style.borderColor = meta.color + '66';

    clone.querySelector('.cat-badge').textContent = cmd.category;

    var exList = clone.querySelector('.examples-list');
    (cmd.examples || []).forEach(function(ex) {
      var item = document.createElement('div');
      item.className = 'example-item';
      var code = document.createElement('code');
      code.className = 'example-cmd';
      code.textContent = ex.cmd;
      var desc = document.createElement('span');
      desc.className = 'example-desc';
      desc.textContent = ex.desc;
      item.appendChild(code);
      item.appendChild(desc);
      exList.appendChild(item);
    });

    if (cmd.flags && cmd.flags.length) {
      var flagsBlock = clone.querySelector('.cmd-flags');
      flagsBlock.style.display = 'flex';
      var ul = clone.querySelector('.flags-list');
      cmd.flags.forEach(function(f) {
        var li = document.createElement('li');
        li.textContent = f;
        ul.appendChild(li);
      });
    }

    var copyBtn = clone.querySelector('.copy-btn');
    var syntaxToCopy = cmd.syntax;
    copyBtn.addEventListener('click', function() {
      navigator.clipboard.writeText(syntaxToCopy).then(function() {
        var lbl = copyBtn.querySelector('.copy-label');
        copyBtn.classList.add('copied');
        lbl.textContent = '✓ Copié !';
        setTimeout(function() {
          copyBtn.classList.remove('copied');
          lbl.textContent = 'Copier';
        }, 1500);
      });
    });

    grid.appendChild(clone);
  });
}

window.addEventListener('load', init);

// ── THEME TOGGLE ──────────────────────────────────────────────
(function() {
  var html = document.documentElement;
  var btn  = document.getElementById('themeToggle');
  if (!btn) return;

  // Restore saved theme
  var saved = localStorage.getItem('mpx-theme');
  if (saved) html.setAttribute('data-theme', saved);

  btn.addEventListener('click', function() {
    var current = html.getAttribute('data-theme') || 'dark';
    var next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('mpx-theme', next);
  });
})();
