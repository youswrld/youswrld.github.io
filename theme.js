(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('#theme');
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let saved = null;
  try { saved = localStorage.getItem('yd-portfolio-theme'); } catch {}
  function setTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme');
    document.querySelector('meta[name="theme-color"]').content = dark ? '#191e1b' : '#f5f3ed';
  }
  setTheme(saved === 'dark' || saved === 'light' ? saved : (media.matches ? 'dark' : 'light'));
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    saved = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(saved);
    try { localStorage.setItem('yd-portfolio-theme', saved); } catch {}
  });
  media.addEventListener('change', event => { if (!saved) setTheme(event.matches ? 'dark' : 'light'); });
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
