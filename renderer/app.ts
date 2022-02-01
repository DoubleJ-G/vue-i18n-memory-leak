import { createSSRApp, defineComponent, h } from 'vue';
import PageShell from './PageShell.vue';
import { setPageContext } from './usePageContext';
import type { PageContext } from './types';

export { createApp };

import { createI18n } from 'vue-i18n';
const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {},
  },
});

function createApp(pageContext: PageContext) {
  const { Page, pageProps } = pageContext;
  const PageWithLayout = defineComponent({
    render() {
      return h(
        PageShell,
        {},
        {
          default() {
            return h(Page, pageProps || {});
          },
        }
      );
    },
  });

  const app = createSSRApp(PageWithLayout);
  app.use(i18n);
  // Make `pageContext` available from any Vue component
  setPageContext(app, pageContext);

  return app;
}
