// Paisa — a salary-for-yourself expense tracker. Data lives in localStorage on this device.
const KEY = 'paisa.v1';

/* ---------------- line icons (Lucide-style, 24px grid) ---------------- */
const svg = (body, size = 20) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
const P = {
  food: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  eatout: '<path d="M10 2v2M14 2v2M6 2v2M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>',
  grocery: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  transport: '<path d="M8 6v6M15 6v6M2 12h19.6M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2s-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3M9 18h5"/><circle cx="7" cy="18" r="2"/><circle cx="16" cy="18" r="2"/>',
  fuel: '<path d="M3 22h12M4 9h10M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  bills: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  phone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
  health: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  family: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/><circle cx="9" cy="7" r="4"/>',
  work: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/>',
  edu: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  shopping: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0"/>',
  subs: '<path d="m17 2 4 4-4 4M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 0 1-4 4H3"/>',
  fun: '<rect x="2" y="2" width="20" height="20" rx="2.2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/>',
  travel: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  gifts: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
  other: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  design: '<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".6" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".6" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".6" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".6" fill="currentColor"/>',
  freelance: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  misc_in: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18M7 6h1v4M16.71 13.88l.7.71-2.82 2.82"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  unlock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  back: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  spark: '<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.13a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.13 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.13a.5.5 0 0 1-.96 0z"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4M12 17h.01"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  emi: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l8 5H4z"/>',
  chit: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h.01"/>',
  leak: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z"/>',
};
const icon = (name, size) => svg(P[name] || P.other, size);

/* ---------------- categories ---------------- */
const CATS = {
  expense: [
    ['food', 'Food', true], ['eatout', 'Eating out', false], ['grocery', 'Groceries', true],
    ['transport', 'Transport', true], ['fuel', 'Fuel', true], ['home', 'Rent & home', true],
    ['emi', 'EMI / loan', true], ['chit', 'Chit fund', true], ['bills', 'Bills', true], ['phone', 'Phone & net', true], ['health', 'Health', true],
    ['family', 'Family', true], ['work', 'Work tools', true], ['edu', 'Learning', true],
    ['shopping', 'Shopping', false], ['subs', 'Subscriptions', false], ['fun', 'Fun', false],
    ['travel', 'Travel', false], ['gifts', 'Gifts', false], ['other', 'Other', false],
  ],
  income: [['design', 'Design work'], ['freelance', 'Other work'], ['misc_in', 'Gift / misc']],
};
const CAT = Object.fromEntries([...CATS.expense, ...CATS.income].map(([id, name, need]) => [id, { id, name, icon: icon(id), need }]));

/* ---------------- UI icons ---------------- */
const I = {
  home: icon('home', 21),
  history: svg('<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/>', 21),
  vault: svg('<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="12" cy="12" r="3.5"/><path d="M12 8.5V7M12 17v-1.5M15.5 12H17M7 12h1.5"/>', 21),
  report: svg('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>', 21),
  plus: svg('<path d="M12 5v14M5 12h14"/>', 26),
  gear: svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
  left: svg('<path d="m15 18-6-6 6-6"/>', 18),
  right: svg('<path d="m9 18 6-6-6-6"/>', 18),
  close: svg('<path d="M18 6 6 18M6 6l12 12"/>', 18),
  search: svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', 18),
  swap: svg('<path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>', 18),
  download: svg('<path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>', 19),
};

