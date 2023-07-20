import {
  GenericMarkdownRenderer,
  type MarkdownRendererPlugin
} from '$lib/client/ui-tools/renderer/markdown/plugins';
import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { mock, mockReset } from 'vitest-mock-extended';

describe('index', () => {
  describe('GenericMarkdownRenderer', () => {
    describe('when instantiated', () => {
      const mockPlugin1 = mock<MarkdownRendererPlugin>();
      const mockPlugin2 = mock<MarkdownRendererPlugin>();
      beforeEach(() => {
        mockReset(mockPlugin1);
        mockReset(mockPlugin2);
      });

      it('should return object when plugin ids are unique', () => {
        mockPlugin1.id = '# ';
        mockPlugin2.id = '## ';
        const renderer = new GenericMarkdownRenderer({
          plugins: [mockPlugin1, mockPlugin2]
        });
        expect(renderer).to.be.an('object');
      });

      it('should throw when plugin ids are not unique', () => {
        mockPlugin1.id = '# ';
        mockPlugin2.id = '# ';
        expect(
          () =>
            new GenericMarkdownRenderer({
              plugins: [mockPlugin1, mockPlugin2]
            })
        ).toThrowError('Markdown Renderer Plugin IDs should be unique');
      });
    });

    describe('render', () => {
      const mockPlugin1 = mock<MarkdownRendererPlugin>();
      const mockPlugin2 = mock<MarkdownRendererPlugin>();

      afterEach(() => {
        mockReset(mockPlugin1);
        mockReset(mockPlugin2);
      });

      it('should render if plugin can render', async () => {
        mockPlugin1.render.mockImplementation((x) => `<h1>${x}</h1>`);
        mockPlugin2.render.mockImplementation((x) => `<h2>${x}</h2>`);
        mockPlugin1.canRender.mockImplementation((x) => x === 'foo');
        mockPlugin2.canRender.mockImplementation((x) => x === 'bar');
        const md = new GenericMarkdownRenderer({
          plugins: [mockPlugin1, mockPlugin2]
        });

        const input = 'foo\nbar';
        const expected = '<h1>foo</h1><h2>bar</h2>';

        const output = await md.render(input);
        expect(output).to.equal(expected);
      });

      it('should render to default <p> if plugin cannot render', async () => {
        mockPlugin1.render.mockImplementation((x) => `<h1>${x}</h1>`);
        mockPlugin2.render.mockImplementation((x) => `<h2>${x}</h2>`);
        mockPlugin1.canRender.mockImplementation((x) => x === 'foo');
        mockPlugin2.canRender.mockImplementation((x) => x === 'bar');
        const md = new GenericMarkdownRenderer({
          plugins: [mockPlugin1, mockPlugin2]
        });

        const input = 'zig\nfoo\nbar\nzag';
        const expected = '<p>zig</p><h1>foo</h1><h2>bar</h2><p>zag</p>';

        const output = await md.render(input);
        expect(output).to.equal(expected);
      });
    });
  });
});
