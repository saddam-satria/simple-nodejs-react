import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';

const writeLogToTxt = (filename: string, log: string, logType?: string) => {
  const basePath = path.join(__dirname, '../../../', 'logs');

  if (!fs.existsSync(basePath)) {
    fs.mkdir(basePath, {}, (error: NodeJS.ErrnoException | null) => {
      if (error) {
        throw error;
      }
    });
  }

  fs.appendFile(
    path.join(basePath, `${filename}.txt`),
    `${new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
      second: '2-digit',
    })}\t ${logType && logType} \t ${log}\n`,
    {},
    (error: NodeJS.ErrnoException | null) => {
      if (error) throw error;
    }
  );
};

class QueryLog extends EventEmitter.EventEmitter {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public setLog(...log: any): void {
    this.emit('query', ...log);
  }
  public getLog(): void {
    this.on('query', (log: any) => {
      writeLogToTxt('query', log.log, log.type);
    });
  }
}

class ServerLog extends EventEmitter {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public setLog(log: any): void {
    this.emit('server', log);
  }
  public getLog(): void {
    this.on('server', (log: any) => {
      writeLogToTxt('server', log.log, log.type);
    });
  }
}

export { QueryLog, ServerLog };