/* ---------------- dates & money ---------------- */
const pad = (n) => String(n).padStart(2, '0');
const dstr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = () => dstr(new Date());
const parseD = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (s, n) => { const d = parseD(s); d.setDate(d.getDate() + n); return dstr(d); };
const ymOf = (s) => s.slice(0, 7);
const daysIn = (ym) => { const [y, m] = ym.split('-').map(Number); return new Date(y, m, 0).getDate(); };
const shiftYm = (ym, n) => { const [y, m] = ym.split('-').map(Number); const d = new Date(y, m - 1 + n, 1); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`; };
const monthName = (ym, short) => parseD(ym + '-01').toLocaleString('en-IN', short ? { month: 'short' } : { month: 'long', year: 'numeric' });
const dayLabel = (s) => {
  const t = today();
  if (s === t) return 'Today';
  if (s === addDays(t, -1)) return 'Yesterday';
  return parseD(s).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });
};
const nf = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });
const money = (n, opts = {}) => {
  const a = Math.round(Math.abs(n) * 100) / 100;
  const sign = n < 0 ? '−' : opts.plus && n > 0 ? '+' : '';
  return `${sign}₹${nf.format(a)}`;
};
// Big number with the paise dimmed, like the reference design.
const bigMoney = (n) => {
  const a = Math.abs(n);
  const whole = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.floor(a));
  const dec = pad(Math.round((a - Math.floor(a)) * 100) % 100);
  return `${n < 0 ? '−' : ''}₹${whole}<span class="dec">.${dec}</span>`;
};
const compact = (n) => {
  const a = Math.abs(n);
  if (a >= 1e5) return '₹' + (n / 1e5).toFixed(1).replace(/\.0$/, '') + 'L';
  if (a >= 1e3) return '₹' + (n / 1e3).toFixed(a >= 1e4 ? 0 : 1).replace(/\.0$/, '') + 'k';
  return '₹' + Math.round(n);
};
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
const r2 = (n) => Math.round(n * 100) / 100;
const sum = (arr) => arr.reduce((s, t) => s + t.amount, 0);
// Your own share of an expense: a split bill only counts what you didn't get back.
const share = (t) => t.amount - (t.split || []).reduce((s, x) => s + x.amt, 0);
const spend = (arr) => arr.reduce((s, t) => s + share(t), 0);
const byDate = (a, b) => (a.date === b.date ? (a.ts || 0) - (b.ts || 0) : a.date < b.date ? -1 : 1);
const names = (s) => [...new Set(String(s || '').split(',').map((x) => x.trim()).filter(Boolean))];

/* ---------------- state ---------------- */
function blank() {
  return {
    v: 1, setup: false, createdAt: today(),
    settings: { name: '', limit: 30000, split: 30, goal: 100000 },
    accounts: { primary: { name: 'Primary', opening: 0 }, savings: { name: 'Savings', opening: 0 } },
    txns: [],
    checkin: { last: null, streak: 0 },
  };
}
function load() {
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 1) return s; } catch {}
  return blank();
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} }

let S = load();
let view = 'home';
const ui = { histMonth: ymOf(today()), histFilter: 'all', histQuery: '', repMonth: ymOf(today()) };

/* ---------------- derived numbers ---------------- */
const accName = (a) => S.accounts[a].name;
function balance(a) {
  let b = +S.accounts[a].opening || 0;
  for (const t of S.txns) {
    if ((t.type === 'income' || t.type === 'settle') && t.acc === a) b += t.amount;
    else if ((t.type === 'expense' || t.type === 'lend') && t.acc === a) b -= t.amount;
    else if (t.type === 'transfer') { if (t.acc === a) b -= t.amount; if (t.to === a) b += t.amount; }
  }
  return b;
}
// Anything leaving the Vault (except splitting an income that landed there) is a loan to yourself.
const outOfVault = (t) => ((t.type === 'expense' || t.type === 'lend') && t.acc === 'savings') || (t.type === 'transfer' && t.acc === 'savings');
const isLoan = (t) => outOfVault(t) && !t.forIncome;
const isRepay = (t) => t.type === 'transfer' && t.to === 'savings' && t.kind === 'repay';
function loans() {
  const list = S.txns.filter(isLoan).sort(byDate).map((t) => ({ t, left: t.amount }));
  let pool = sum(S.txns.filter(isRepay));
  for (const l of list) { const p = Math.min(pool, l.left); l.left -= p; pool -= p; }
  const owed = list.reduce((s, l) => s + l.left, 0);
  return { list, owed, open: list.filter((l) => l.left > 0.009) };
}
// Friends: what each person owes you from money lent and bills you split.
function people() {
  const m = new Map();
  const add = (who, v, t) => {
    const k = String(who || '').trim().toLowerCase();
    if (!k) return;
    const p = m.get(k) || { name: String(who).trim(), owed: 0, last: '' };
    p.owed += v; if (t.date > p.last) p.last = t.date;
    m.set(k, p);
  };
  for (const t of S.txns) {
    if (t.type === 'lend') add(t.who, t.amount, t);
    else if (t.type === 'settle') add(t.who, -t.amount, t);
    else if (t.type === 'expense' && t.split) for (const s of t.split) add(s.who, s.amt, t);
  }
  const list = [...m.values()].map((p) => ({ ...p, owed: r2(p.owed) })).sort((a, b) => b.owed - a.owed || (a.last < b.last ? 1 : -1));
  return { list, total: list.reduce((s, p) => s + Math.max(0, p.owed), 0), open: list.filter((p) => p.owed > 0.009) };
}
const owedBy = (who) => people().list.find((p) => p.name.toLowerCase() === String(who || '').trim().toLowerCase())?.owed || 0;

function monthStats(ym) {
  const ts = S.txns.filter((t) => ymOf(t.date) === ym);
  const exp = ts.filter((t) => t.type === 'expense');
  const inc = ts.filter((t) => t.type === 'income');
  const into = sum(ts.filter((t) => (t.type === 'transfer' && t.to === 'savings') || ((t.type === 'income' || t.type === 'settle') && t.acc === 'savings')));
  return {
    ts, exp, inc, spent: spend(exp), income: sum(inc),
    need: spend(exp.filter((t) => t.need)), want: spend(exp.filter((t) => !t.need)),
    vaultNet: into - sum(ts.filter(outOfVault)),
  };
}
function safeToSpend() {
  const t = today(), ym = ymOf(t), day = +t.slice(8), days = daysIn(ym), limit = +S.settings.limit || 0;
  const ms = S.txns.filter((x) => x.type === 'expense' && ymOf(x.date) === ym);
  const spentToday = spend(ms.filter((x) => x.date === t));
  const spentBefore = spend(ms.filter((x) => x.date < t));
  const daysLeft = days - day + 1;
  const allowance = (limit - spentBefore) / daysLeft;
  return { limit, spent: spend(ms), spentToday, daysLeft, allowance, today: allowance - spentToday, pace: (limit * day) / days };
}
function pendingSplits() {
  const split = (+S.settings.split || 0) / 100;
  if (!split) return [];
  const cutoff = addDays(today(), -45);
  return S.txns
    .filter((t) => t.type === 'income' && !t.splitSkip && t.date >= cutoff && !S.txns.some((x) => x.forIncome === t.id))
    .sort((a, b) => -byDate(a, b)).slice(0, 2)
    .map((t) => t.acc === 'primary'
      ? { t, amt: Math.round(t.amount * split), from: 'primary', to: 'savings' }
      : { t, amt: Math.round(t.amount * (1 - split)), from: 'savings', to: 'primary' });
}
function weekReview() {
  const t = today(), from = addDays(t, -6);
  const ex = S.txns.filter((x) => x.type === 'expense' && x.date >= from && x.date <= t);
  const byCat = {};
  for (const x of ex) byCat[x.cat] = (byCat[x.cat] || 0) + share(x);
  const top = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0];
  return { total: spend(ex), want: spend(ex.filter((x) => !x.need)), top, n: ex.length };
}
const checkinDue = () => (parseD(today()) - parseD(S.checkin.last || S.createdAt)) / 864e5 >= 7;

/* ---------------- rendering ---------------- */
const app = document.getElementById('app');
const tabbar = document.getElementById('tabbar');

function render() {
  if (!S.setup) { tabbar.hidden = true; app.innerHTML = viewOnboarding(); return; }
  tabbar.hidden = false;
  app.innerHTML = { home: viewHome, history: viewHistory, vault: viewVault, report: viewReport }[view]();
  tabbar.innerHTML = `<div class="inner">
    ${tab('home', 'Home', I.home)}${tab('history', 'History', I.history)}
    <div class="fab-wrap"><button class="fab" data-act="add" aria-label="Add transaction">${I.plus}</button><span>Add</span></div>
    ${tab('vault', 'Vault', I.vault)}${tab('report', 'Report', I.report)}
  </div>`;
}
const tab = (id, label, ic) => `<button class="tab ${view === id ? 'on' : ''}" data-act="go" data-v="${id}"><span class="tic">${ic}</span>${label}</button>`;
const emptyState = (msg, ic = 'other') => `<div class="empty"><span class="empty-ic">${icon(ic, 26)}</span><div>${msg}</div></div>`;

function txRow(t) {
  const c = CAT[t.cat] || CAT.other;
  const loan = isLoan(t), repay = isRepay(t);
  let title = t.note || c.name, sub = `${esc(c.name)} · ${esc(accName(t.acc))}`, amt, cls, tone, ic = c.icon;
  if (t.type === 'transfer') {
    title = t.note || (repay ? 'Repaid Vault loan' : t.to === 'savings' ? 'Moved to Vault' : 'Moved to spending');
    sub = `${esc(accName(t.acc))} → ${esc(accName(t.to))}`;
    amt = money(t.amount); cls = 'xfer'; tone = 'gray'; ic = icon(t.to === 'savings' ? 'lock' : 'back');
  } else if (t.type === 'lend') {
    title = `Lent to ${t.who}`; sub = `${t.note ? esc(t.note) + ' · ' : ''}${esc(accName(t.acc))}`;
    amt = money(-t.amount); cls = 'xfer'; tone = 'blue'; ic = icon('misc_in');
  } else if (t.type === 'settle') {
    title = `${t.who} paid you back`; sub = `${t.note ? esc(t.note) + ' · ' : ''}${esc(accName(t.acc))}`;
    amt = money(t.amount, { plus: true }); cls = 'in'; tone = 'blue'; ic = icon('check');
  } else if (t.type === 'income') {
    amt = money(t.amount, { plus: true }); cls = 'in'; tone = 'green';
  } else {
    amt = money(-t.amount); cls = 'out'; tone = 'orange';
  }
  const tags = [
    loan ? '<span class="tag loan">Vault loan</span>' : '',
    repay ? '<span class="tag repay">Repayment</span>' : '',
    t.type === 'lend' ? '<span class="tag friend">Owes you</span>' : '',
    t.split?.length ? `<span class="tag friend">Split · your share ${money(share(t))}</span>` : '',
    t.type === 'expense' && !t.need && !loan ? '<span class="tag want">Want</span>' : '',
  ].join('');
  return `<button class="tx" data-act="edit" data-id="${t.id}">
    <span class="ic ${tone}">${ic}</span>
    <span class="grow"><div class="t1">${esc(title)}</div><div class="t2">${sub}${tags}</div></span>
    <span class="amt ${cls}">${amt}</span>
  </button>`;
}

function txList(list) {
  if (!list.length) return emptyState('Nothing here yet.<br>Tap <b>+</b> to log your first one.');
  const groups = {};
  for (const t of list) (groups[t.date] ||= []).push(t);
  return Object.keys(groups).sort().reverse().map((d) => {
    const g = groups[d].sort((a, b) => -byDate(a, b));
    const out = spend(g.filter((t) => t.type === 'expense'));
    return `<div class="day-head"><span>${dayLabel(d)}</span><span>${out ? 'Spent ' + money(out) : ''}</span></div>${g.map(txRow).join('')}`;
  }).join('');
}

/* ---- Home ---- */
function viewHome() {
  const s = safeToSpend(), L = loans(), P = pendingSplits(), F = people();
  const ms = monthStats(ymOf(today()));
  const over = s.today < 0, limitGone = s.allowance <= 0;
  const pct = s.limit ? Math.min(100, (s.spent / s.limit) * 100) : 0;
  const pacePct = s.limit ? Math.min(100, (s.pace / s.limit) * 100) : 0;
  const diff = Math.round(s.spent - s.pace);
  const initial = (S.settings.name || 'P').trim()[0].toUpperCase();
  const recent = [...S.txns].sort((a, b) => -byDate(a, b)).slice(0, 5);

  let heroLabel = 'Safe to spend today', heroVal = bigMoney(Math.max(0, s.today));
  let heroNote = `${money(Math.max(0, Math.round(s.allowance)))} a day · ${s.daysLeft} day${s.daysLeft > 1 ? 's' : ''} left`;
  if (limitGone) { heroLabel = 'Monthly limit used up'; heroVal = bigMoney(s.limit - s.spent); heroNote = 'Every spend now borrows from next month'; }
  else if (over) { heroLabel = 'Over today\'s budget by'; heroVal = bigMoney(-s.today); heroNote = 'Tomorrow’s allowance will shrink to fit'; }

  const alerts = [];
  for (const p of P) {
    const toVault = p.to === 'savings';
    alerts.push(`<div class="alert accent"><span class="ic">${icon('cash', 18)}</span><div class="grow">
      <div class="h3">${money(p.t.amount)} landed in ${esc(accName(p.t.acc))}</div>
      <p>${toVault ? `Pay your Vault first: move <b>${money(p.amt)}</b> (${S.settings.split}%) to ${esc(accName('savings'))}.`
        : `Your salary share is <b>${money(p.amt)}</b>. Move it to ${esc(accName('primary'))} and leave the rest locked.`}</p>
      <div class="row"><button class="btn sm" data-act="split" data-id="${p.t.id}" data-amt="${p.amt}" data-from="${p.from}" data-to="${p.to}">Move ${compact(p.amt)} now</button>
      <button class="btn sm ghost" data-act="split-skip" data-id="${p.t.id}">Skip</button></div></div></div>`);
  }
  if (L.owed > 0) {
    alerts.push(`<div class="alert bad"><span class="ic">${icon('unlock', 18)}</span><div class="grow">
      <div class="h3">You owe your Vault ${money(L.owed)}</div>
      <p>${L.open.length} withdrawal${L.open.length > 1 ? 's' : ''} not paid back yet.</p>
      <button class="btn sm ink" data-act="go" data-v="vault">See loans</button></div></div>`);
  }

  return `<div class="fade-in">
  <section class="hero ${over || limitGone ? 'over' : ''}">
    <div class="hero-top">
      <button class="avatar" data-act="settings" aria-label="Settings">${esc(initial)}</button>
      <span class="chip">${monthName(ymOf(today()))}</span>
      <button class="glass-btn" data-act="settings" aria-label="Settings">${I.gear}</button>
    </div>
    <div class="hero-label">${heroLabel}</div>
    <div class="hero-amount num">${heroVal}</div>
    <span class="hero-note">${heroNote}</span>
  </section>

  <section class="sheet-card">
    <div class="row between"><h2 class="h2">Your Money</h2><button class="chip" data-act="go" data-v="report">Details ${I.right}</button></div>
    <div class="money-grid">
      <button class="money-tile" data-act="go" data-v="history"><div class="ic blue">${icon('card')}</div><div class="lbl">${esc(accName('primary'))}</div><div class="val num">${money(balance('primary'))}</div></button>
      <button class="money-tile" data-act="go" data-v="vault"><div class="ic green">${icon('lock')}</div><div class="lbl">${esc(accName('savings'))} · Vault</div><div class="val num">${money(balance('savings'))}</div></button>
    </div>
    <button class="friends-row" data-act="friends">
      <span class="ic violet">${icon('family', 18)}</span>
      <span class="grow"><b>Friends owe you</b><div class="small muted">${F.open.length ? `${F.open.length} ${F.open.length > 1 ? 'people' : 'person'} · lent & split bills` : 'Lent money and split bills show up here'}</div></span>
      <b class="num">${money(F.total)}</b>${I.right}
    </button>
    <div style="margin-top:16px">
      <div class="row between small"><span class="sec">Spent this month</span><span><b class="num">${money(s.spent)}</b> <span class="muted">/ ${money(s.limit)}</span></span></div>
      <div class="meter" data-tip="Spent ${money(s.spent)} · expected by today ${money(Math.round(s.pace))}"><i class="${s.spent > s.limit ? 'over' : ''}" style="width:${pct}%"></i><b style="left:${pacePct}%"></b></div>
      <div class="small ${diff > 0 ? 'warn' : 'good'}">${s.limit ? (diff > 0 ? `${money(diff)} ahead of pace. Slow down a little.` : `${money(-diff)} under pace. Nice.`) : ''}</div>
    </div>
    ${checkinDue() && S.txns.length ? `<button class="banner" data-act="checkin">${icon('spark', 16)} Your weekly check-in is ready <span class="go">Open ${I.right}</span></button>` : ''}
  </section>

  ${alerts.length ? `<div class="stack" style="margin-top:14px">${alerts.join('')}</div>` : ''}

  <div class="section-head"><h2 class="h2">Transactions</h2><button class="chip outline-accent" data-act="go" data-v="history">Show all</button></div>
  <div class="row between small sec" style="margin:0 4px 8px"><span>${parseD(today()).toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</span><span>Today: <b>${money(s.spentToday)}</b></span></div>
  ${recent.length ? recent.map(txRow).join('') : txList([])}
  <div class="kpis" style="margin-top:14px">
    <div class="kpi"><div class="l">Earned in ${monthName(ymOf(today()), true)}</div><div class="v num good">${money(ms.income)}</div></div>
    <div class="kpi"><div class="l">Vault this month</div><div class="v num ${ms.vaultNet < 0 ? 'bad' : ''}">${money(ms.vaultNet, { plus: true })}</div></div>
  </div>
  </div>`;
}

/* ---- History ---- */
function monthSwitch(key) {
  const cur = ui[key], max = ymOf(today());
  return `<div class="month-switch"><button data-act="month" data-k="${key}" data-d="-1" aria-label="Previous month">${I.left}</button><span>${monthName(cur, true)} ${cur.slice(0, 4)}</span><button data-act="month" data-k="${key}" data-d="1" ${cur >= max ? 'disabled' : ''} aria-label="Next month">${I.right}</button></div>`;
}
function viewHistory() {
  const f = ui.histFilter, q = ui.histQuery.trim().toLowerCase();
  let list = S.txns.filter((t) => ymOf(t.date) === ui.histMonth);
  if (f === 'expense' || f === 'income' || f === 'transfer') list = list.filter((t) => t.type === f);
  if (f === 'want') list = list.filter((t) => t.type === 'expense' && !t.need);
  if (f === 'loan') list = list.filter((t) => isLoan(t) || isRepay(t));
  if (f === 'friends') list = list.filter((t) => t.type === 'lend' || t.type === 'settle' || t.split?.length);
  if (q) list = list.filter((t) => `${t.note || ''} ${(CAT[t.cat] || {}).name || ''} ${t.reason || ''} ${t.who || ''} ${(t.split || []).map((x) => x.who).join(' ')} ${t.amount}`.toLowerCase().includes(q));
  const ms = monthStats(ui.histMonth);
  const pills = [['all', 'All'], ['expense', 'Expense'], ['income', 'Income'], ['transfer', 'Transfer'], ['friends', 'Friends'], ['want', 'Wants'], ['loan', 'Vault loans']];
  return `<div class="fade-in">
  <div class="topbar"><button class="icon-btn" data-act="go" data-v="home" aria-label="Back">${I.left}</button><div class="title-pill">History</div><button class="icon-btn" data-act="settings" aria-label="Settings">${I.gear}</button></div>
  <h1 class="page-title">History of Spending</h1>
  <div class="row between"><p class="page-sub" style="margin:0">In <b class="good">${compact(ms.income)}</b> · Out <b class="bad">${compact(ms.spent)}</b></p>${monthSwitch('histMonth')}</div>
  <div class="pills" style="margin-top:14px">${pills.map(([k, l]) => `<button class="pill ${f === k ? 'on' : ''}" data-act="filter" data-f="${k}">${l}</button>`).join('')}</div>
  <label class="search">${I.search}<input id="hist-q" type="search" placeholder="Search history" value="${esc(ui.histQuery)}" autocomplete="off"></label>
  <div id="hist-list">${txList(list)}</div>
  </div>`;
}

/* ---- Vault ---- */
function viewVault() {
  const bs = balance('savings'), L = loans(), goal = +S.settings.goal || 0;
  const ms = monthStats(ymOf(today()));
  const gp = goal ? Math.max(0, Math.min(100, (bs / goal) * 100)) : 0;
  const hist = S.txns.filter((t) => t.acc === 'savings' || t.to === 'savings').sort((a, b) => -byDate(a, b)).slice(0, 12);
  return `<div class="fade-in">
  <div class="topbar"><button class="icon-btn" data-act="go" data-v="home" aria-label="Back">${I.left}</button><div class="title-pill">Vault</div><button class="icon-btn" data-act="settings" aria-label="Settings">${I.gear}</button></div>
  <h1 class="page-title">Guard your savings</h1>
  <p class="page-sub">Your ${esc(accName('savings'))} account is a Vault. Taking from it is a loan you pay back.</p>

  <div class="vault-hero">
    <div class="row between"><div class="l">${esc(accName('savings'))} balance</div><span class="vh-ic">${icon('lock', 18)}</span></div>
    <div class="v num">${bigMoney(bs)}</div>
    ${goal ? `<div class="meter" data-tip="${Math.round(gp)}% of ${money(goal)} goal"><i style="width:${gp}%"></i></div>
    <div class="meta"><span>Goal ${money(goal)}</span><span>${bs >= goal ? 'Goal reached' : money(goal - bs) + ' to go'}</span></div>` : ''}
  </div>

  <div class="kpis" style="margin-top:12px">
    <div class="kpi"><div class="l">Added this month</div><div class="v num ${ms.vaultNet < 0 ? 'bad' : 'good'}">${money(ms.vaultNet, { plus: true })}</div></div>
    <div class="kpi"><div class="l">Owed to Vault</div><div class="v num ${L.owed > 0 ? 'bad' : 'good'}">${money(L.owed)}</div></div>
  </div>

  <div class="section-head"><h2 class="h2">Loans to yourself</h2>${L.owed > 0 ? `<button class="btn sm" data-act="repay" data-amt="${Math.round(L.owed)}">Repay</button>` : ''}</div>
  <div class="card">
    ${L.open.length ? L.open.slice().reverse().map((l) => `
      <div class="loan">
        <span class="grow"><div class="row between"><b>${esc(l.t.reason || l.t.note || 'No reason given')}</b><b class="bad num">${money(l.left)}</b></div>
        <div class="small muted">${dayLabel(l.t.date)} · took ${money(l.t.amount)}${l.left < l.t.amount ? ` · ${money(l.t.amount - l.left)} repaid` : ''}</div>
        <div class="bar"><i style="width:${((l.t.amount - l.left) / l.t.amount) * 100}%"></i></div></span>
      </div>`).join('')
    : emptyState('No debts to your Vault. Keep it that way.', 'shield')}
  </div>

  <div class="section-head"><h2 class="h2">The rules</h2></div>
  <div class="card">
    <div class="rule"><span class="n">1</span><span><b>Pay the Vault first</b>When money comes in, ${S.settings.split}% goes to ${esc(accName('savings'))} before you spend.</span></div>
    <div class="rule"><span class="n">2</span><span><b>Live on your salary</b>Spend from ${esc(accName('primary'))} within your ${money(S.settings.limit)} monthly limit.</span></div>
    <div class="rule"><span class="n">3</span><span><b>Borrowing needs a reason</b>Every rupee taken from the Vault is logged as a loan until you put it back.</span></div>
  </div>

  <div class="section-head"><h2 class="h2">Vault activity</h2></div>
  ${hist.length ? hist.map(txRow).join('') : emptyState('No Vault activity yet.', 'lock')}
  </div>`;
}

/* ---- Report ---- */
function donut(segs, centerV, centerL) {
  const total = segs.reduce((s, x) => s + x.v, 0);
  const R = 92, r = 64, cx = 115, cy = 115, gap = total ? 0.035 : 0;
  let a = 0;
  const arc = (a0, a1) => {
    const p = (ang, rad) => [cx + rad * Math.cos(ang), cy + rad * Math.sin(ang)];
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const [x0, y0] = p(a0, R), [x1, y1] = p(a1, R), [x2, y2] = p(a1, r), [x3, y3] = p(a0, r);
    return `M${x0} ${y0}A${R} ${R} 0 ${large} 1 ${x1} ${y1}L${x2} ${y2}A${r} ${r} 0 ${large} 0 ${x3} ${y3}Z`;
  };
  const paths = total ? segs.filter((s) => s.v > 0).map((s) => {
    const span = (s.v / total) * Math.PI * 2;
    const tip = `${s.label}: ${money(s.v)} (${Math.round((s.v / total) * 100)}%)`;
    if (span >= Math.PI * 2 - 1e-6) return `<circle cx="${cx}" cy="${cy}" r="${(R + r) / 2}" fill="none" stroke="${s.color}" stroke-width="${R - r}" data-tip="${esc(tip)}"/>`;
    const d = arc(a + gap / 2, a + span - gap / 2);
    a += span;
    return `<path d="${d}" fill="${s.color}" data-tip="${esc(tip)}"/>`;
  }).join('') : `<circle cx="${cx}" cy="${cy}" r="${(R + r) / 2}" fill="none" stroke="var(--surface-2)" stroke-width="${R - r}"/>`;
  return `<div class="donut-wrap"><svg viewBox="0 0 230 230" role="img" aria-label="${esc(segs.map((s) => `${s.label} ${money(s.v)}`).join(', '))}">${paths}</svg>
    <div class="donut-center"><div class="v num">${centerV}</div><div class="l">${centerL}</div></div></div>
    <div class="legend">${segs.map((s) => `<span class="chip"><i style="background:${s.color}"></i>${s.label} <b class="num">${total ? Math.round((s.v / total) * 100) : 0}%</b></span>`).join('')}</div>`;
}
function leaks(ms) {
  const by = {};
  for (const t of ms.exp) if (share(t) <= 500) (by[t.cat] ||= []).push(t);
  return Object.entries(by).filter(([, a]) => a.length >= 4)
    .map(([cat, a]) => ({ cat, n: a.length, total: spend(a) }))
    .sort((a, b) => b.total - a.total).slice(0, 3);
}
function viewReport() {
  const ym = ui.repMonth, ms = monthStats(ym);
  const saved = Math.max(0, ms.vaultNet);
  const base = ms.need + ms.want + saved;
  const rate = ms.income ? Math.round((ms.vaultNet / ms.income) * 100) : null;
  const byCat = {};
  for (const t of ms.exp) (byCat[t.cat] ||= { v: 0, n: 0 }), (byCat[t.cat].v += share(t)), byCat[t.cat].n++;
  const cats = Object.entries(byCat).sort((a, b) => b[1].v - a[1].v);
  const maxCat = cats[0]?.[1].v || 1;
  const lk = leaks(ms);
  const months = Array.from({ length: 6 }, (_, i) => shiftYm(ym, i - 5));
  const trend = months.map((m) => { const s = monthStats(m); return { m, inc: s.income, out: s.spent }; });
  const maxT = Math.max(1, ...trend.map((t) => Math.max(t.inc, t.out)));
  const limit = +S.settings.limit || 0;

  return `<div class="fade-in">
  <div class="topbar"><button class="icon-btn" data-act="go" data-v="home" aria-label="Back">${I.left}</button><div class="title-pill">Report</div><button class="icon-btn" data-act="export" aria-label="Export backup">${I.download}</button></div>
  <h1 class="page-title">Where your money really went</h1>
  <p class="page-sub">Needs, wants and what you kept. Tap any chart for exact numbers.</p>
  <div class="row between"><span class="h3">Report period</span>${monthSwitch('repMonth')}</div>

  <div class="card" style="margin-top:12px">
    ${donut([
      { label: 'Needs', v: ms.need, color: 'var(--s-need)' },
      { label: 'Wants', v: ms.want, color: 'var(--s-want)' },
      { label: 'Saved', v: saved, color: 'var(--s-save)' },
    ], base ? Math.round((saved / base) * 100) + '%' : '—', 'kept in Vault')}
  </div>

  <div class="kpis" style="margin-top:12px">
    <div class="kpi"><div class="l">Earned</div><div class="v num">${money(ms.income)}</div></div>
    <div class="kpi"><div class="l">Spent (your share)</div><div class="v num">${money(ms.spent)}</div>${limit ? `<div class="d ${ms.spent > limit ? 'bad' : 'good'}">${ms.spent > limit ? money(ms.spent - limit) + ' over limit' : money(limit - ms.spent) + ' under limit'}</div>` : ''}</div>
    <div class="kpi"><div class="l">Vault change</div><div class="v num ${ms.vaultNet < 0 ? 'bad' : ''}">${money(ms.vaultNet, { plus: true })}</div></div>
    <div class="kpi"><div class="l">Savings rate</div><div class="v num">${rate === null ? '—' : rate + '%'}</div><div class="d muted">of what you earned</div></div>
  </div>

  <div class="section-head"><h2 class="h2">Money leaks</h2></div>
  ${lk.length || ms.want ? `<div class="stack">${lk.map((l) => `<div class="alert warn"><span class="ic">${CAT[l.cat].icon}</span><div class="grow"><div class="h3">${CAT[l.cat].name}: ${l.n} small spends</div><p style="margin-bottom:0">They added up to <b>${money(l.total)}</b>, about <b>${compact(l.total * 12)}</b> a year at this rate.</p></div></div>`).join('')}
    ${ms.want ? `<div class="alert accent"><span class="ic">${icon('target', 18)}</span><div class="grow"><div class="h3">Wants: ${money(ms.want)}</div><p style="margin-bottom:0">Cut half of them and you’d save <b>${money(ms.want / 2)}</b> more this month.</p></div></div>` : ''}</div>`
    : `<div class="card">${emptyState('No leaks spotted this month.', 'leak')}</div>`}

  <div class="section-head"><h2 class="h2">By category</h2><span class="small muted">${cats.length} categories</span></div>
  <div class="card">${cats.length ? cats.map(([c, d]) => `<div class="hbar" data-tip="${esc(`${CAT[c]?.name || c}: ${money(d.v)} · ${d.n} txn · ${Math.round((d.v / ms.spent) * 100)}%`)}">
      <span class="hic">${CAT[c]?.icon || icon('other')}</span><span class="name">${CAT[c]?.name || c}</span><span class="val num">${money(d.v)}</span>
      <span class="track"><i style="width:${(d.v / maxCat) * 100}%"></i></span></div>`).join('')
    : emptyState('No spending this month.')}</div>

  <div class="section-head"><h2 class="h2">6-month trend</h2></div>
  <div class="card">
    <div class="legend" style="justify-content:flex-start;margin:0 0 6px"><span class="chip"><i style="background:var(--s-save)"></i>Earned</span><span class="chip"><i style="background:var(--s-want)"></i>Spent</span></div>
    <div class="cols">${trend.map((t) => `<div class="grp" data-tip="${esc(`${monthName(t.m, true)}: earned ${money(t.inc)} · spent ${money(t.out)}`)}">
      <i style="height:${(t.inc / maxT) * 100}%;background:var(--s-save)"></i><i style="height:${(t.out / maxT) * 100}%;background:var(--s-want)"></i></div>`).join('')}</div>
    <div class="cols-x">${trend.map((t) => `<span class="${t.m === ym ? 'cur' : ''}">${monthName(t.m, true)}</span>`).join('')}</div>
    <details><summary>Show as table</summary><table class="data"><thead><tr><th>Month</th><th>Earned</th><th>Spent</th><th>Net</th></tr></thead><tbody>
      ${trend.map((t) => `<tr><td>${monthName(t.m, true)}</td><td>${money(t.inc)}</td><td>${money(t.out)}</td><td class="${t.inc - t.out < 0 ? 'bad' : 'good'}">${money(t.inc - t.out, { plus: true })}</td></tr>`).join('')}
    </tbody></table></details>
  </div>
  </div>`;
}

/* ---- Onboarding ---- */
function viewOnboarding() {
  return `<div class="onb fade-in">
  <img class="wordmark" src="assets/wordmark.png" alt="Paisa">
  <h1>Pay yourself a salary.<br>Guard your savings.</h1>
  <p class="lead">Paisa turns lumpy freelance income into a steady daily budget, and makes every rupee taken from savings a loan you have to pay back.</p>
  <div class="field"><label for="o-name">Your name (optional)</label><input id="o-name" type="text" placeholder="e.g. Ashik" autocomplete="off"></div>
  <div class="field"><label for="o-p">Primary account (spending): balance now</label><input id="o-p" type="number" inputmode="decimal" placeholder="₹ 0"></div>
  <div class="field"><label for="o-s">Savings account (Vault): balance now</label><input id="o-s" type="number" inputmode="decimal" placeholder="₹ 0"></div>
  <div class="field"><label for="o-l">Monthly spending limit (your “salary”)</label><input id="o-l" type="number" inputmode="decimal" value="30000"></div>
  <div class="field"><label for="o-split">When money comes in, send this much to the Vault</label>
    <div class="range-row"><input id="o-split" type="range" min="0" max="70" step="5" value="30" oninput="this.nextElementSibling.value=this.value+'%'"><output>30%</output></div></div>
  <div class="sheet-actions" style="flex-direction:column">
    <button class="btn" data-act="onb-start">Start tracking</button>
    <button class="btn ghost" data-act="onb-demo">Explore with sample data</button>
  </div>
  <p class="small muted" style="text-align:center;margin-top:14px">Your data stays on this device. Nothing is uploaded.</p>
  </div>`;
}

/* ---------------- bottom sheets ---------------- */
const sheetRoot = document.getElementById('sheet-root');
let sheetFn = null;
let draft = null;
function openSheet(fn) { sheetFn = fn; drawSheet(); document.body.style.overflow = 'hidden'; }
function drawSheet() {
  const keepScroll = sheetRoot.querySelector('.sheet')?.scrollTop || 0;
  const fresh = !sheetRoot.querySelector('.sheet');
  sheetRoot.innerHTML = `<div class="backdrop" data-act="close-sheet"></div><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>${sheetFn()}</div>`;
  if (!fresh) {
    sheetRoot.querySelector('.backdrop').style.animation = 'none';
    const sh = sheetRoot.querySelector('.sheet'); sh.style.animation = 'none'; sh.scrollTop = keepScroll;
  }
}
function closeSheet() { sheetRoot.innerHTML = ''; sheetFn = null; draft = null; document.body.style.overflow = ''; }
const sheetHead = (title) => `<div class="row between" style="margin-top:4px"><h2 class="h2">${title}</h2><button class="icon-btn" data-act="close-sheet" aria-label="Close">${I.close}</button></div>`;

const draftIsLoan = () => draft && !draft.forIncome &&
  (((draft.type === 'expense' || draft.type === 'lend') && draft.acc === 'savings') || (draft.type === 'transfer' && draft.acc === 'savings'));
function splitPreview() {
  const n = names(draft.splitWith), amt = +draft.amount || 0;
  if (!n.length || !amt) return 'Add names separated by commas. The bill is split equally between you and them.';
  const each = r2(amt / (n.length + 1));
  return `Each of ${n.length} friend${n.length > 1 ? 's' : ''} owes you <b>${money(each)}</b>. Your share: <b>${money(r2(amt - each * n.length))}</b>.`;
}
function whoHint() {
  const o = owedBy(draft.who);
  return draft.who?.trim() ? (o > 0 ? `${esc(draft.who.trim())} owes you ${money(o)} right now.` : `${esc(draft.who.trim())} doesn’t owe you anything yet.`) : '';
}
function addSheet() {
  const d = draft, L = loans(), F = people();
  const isEdit = !!d.id;
  const cats = d.type === 'income' ? CATS.income : CATS.expense;
  const accChips = (label) => `<div class="field"><span class="lbl">${label}</span><div class="seg">
      ${['primary', 'savings'].map((a) => `<button class="${d.acc === a ? 'on' : ''}" data-act="d-acc" data-v="${a}">${icon(a === 'savings' ? 'lock' : 'card', 16)} ${esc(accName(a))}</button>`).join('')}</div></div>`;
  const whoField = (label) => `<div class="field"><label for="d-who">${label}</label>
      <input id="d-who" data-f="who" type="text" list="people-list" placeholder="Friend’s name" value="${esc(d.who)}" autocomplete="off">
      <datalist id="people-list">${F.list.map((p) => `<option value="${esc(p.name)}">`).join('')}</datalist>
      <div class="hint" id="who-hint">${whoHint()}</div></div>`;
  const amountLabel = { expense: 'Amount spent', income: 'Amount received', transfer: 'Amount to move', lend: 'Amount lent', settle: 'Amount paid back to you' }[d.type];

  let body = '';
  if (d.type === 'transfer') {
    body = `<div class="field"><span class="lbl">Move money</span><div class="xfer-row">
      <div class="acct"><small>From</small>${esc(accName(d.acc))}</div>
      <button class="icon-btn" data-act="d-swap" aria-label="Swap accounts">${I.swap}</button>
      <div class="acct"><small>To</small>${esc(accName(d.to))}</div></div>
      ${d.to === 'savings' && !d.forIncome ? `<div class="seg" style="margin-top:10px"><button class="${d.kind !== 'repay' ? 'on' : ''}" data-act="d-kind" data-v="save">Saving</button><button class="${d.kind === 'repay' ? 'on' : ''}" data-act="d-kind" data-v="repay">Repaying loan${L.owed > 0 ? ` (${compact(L.owed)})` : ''}</button></div>` : ''}
    </div>`;
  } else if (d.type === 'lend') {
    body = whoField('Lent to') + accChips('Paid from');
  } else if (d.type === 'settle') {
    body = whoField('Who paid you back?') + accChips('Received in');
  } else {
    body = `<div class="field"><span class="lbl">Category</span><div class="cat-grid">
      ${cats.map(([id, name]) => `<button class="cat ${d.cat === id ? 'on' : ''}" data-act="d-cat" data-v="${id}"><span class="e">${CAT[id].icon}</span>${name}</button>`).join('')}</div></div>
    ${d.type === 'expense' ? `<div class="field"><span class="lbl">Was it a need or a want?</span><div class="seg need">
      <button class="need ${d.need ? 'on' : ''}" data-act="d-need" data-v="1">Need</button><button class="want ${!d.need ? 'on' : ''}" data-act="d-need" data-v="0">Want</button></div></div>
    <div class="field"><span class="lbl">Split this bill with friends?</span><div class="seg">
      <button class="${!d.splitOn ? 'on' : ''}" data-act="d-split" data-v="0">Just me</button><button class="${d.splitOn ? 'on' : ''}" data-act="d-split" data-v="1">${icon('family', 16)} Split it</button></div>
      ${d.splitOn ? `<input data-f="splitWith" type="text" list="people-list" placeholder="e.g. Rahul, Anas" value="${esc(d.splitWith)}" style="margin-top:10px" autocomplete="off">
        <datalist id="people-list">${F.list.map((p) => `<option value="${esc(p.name)}">`).join('')}</datalist>
        <div class="hint" id="split-hint">${splitPreview()}</div>` : ''}
    </div>` : ''}
    ${accChips(d.type === 'income' ? 'Received in' : 'Paid from')}`;
  }

  return `${sheetHead(isEdit ? 'Edit transaction' : 'Add Transaction')}
  ${isEdit ? '' : '<h1 class="page-title" style="font-size:26px">Quick &amp; easy tracking<br>for your money.</h1>'}
  <div class="pills" style="margin-top:10px">${[['expense', 'Expense'], ['income', 'Income'], ['transfer', 'Transfer'], ['lend', 'Lent'], ['settle', 'Paid back']].map(([k, l]) => `<button class="pill ${d.type === k ? 'on' : ''}" data-act="d-type" data-v="${k}">${l}</button>`).join('')}</div>

  <div class="amount-card"><div class="l">${amountLabel}</div>
    <div class="amount-input"><span>₹</span><input id="d-amount" data-f="amount" type="number" inputmode="decimal" step="0.01" min="0" placeholder="0" value="${esc(d.amount)}" aria-label="Amount"></div></div>

  ${body}

  ${draftIsLoan() ? `<div class="loan-warn"><h4>${icon('alert', 16)} You’re taking from your Vault</h4>
    <p>This becomes a loan of <b id="loan-amt">${money(+d.amount || 0)}</b> you owe your savings until you pay it back.</p>
    <textarea data-f="reason" placeholder="Why do you need this? (required)">${esc(d.reason)}</textarea></div>` : ''}

  <div class="field"><label for="d-date">Date</label><input id="d-date" data-f="date" type="date" value="${esc(d.date)}" max="${addDays(today(), 31)}"></div>
  <div class="field"><label for="d-note">Description (optional)</label><input id="d-note" data-f="note" type="text" placeholder="${d.type === 'lend' ? 'e.g. For his bike repair' : 'e.g. Coffee with friends'}" value="${esc(d.note)}" autocomplete="off"></div>

  <div class="sheet-actions">
    ${isEdit ? `<button class="btn danger" style="width:auto;padding:0 22px" data-act="d-delete">Delete</button>` : ''}
    <button class="btn" data-act="d-save">${isEdit ? 'Save changes' : 'Save'}</button>
  </div>`;
}
function openAdd(pre = {}) {
  const base = { type: 'expense', amount: '', cat: 'food', acc: 'primary', to: 'savings', need: true, note: '', date: today(), reason: '', kind: 'save', forIncome: null, who: '', splitOn: false, splitWith: '' };
  draft = { ...base, ...pre };
  openSheet(addSheet);
  if (!pre.id && !pre.amount) setTimeout(() => document.getElementById('d-amount')?.focus(), 260);
}
function saveDraft() {
  const d = draft;
  const amount = r2(parseFloat(d.amount));
  if (!amount || amount <= 0) return toast('Enter an amount first');
  if ((d.type === 'lend' || d.type === 'settle') && !d.who.trim()) return toast('Add the friend’s name');
  const splitNames = d.type === 'expense' && d.splitOn ? names(d.splitWith) : [];
  if (d.type === 'expense' && d.splitOn && !splitNames.length) return toast('Add who you split it with');
  if (draftIsLoan() && (d.reason || '').trim().length < 3) return toast('Add a reason for taking from your Vault');
  const t = { id: d.id || uid(), ts: d.ts || Date.now(), type: d.type, amount, date: d.date || today(), note: (d.note || '').trim(), acc: d.acc };
  if (d.type === 'transfer') { t.cat = 'transfer'; t.to = d.acc === 'primary' ? 'savings' : 'primary'; if (t.to === 'savings') t.kind = d.kind === 'repay' ? 'repay' : 'save'; }
  else if (d.type === 'lend' || d.type === 'settle') { t.cat = d.type === 'lend' ? 'misc_in' : 'misc_in'; t.who = d.who.trim(); }
  else t.cat = d.cat;
  if (d.type === 'expense') {
    t.need = !!d.need;
    if (splitNames.length) { const each = r2(amount / (splitNames.length + 1)); t.split = splitNames.map((who) => ({ who, amt: each })); }
  }
  if (d.forIncome) t.forIncome = d.forIncome;
  if (draftIsLoan()) t.reason = d.reason.trim();
  const i = S.txns.findIndex((x) => x.id === t.id);
  if (i >= 0) S.txns[i] = t; else S.txns.push(t);
  save(); closeSheet(); render();
  const s = safeToSpend();
  if (t.type === 'expense' && t.date === today() && i < 0) toast(s.today >= 0 ? `Saved. ${money(Math.round(s.today))} left to spend today.` : `Saved. You’re ${money(Math.round(-s.today))} over today.`);
  else if (t.type === 'lend') toast(`Marked: ${t.who} owes you ${money(owedBy(t.who))}`);
  else if (t.type === 'settle') { const o = owedBy(t.who); toast(o > 0.009 ? `${t.who} still owes ${money(o)}` : `${t.who} is all settled`); }
  else toast(i >= 0 ? 'Updated' : 'Saved');
}

function friendsSheet() {
  const F = people();
  const row = (p) => `<div class="person">
    <span class="pav">${esc(p.name[0].toUpperCase())}</span>
    <span class="grow"><b>${esc(p.name)}</b><div class="small ${p.owed > 0.009 ? 'sec' : 'muted'}">${p.owed > 0.009 ? `owes you <b>${money(p.owed)}</b>` : p.owed < -0.009 ? `paid you ${money(-p.owed)} extra` : 'All settled'} · ${dayLabel(p.last)}</div></span>
    ${p.owed > 0.009 ? `<button class="btn sm" data-act="settle" data-who="${esc(p.name)}" data-amt="${p.owed}">Paid back</button>` : `<span class="settled">${icon('check', 16)}</span>`}
  </div>`;
  return `${sheetHead('Friends & splits')}
  <p class="page-sub" style="margin-top:6px">Money you lent and bills you split. Mark it when they pay you back, fully or in parts.</p>
  <div class="kpis"><div class="kpi"><div class="l">Owed to you</div><div class="v num">${money(F.total)}</div></div><div class="kpi"><div class="l">People</div><div class="v num">${F.open.length}<span class="muted small"> open</span></div></div></div>
  <div class="card" style="margin-top:12px">${F.list.length ? F.list.map(row).join('') : emptyState('No one owes you anything.<br>Use <b>Lent</b> or <b>Split it</b> when you add a transaction.', 'family')}</div>
  <div class="sheet-actions"><button class="btn ghost" data-act="lend-new">${icon('misc_in', 18)} Log money lent</button></div>`;
}

function settingsSheet() {
  const st = S.settings, A = S.accounts;
  return `${sheetHead('Settings')}
  <div class="field"><label for="s-name">Your name</label><input id="s-name" type="text" value="${esc(st.name)}"></div>
  <div class="field"><label for="s-limit">Monthly spending limit (₹)</label><input id="s-limit" type="number" inputmode="decimal" value="${st.limit}"></div>
  <div class="field"><label for="s-split">Vault share of every income</label><div class="range-row"><input id="s-split" type="range" min="0" max="70" step="5" value="${st.split}" oninput="this.nextElementSibling.value=this.value+'%'"><output>${st.split}%</output></div></div>
  <div class="field"><label for="s-goal">Vault goal (₹)</label><input id="s-goal" type="number" inputmode="decimal" value="${st.goal}"></div>
  <div class="field"><span class="lbl">Accounts (name · opening balance)</span>
    <div class="row"><input id="s-pn" type="text" value="${esc(A.primary.name)}" aria-label="Primary account name"><input id="s-po" type="number" inputmode="decimal" value="${A.primary.opening}" aria-label="Primary opening balance"></div>
    <div class="row" style="margin-top:8px"><input id="s-sn" type="text" value="${esc(A.savings.name)}" aria-label="Savings account name"><input id="s-so" type="number" inputmode="decimal" value="${A.savings.opening}" aria-label="Savings opening balance"></div></div>
  <button class="btn" style="margin-top:14px" data-act="settings-save">Save settings</button>
  <div class="field" style="margin-top:18px"><span class="lbl">Backup — your data lives only on this device</span>
    <div class="row"><button class="btn sm ghost grow" data-act="export">Export backup</button><label class="btn sm ghost grow" style="cursor:pointer">Import<input type="file" accept="application/json,.json" id="s-import" hidden></label></div></div>
  <button class="btn danger" style="margin-top:12px" data-act="reset">Erase all data</button>`;
}

function checkinSheet() {
  const w = weekReview(), L = loans(), s = safeToSpend(), F = people();
  const wp = w.total ? Math.round((w.want / w.total) * 100) : 0;
  return `${sheetHead('Weekly check-in')}
  <p class="page-sub" style="margin-top:6px">Thirty seconds. Look at the week, then go on with your day.</p>
  <div class="kpis">
    <div class="kpi"><div class="l">Spent in 7 days</div><div class="v num">${money(w.total)}</div><div class="d muted">${w.n} transactions</div></div>
    <div class="kpi"><div class="l">On wants</div><div class="v num">${wp}%</div><div class="d ${wp > 40 ? 'warn' : 'good'}">${wp > 40 ? 'On the high side' : 'Under control'}</div></div>
    <div class="kpi"><div class="l">Biggest category</div><div class="v" style="font-size:16px">${w.top ? CAT[w.top[0]].name : '—'}</div><div class="d muted">${w.top ? money(w.top[1]) : ''}</div></div>
    <div class="kpi"><div class="l">Owed to Vault</div><div class="v num ${L.owed ? 'bad' : 'good'}">${money(L.owed)}</div></div>
  </div>
  <div class="alert accent" style="margin-top:12px"><span class="ic">${icon('compass', 18)}</span><div class="grow"><div class="h3">Next week</div><p style="margin-bottom:0">Stay around <b>${money(Math.max(0, Math.round(s.allowance)))}/day</b> to finish the month inside your limit${L.owed ? `, and try to put back <b>${money(Math.round(Math.min(L.owed, Math.max(500, L.owed / 4))))}</b> into the Vault` : ''}${F.total ? `. Remind friends about the <b>${money(F.total)}</b> they owe you` : ''}.</p></div></div>
  <button class="btn" style="margin-top:16px" data-act="checkin-done">Done${S.checkin.streak ? ` · ${S.checkin.streak + 1} week streak` : ''}</button>`;
}

/* ---------------- toast & tooltip ---------------- */
const toastEl = document.getElementById('toast');
let toastTimer;
function toast(msg, action) {
  toastEl.innerHTML = `<span>${esc(msg)}</span>${action ? `<button data-act="toast-act">${esc(action.label)}</button>` : ''}`;
  toastEl.classList.add('on');
  toast.action = action?.fn;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('on'), action ? 5000 : 2600);
}
const tipEl = document.getElementById('tip');
function showTip(el, x, y) {
  tipEl.textContent = el.dataset.tip;
  tipEl.style.left = Math.min(window.innerWidth - 20, Math.max(20, x)) + 'px';
  tipEl.style.top = y + 'px';
  tipEl.classList.add('on');
}
document.addEventListener('pointermove', (e) => {
  if (e.pointerType !== 'mouse') return;
  const el = e.target.closest?.('[data-tip]');
  if (el) showTip(el, e.clientX, e.clientY); else tipEl.classList.remove('on');
});
document.addEventListener('pointerdown', (e) => {
  const el = e.target.closest?.('[data-tip]');
  if (el && e.pointerType !== 'mouse') { showTip(el, e.clientX, e.clientY); setTimeout(() => tipEl.classList.remove('on'), 2200); }
});

/* ---------------- actions ---------------- */
const num = (id) => parseFloat(document.getElementById(id)?.value) || 0;
const actions = {
  go: (el) => { view = el.dataset.v; closeSheet(); render(); window.scrollTo(0, 0); },
  add: () => openAdd(),
  edit: (el) => {
    const t = S.txns.find((x) => x.id === el.dataset.id);
    if (t) openAdd({ ...t, amount: String(t.amount), need: t.need !== false, reason: t.reason || '', note: t.note || '', who: t.who || '', splitOn: !!t.split?.length, splitWith: (t.split || []).map((x) => x.who).join(', ') });
  },
  'close-sheet': closeSheet,
  'd-type': (el) => {
    const v = el.dataset.v; draft.type = v;
    if (v === 'income' && !CATS.income.some((c) => c[0] === draft.cat)) draft.cat = 'design';
    if (v === 'expense' && !CATS.expense.some((c) => c[0] === draft.cat)) { draft.cat = 'food'; draft.need = true; }
    if (v === 'transfer') draft.to = draft.acc === 'primary' ? 'savings' : 'primary';
    drawSheet();
  },
  'd-cat': (el) => { draft.cat = el.dataset.v; if (draft.type === 'expense') draft.need = !!CAT[draft.cat].need; drawSheet(); },
  'd-need': (el) => { draft.need = el.dataset.v === '1'; drawSheet(); },
  'd-split': (el) => { draft.splitOn = el.dataset.v === '1'; drawSheet(); },
  'd-acc': (el) => { draft.acc = el.dataset.v; drawSheet(); },
  'd-swap': () => { [draft.acc, draft.to] = [draft.to, draft.acc]; draft.forIncome = null; drawSheet(); },
  'd-kind': (el) => { draft.kind = el.dataset.v; drawSheet(); },
  'd-save': saveDraft,
  'd-delete': () => {
    const i = S.txns.findIndex((x) => x.id === draft.id);
    if (i < 0) return;
    const [gone] = S.txns.splice(i, 1);
    save(); closeSheet(); render();
    toast('Transaction deleted', { label: 'Undo', fn: () => { S.txns.push(gone); save(); render(); } });
  },
  'toast-act': () => { toast.action?.(); toastEl.classList.remove('on'); },
  split: (el) => openAdd({ type: 'transfer', amount: el.dataset.amt, acc: el.dataset.from, to: el.dataset.to, kind: 'save', forIncome: el.dataset.id, note: el.dataset.to === 'savings' ? 'Vault share of income' : 'Salary share of income' }),
  'split-skip': (el) => { const t = S.txns.find((x) => x.id === el.dataset.id); if (t) { t.splitSkip = true; save(); render(); } },
  repay: (el) => openAdd({ type: 'transfer', amount: el.dataset.amt, acc: 'primary', to: 'savings', kind: 'repay', note: 'Paying back my Vault' }),
  friends: () => openSheet(friendsSheet),
  settle: (el) => openAdd({ type: 'settle', who: el.dataset.who, amount: String(el.dataset.amt) }),
  'lend-new': () => openAdd({ type: 'lend' }),
  filter: (el) => { ui.histFilter = el.dataset.f; render(); },
  month: (el) => { ui[el.dataset.k] = shiftYm(ui[el.dataset.k], +el.dataset.d); render(); },
  settings: () => openSheet(settingsSheet),
  'settings-save': () => {
    const st = S.settings;
    st.name = document.getElementById('s-name').value.trim();
    st.limit = num('s-limit'); st.split = num('s-split'); st.goal = num('s-goal');
    S.accounts.primary.name = document.getElementById('s-pn').value.trim() || 'Primary';
    S.accounts.savings.name = document.getElementById('s-sn').value.trim() || 'Savings';
    S.accounts.primary.opening = num('s-po'); S.accounts.savings.opening = num('s-so');
    save(); closeSheet(); render(); toast('Settings saved');
  },
  export: () => {
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `paisa-backup-${today()}.json` });
    a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('Backup downloaded');
  },
  reset: () => {
    if (!confirm('Erase all Paisa data on this device? Export a backup first if you want to keep it.')) return;
    S = blank(); save(); closeSheet(); view = 'home'; render();
  },
  checkin: () => openSheet(checkinSheet),
  'checkin-done': () => {
    const last = S.checkin.last;
    S.checkin.streak = last && (parseD(today()) - parseD(last)) / 864e5 <= 14 ? S.checkin.streak + 1 : 1;
    S.checkin.last = today(); save(); closeSheet(); render();
    toast(`Check-in done · ${S.checkin.streak} week streak`);
  },
  'onb-start': () => {
    S.settings.name = document.getElementById('o-name').value.trim();
    S.accounts.primary.opening = num('o-p'); S.accounts.savings.opening = num('o-s');
    S.settings.limit = num('o-l') || 30000; S.settings.split = num('o-split');
    S.setup = true; S.createdAt = today(); S.checkin.last = today(); save(); render(); window.scrollTo(0, 0);
    toast('All set. Log your first expense with +');
  },
  'onb-demo': () => { S = demoData(); save(); render(); window.scrollTo(0, 0); toast('Sample data loaded. Erase it any time in Settings.'); },
};

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el || el.disabled) return;
  actions[el.dataset.act]?.(el, e);
});
document.addEventListener('input', (e) => {
  const f = e.target.dataset?.f;
  if (f && draft) {
    draft[f] = e.target.value;
    if (f === 'amount') { const la = document.getElementById('loan-amt'); if (la) la.textContent = money(+e.target.value || 0); }
    const sh = document.getElementById('split-hint'); if (sh && (f === 'amount' || f === 'splitWith')) sh.innerHTML = splitPreview();
    const wh = document.getElementById('who-hint'); if (wh && f === 'who') wh.innerHTML = whoHint();
  }
  if (e.target.id === 'hist-q') {
    ui.histQuery = e.target.value;
    const pos = e.target.selectionStart;
    render();
    const q = document.getElementById('hist-q'); q.focus(); q.setSelectionRange(pos, pos);
  }
});
document.addEventListener('change', (e) => {
  if (e.target.id !== 's-import' || !e.target.files[0]) return;
  e.target.files[0].text().then((txt) => {
    const d = JSON.parse(txt);
    if (d?.v !== 1 || !Array.isArray(d.txns)) throw new Error('bad');
    if (!confirm(`Replace current data with this backup (${d.txns.length} transactions)?`)) return;
    S = d; save(); closeSheet(); render(); toast('Backup restored');
  }).catch(() => toast('That file isn’t a Paisa backup'));
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sheetFn) closeSheet();
  if (e.key === 'Enter' && sheetFn === addSheet && e.target.tagName === 'INPUT' && !e.target.list) { e.preventDefault(); saveDraft(); }
});

/* ---------------- sample data ---------------- */
function demoData() {
  const s = blank();
  s.setup = true;
  s.createdAt = addDays(today(), -100);
  s.checkin.last = addDays(today(), -9);
  s.accounts.primary.opening = 6000; s.accounts.savings.opening = 62000;
  s.settings.limit = 50000;
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  const between = (a, b) => Math.round((a + rnd() * (b - a)) / 10) * 10;
  const T = s.txns;
  const add = (o) => { const t = { id: uid(), ts: T.length, note: '', ...o }; if (t.type === 'expense' && t.need === undefined) t.need = !!CAT[t.cat].need; T.push(t); return t; };
  const spendKinds = [
    ['food', 80, 350, ['Lunch', 'Tea & snacks', 'Breakfast'], 5], ['eatout', 180, 480, ['Swiggy', 'Zomato', 'Café', 'Shawarma'], 4],
    ['grocery', 300, 1600, ['Groceries', 'Vegetables', 'Supermarket'], 2], ['transport', 40, 300, ['Auto', 'Bus', 'Uber'], 3],
    ['fuel', 300, 800, ['Petrol'], 1], ['shopping', 500, 3200, ['Amazon order', 'Clothes', 'Phone case'], 1],
    ['fun', 150, 700, ['Movie', 'Game', 'Outing'], 1], ['health', 100, 900, ['Pharmacy'], 1],
  ];
  const bag = spendKinds.flatMap((k) => Array(k[4]).fill(k));
  const N = 100, start = addDays(today(), -(N - 1));
  for (let i = 0; i < N; i++) {
    const d = addDays(start, i);
    if (d.endsWith('-01')) add({ type: 'expense', amount: 9000, cat: 'home', acc: 'primary', date: d, note: 'Rent' });
    if (d.endsWith('-05')) add({ type: 'expense', amount: 599, cat: 'phone', acc: 'primary', date: d, note: 'Jio recharge' });
    if (d.endsWith('-10')) { add({ type: 'expense', amount: 649, cat: 'subs', acc: 'primary', date: d, note: 'Netflix' }); add({ type: 'expense', amount: 1675, cat: 'subs', acc: 'primary', date: d, note: 'Adobe CC' }); }
    if (d.endsWith('-15')) add({ type: 'expense', amount: 4500, cat: 'emi', acc: 'primary', date: d, note: 'Bike loan EMI' });
    if (d.endsWith('-20')) add({ type: 'expense', amount: 5000, cat: 'chit', acc: 'primary', date: d, note: 'Monthly chit' });
    if (i % 17 === 4) {
      const amt = between(18000, 45000);
      const inc = add({ type: 'income', amount: amt, cat: rnd() < 0.8 ? 'design' : 'freelance', acc: 'primary', date: d, note: pick(['Logo project', 'Brand identity kit', 'App UI design', 'Poster series', 'Website mockups']) });
      if (i < N - 8) add({ type: 'transfer', amount: Math.round(amt * 0.3), acc: 'primary', to: 'savings', kind: 'save', cat: 'transfer', forIncome: inc.id, date: d, note: 'Vault share of income' });
    }
    const n = rnd() < 0.25 ? 0 : 1 + Math.floor(rnd() * 3);
    for (let k = 0; k < n; k++) { const [cat, a, b, notes] = pick(bag); add({ type: 'expense', amount: between(a, b), cat, acc: 'primary', date: d, note: pick(notes) }); }
    if (i === 38) add({ type: 'expense', amount: 6499, cat: 'shopping', acc: 'savings', need: false, date: d, note: 'Headphones', reason: 'Impulse buy during a sale' });
    if (i === 61) add({ type: 'transfer', amount: 10000, acc: 'savings', to: 'primary', cat: 'transfer', date: d, note: 'Short before client paid', reason: 'Client payment was late, needed rent money' });
    if (i === 72) add({ type: 'transfer', amount: 6000, acc: 'primary', to: 'savings', kind: 'repay', cat: 'transfer', date: d, note: 'Paying back my Vault' });
    if (i === 80) add({ type: 'expense', amount: 2400, cat: 'eatout', acc: 'primary', need: false, date: d, note: 'Biryani night', split: [{ who: 'Rahul', amt: 800 }, { who: 'Anas', amt: 800 }] });
    if (i === 86) add({ type: 'lend', amount: 3000, acc: 'primary', cat: 'misc_in', who: 'Fahad', date: d, note: 'Bike repair' });
    if (i === 92) add({ type: 'settle', amount: 800, acc: 'primary', cat: 'misc_in', who: 'Rahul', date: d });
  }
  return s;
}

/* ---------------- boot ---------------- */
render();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
