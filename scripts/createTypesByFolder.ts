import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import * as fs from 'node:fs';
import type { Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Options {
  name: string;
  path: string;
  extension: string;
}

export default function (options: Options[] = []) {
  const declarationsPath = path.resolve(
    __dirname,
    '../.generated/imports.d.ts'
  );

  function getTypeDeclarationString(name: string, array: string[]) {
    let types;

    if (array.length === 0) {
      types = 'null';
    } else {
      types = array.map((value) => `'${value}'`).join(' | ');
    }

    return `export type ${name} = ${types} \n`;
  }

  function getDirectoryFiles(directory: string, extension: string) {
    const directoryPath = path.resolve(__dirname, '../', directory);

    return fs
      .readdirSync(directoryPath)
      .filter((file) => file.endsWith(extension))
      .map((file) => path.basename(file, path.extname(file)));
  }

  let output: string = '';

  options.forEach(({ name, path, extension }) => {
    output += getTypeDeclarationString(
      name,
      getDirectoryFiles(path, extension)
    );
  });

  fs.writeFileSync(declarationsPath, output);

  return {
    name: 'createDtsByFolder'
  } satisfies Plugin;
}