import MarkdownIt, { type Options } from 'markdown-it';

class GenericMarkdown {
  md: MarkdownIt;

  constructor(options: Options = {}) {
    this.md = MarkdownIt(options);
  }

  render(text: string) {
    return this.md.render(text);
  }

  renderInline(text: string) {
    return this.md.renderInline(text);
  }
}

export default GenericMarkdown;
