import { promises as fs } from 'fs';
import { join } from 'path';

export const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
export const readFixtureFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');
