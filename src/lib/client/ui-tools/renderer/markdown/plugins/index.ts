export interface MarkdownRendererPlugin {
  id: string;
  canRender: (markdown: string) => boolean;
  render: (markdown: string) => string;
}

export interface MarkdownRendererDeps {
  plugins: MarkdownRendererPlugin[];
}

export interface MarkdownRenderer {
  render: (markdown: string) => string;
}

export class GenericMarkdownRenderer implements MarkdownRenderer {
  plugins: MarkdownRendererPlugin[];

  constructor(dependencies: MarkdownRendererDeps) {
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

  render(markdown: string): string {
    const cMarkdown = this.cleanMarkdown(markdown);
    const markdownLines = cMarkdown.split('\n');
    const renderedLines = markdownLines.map((md) => {
      return this.renderInline(md);
    });
    return renderedLines.join('');
  }

  private renderInline(markdown: string): string {
    const renderer = this.determineRenderer(markdown);
    if (!renderer) return `<p>${markdown}</p>`;
    return renderer.render(markdown);
  }

  private determineRenderer(
    markdown: string
  ): MarkdownRendererPlugin | undefined {
    return this.plugins.find((plugin) => {
      return plugin.canRender(markdown);
    });
  }

  private cleanMarkdown(markdown: string): string {
    return markdown.trim();
  }
}
