import { describe, expect, test } from 'bun:test';

// Integration guard for the marked sticky-rule pin: Streamdown splits
// messages with marked's Lexer, so the pin wired into mathBlocks at module
// load has to land on the same marked instance parseMarkdownIntoBlocks
// uses. If a future Streamdown release resolves its own marked copy, the
// sticky check below fails instead of the fix silently dropping.

// Same corpus as markedAnchoredRules.test.ts (duplicated on purpose:
// importing that file would apply the pin before the baseline split).
const CORPUS = [
  '# Title',
  'Setext heading\n==============',
  'Paragraph with **bold**, *em*, ~~gone~~, `code`, a [link](https://a.example "t"), <https://b.example>, www.c.example and \\*escaped\\*.  \nHard break above.',
  '---',
  '> quoted line\n> > nested quote\ncontinued lazily',
  '- item one\n- item two\n  - nested\n\n1. first\n2) second',
  '    indented code\n    more',
  '```ts\nconst x = 1;\n```',
  '| a | b |\n|---|:-:|\n| 1 | 2 |',
  '<div>\nraw html\n</div>',
  '[ref]: https://ref.example "Ref"\n\nUse [ref] and [text][ref] and ![img](pic.png).',
  'trailing <span>inline</span> tag and an email@example.com',
].join('\n\n');

describe('markedAnchoredRules + streamdown', () => {
  test('parseMarkdownIntoBlocks sees the pinned rules', async () => {
    const { parseMarkdownIntoBlocks } = await import('streamdown');
    const { Lexer } = await import('marked');
    expect(Lexer.rules.block.gfm.hr.sticky).toBe(false);
    const before = parseMarkdownIntoBlocks(CORPUS);
    // Importing mathBlocks applies the pin at module load.
    await import('./mathBlocks');
    expect(Lexer.rules.block.gfm.hr.sticky).toBe(true);
    expect(parseMarkdownIntoBlocks(CORPUS)).toEqual(before);
  });
});
