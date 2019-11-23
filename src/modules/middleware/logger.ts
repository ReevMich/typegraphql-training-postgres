import { MiddlewareFn } from "type-graphql";
import { Context } from "../../types/Context";

export const logger: MiddlewareFn<Context> = async ({ args, context }, next) => {
    console.log("args", args);
    console.log("context", context);

    return next();
}