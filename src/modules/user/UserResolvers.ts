import { RegisterResolver } from "./Register";
import { LoginResolver } from "./Login";
import { LogoutResolver } from "./logout";
import { ForgotPasswordResolver } from "./ForgotPassword";
import { ConfirmUserResolver } from "./ConfirmUser";
import { ChangeForgottenPasswordResolver } from "./ChangeForgottenPassword";
import { MeResolver } from "./Me";

export const UserResolvers = [
    RegisterResolver,
    LoginResolver,
    LogoutResolver,
    ForgotPasswordResolver,
    ConfirmUserResolver,
    ChangeForgottenPasswordResolver,
    MeResolver
]