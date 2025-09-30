import { LocalLoginInput } from "@khaled/ims-shared";
import { UserType } from "../types.js";

export interface ILocalLoginService {
  login: (data: LocalLoginInput) => Promise<{
    user: UserType;
    tokens: { accessToken: string; refreshToken: string };
  }>;
}
