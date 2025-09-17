/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from "@tsoa/runtime";
import { fetchMiddlewares, ExpressTemplateService } from "@tsoa/runtime";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from "./user/UserController.js";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OtpController } from "./otp/OtpController.js";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RefreshTokenController } from "./auth/RefreshTokenController.js";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OAuthController } from "./auth/OAuthController.js";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from "./auth/AuthController.js";
import type {
  Request as ExRequest,
  Response as ExResponse,
  RequestHandler,
  Router,
} from "express";

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  UserReturnType: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        lastName: { dataType: "string", required: true },
        firstName: { dataType: "string", required: true },
        email: { dataType: "string", required: true },
        id: { dataType: "string", required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetUserProfileResponse: {
    dataType: "refAlias",
    type: {
      dataType: "union",
      subSchemas: [
        { ref: "UserReturnType" },
        { dataType: "enum", enums: [null] },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  OtpType: {
    dataType: "refAlias",
    type: {
      dataType: "union",
      subSchemas: [
        { dataType: "enum", enums: ["VERIFY_EMAIL"] },
        { dataType: "enum", enums: ["LOGIN"] },
        { dataType: "enum", enums: ["FORGET_PASSWORD"] },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateOtpInput: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        type: { ref: "OtpType", required: true },
        email: { dataType: "string", required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  VerifyOtpInput: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        type: { ref: "OtpType", required: true },
        otp: { dataType: "string", required: true },
        email: { dataType: "string", required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  RefreshTokenInput: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: { refreshToken: { dataType: "string" } },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  LocalRegisterInput: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        lastName: { dataType: "string", required: true },
        firstName: { dataType: "string", required: true },
        password: { dataType: "string", required: true },
        email: { dataType: "string", required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  LocalLoginInput: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        password: { dataType: "string", required: true },
        email: { dataType: "string", required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ForgetPasswordInput: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        confirmNewPassword: { dataType: "string", required: true },
        newPassword: { dataType: "string", required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {
  noImplicitAdditionalProperties: "throw-on-extras",
  bodyCoercion: true,
});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################

  const argsUserController_getProfile: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    req: { in: "request", name: "req", required: true, dataType: "object" },
  };
  app.get(
    "/user",
    ...fetchMiddlewares<RequestHandler>(UserController),
    ...fetchMiddlewares<RequestHandler>(UserController.prototype.getProfile),

    async function UserController_getProfile(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsUserController_getProfile,
          request,
          response,
        });

        const controller = new UserController();

        await templateService.apiHandler({
          methodName: "getProfile",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsOtpController_generateOtp: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    body: { in: "body", name: "body", required: true, ref: "CreateOtpInput" },
  };
  app.post(
    "/otp",
    ...fetchMiddlewares<RequestHandler>(OtpController),
    ...fetchMiddlewares<RequestHandler>(OtpController.prototype.generateOtp),

    async function OtpController_generateOtp(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsOtpController_generateOtp,
          request,
          response,
        });

        const controller = new OtpController();

        await templateService.apiHandler({
          methodName: "generateOtp",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsOtpController_verifyOtp: Record<string, TsoaRoute.ParameterSchema> =
    {
      body: { in: "body", name: "body", required: true, ref: "VerifyOtpInput" },
    };
  app.post(
    "/otp/verify",
    ...fetchMiddlewares<RequestHandler>(OtpController),
    ...fetchMiddlewares<RequestHandler>(OtpController.prototype.verifyOtp),

    async function OtpController_verifyOtp(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsOtpController_verifyOtp,
          request,
          response,
        });

        const controller = new OtpController();

        await templateService.apiHandler({
          methodName: "verifyOtp",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsRefreshTokenController_refreshToken: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    body: {
      in: "body",
      name: "body",
      required: true,
      ref: "RefreshTokenInput",
    },
    req: { in: "request", name: "req", required: true, dataType: "object" },
  };
  app.post(
    "/token/refresh",
    ...fetchMiddlewares<RequestHandler>(RefreshTokenController),
    ...fetchMiddlewares<RequestHandler>(
      RefreshTokenController.prototype.refreshToken
    ),

    async function RefreshTokenController_refreshToken(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsRefreshTokenController_refreshToken,
          request,
          response,
        });

        const controller = new RefreshTokenController();

        await templateService.apiHandler({
          methodName: "refreshToken",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsOAuthController_OAuth: Record<string, TsoaRoute.ParameterSchema> = {
    req: { in: "request", name: "req", required: true, dataType: "object" },
    code: { in: "query", name: "code", required: true, dataType: "string" },
  };
  app.get(
    "/oauth/google",
    ...fetchMiddlewares<RequestHandler>(OAuthController),
    ...fetchMiddlewares<RequestHandler>(OAuthController.prototype.OAuth),

    async function OAuthController_OAuth(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsOAuthController_OAuth,
          request,
          response,
        });

        const controller = new OAuthController();

        await templateService.apiHandler({
          methodName: "OAuth",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 302,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsAuthController_register: Record<string, TsoaRoute.ParameterSchema> =
    {
      body: {
        in: "body",
        name: "body",
        required: true,
        ref: "LocalRegisterInput",
      },
      req: { in: "request", name: "req", required: true, dataType: "object" },
    };
  app.post(
    "/auth/register",
    ...fetchMiddlewares<RequestHandler>(AuthController),
    ...fetchMiddlewares<RequestHandler>(AuthController.prototype.register),

    async function AuthController_register(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsAuthController_register,
          request,
          response,
        });

        const controller = new AuthController();

        await templateService.apiHandler({
          methodName: "register",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsAuthController_login: Record<string, TsoaRoute.ParameterSchema> = {
    body: { in: "body", name: "body", required: true, ref: "LocalLoginInput" },
    req: { in: "request", name: "req", required: true, dataType: "object" },
  };
  app.post(
    "/auth/login",
    ...fetchMiddlewares<RequestHandler>(AuthController),
    ...fetchMiddlewares<RequestHandler>(AuthController.prototype.login),

    async function AuthController_login(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsAuthController_login,
          request,
          response,
        });

        const controller = new AuthController();

        await templateService.apiHandler({
          methodName: "login",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsAuthController_forgetPassword: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    body: {
      in: "body",
      name: "body",
      required: true,
      ref: "ForgetPasswordInput",
    },
    req: { in: "request", name: "req", required: true, dataType: "object" },
  };
  app.post(
    "/auth/forget-password",
    ...fetchMiddlewares<RequestHandler>(AuthController),
    ...fetchMiddlewares<RequestHandler>(
      AuthController.prototype.forgetPassword
    ),

    async function AuthController_forgetPassword(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsAuthController_forgetPassword,
          request,
          response,
        });

        const controller = new AuthController();

        await templateService.apiHandler({
          methodName: "forgetPassword",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsAuthController_logout: Record<string, TsoaRoute.ParameterSchema> = {
    req: { in: "request", name: "req", required: true, dataType: "object" },
  };
  app.post(
    "/auth/logout",
    ...fetchMiddlewares<RequestHandler>(AuthController),
    ...fetchMiddlewares<RequestHandler>(AuthController.prototype.logout),

    async function AuthController_logout(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsAuthController_logout,
          request,
          response,
        });

        const controller = new AuthController();

        await templateService.apiHandler({
          methodName: "logout",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
