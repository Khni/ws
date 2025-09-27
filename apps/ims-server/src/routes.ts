/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SignUpController } from './user/controllers/SignUpController.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LoginController } from './user/controllers/LoginController.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './user/controllers/LocalAuthController.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ForgetPasswordController } from './user/controllers/ForgetPasswordController.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HealthController } from './health-check/HealthController.js';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "OtpSignUpInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"lastName":{"dataType":"string","required":true},"firstName":{"dataType":"string","required":true},"password":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserType": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"identifierType":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["email"]},{"dataType":"enum","enums":["phone"]}],"required":true},"identifier":{"dataType":"string","required":true},"password":{"dataType":"string","required":true},"lastName":{"dataType":"string","required":true},"firstName":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResetForgettenPasswordInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"confirmNewPassword":{"dataType":"string","required":true},"newPassword":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsSignUpController_requestOtpForSignUp: Record<string, TsoaRoute.ParameterSchema> = {
                undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"identifier":{"dataType":"string","required":true}}},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/sign-up/request-otp',
            ...(fetchMiddlewares<RequestHandler>(SignUpController)),
            ...(fetchMiddlewares<RequestHandler>(SignUpController.prototype.requestOtpForSignUp)),

            async function SignUpController_requestOtpForSignUp(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSignUpController_requestOtpForSignUp, request, response });

                const controller = new SignUpController();

              await templateService.apiHandler({
                methodName: 'requestOtpForSignUp',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSignUpController_verifyOtpForLocalSignUp: Record<string, TsoaRoute.ParameterSchema> = {
                undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"otp":{"dataType":"string","required":true}}},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/sign-up/verify-otp',
            ...(fetchMiddlewares<RequestHandler>(SignUpController)),
            ...(fetchMiddlewares<RequestHandler>(SignUpController.prototype.verifyOtpForLocalSignUp)),

            async function SignUpController_verifyOtpForLocalSignUp(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSignUpController_verifyOtpForLocalSignUp, request, response });

                const controller = new SignUpController();

              await templateService.apiHandler({
                methodName: 'verifyOtpForLocalSignUp',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSignUpController_signUp: Record<string, TsoaRoute.ParameterSchema> = {
                undefined: {"in":"body","required":true,"ref":"OtpSignUpInput"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/sign-up',
            ...(fetchMiddlewares<RequestHandler>(SignUpController)),
            ...(fetchMiddlewares<RequestHandler>(SignUpController.prototype.signUp)),

            async function SignUpController_signUp(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSignUpController_signUp, request, response });

                const controller = new SignUpController();

              await templateService.apiHandler({
                methodName: 'signUp',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLoginController_login: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"identifier":{"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"string","required":true},"type":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["email"]},{"dataType":"enum","enums":["phone"]}],"required":true}},"required":true},"password":{"dataType":"string","required":true}}},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/login',
            ...(fetchMiddlewares<RequestHandler>(LoginController)),
            ...(fetchMiddlewares<RequestHandler>(LoginController.prototype.login)),

            async function LoginController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLoginController_login, request, response });

                const controller = new LoginController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_register: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"identifier":{"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"string","required":true},"type":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["email"]},{"dataType":"enum","enums":["phone"]}],"required":true}},"required":true},"lastName":{"dataType":"string","required":true},"firstName":{"dataType":"string","required":true},"password":{"dataType":"string","required":true}}},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/auth/register',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.register)),

            async function AuthController_register(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_register, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'register',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_login: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"identifier":{"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"string","required":true},"type":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["email"]},{"dataType":"enum","enums":["phone"]}],"required":true}},"required":true},"password":{"dataType":"string","required":true}}},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/auth/login',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.login)),

            async function AuthController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsForgetPasswordController_requestOtpForForgetPassword: Record<string, TsoaRoute.ParameterSchema> = {
                undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"identifier":{"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"string","required":true},"type":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["email"]},{"dataType":"enum","enums":["phone"]}],"required":true}},"required":true}}},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/forget-password/request-otp',
            ...(fetchMiddlewares<RequestHandler>(ForgetPasswordController)),
            ...(fetchMiddlewares<RequestHandler>(ForgetPasswordController.prototype.requestOtpForForgetPassword)),

            async function ForgetPasswordController_requestOtpForForgetPassword(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsForgetPasswordController_requestOtpForForgetPassword, request, response });

                const controller = new ForgetPasswordController();

              await templateService.apiHandler({
                methodName: 'requestOtpForForgetPassword',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsForgetPasswordController_verifyOtpForForgetPassword: Record<string, TsoaRoute.ParameterSchema> = {
                undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"otp":{"dataType":"string","required":true}}},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/forget-password/verify-otp',
            ...(fetchMiddlewares<RequestHandler>(ForgetPasswordController)),
            ...(fetchMiddlewares<RequestHandler>(ForgetPasswordController.prototype.verifyOtpForForgetPassword)),

            async function ForgetPasswordController_verifyOtpForForgetPassword(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsForgetPasswordController_verifyOtpForForgetPassword, request, response });

                const controller = new ForgetPasswordController();

              await templateService.apiHandler({
                methodName: 'verifyOtpForForgetPassword',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsForgetPasswordController_resetForgettenPassword: Record<string, TsoaRoute.ParameterSchema> = {
                undefined: {"in":"body","required":true,"ref":"ResetForgettenPasswordInput"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/forget-password/reset',
            ...(fetchMiddlewares<RequestHandler>(ForgetPasswordController)),
            ...(fetchMiddlewares<RequestHandler>(ForgetPasswordController.prototype.resetForgettenPassword)),

            async function ForgetPasswordController_resetForgettenPassword(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsForgetPasswordController_resetForgettenPassword, request, response });

                const controller = new ForgetPasswordController();

              await templateService.apiHandler({
                methodName: 'resetForgettenPassword',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHealthController_healthCheck: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/health-check',
            ...(fetchMiddlewares<RequestHandler>(HealthController)),
            ...(fetchMiddlewares<RequestHandler>(HealthController.prototype.healthCheck)),

            async function HealthController_healthCheck(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHealthController_healthCheck, request, response });

                const controller = new HealthController();

              await templateService.apiHandler({
                methodName: 'healthCheck',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
