export type Lang = 'zh' | 'en';
export const htmlLang = (lang: Lang) => lang === 'en' ? 'en' : 'zh-CN';
export const otherLang = (lang: Lang): Lang => lang === 'en' ? 'zh' : 'en';
export function localPath(lang: Lang, path = '/') { return `${lang === 'en' ? '/en' : ''}${path}`; }
export function postPath(post: { data: { lang: Lang; slug: string } }) { return localPath(post.data.lang, `/posts/${encodeURIComponent(post.data.slug)}/`); }
export function tagPath(lang: Lang, tag: string) { return localPath(lang, `/tags/${encodeURIComponent(tag)}/`); }

export const copy = {
  zh: {
    articles: '文章', archive: '归档', tags: '标签', about: '关于', subtitle: '记录与思考',
    home: '首页', mainNavigation: '主导航', skip: '跳到正文', search: '搜索文章',
    dark: '切换深色模式', light: '切换浅色模式', language: '切换到英文版',
    missingTranslation: '本文暂无英文译文，浏览英文文章',
    footer: '保持好奇，认真生活。', copyright: '文字与思想的自留地', subscribe: '订阅 RSS',
    searchTitle: '寻找一个想法', closeSearch: '关闭搜索', searchLoading: '正在准备搜索…',
    searchUnavailable: '搜索暂时不可用，请稍后重试。你也可以通过归档或标签浏览文章。',
    searchTranslations: { placeholder: '搜索文章、主题或关键词…', zero_results: '没有找到“[SEARCH_TERM]”，换个词试试。', clear_search: '清除', searching: '正在寻找…', one_result: '找到 [COUNT] 个结果', many_results: '找到 [COUNT] 个结果' },
    heroLabel: '一个持续生长的个人博客', heroFirst: '记录，', heroSecond: '让思考', heroAccent: '有迹可循。',
    heroDescription: ['在科学与日常之间，收集值得停留的想法。', '写下一些观察，也留下一些问题。'],
    aboutCorner: '关于这个角落', slow: '慢一点，想深一点。', latest: '最近的文字', allArchive: '全部归档',
    emptyTitle: '这里，等一个新想法。', emptyDescription: '第一篇文章正在路上。',
    hello: '你好，我是 Dobby。', introduction: ['对世界保持好奇。', '在这里记录学习、思考，', '以及生活中的细小发现。'],
    meet: '认识一下', topics: '沿着主题探索', subscribeTitle: '让文字慢慢抵达', subscribeDescription: '通过 RSS，订阅新的记录。',
    minutes: '分钟阅读', featured: '置顶', readMore: '阅读全文', read: '阅读',
    archiveTitle: '文字的时间线', archiveDescription: '每一篇都是一个思考的坐标。',
    tagTitle: '从一个主题出发', tagDescription: '想法彼此连接，也各有方向。', allTopics: '所有主题',
    aboutEyebrow: '互联网中的一个小小角落', aboutWelcome: '欢迎来到我的博客。',
    aboutIntro: '这里用来放下一些观察、学习中的笔记，以及还没有标准答案的问题。主题可能跨越科学、技术与日常，连接它们的是对世界的好奇。',
    whyWrite: '为什么写下来', whyWriteBody: '想法很容易一闪而过。写作让模糊的直觉变得具体，也让不同时间的思考有机会彼此对话。',
    aboutHope: '希望这里能成为一个安静的角落：可以读一篇长文，沿着一个链接走远一点，也可以带着一个新问题离开。',
    keepInTouch: '保持联系', keepInTouchBody: '如果你愿意，可以通过 RSS 订阅更新，让新的文字在合适的时候抵达。', subscribeBlog: '订阅博客',
    backArticles: '← 返回文章', updated: '更新于', articleEnd: '— 感谢你读到这里 —', copyLink: '复制文章链接',
    related: '继续阅读', toc: '文章目录', backTop: '回到顶部 ↑',
    imageViewer: '高清图片查看器', imageHint: '高清查看 · 点击图片切换原始尺寸', closeImage: '关闭图片',
    copyCode: '复制', copyCodeLabel: '复制代码', copied: '已复制', copyFailed: '复制失败，请手动选择代码。',
    linkCopied: '文章链接已复制', linkFailed: '复制失败，请复制浏览器中的网址。',
    zoomOut: '缩小流程图', zoomIn: '放大流程图', reset: '重置', fullscreen: '全屏',
    diagramLabel: '流程图，使用按钮缩放，拖动查看', diagramError: '这张图暂时无法渲染，下面保留图表源码。',
    fullscreenError: '当前浏览器不支持全屏，可使用缩放按钮查看。', diagramLoadError: '图表加载失败，请刷新页面重试。',
    notFound: '页面未找到', lostFirst: '这个想法，', lostSecond: '可能去了别处。', lostDescription: '页面不存在，或文章已经撤下。', goHome: '回到首页 →',
  },
  en: {
    articles: 'Articles', archive: 'Archive', tags: 'Topics', about: 'About', subtitle: 'Notes & thoughts',
    home: 'Home', mainNavigation: 'Main navigation', skip: 'Skip to content', search: 'Search articles',
    dark: 'Switch to dark mode', light: 'Switch to light mode', language: 'Switch to Chinese',
    missingTranslation: 'No Chinese translation yet; browse Chinese articles',
    footer: 'Stay curious. Live thoughtfully.', copyright: 'A home for words and ideas', subscribe: 'Subscribe via RSS',
    searchTitle: 'Find an idea', closeSearch: 'Close search', searchLoading: 'Preparing search…',
    searchUnavailable: 'Search is temporarily unavailable. Please try again, or explore the archive and topics.',
    searchTranslations: { placeholder: 'Search articles, topics, or ideas…', zero_results: 'No results for “[SEARCH_TERM]”. Try another word.', clear_search: 'Clear', searching: 'Searching…', one_result: '[COUNT] result', many_results: '[COUNT] results' },
    heroLabel: 'A personal journal, always growing', heroFirst: 'Write it down.', heroSecond: 'Give ideas', heroAccent: 'room to grow.',
    heroDescription: ['Between science and everyday life, a few ideas worth keeping.', 'A place for observations, reflections, and open questions.'],
    aboutCorner: 'About this little corner', slow: 'Slow down. Think a little deeper.', latest: 'Recent writing', allArchive: 'View archive',
    emptyTitle: 'Room for a new idea.', emptyDescription: 'The first article is on its way.',
    hello: 'Hello, I’m Dobby.', introduction: ['Curious about the world.', 'Sharing what I learn and think,', 'and the little things I notice.'],
    meet: 'A little about me', topics: 'Follow a topic', subscribeTitle: 'Let the words come to you', subscribeDescription: 'Subscribe to new notes via RSS.',
    minutes: 'min read', featured: 'Featured', readMore: 'Read article', read: 'Read',
    archiveTitle: 'A timeline of thoughts', archiveDescription: 'Each one marks a moment of thinking.',
    tagTitle: 'Start with a topic', tagDescription: 'Ideas connect, and each takes its own path.', allTopics: 'All topics',
    aboutEyebrow: 'A small corner of the internet', aboutWelcome: 'Welcome to my home on the web.',
    aboutIntro: 'This is a place for observations, notes from learning, and questions without ready answers. The subjects may range from science and technology to everyday life. Curiosity connects them.',
    whyWrite: 'Why write things down?', whyWriteBody: 'Ideas are fleeting. Writing makes a vague intuition concrete, and gives thoughts from different moments a chance to meet.',
    aboutHope: 'I hope this becomes a quiet corner: somewhere to read a long article, follow a link a little further, or leave with a new question.',
    keepInTouch: 'Keep in touch', keepInTouchBody: 'You can subscribe via RSS and let new writing reach you in its own time.', subscribeBlog: 'Subscribe to the journal',
    backArticles: '← Back to articles', updated: 'Updated', articleEnd: '— Thank you for reading —', copyLink: 'Copy article link',
    related: 'Keep reading', toc: 'On this page', backTop: 'Back to top ↑',
    imageViewer: 'High-resolution image viewer', imageHint: 'High resolution · Click the image to view at full size', closeImage: 'Close image',
    copyCode: 'Copy', copyCodeLabel: 'Copy code', copied: 'Copied', copyFailed: 'Could not copy. Please select the code manually.',
    linkCopied: 'Article link copied', linkFailed: 'Could not copy. Please copy the address from your browser.',
    zoomOut: 'Zoom diagram out', zoomIn: 'Zoom diagram in', reset: 'Reset', fullscreen: 'Full screen',
    diagramLabel: 'Diagram. Use the buttons to zoom and drag to explore.', diagramError: 'This diagram could not be rendered. Its source is shown below.',
    fullscreenError: 'Full screen is unavailable in this browser. Use the zoom buttons instead.', diagramLoadError: 'Could not load diagrams. Please refresh the page.',
    notFound: 'Page not found', lostFirst: 'This idea', lostSecond: 'may have wandered off.', lostDescription: 'This page does not exist, or the article has been removed.', goHome: 'Back home →',
  },
};
export const getCopy = (lang: Lang) => copy[lang];
export function articleCount(lang: Lang, count: number) { return lang === 'en' ? `${count} ${count === 1 ? 'article' : 'articles'}` : `${count} 篇文章`; }
export function topicCounterpart(tag: string, lang: Lang) {
  const pairs: Record<string, string> = { '写作': 'Writing', '示例': 'Sample', '科学': 'Science', '思考': 'Thinking', '技术': 'Technology' };
  return lang === 'en' ? pairs[tag] || tag : Object.entries(pairs).find(([, value]) => value === tag)?.[0] || tag;
}
