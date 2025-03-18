import 'dotenv/config';
import chalk from 'chalk';

import { createServer } from './server.js';
import { getDatabase } from './database.js';

const database = await getDatabase();
const server = await createServer(database);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  const url = chalk.blue(`http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log(chalk.green(`Server is running on ${url}.`));
});
