import {
  Resolver,
  Query,
  Mutation,
  Arg
} from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import firebase from 'firebase/app';

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { email, firstName, lastName, password }: RegisterInput,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    return user;
  }

  @Mutation(() => String)
  async registerWithGoogleAuth(
    @Arg("email") email: string,
    @Arg("password") password: string,
  ): Promise<String> {

    return firebase.auth().createUserWithEmailAndPassword(
      email, password
    ).then((data) => {
      return data.user!.uid;
    })

  }
}