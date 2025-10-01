import { Provider, SocialUserResult } from "@khaled/auth";
import prisma from "../../database/prisma.js";

export const handleSocialUser = async (
  socialUser: SocialUserResult,
  provider: Provider
) => {
  let identifier: string;
  if (!socialUser.email || !socialUser.verified_email) {
    identifier = socialUser.id;
  } else {
    identifier = socialUser.email;
  }
  const fetchedIdentifier = await prisma.userIdentifier.findUnique({
    where: {
      type_value: {
        value: identifier,
        type: provider,
      },
    },
    select: {
      user: true,
    },
  });
  if (fetchedIdentifier) {
    return {
      id: fetchedIdentifier.user.id,
      identifier,
      identifierType: provider,
      name: socialUser.name,
    };
  } else {
    const createdUser = await prisma.user.create({
      data: {
        identifiers: {
          create: {
            value: identifier,
            type: provider,
          },
        },
        profile: {
          create: {
            name: socialUser.name,
            avatarUrl: socialUser.pictureUrl,
          },
        },
      },
    });
    return {
      id: createdUser.id,
      identifier,
      identifierType: provider,
      name: socialUser.name,
    };
  }
};
