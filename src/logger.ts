import dotenv from 'dotenv';
import winston, { type LoggerOptions } from 'winston';

dotenv.config();

const loggerOptions: LoggerOptions = {
  level: process.env.NODE_ENV === 'test' ? 'debug' : 'info',
  format: winston.format.json(),
  //defaultMeta: { },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
};

const logger = winston.createLogger(loggerOptions);

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
