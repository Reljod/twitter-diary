export interface MarkdownRendererPlugin {
  id: string;
  canRender: (markdown: string) => boolean;
  render: (markdown: string) => string | Promise<string>;
}

export interface MarkdownRenderer {
  plugins: MarkdownRendererPlugin[];
}

export class TailwindMarkdownRenderer implements MarkdownRenderer {
  plugins: MarkdownRendererPlugin[];

  constructor(dependencies: MarkdownRenderer) {
    this.plugins = dependencies.plugins;
    this.isPluginIdsUniqueOrThrow();
  }

  isPluginIdsUniqueOrThrow() {
    const pluginIdsSet = new Set<string>();
    this.plugins.forEach((plugin) => {
      const beforeLength = pluginIdsSet.size;
      pluginIdsSet.add(plugin.id);
      if (beforeLength === pluginIdsSet.size) {
        throw new Error('Markdown Renderer Plugin IDs should be unique');
      }
    });
  }
}
