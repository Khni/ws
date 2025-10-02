import { LocalLoginInput } from "@khaled/ims-shared";
import { UserType } from "../types.js";

export interface ILocalLoginService {
  login: (data: LocalLoginInput) => Promise<{
    user: Omit<UserType, "password">;
    tokens: { accessToken: string; refreshToken: string };
  }>;
}
