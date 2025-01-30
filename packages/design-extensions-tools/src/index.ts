import { program } from 'commander';
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

type PullArgs = {
  colors?: boolean;
  dimensions?: boolean;
  fonts?: boolean;
  borders?: boolean;
  groups?: boolean;
  allTokens?: boolean;
  allSettings: boolean;
};

program
  .command('pull')
  .description('Pull data from the integration')
  .option('-c, --colors', 'colors configuration')
  .option('-d, --dimensions', 'dimensions configuration')
  .option('-f, --fonts', 'fonts configuration')
  .option('-b, --borders', 'borders configuration')
  .option('-g, --groups', 'groups configuration')
  .option('-at, --allTokens', 'all tokens')
  .option('-as, --allSettings', 'all settings')
  .action(async (args: PullArgs) => {
    if (args?.colors) {
      console.info('Pulling colors...');
      buildColors().catch(e => console.error(e));
      return;
    } else if (args?.dimensions) {
      console.info('Pulling dimensions...');
      buildDimensions().catch(e => console.error(e));
      return;
    } else if (args?.fonts) {
      console.info('Pulling fonts...');
      buildFontsStyle().catch(e => console.error(e));
      return;
    } else if (args?.borders) {
      console.info('Pulling borders...');
      buildBorders().catch(e => console.error(e));
      return;
    } else if (args?.groups) {
      console.info('Pulling groups...');
      buildAllowedGroups().catch(e => console.error(e));
      return;
    } else if (args?.allTokens) {
      console.info('Pulling all tokens...');
      for (const action of [buildColors, buildDimensions, buildFontsStyle, buildBorders]) {
        try {
          await action();
        } catch (e) {
          console.error(e);
          return;
        }
      }
    } else if (args?.allSettings) {
      console.info('Pulling all settings...');
      for (const action of [buildAllowedGroups]) {
        try {
          await action();
        } catch (e) {
          console.error(e);
          return;
        }
      }
    } else {
      console.info('Pulling all configuration...');
      for (const action of [buildColors, buildDimensions, buildFontsStyle, buildBorders, buildAllowedGroups]) {
        try {
          await action();
        } catch (e) {
          console.error(e);
          return;
        }
      }
      return;
    }
  });

type PushArgs = {
  colors?: boolean;
  dimensions?: boolean;
  fonts?: boolean;
  borders?: boolean;
  groups?: boolean;
  allTokens?: boolean;
  allSettings: boolean;
};

program
  .command('push')
  .description('Push data to the integration')
  .option('-c, --colors', 'colors configuration')
  .option('-d, --dimensions', 'dimensions configuration')
  .option('-f, --fonts', 'fonts configuration')
  .option('-b, --borders', 'borders configuration')
  .option('-g, --groups', 'groups configuration')
  .option('-at, --allTokens', 'all tokens')
  .option('-as, --allSettings', 'all settings')
  .action(async (args: PushArgs) => {
    if (args?.colors) {
      console.info('Pushing colors...');
      pushColors().catch(e => console.error(e));
      return;
    } else if (args?.dimensions) {
      console.info('Pushing dimensions...');
      pushDimensions().catch(e => console.error(e));
      return;
    } else if (args?.fonts) {
      console.info('Pushing fonts...');
      pushFonts().catch(e => console.error(e));
      return;
    } else if (args?.borders) {
      console.info('Pushing borders...');
      pushBorders().catch(e => console.error(e));
      return;
    } else if (args?.groups) {
      console.info('Pushing groups...');
      pushAllowedGroups().catch(e => console.error(e));
      return;
    } else if (args?.allTokens) {
      console.info('Pushing all tokens...');
      for (const action of [pushColors, pushDimensions, pushFonts, pushBorders]) {
        try {
          await action();
        } catch (e) {
          console.error(e);
          return;
        }
      }
    } else if (args?.allSettings) {
      console.info('Pushing all settings...');
      for (const action of [pushAllowedGroups]) {
        try {
          await action();
        } catch (e) {
          console.error(e);
          return;
        }
      }
    } else {
      console.info('Pushing all configuration...');
      for (const action of [pushColors, pushDimensions, pushFonts, pushBorders, pushAllowedGroups]) {
        try {
          await action();
        } catch (e) {
          console.error(e);
          return;
        }
      }
      return;
    }
  });

program.parse(process.argv);
