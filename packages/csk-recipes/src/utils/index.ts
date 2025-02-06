import { exec, spawn } from 'child_process';
import prettier, { Options } from 'prettier';

export const runCmdCommand = async (command: string): Promise<string> =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error.message);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      resolve(stdout);
    });
  });

export const spawnCmdCommand = async (command: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const [cmd = '', ...args] = command.split(' ');

    const process = spawn(cmd, args, { shell: true });

    let output = '';
    let errorOutput = '';

    process.stdout.on('data', data => {
      output += data.toString();
    });

    process.stderr.on('data', data => {
      errorOutput += data.toString();
    });

    process.on('close', code => {
      if (code === 0) {
        resolve(output.trim());
      } else {
        reject(`Command failed with code ${code}: ${errorOutput.trim()}`);
      }
    });

    process.on('error', err => {
      reject(`Failed to start process: ${err.message}`);
    });
  });

export const formatWithPrettier = (source: string, option?: Options) =>
  prettier.format(source, {
    parser: 'typescript',
    printWidth: 120,
    singleQuote: true,
    semi: true,
    trailingComma: 'es5',
    tabWidth: 2,
    arrowParens: 'avoid',
    endOfLine: 'auto',
    ...option,
  });
