import { Mutation, Arg, Resolver, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import { Context } from "../../types/Context";
import { User } from "../../entity/User";



@Resolver()
export class LoginResolver {
    @Mutation(() => User, { nullable: true })
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: Context
    ): Promise<User | null> {

        // Search Data base for user
        const user = await User.findOne({ where: { email } });

        if (!user) return null;
        
        // Compare passwords
        const valid = await bcrypt.compare(password, user.password);

        if (!valid) return null;
        
        // set cookie with user.id
        ctx.req.session!.uid = user.id;

        return user;
    }
}