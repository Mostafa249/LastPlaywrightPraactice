import { createLogger, format, transports } from "winston";
const { combine, printf, timestamp, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level} : ${message}`;
});

const logger = createLogger({
    level: "debug",
    format: combine(colorize(), timestamp({ format: "hh:mm:ss" }), myFormat),

    transports: [
        new transports.Console(),
    ],
});

export let error = (message?: string) => {
    logger.error(message);
};
export let warn = (message?: string) => {
    logger.warn(message);
};

export let info = (message?: string) => {
    logger.info(message);
};

export let debug = (message?: string) => {
    logger.debug(message);
};
