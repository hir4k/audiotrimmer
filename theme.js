// Light / dark / system switch. The choice is kept in localStorage only when it isn't "system".
(() => {
  const root = document.documentElement;
  const current = () => root.dataset.theme || 'system';
  const buttons = () => document.querySelectorAll('.theme-switch [data-set]');
  const sync = () => buttons().forEach(b => b.setAttribute('aria-pressed', String(b.dataset.set === current())));
  function apply(t) {
    if (t === 'system') delete root.dataset.theme; else root.dataset.theme = t;
    try { t === 'system' ? localStorage.removeItem('theme') : localStorage.setItem('theme', t); } catch (e) {}
    sync(); window.dispatchEvent(new Event('themechange'));
  }
  buttons().forEach(b => b.addEventListener('click', () => apply(b.dataset.set)));
  sync();
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => window.dispatchEvent(new Event('themechange')));
})();
