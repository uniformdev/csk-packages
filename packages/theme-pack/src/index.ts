import { program } from 'commander';
import {
  buildBorders,
  buildColors,
  buildDimensions,
  buildFontsStyle,
  pushBorders,
  pushColors,
  pushDimensions,
  pushFonts,
} from '../src/scripts/build-time';

program
  .command('pull')
  .description('Pull data from the integration')
  .option('-c, --colors', 'colors configuration')
  .option('-d, --dimensions', 'dimensions configuration')
  .option('-f, --fonts', 'fonts configuration')
  .option('-b, --borders', 'borders configuration')
  .action(async args => {
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
    } else {
      console.info('Pulling all tokens...');
      for (const action of [buildColors, buildDimensions, buildFontsStyle, buildBorders]) {
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

program
  .command('push')
  .description('Push data to the integration')
  .option('-c, --colors', 'colors configuration')
  .option('-d, --dimensions', 'dimensions configuration')
  .option('-f, --fonts', 'fonts configuration')
  .option('-b, --borders', 'borders configuration')
  .action(async args => {
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
    } else {
      console.info('Pushing all tokens...');
      for (const action of [pushColors, pushDimensions, pushFonts, pushBorders]) {
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
