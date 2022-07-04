import { QueryLog, ServerLog } from '../config/logging';

const queryLog = new QueryLog();
const serverLog = new ServerLog();

const log = {
  query: queryLog,
  server: serverLog,
};

export default log;
