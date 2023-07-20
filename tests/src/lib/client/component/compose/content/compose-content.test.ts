import { parseContentOutput } from '$lib/client/component/compose/content/ComposeContent.svelte';
import { describe, expect, expectTypeOf, it } from 'vitest';

describe('ComposeContent', () => {
  describe('parseContentOutput()', () => {
    it('should be able parse content with title and single body', () => {
      const input = 'title\nthis is a body.';
      const expectedOutput = {
        htmlOutput:
          '<h1 class="first-letter:capitalize font-bold text-3xl">title</h1><p>this is a body.</p>',
        content: {
          title: 'title',
          body: '<p>this is a body.</p>'
        }
      };

      expect(parseContentOutput(input)).toEqual(expectedOutput);
    });

    it('should be able parse content with title and multiple body', () => {
      const input = 'title\nthis is a body\n## another body';
      const expectedOutput = {
        htmlOutput:
          '<h1 class="first-letter:capitalize font-bold text-3xl">title</h1><p>this is a body</p><h2 class="font-semibold text-xl">another body</h2>',
        content: {
          title: 'title',
          body: '<p>this is a body</p><h2 class="font-semibold text-xl">another body</h2>'
        }
      };

      expect(parseContentOutput(input)).toEqual(expectedOutput);
    });
  });
});
