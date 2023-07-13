import {
  transformTitle,
  parseContentOutput
} from '$lib/client/component/compose/content/ComposeContent.svelte';
import { describe, expect, expectTypeOf, it } from 'vitest';

describe('ComposeContent', () => {
  describe('transformTitle()', () => {
    it('should transform title to expected output', async () => {
      const data = [
        { input: 'lowercasetitle', expectedOutput: '**Lowercasetitle**' },
        { input: '  TitleWithSpace  ', expectedOutput: '**TitleWithSpace**' },
        { input: '**boldtitle**', expectedOutput: '**Boldtitle**' }
      ];

      data.forEach((d) => {
        expect(transformTitle(d.input)).toEqual(d.expectedOutput);
      });
    });

    it('should return empty string when input is whitespace or empty', async () => {
      const inputData = ['    ', '        ', ''];
      inputData.forEach((input) => expect(transformTitle(input)).toEqual(''));
    });
  });

  describe('parseContentOutput()', () => {
    it('should be able parse content with title and single body', () => {
      const input = 'title<br>this is a body.';
      const expectedOutput = {
        htmlOutput: '<p><strong>Title</strong></p><p>this is a body.</p>',
        content: {
          title: '<p><strong>Title</strong></p>',
          body: '<p>this is a body.</p>'
        }
      };

      expect(parseContentOutput(input)).toEqual(expectedOutput);
    });

    it('should be able parse content with title and multiple body', () => {
      const input = 'title<br>this is a body.<br>this is a content.<br>this is another content.';
      const expectedOutput = {
        htmlOutput:
          '<p><strong>Title</strong></p><p>this is a body.</p><p>this is a content.</p><p>this is another content.</p>',
        content: {
          title: '<p><strong>Title</strong></p>',
          body: '<p>this is a body.</p><p>this is a content.</p><p>this is another content.</p>'
        }
      };

      expect(parseContentOutput(input)).toEqual(expectedOutput);
    });
  });
});
