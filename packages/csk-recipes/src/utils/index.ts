import { exec, spawn } from 'child_process';
import open from 'open';
import { Ora } from 'ora';
import prettier, { Options } from 'prettier';
import { confirm, password } from '@inquirer/prompts';
import { ENV_VARIABLES_DEFAULT_VALUES } from '../constants';

export const runStartInteractive = () => {
  const child = spawn('npm', ['run', 'start'], {
    stdio: 'inherit',
    shell: true,
  });

  child.on('exit', code => {
    console.info(`🚪 App process exited with code ${code}`);
  });

  child.on('error', err => {
    console.error('❌ Failed to start app:', err);
  });
};

export const runCommandWithSpinner = (command: string, spinner: Ora, prefix: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, { shell: true });

    spinner.start(`${prefix}\n...`);

    let stdoutBuffer = '';
    let stderrBuffer = '';

    const updateSpinnerText = (line: string) => {
      spinner.text = `${prefix}\n${line.trim()}`;
    };

    const handleLines = (chunk: string, buffer: string): string => {
      buffer += chunk;
      const lines = buffer.split('\n');
      buffer = lines.pop()!;

      for (const line of lines) {
        if (line.trim()) updateSpinnerText(line);
      }

      return buffer;
    };

    child.stdout.on('data', data => {
      stdoutBuffer = handleLines(data.toString(), stdoutBuffer);
    });

    child.stderr.on('data', data => {
      stderrBuffer = handleLines(data.toString(), stderrBuffer);
    });

    child.on('close', code => {
      if (stdoutBuffer.trim()) updateSpinnerText(stdoutBuffer);
      if (stderrBuffer.trim()) updateSpinnerText(stderrBuffer);

      if (code === 0) {
        resolve();
      } else {
        spinner.fail(`${prefix}\n❌ "${command}" failed with exit code ${code}`);
        reject(new Error(`Command "${command}" failed with code ${code}`));
      }
    });

    child.on('error', error => {
      spinner.fail(`${prefix}\n❌ Failed to start command: ${command}`);
      reject(error);
    });
  });
};

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

export const installDataSources = async (
  dataSources: Array<{ data: { id: string; displayName: string }; integrationType: string }>,
  accessToken: string,
  spinner: Ora
): Promise<void> => {
  for (const { data, integrationType } of dataSources) {
    spinner.start(`Installing data source: ${data.displayName}...`);

    const url = new URL(
      '/api/v1/data-source',
      process.env.UNIFORM_CLI_BASE_URL || ENV_VARIABLES_DEFAULT_VALUES.UNIFORM_CLI_BASE_URL || 'https://uniform.app'
    );
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        data: data,
        integrationType: integrationType,
        projectId: process.env.UNIFORM_PROJECT_ID,
      }),
    });

    if (response.status !== 204) {
      spinner.fail(`Failed to install ${data.displayName}`);
      if (spinner.isSpinning && spinner.text.includes(data.displayName)) {
        const errorBody = await response.json();
        throw new Error(errorBody?.errorMessage || `Failed to install data source "${data.displayName}".`);
      }
    } else {
      spinner.succeed(`Installed ${data.displayName}`);
    }
  }
};

export const promptForAccessToken = async (): Promise<string> => {
  const shouldOpenBrowser = await confirm({
    message: 'Open a browser window to generate a Uniform access token?',
  });

  if (shouldOpenBrowser) {
    const loginUrl = new URL(
      'cli-login',
      process.env.UNIFORM_CLI_BASE_URL || ENV_VARIABLES_DEFAULT_VALUES.UNIFORM_CLI_BASE_URL || 'https://uniform.app'
    ).toString();
    await open(loginUrl);
  }

  const token = await password({
    message: 'Paste your Uniform access token here and press enter:',
    validate: value => (value.length === 0 ? 'Access token is required' : true),
  });

  return token;
};
