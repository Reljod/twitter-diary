import {
  TailwindMarkdownRenderer,
  type MarkdownRendererPlugin
} from '$lib/client/ui-tools/renderer/markdown';
import { describe, it, expect } from 'vitest';

describe('index', () => {
  describe('TailwindMarkdownRenderer', () => {
    describe('when instantiated', () => {
      const mockPlugin = {
        id: '# ',
        canRender: (_) => true,
        render: (_) => ''
      } satisfies MarkdownRendererPlugin;

      it('should return object when plugin ids are unique', () => {
        const renderer = new TailwindMarkdownRenderer({
          plugins: [mockPlugin, { ...mockPlugin, id: '## ' }]
        });
        expect(renderer).to.be.an('object');
      });

      it('should throw when plugin ids are not unique', () => {
        expect(
          () =>
            new TailwindMarkdownRenderer({
              plugins: [mockPlugin, { ...mockPlugin }]
            })
        ).toThrowError('Markdown Renderer Plugin IDs should be unique');
      });
    });
  });
});
