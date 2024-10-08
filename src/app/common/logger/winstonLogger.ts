import winston, { Logger, format } from 'winston';
import 'winston-daily-rotate-file';
const {
  combine,
  errors,
  timestamp,
  label,
  // json,
  printf,
  // prettyPrint,
  colorize,
  // uncolorize,
  // simple,
} = format;
const colorizer = colorize();

let logger: Logger;

const createLogger = () => {
  if (logger) {
    logger.error('Logger instance already exist.');
    return;
  }

  logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: combine(
      errors({ stack: true }),
      timestamp({ format: 'YYYY-MM-dd HH:mm:ss:SSS' })
      // timestamp({ format: 'HH:mm:ss:SSS' })
      // json()
      // ...(process.env.NODE_ENV !== 'production' ? [prettyPrint()] : [])
    ),
    // defaultMeta: { service: 'pie' },
    exitOnError: false,
    transports: [],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: combine(
          colorize({
            all: true,
            colors: {
              label: 'grey',
              from: 'blue',
              error: 'bold red',
              warn: 'yellow',
              info: 'green',
              verbose: 'cyan',
              debug: 'magenta',
            },
          }),
          label({ label: 'Max-Care' }),
          printf(
            (info: { level: string; message: any; [key: string]: string }) =>
              colorizer.colorize('label', `[${info.label}]`) +
              ` ${info.level} ${info.timestamp} ` +
              colorizer.colorize('from', `[${info.from}]`) +
              ` ${info.message}`
          )
        ),
      })
    );
  } else {
    /* Production phase: AWS 서버용 */
    logger.add(
      new winston.transports.Console({
        format: combine(
          printf(
            (info: { level: string; message: any; [key: string]: string }) =>
              `${info.level} [${info.from}] ${info.message}`
          )
        ),
      })
    );

    /* Production phase: On-Premise 서버용으로 파일로 로그를 저장 */
    // const fileLogFormat = combine(
    //   uncolorize(),
    //   printf(({ level, message, timestamp, from }) => `${level} ${timestamp} [${from}] ${message}`)
    // );
    // logger.add(
    //   new winston.transports.DailyRotateFile({
    //     level: 'error',
    //     filename: 'log/error-%DATE%.log',
    //     datePattern: 'YYYY-MM-DD',
    //     zippedArchive: true,
    //     maxSize: '1k',
    //     maxFiles: '14d',
    //     format: fileLogFormat,
    //   })
    // );
    // logger.add(
    //   new winston.transports.DailyRotateFile({
    //     filename: 'log/application-%DATE%.log',
    //     datePattern: 'YYYY-MM-DD',
    //     zippedArchive: true,
    //     maxSize: '1k',
    //     maxFiles: '14d',
    //     format: fileLogFormat,
    //   })
    // );
  }
};

export { logger, createLogger };
