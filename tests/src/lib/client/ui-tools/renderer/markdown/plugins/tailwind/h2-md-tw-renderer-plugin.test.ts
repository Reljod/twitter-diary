import { H2MarkdownTailwindRendererPlugin } from '$lib/client/ui-tools/renderer/markdown/plugins/tailwind/h2-md-tw-renderer-plugin';
import { describe, expect, it } from 'vitest';

describe('H2MarkdownRenderPlugin', () => {
  describe('when instantiated', () => {
    it('should return an object', () => {
      const h2 = new H2MarkdownTailwindRendererPlugin();
      expect(h2).to.be.an('object');
    });
  });

  describe('canRender()', () => {
    const h2 = new H2MarkdownTailwindRendererPlugin();
    it("should return true if markdown starts with '## ' with space", () => {
      expect(h2.canRender('## ')).to.be.true;
    });

    it("should return false if markdown only starts with '##'", () => {
      expect(h2.canRender('##')).to.be.false;
    });

    it("should return false if markdown doesn't start with '##'", () => {
      const input = ['? foo', '   ', 'bar'];
      input.forEach((val) => expect(h2.canRender(val)).to.be.false);
    });
  });

  describe('render()', () => {
    const h2 = new H2MarkdownTailwindRendererPlugin();
    it('should render given markdowns', () => {
      const markdowns = [
        {
          md: '## foo',
          rendered: '<h2 class="font-semibold text-xl">foo</h2>'
        },
        {
          md: '## foo bar',
          rendered: '<h2 class="font-semibold text-xl">foo bar</h2>'
        }
      ];

      markdowns.forEach(({ md, rendered }) => {
        expect(h2.render(md)).to.equal(rendered);
      });
    });

    it('should return the input markdown if failed to render', () => {
      const markdowns = [
        {
          md: '##foo',
          rendered: '##foo'
        },
        {
          md: '?bar',
          rendered: '?bar'
        }
      ];

      markdowns.forEach(({ md, rendered }) => {
        expect(h2.render(md)).to.equal(rendered);
      });
    });
  });
});
