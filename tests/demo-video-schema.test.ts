import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectRoot = resolve(import.meta.dirname, '..');
const demoSource = readFileSync(resolve(projectRoot, 'src/pages/demo.astro'), 'utf8');
const schemaMatch = demoSource.match(/const videoSchema = ({[\s\S]*?});/);
const schema = JSON.parse(schemaMatch![1]);

describe('demo video schema', () => {
  it('gives each embedded demo video its own hosted thumbnail', () => {
    expect(schema['@graph']).toHaveLength(2);
    const thumbnails = new Set<string>();

    for (const video of schema['@graph']) {
      expect(video['@type']).toBe('VideoObject');
      expect(video.name).toBeTruthy();
      expect(video.description).toBeTruthy();
      expect(video.uploadDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(demoSource).toContain(`src="${video.contentUrl}"`);

      const thumbnail = new URL(video.thumbnailUrl);
      expect(thumbnail.origin).toBe('https://waterwz.com');
      expect(thumbnail.pathname).toMatch(/^\/images\/demo-.+-thumbnail\.jpg$/);
      const asset = resolve(projectRoot, 'public', thumbnail.pathname.slice(1));
      expect(existsSync(asset)).toBe(true);
      const image = readFileSync(asset);
      expect(image.subarray(0, 3)).toEqual(Buffer.from([0xff, 0xd8, 0xff]));
      thumbnails.add(video.thumbnailUrl);
    }

    expect(thumbnails.size).toBe(2);
  });
});
