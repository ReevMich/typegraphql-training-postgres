import { Mutation, Arg, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";
import { ChangeForgottenPasswordInput } from "./changeForgottenPassword/ChangeForgottenPasswordInput";
import bcrypt from 'bcryptjs';

@Resolver()
export class ChangeForgottenPasswordResolver {
    @Mutation(() => User, { nullable: true })
    async changeForgottenPassword(@Arg("data") { token, password }: ChangeForgottenPasswordInput): Promise<User | null> {
        const userId = await redis.get(forgotPasswordPrefix + token);

        if (!userId) {
            return null;
        }

        const user = await User.findOne(userId);

        if (!user) {
            return null
        }
        await redis.del(forgotPasswordPrefix + token);
        user.password = await bcrypt.hash(password, 12);
        await user.save();

        return user;
    }
}