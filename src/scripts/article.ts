import { toast } from './site';

document.querySelectorAll<HTMLButtonElement>('[data-copy-code]').forEach(button => button.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(button.parentElement?.querySelector('code')?.textContent || ''); button.textContent = '已复制'; setTimeout(() => { button.textContent = '复制'; }, 1800); }
  catch { toast('复制失败，请手动选择代码。'); }
}));
document.querySelector('#copy-link')?.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(location.href); toast('文章链接已复制'); } catch { toast('复制失败，请复制浏览器中的网址。'); }
});

const imageDialog = document.querySelector<HTMLDialogElement>('#image-dialog');
const fullImage = document.querySelector<HTMLImageElement>('#full-image');
const imageStage = document.querySelector<HTMLElement>('.image-stage');
function openImage(source: HTMLImageElement) {
  if (!fullImage || !imageDialog) return;
  fullImage.src = source.dataset.full || source.currentSrc || source.src;
  fullImage.alt = source.alt;
  imageStage?.classList.remove('zoomed');
  document.querySelector('#image-caption')!.textContent = source.alt;
  imageDialog.showModal();
}
document.querySelectorAll<HTMLImageElement>('[data-lightbox]').forEach(image => {
  image.addEventListener('click', () => openImage(image));
  image.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openImage(image); } });
});
document.querySelector('[data-close-image]')?.addEventListener('click', () => imageDialog?.close());
fullImage?.addEventListener('click', () => imageStage?.classList.toggle('zoomed'));

const progress = document.querySelector<HTMLElement>('.reading-progress');
function updateProgress() {
  const article = document.querySelector<HTMLElement>('.article');
  if (!article || !progress) return;
  const end = article.offsetTop + article.offsetHeight - window.innerHeight;
  progress.style.width = `${Math.min(100, Math.max(0, window.scrollY / Math.max(1, end) * 100))}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();
const headings = document.querySelectorAll('.prose h2, .prose h3');
const observer = new IntersectionObserver(entries => {
  const visible = entries.find(entry => entry.isIntersecting);
  if (!visible) return;
  document.querySelectorAll('.article-toc nav a').forEach(link => link.classList.toggle('active', decodeURIComponent(link.getAttribute('href') || '') === `#${visible.target.id}`));
}, { rootMargin: '-5% 0px -65% 0px' });
headings.forEach(heading => observer.observe(heading));

async function renderDiagrams() {
  const sources = document.querySelectorAll<HTMLElement>('[data-mermaid]');
  if (!sources.length) return;
  const { default: mermaid } = await import('mermaid');
  mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'neutral', fontFamily: '-apple-system, PingFang SC, sans-serif', flowchart: { htmlLabels: false }, suppressErrorRendering: true });
  for (const [index, source] of [...sources].entries()) {
    const code = source.textContent || '';
    const wrapper = document.createElement('div');
    wrapper.className = 'diagram';
    const toolbar = document.createElement('div');
    toolbar.className = 'diagram-toolbar';
    toolbar.innerHTML = '<span>DIAGRAM</span><button type="button" data-action="out" aria-label="缩小流程图">−</button><button type="button" data-action="in" aria-label="放大流程图">＋</button><button type="button" data-action="reset">重置</button><button type="button" data-action="fullscreen">全屏</button><button type="button" data-action="download">SVG ↓</button>';
    const viewport = document.createElement('div');
    viewport.className = 'diagram-viewport';
    viewport.setAttribute('tabindex', '0');
    viewport.setAttribute('aria-label', '流程图，使用按钮缩放，拖动查看');
    const canvas = document.createElement('div');
    canvas.className = 'diagram-canvas';
    viewport.append(canvas);
    wrapper.append(toolbar, viewport);
    source.replaceWith(wrapper);
    let svgText = '';
    let scale = 1;
    let nativeWidth = 600;
    const zoom = (value: number) => {
      scale = Math.min(4, Math.max(.3, value));
      const svg = canvas.querySelector('svg');
      if (svg) { svg.style.width = `${nativeWidth * scale}px`; svg.style.maxWidth = 'none'; }
    };
    const draw = async () => {
      try {
        mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'neutral', fontFamily: '-apple-system, PingFang SC, sans-serif', flowchart: { htmlLabels: false }, suppressErrorRendering: true });
        const { svg, bindFunctions } = await mermaid.render(`diagram-${index}-${Date.now()}`, code);
        svgText = svg;
        canvas.innerHTML = svg;
        bindFunctions?.(canvas);
        const svgNode = canvas.querySelector('svg');
        nativeWidth = svgNode?.viewBox.baseVal.width || 600;
        zoom(Math.min(1, (viewport.clientWidth - 50) / nativeWidth));
      } catch {
        canvas.innerHTML = '';
        const error = document.createElement('p'); error.className = 'diagram-error'; error.textContent = '这张图暂时无法渲染，下面保留图表源码。';
        const fallback = document.createElement('pre'); fallback.textContent = code;
        canvas.append(error, fallback);
      }
    };
    await draw();
    document.addEventListener('theme-change', draw);
    toolbar.addEventListener('click', async (event) => {
      const action = (event.target as HTMLElement).closest('button')?.dataset.action;
      if (action === 'in') zoom(scale * 1.25);
      if (action === 'out') zoom(scale / 1.25);
      if (action === 'reset') { zoom(Math.min(1, (viewport.clientWidth - 50) / nativeWidth)); viewport.scrollTo(0, 0); }
      if (action === 'fullscreen') {
        try { if (document.fullscreenElement) await document.exitFullscreen(); else await wrapper.requestFullscreen(); }
        catch { toast('当前浏览器不支持全屏，可使用缩放按钮查看。'); }
      }
      if (action === 'download' && svgText) {
        const url = URL.createObjectURL(new Blob([svgText], { type: 'image/svg+xml' }));
        const link = document.createElement('a'); link.href = url; link.download = `diagram-${index + 1}.svg`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1500);
      }
    });
    let drag: { x: number; y: number; left: number; top: number } | undefined;
    viewport.addEventListener('pointerdown', event => { if (event.pointerType === 'touch') return; drag = { x: event.clientX, y: event.clientY, left: viewport.scrollLeft, top: viewport.scrollTop }; viewport.setPointerCapture(event.pointerId); });
    viewport.addEventListener('pointermove', event => { if (drag) { viewport.scrollLeft = drag.left - (event.clientX - drag.x); viewport.scrollTop = drag.top - (event.clientY - drag.y); } });
    viewport.addEventListener('pointerup', () => { drag = undefined; });
    viewport.addEventListener('pointercancel', () => { drag = undefined; });
  }
}
renderDiagrams().catch(() => toast('图表加载失败，请刷新页面重试。'));
