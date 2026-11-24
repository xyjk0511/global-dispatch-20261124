import { copyFileSync, existsSync, mkdirSync, openSync, readSync, closeSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_ARTIFACT_BYTES = 1_048_576;
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_MAGIC = Buffer.from([0xff, 0xd8]);

function resolvePaths(): { readonly sourcePath: string; readonly outputPath: string } {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const sourcePath = join(currentDir, 'entry.png');
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const outputPath = join(outputDir, 'entry.png');
  return { sourcePath, outputPath };
}

function validateImageFile(filePath: string): void {
  if (!existsSync(filePath)) {
    throw new Error(`Missing source image at ${filePath}`);
  }

  const stats = statSync(filePath);
  if (stats.size <= 0 || stats.size > MAX_ARTIFACT_BYTES) {
    throw new Error(`Invalid entry.png size: ${stats.size} bytes (limit ${MAX_ARTIFACT_BYTES})`);
  }

  const header = Buffer.alloc(8);
  const fd = openSync(filePath, 'r');
  try {
    readSync(fd, header, 0, 8, 0);
  } finally {
    closeSync(fd);
  }

  const isPng = header.equals(PNG_MAGIC);
  const isJpeg = header.subarray(0, 2).equals(JPEG_MAGIC);
  if (!isPng && !isJpeg) {
    throw new Error('Source image must have a valid PNG or JPEG header');
  }
}

function main(): void {
  const { sourcePath, outputPath } = resolvePaths();
  validateImageFile(sourcePath);
  mkdirSync(dirname(outputPath), { recursive: true });
  copyFileSync(sourcePath, outputPath);
}

main();
