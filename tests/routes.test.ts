import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

describe('route files', () => {
  it('has a home route for root', () => {
    expect(existsSync(resolve(projectRoot, 'src/pages/index.astro'))).toBe(true);
  });

  it('has a contact route', () => {
    expect(existsSync(resolve(projectRoot, 'src/pages/contact.astro'))).toBe(true);
  });
});
