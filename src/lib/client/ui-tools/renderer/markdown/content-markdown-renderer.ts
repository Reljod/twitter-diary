import type { MarkdownRenderer } from './plugins';

export class ContentMarkdownRenderer implements MarkdownRenderer {
  private markdownRenderer: MarkdownRenderer;

  constructor(markdownRenderer: MarkdownRenderer) {
    this.markdownRenderer = markdownRenderer;
  }

  render(markdown: string): string {
    const [firstLine, ...others] = markdown.split('\n');
    const newFirstLine = !!firstLine ? `# ${firstLine}` : '';
    const newMarkdown = [newFirstLine, ...others].join('\n');
    return this.markdownRenderer.render(newMarkdown);
  }
}
