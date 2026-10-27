# Paisa — expense tracker for irregular income

A phone-first web app (PWA) built around three ideas:

1. **Pay yourself a salary.** You set a monthly spending limit. The home screen shows one number: how much is *safe to spend today* (what's left this month ÷ days left, minus what you've already spent today).
2. **Pay the Vault first.** Your savings account is the *Vault*. When client money lands, Paisa asks you to move your split (default 30%) to the Vault.
3. **Borrowing from the Vault is a loan.** Any spend or transfer out of savings needs a reason and is tracked as money you owe yourself until you repay it.

Also: need/want tagging, a "money leaks" report (small repeated spends), category breakdown, 6-month trend, weekly check-in with streak, JSON backup/restore, EMI and chit fund categories, lend-to-friends and split-bill tracking with "paid back" settling.

## Run

No build step. Serve the folder over HTTP:

```bash
python -m http.server 5173
```

Open http://localhost:5173. To use it on your phone, host the folder anywhere static (GitHub Pages, Netlify, Cloudflare Pages), open it in Chrome/Safari and choose **Add to Home Screen**.

## Data

Everything is stored in `localStorage` on the device (key `paisa.v1`). Use **Settings → Export backup** regularly; clearing browser data erases it.

## Files

- `index.html` — shell
- `styles.css` — design tokens (light theme) and components
- `app.js` — state, calculations, views, sheets
- `sw.js`, `manifest.webmanifest` — offline/installable PWA
- `assets/` — logo mark, wordmark and app icons
