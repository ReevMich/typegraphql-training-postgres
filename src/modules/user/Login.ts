import { Mutation, Arg, Resolver, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import { Context } from "../../types/Context";
import { User } from "../../entity/User";
import { Auth } from "../../firebase";
import { LoginInput } from "./login/LoginInput";


@Resolver()
export class LoginResolver {

    /// Login with Local Postgres Database
    @Mutation(() => User, { nullable: true })
    async login(
        @Arg("data") loginInput: LoginInput,
        @Ctx() ctx: Context
    ): Promise<User | null> {

        // Search Data base for user
        const user = await User.findOne({ where: { email: loginInput.email } });

        if (!user) return null;

        // Compare passwords
        const valid = await bcrypt.compare(loginInput.password, user.password);

        if (!valid) return null;

        if(!user.confirmedEmail) 
            throw new Error('You must confirm you email address');

        // set cookie with user.id
        ctx.req.session!.uid = user.id;

        return user;
    }

    /// Login with Google Auth Service
    @Mutation(() => String, { nullable: true })
    async loginWithGoogleAuth(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: Context
    ): Promise<String | null> {

        // Search Data base for user
        return Auth.signInWithEmailAndPassword(email, password).then((data) => {
            if(!data.user || !data.user.emailVerified || !data.user.uid) return null;

            ctx.req.session!.uid = data.user.uid;
            return data.user.uid;
        })

        // set cookie with user.id

    }
}