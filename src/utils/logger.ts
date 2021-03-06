import { createLogger, format, transports } from 'winston';

export function TraceLog() {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const targetMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            console.log(`[${propertyKey}]`);
            return targetMethod.apply(this, args);
        };
        return descriptor;
    };
}

export const logger = createLogger({
    level: process.env.LOG_LEVEL?.toLowerCase() ?? 'debug',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.label({ label: 'FILE' }),
        format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
        format.printf(
            (info) =>
                `${info.timestamp}: [${info.level}] ${JSON.stringify(info.message, null, 0)} ${
                    Object.keys(info.metadata).length !== 0 ? '\n' + JSON.stringify(info.metadata, null, 2) : ''
                }`,
        ),
    ),
    transports: [new transports.Console()],
});
