import { logger as createExpressLogger } from 'express-winston';
import { format, transports, createLogger, Logger } from 'winston';

export const logger: Logger = createLogger({
  level: 'debug',
  format: format.timestamp(),
  transports: new transports.Console({
    format: format.combine(
      format.colorize(),
      format.align(),
      format.printf((info) => {
        return `[${info.timestamp} | ${info.level}]: ${info.message}`;
      })
    ),
  })
});

export const expressLogger = createExpressLogger({
  winstonInstance: logger,
  meta: true,
  expressFormat: true,
  colorize: true,
  statusLevels: true,
});

