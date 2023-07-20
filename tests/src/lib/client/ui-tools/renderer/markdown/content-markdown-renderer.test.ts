import type { MarkdownRenderer } from '$lib/client/ui-tools/renderer/markdown/plugins';
import { ContentMarkdownRenderer } from '$lib/client/ui-tools/renderer/markdown/content-markdown-renderer';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mock, mockReset } from 'vitest-mock-extended';

describe('content-markdown-renderer', () => {
  describe('ContentMarkdownRenderer', () => {
    describe('render()', () => {
      let md: ContentMarkdownRenderer;
      const markdownRenderer = mock<MarkdownRenderer>();

      beforeEach(() => {
        markdownRenderer.render.mockImplementation((x) => x);
        md = new ContentMarkdownRenderer(markdownRenderer);
      });

      afterEach(() => {
        mockReset(markdownRenderer);
      });

      it("should add '# ' the first line of the content", () => {
        const data = [
          { input: 'foo\n## bar', expected: '# foo\n## bar' },
          { input: '# foo\n## bar', expected: '# # foo\n## bar' },
          { input: 'hey', expected: '# hey' }
        ];

        data.forEach((d) => expect(md.render(d.input)).to.equal(d.expected));
      });

      it('should return blank when the first line is blank', () => {
        expect(md.render('')).to.equal('');
      });
    });
  });
});
