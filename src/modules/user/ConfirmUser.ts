import { Mutation, Arg, Resolver, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { Context } from "../../types/Context";
import { redis } from "../../redis";

@Resolver()
export class ConfirmUserResolver {
    @Mutation(() => Boolean)
    async confirmUser(
        @Arg("token") token: string,
        @Ctx() _ctx: Context
    ): Promise<boolean> {

        const userId = await redis.get(token);

        if(!userId) {
            return false;
        }

        await User.update({id: parseInt(userId)}, {confirmedEmail: true});
        await redis.del(token);

        return true;
    }
}