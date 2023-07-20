import type { MarkdownRendererPlugin } from '..';

export class H2MarkdownTailwindRendererPlugin
  implements MarkdownRendererPlugin
{
  private ID = '## ';
  private TAG = '<h2 class="font-semibold text-xl">{}</h2>';
  private CAPTURE_H1_REGEX = /## (.*)/;
  constructor() {}

  private capture(markdown: string): string | null {
    const capGrp = this.CAPTURE_H1_REGEX.exec(markdown);
    if (!capGrp) return null;
    return capGrp[1];
  }

  get id() {
    return this.ID;
  }

  canRender(markdown: string): boolean {
    return markdown.startsWith('## ');
  }

  render(markdown: string): string {
    const text = this.capture(markdown);
    if (text === null) return markdown;
    return this.TAG.replace('{}', text);
  }
}

const plugin = new H2MarkdownTailwindRendererPlugin();
export default plugin;
