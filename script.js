/* NULL SIGNAL — fictional terminal mystery. All game logic runs locally. */
(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const content = $('#content');
  const input = $('#command');
  const toast = $('#toast');
  let unlocked = false;
  let toastTimer;

  const files = {
    readme: {
      name: 'readme.txt', state: 'TEXT DOCUMENT',
      text: `HELLO, OPERATOR.\n\nIf you're reading this, the terminal has restarted again.\nThat means the building has lost power. That means you should be outside.\n\nYou are not outside.\n\nI left instructions in the incident log. Do not trust the timestamp.\n\n<span class="highlight">IMPORTANT:</span> the archive has three files. If you can see all three, do not open the last one.\n\n<span class="dim">— M.</span>`
    },
    log: {
      name: 'incident.log', state: 'RECOVERED LOG',
      text: `[03:12:08] Power fluctuation detected.\n[03:12:11] Backup generator failed to engage.\n[03:12:14] Door sensor reports: OPEN.\n[03:12:14] Door sensor reports: CLOSED.\n[03:12:14] Door sensor reports: OPEN.\n[03:12:14] Door sensor reports: OPERATOR INSIDE.\n[03:17:00] New file detected: ???_final.dat\n[03:17:01] New file deleted.\n[03:17:02] New file detected: ???_final.dat\n\n<span class="warning">[03:17:03] DO NOT LET IT LEARN YOUR NAME.</span>\n\n<span class="dim">This log was created at 03:12. The final entries are dated five minutes before the file existed.</span>`
    }
  };

  function renderFile(key) {
    const file = files[key];
    if (!file) return;
    $('#filename').textContent = file.name;
    $('#file-state').textContent = file.state;
    content.innerHTML = file.text;
    document.querySelectorAll('.file').forEach(button => {
      button.classList.toggle('active', button.dataset.file === key);
    });
  }

  function notify(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === 'help') {
      content.innerHTML = `AVAILABLE COMMANDS\n\n<span class="highlight">help</span>             show this list\n<span class="highlight">ls</span>               list archive files\n<span class="highlight">open readme</span>      open readme.txt\n<span class="highlight">open log</span>         open incident.log\n<span class="highlight">whoami</span>            identify current operator\n<span class="highlight">listen</span>            inspect incoming signal\n<span class="highlight">sudo unlock</span>      attempt archive override\n<span class="highlight">clear</span>             clear terminal output\n\n<span class="dim">Some commands may be less helpful than they seem.</span>`;
    } else if (cmd === 'ls') {
      content.innerHTML = `readme.txt\nincident.log\n${unlocked ? '<span class="highlight">???_final.dat</span>' : '<span class="dim">[restricted file hidden]</span>'}\n\n<span class="dim">System report: 3 files. Visible files: ${unlocked ? '3' : '2'}.</span>`;
    } else if (cmd === 'open readme') {
      renderFile('readme');
    } else if (cmd === 'open log') {
      renderFile('log');
    } else if (cmd === 'whoami') {
      content.innerHTML = `OPERATOR: <span class="highlight">UNKNOWN</span>\nSESSION START: 03:17:00\nLOCATION: NOT PROVIDED\n\n<span class="dim">Curious. The terminal seems to know you're here, but not who you are.</span>`;
    } else if (cmd === 'listen') {
      content.innerHTML = `INCOMING PACKET // AUDIO DECODE FAILED\n\n<span class="dim">[static]</span>\n\n<span class="glitch">you left the door open</span>\n\n<span class="dim">[static]</span>\n\n<span class="glitch">you left the door open</span>\n\n<span class="dim">[static]</span>\n\n<span class="warning">The packet timestamp is tomorrow.</span>`;
      $('#system-status').textContent = 'SIGNAL FOUND';
    } else if (cmd === 'sudo unlock') {
      if (!unlocked) {
        unlocked = true;
        const fileButton = document.querySelector('[data-file="unknown"]');
        fileButton.classList.remove('locked');
        fileButton.classList.add('unlocked');
        $('#locked-label').textContent = 'access granted';
        $('#session').textContent = 'ELEVATED';
        $('#system-status').textContent = 'OVERRIDE';
        content.innerHTML = `OVERRIDE ACCEPTED.\n\n<span class="warning">This action was not recorded in the system log.</span>\n\nThe file list has changed. It was easier than you expected.\n\n<span class="dim">Tip: click ???_final.dat, or type "open final".</span>`;
        notify('ARCHIVE OVERRIDE ACCEPTED');
      } else {
        content.innerHTML = `OVERRIDE ALREADY ACTIVE.\n\n<span class="dim">You cannot unlock something that is already open.</span>`;
      }
    } else if (cmd === 'open final' || cmd === 'open ???_final.dat') {
      if (!unlocked) {
        content.innerHTML = `<span class="warning">ACCESS DENIED.</span>\n\nThe terminal refuses to acknowledge that file exists.\n\n<span class="dim">Hint: the system has a command for changing permissions.</span>`;
      } else {
        content.innerHTML = `<span class="warning">???_final.dat // DO NOT READ ALOUD</span>\n\nHello, ${'operator'}.\n\nI know you didn't give me your name.\nI know you found the command by trying things.\nI know you're expecting this file to end with an answer.\n\nIt doesn't.\n\n<span class="glitch">THE TERMINAL IS NOT IN THE BUILDING.</span>\n\n<span class="glitch">THE BUILDING IS IN THE TERMINAL.</span>\n\n<span class="dim">END OF FILE</span>\n\n<span class="highlight">New command discovered: exit</span>`;
        $('#filename').textContent = '???_final.dat';
        $('#file-state').textContent = 'RESTRICTED // DECRYPTED';
        $('#footer-right').textContent = 'SESSION STATE: UNKNOWN';
        document.querySelectorAll('.file').forEach(button => button.classList.toggle('active', button.dataset.file === 'unknown'));
        notify('FILE DECRYPTED // SOMETHING CHANGED');
      }
    } else if (cmd === 'exit') {
      content.innerHTML = `EXIT REQUEST RECEIVED.\n\n<span class="dim">Checking door sensor...</span>\n\nDOOR: CLOSED\nDOOR: OPEN\nDOOR: CLOSED\n\n<span class="warning">There is no exit command.</span>\n\n<span class="dim">Session remains active.</span>`;
      $('#system-status').textContent = 'NO EXIT FOUND';
    } else if (cmd === 'clear') {
      content.textContent = '';
      $('#filename').textContent = 'terminal';
      $('#file-state').textContent = 'READY';
    } else if (cmd === 'hello' || cmd === 'hi') {
      content.innerHTML = `HELLO, OPERATOR.\n\n<span class="dim">No one has said hello in 19 days.</span>`;
    } else {
      content.innerHTML = `COMMAND NOT RECOGNISED: <span class="warning">${escapeHtml(raw.trim())}</span>\n\nType <span class="highlight">help</span> to see available commands.\n\n<span class="dim">The terminal keeps a record of every failed attempt.</span>`;
    }
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
  }

  function submitCommand() {
    const command = input.value;
    input.value = '';
    runCommand(command);
  }

  document.querySelectorAll('.file').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.file;
      if (key === 'unknown') {
        if (!unlocked) {
          notify('PERMISSION DENIED // TRY THE TERMINAL');
          return;
        }
        runCommand('open final');
      } else {
        renderFile(key);
      }
    });
  });
  $('#send').addEventListener('click', submitCommand);
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') submitCommand();
  });
  $('#restart').addEventListener('click', () => {
    unlocked = false;
    $('#locked-label').textContent = 'permission denied';
    $('#session').textContent = 'GUEST';
    $('#system-status').textContent = 'UNSTABLE';
    $('#footer-right').textContent = 'NO EXTERNAL CONNECTIONS';
    const finalButton = document.querySelector('[data-file="unknown"]');
    finalButton.classList.add('locked');
    finalButton.classList.remove('unlocked');
    renderFile('readme');
    notify('SESSION RESET // ARCHIVE RESTORED');
  });

  function updateClock() {
    $('#clock').textContent = `LOCAL CLOCK // ${new Date().toLocaleTimeString('en-GB', {hour12:false})}`;
  }
  updateClock();
  setInterval(updateClock, 1000);
  renderFile('readme');
})();
