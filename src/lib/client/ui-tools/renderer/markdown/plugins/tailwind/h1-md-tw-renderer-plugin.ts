import type { MarkdownRendererPlugin } from '..';

export class H1MarkdownTailwindRendererPlugin
  implements MarkdownRendererPlugin
{
  private ID = '# ';
  private TAG =
    '<h1 class="first-letter:capitalize font-medium text-xl">{}</h1>';
  private CAPTURE_H1_REGEX = /# (.*)/;
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
    return markdown.startsWith('# ');
  }

  render(markdown: string): string {
    const text = this.capture(markdown);
    if (text === null) return markdown;
    return this.TAG.replace('{}', text);
  }
}

const plugin = new H1MarkdownTailwindRendererPlugin();
export default plugin;
