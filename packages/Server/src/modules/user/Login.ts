import { MyContext } from "../../types/MyContext";
import { User } from "../../entity/User";
import bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    ctx.req.session!.userId = "";

    return user;
  }
}
