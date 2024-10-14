import { join, isAbsolute } from 'path';
import os from 'os';
import { stdout, cwd } from 'process';

import { commands } from './commands.js';

export const getAbsolutePath = (path) => {
  const isAbsolutePath = isAbsolute(path);
  const currentPath = cwd();

  return isAbsolutePath ? path : join(currentPath, path);
};

export const getCommand = (command, commandArgs) => {
  const result = commands.find(
    (item) => item.command.name === command && item.argsCount === commandArgs.length
  );
  if (!result) {
    throw new Error('Invalid input');
  }
  return result.command.bind(null, commandArgs);
};

export const showStartMessage = (currentPath) => {
  stdout.write('-----------------------------------------------------------');
  stdout.write(`${os.EOL}You are currently in ${currentPath}${os.EOL}`);
  stdout.write(`type your command${os.EOL}`);
};
