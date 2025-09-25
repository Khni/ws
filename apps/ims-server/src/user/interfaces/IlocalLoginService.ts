import { LoginBodySchemaType } from "@khaled/ims-shared";
import { UserType } from "../types.js";

export interface ILocalLoginService {
  login: (data: LoginBodySchemaType) => Promise<{
    user: UserType;
    tokens: { accessToken: string; refreshToken: string };
  }>;
}
