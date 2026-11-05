import { getCopy } from '../i18n';
export const t = getCopy(document.documentElement.dataset.language === 'en' ? 'en' : 'zh');

export function toast(message: string) {
  document.querySelector('.toast')?.remove();
  const element = document.createElement('div');
  element.className = 'toast';
  element.setAttribute('role', 'status');
  element.textContent = message;
  document.body.append(element);
  setTimeout(() => element.remove(), 2400);
}

const themeButton = document.querySelector<HTMLButtonElement>('#theme-toggle');
function updateThemeLabel() { themeButton?.setAttribute('aria-label', document.documentElement.dataset.theme === 'dark' ? t.light : t.dark); }
updateThemeLabel();
themeButton?.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch { /* Theme still works without persistent storage. */ }
  updateThemeLabel();
  document.dispatchEvent(new Event('theme-change'));
});

const dialog = document.querySelector<HTMLDialogElement>('#search-dialog');
let searchLoaded = false;
let searchLoading = false;
async function openSearch() {
  if (!dialog?.open) dialog?.showModal();
  if (searchLoaded || searchLoading) return;
  searchLoading = true;
  const container = document.querySelector<HTMLElement>('#search');
  try {
    // Pagefind is generated after the production build, never bundled by Vite.
    const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = '/pagefind/pagefind-ui.css'; document.head.append(css);
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script'); script.src = '/pagefind/pagefind-ui.js'; script.onload = () => resolve(); script.onerror = reject; document.head.append(script);
    });
    const PagefindUI = (window as unknown as { PagefindUI: new (options: Record<string, unknown>) => unknown }).PagefindUI;
    if (container) container.innerHTML = '';
    new PagefindUI({ element: '#search', showSubResults: true, showImages: false, translations: t.searchTranslations });
    searchLoaded = true;
    container?.querySelector<HTMLInputElement>('input')?.focus();
  } catch {
    if (container) container.textContent = t.searchUnavailable;
  } finally { searchLoading = false; }
}
document.querySelector('#open-search')?.addEventListener('click', openSearch);
document.querySelector('[data-close-search]')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (event) => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
document.addEventListener('keydown', (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); } });
