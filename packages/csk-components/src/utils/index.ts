import { exec } from 'child_process';
import prettier, { Options } from 'prettier';
import { cskComponentsNames } from '../constants';

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

export const capitalizeFirstLetter = (val: string) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

type ComponentEntry = {
  componentName: string;
  importSection: string;
  componentId: string;
};

const componentCaseHandlers: Record<string, (componentName: string, importSection: string) => ComponentEntry[]> = {
  DemoHero: (_componentName, importSection) => [
    {
      componentName: 'DemoHero.FlexibleHero',
      importSection,
      componentId: cskComponentsNames.FlexibleHero,
    },
    {
      componentName: 'DemoHero.FixedHero',
      importSection,
      componentId: cskComponentsNames.FixedHero,
    },
  ],
};

export const getComponentEntries = (components: string[]): ComponentEntry[] =>
  components.reduce<ComponentEntry[]>((acc, componentName) => {
    const importSection = `import ${componentName} from './${componentName}';`;

    if (componentCaseHandlers[componentName]) {
      return [...acc, ...componentCaseHandlers[componentName](componentName, importSection)];
    }

    const componentId = cskComponentsNames[componentName as keyof typeof cskComponentsNames];
    return [...acc, { componentName, importSection, componentId }];
  }, []);
