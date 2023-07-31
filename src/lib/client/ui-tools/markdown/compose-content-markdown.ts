import type GenericMarkdown from './generic-markdown';

class ComposeContentMarkdown {
  /*
    Regex breakdown
    <p>(.*)<\/p> - Captures the first p tag, this is a title.
    \n - Expects a new line (\n) between title and body
    ((?:.|\s)*) - captures anything even whitespaces, :?() to not capture the group.
  */
  CAPTURE_TITLE_BODY_REGEX = /<p>(.|\s*)<\/p>\n?((?:.|\s)*)/;

  md: GenericMarkdown;

  constructor(genericMd: GenericMarkdown) {
    this.md = genericMd;
  }

  private getTitleBodyRaw(rendered: string) {
    const cap = this.CAPTURE_TITLE_BODY_REGEX.exec(rendered);
    if (!cap) {
      const titleCap = /<p>(.*)\n((?:.|\s)*)<\/p>/.exec(rendered);
      if (!titleCap) return { title: rendered, body: '' };
      return { title: titleCap[1], body: titleCap[2] };
    }
    return { title: cap[1], body: cap[2] };
  }

  private getTitleBody(rendered: string) {
    const raw = this.getTitleBodyRaw(rendered);
    return { title: this.parseTitle(raw.title), body: raw.body };
  }

  private parseTitle(title: string): string {
    let newTitle = title.slice(0, 1).toUpperCase() + title.slice(1);
    return `<h1>${newTitle}</h1>`;
  }

  render(text: string): string {
    const mdRendered = this.md.render(text);
    const { title, body } = this.getTitleBody(mdRendered);
    return title + body;
  }

  renderInline(text: string) {
    return this.md.renderInline(text);
  }
}

export default ComposeContentMarkdown;
