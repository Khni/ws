import express, { Request, Response, Express } from "express";
import expressWinston from "express-winston";
import bodyParser from "body-parser";

import { authConfig, otpConfig } from "@khaled/auth";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOptions.js";
import logger from "./logger/winson-logger.js";
import { RefreshTokenRepository } from "./repositories/RefreshTokenRepository.js";
import { UserRepository } from "./repositories/UserRepository.js";
import swaggerUi from "swagger-ui-express";

import { errHandler } from "@khaled/error-handler";
import { OtpRepository } from "./repositories/OtpRepository.js";
import { RegisterRoutes } from "./routes.js";
const app: Express = express();

app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  })
);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet());

authConfig.set({
  accsessTokenExpiration: 30,
  jwtSecret: "secret", //for testing purposes only, should be replaced with a secure secret in production <WIP>
  refreshTokenExpiration: 60 * 60 * 15,
  refreshTokenRepository: new RefreshTokenRepository(),
  userRepository: new UserRepository(),
});
otpConfig.set({
  jwtSecret: "secret", //for testing purposes only, should be replaced with a secure secret in production <WIP>,
  otpRepository: new OtpRepository(),
  verifyEmailTokenExpiration: 10,
  mailConfig: {
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER!,
      pass: process.env.MAIL_PASS!,
    },
    templateDir: "../templates",
  },
});

app.get("/health-check", (req: Request, res: Response) => {
  res.status(200).send("Express is working successfully");
});

app.use("/docs", swaggerUi.serve, async (req: Request, res: Response) => {
  res.send(swaggerUi.generateHTML(await import("../swagger.json")));
});
RegisterRoutes(app);
app.use(errHandler);

export default app;
