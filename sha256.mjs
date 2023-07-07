import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import crypto from "node:crypto";

const dir = 'build';

const readdir = (dir) => {
    return readdirSync(dir, { withFileTypes: true }).flatMap((file) => file.isDirectory() ? readdir(join(dir, file.name)) : join(dir, file.name))
}

const computeSha256 = (file) => {
    const buffer = readFileSync(file);
    return crypto.createHash('sha256').update(buffer).digest('base64');
};

const files = readdir(dir);

writeFileSync(`sha-${Date.now()}`, files.sort().map(file => `${file} ${computeSha256(file)}`).join('\n'));