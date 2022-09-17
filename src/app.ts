import { logger } from './utils/logger';
interface Data {
    foo: any;
    bar: any;
}

export const runApp = async () => {
    const foo = "bar";
    const bar = 'bar'
    console.log(foo);
    return 'Hello World!';
};
