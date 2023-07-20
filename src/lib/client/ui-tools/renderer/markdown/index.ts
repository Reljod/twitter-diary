import { default as h1plugin } from '$lib/client/ui-tools/renderer/markdown/plugins/tailwind/h1-md-tw-renderer-plugin';
import { default as h2plugin } from '$lib/client/ui-tools/renderer/markdown/plugins/tailwind/h2-md-tw-renderer-plugin';
import { ContentMarkdownRenderer } from './content-markdown-renderer';
import { GenericMarkdownRenderer } from './plugins';

const markdownRenderer = new GenericMarkdownRenderer({
  plugins: [h1plugin, h2plugin]
});
const renderer = new ContentMarkdownRenderer(markdownRenderer);

export default renderer;
