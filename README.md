# NULL SIGNAL

> Someone left the signal on.

**NULL SIGNAL** is a tiny, browser-based interactive mystery disguised as a computer terminal. Read recovered files, enter commands, unlock a restricted archive, and piece together what happened at Archive Node 07.

No build tools. No dependencies to install. No account. Just HTML, CSS, and JavaScript.

![Status](https://img.shields.io/badge/status-playable-9bffb4?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-9bffb4?style=flat-square)
![Dependencies](https://img.shields.io/badge/dependencies-zero-9bffb4?style=flat-square)

## Play it

**[Launch the game with GitHub Pages](../../)** — after enabling Pages in repository settings, choose **Deploy from a branch**, select `main` and `/ (root)`.

Or run it locally:

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Start with `readme.txt`, then explore the terminal.

```bash
git clone https://github.com/YOUR-USERNAME/null-signal.git
cd null-signal
```

There is no compilation step and no package installation.

## Commands

| Command | What it does |
| --- | --- |
| `help` | Lists known commands |
| `ls` | Lists archive files |
| `open readme` | Opens the readme |
| `open log` | Opens the incident log |
| `whoami` | Checks the current operator |
| `listen` | Inspects the incoming signal |
| `sudo unlock` | Attempts an archive override |
| `open final` | Opens the restricted file after unlocking |
| `exit` | Attempts to leave |
| `clear` | Clears the terminal panel |

**Spoiler-free hint:** the restricted file is not going to open itself.

## Features

- CRT-inspired terminal styling and subtle scanlines
- Responsive layout for desktop and mobile
- Command parser with useful feedback for unknown commands
- Hidden file and multi-step discovery
- Local clock and session state
- Keyboard-friendly controls and reduced-motion support
- Works as a static site, including GitHub Pages
- No analytics, accounts, cookies, or external game server

## Project structure

```text
null-signal/
├── index.html       # App structure and accessible controls
├── style.css        # Terminal look, layout, responsive rules
├── script.js        # Commands, story, and unlock state
├── README.md        # Project overview and setup
├── LICENSE          # MIT license
├── CONTRIBUTING.md  # How to contribute
└── .github/
    ├── ISSUE_TEMPLATE/
    │   ├── bug_report.md
    │   └── feature_request.md
    └── PULL_REQUEST_TEMPLATE.md
```

## Roadmap

- [ ] Add a second archive node with a separate story
- [ ] Add optional ambient audio with a mute control
- [ ] Add more discoverable commands and branching outcomes
- [ ] Add a small automated browser test suite
- [ ] Add translations for the terminal and story

## Contributing

Bug reports, story ideas, accessibility improvements, and code contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Safety and privacy

NULL SIGNAL is fictional. It does not access your files, run system commands, contact a server, or collect personal information. Terminal commands only affect the game displayed in the browser. The Google Fonts import in `style.css` is optional; the game remains usable if the font service is unavailable.

## License

Released under the [MIT License](LICENSE).
