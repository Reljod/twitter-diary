import ComposeContentMarkdown from './compose-content-markdown';
import GenericMarkdown from './generic-markdown';

type MdOptions = 'generic' | 'compose-content';

interface IMarkdownPicker {
  genericMd: GenericMarkdown;
  composeContentMd: ComposeContentMarkdown;
}

class MarkdownPicker {
  _genericMd: GenericMarkdown;
  _composeContentMd: ComposeContentMarkdown;

  constructor(markdown: IMarkdownPicker) {
    this._genericMd = markdown.genericMd;
    this._composeContentMd = markdown.composeContentMd;
  }

  pick(options: MdOptions | undefined = 'generic'): GenericMarkdown | ComposeContentMarkdown {
    if (options === 'compose-content') return this._composeContentMd;
    return this._genericMd;
  }
}

const genericMd = new GenericMarkdown({ breaks: false });
const composeContentMd = new ComposeContentMarkdown(genericMd);
const markdown = new MarkdownPicker({ genericMd, composeContentMd });

export default markdown;
