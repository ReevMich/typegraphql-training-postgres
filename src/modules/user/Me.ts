import {
  Resolver,
  Query,
  Ctx
} from "type-graphql";
import { MyContext } from "src/types/MyContext";
import { User } from "../../entity/User";

@Resolver()
export class MeResolver {
  @Query(() => User)
  async me(
    @Ctx() ctx: MyContext
  ): Promise<User | null | undefined> {

    if (!ctx.req.session!.uid) {
      return null;
    }

    return User.findOne(ctx.req.session!.uid);
  }
}