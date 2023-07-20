import { H1MarkdownTailwindRendererPlugin } from '$lib/client/ui-tools/renderer/markdown/plugins/tailwind/h1-md-tw-renderer-plugin';
import { describe, expect, it } from 'vitest';

describe('H1MarkdownTailwindRendererPlugin', () => {
  describe('when instantiated', () => {
    it('should return an object', () => {
      const h1 = new H1MarkdownTailwindRendererPlugin();
      expect(h1).to.be.an('object');
    });
  });

  describe('canRender()', () => {
    const h1 = new H1MarkdownTailwindRendererPlugin();
    it("should return true if markdown starts with '# ' with space", () => {
      expect(h1.canRender('# ')).to.be.true;
    });

    it("should return false if markdown only starts with '#'", () => {
      expect(h1.canRender('#')).to.be.false;
    });

    it("should return false if markdown doesn't start with '#'", () => {
      const input = ['? foo', '   ', 'bar'];
      input.forEach((val) => expect(h1.canRender(val)).to.be.false);
    });
  });

  describe('render()', () => {
    const h1 = new H1MarkdownTailwindRendererPlugin();
    it('should render given markdowns', () => {
      const markdowns = [
        {
          md: '# foo',
          rendered:
            '<h1 class="first-letter:capitalize font-bold text-3xl">foo</h1>'
        },
        {
          md: '# foo bar',
          rendered:
            '<h1 class="first-letter:capitalize font-bold text-3xl">foo bar</h1>'
        }
      ];

      markdowns.forEach(({ md, rendered }) => {
        expect(h1.render(md)).to.equal(rendered);
      });
    });

    it('should return the input markdown if failed to render', () => {
      const markdowns = [
        {
          md: '#foo',
          rendered: '#foo'
        },
        {
          md: '?bar',
          rendered: '?bar'
        }
      ];

      markdowns.forEach(({ md, rendered }) => {
        expect(h1.render(md)).to.equal(rendered);
      });
    });
  });
});
