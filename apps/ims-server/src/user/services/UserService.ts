import { IUserService } from "@khaled/auth";
import { UserCreateInput, UserType } from "../types.js";
import prisma from "../../database/prisma.js";

export class UserService implements IUserService<UserType, UserCreateInput> {
  create = async ({
    name,
    identifier,
    identifierType,
    password,
  }: UserCreateInput) => {
    try {
      const user = await prisma.user.create({
        data: {
          password: password,
          profile: {
            create: {
              name,
            },
          },
          identifiers: {
            create: { value: identifier, type: identifierType },
          },
        },
      });
      return {
        ...user,
        name,
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
        name: profile?.name ?? "",

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

  findById = async ({ id }: { id: string }) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          profile: true,
          identifiers: true,
        },
      });
      if (!user) return null;

      const primaryIdentifier = user.identifiers[0];

      return {
        id: user.id,
        name: user.profile?.name ?? "",
        identifier: primaryIdentifier?.value ?? "",
        identifierType: primaryIdentifier?.type as "email" | "phone",
      };
    } catch (error) {
      throw new Error(`Database Error while finding user where: ${id} `, {
        cause: error,
      });
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
        throw new Error(
          `update failed: user is not exist with identifier ${identifier}`
        );
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
