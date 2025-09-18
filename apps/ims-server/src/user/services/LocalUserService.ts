import { IUserService } from "@khaled/auth";
import { UserCreateInput, UserType } from "../types.js";
import prisma from "../../database/prisma.js";

export class UserService implements IUserService<UserType, UserCreateInput> {
  create = async ({
    firstName,
    identifier,
    identifierType,
    lastName,
    password,
  }: UserCreateInput) => {
    try {
      const user = await prisma.user.create({
        data: {
          password: password,
          profile: {
            create: {
              firstName,
              lastName,
            },
          },
          identifiers: {
            create: { value: identifier, type: identifierType },
          },
        },
      });
      return {
        ...user,
        firstName,
        lastName,
        password,
        identifier,
        identifierType,
      };
    } catch (error) {
      throw new Error(
        `Database Error while creating new user email: ${identifier} `,
        {
          cause: error,
        }
      );
    }
  };
  findByIdentifier = async ({ identifier }: { identifier: string }) => {
    try {
      const result = await prisma.userIdentifier.findFirst({
        where: { value: identifier },
        include: {
          user: {
            include: {
              profile: true,
              identifiers: true,
            },
          },
        },
      });

      if (!result || !result.user) return null;

      const { user, value, type } = result;
      const { id, password, profile } = user;

      return {
        id,
        firstName: profile?.firstName ?? "",
        lastName: profile?.lastName ?? "",
        password: password ?? "",
        identifier: value,
        identifierType: type as "email" | "phone",
      };
    } catch (error) {
      throw new Error(
        `Database Error while finding user where: ${identifier} `,
        {
          cause: error,
        }
      );
    }
  };

  update = async ({
    identifier,
    data,
  }: {
    identifier: string;
    data: Partial<UserType>;
  }) => {
    try {
      const _user = await this.findByIdentifier({ identifier });
      if (!_user) {
        return null;
      }
      const user = await prisma.user.update({
        where: {
          id: _user.id,
        },
        data: {
          password: data.password,
        },
      });
      return { ..._user, password: data.password! };
    } catch (error) {
      throw new Error(
        `Database Error while updating user where: ${identifier} `,
        {
          cause: error,
        }
      );
    }
  };
}
