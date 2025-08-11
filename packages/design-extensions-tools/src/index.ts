import { program } from 'commander';
import type { Command } from 'commander';
import {
  buildAllowedGroups,
  buildBorders,
  buildColors,
  buildDimensions,
  buildFontsStyle,
  pushAllowedGroups,
  pushBorders,
  pushColors,
  pushDimensions,
  pushFonts,
} from '../src/scripts/build-time';
import { applyBorders } from './scripts/build-time/apply-borders';
import { applyColors } from './scripts/build-time/apply-colors';
import { applyDimensions } from './scripts/build-time/apply-dimensions';
import { applyFonts } from './scripts/build-time/apply-fonts';
import { ConnectionOptions } from './types';

const addConnectionOptions = (cmd: Command) =>
  cmd
    .option(
      '--apiKey <key>',
      'Uniform API key. Defaults to UNIFORM_API_KEY. Supports dotenv.',
      process.env.UNIFORM_API_KEY
    )
    .option(
      '--apiHost <url>',
      'Uniform host. Defaults to UNIFORM_CLI_BASE_URL env var or https://uniform.app. Supports dotenv.',
      process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app'
    )
    .option(
      '-p, --project <id>',
      'Uniform project id. Defaults to UNIFORM_PROJECT_ID env var. Supports dotenv.',
      process.env.UNIFORM_PROJECT_ID
    );

type PullArgs = ConnectionOptions & {
  colors?: boolean;
  dimensions?: boolean;
  fonts?: boolean;
  borders?: boolean;
  groups?: boolean;
  allTokens?: boolean;
  allSettings: boolean;
};

addConnectionOptions(program.command('pull').description('Pull data from the integration'))
  .option('-c, --colors', 'colors configuration')
  .option('-d, --dimensions', 'dimensions configuration')
  .option('-f, --fonts', 'fonts configuration')
  .option('-b, --borders', 'borders configuration')
  .option('-g, --groups', 'groups configuration')
  .option('-at, --allTokens', 'all tokens')
  .option('-as, --allSettings', 'all settings')
  .action(async (args: PullArgs) => {
    const connectionOptions: ConnectionOptions = {
      apiKey: args.apiKey,
      apiHost: args.apiHost,
      project: args.project,
    };

    if (args?.colors) {
      console.info('Pulling colors...');
      buildColors(connectionOptions).catch(e => console.error(e));
      return;
    } else if (args?.dimensions) {
      console.info('Pulling dimensions...');
      buildDimensions(connectionOptions).catch(e => console.error(e));
      return;
    } else if (args?.fonts) {
      console.info('Pulling fonts...');
      buildFontsStyle(connectionOptions).catch(e => console.error(e));
      return;
    } else if (args?.borders) {
      console.info('Pulling borders...');
      buildBorders(connectionOptions).catch(e => console.error(e));
      return;
    } else if (args?.groups) {
      console.info('Pulling groups...');
      buildAllowedGroups(connectionOptions).catch(e => console.error(e));
      return;
    } else if (args?.allTokens) {
      console.info('Pulling all tokens...');
      for (const action of [buildColors, buildDimensions, buildFontsStyle, buildBorders]) {
        try {
          await action(connectionOptions);
        } catch (e) {
          console.error(e);
          return;
        }
      }
    } else if (args?.allSettings) {
      console.info('Pulling all settings...');
      for (const action of [buildAllowedGroups]) {
        try {
          await action(connectionOptions);
        } catch (e) {
          console.error(e);
          return;
        }
      }
    } else {
      console.info('Pulling all configuration...');
      for (const action of [buildColors, buildDimensions, buildFontsStyle, buildBorders, buildAllowedGroups]) {
        try {
          await action(connectionOptions);
        } catch (e) {
          console.error(e);
          return;
        }
      }
      return;
    }
  });

type ApplyArgs = {
  mode?: 'css' | 'tailwind';
};

program
  .command('apply')
  .description('Apply data to the config file')
  .option('-m, --mode <mode>', 'apply dex configuration to pure css or tailwindcss', 'tailwind')
  .action(async (args: ApplyArgs) => {
    console.info('Applying all configuration...');
    for (const action of [applyColors, applyDimensions, applyFonts, applyBorders]) {
      try {
        await action(args?.mode || 'tailwind');
      } catch (e) {
        console.error(e);
        return;
      }
    }
    return;
  });

type PushArgs = ConnectionOptions & {
  colors?: boolean;
  dimensions?: boolean;
  fonts?: boolean;
  borders?: boolean;
  groups?: boolean;
  allTokens?: boolean;
  allSettings: boolean;
};

addConnectionOptions(program.command('push').description('Push data to the integration'))
  .option('-c, --colors', 'colors configuration')
  .option('-d, --dimensions', 'dimensions configuration')
  .option('-f, --fonts', 'fonts configuration')
  .option('-b, --borders', 'borders configuration')
  .option('-g, --groups', 'groups configuration')
  .option('-at, --allTokens', 'all tokens')
  .option('-as, --allSettings', 'all settings')
  .action(async (args: PushArgs) => {
    const connectionOptions: ConnectionOptions = {
      apiKey: args.apiKey,
      apiHost: args.apiHost,
      project: args.project,
    };

    if (args?.colors) {
      console.info('Pushing colors...');
      pushColors(connectionOptions).catch(e => console.error(e));
      return;
    } else if (args?.dimensions) {
      console.info('Pushing dimensions...');
      pushDimensions(connectionOptions).catch(e => console.error(e));
      return;
    } else if (args?.fonts) {
      console.info('Pushing fonts...');
      pushFonts(connectionOptions).catch(e => console.error(e));
      return;
    } else if (args?.borders) {
      console.info('Pushing borders...');
      pushBorders(connectionOptions).catch(e => console.error(e));
      return;
    } else if (args?.groups) {
      console.info('Pushing groups...');
      pushAllowedGroups(connectionOptions).catch(e => console.error(e));
      return;
    } else if (args?.allTokens) {
      console.info('Pushing all tokens...');
      for (const action of [pushColors, pushDimensions, pushFonts, pushBorders]) {
        try {
          await action(connectionOptions);
        } catch (e) {
          console.error(e);
          return;
        }
      }
    } else if (args?.allSettings) {
      console.info('Pushing all settings...');
      for (const action of [pushAllowedGroups]) {
        try {
          await action(connectionOptions);
        } catch (e) {
          console.error(e);
          return;
        }
      }
    } else {
      console.info('Pushing all configuration...');
      for (const action of [pushColors, pushDimensions, pushFonts, pushBorders, pushAllowedGroups]) {
        try {
          await action(connectionOptions);
        } catch (e) {
          console.error(e);
          return;
        }
      }
      return;
    }
  });

program.parse(process.argv);
